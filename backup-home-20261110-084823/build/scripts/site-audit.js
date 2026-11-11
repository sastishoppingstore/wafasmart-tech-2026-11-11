/* ------------------------------------------------------------------
   build/scripts/site-audit.js — walk everything in dist and prove it
   is self-consistent before it goes live.

     node build/scripts/site-audit.js          # link + asset check
     node build/scripts/site-audit.js --live    # also load every page
                                                # in Chromium and report
                                                # console errors / 404s
   ------------------------------------------------------------------ */
const fs = require("fs");
const path = require("path");
const DIST = path.join(__dirname, "..", "..", "dist");
const LIVE = process.argv.includes("--live");

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f); else files.push(f);
  }
})(DIST);
const html = files.filter(f => f.endsWith(".html"));
const rel = f => "/" + path.relative(DIST, f).split(path.sep).join("/");
const onDisk = new Set(files.map(rel));

/* ---------- static: every internal href/src must exist ---------- */
const broken = [], orphanNotes = [];
for (const f of html) {
  const src = fs.readFileSync(f, "utf8");
  const base = path.dirname(rel(f));
  for (const m of src.matchAll(/(?:href|src|data-src|poster)="([^"]+)"/g)) {
    const u = m[1];
    if (u.includes("${")) continue;                     /* JS template, not a real path */
    if (/^(https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i.test(u)) continue;
    let p = u.split("?")[0].split("#")[0];
    if (!p || p.startsWith("/assets/..")) continue;
    if (!p.startsWith("/")) p = path.posix.normalize(base + "/" + p);
    let target = p;
    if (target.endsWith("/")) target += "index.html";
    else if (!path.extname(target)) target += ".html";
    if (!onDisk.has(target) && !onDisk.has(target.replace(/\.html$/, "/index.html"))) {
      broken.push(rel(f) + " -> " + u);
    }
  }
}
const dupe = {};
for (const f of html) {
  const b = path.basename(f);
  if (/^index \(\d\)|\.clone|copy/i.test(b)) (dupe[path.dirname(rel(f))] = dupe[path.dirname(rel(f))] || []).push(b);
}

/* ---------- live: load each page, collect errors ---------- */
(async () => {
  const report = {
    pages: html.length,
    assets: files.length,
    brokenLinks: [...new Set(broken)],
    junkFiles: dupe,
    emptyDirs: files.length ? [] : [],
  };
  if (LIVE) {
    const { chromium } = require("playwright");
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const bad = [];
    const BASE = "http://127.0.0.1:8199";
    for (const f of html) {
      const url = BASE + rel(f);
      const errs = [], fails = [];
      page.removeAllListeners("console"); page.removeAllListeners("requestfailed"); page.removeAllListeners("pageerror");
      page.on("console", m => { if (m.type() === "error") errs.push(m.text().slice(0, 160)); });
      page.on("pageerror", e => errs.push("PAGEERROR " + String(e).slice(0, 160)));
      page.on("requestfailed", r => {
        const u = r.url();
        if (u.startsWith(BASE)) fails.push(u.slice(BASE.length) + " " + (r.failure() || {}).errorText);
      });
      try {
        await page.goto(url, { waitUntil: "load", timeout: 20000 });
        await page.waitForTimeout(250);
      } catch (e) { errs.push("NAV " + String(e.message).slice(0, 90)); }
      if (errs.length || fails.length) bad.push({ page: rel(f), errs: [...new Set(errs)].slice(0, 4), fails: [...new Set(fails)].slice(0, 6) });
    }
    await browser.close();
    report.runtime = bad;
  }
  console.log(JSON.stringify(report, null, 1));
  const emptyDemos = fs.readdirSync(DIST).filter(d => {
    const p = path.join(DIST, d);
    return /^demo/i.test(d) && fs.statSync(p).isDirectory() && fs.readdirSync(p).length === 0;
  });
  if (emptyDemos.length) console.log("EMPTY demo folders: " + emptyDemos.join(", "));
  console.log("pages " + html.length + " · assets " + files.length + " · broken internal refs " + report.brokenLinks.length +
    (LIVE ? " · pages with runtime problems " + (report.runtime || []).length : ""));
})();
