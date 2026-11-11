#!/usr/bin/env node
"use strict";
/* Real-browser test of every built tool page (headless Chromium + local static server).
   Each page is loaded on a 390x780 phone viewport, every text/number/date input is filled with a
   plausible value, every file input is given a real image (and a real one-page PDF), then the
   primary action button is clicked and the page is judged on what visibly happened:
     OK           — output appeared / changed after the click
     NOOP         — clicked but nothing changed
     UNCLICKABLE  — something covers the button, or the button is disabled with no reason shown
     ERROR        — console error or uncaught exception
     NO-BUTTON    — no action control found (the tool is driven some other way, check by hand)
   Usage: node build/tools-browser-test.js [slug ...]        (default: every built tool) */

const fs = require("fs");
const path = require("path");
const http = require("http");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const TMP = path.join(ROOT, "build", ".fixtures");
const PORT = 8733;
const wanted = process.argv.slice(2).filter(a => !a.startsWith("--"));

/* ---------- fixtures ---------- */
function mkPdf(pages) {
  const n = pages.length, objs = [];
  const kids = pages.map((_, i) => `${3 + i * 2} 0 R`).join(" ");
  objs.push("<</Type/Catalog/Pages 2 0 R>>");
  objs.push(`<</Type/Pages/Kids[${kids}]/Count ${n}>>`);
  pages.forEach((text, i) => {
    const pageId = 3 + i * 2, contId = pageId + 1;
    objs.push(`<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Contents ${contId} 0 R/Resources<</Font<</F1 ${4 + n * 2} 0 R>>>>>>`);
    const stream = "BT /F1 24 Tf 72 720 Td (" + text + ") Tj ET";
    objs.push(`<</Length ${stream.length}>>stream\n${stream}\nendstream`);
  });
  objs.push("<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>");
  let out = "%PDF-1.4\n";
  objs.forEach((o, i) => { out += `${i + 1} 0 obj${o}endobj\n`; });
  return Buffer.from(out + `trailer<</Root 1 0 R>>\n%%EOF\n`, "latin1");
}
function fixtures() {
  fs.mkdirSync(TMP, { recursive: true });
  fs.writeFileSync(path.join(TMP, "sample.pdf"), mkPdf(["Wafa page one", "Wafa page two", "Wafa page three"]));
  fs.writeFileSync(path.join(TMP, "sample2.pdf"), mkPdf(["Second document"]));
  fs.copyFileSync(path.join(DIST, "assets/img/og-cover.jpg"), path.join(TMP, "photo.jpg"));
  fs.copyFileSync(path.join(DIST, "assets/img/logo.png"), path.join(TMP, "logo.png"));
  return [path.join(TMP, "photo.jpg"), path.join(TMP, "logo.png")];
}

const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ico": "image/x-icon", ".txt": "text/plain", ".pdf": "application/pdf", ".webmanifest": "application/manifest+json" };
function serve() {
  return new Promise(res => {
    const s = http.createServer((req, out) => {
      let p = decodeURIComponent(req.url.split("?")[0]);
      let f = path.join(DIST, p);
      if (!path.extname(f) && fs.existsSync(f + ".html")) f += ".html";
      if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { out.writeHead(404); return out.end("nope"); }
      out.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" });
      fs.createReadStream(f).pipe(out);
    });
    s.listen(PORT, () => res(s));
  });
}

function slugs() {
  const cfg = require(path.join(ROOT, "build/src/tools/tools.config.js"));
  const dir = path.join(ROOT, "build/src/tools/content");
  const built = fs.readdirSync(dir).filter(f => /\.js$/.test(f) && !f.startsWith("_")).map(f => f.replace(/\.js$/, ""));
  return cfg.TOOLS.filter(t => built.includes(t.slug)).map(t => t.slug);
}

const GOSEL = "#go, #goage, #calc, #calculate, #run, #generate, #convert, #make, .acts button:not([hidden]), button.t3d-btn";

