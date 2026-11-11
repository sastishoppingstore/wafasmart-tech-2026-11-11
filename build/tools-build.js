#!/usr/bin/env node
"use strict";
/* WAFA Smart Tech /tools static generator (ADDITIVE ONLY).
   Reads layout (header/footer/environment) from the already-built dist/services.html,
   splices in the "Free Tools" links for the tools pages, and writes pre-rendered HTML
   into dist/tools/. It never writes to any existing file.
   Usage: node build/tools-build.js            → build hub + every tool with built:true
          node build/tools-build.js <slug...>  → also rebuild specific pages
          node build/tools-build.js --report    → print per-page weight report + content audit */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { CATS, LIBS, TOOLS, HUB, BRAND } = require("./src/tools/tools.config.js");

const ROOT = path.join(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SRC = path.join(__dirname, "src", "tools");
const OUT = path.join(DIST, "tools");
const BASE = BRAND.url;
const LASTMOD = "2026-10-30";

/* per-tool content lives in src/tools/content/<slug>.js — presence marks the tool as built */
fs.readdirSync(path.join(SRC, "content")).forEach(f => {
  if (!/\.js$/.test(f) || f.startsWith("_")) return;
  const slug = f.replace(/\.js$/, "");
  const c = require(path.join(SRC, "content", f));
  const t = TOOLS.find(x => x.slug === slug);
  if (!t) { console.error("content file without catalog entry: " + slug); process.exit(1); }
  Object.assign(t, c, { built: true });
});

const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const url = slug => slug === "index" ? BASE + "/tools" : `${BASE}/tools/${slug}`;
/* /tools/assets/** is served with a one-year immutable cache, so every URL carries a content hash */
function asset(rel) {
  let h = "1";
  try { h = crypto.createHash("md5").update(fs.readFileSync(path.join(OUT, "assets", rel))).digest("hex").slice(0, 8); } catch (e) { }
  return "/tools/assets/" + rel + "?v=" + h;
}

/* ---------- per-tool PWA ----------
   Each tool page links its own manifest, so "install app" on the speed test puts the
   speed test on the home screen — alone, with its own name and its own start_url.
   Distinct "id" values are what make Chrome treat them as separate applications;
   scope stays /tools/ so the installed window can still reach the hub and the
   category pages without leaving the app. */
const SHORT_NAME = {
  "internet-speed-test": "Speed Test", "image-to-pdf": "Img→PDF", "compress-image": "Compress",
  "remove-bg-image": "Remove BG", "pdf-page-picker": "Pick Pages", "extract-pdf-pages": "Extract",
  "delete-pdf-pages": "Del Pages", "split-pdf": "Split PDF", "merge-pdf": "Merge PDF",
  "word-counter": "Words", "password-generator": "Password", "qr-code-generator": "QR Code",
  "json-formatter": "JSON", "lorem-ipsum-generator": "Lorem", "gym-calculator": "Gym Calc",
  "age-calculator": "Age", "zakat-calculator": "Zakat", "khums-calculator": "Khums",
  "building-material-calculator": "Material Calc",
  "percentage-calculator": "Percent", "ideal-weight-calculator": "Ideal kg",
  "remove-duplicate-lines": "De-dupe", "add-watermark": "Watermark", "jpg-to-png": "JPG→PNG",
  "png-to-jpg": "PNG→JPG", "crop-image": "Crop", "resize-image": "Resize", "image-to-base64": "Img→B64",
  "base64-to-image": "B64→Img", "text-to-speech": "Speak", "speech-to-text": "Dictate",
  "uppercase-lowercase": "aA Case", "slug-generator": "Slug", "uuid-generator": "UUID",
  "hash-generator": "Hash", "color-picker": "Colour", "contrast-checker": "Contrast",
  "unit-converter": "Convert", "file-converter": "File Conv", "heic-to-jpg": "HEIC→JPG",
  "webp-to-jpg": "WebP→JPG", "jpg-to-webp": "JPG→WebP", "pdf-to-image": "PDF→Img",
  "image-to-base64-generator": "Img→B64", "text-diff": "Diff", "csv-to-json": "CSV→JSON",
  "pdf-to-text": "PDF→Text", "text-to-pdf": "Text→PDF", "invoice-calculator": "Invoice",
  "image-size-adjuster": "Resize KB", "pakistan-salary-tax-calculator": "Salary Tax",
  "passport-size-photo-maker": "Passport", "resize-compress-image": "Resize Kit",
  "rotate-flip-image": "Rotate/Flip", "pdf-to-images": "PDF→Images", "image-resizer": "Resize"
};
function shortName(t) {
  if (SHORT_NAME[t.slug]) return SHORT_NAME[t.slug];
  const n = (t.name || t.slug).replace(/\s*(generator|converter|calculator|tool)$/i, "").trim();
  return n.length <= 12 ? n : n.slice(0, 12).trim();
}
function toolManifest(t) {
  return {
    id: "/tools/" + t.slug, name: t.name + " — " + BRAND.name, short_name: shortName(t),
    description: t.desc || t.short || t.name,
    start_url: "/tools/" + t.slug, scope: "/tools/", display: "standalone",
    orientation: "any", lang: "en", dir: "ltr", background_color: "#050d20", theme_color: "#050d20",
    categories: ["utilities", "productivity"], prefer_related_applications: false,
    icons: [
      { src: "/assets/img/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/assets/img/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/assets/img/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ],
    shortcuts: [{ name: "All free tools", short_name: "All tools", url: "/tools/",
      icons: [{ src: "/assets/img/icon-192.png", sizes: "192x192", type: "image/png" }] }]
  };
}

/* ---------- layout capture from existing pages (read-only) ---------- */
function layout() {
  const h = fs.readFileSync(path.join(DIST, "services.html"), "utf8");
  const env = (h.match(/<body[^>]*>(.*?)<header/i) || [ , ""])[1];
  const bodyAttrs = (h.match(/<body([^>]*)>/i) || [ , ' dir="ltr"'])[1];
  const hdr = (h.match(/<header class="hdr">[\s\S]*?<\/header>/) || [""])[0];
  const foot = (h.match(/<footer>[\s\S]*?<\/footer>/) || [""])[0];
  if (!hdr || !foot) throw new Error("Could not find header/footer in dist/services.html — is dist built?");
  return { env, bodyAttrs, hdr, foot };
}

function toolsHeader(hdrBase, activeHub) {
  let h = hdrBase
    .replace('<button class="lang-btn" id="lang-toggle" type="button">اردو</button>',
             '<button class="lang-btn" id="lang-toggle" type="button" aria-pressed="false">اردو</button>');
  /* idempotent: services.html may already contain the Free Tools nav item */
  if (!/data-i18n="nav\.tools"/.test(h)) {
    h = h.replace('<li><a href="/contact.html"',
      '<li><a href="/tools/index.html" data-i18n="nav.tools">Free Tools</a></li><li><a href="/contact.html"');
  }
  if (activeHub) {
    h = h.replace(/(<a\b[^>]*href="\/tools\/index\.html"[^>]*)(>)/, (m, a, close) => {
      if (/\bclass=/.test(a)) return a.replace(/class="([^"]*)"/, 'class="$1 active"') + ' aria-current="page"' + close;
      return a + ' class="active" aria-current="page"' + close;
    });
  }
  if (!/data-i18n="nav\.tools"/.test(h)) throw new Error("nav splice failed — header markup changed in dist/services.html");
  return h;
}
function toolsFooter(footBase) {
  let f = footBase.replace(/<button class="btn btn-sm btn-wa"[^>]*data-quote>[\s\S]*?<\/button>/, "");
  if (!f.includes('/tools/index.html')) {
    f = f.replace('<a href="/contact.html"', '<a href="/tools/index.html">Free Tools</a></li><li><a href="/contact.html"');
  }
  if (!f.includes('/tools/index.html')) throw new Error("footer splice failed — footer markup changed in dist/services.html");
  return f;
}

/* ---------- shared head ---------- */
function metaHead({ title, desc, keywords, canonical, page, ogType = "website", manifest, appTitle }) {
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${keywords ? `<meta name="keywords" content="${esc(keywords)}">` : ""}
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${canonical}"><link rel="alternate" hreflang="ur" href="${canonical}"><link rel="alternate" hreflang="x-default" href="${canonical}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="${ogType}"><meta property="og:site_name" content="${esc(BRAND.name)}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}"><meta property="og:image" content="${BRAND.og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${BRAND.og}">
<meta name="theme-color" content="#050d20"><meta name="format-detection" content="telephone=no">
<meta name="author" content="${esc(BRAND.name)}, Lahore">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32"><link rel="icon" href="/assets/img/favicon-16.png" sizes="16x16">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png"><link rel="manifest" href="${manifest || "/manifest.webmanifest"}">
${appTitle ? `<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="${esc(appTitle)}"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">` : ""}
<link rel="preload" href="/assets/css/styles.css" as="style"><link rel="stylesheet" href="/assets/css/styles.css">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin><link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin><link rel="dns-prefetch" href="https://cdn.jsdelivr.net"><link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
<link rel="stylesheet" href="${asset("tools.css")}">
<link rel="stylesheet" href="${asset("tools-3d.css")}">`;
}

const ldWebApp = t => ({ "@context": "https://schema.org", "@type": "WebApplication", name: t.name + " — " + BRAND.name,
  url: url(t.slug), applicationCategory: t.appCategory || "UtilitiesApplication", operatingSystem: "Any",
  browserRequirements: "Requires a browser with JavaScript", inLanguage: ["en", "ur"],
  isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: t.priceCurrency || "PKR" },
  featureList: t.features, description: t.desc, publisher: { "@type": "Organization", name: BRAND.name, url: BRAND.url } });
const ldFaq = t => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
const ldHowTo = t => t.steps && t.steps.length ? ({ "@context": "https://schema.org", "@type": "HowTo",
  name: "How to use the " + t.name, description: t.desc, totalTime: "PT1M",
  step: t.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s })) }) : null;
const ldCrumb = (t, pageName) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
  { "@type": "ListItem", position: 1, name: "Home", item: BASE + "/index.html" },
  { "@type": "ListItem", position: 2, name: "Free Tools", item: url("index") },
  { "@type": "ListItem", position: 3, name: pageName, item: url(t ? t.slug : "index") }] });
const ldScripts = arr => arr.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n");

const PRIVACY_SVG = `<p class="privacy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5.5V11c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5.5Z"/><path d="m9 12 2 2 4-4"/></svg> ${esc(BRAND.privacy)}</p>`;

/* ---------- docs block (unique content below the tool) ---------- */
function sectionBlock(s) {
  const table = s.table ? `<div class="tbl-wrap"><table class="tbl"><thead><tr>${s.table.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${s.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : "";
  return `<h2 id="${esc(s.id || "")}">${esc(s.h2)}</h2>
<div class="t3d-textbox">${(s.paras || []).map(p => `<p>${esc(p)}</p>`).join("")}${table}</div>`;
}
function docsBlock(t) {
  const sections = (t.sections || []).map(sectionBlock).join("\n");
  return `<section class="t-docs">
<div class="t-hero-img"><img src="/tools/assets/img/tool-${t.cat === 'pdf' ? 'pdf' : t.cat === 'calc' ? 'calc' : t.cat === 'text' ? 'text' : 'image-compress'}.webp" alt="${esc(t.name)} interface preview" width="1200" height="800" loading="lazy" decoding="async"></div>
<h2 id="about">What this tool does</h2>
<div class="t3d-textbox">${t.intro.map(p => `<p>${esc(p)}</p>`).join("")}</div>
${t.guide ? `<p class="hint" style="margin-top:10px"><a href="${esc(t.guide)}"><b>Read the full guide:</b> ${esc(t.guideTitle || "step-by-step guide")} →</a></p>` : ""}
${sections}
${t.sources && t.sources.length ? `<h2 id="sources">Research &amp; sources</h2>
<div class="t3d-textbox"><ul>${t.sources.map(([u, label]) => `<li><a href="${esc(u)}" rel="nofollow noopener" target="_blank">${esc(label)}</a></li>`).join("")}</ul></div>` : ""}
<h2 id="how-to-use">How to use the ${esc(t.name)} <span style="color:var(--cy)">| Step by Step Guide</span></h2>
<div class="howto"><ol>${t.steps.map(s => `<li><span>${esc(s)}</span></li>`).join("")}</ol></div>
<div class="t3d-textbox ru" data-ru lang="ros"><p>${esc(t.ur)}</p></div>
<h2 id="features">Features</h2>
<div class="t3d-textbox"><ul class="feat-list">${t.features.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>
<h2 id="tips">Tips</h2>
<div class="t3d-textbox"><ul>${t.tips.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>
<h2 id="faq">Frequently asked questions</h2>
${t.faqs.map(f => `<details><summary>${esc(f.q)}</summary><div class="t3d-textbox"><p>${esc(f.a)}</p></div></details>`).join("\n")}
<h2 id="related">Related tools <span style="color:var(--cy)">— Try more free tools</span></h2>
<div class="related-grid">${t.related.map(([sl, lb]) => `<a class="rel-card" href="/tools/${sl === "index" ? "index.html" : sl + ".html"}"><span class="rel-ic">⚡</span><span><b>${esc(lb)}</b><small>Free, private and no upload</small></span></a>`).join("")}</div>
<div class="t3d-textbox">${PRIVACY_SVG.replace('<p class="privacy">','<p>').replace('</p>','</p>')}</div>
</section>`;
}

/* ---------- tool page ---------- */
function toolPage(t, L) {
  /* All pinned libraries are advertised on every tool page. They still load only on
     first use via T.cdn(), so this costs ~1 KB of inline JSON and fixes HEIC/PDF
     actions on tools whose config did not list the library explicitly. */
  const libJson = JSON.stringify(Object.fromEntries(Object.keys(LIBS).map(k => [k, { url: LIBS[k].url, sri: LIBS[k].sri, global: LIBS[k].global }])));
  const libCfg = `<script>window.WST_T=window.WST_T||{};WST_T.LIBS=${libJson};</script>`;
  const heroBlock = `<div class="wrap tool-hero">
  <span class="eyebrow">${esc(CATS[t.cat])} · free · no upload</span>
  <h1>${esc(t.h1)}</h1>
  <p class="sub">${esc(t.short || t.desc)}</p>
  ${PRIVACY_SVG}
</div>`;
  const toolBlock = `<div class="wrap${t.uiFirst ? " tool-first" : ""}" role="region" aria-label="${esc(t.name)} tool">
${t.ui}
</div>`;
  const body = `${L.env}${L.hdr}<main id="main" class="tools-main" data-slug="${t.slug}" data-cat="${t.cat}">
<div class="wrap"><nav class="bcrumbs" aria-label="Breadcrumb"><a href="/index.html">Home</a><span aria-hidden="true">›</span><a href="/tools/index.html">Free Tools</a><span aria-hidden="true">›</span><span>${esc(t.name)}</span></nav></div>
${t.uiFirst ? toolBlock + heroBlock : heroBlock + toolBlock}
<div class="wrap">
${docsBlock(t)}
</div>
</main>`;
  return `<!doctype html>
<html lang="en" dir="ltr" data-page="tools/${t.slug}.html">
<head>
${metaHead({ title: t.title, desc: t.desc, keywords: (t.kw || []).join(", "), canonical: url(t.slug), manifest: `/tools/${t.slug}.webmanifest`, appTitle: shortName(t) })}
${ldScripts([ldWebApp(t), ldFaq(t), ldHowTo(t), ldCrumb(t, t.name)].filter(Boolean))}
${libCfg}
</head>
<body${L.bodyAttrs}>${body}
${L.foot}
<script src="/assets/js/main.js" defer></script>
<script src="${asset("tools.js")}" defer></script>
<script src="${asset("tools-3d.js")}" defer></script>
${t.built ? `<script src="${asset("t/" + t.slug + ".js")}" defer></script>` : ""}
</body></html>
`;
}

/* ---------- hub page ---------- */
const ICONS = {
  image: '<path d="M4 5h16v14H4z"/><path d="m5 17 5-6 3 3.5L16 11l3 6"/><circle cx="9" cy="9" r="1.3"/>',
  pdf: '<path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4"/><path d="M10 13h4M10 17h4"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2m3 0h3M8 16h2m3 0h3"/>',
  text: '<path d="M4 7V5h16v2M12 5v14M9 19h6"/>',
  def: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>'
};
const CARD_BLURB = {
  "image-to-pdf": "Photos into one A4/Letter PDF, reorder & margins",
  "jpg-to-png": "Lossless PNG output, one file or a batch",
  "add-watermark": "Corner mark or full diagonal tile, opacity control",
  "lorem-ipsum-generator": "Placeholder paragraphs, sentences or words",
  "remove-duplicate-lines": "De-duplicate, trim, sort and clean a list",
  "percentage-calculator": "Three modes: %, of, and percentage change",
  "word-counter": "Words, characters, reading time and Urdu-aware count",
  "password-generator": "crypto-grade random, copy or save as text",
  "qr-code-generator": "URL, text, WhatsApp or WiFi as PNG + SVG",
  "json-formatter": "Prettify, minify and validate with line numbers",
  "ideal-weight-calculator": "Four clinical formulas side by side",
  "crop-image": "Drag a box, lock 1:1 / story / passport ratio",
  "compress-image": "Hit an exact 20/50/100/200 KB target",
  "building-material-calculator": "Bricks, cement, steel, sand & city cost",
};
/* hub cards: prefer a hand-tuned line, else the first clause of the page's `short` */
function blurbOf(t) {
  const s = (t.short || "").split(/ — |;|\u2014 /)[0];
  if (s.length <= 62) return s;
  const cut = s.slice(0, 60);
  return cut.slice(0, Math.max(cut.lastIndexOf(" "), cut.lastIndexOf(","))) + "…";
}
function hubPage(L) {
  const byCat = {};
  TOOLS.forEach(t => (byCat[t.cat] = byCat[t.cat] || []).push(t));
  const ACC = {image:'var(--t3d-gold)',pdf:'var(--t3d-blue)',calc:'var(--t3d-purple)',text:'var(--t3d-cyan)'};
  const cards = cat => byCat[cat].map(t => {
    const ic = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[t.cat] || ICONS.def}</svg>`;
    return t.built
      ? `<a class="t3d-card" style="--t3d-acc:${ACC[cat]||'var(--t3d-gold)'}" href="/tools/${t.slug}" data-search="${esc((t.name + " " + (t.kw || []).join(" ")).toLowerCase())}"><span class="t3d-ic">${ic}</span><span class="t3d-txt"><b>${esc(t.name)}</b><small>${esc(CARD_BLURB[t.slug] || blurbOf(t))}</small></span></a>`
      : `<span class="t3d-card" style="--t3d-acc:${ACC[cat]||'var(--t3d-gold)'};opacity:.6" aria-disabled="true"><span class="t3d-ic">${ic}</span><span class="t3d-txt"><b>${esc(t.name)}</b><small>Coming soon</small></span></span>`;
  }).join("\n");
  const secs = Object.keys(CATS).map(c => `<section data-cat="${c}"><h2 class="cat-h2">${esc(CATS[c])}${CATPAGES[c] ? ` <a class="cat-all" href="/tools/${CATPAGES[c].file}.html">All ${TOOLS.filter(t => t.cat === c && t.built).length} ${esc(CATS[c].toLowerCase())} ›</a>` : ""}</h2><div class="t3d-persp"><div class="t3d-hub-grid">${cards(c)}</div></div></section>`).join("\n");
  const body = `${L.env}${L.hdr}<main id="main" class="tools-main">
<div class="wrap"><nav class="bcrumbs" aria-label="Breadcrumb"><a href="/index.html">Home</a><span aria-hidden="true">›</span><span>Free Tools</span></nav></div>
<div class="wrap tool-hero">
  <span class="eyebrow">Free · private · works offline after first load</span>
  <h1>${esc(HUB.h1)}</h1>
  <p class="sub">${esc(HUB.intro)}</p>
  ${PRIVACY_SVG}
  <span class="ru" data-ru lang="ros">${esc(HUB.ur)}</span>
  <div class="hub-search"><label class="sr-only" for="q">Search tools</label><input type="search" id="q" placeholder="Search: compress, pdf, qr, bmi, zakat…" autocomplete="off"><span class="hint" aria-hidden="true">${TOOLS.length} tools</span></div>
</div>
<div class="wrap">${secs}
<p id="no-res" class="hint" hidden>No tools match that search yet — try “pdf”, “image” or “calc”.</p>
</div>
</main>`;
  const toolListLd = { "@context": "https://schema.org", "@type": "ItemList", name: "Free Online Tools — " + BRAND.name, itemListElement: TOOLS.filter(t => t.built).map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: url(t.slug) })) };
  return `<!doctype html>
<html lang="en" dir="ltr" data-page="tools/index.html">
<head>
${metaHead({ title: HUB.title, desc: HUB.desc, keywords: HUB.kw, canonical: url("index") })}
${ldScripts([ldCrumb(null, "index"), toolListLd])}
</head>
<body${L.bodyAttrs}>${body}
${L.foot}
<script src="/assets/js/main.js" defer></script>
<script src="${asset("tools.js")}" defer></script>
<script src="${asset("tools-3d.js")}" defer></script>
</body></html>
`;
}

/* ---------- category landing pages (one per catalog category) ---------- */
const CATPAGES = require(path.join(SRC, "catpages.js"));
function catCards(cat) {
  const ACC = { image: "var(--t3d-gold)", pdf: "var(--t3d-blue)", calc: "var(--t3d-purple)", text: "var(--t3d-cyan)" };
  const list = TOOLS.filter(t => t.cat === cat && t.built);
  return list.map(t => {
    const ic = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[t.cat] || ICONS.def}</svg>`;
    return `<a class="t3d-card" style="--t3d-acc:${ACC[cat] || "var(--t3d-gold)"}" href="/tools/${t.slug}" data-search="${esc((t.name + " " + (t.kw || []).join(" ")).toLowerCase())}"><span class="t3d-ic">${ic}</span><span class="t3d-txt"><b>${esc(t.name)}</b><small>${esc(CARD_BLURB[t.slug] || blurbOf(t))}</small></span></a>`;
  }).join("\n");
}
function catPage(cat, L) {
  const c = CATPAGES[cat];
  const name = CATS[cat];
  const list = TOOLS.filter(t => t.cat === cat && t.built);
  const others = Object.keys(CATPAGES).filter(k => k !== cat);
  const body = `${L.env}${L.hdr}<main id="main" data-cat="${cat}" data-count="${list.length}">
<div class="wrap"><nav class="bcrumbs" aria-label="Breadcrumb"><a href="/index.html">Home</a><span aria-hidden="true">›</span><a href="/tools/index.html">Free Tools</a><span aria-hidden="true">›</span><span>${esc(name)}</span></nav></div>
<div class="wrap tool-hero">
  <span class="eyebrow">${esc(c.eyebrow)}</span>
  <h1>${esc(c.h1)}</h1>
  <p class="sub">${esc(c.sub)}</p>
  ${PRIVACY_SVG}
  <span class="ru" data-ru lang="ros">${esc(c.ur)}</span>
</div>
<div class="wrap" role="region" aria-label="${esc(name)} list">
  <div class="t3d-persp"><div class="t3d-hub-grid">${catCards(cat)}</div></div>
  <p class="hint">${list.length} ${esc(name.toLowerCase())} · ${c.kw.slice(0, 4).join(", ")} · all free, all in-browser</p>
</div>
<div class="wrap">
<section class="t-docs">
<h2 id="about">What these ${esc(name.toLowerCase())} do</h2>
<div class="t3d-textbox">${c.intro.map(p => `<p>${esc(p)}</p>`).join("")}</div>
<h2 id="how-to-use">How to use the ${esc(name.toLowerCase())} <span style="color:var(--cy)">| Step by Step Guide</span></h2>
<div class="howto"><ol>${c.how.map(s => `<li><span>${esc(s)}</span></li>`).join("")}</ol></div>
<div class="t3d-textbox ru" data-ru lang="ros"><p>${esc(c.ur)}</p></div>
<h2 id="features">Features <span style="color:var(--cy)">— ${list.length} tools on this page</span></h2>
<div class="t3d-textbox"><ul class="feat-list">${c.features.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>
<h2 id="tips">Tips</h2>
<div class="t3d-textbox"><ul>${c.tips.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>
<h2 id="faq">Frequently asked questions</h2>
${c.faqs.map(f => `<details><summary>${esc(f.q)}</summary><div class="t3d-textbox"><p>${esc(f.a)}</p></div></details>`).join("\n")}
<h2 id="more">Other tool categories <span style="color:var(--cy)">— keep browsing</span></h2>
<div class="related-grid">${others.map(k => `<a class="rel-card" href="/tools/${CATPAGES[k].file}.html"><span class="rel-ic">⚡</span><span><b>${esc(CATS[k])}</b><small>${TOOLS.filter(t => t.cat === k && t.built).length} free in-browser tools</small></span></a>`).join("")}
<a class="rel-card" href="/tools/index.html"><span class="rel-ic">⚡</span><span><b>All Free Tools</b><small>Search the complete ${TOOLS.length}-tool list</small></span></a></div>
<div class="t3d-textbox">${PRIVACY_SVG.replace('<p class="privacy">', "<p>").replace("</p>", "</p>")}</div>
</section>
</div>
</main>`;
  const crumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE + "/index.html" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: url("index") },
    { "@type": "ListItem", position: 3, name: name, item: BASE + "/tools/" + c.file } ] };
  const itemList = { "@context": "https://schema.org", "@type": "ItemList", name: name + " — " + BRAND.name, itemListElement: list.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: url(t.slug) })) };
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return `<!doctype html>
<html lang="en" dir="ltr" data-page="tools/${c.file}.html">
<head>
${metaHead({ title: c.title, desc: c.desc, keywords: (c.kw || []).join(", "), canonical: BASE + "/tools/" + c.file + ".html" })}
${ldScripts([crumb, itemList, faq])}
</head>
<body${L.bodyAttrs}>${body}
${L.foot}
<script src="/assets/js/main.js" defer></script>
<script src="${asset("tools.js")}" defer></script>
<script src="${asset("tools-3d.js")}" defer></script>
</body></html>
`;
}

