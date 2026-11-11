#!/usr/bin/env node
/* home-v2 — applies the home-page upgrade to dist/index.html WITHOUT running build/build.js
 * (build.js overwrites dist/index.html from build/src/index-3d.html, which lacks half the live sections).
 * Idempotent: re-running replaces the previous block.
 *  1. srcset: adds every existing <stem>-<w>.webp variant so large screens can get a sharp file
 *  2. injects build/src/home/v2.css (inline <style>) and build/src/home/v2.js (inline <script>)
 * Usage: node build/scripts/home-v2.js            (writes dist/index.html)
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const DIST = path.join(ROOT, "dist");
const IMG = path.join(DIST, "assets", "img");
const HTML = path.join(DIST, "index.html");

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
let html = fs.readFileSync(HTML, "utf8");

/* remove previous injection; the perf block is re-added from build/src/home/perf-opt.css */
html = html.replace(/<style id="perf-opt">[\s\S]*?<\/style>/g, "");
html = html.replace(/<!--home-v2-css:start-->[\s\S]*?<!--home-v2-css:end-->/g, "");
html = html.replace(/<!--home-v2-js:start-->[\s\S]*?<!--home-v2-js:end-->/g, "");
html = html.replace(/<style id="home-v2">[\s\S]*?<\/style>/g, "");
html = html.replace(/<script id="home-v2-js">[\s\S]*?<\/script>/g, "");

/* 1. widen srcset with existing variants */
const files = fs.readdirSync(IMG);
let widened = 0;
html = html.replace(/<img\b[^>]*>/g, tag => {
  if (!/\ssrcset="/.test(tag)) return tag;
  const m = tag.match(/\ssrc="\/assets\/img\/([^"]+?)-(\d+)\.webp"/);
  if (!m) return tag;
  /* include the plain stem family and, when it exists, the wide `stemw-` family
     (stockN used as a square card is still object-fit:cover, so mixing is safe) */
  const fams = [m[1], m[1] + "w"].filter((v, i, a) => a.indexOf(v) === i);
  const cands = files
    .map(f => { for (const s of fams) { const r = new RegExp("^" + esc(s) + "-(\\d+)\\.webp$"); const mm = f.match(r); if (mm) return { f, w: +mm[1] }; } return null; })
    .filter(Boolean)
    .sort((a, b) => a.w - b.w);
  if (cands.length < 2) return tag;
  const srcset = cands.map(c => `/assets/img/${c.f} ${c.w}w`).join(", ");
  widened++;
  return tag.replace(/\ssrcset="[^"]*"/, () => ` srcset="${srcset}"`);
});

/* 2. HERO: drop the blurry photo + the long intro line, insert a CSS-animated backdrop.
   Idempotent: once swapped, the <div class="hall-media"> / lead <p> no longer match. */
const dots = [
  ["7%", 5, 0, 17], ["16%", 4, 3, 21], ["24%", 6, 6, 19], ["33%", 3, 1.5, 23],
  ["41%", 5, 8, 18], ["49%", 4, 4, 20], ["57%", 6, 10, 22], ["65%", 3, 2, 16],
  ["73%", 5, 7, 21], ["81%", 4, 5, 19], ["89%", 6, 9, 23], ["94%", 4, 11, 18]
].map(([x, s, d, t]) => `<span class="ha-dot" style="--x:${x};--s:${s}px;--d:${d}s;--t:${t}s"></span>`).join("");
const HERO_ART = `<div class="hero-art" aria-hidden="true"><span class="ha-blob ha-1"></span>`
  + `<span class="ha-blob ha-2"></span><span class="ha-blob ha-3"></span>`
  + `<span class="ha-grid"></span><span class="ha-sweep"></span>${dots}</div>`;

let heroArt = 0;
html = html.replace(/<div class="hall-media"[^>]*>[\s\S]*?<\/div>/, () => { heroArt++; return HERO_ART; });
const beforeLead = html.length;
html = html.replace(/<p class="lead hero-fade"[^>]*>[\s\S]*?<\/p>\s*/, "");
const leadDropped = html.length !== beforeLead ? 1 : 0;

/* 3. fix the "PKR NaN" price on portfolio case cards (missing rate field) -> base rate */
const nanCount = (html.match(/PKR NaN/g) || []).length;
html = html.replace(/PKR NaN/g, "PKR 14,000");

/* 4. reserve the mobile cube band at the very top of <main>. It sits in the markup
   (so the space is already held before first paint) and v2.js moves the cube into it on
   mobile — that way lifting the cube causes no layout shift. Desktop hides the slot. */
html = html.replace(/<div class="cube-top-slot"[^>]*><\/div>/g, "");
html = html.replace(/(<main id="main">)/, "$1<div class=\"cube-top-slot\" aria-hidden=\"true\"></div>");

/* 5. inject CSS and JS */
const css = fs.readFileSync(path.join(ROOT, "build", "src", "home", "v2.css"), "utf8");
const js = fs.readFileSync(path.join(ROOT, "build", "src", "home", "v2.js"), "utf8");
const perf = fs.readFileSync(path.join(ROOT, "build", "src", "home", "perf-opt.css"), "utf8");
const cssBlock = `<style id="perf-opt">${perf}</style><!--home-v2-css:start--><style id="home-v2">${css}</style><!--home-v2-css:end-->`;
const jsBlock = `<!--home-v2-js:start--><script id="home-v2-js">${js}</script><!--home-v2-js:end-->`;
if (!html.includes("</head>") || !html.includes("</body>")) throw new Error("index.html has no </head> or </body>");
html = html.replace("</head>", () => cssBlock + "</head>");
html = html.replace("</body>", () => jsBlock + "</body>");

fs.writeFileSync(HTML, html);
console.log(`home-v2: srcset widened on ${widened} <img> tags; hero art ${heroArt ? "added" : "present"}; hero lead ${leadDropped ? "removed" : "absent"}; PKR NaN fixed ${nanCount}; css ${css.length} B, js ${js.length} B; wrote ${HTML}`);