(async () => {
  const IMG = fixtures();
  const server = await serve();
  const browser = await chromium.launch();
  const rows = [];
  for (const slug of wanted.length ? wanted : slugs()) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 780 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", m => { if (m.type() === "error") errs.push(m.text().slice(0, 140)); });
    page.on("pageerror", e => errs.push("throw: " + String(e.message).slice(0, 140)));
    const t0 = Date.now();
    try {
      await page.goto(`http://127.0.0.1:${PORT}/tools/${slug}`, { waitUntil: "load", timeout: 20000 });
    } catch (e) {
      rows.push({ slug, verdict: "LOAD-FAIL", note: String(e.message).slice(0, 70), ms: Date.now() - t0 });
      await ctx.close(); continue;
    }
    const loadMs = Date.now() - t0;
    await page.waitForTimeout(500);
    /* visible text of the tool area: if nothing a user can see changed, the click did nothing */
    const readOut = () => page.evaluate(() => {
      const m = document.querySelector("main");
      return (m ? m.innerText : "").replace(/\s+/g, " ").slice(0, 3000);
    });
    /* baseline BEFORE any user input: a tool that computes live as you type is working, not stuck */
    const before = await readOut();

    /* feed any file input: images for image tools, a real PDF for pdf tools */
    const fileInputs = await page.locator("main input[type=file]").count();
    for (let i = 0; i < fileInputs; i++) {
      const el = page.locator("main input[type=file]").nth(i);
      const accept = (await el.getAttribute("accept")) || "";
      const multi = await el.evaluate(e => e.multiple === true);
      const pool = (/\.pdf/i.test(accept) || /pdf/.test(slug)) ? [path.join(TMP, "sample.pdf"), path.join(TMP, "sample2.pdf")] : IMG;
      const set = multi ? pool : [pool[0]];
      try { await el.setInputFiles(set); } catch (e) { rows.push({ slug, verdict: "FILE-FAIL", note: String(e.message).slice(0, 60), ms: loadMs }); }
      await page.waitForTimeout(400);
    }
    /* page-pick tools stay inert until the user taps at least one numbered chip */
    const chips = await page.locator("main .chip").count();
    if (chips) { await page.locator("main .chip").nth(0).click().catch(() => { }); await page.waitForTimeout(200); }

    /* fill everything else a user would type — values that pass each field's own range,
       because a tool that rejects nonsense input correctly is not a broken tool */
    await page.evaluate(() => {
      const put = (el, v) => {
        const proto = el.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : el.tagName === "SELECT" ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
        const d = Object.getOwnPropertyDescriptor(proto, "value");
        if (d && d.set) d.set.call(el, v); else el.value = v;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      };
      const num = el => {
        const mn = el.min === "" ? null : +el.min, mx = el.max === "" ? null : +el.max;
        const hint = (el.id + " " + el.name + " " + (el.placeholder || "") + " " + (el.labels && el.labels[0] ? el.labels[0].textContent : "")).toLowerCase();
        if (/year|sal[- ]?|dob/.test(hint) || mn >= 1900) return "1995";
        if (mx !== null && mx <= 31) return String(Math.min(12, mx));
        if (mx !== null && mn !== null) return String(Math.round((mn + mx) / 2));
        if (mx !== null) return String(Math.max(1, Math.round(mx / 2)));
        if (mn !== null) return String(mn + 10);
        return "50000";
      };
      document.querySelectorAll("main input, main textarea, main select").forEach(el => {
        if (el.disabled) return;
        const t = el.type || "text";
        if (t === "file" || t === "range" || t === "checkbox" || t === "radio" || t === "search") return;
        if (t === "number") return put(el, num(el));
        if (t === "date") return put(el, "1995-04-12");
        if (t === "datetime-local") return put(el, "1995-04-12T09:30");
        if (t === "month") return put(el, "1995-04");
        if (t === "time") return put(el, "09:30");
        if (t === "email") return put(el, "a@b.com");
        if (t === "url") return put(el, "https://wafasmart.tech");
        if (t === "tel") return put(el, "03001234567");
        if (t === "color") return put(el, "#ffc83d");
        if (el.tagName === "SELECT") { const o = [...el.options].filter(o => o.value).pop() || el.options[0]; return o && put(el, o.value); }
        const hint = (el.id + " " + (el.placeholder || "")).toLowerCase();
        if (/json|\{/.test(hint) || el.tagName === "TEXTAREA" && /json/.test(el.value)) return put(el, '{"name":"Wafa","city":"Lahore","tools":[1,2,3]}');
        return put(el, "hello world 123 sample text");
      });
    });

    const nBtn = await page.locator(GOSEL).count();
    let verdict = nBtn ? "NOOUTCOME" : "NO-BUTTON", note = nBtn ? "" : "no primary action control found", disabled = false;
    if (nBtn) {
      const btn = page.locator(GOSEL).first();
      const id = await btn.getAttribute("id");
      await btn.evaluate(e => e.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => { });
      /* pages use smooth scroll-behaviour; wait until the button is actually inside the viewport */
      for (let w = 0; w < 12; w++) {
        const inView = await page.evaluate(s => {
          const b = document.querySelector(s);
          const r = b.getBoundingClientRect();
          return r.top >= 0 && r.bottom <= innerHeight;
        }, GOSEL).catch(() => true);
        if (inView) break;
        await page.waitForTimeout(120);
      }
      await page.waitForTimeout(120);
      const probe = await page.evaluate(s => {
        const b = document.querySelector(s);
        if (!b) return { err: "gone" };
        const r = b.getBoundingClientRect();
        if (!r.width || !r.height) return { err: "zero box" };
        if (r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth)
          return { err: "off-screen at y " + Math.round(r.top) + " (page did not scroll)" };
        const hit = document.elementFromPoint(Math.min(r.left + r.width / 2, innerWidth - 1), Math.min(r.top + r.height / 2, innerHeight - 1));
        return {
          disabled: b.disabled === true, vis: !!b.offsetParent,
          cover: (!hit || !(b === hit || b.contains(hit) || hit.contains(b))) ? (hit ? hit.tagName.toLowerCase() + (hit.id ? "#" + hit.id : "." + String(hit.className).split(" ")[0]) : "null") : ""
        };
      }, GOSEL);
      disabled = probe.disabled;
      if (probe.cover) { verdict = "UNCLICKABLE"; note = "covered by <" + probe.cover + ">"; }
      else if (probe.err) { verdict = "UNCLICKABLE"; note = probe.err; }
      else {
        if (disabled) { note = "disabled — waiting for a file (" + fileInputs + " file input(s) filled)"; }
        try { await btn.click({ timeout: 3000, force: false }); } catch (e) { verdict = "UNCLICKABLE"; note = "click threw: " + String(e.message).split("\n")[0].slice(0, 60); }
        /* give lazy CDN engines and batch jobs time to produce output */
        for (let w = 0; w < 8; w++) { await page.waitForTimeout(700); if ((await readOut()) !== before) break; }
        const after = await readOut();
        if (!verdict.startsWith("UN")) {
          if (errs.length) verdict = "ERROR";
          else if (after !== before) verdict = "OK";
          else verdict = disabled ? "STUCK" : "NOOP";
        }
        note = (verdict === "OK" ? "out: " + after.slice(0, 64)
          : (note || "") + (verdict === "NOOP" ? " last visible: …" + after.slice(-72) : ""))
          + (disabled && verdict !== "STUCK" ? " [was disabled]" : "");
      }
    }
    if (errs.length && verdict !== "ERROR") verdict = "ERROR";
    rows.push({ slug, verdict, note: note.slice(0, 95), errs: errs.slice(0, 2), ms: loadMs });
    await ctx.close();
  }
  await browser.close();
  server.close();
  fs.rmSync(TMP, { recursive: true, force: true });
  const w = Math.max(...rows.map(r => r.slug.length));
  rows.forEach(r => console.log(r.verdict.padEnd(12) + r.slug.padEnd(w + 2) + String(r.ms).padStart(5) + "ms  " + r.note +
    (r.errs && r.errs.length ? "\n              └ " + r.errs.join(" | ") : "")));
  const tally = {};
  rows.forEach(r => tally[r.verdict] = (tally[r.verdict] || 0) + 1);
  console.log("\n" + JSON.stringify(tally));
  process.exitCode = rows.some(r => r.verdict === "ERROR" || r.verdict === "UNCLICKABLE" || r.verdict === "STUCK" || r.verdict === "LOAD-FAIL") ? 1 : 0;
})();