/* ---------- write ---------- */
function ensure(d) { fs.mkdirSync(d, { recursive: true }); }
function build(slugs) {
  ensure(OUT); ensure(path.join(OUT, "assets", "t"));
  fs.copyFileSync(path.join(SRC, "tools.css"), path.join(OUT, "assets", "tools.css"));
  fs.copyFileSync(path.join(SRC, "tools.js"), path.join(OUT, "assets", "tools.js"));
  fs.copyFileSync(path.join(SRC, "tools-3d.css"), path.join(OUT, "assets", "tools-3d.css"));
  fs.copyFileSync(path.join(SRC, "tools-3d.js"), path.join(OUT, "assets", "tools-3d.js"));
  const CFGD = path.join(SRC, "config");
  if (fs.existsSync(CFGD)) {
    ensure(path.join(OUT, "assets", "config"));
    fs.readdirSync(CFGD).filter(f => f.endsWith(".json")).forEach(f => fs.copyFileSync(path.join(CFGD, f), path.join(OUT, "assets", "config", f)));
  }
  const L = layout();
  const H = { ...L, hdr: toolsHeader(L.hdr, true), foot: toolsFooter(L.foot) };
  const B = { ...L, hdr: toolsHeader(L.hdr, false), foot: toolsFooter(L.foot) };
  fs.writeFileSync(path.join(OUT, "index.html"), hubPage(H));
  Object.keys(CATPAGES).forEach(cat => {
    const html = catPage(cat, B);
    fs.writeFileSync(path.join(OUT, CATPAGES[cat].file + ".html"), html);
    fs.writeFileSync(path.join(OUT, CATPAGES[cat].file), html);
  });

  const list = TOOLS.filter(t => t.built && (!slugs.length || slugs.includes(t.slug)));
  list.forEach(t => {
    const mod = t.module || t.slug;
    const srcT = path.join(SRC, "t", mod + ".js");
    if (fs.existsSync(srcT)) fs.copyFileSync(srcT, path.join(OUT, "assets", "t", t.slug + ".js"));
    else console.error("missing module: t/" + mod + ".js for " + t.slug);
    fs.writeFileSync(path.join(OUT, t.slug + ".html"), toolPage(t, B));
    /* extensionless twin (same HTML, canonical points at .html) so /tools/<slug> serves without a rewrite */
    fs.writeFileSync(path.join(OUT, t.slug), fs.readFileSync(path.join(OUT, t.slug + ".html")));
    /* this tool alone, installable as its own app */
    fs.writeFileSync(path.join(OUT, t.slug + ".webmanifest"), JSON.stringify(toolManifest(t), null, 1));
  });
  console.log("built: tools/index.html + " + list.map(t => t.slug).join(", "));
  updateSitemap();
}

