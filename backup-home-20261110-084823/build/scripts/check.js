// QA gate: links, assets, SEO coverage. Exits non-zero on failure.
"use strict";
const fs = require("fs"), path = require("path");
const DIST = path.join(__dirname, "..", "..", "dist");
const htmls = [];
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (p.endsWith(".html")) htmls.push(p); } })(DIST);

const problems = [];
const stats = { links: 0, imgs: 0, jsonld: 0, ur: 0 };
for (const f of htmls) {
  const html = fs.readFileSync(f, "utf8");
  const rel = path.relative(DIST, f);
  const util = /404|offline|admin/.test(rel);
  // SEO essentials
  for (const need of ["<title>", "name=\"description\"", "rel=\"canonical\"", "og:title", "og:image", "application/ld+json"]) {
    if (!html.includes(need) && !util) problems.push(`${rel}: missing ${need}`);
  }
  if (!/<title>(.{12,86})<\/title>/s.test(html)) problems.push(`${rel}: title length`);
  const md = html.match(/name="description" content="([^"]*)"/);
  if (md && !util && (md[1].length < 60 || md[1].length > 165)) problems.push(`${rel}: desc length ${md[1].length}`);
  stats.jsonld += (html.match(/application\/ld\+json/g) || []).length;
  stats.ur += (html.match(/data-ur=/g) || []).length;
  // internal links + assets
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#]*?)(?:[#?][^"]*)?"/g)) {
    const u = m[1]; stats.links++;
    if (!fs.existsSync(path.join(DIST, u))) problems.push(`${rel}: broken → ${u}`);
  }
  for (const m of html.matchAll(/<img[^>]*>/g)) {
    const tag = m[0]; stats.imgs++;
    if (!/alt=/.test(tag)) problems.push(`${rel}: img missing alt`);
  }
  // every image src must exist (webp/png/jpg variants already covered by src check above)
  // structural sanity
  if ((html.match(/<body/g) || []).length !== 1) problems.push(`${rel}: body count`);
  if (html.includes("undefined") || html.includes("[object")) problems.push(`${rel}: template leak (undefined/[object])`);
}
// assets referenced from JS that must exist
for (const a of ["assets/js/main.js", "assets/js/i18n.js", "assets/js/admin.js", "assets/css/styles.css", "manifest.webmanifest", "sw.js", "sitemap.xml", "robots.txt", "assets/img/logo.webp", "assets/img/hero-ai-1280.webp", "assets/img/og-cover.jpg", "assets/data/content.json"])
  if (!fs.existsSync(path.join(DIST, a))) problems.push(`root: missing ${a}`);
// sitemap covers all pages
const sm = fs.readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
for (const f of htmls) {
  const rel = path.relative(DIST, f).replace(/\\/g, "/");
  if (rel === "404.html" || rel === "offline.html" || rel === "admin.html") continue;
  if (!sm.includes("/" + rel + "</loc>") && !(rel === "index.html" && sm.includes("https://wafasmart.tech/</loc>"))) problems.push(`sitemap: missing ${rel}`);
}
// performance budget — keep the site lightweight
const imgDir = path.join(DIST, "assets/img");
let imgBytes = 0, bigImgs = [];
for (const f of fs.readdirSync(imgDir)) {
  const sz = fs.statSync(path.join(imgDir, f)).size;
  imgBytes += sz;
  if (sz > 200 * 1024 && !/og-cover|icon-512/.test(f)) bigImgs.push(`${f} ${(sz/1024).toFixed(0)}KB`);
}
if (imgBytes > 6 * 1024 * 1024) problems.push(`budget: images ${(imgBytes/1e6).toFixed(1)}MB > 6MB`);
bigImgs.forEach(x => problems.push(`budget: oversized image ${x}`));
const distBytes = (function walk(d) { let n = 0; for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); n += f.isDirectory() ? walk(p) : fs.statSync(p).size; } return n; })(DIST);
if (distBytes > 12 * 1024 * 1024) problems.push(`budget: dist ${(distBytes/1e6).toFixed(1)}MB > 12MB`);
console.log(`pages=${htmls.length} links=${stats.links} imgs=${stats.imgs} jsonld-blocks=${stats.jsonld} data-ur nodes=${stats.ur} images=${(imgBytes/1e6).toFixed(1)}MB dist=${(distBytes/1e6).toFixed(1)}MB`);
if (problems.length) { console.log("❌ PROBLEMS (" + problems.length + "):"); problems.slice(0, 40).forEach(p => console.log("   " + p)); process.exit(1); }
console.log("✅ QA GATE PASSED — 0 broken links, 0 missing alts, SEO complete");
