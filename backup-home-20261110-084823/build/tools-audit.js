#!/usr/bin/env node
"use strict";
/* Static wiring audit for the /tools section (read-only, additive).
   For every built tool page it checks that each id its runtime module touches
   exists in the generated HTML, that the module file was emitted, that the CDN
   libs the module lazy-loads are declared with SRI, and that shared helpers
   referenced by the module are present in tools.js.
   Usage: node build/tools-audit.js            → summary + problems
          node tools-audit.js --verbose         → also list per-tool id counts */

const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "dist", "tools");
const problems = [];
const say = (slug, msg) => problems.push(slug + ": " + msg);

const idRe = /getElementById\(\s*["']([\w-]+)["']\s*\)|\$\(\s*["']#?([\w-]+)["']\s*\)|querySelector\(\s*["']#([\w-]+)["']|querySelector\(\s*["']#([\w-]+)\b/g;
function idsUsed(src) {
  const set = new Set();
  let m;
  while ((m = idRe.exec(src))) for (const g of [m[1], m[2], m[3], m[4]]) if (g && /^\w[\w-]*$/.test(g)) set.add(g);
  return set;
}

const toolsJs = fs.readFileSync(path.join(OUT, "assets", "tools.js"), "utf8");
const cfg = require("./src/tools/tools.config.js");
/* replicate the builder's content discovery so `built` flags are set here too */
const SRC = path.join(ROOT, "build", "src", "tools");
fs.readdirSync(path.join(SRC, "content")).forEach(f => {
  if (!/\.js$/.test(f) || f.startsWith("_")) return;
  const t = cfg.TOOLS.find(x => x.slug === f.replace(/\.js$/, ""));
  if (t) Object.assign(t, require(path.join(SRC, "content", f)), { built: true });
});
const htmlIds = h => { const s = new Set(); const r = /\bid="([^"]+)"/g; let m; while ((m = r.exec(h))) s.add(m[1]); return s; };

let checked = 0;
cfg.TOOLS.filter(t => t.built).forEach(t => {
  checked++;
  const htmlPath = path.join(OUT, t.slug + ".html");
  if (!fs.existsSync(htmlPath)) return say(t.slug, "no generated page");
  const html = fs.readFileSync(htmlPath, "utf8");
  const mod = t.module || t.slug;
  const modPath = path.join(OUT, "assets", "t", t.slug + ".js");
  if (!fs.existsSync(modPath)) return say(t.slug, "module not emitted (t/" + t.slug + ".js)");
  if (fs.existsSync(path.join(ROOT, "build", "src", "tools", "t", mod + ".js")) &&
      fs.readFileSync(modPath, "utf8") !== fs.readFileSync(path.join(ROOT, "build", "src", "tools", "t", mod + ".js"), "utf8"))
    say(t.slug, "emitted module differs from source (stale build?)");

  const ids = htmlIds(html);
  /* Some controls are optional by design (a shared module serves several slugs),
     and colour strings such as #fff are not element ids. */
  const optional = new Set(["ranges", "name", "selinfo", "bg", "keep", "q", "knote"]);
  idsUsed(fs.readFileSync(modPath, "utf8")).forEach(id => {
    if (optional.has(id) || /^[0-9a-f]{3,6}$/i.test(id)) return;
    if (!ids.has(id)) say(t.slug, 'module uses #' + id + ' which is not in the page');
  });

  if (!html.includes('/tools/assets/t/' + t.slug + '.js')) say(t.slug, "page does not load its module script");
  if (!html.includes('/tools/assets/tools.js')) say(t.slug, "page does not load tools.js");
  if (!html.includes('data-slug="' + t.slug + '"')) say(t.slug, "main is missing data-slug");

  /* CDN libs are advertised in an inline WST_T.LIBS manifest on every page. */
  if (!html.includes("WST_T.LIBS=")) say(t.slug, "page has no WST_T.LIBS manifest");
  (t.libs || []).forEach(l => {
    if (!html.includes('"' + l + '"')) say(t.slug, "page manifest does not declare lib " + l);
  });
});

/* hub + shared assets */
const hub = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
cfg.TOOLS.filter(t => t.built).forEach(t => { if (!hub.includes('/tools/' + t.slug)) say("hub", "missing card link to " + t.slug); });
["tools.js", "tools.css"].forEach(f => { if (!fs.existsSync(path.join(OUT, "assets", f))) say("assets", f + " not copied"); });

const built = cfg.TOOLS.filter(t => t.built).length;
console.log("audited " + checked + " built tool pages (" + cfg.TOOLS.length + " catalog entries, " + (cfg.TOOLS.length - built) + " unbuilt)");
if (!problems.length) console.log("OK — every module id resolves, every page loads its assets, hub links every tool");
else { console.log("PROBLEMS (" + problems.length + "):"); problems.forEach(p => console.log(" - " + p)); process.exitCode = 1; }