/* ---------- sitemap.xml: the tools block is regenerated between markers, nothing else is touched ---------- */
function updateSitemap() {
  const p = path.join(DIST, "sitemap.xml");
  if (!fs.existsSync(p)) { console.error("sitemap: dist/sitemap.xml missing — run build/build.js first"); return; }
  let h = fs.readFileSync(p, "utf8");
  h = h.replace(/\n {0,2}<!-- TOOLS -->[\s\S]*?<!-- \/TOOLS -->/, "");
  const files = ["index", ...Object.keys(CATPAGES).map(k => CATPAGES[k].file), ...TOOLS.filter(t => t.built).map(t => t.slug)];
  const loc = f => f === "index" ? BASE + "/tools" : BASE + "/tools/" + f + ".html";
  const block = "\n  <!-- TOOLS -->\n" + files.map(f =>
    `  <url><loc>${loc(f)}</loc><lastmod>${LASTMOD}</lastmod><changefreq>monthly</changefreq><priority>${f === "index" ? "0.9" : "0.8"}</priority></url>`
  ).join("\n") + "\n  <!-- /TOOLS -->\n";
  if (h.indexOf("</urlset>") === -1) { console.error("sitemap: no </urlset> in dist/sitemap.xml — left untouched"); return; }
  fs.writeFileSync(p, h.replace("</urlset>", block + "</urlset>"));
  console.log("sitemap: " + files.length + " tool urls between the TOOLS markers");
}

/* ---------- report + content audit ---------- */
function report() {
  const zlib = require("zlib");
  const rows = [];
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(html|css|js)$/.test(e.name)) rows.push(p);
  });
  walk(OUT);
  const dup = new Map(), wordTotals = [];
  rows.sort().forEach(p => {
    const buf = fs.readFileSync(p);
    const gz = zlib.gzipSync(buf).length;
    if (p.endsWith(".html")) {
      const h = buf.toString("utf8");
      const un = s => s.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      const t = un((h.match(/<title>([^<]*)/) || [ , ""])[1]);
      const d = un((h.match(/name="description" content="([^"]*)"/) || [ , ""])[1]);
      const words = (h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").match(/[\p{L}\p{N}][\p{L}\p{N}'’\-]*/gu) || []).length;
      wordTotals.push([path.relative(DIST, p), words]);
      (h.match(/<p>([^<]{80,})<\/p>/g) || []).forEach(s => dup.set(s, (dup.get(s) || 0) + 1));
      console.log(`${String(gz).padStart(7)} gz  ${t.length}t/${d.length}d  ${path.relative(DIST, p)}`);
    } else console.log(`${String(gz).padStart(7)} gz  ${path.relative(DIST, p)}`);
  });
  const dups = [...dup.entries()].filter(([, n]) => n > 1);
  console.log("\ncontent audit: pages=" + wordTotals.length + " duplicate-paragraphs=" + dups.length);
  dups.forEach(([s, n]) => console.log("  DUP×" + n + ": " + s.slice(3, 90)));
  const titles = {};
  wordTotals.forEach(([f]) => { const h = fs.readFileSync(path.join(DIST, f), "utf8"); const t = (h.match(/<title>([^<]*)/) || [ , ""])[1]; if (titles[t]) console.log("TITLE COLLISION: " + t); titles[t] = 1; });
}

const argv = process.argv.slice(2);
if (argv[0] === "--report") report();
else build(argv.filter(a => !a.startsWith("--")));
