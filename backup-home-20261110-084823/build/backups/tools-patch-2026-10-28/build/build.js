// ============================================================
// WAFA SMART TECH — static site generator (zero-dependency) v2
// 21 services · fixed rates 14K/20K/23.5K/30K/35K · 3 demo designs
// node build/build.js  → renders everything into dist/
// ============================================================
"use strict";
const fs = require("fs");
const path = require("path");
const S = require(path.join(__dirname, "src/data/site.js"));
const { LANDING, PRODUCTS: LP } = require(path.join(__dirname, "src/data/landing.js"));

const ROOT = path.join(__dirname, "..");
const SRC = path.join(__dirname, "src");
const DIST = path.join(ROOT, "dist");
const NOW = "2026-10-22";

/* ---------------- utils ---------------- */
const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escA = s => esc(s).replace(/"/g, "&quot;");
const pkr = n => "PKR " + Number(n).toLocaleString("en-US");
const NO_DOMAIN = ["android-app", "ios-app", "windows-app", "ai-agents", "voice-agents", "ai-receptionist", "design-studio"];
const hasDomain = s => !NO_DOMAIN.includes(s.slug);
const slugRe = /^([a-z0-9-]+\/)?[a-z0-9-]+\.html$/;
function wa(msg) { return `https://wa.me/${S.contact.whatsapp}?text=${encodeURIComponent(msg)}`; }
const PAGES = [];
const missing = new Set();
function imgExists(stem) {
  const ok = ["-480.webp", "-880.webp", "-1280.webp", "-1600.webp"].some(s => fs.existsSync(path.join(DIST, "assets/img", stem + s)));
  if (!ok) missing.add(stem);
  return ok;
}
function pic(stem, alt, lazy = true, cls = "", sizes = "(max-width:620px) 92vw,(max-width:1100px) 46vw,380px") {
  const url = `/assets/img/${stem}`;
  const att = `alt="${escA(alt)}" ${lazy ? 'loading="lazy" ' : ""}decoding="async" ${cls ? `class="${cls}" ` : ""}width="880" height="880"`;
  return `<img src="${url}-640.webp" srcset="${url}-320.webp 320w, ${url}-480.webp 480w, ${url}-640.webp 640w, ${url}-880.webp 880w" sizes="${sizes}" ${att}>`;
}
function widePic(stem, alt, lazy = true, sizes = "(max-width:900px) 92vw,560px", priority = false) {
  const url = `/assets/img/${stem}`;
  return `<img src="${url}-1280.webp" srcset="${url}-800.webp 800w, ${url}-1280.webp 1280w, ${url}-1600.webp 1600w" sizes="${sizes}" alt="${escA(alt)}" ${lazy ? 'loading="lazy" ' : ""}decoding="async" ${priority ? 'fetchpriority="high" ' : ""}width="1600" height="900">`;
}

/* ---------------- icons ---------------- */
const I = {
  bolt: "M13 2 4.09 12.35A.5.5 0 0 0 4.5 13.15H11l-1 8.85a.3.3 0 0 0 .55.22l8.9-10.35a.5.5 0 0 0-.44-.82H13l1-7.55A.3.3 0 0 0 13.45 2Z",
  shield: "M12 2 4 5.5V11c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5.5Zm-1.2 13.6-3.2-3.2 1.4-1.4 1.8 1.8 4-4 1.4 1.4Z",
  brain: "M12 3a4 4 0 0 0-4 4c-2 .5-3.5 2.2-3.5 4.3 0 1 .4 2 1.1 2.7-.4.6-.6 1.4-.6 2A4.5 4.5 0 0 0 12 21a4.5 4.5 0 0 0 7-4.9c.7-.7 1.1-1.7 1.1-2.7 0-2.1-1.5-3.8-3.5-4.3a4 4 0 0 0-4-4c-.9 0-1.7.3-2.4.8A4.1 4.1 0 0 0 12 3Zm0 2.1c.5 0 1 .2 1.4.5L12 9l-1.4-3.4c.4-.3.9-.5 1.4-.5Z",
  phone: "M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1Z",
  chart: "M4 20V10h3v10Zm6.5 0V4h3v16ZM17 20v-7h3v7ZM3 22h18v1.6H3Z",
  infinity: "M8 8.5a3.5 3.5 0 1 0 0 7c1.4 0 2.3-.8 4-2.75 1.7 1.95 2.6 2.75 4 2.75a3.5 3.5 0 1 0 0-7c-1.4 0-2.3.8-4 2.75C10.3 9.3 9.4 8.5 8 8.5Zm0 1.8c.8 0 1.6.8 2.9 2.4-1.3 1.6-2.1 2.4-2.9 2.4a1.7 1.7 0 1 1 0-3.4Zm8 0a1.7 1.7 0 1 1 0 3.4c-.8 0-1.6-.8-2.9-2.4 1.3-1.6 2.1-2.4 2.9-2.4Z",
  bot: "M12 2v2.5M5 9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Zm3.5 2.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM9 14.5h6v1.6H9ZM2 11h3v3H2Zm17 0h3v3h-3Z",
  wave: "M3 11h2v2H3Zm3.5-4h2v10h-2ZM10 3h2v18h-2Zm3.5 4h2v10h-2Zm3.5-2h2v14h-2Zm3.5 5h2v4h-2Z",
  desk: "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Zm8-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM3 12h2v3h14v-3h2v3h1v7h-2v-5H4v5H2v-7h1Zm5 1h8v1.6H8Z",
  code: "M8.7 15.3 4.4 11l4.3-4.3L7.2 5.2 1.5 11l5.7 5.8Zm6.6 0 4.3-4.3-4.3-4.3 1.5-1.5L22.5 11l-5.7 5.8ZM13.4 4l-2 .4 3.2 15.6 2-.4Z",
  brief: "M10 4h4a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3V6a2 2 0 0 1 2-2Zm0 3h4V6h-4Zm-2 5v1.5h12V12Z",
  gear: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-1-8h2l.4 2.5c.6.2 1.2.5 1.7.9l2.3-1.1 1 1.7-1.8 1.7c.1.3.1.6.1.9v.1l2.3.6v2l-2.3.6c0 .3 0 .6-.1.9l1.8 1.7-1 1.7-2.3-1.1c-.5.4-1.1.7-1.7.9L13 22h-2l-.4-2.5c-.6-.2-1.2-.5-1.7-.9l-2.3 1.1-1-1.7 1.8-1.7c-.1-.3-.1-.6-.1-.9v-.1l-2.3-.6v-2l2.3-.6c0-.3 0-.6.1-.9L2.8 5.7l1-1.7 2.3 1.1c.5-.4 1.1-.7 1.7-.9Z",
  droid: "M6 12a6 6 0 0 1 12 0v6a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18Zm1-7.5L5.8 2.8m12.4 1.7L17 4.5M9.5 10a1 1 0 1 0 0 .1Zm5 0a1 1 0 1 0 0 .1ZM2 11h2.2v6H2Zm17.8 0H22v6h-2.2Z",
  apple: "M16.7 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.5 1.3-.1 1.8-.9 3.4-.9 1.5 0 2 .9 3.4.9 1.4 0 2.3-1.2 3.2-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4ZM14 4.8c.7-.9 1.2-2.1 1.1-3.3-1.1 0-2.4.7-3.1 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.4-.6 3.1-1.5Z",
  desktop: "M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm2 1.6v7.8h14V6.6ZM2 19h9v1.6H2Zm13.4 0H22v1.6h-6.6Z",
  plane: "M21.5 3.2a1.7 1.7 0 0 0-2.3-.5L3.6 11l6.3 2.8 1 6.6 2.8-4.4 5.4 2.4Zm-11.6 9.3L6.4 11l9.9-5.4-3.4 7.6-.5.9.5 3.1-1-2Z",
  hotel: "M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16h3v2H2v-2Zm3-4h2.4v2H7Zm4.3 0h2.4v2h-2.4ZM7 9.3h2.4v2H7Zm4.3 0h2.4v2h-2.4ZM19 9h2.6a1.4 1.4 0 0 1 0 2.8H19Zm0 4.2h3.4a1.6 1.6 0 0 1 0 3.2H19ZM7 13.4h7.3v1.6H7Z",
  cap: "M12 3 1 8.5 12 14l8.2-3.7V17h2V8.5Zm-6 8v4.1c0 1.9 2.7 3.4 6 3.4s6-1.5 6-3.4V11l-6 2.7Z",
  home: "M12 2.8 2.4 11H5.9v9.2h4.2v-5.9h3.8v5.9h4.2V11h3.5Z",
  cross: "M9.3 2.7h5.4a1 1 0 0 1 1 1v4.6h4.6a1 1 0 0 1 1 1v5.4a1 1 0 0 1-1 1h-4.6v4.6a1 1 0 0 1-1 1H9.3a1 1 0 0 1-1-1v-4.6H3.7a1 1 0 0 1-1-1V9.3a1 1 0 0 1 1-1h4.6V3.7a1 1 0 0 1 1-1Z",
  layers: "M12 2 1.8 7.5 12 13l10.2-5.5Zm-8 9.4L2 12.5 12 18l10-5.5-2-1.1L12 15.7Zm0 4.6L2 17.1 12 22.6l10-5.5-2-1.1-8 4.3Z",
  pen: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75Zm20.71-7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75Z",
  bowl: "M3 11h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9Zm5.6-7.6c.7 1 .7 2 0 3-.7 1-.7 2 0 3 .9-1 1.5-2 1.5-3s-.6-2-1.5-3Zm4.8 0c.7 1 .7 2 0 3-.7 1-.7 2 0 3 .9-1 1.5-2 1.5-3s-.6-2-1.5-3ZM2 22h20v1.4H2Z",
  cart: "M7.2 17.4a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Zm9.9 0a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM6.1 5.4l1.2 6.3c.2.9 1 1.5 1.9 1.5h8.2l.7-3H9l-.2-1.2 11.7-.1 1.3-5.3a.6.6 0 0 0-.6-.8H7.4a1.4 1.4 0 0 0-1.3 2.6Z",
  play: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2.5 6.2 6.3 3.8-6.3 3.8Z",
  heart: "M12 20.9S3.2 14.7 3.2 9.4c0-3.1 2.3-5.2 4.6-5.2 1.7 0 3.2.9 4.2 2.3 1-1.4 2.5-2.3 4.2-2.3 2.3 0 4.6 2.1 4.6 5.2 0 5.3-8.8 11.5-8.8 11.5Z",
  check: "M9.6 16.2 5.4 12l-1.4 1.4 5.6 5.6L20.1 8.4 18.7 7Z",
  wa: "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 13.7c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.7-4.5-3.9-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.1c.2-.3.5-.3.7-.3h.5c.2 0 .4-.1.6.4l.9 2c.1.2.1.4 0 .6l-.4.5c-.1.2-.3.3-.1.6.1.3.6 1.1 1.4 1.8 1 .9 1.8 1.1 2 1.2.3.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l2 .9c.2.1.4.2.4.3.1.1.1.5 0 1Z",
  spark: "M12 2l1.8 5.6L19.5 9 13.8 10.8 12 16.5 10.2 10.8 4.5 9l5.7-1.4ZM19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9ZM5 15l.7 2 2 .7-2 .7L5 20.5l-.7-2.1-2-.7 2-.7Z",
  pin: "M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z",
  mail: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.6 2L12 12.3 19.4 7ZM4 8.7V17h16V8.7l-8 5.4Z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.8 4.8v5l3.6 2.2-.8 1.3-4.4-2.6V6.8Z"
};
const svg = (k, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${I[k] || I.spark}"/></svg>`;

/* ---------------- page shell ---------------- */
function head({ file, title, desc, jsonld = [], body = "", noindex = false, heroImg = "og-cover" }) {
  const url = file === "index.html" ? S.brand.url + "/" : `${S.brand.url}/${file}`;
  const og = `${S.brand.url}/assets/img/og-cover.jpg`;
  return `<!doctype html>
<html lang="en" dir="ltr" data-page="${escA(file)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${escA(desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${url}"><link rel="alternate" hreflang="ur" href="${url}"><link rel="alternate" hreflang="x-default" href="${url}">
${noindex ? '<meta name="robots" content="noindex,nofollow">' : '<meta name="robots" content="index,follow,max-image-preview:large">'}
<meta property="og:type" content="website"><meta property="og:site_name" content="${escA(S.brand.name)}">
<meta property="og:title" content="${escA(title)}"><meta property="og:description" content="${escA(desc)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:type" content="image/jpeg"><meta property="og:locale" content="en_PK"><meta property="og:locale:alternate" content="ur_PK">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escA(title)}"><meta name="twitter:description" content="${escA(desc)}"><meta name="twitter:image" content="${og}">
<meta name="theme-color" content="#071a16"><meta name="format-detection" content="telephone=no">
<meta name="author" content="${escA(S.brand.name)}, Lahore">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32"><link rel="icon" href="/assets/img/favicon-16.png" sizes="16x16">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest">
<link rel="preload" href="/assets/fonts/manrope-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/sora-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/css/styles.css" as="style"><link rel="stylesheet" href="/assets/css/styles.css">
<link rel="stylesheet" href="/assets/css/3d.css">
${file === "index.html" ? '<link rel="preload" as="image" href="/assets/img/hero-ai-1280.webp" imagesrcset="/assets/img/hero-ai-800.webp 800w, /assets/img/hero-ai-1280.webp 1280w, /assets/img/hero-ai-1600.webp 1600w" imagesizes="(max-width:900px) 92vw, 560px" fetchpriority="high">' : ""}
${jsonld.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
<script>window.WST_CFG={wa:"${S.contact.whatsapp}",brand:"${escA(S.brand.name)}",price:${S.PRICE},url:"${url}"};</script>
</head>
<body dir="ltr" ${body}>`;
}

function nav(active) {
  const L = [["home", "Home", "ہوم", "/index.html"], ["services", "Services", "سروسز", "/services.html"], ["pricing", "Pricing", "قیمتیں", "/pricing.html"], ["portfolio", "Portfolio", "نمونے", "/portfolio.html"], ["about", "About", "ہمارے بارے میں", "/about.html"], ["blog", "Blog", "بلاگ", "/blog.html"], ["contact", "Contact", "رابطہ", "/contact.html"]];
  return `<div class="progress" aria-hidden="true"></div>
<header class="hdr"><nav class="nav" aria-label="Main">
<a class="logo" href="/index.html" aria-label="${escA(S.brand.name)} home"><img src="/assets/img/logo.webp" alt="${escA(S.brand.name)} logo" width="42" height="42" fetchpriority="high"><span>WAFA<i class="dot">.</i><span class="grad-txt logo-more">SMART</span><span class="logo-more">TECH</span></span></a>
<ul class="nav-links" id="nav-links">${L.map(([k, t, u, href]) => `<li><a href="${href}" ${active === k ? 'class="active" aria-current="page"' : ""} data-i18n="nav.${k}">${t}</a></li>`).join("")}</ul>
<div class="nav-cta">
<button class="lang-btn" id="lang-toggle" type="button">اردو</button>
<a class="btn btn-sm btn-wa" href="${wa("Assalam o Alaikum! I saw wafasmart.tech and need a quote.")}" data-wa-msg="Assalam o Alaikum! Main ${S.brand.name} se kaam karwana chahta hoon. (Page: {page})" target="_blank" rel="noopener">${svg("wa", 16)} <span data-i18n="cta.wa">WhatsApp</span></a>
<button class="burger" type="button" aria-label="Menu" aria-expanded="false"><span></span></button></div></nav></header>`;
}

function footer() {
  return `<footer><div class="wrap">
<div class="foot-grid">
  <div><a class="logo" href="/index.html"><img src="/assets/img/logo.webp" alt="${escA(S.brand.name)}" width="38" height="38"><span>WAFA<i class="dot">.</i>SMART<span class="grad-txt">TECH</span></span></a>
  <p class="muted panel3d" style="margin-top:14px;max-width:34ch" data-ur="${escA(S.brand.descUr)}">${esc(S.brand.desc)}</p>
  <div class="pill-row"><span class="pill pill-free">${svg("check",12)} <span data-i18n="badge.domain">Domain FREE on sites</span></span><span class="pill pill-demo">${svg("spark",12)} <span data-i18n="badge.demos">3 Demo Designs</span></span></div></div>
  <div><h4 data-i18n="nav.services">Services</h4><ul>${S.services.slice(0, 8).map(s => `<li><a href="/${s.slug}.html" data-ur="${escA(s.nameUr)}">${esc(s.name)}</a></li>`).join("")}<li><a class="rec-link" href="/recovery.html">Hacked? Emergency recovery</a></li><li><a href="/services.html">+ ${S.services.length - 8} more build services →</a></li></ul></div>
  <div><h4>Company</h4><ul>
    <li><a href="/about.html" data-i18n="nav.about">About</a></li><li><a href="/pricing.html" data-i18n="nav.pricing">Pricing</a></li><li><a href="/portfolio.html" data-i18n="nav.portfolio">Portfolio</a></li><li><a href="/blog.html" data-i18n="nav.blog">Blog</a></li><li><a href="/contact.html" data-i18n="nav.contact">Contact</a></li><li><a href="/admin.html">Admin panel</a></li></ul></div>
  <div><h4 data-i18n="nav.contact">Contact</h4><ul>
    <li><a href="${wa("Assalam o Alaikum!")}"><b>${svg("wa", 15)}</b> <span class="ltr" data-wk="contact.whatsappDisplay">${esc(S.contact.whatsappDisplay)}</span> <span class="tiny muted" data-wk="contact.hours">${esc(S.contact.hours)}</span></a></li>
    <li><a href="tel:+${escA(S.contact.whatsapp)}">${svg("phone", 15)} <span class="ltr" data-wk="contact.phoneRaw">${esc(S.contact.phoneRaw)}</span></a></li>
    <li><span data-ur="${escA(S.contact.addressUr)}">${svg("pin", 15)} <span data-wk="contact.address">${esc(S.contact.address)}</span></span></li>
    <li><a href="mailto:${escA(S.contact.email)}" data-wk="contact.email">${esc(S.contact.email)}</a></li></ul>
  <button class="btn btn-sm btn-wa" style="margin-top:14px" type="button" data-quote>${svg("spark",13)} <span data-i18n="cta.quote">Get Quote</span> + 3 Demos</button></div>
</div>
<div class="foot-areas"><b>Areas we serve</b>${LANDING.map(l => `<a href="/${l.slug}.html">${esc(l.city)} · ${esc(l.service)}</a>`).join("")}</div>
<div class="foot-bot"><span>© 2023–2026 ${esc(S.brand.name)} · ${esc(S.brand.domain)} — <span data-i18n="foot.rights">All rights reserved</span></span>
<span data-i18n="foot.made">Built in Lahore — fixed rates from PKR 14,000, domain free, yours forever</span></div>
${certLine()}
</div></footer>
<div class="wa-float"><div class="wa-tip" data-i18n="wa.float">Chat on WhatsApp — instant reply</div>
<a class="wa-btn" aria-label="WhatsApp us" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! Mujhe ${escA(S.brand.name)} se apna project discuss karna hai — 3 demo designs ke saath. (Page: {page})" href="${wa("Assalam o Alaikum!")}">${svg("wa", 30)}</a></div>`;
}

function quoteModal() {
  const svc = S.services.map(s => `<button type="button" class="wiz-opt" data-val="${escA(s.name)}" data-svc="${escA(s.name)}" data-price="${s.price}"><span><b>${esc(s.name)}</b><br><small data-ur="${escA(s.shortUr)}">${esc(s.short)}</small></span><span class="kb">${pkr(s.price)}</span></button>`).join("");
  return `<div class="modal" id="quote-modal" role="dialog" aria-modal="true" aria-label="Free quote wizard">
<div class="modal-bd"></div><div class="modal-box">
<button class="modal-x" type="button" aria-label="Close">✕</button>
<span class="eyebrow" data-i18n="quote.t">Quote Wizard</span>
<div class="wiz-steps" aria-hidden="true"><i class="on"></i><i></i><i></i><i></i></div>
<div class="wiz-pane on"><h3 style="margin-bottom:12px" data-i18n="quote.s1">Pick a service</h3><div class="wiz-opts" data-key="service" style="max-height:300px;overflow:auto">${svc}
<label class="wiz-opt" style="cursor:pointer"><input type="radio" name="qsvc" value="other" style="accent-color:#f4c430;margin-inline-end:10px"><span>Something else / custom</span></label></div>
<p class="hint" style="margin-top:10px">Fixed rates: website <b class="grad-txt">${pkr(S.TIERS.website)}</b> · management ${pkr(S.TIERS.management)} · AI ${pkr(S.TIERS.ai)} · apps ${pkr(S.TIERS.android)}+ · 3 demo designs free</p></div>
<div class="wiz-pane"><h3 style="margin-bottom:12px" data-i18n="quote.s2">Preferred demo style</h3>
<div class="wiz-opts" data-key="scope">${S.DEMOS.map(d => `<button type="button" class="wiz-opt" data-val="${escA(d.n)}"><span>${esc(d.n)}</span><small>${esc(d.style)}</small></button>`).join("")}
<button type="button" class="wiz-opt" data-val="Surprise me — make all 3"><span>${svg("spark",14)} Surprise me</span><small>build all 3 demos</small></button></div></div>
<div class="wiz-pane"><h3 style="margin-bottom:12px" data-i18n="quote.s3">Your contact</h3>
<div class="field"><label for="q-name">Name *</label><input class="input" id="q-name" name="name" autocomplete="name" placeholder="e.g. Ali Raza" data-ur-ph="f.name"></div>
<div class="field"><label for="q-phone">WhatsApp number *</label><input class="input" id="q-phone" name="phone" inputmode="tel" autocomplete="tel" placeholder="03XX-XXXXXXX"></div>
<div class="field"><label for="q-note">Package / notes</label><input class="input" id="q-note" placeholder="e.g. School admission portal with SMS"></div>
<div class="field"><label for="q-msg">Project details</label><textarea class="input" id="q-msg" placeholder="What should it do? Deadline? Urdu is fine."></textarea></div></div>
<div class="wiz-pane"><h3 data-i18n="quote.s4">Confirm &amp; send</h3>
<p class="muted" style="margin:10px 0 6px">Ye summary WhatsApp par chali jayegi.</p>
<p class="glass" id="q-summary" style="padding:14px;font-size:.9rem;color:var(--txt-2)">—</p>
<a class="btn btn-lg btn-wa btn-block" id="q-send" href="#" target="_blank" rel="noopener" style="margin-top:14px">${svg("wa", 20)} <span data-i18n="quote.send">Send quote on WhatsApp</span></a>
<p class="hint">Aapka data sirf WhatsApp par jata hai · is site par koi server nahi.</p></div>
<div class="wiz-nav"><button class="btn btn-ghost" id="q-back" type="button" data-i18n="quote.back">Back</button>
<button class="btn" id="q-next" type="button"><span data-i18n="quote.next">Next</span> →</button></div>
<input type="hidden" id="q-service-select">
</div></div>`;
}

const bgfx = `<div class="bg-fx" aria-hidden="true"></div><div class="bg-grid" aria-hidden="true"></div><div class="orb orb-1" aria-hidden="true"></div><div class="orb orb-2" aria-hidden="true"></div>`;
const scripts = `<script src="/assets/js/main.js" defer></script><script src="/assets/js/3d.js" defer></script><script src="/assets/js/i18n.js" defer></script>`;

function ctaBand(sub = "Free consultation on WhatsApp — 3 demo designs ke saath jawab minutes mein.") {
  return `<section class="sec"><div class="wrap"><div class="cta-band rv">
<h2 data-i18n="sec.cta">Ready? Let's build it.</h2>
<p>${esc(sub)}</p>
<div class="hero-cta" style="justify-content:center">
<button class="btn btn-lg" type="button" data-quote>${svg("spark",18)} <span data-i18n="cta.demo">Get Free Demo</span></button>
<a class="btn btn-lg btn-wa" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! Mujhe apna project banwana hai — rate card aur 3 demos bhej dein. (Page: {page})" href="${wa("Hi")}">${svg("wa",18)} WhatsApp 0324 6627054</a>
</div></div></div></section>`;
}

function recoveryCta() {
  return `<section class="sec"><div class="wrap"><div class="cta-band rec-cta-band rv">
<h2 data-ur="ہیک ہو گئے؟ پہلے مفت معائنہ کروائیں۔">Hacked? Get a free inspection first.</h2>
<p>Website/PHP PKR 7,000 · WhatsApp PKR 5,000. Fixed low rates, official process, no OTP requests.</p>
<div class="hero-cta" style="justify-content:center">
<a class="btn btn-lg btn-wa" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! Emergency recovery ke liye free inspection chahiye. (Page: {page})" href="${wa("Emergency recovery inspection")}">${svg("wa", 20)} WhatsApp recovery desk</a>
<a class="btn btn-lg btn-ghost" href="/contact.html">Send details →</a>
</div></div></div></section>`;
}

/* Certification / registration badges (hero + footer) */
function certRow() {
  return `<div class="cert-row" aria-label="Certifications, credentials and registrations">${S.trustBadges.map(b => `<span class="cert-badge"><b class="cert-ic">${svg(b.icon, 16)}</b><span><strong data-ur="${escA(b.labelUr)}">${esc(b.label)}</strong><em data-ur="${escA(b.subUr)}">${esc(b.sub)}</em></span></span>`).join("")}</div>`;
}
function certLine() {
  return `<div class="cert-line">${S.trustBadges.map(b => `<b>${svg(b.icon, 12)} <span data-ur="${escA(b.labelUr)}">${esc(b.label)}</span></b>`).join("")}</div>`;
}
const CERT3D_COLORS = ["aws", "google", "green", "gold", "purple"];
function cert3dGrid() {
  return `<div class="cert3d-grid cert3d-grid--5" role="list" aria-label="Certifications, credentials and registrations">${S.trustBadges.map((b, i) => `<div class="cert3d cert3d--${CERT3D_COLORS[i] || "purple"}" role="listitem">
<span class="cert3d-ic">${svg(b.icon, 18)}</span>
<span class="cert3d-t"><strong data-ur="${escA(b.labelUr)}">${esc(b.label)}</strong><small data-ur="${escA(b.subUr)}">${esc(b.sub)}</small></span>
</div>`).join("")}</div>`;
}
function cert3dBand({ title = "", sub = "", className = "" } = {}) {
  return `<section class="sec-tight creds3d ${className}"><div class="wrap">
${title ? `<div class="sec-head" style="margin-bottom:20px"><span class="eyebrow">Credentials &amp; registrations</span><h2 style="font-size:clamp(1.35rem,3.8vw,1.9rem)">${title}</h2>${sub ? `<p>${sub}</p>` : ""}</div>` : ""}
${cert3dGrid()}
</div></section>`;
}
function cert3dBand3d() {
  return `<section class="w3d-section w3d-section--tight" id="credentials">
<div class="w3d-wrap">
<div class="w3d-head">
<span class="w3d-kicker">Credentials</span>
<h2>Certified. Registered. Answerable.</h2>
<p>Verified credentials behind every build — AWS and Google certified, IT Ministry experience, and ZATCA-compliant delivery for Saudi Arabia.</p>
</div>
${cert3dGrid()}
</div>
</section>`;
}

/* Mobile hero: four product cards arranged as a rotating 3D box. */
function heroCube() {
  const cards = [
    { ic: "code", t: "Business Website", u: "بزنس ویب سائٹ", p: "from PKR 14,000", pu: "۱۴,۰۰۰ سے", d: "Corporate / e-commerce", du: "کارپوریٹ / ای کامرس" },
    { ic: "brain", t: "AI Agent", u: "اے آئی ایجنٹ", p: "from PKR 23,500", pu: "۲۳,۵۰۰ سے", d: "Voice / WhatsApp / receptionist", du: "وائس / واٹس ایپ / ریسپشنسٹ" },
    { ic: "phone", t: "Mobile App", u: "موبائل ایپ", p: "from PKR 30,000", pu: "۳۰,۰۰۰ سے", d: "Android / iOS / Windows", du: "اینڈرائیڈ / آئی او ایس / ونڈوز" },
    { ic: "shield", t: "Recovery", u: "ریکوری", p: "from PKR 5,000", pu: "۵,۰۰۰ سے", d: "Website / PHP / WhatsApp", du: "ویب سائٹ / پی ایچ پی / واٹس ایپ" }
  ];
  return `<div class="hero-cube" role="group" aria-label="Four core products and fixed prices">
    <div class="cube-scene"><div class="cube">
      ${cards.map((c, i) => `<div class="cube-face cube-f${i}"><span class="cube-ic">${svg(c.ic, 20)}</span><b data-ur="${escA(c.u)}">${esc(c.t)}</b><span data-ur="${escA(c.pu)}">${esc(c.p)}</span><em data-ur="${escA(c.du)}">${esc(c.d)}</em></div>`).join("")}
    </div></div>
    <div class="cube-shadow" aria-hidden="true"></div>
    <p class="cube-cap">4 core products · fixed rate card · <b>PKR 5,000+</b></p>
  </div>`;
}

/* ---------------- components ---------------- */
function svcCard(s, i) {
  return `<article class="svc-card rv ${i % 3 === 1 ? "rv-d1" : i % 3 === 2 ? "rv-d2" : ""}" data-tilt="9">
<div class="svc-shine" aria-hidden="true"></div>
<div class="svc-img">${pic(s.img, s.name + " — service by " + S.brand.name, i > 2)}
  <span class="svc-badge">${svg(s.icon, 13)} ${esc(s.days)} days</span>
  <span class="svc-price-tag" data-pkr="${s.price}">${pkr(s.price)}</span></div>
<div class="svc-body">
  <div class="svc-icon">${svg(s.icon)}</div>
  <h3><a href="/${s.slug}.html" data-ur="${escA(s.nameUr)}">${esc(s.name)}</a></h3>
  <p class="svc-desc" data-ur="${escA(s.pageUr)}">${esc(s.page)}</p>
  <div class="svc-extra">${hasDomain(s) ? `<span class="pill pill-free">${svg("check",12)} Domain FREE</span>` : `<span class="pill">${svg("layers",12)} Product build</span>`}<span class="pill pill-demo">${svg("spark",12)} 3 Demos</span><span class="pill pill-own">${svg("shield",12)} Source code</span></div>
  <ul class="svc-feat">${s.features.slice(0, 3).map(f => `<li>${esc(f)}</li>`).join("")}</ul>
  <div class="svc-foot">
    <a class="btn btn-sm" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! Mujhe *${s.name}* chahiye — ${pkr(s.price)} fixed${hasDomain(s) ? " + FREE domain" : ""}. Order confirm karein? (Page: {page})" href="${wa("Order " + s.name)}">${svg("cart",14)} <span data-i18n="cta.order">Order Now</span></a>
    <button class="btn btn-sm btn-wa" type="button" data-quote data-svc="${escA(s.name)}">${svg("wa",13)} <span data-i18n="cta.quote">Get Quote</span></button>
  </div>
</div></article>`;
}

/* Emergency recovery cards — intentionally separate from the 21 build services:
   no demo designs, no source-code/domain promise, just clean & secure. */
function recoveryCard(r, i) {
  const msg = `Assalam o Alaikum! Emergency recovery chahiye: *${r.name}* — ${pkr(r.price)} fixed. Meri site/account hacked hai. Guide karein? (Page: {page})`;
  return `<article class="svc-card rec-card rv ${i ? "rv-d1" : ""}" data-tilt="7">
<div class="svc-shine" aria-hidden="true"></div>
<div class="svc-img">${pic(r.img, r.name + " — emergency recovery by " + S.brand.name, true)}
  <span class="svc-badge rec-badge">${svg(r.icon, 12)} ${esc(r.badge)} · ${esc(r.days)} days</span>
  <span class="svc-price-tag" data-pkr="${r.price}">${pkr(r.price)}</span></div>
<div class="svc-body">
  <div class="svc-icon rec-ic">${svg(r.icon)}</div>
  <h3><a href="/recovery.html#${escA(r.id)}" data-ur="${escA(r.nameUr)}">${esc(r.name)}</a></h3>
  <p class="svc-desc" data-ur="${escA(r.shortUr)}">${esc(r.short)}</p>
  <div class="svc-extra"><span class="pill pill-demo">Emergency</span><span class="pill pill-own">Security fix</span><span class="pill">${esc(r.days)} days</span></div>
  <ul class="svc-feat">${r.features.slice(0, 3).map(f => `<li>${esc(f)}</li>`).join("")}</ul>
  <div class="svc-foot">
    <a class="btn btn-sm btn-wa" target="_blank" rel="noopener" data-wa-msg="${escA(msg)}" href="${wa("Recovery: " + r.name)}">${svg("wa", 16)} <span data-i18n="cta.recover">Recover now</span></a>
    <a class="btn btn-sm btn-ghost" href="/recovery.html#${escA(r.id)}"><span data-i18n="cta.details">Details</span> →</a>
  </div>
</div></article>`;
}

function recoverySection() {
  return `<section class="sec rec-sec" id="recovery"><div class="wrap">
  <div class="sec-head"><span class="eyebrow rec-eyebrow">Emergency recovery</span>
    <h2 data-ur="ہیک ہو گئے؟ ویب سائٹ، پی ایچ پی اور واٹس ایپ — کم مقررہ ریٹ پر ریکوری۔">Hacked? Website, PHP &amp; WhatsApp recovery — low fixed rates.</h2>
    <p class="muted" data-ur="ویب سائٹ / پی ایچ پی ۷,۰۰۰ · واٹس ایپ ۵,۰۰۰۔ پہلے مفت معائنہ، ملکیت کا ثبوت ضروری۔ ہم کبھی او ٹی پی یا پاس ورڈ نہیں مانگتے۔">Website / PHP PKR 7,000 · WhatsApp PKR 5,000. Free inspection first, proof of ownership required. We never ask for OTP or passwords.</p></div>
  <div class="grid c2 rec-grid">${S.recovery.map(recoveryCard).join("")}</div>
  <div class="center" style="margin-top:26px"><a class="btn btn-ghost" href="/recovery.html">Full recovery process, safety rules &amp; FAQ →</a></div>
</div></section>`;
}

function recoveryStrip() {
  return `<div class="rec-strip glass rv">
  <div><span class="pill pill-demo">Emergency recovery</span>
    <h3>Hacked website, PHP or WhatsApp?</h3>
    <p class="muted tiny">Website/PHP recovery <b data-pkr="7000">${pkr(7000)}</b> · WhatsApp recovery <b data-pkr="5000">${pkr(5000)}</b>. Free inspection, proof of ownership, no OTP requests.</p></div>
  <div class="rec-strip-actions">
    <a class="btn btn-red" href="/recovery.html">Recovery details →</a>
    <a class="btn btn-wa" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! Meri site/WhatsApp hacked hai — emergency recovery ke liye baat karni hai. (Page: {page})" href="${wa("Emergency recovery")}">${svg("wa", 18)} WhatsApp now</a>
  </div></div>`;
}

function priceCard(p) {
  return `<article class="price-card rv ${p.pop ? "pop" : ""}">${p.pop ? '<span class="plan-flag">BEST VALUE</span>' : ""}
  <div><h3 data-ur="${escA(p.nUr || "")}">${esc(p.n)}</h3><p class="tiny muted">${esc(p.tag)}</p></div>
  <div class="amount" data-pkr="${p.price}" data-wk="packages.${p.n}.price">${pkr(p.price)}</div>
  <p class="muted" style="font-size:.92rem">${esc(p.desc)}</p>
  <ul>${p.items.map(([t, ok]) => `<li class="${ok ? "" : "no"}"><i>${ok ? "✓" : "✕"}</i> ${esc(t)}</li>`).join("")}</ul>
  <a class="btn ${p.pop ? "" : "btn-ghost"}" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! Mujhe *${p.n}* package (${pkr(p.price)}) chahiye. Shuru karein? (Page: {page})" href="${wa(p.n)}">${svg("cart",15)} <span data-i18n="cta.order">Order Now</span></a>
  <button class="btn btn-sm btn-wa" type="button" data-quote data-svc="${escA(p.n + " package")}" data-price="${p.price}">${svg("wa",14)} <span data-i18n="cta.quote">Get Quote</span></button>
</article>`;
}

function demoCard(d, i, svcName) {
  const msg = svcName ? `${d.n} pasand hai — *${svcName}* project fixed rate par order karein?` : `${d.n} pasand hai — mera project us style me banayein?`;
  return `<article class="demo-card rv ${i ? "rv-d" + i : ""}">
<div class="demo-frame f${i}" aria-hidden="true"><div class="df-bar"><i></i><i></i><i></i></div>
<div class="df-hero"></div><div class="df-row"><span></span><span></span><span></span></div><div class="df-line"></div><div class="df-line s"></div></div>
<h3>${esc(d.n)}</h3><p class="tiny muted">${esc(d.d)}</p>
<div class="pf-tags">${d.feats.map(f => `<span>${esc(f)}</span>`).join("")}</div>
<a class="btn btn-sm btn-block" style="margin-top:14px" target="_blank" rel="noopener" data-wa-msg="${escA(msg)}" href="${wa(msg)}"> <span data-i18n="cta.pickdemo">This design — pick it</span></a>
</article>`;
}

const statCard = st => `<div class="stat-card rv"><b data-count="${st.n}" data-suffix="${escA(st.suffix)}">0${esc(st.suffix)}</b><span data-ur="${escA(st.labelUr)}">${esc(st.label)}</span></div>`;
const stepEl = (s, i) => `<article class="step-card rv ${i % 3 ? "rv-d" + (i % 3) : ""}"><div class="step-top"><span class="step-num">${String(i + 1).padStart(2, "0")}</span><span class="step-ic">${svg(s.icon, 20)}</span></div><h3 data-ur="${escA(s.u)}">${esc(s.t)}</h3><p data-ur="${escA(s.dUr || s.d)}">${esc(s.d)}</p></article>`;
const whyEl = (f, i) => `<div class="f-card rv ${i % 3 ? "rv-d" + (i % 3) : ""}"><div class="f-ic">${svg(f.icon)}</div><h3 data-ur="${escA(f.u)}">${esc(f.t)}</h3><p>${esc(f.d)}</p></div>`;
const tSlide = t => `<div class="t-slide"><div class="t-stars" aria-label="${t.s} out of 5">${"★".repeat(t.s)}</div><blockquote>“${esc(t.qEn)}”</blockquote><div class="t-who"><b>${esc(t.n)}</b><span>${esc(t.r)}</span></div></div>`;
const faqEl = (f, i) => `<div class="faq-item ${i === 0 ? "open" : ""}"><button class="faq-q" type="button" aria-expanded="${i === 0}"><span data-ur="${escA(f.q)}">${esc(f.qEn)}</span><span class="pm">+</span></button><div class="faq-a"><p>${esc(f.aEn)} <br><b style="color:var(--txt-2)">اردو:</b> ${esc(f.a)}</p></div></div>`;
const pfCard = p => `<article class="pf-card" data-tags="${escA(p.tags.join(" "))}" data-tilt="6">${pic(p.img, p.t + " — case study by " + S.brand.name)}
<div class="pf-in"><h3>${esc(p.t)}</h3><p class="muted tiny">${esc(p.r)}</p><div class="pf-tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join("")}<span>${svg("pin",11)} ${esc(p.city)}</span></div></div></article>`;
const guaranteeEl = g => `<div class="guar rv"><span class="k">${svg(g[0], 18)}</span><div><b>${esc(g[1])}</b><br><span class="tiny muted">${esc(g[2])}</span></div></div>`;
const blogCard = b => `<a class="svc-card" style="display:block" href="/blog/${b.slug}.html" data-tilt="7"><div class="svc-shine"></div><div class="svc-img">${pic(b.img, b.title, true, "", "(max-width:620px) 92vw,(max-width:900px) 46vw,560px")}<span class="svc-badge">${svg("pen",12)} ${b.date} · ${b.read}</span></div><div class="svc-body"><h3 data-ur="${escA(b.titleUr)}">${esc(b.title)}</h3><p class="svc-desc">${esc(b.desc)}</p><span class="kb">Read article →</span></div></a>`;

/* ============================================================
   15 location / keyword landing pages
   ============================================================ */
function lpCube(keys) {
  const faces = keys.map((key, i) => {
    const p = LP[key];
    if (!p) return "";
    const msg = `Assalam o Alaikum! Mujhe ${p.title} chahiye — ${pkr(p.price)} fixed. Page: ${keys.city || ""}`;
    return `<div class="w3d-face${i === 0 ? " is-active" : ""}"${i ? " inert" : ""}>
<div class="w3d-media${p.red ? " red" : ""}">
<img src="/assets/img/${p.img}-880.webp" alt="${escA(p.title)} — ${escA(S.brand.name)}" width="880" height="880" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
<span class="w3d-media-icon">${svg(p.icon, 19)}</span>
</div>
<div class="w3d-body">
<span class="w3d-price">from ${pkr(p.price)}</span>
<h3 class="w3d-title">${esc(p.title)}</h3>
<p class="w3d-desc">${esc(p.desc)}</p>
<div class="w3d-actions">
<a class="btn3d btn3d--gold" href="${wa("Order " + p.title)}" data-wa-msg="Assalam o Alaikum! Mujhe *${escA(p.title)}* chahiye — ${pkr(p.price)} fixed + 3 free demos. (Page: {page})">Order</a>
<button class="btn3d btn3d--ghost" type="button" data-quote data-svc="${escA(p.title)}">Quote</button>
</div>
</div></div>`;
  }).join("");
  return `<div class="w3d-visual" data-cube-group>
<div class="w3d-stage" data-cube role="group" aria-label="Fixed-rate products — swipe or use the dots">
<div class="w3d-cube">${faces}</div>
</div>
<div class="w3d-dots" role="group" aria-label="Choose a product">
${keys.map((_, i) => `<button class="w3d-dot" type="button" data-cube-dot aria-label="Show product ${i + 1}" aria-pressed="${i === 0 ? "true" : "false"}"><i></i></button>`).join("")}
</div>
<p class="w3d-hint">Swipe or tap · auto-rotates every 3.2s</p>
<p class="w3d-sr" data-cube-live aria-live="polite"></p>
</div>`;
}

function lpReviewCard(t) {
  const initials = t.n.split(/\s+/).filter(Boolean).map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return `<article class="rev3d" role="listitem">
<div class="rev3d-stars" aria-label="${t.s} out of 5 stars">${"★".repeat(t.s)}</div>
<p>“${esc(t.qEn)}”</p>
<div class="rev3d-foot">
<span class="rev3d-av" aria-hidden="true">${esc(initials)}</span>
<span class="rev3d-who"><b>${esc(t.n)}</b><small>${esc(t.r)}</small></span>
<span class="rev3d-verified">${svg("check", 11)} Google</span>
</div></article>`;
}

function lpLabel(slug) {
  const q = LANDING.find(x => x.slug === slug);
  return q ? `${q.city} — ${q.service}` : slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function landingPage(p) {
  const pageFile = p.slug + ".html";
  const title = p.metaTitle;
  const desc = p.metaDesc;
  const ldService = {
    "@context": "https://schema.org", "@type": "Service",
    name: `${p.service} — ${p.city}`, serviceType: p.service,
    description: p.metaDesc,
    provider: { "@id": S.brand.url + "/#business" },
    areaServed: { "@type": "City", name: p.city },
    offers: {
      "@type": "Offer", priceCurrency: "PKR", price: p.packages[0].p,
      priceValidUntil: "2026-12-31", availability: "https://schema.org/InStock",
      url: S.brand.url + "/" + pageFile
    }
  };
  const ldFaqPage = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: p.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  };
  const html = head({
    file: pageFile, title, desc,
    jsonld: [...ldBase(), ldLocalBusiness(), ldService, ldFaqPage,
      ldBreadcrumb([["Home", "/index.html"], ["Services", "/services.html"], [p.city + " — " + p.service, "/" + pageFile]])]
  }) + bgfx + nav("services") + `<main id="main" class="w3d-main">
<div class="w3d-wrap"><nav class="crumbs3d" aria-label="Breadcrumb"><a href="/index.html">Home</a><span aria-hidden="true">›</span><a href="/services.html">Services</a><span aria-hidden="true">›</span><span>${esc(p.city)} — ${esc(p.service)}</span></nav></div>

<section class="w3d-hero">
<div class="w3d-floor" aria-hidden="true"></div>
<div class="w3d-wrap w3d-hero-grid">
<div class="w3d-hero-copy">
<span class="w3d-kicker">${esc(p.kicker)}</span>
<h1>${esc(p.h1)}</h1>
<p class="w3d-hero-sub">${esc(p.sub)}</p>
<div class="btn3d-row">
<button class="btn3d btn3d--red" type="button" data-quote>${svg("spark", 18)} Get Free Demo</button>
<a class="btn3d btn3d--green" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! Mujhe ${escA(p.service)} chahiye in ${escA(p.city)} — fixed rate aur 3 demos bhejein. (Page: {page})" href="${wa("Hi")}">${svg("wa", 18)} WhatsApp 0324 6627054</a>
</div>
<div class="w3d-hero-trust">
<span>${svg("check", 14)} PKR ${p.packages[0].p.toLocaleString("en-US")} fixed</span>
<span>${svg("check", 14)} 3 free demos</span>
<span>${svg("check", 14)} Source code yours</span>
<span>${svg("check", 14)} <b>160+</b> projects</span>
</div>
</div>
${lpCube(p.cube)}
</div>
</section>

${cert3dBand3d()}

<section class="w3d-section w3d-section--tight" id="why">
<div class="w3d-wrap">
<div class="w3d-head">
<span class="w3d-kicker">Why ${esc(p.city)}</span>
<h2>${esc(p.introTitle)}</h2>
<p>${esc(p.intro1)}</p>
</div>
<div class="card3d-grid">${p.features.map((f, i) => `<article class="card3d rv3d ${i ? "rv3d-d" + i : ""}" data-tilt="6">
<span class="c3d-ic">${svg(f.icon, 20)}</span>
<h3>${esc(f.t)}</h3>
<p>${esc(f.d)}</p>
</article>`).join("")}</div>
<p class="w3d-muted panel3d panel3d--blue" style="max-width:760px;margin:20px auto 0;text-align:center;font-size:.9rem;line-height:1.7">${esc(p.intro2)}</p>
</div>
</section>

<section class="w3d-section" id="pricing">
<div class="w3d-wrap">
<div class="w3d-head">
<span class="w3d-kicker">Fixed rate card</span>
<h2>${esc(p.service)} prices — written before we start</h2>
<p>Three clear options. No hidden charges, 50% advance, 3 demo designs and full source-code handover on every build.</p>
</div>
<div class="price3d-grid">${p.packages.map(x => `<article class="price3d${x.pop ? " price3d--pop" : ""} rv3d" data-tilt="5">
${x.pop ? '<span class="price3d-tag">Most popular</span>' : ""}
<h3>${esc(x.n)}</h3>
<p class="p3d-sub">${esc(x.sub)}</p>
<div class="p3d-amount">${pkr(x.p)} <small>PKR fixed</small></div>
<ul>${x.feats.map(f => `<li>${svg("check", 13)}${esc(f)}</li>`).join("")}</ul>
<button class="btn3d btn3d--gold btn3d--sm" type="button" data-quote data-svc="${escA(x.n)}">Get Free Demo</button>
</article>`).join("")}</div>
</div>
</section>

<section class="w3d-section w3d-section--tight" id="process">
<div class="w3d-wrap">
<div class="w3d-head">
<span class="w3d-kicker">How we work</span>
<h2>Four steps from WhatsApp to launch</h2>
<p>The same process for every ${esc(p.city)} project — free consultation, written quote, three demo designs, then build and handover.</p>
</div>
<div class="steps3d">${S.process.slice(0, 4).map((s, i) => `<article class="step3d rv3d ${i ? "rv3d-d" + i : ""}" data-tilt="4">
<h3>${esc(s.t)}</h3><p>${esc(s.d)}</p>
</article>`).join("")}</div>
</div>
</section>

<section class="w3d-section" id="areas">
<div class="w3d-wrap">
<div class="w3d-head">
<span class="w3d-kicker">Areas we serve</span>
<h2>${esc(p.service)} across ${esc(p.city)}</h2>
<p>Local delivery, WhatsApp updates and meetings by appointment. ${esc(p.region)}.</p>
</div>
<div class="area3d-grid">${p.areas.map(a => `<span class="area3d">${svg("pin", 13)}${esc(a)}</span>`).join("")}</div>
<div class="chip3d-row" style="justify-content:center;margin-top:20px">
${p.related.map(slug => `<a class="chip3d chip3d--gold" href="/${escA(slug)}.html">${svg("arrow", 12)} ${esc(lpLabel(slug))}</a>`).join("")}
</div>
</div>
</section>

<section class="w3d-section" id="reviews">
<div class="w3d-wrap">
<div class="w3d-head">
<span class="w3d-kicker">Client feedback</span>
<h2>Fixed rates. Real handovers.</h2>
<p>Five-star feedback from clinics, schools, stores and founders who picked their demo and watched it go live.</p>
</div>
<div class="rev3d-track" role="list" aria-label="Client reviews">
${S.testimonials.slice(0, 3).map(lpReviewCard).join("")}
</div>
</div>
</section>

<section class="w3d-section" id="faq">
<div class="w3d-wrap">
<div class="w3d-head">
<span class="w3d-kicker">Questions</span>
<h2>${esc(p.service)} in ${esc(p.city)} — answered</h2>
</div>
<div class="faq3d">${p.faqs.map(f => `<details><summary>${esc(f.q)}</summary><div class="faq3d-a">${esc(f.a)}</div></details>`).join("")}</div>
</div>
</section>

<section class="w3d-section w3d-section--tight">
<div class="w3d-wrap">
<div class="cta3d rv3d">
<h2>Ready to start in ${esc(p.city)}?</h2>
<p>Send your requirement on WhatsApp — you will get a fixed quote, delivery date and three demo designs. No 300K surprises.</p>
<div class="btn3d-row">
<a class="btn3d btn3d--red" href="/contact.html">${svg("spark", 18)} Get Free Demo</a>
<a class="btn3d btn3d--green" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! ${escA(p.city)} ke liye ${escA(p.service)} ka quote chahiye — fixed rate. (Page: {page})" href="${wa("Hi")}">${svg("wa", 18)} WhatsApp 0324 6627054</a>
</div>
</div>
</div>
</section>
</main>` + footer() + quoteModal() + scripts + "</body></html>";
  PAGES.push({ file: pageFile, title, desc });
  write(pageFile, html);
}

/* ---------------- JSON-LD ---------------- */
function ldBase() {
  return [
    { "@context": "https://schema.org", "@type": "Organization", name: S.brand.name, url: S.brand.url, logo: S.brand.url + "/assets/img/logo.png", description: S.brand.desc, slogan: S.brand.tagline, email: S.contact.email, foundingDate: S.brand.founded, hasCredential: S.trustBadges.map(b => `${b.label} — ${b.sub}`), knowsAbout: ["AWS cloud", "Google Cloud", "ZATCA-compliant e-invoicing software (KSA)", "Web development", "AI agents"], address: { "@type": "PostalAddress", addressLocality: "Lahore", addressRegion: "Punjab", addressCountry: "PK" }, contactPoint: [{ "@type": "ContactPoint", telephone: S.contact.phoneRaw, contactType: "sales", areaServed: "PK", availableLanguage: ["en", "ur"] }], sameAs: [S.brand.url] },
    { "@context": "https://schema.org", "@type": "WebSite", name: S.brand.name, url: S.brand.url, inLanguage: ["en", "ur"], publisher: { "@type": "Organization", name: S.brand.name, url: S.brand.url } }
  ];
}
function ldLocalBusiness() {
  return { "@context": "https://schema.org", "@type": "ProfessionalService", name: S.brand.name, image: S.brand.url + "/assets/img/og-cover.jpg", "@id": S.brand.url + "/#business", url: S.brand.url, telephone: S.contact.phoneRaw, email: S.contact.email, priceRange: "PKR 5,000-35,000", address: { "@type": "PostalAddress", streetAddress: "Lahore-Sharqpur Road, near 20 km", addressLocality: "Lahore", addressRegion: "Punjab", addressCountry: "PK" }, openingHours: "Mo-Sa 10:00-20:00", areaServed: ["Lahore", "Punjab", "Pakistan", "Saudi Arabia"], aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "74" }, hasCredential: S.trustBadges.map(b => `${b.label} — ${b.sub}`), knowsAbout: [...S.services.map(s => s.name), ...S.recovery.map(r => r.name), "AWS cloud", "Google Cloud", "ZATCA-compliant e-invoicing software (KSA)"] };
}
const ldBreadcrumb = arr => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: arr.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b[0], item: S.brand.url + b[1] })) });
const ldFaq = () => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: S.faqs.map(f => ({ "@type": "Question", name: f.qEn, acceptedAnswer: { "@type": "Answer", text: f.aEn + " " + f.a } })) });
const ldServices = () => S.services.map(s => ({ "@context": "https://schema.org", "@type": "Service", name: s.name, serviceType: s.name, description: s.page, provider: { "@id": S.brand.url + "/#business" }, areaServed: { "@type": "Country", name: "Pakistan" }, offers: { "@type": "Offer", priceCurrency: "PKR", price: s.price, priceValidUntil: "2026-12-31", availability: "https://schema.org/InStock", itemIncluded: "3 demo designs, source code, 30-day support" + (hasDomain(s) ? ", free domain 1 year" : ""), url: S.brand.url + "/" + s.slug + ".html" } }));
const ldCatalog = () => ({ "@context": "https://schema.org", "@type": "OfferCatalog", name: "Wafa Smart Tech — fixed rates from PKR 14,000", itemListElement: S.packages.map(p => ({ "@type": "Offer", name: p.n, description: p.desc, priceCurrency: "PKR", price: p.price, url: S.brand.url + "/pricing.html", itemOffered: { "@type": "Service", name: p.n + " — " + S.brand.name } })) });
const ldArticle = b => ({ "@context": "https://schema.org", "@type": "Article", headline: b.title, description: b.desc, datePublished: b.date, image: S.brand.url + "/assets/img/" + b.img + "-880.webp", author: { "@type": "Organization", name: S.brand.name, url: S.brand.url }, publisher: { "@type": "Organization", name: S.brand.name, logo: { "@type": "ImageObject", url: S.brand.url + "/assets/img/logo.png" } }, isPartOf: { "@id": S.brand.url + "/blog.html" }, mainEntityOfPage: S.brand.url + "/blog/" + b.slug + ".html" });

const bcrumbs = arr => `<div class="wrap"><nav class="bcrumbs" aria-label="Breadcrumb">${arr.map((b, i) => i === arr.length - 1 ? `<span>${esc(b[0])}</span>` : `<a href="${b[1]}">${esc(b[0])}</a><span aria-hidden="true">›</span>`).join("")}</nav></div>`;

/* ---------------- render & write ---------------- */
const written = [];
function write(file, html) {
  if (!slugRe.test(file)) throw new Error("bad filename " + file);
  const p = path.join(DIST, file);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html.trim() + "\n");
  written.push(file);
}
function copyDir(src, dst) {
  const to = path.join(DIST, dst);
  fs.mkdirSync(to, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    if (fs.statSync(path.join(src, f)).isFile()) fs.copyFileSync(path.join(src, f), path.join(to, f));
  }
}
fs.mkdirSync(DIST, { recursive: true });
copyDir(path.join(SRC, "css"), "assets/css");
copyDir(path.join(SRC, "js"), "assets/js");
copyDir(path.join(SRC, "fonts"), "assets/fonts");

/* ---- HOME ---- */
(function home() {
  const t = `${S.brand.name} — AWS & Google Certified · ZATCA-Ready · PKR 14,000+`;
  const dHome = `AWS & Google certified team. Fixed rates: website 14,000 · AI/voice 23,500 · apps 30,000/35,000. ZATCA-ready. Recovery from 5,000.`;
  const html = head({ file: "index.html", title: t, desc: dHome, jsonld: [...ldBase(), ldLocalBusiness(), ...ldServices(), ldFaq(), ldCatalog()], heroImg: "hero-ai" }) +
    bgfx + nav("home") +
    `<main id="main">
<section class="hero"><canvas id="neural" aria-hidden="true"></canvas>
 <div class="wrap hero-in">
  <div class="hero-copy">
   <div class="hero-panel">
   <span class="eyebrow" data-ur="لاہور · ای ڈبلیو ایس اور گوگل سرٹیفائیڈ">${esc(S.hero.eyebrow)}</span>
   <h1 data-ur="${escA(S.hero.titleUr)}">${esc(S.hero.titleA)}<span class="grad-txt">${esc(S.hero.titleGrad)}</span>${esc(S.hero.titleB)}</h1>
   <p class="sub" data-ur="${escA(S.hero.subUr)}">${esc(S.hero.sub)}</p>
   ${certRow()}
   <div class="hero-cta">
     <button class="btn btn-lg" type="button" data-quote>${svg("spark", 18)} <span data-i18n="cta.demo">${esc(S.hero.ctaMain)}</span></button>
     <a class="btn btn-lg btn-wa" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! Mujhe ${escA(S.brand.name)} se project discuss karna hai — 3 demos ke saath. (Page: {page})" href="${wa("Hi")}">${svg("wa", 18)} <span data-i18n="cta.wa">WhatsApp</span><span class="wa-num ltr">${esc(S.contact.whatsappDisplay)}</span></a>
   </div>
   <div class="pill-row"><span class="pill pill-free">${svg("check", 13)} <span data-i18n="badge.domain">Domain FREE on sites</span></span><span class="pill pill-demo">${svg("spark", 13)} <span data-i18n="badge.demos">3 free demo designs</span></span><span class="pill pill-fix">${svg("brief", 13)} Rates from <b data-pkr="${S.PRICE}">${pkr(S.PRICE)}</b></span><a class="pill pill-demo" href="/recovery.html">${svg("shield", 13)} Hacked? Recovery from PKR 5,000</a></div>
   ${heroCube()}
   </div>
  </div>
  <div class="hero-vis">
    ${widePic("hero-ai", "3D AI assistant with holographic panels by " + S.brand.name, false, "(max-width:900px) 92vw, 560px", true)}
    <div class="hero-card hc-1"><span class="k">${svg("wa", 18)}</span><div><b>“Booking done”</b><span>AI receptionist · 2:14 AM</span></div></div>
    <div class="hero-card hc-2"><span class="k">${svg("spark", 18)}</span><div><b>3 demos delivered</b><span>pick your favourite</span></div></div>
    <div class="hero-card hc-3"><span class="k">${svg("chart", 18)}</span><div><b>Domain FREE</b><span>+ source code handover</span></div></div>
  </div>
  <div class="hero-meta">${S.stats.map(statCard).join("")}</div>
 </div></section>
<section class="sec-tight" aria-label="Everything we offer"><div class="marq"><div class="marq-track">${[...S.trust, ...S.trust].map(x => `<span>${svg("spark", 15)} <em>${esc(x)}</em></span>`).join("")}</div></div></section>
<section class="sec sec-cream" id="services">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow" data-i18n="sec.services">Our Services</span>
      <h2 data-ur="۲۱ سروسز۔ مقررہ قیمت۔ ۳ مفت ڈیمو۔">21 services. Fixed prices. 3 free&nbsp;demos.</h2>
      <p class="muted" data-ur="ویب سائٹ ۱۴,۰۰۰ · ویب سائٹ + مینجمنٹ ۲۰,۰۰۰ · اے آئی/وائس ۲۳,۵۰۰ · اینڈرائیڈ/ونڈوز ۳۰,۰۰۰ · آئی او ایس ۳۵,۰۰۰۔ اپنی سروس چنیں، فکسڈ ریٹ دیکھیں اور ۳ مفت ڈیمو حاصل کریں — کوئی چھپا چارج نہیں، سائٹ سروسز پر ڈومین فری۔">Website PKR 14,000 · website + management 20,000 · AI/voice 23,500 · Android/Windows 30,000 · iOS 35,000. Pick your service, see the exact price and get 3 free demo designs — no hidden charges, free domain on website services.</p></div>
    <div class="grid c3">${S.services.map(svcCard).join("")}</div>
    <div class="center" style="margin-top:34px"><a class="btn btn-ghost" href="/services.html"><span data-i18n="cta.viewall">Compare all services + delivery times</span> →</a></div>
  </div>
</section>
${recoverySection()}
<section class="sec sec-gold" id="demos"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">${svg("spark", 13)} 3 Free Demo Designs</span>
    <h2 data-ur="ہم تین ڈیمو ڈیزائن بنا کر دکھاتے ہیں — پسند والا چن لیں">We design THREE demos first — you pick your favourite</h2>
    <p class="muted" data-ur="پیسا دینے سے پہلے آپ کا پورا ڈیزائن دیکھ چکے ہوتے ہیں۔ کوئی جوئے کی بات نہیں۔">You see three complete demo designs of YOUR project before the final build. No gambling with your money.</p></div>
  <div class="grid c3">${S.DEMOS.map((d, i) => demoCard(d, i, "")).join("")}</div>
</div></section>
<section class="sec sec-orange">
  <div class="wrap"><div class="sec-head"><span class="eyebrow" data-i18n="sec.why">Why Wafa</span><h2 data-ur="ہم ہی کیوں؟">Why businesses in Lahore pick us</h2></div>
  <div class="grid c3">${S.whyUs.map(whyEl).join("")}</div>
  <div class="grid c4" style="margin-top:26px">${S.guarantees.map(guaranteeEl).join("")}</div></div>
</section>
<section class="sec" id="process"><div class="wrap">
  <div class="sec-head"><span class="eyebrow" data-i18n="sec.process">Process</span><h2 data-ur="آئیڈیا سے لانچ تک — چھ شفاف مراحل">From idea to launch in 6 clear&nbsp;steps</h2>
    <p class="muted" data-ur="سادہ، شفاف اور مقررہ ریٹ — کوئی سرپرائز نہیں۔">Simple, transparent and fixed-price — no surprises.</p></div>
  <div class="grid c3 process-grid">${S.process.map(stepEl).join("")}</div>
</div></section>
<section class="sec sec-light" id="pricing-preview"><div class="wrap">
  <div class="sec-head"><span class="eyebrow" data-i18n="sec.pricing">Fixed Pricing</span><h2 data-ur="پانچ مقررہ ریٹ — اپنا پروڈکٹ چنیں">Five fixed rates. Pick your product.</h2>
  <p class="muted">Website 14K · website + management 20K · AI/voice 23.5K · Android/Windows 30K · iOS 35K. 50% advance · JazzCash / EasyPaisa / bank.</p>
  <p class="center" style="margin-top:10px"><a class="kb" href="/recovery.html">Hacked website/PHP or WhatsApp? Emergency recovery from PKR 5,000 →</a></p>
  <div class="center" style="margin:18px 0 30px"><span class="cur-toggle" role="group" aria-label="Currency"><button class="on" data-cur="pkr" type="button">PKR ₨</button><button data-cur="usd" type="button">USD $</button></span></div></div>
  <div class="grid c3 price-grid">${S.packages.map(priceCard).join("")}</div>
  <div class="center" style="margin-top:30px"><a class="btn btn-ghost" href="/pricing.html">Full pricing table + add-ons →</a></div>
</div></section>
<section class="sec sec-sky"><div class="wrap">
  <div class="sec-head"><span class="eyebrow" data-i18n="sec.portfolio">Portfolio</span><h2 data-ur="ہمارے بنائے ہوئے کام — اصل اعداد کے ساتھ">Real projects, real numbers — fixed rates from 14K</h2></div>
  <div class="grid c3">${S.portfolio.slice(0, 6).map(pfCard).join("")}</div>
  <div class="center" style="margin-top:30px"><a class="btn btn-ghost" href="/portfolio.html">See all ${S.portfolio.length} case studies →</a></div>
</div></section>
<section class="sec sec-gold"><div class="wrap">
  <div class="sec-head"><span class="eyebrow" data-i18n="sec.testi">Clients</span><h2 data-ur="کلائنٹس کیا کہتے ہیں">Lahore says it best</h2></div>
  <div class="t-slider"><div class="t-track">${S.testimonials.map(tSlide).join("")}</div></div>
  <div class="t-nav" role="tablist">${S.testimonials.map((_, i) => `<button class="${i === 0 ? "on" : ""}" aria-label="Slide ${i + 1}" type="button"></button>`).join("")}</div>
</div></section>
<section class="sec sec-cream" id="faq"><div class="wrap">
  <div class="sec-head"><span class="eyebrow" data-i18n="sec.faq">FAQ</span><h2 data-ur="قیمت، ڈومین اور ڈیموز — سب واضح">Price, domain & demos — answered</h2></div>
  <div class="faq">${S.faqs.map(faqEl).join("")}</div>
</div></section>
<section class="sec"><div class="wrap">
  <div class="sec-head"><span class="eyebrow" data-i18n="sec.blog">Blog</span><h2 data-ur="بلاگ اور رہنمائی">Guides that actually help</h2></div>
  <div class="grid c2">${S.blog.map(blogCard).join("")}</div>
</div></section>
${ctaBand("Build ya recovery — ek WhatsApp message. Fixed rates from PKR 14,000, recovery from PKR 5,000, domain free on sites.")}
</main>` + footer() + quoteModal() + scripts + "</body></html>";
  PAGES.push({ file: "index.html", title: t, desc: dHome });
  write("index.html", html);
})();

/* ---- SERVICES overview ---- */
(function servicesPage() {
  const t = `All 21 Services + Emergency Recovery — Fixed Rates from PKR 5,000 | ${S.brand.name}`;
  const d = "21 build services at fixed rates 14,000–35,000, plus hacked website/PHP recovery 7,000 and WhatsApp recovery 5,000. Free domain, 3 demos, source code.";
  const html = head({ file: "services.html", title: t, desc: d, jsonld: [...ldBase(), ldFaq(), ldBreadcrumb([["Home", "/index.html"], ["Services", "/services.html"]]), { "@context": "https://schema.org", "@type": "ItemList", itemListElement: [...S.services, ...S.recovery].map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: S.brand.url + (s.id ? "/recovery.html#" + s.id : "/" + s.slug + ".html") })) }] }) +
    bgfx + nav("services") + `<main id="main">
${bcrumbs([["Home", "/index.html"], ["Services", "/services.html"]])}
<div class="wrap page-head"><span class="eyebrow">21 build services + emergency recovery · fixed rates</span><h1 data-ur="تمام سروسز — مکمل تفصیل اور مقررہ ریٹ">Every service in detail — clear fixed rate</h1>
<p class="muted">Website 14K · management 20K · AI 23.5K · apps 30K/35K. FREE domain on site services · 3 demo designs before build · source code handover. Hacked website/PHP <b>PKR 7,000</b> · WhatsApp <b>PKR 5,000</b>.</p></div>
${cert3dBand({ title: "Certified. Registered. Answerable.", sub: "Five credentials behind every project — not borrowed badges." })}
<section class="sec-tight"><div class="wrap">
<div class="grid c3">${S.services.map(svcCard).join("")}</div>
</div></section>
${recoverySection()}
<section class="sec-tight"><div class="wrap">
<div class="tbl-wrap" style="margin-top:6px"><table class="tbl"><caption class="tiny muted" style="padding:10px">21 build services — compare at a glance · تلخانی موازنہ</caption>
<thead><tr><th>Service</th><th>Price</th><th>Domain</th><th>Demos</th><th>Delivery</th></tr></thead>
<tbody>${S.services.map(s => `<tr><td><b><a href="/${s.slug}.html">${esc(s.name)}</a></b><br><span class="tiny muted">${esc(s.short)}</span></td><td><b data-pkr="${s.price}">${pkr(s.price)}</b></td><td>${hasDomain(s) ? "FREE" : "—"}</td><td>3</td><td>${esc(s.days)} days</td></tr>`).join("")}</tbody></table></div>
<p class="hint center" style="margin-top:16px">Emergency recovery is priced separately: <a href="/recovery.html#website-php">website/PHP PKR 7,000</a> · <a href="/recovery.html#whatsapp">WhatsApp PKR 5,000</a>. No demos or source-code promises apply.</p>
</div></section>${ctaBand("21 build services + emergency recovery. Fixed rates from PKR 5,000 — WhatsApp par poochhein.")}</main>` + footer() + quoteModal() + scripts + "</body></html>";
  PAGES.push({ file: "services.html", title: t, desc: d });
  write("services.html", html);
})();

/* ---- SERVICE detail pages ---- */
S.services.forEach(s => {
  const t = `${s.name} — ${pkr(s.price)} fixed | ${S.brand.name}`;
  const d = `${s.short} at a fixed ${pkr(s.price)} — 3 demo designs, source code and 30-day support included.`;
  const html = head({ file: s.slug + ".html", title: t, desc: d, heroImg: s.img, jsonld: [...ldBase(), { "@context": "https://schema.org", "@type": "Service", name: s.name, serviceType: s.name, description: s.page, provider: { "@id": S.brand.url + "/#business" }, areaServed: { "@type": "Country", name: "Pakistan" }, audience: { "@type": "BusinessAudience" }, offers: { "@type": "Offer", priceCurrency: "PKR", price: s.price, priceValidUntil: "2026-12-31", itemIncluded: "3 demo designs, source code, 30-day support" + (hasDomain(s) ? ", free domain 1yr" : ""), url: S.brand.url + "/" + s.slug + ".html" } }, ldBreadcrumb([["Home", "/index.html"], ["Services", "/services.html"], [s.name, "/" + s.slug + ".html"]]), { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: S.faqs.slice(0, 3).map(f => ({ "@type": "Question", name: f.qEn, acceptedAnswer: { "@type": "Answer", text: f.aEn } })) }] }) +
    bgfx + nav("services") + `<main id="main">
${bcrumbs([["Home", "/index.html"], ["Services", "/services.html"], [s.name, "/" + s.slug + ".html"]])}
<section class="sec-tight"><div class="wrap split">
  <div><span class="eyebrow">${svg(s.icon, 13)} ${esc(s.days)} days · ${pkr(s.price)} fixed · ${esc(s.priceNote)}</span>
    <h1 data-ur="${escA(s.nameUr)}">${esc(s.name)}</h1>
    <p class="muted panel3d panel3d--blue" style="font-size:1.05rem" data-ur="${escA(s.pageUr)}">${esc(s.page)}</p>
    <div class="hero-cta" style="margin-top:22px">
      <a class="btn btn-lg" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! Mujhe *${s.name}* chahiye — ${pkr(s.price)} fixed${hasDomain(s) ? ", domain free" : ""}. Order confirm karein? (Page: ${s.slug}.html)" href="${wa(s.name + " order")}">🛒 <span data-i18n="cta.order">Order Now</span></a>
      <button class="btn btn-lg btn-wa" type="button" data-quote data-svc="${escA(s.name)}">${svg("wa",16)} <span data-i18n="cta.quote">Get Free Quote</span></button>
    </div>
    <div class="pill-row">${hasDomain(s) ? `<span class="pill pill-free">${svg("check",12)} Domain FREE 1 year</span>` : `<span class="pill">${svg("layers",12)} Fixed product build</span>`}<span class="pill pill-demo">${svg("spark",12)} 3 demo designs</span><span class="pill pill-own">${svg("shield",12)} Source code yours</span><span class="pill">${svg("pin",12)} Lahore-made</span></div>
  </div>
  <div class="img-side">${pic(s.img, s.name + " 3D illustration for " + S.brand.name, false, "", "(max-width:900px) 92vw,520px")}</div>
</div></section>
<section class="sec" id="price"><div class="wrap"><div class="price-hero glass box3d box3d--gold rv">
  <div><span class="tiny muted" data-i18n="price.all">Everything included —</span><div class="amount" data-pkr="${s.price}">${pkr(s.price)}</div>
  <p class="muted tiny" data-ur="مقررہ قیمت، سب کچھ شامل — ڈومین فری، تین ڈیمو، سورس کوڈ">fixed price · 50% advance, 50% on delivery · 3 demos, source code and 30-day support</p></div>
  <ul class="checklist" style="margin:0">
    <li>3 free demo designs — you pick the winner</li>
    <li>${hasDomain(s) ? "FREE domain (.com / .pk) registered in YOUR name, 1 year" : "Product build, backend and admin access included"}</li>
    <li>Source code + admin access + handover video</li>
    <li>On-page SEO, sitemap, WhatsApp order buttons</li>
    <li>30 days of free support & fixes</li>
  </ul>
</div></div></section>
<section class="sec" id="demos-for-this"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Step 1: choose your design</span><h2 data-ur="اس پروجیکٹ کے تین ڈیمو ڈیزائن">Three demo designs for “${esc(s.name)}”</h2>
  <p class="muted">These are real starting points — after your advance we build all three with YOUR logo & content, you pick one, we finish it.</p></div>
  <div class="grid c3">${S.DEMOS.map((dm, i) => demoCard(dm, i, s.name)).join("")}</div>
</div></section>
<section class="sec"><div class="wrap split">
<div><span class="eyebrow">What you get</span><h2 data-ur="سب کچھ شامل، کوئی ستارہ نہیں">Included — no asterisks</h2>
<ul class="checklist">${s.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
<p class="tiny muted">Common searches: ${s.kw.map(k => `<span class="kb">#${esc(k)}</span> `).join("")}</p></div>
<div class="glass" style="padding:28px">
  <h3 style="margin-bottom:14px">${svg("pin",18)} Quick facts</h3>
  <div class="tbl-wrap" style="border:0"><table class="tbl" style="min-width:0"><tbody>
  <tr><td>Fixed price</td><td><b data-pkr="${s.price}">${pkr(s.price)}</b></td></tr>
  <tr><td>Domain</td><td><b>${hasDomain(s) ? "FREE (1 year)" : "Included where needed"}</b></td></tr>
  <tr><td>Delivery</td><td><b>${esc(s.days)} days</b></td></tr>
  <tr><td>Advance</td><td><b>50% (${pkr(Math.round(s.price / 2))})</b></td></tr>
  <tr><td>Demo designs</td><td><b>3 — you pick</b></td></tr>
  <tr><td>Support</td><td><b>30 days free</b></td></tr>
  <tr><td>Ownership</td><td><b>100% yours</b></td></tr>
  </tbody></table></div>
  <a class="btn btn-block" style="margin-top:16px" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! ${s.name} — ${pkr(s.price)} me order karna hai. (Page: {page})" href="${wa("Order " + s.name)}">${svg("cart",15)} Order via WhatsApp</a>
  <a class="btn btn-sm btn-wa btn-block" style="margin-top:10px" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! ${s.name} ke baray me sawal hai. (Page: {page})" href="${wa("Question about " + s.name)}">💬 Ask a question</a>
</div>
</div></section>
${ctaBand(`Ek message — teen demos raste mein. Fixed ${pkr(s.price)}, ${hasDomain(s) ? "domain free." : "source code included."}`)}
</main>` + footer() + quoteModal() + scripts + "</body></html>";
  PAGES.push({ file: s.slug + ".html", title: t, desc: d });
  write(s.slug + ".html", html);
});

/* ---- EMERGENCY RECOVERY ---- */
(function recoveryPage() {
  const t = `Hacked Website, PHP & WhatsApp Recovery — Fixed PKR 5,000–7,000 | ${S.brand.name}`;
  const d = "Hacked website, WordPress/PHP or WhatsApp? Fixed recovery: website & PHP PKR 7,000, WhatsApp PKR 5,000. Free inspection, proof of ownership, no OTP requests.";
  const recFaqs = [
    { q: "Kya hacked WhatsApp 100% recover ho jayega?", qEn: "Will a hacked WhatsApp be 100% recovered?", a: "Hum WhatsApp ka official recovery process follow karte hain — 2FA, SIM/OTP guidance aur linked-device cleanup ke saath. Final control WhatsApp support ke paas hota hai, is liye hum jhooti guarantee ya fake tools nahi dete. Pehla case check free hai.", aEn: "We follow WhatsApp's official recovery process — including 2FA, SIM/OTP guidance and linked-device cleanup. Final control rests with WhatsApp support, so we never promise fake guarantees or use fake tools. The first case check is free." },
    { q: "Website recovery me kya included hai?", qEn: "What is included in website recovery?", a: "Malware aur PHP backdoor cleanup, spam redirects ka khatma, Google blacklist removal help, cPanel/admin access recovery, plugin/PHP patching, firewall + 2FA hardening, clean backup aur 14 din ka re-infection check. Fixed PKR 7,000.", aEn: "Malware and PHP backdoor cleanup, spam redirect removal, Google blacklist removal help, cPanel/admin access recovery, plugin/PHP patching, firewall + 2FA hardening, a clean backup and a 14-day re-infection check. Fixed PKR 7,000." },
    { q: "Proof of ownership kya hai?", qEn: "What counts as proof of ownership?", a: "Domain ya hosting/cPanel access, admin login, ya domain par verification file — koi ek. Bina proof hum kisi site par kaam nahi karte. Aap owner ya authorised representative hone chahiye.", aEn: "Domain or hosting/cPanel access, admin login, or a verification file on the domain — any one. We never work without proof. You must be the owner or an authorised representative." },
    { q: "Payment aur timeline kya hai?", qEn: "What are the payment terms and timeline?", a: "Pehle mufat inspection. Scope confirm hone par 50% advance, baqi 50% recovery handover par. Website 1–3 din, WhatsApp 1–2 din — WhatsApp support response par depend.", aEn: "Free inspection first. After scope confirmation, 50% advance and 50% on recovery handover. Website 1–3 days, WhatsApp 1–2 days — depending on WhatsApp support response." },
    { q: "Kya aap OTP ya password maangte hain?", qEn: "Do you ask for OTP or passwords?", a: "Nahi. Hum kabhi OTP, password ya 2FA code nahi maangte. Sirf official app/support ke through guidance dete hain. Koi bhi OTP maange to wo scam hai.", aEn: "No. We never ask for an OTP, password or 2FA code. We only guide you through the official app/support flow. Anyone asking for an OTP is a scam." },
    { q: "Kya aap kisi aur ki site/account recover karte hain?", qEn: "Do you recover someone else's site or account?", a: "Nahi — sirf owner ya authorised representative ki request par. Ownership proof zaroori hai. Yeh rule har case par lagta hai.", aEn: "No — only for the owner or an authorised representative. Proof of ownership is mandatory on every case." }
  ];
  const serviceLd = S.recovery.map(r => ({
    "@context": "https://schema.org", "@type": "Service", name: r.name, serviceType: r.name, description: r.page,
    provider: { "@id": S.brand.url + "/#business" }, areaServed: { "@type": "Country", name: "Pakistan" },
    offers: { "@type": "Offer", priceCurrency: "PKR", price: r.price, priceValidUntil: "2026-12-31", availability: "https://schema.org/InStock", itemIncluded: r.features.join(", "), url: S.brand.url + "/recovery.html#" + r.id }
  }));
  const html = head({ file: "recovery.html", title: t, desc: d, heroImg: "service-management", jsonld: [...ldBase(), ldLocalBusiness(), ...serviceLd, { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: recFaqs.map(f => ({ "@type": "Question", name: f.qEn, acceptedAnswer: { "@type": "Answer", text: f.aEn } })) }, ldBreadcrumb([["Home", "/index.html"], ["Services", "/services.html"], ["Recovery", "/recovery.html"]])] }) +
    bgfx + nav("services") + `<main id="main">
${bcrumbs([["Home", "/index.html"], ["Services", "/services.html"], ["Recovery", "/recovery.html"]])}
<div class="wrap page-head rec-head">
  <span class="eyebrow rec-eyebrow">Emergency recovery · same-day response</span>
  <h1 data-ur="ہیک ویب سائٹ، پی ایچ پی یا واٹس ایپ؟ <span class=&quot;grad-txt&quot;>ہم ریکوری کرتے ہیں۔</span>">Hacked website, PHP or WhatsApp? <span class="grad-txt">We recover it.</span></h1>
  <p class="muted" data-ur="ویب سائٹ/پی ایچ پی ریکوری ۷,۰۰۰ · واٹس ایپ ریکوری ۵,۰۰۰۔ پہلے مفت معائنہ، ملکیت کا ثبوت ضروری، کوئی او ٹی پی یا پاس ورڈ نہیں۔">Website/PHP recovery <b>PKR 7,000</b> · WhatsApp recovery <b>PKR 5,000</b>. Free inspection first, proof of ownership required, no OTP or password requests. WordPress, WooCommerce, Laravel and custom PHP covered.</p>
  <div class="pill-row"><span class="pill pill-demo">Website / PHP · PKR 7,000</span><span class="pill pill-own">WhatsApp · PKR 5,000</span><span class="pill pill-free">Official process only</span><span class="pill">1–3 days</span></div>
</div>
${cert3dBand({ title: "Certified. Registered. Answerable.", sub: "The same verified team handles every emergency recovery." })}
<section class="sec-tight"><div class="wrap">
  <div class="grid c2 rec-grid">${S.recovery.map(recoveryCard).join("")}</div>
  <div class="rec-trust-row">
    <span>✓ Official recovery process</span><span>✓ Proof of ownership required</span><span>✓ We never ask for OTP / password</span>
  </div>
</div></section>
<section class="sec" id="website-php"><div class="wrap split">
  <div><span class="eyebrow">Website / PHP / WordPress</span>
    <h2 data-ur="ہیک سائٹ؟ صفائی، پیچ اور تحفظ — ۷,۰۰۰ میں۔">Hacked site? Clean it, patch it, secure it.</h2>
    <p class="muted panel3d panel3d--red" data-ur="میل ویئر، انجیکٹڈ پی ایچ پی شیلز، اسپام صفحات، ڈاٹ ایچ ٹی ایکسس ری ڈائریکٹ، بلیک لسٹ انتباہ یا گم شدہ ایڈمن رسائی — ہم انفیکشن صاف کرتے ہیں اور اس کا راستہ بند کرتے ہیں۔ ورڈپریس، ووکامرس، لاریول، کسٹم پی ایچ پی، ایچ ٹی ایم ایل اور سی ایم ایس سائٹس پر کام کرتے ہیں۔">Malware, injected PHP shells, spam pages, .htaccess redirects, blacklist warnings or lost admin access — we clean the infection and close the door it came through. Works on WordPress, WooCommerce, Laravel, custom PHP, HTML and CMS sites.</p>
    <ul class="checklist">${S.recovery[0].features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
    <div class="rec-note" data-ur="<b>ملکیت کا ثبوت:</b> ڈومین/ہوسٹنگ رسائی یا تصدیقی فائل۔ ہم صرف آپ کی ملکیت والی سائٹ پر کام کرتے ہیں۔"><b>Proof of ownership:</b> domain/hosting access or a verification file. We only work on sites you own.</div>
    <div class="hero-cta" style="margin-top:20px"><a class="btn btn-wa btn-lg" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! Meri website hacked hai. Website/PHP recovery PKR 7,000 — free inspection karwa ni hai. (Page: {page})" href="${wa("Hacked website recovery")}">${svg("wa", 20)} <span data-ur="میری ویب سائٹ ریکور کریں">Recover my website</span></a><a class="btn btn-ghost btn-lg" href="#whatsapp"><span data-ur="واٹس ایپ ریکوری">WhatsApp recovery</span> →</a></div>
  </div>
  <div class="glass rec-panel box3d box3d--red">
    <span class="tiny muted">Fixed emergency rate</span>
    <div class="amount" data-pkr="7000">${pkr(7000)}</div>
    <p class="muted" style="font-size:.92rem">Free inspection · 50% advance after scope · 50% on handover. No hidden charges.</p>
    <ul class="rec-facts"><li><b>Delivery</b><span>1–3 days</span></li><li><b>Best for</b><span>Hacked site / PHP</span></li><li><b>Includes</b><span>Cleanup + hardening</span></li><li><b>Follow-up</b><span>14-day re-check</span></li><li><b>Proof</b><span>Ownership required</span></li></ul>
    <a class="btn btn-block" style="margin-top:16px" href="/services.html"><span data-ur="بلڈ سروسز دیکھیں">See build services</span> →</a>
  </div>
</div></section>
<section class="sec" id="whatsapp"><div class="wrap split">
  <div class="glass rec-panel box3d box3d--red" style="order:2">
    <span class="tiny muted">Fixed recovery assistance</span>
    <div class="amount" data-pkr="5000">${pkr(5000)}</div>
    <p class="muted" style="font-size:.92rem">Free case check · 50% advance after scope · 50% on handover. Recovery depends on WhatsApp support.</p>
    <ul class="rec-facts"><li><b>Delivery</b><span>1–2 days</span></li><li><b>Best for</b><span>Hacked / locked account</span></li><li><b>Includes</b><span>Official flow + 2FA</span></li><li><b>Privacy</b><span>No OTP / password</span></li><li><b>Support</b><span>Safety checklist</span></li></ul>
    <a class="btn btn-block btn-wa" style="margin-top:16px" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! Mera WhatsApp hacked hai. Recovery assistance PKR 5,000 — free case check karwa ni hai. (Page: {page})" href="${wa("Hacked WhatsApp recovery")}">${svg("wa", 18)} <span data-ur="کیس چیک شروع کریں">Start case check</span></a>
  </div>
  <div><span class="eyebrow">WhatsApp account</span>
    <h2 data-ur="واٹس ایپ ہیک؟ سرکاری طریقے سے رسائی بحال کریں۔">Hacked WhatsApp? Get back in — the official way.</h2>
    <p class="muted panel3d panel3d--red" data-ur="لاگ آؤٹ، او ٹی پی نہ آنا، نمبر تبدیل، نامعلوم لنکڈ ڈیوائسز یا بزنس پروفائل گم؟ ہم سرکاری ریکوری طریقہ کار میں رہنمائی کرتے ہیں، ۲ ایف اے سیٹ کرتے ہیں اور نامعلوم ڈیوائسز ہٹاتے ہیں۔ کوئی جعلی ٹول، کوئی چوری شدہ رسائی، کوئی او ٹی پی کی درخواست نہیں۔">Logged out, OTP not arriving, number changed, linked devices you don't recognise, or a lost Business profile? We guide the official recovery path, set up 2FA and remove unknown devices. No fake tools, no stolen access, no OTP requests.</p>
    <ul class="checklist">${S.recovery[1].features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
    <div class="rec-note" data-ur="<b>حفاظتی اصول:</b> اپنا او ٹی پی، پاس ورڈ یا ۲ ایف اے کوڈ کسی کو نہ دیں — ہمیں بھی نہیں۔ رہنمائی ہم کرتے ہیں، کنٹرول آپ کے پاس رہتا ہے۔"><b>Safety rule:</b> never share your OTP, password or 2FA code with anyone — including us. We guide you while you stay in control.</div>
    <div class="hero-cta" style="margin-top:20px"><a class="btn btn-wa btn-lg" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! Mera WhatsApp hacked hai. PKR 5,000 recovery assistance chahiye. (Page: {page})" href="${wa("Hacked WhatsApp recovery")}">${svg("wa", 20)} <span data-ur="میرا واٹس ایپ ریکور کریں">Recover my WhatsApp</span></a><a class="btn btn-ghost btn-lg" href="#website-php"><span data-ur="ویب سائٹ ریکوری">Website recovery</span> →</a></div>
  </div>
</div></section>
<section class="sec" id="how-recovery-works"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Simple &amp; transparent</span><h2 data-ur="ریکوری کے تین واضح مراحل">How recovery works — 3 clear steps</h2>
  <p class="muted">Free inspection first. We confirm what is possible, give you the exact fixed rate and only then take an advance.</p></div>
  <div class="grid c3 rec-steps">${S.recovery[0].steps.map((st, i) => `<article class="rec-step rv"><span class="rec-num">0${i + 1}</span><h3 data-ur="${escA(st.u)}">${esc(st.t)}</h3><p data-ur="${escA(st.dUr)}">${esc(st.d)}</p></article>`).join("")}</div>
  <p class="hint center" style="margin-top:18px">Same process for WhatsApp: case check → official recovery → lock down. No recovery, no false promises.</p>
</div></section>
<section class="sec" id="recovery-faq"><div class="wrap"><div class="sec-head"><span class="eyebrow" data-i18n="sec.faq">FAQ</span><h2 data-ur="ریکوری کے سوالات — صاف جواب">Recovery questions — straight answers</h2></div><div class="faq">${recFaqs.map(faqEl).join("")}</div></div></section>
${recoveryCta()}
</main>` + footer() + quoteModal() + scripts + "</body></html>";
  PAGES.push({ file: "recovery.html", title: t, desc: d });
  write("recovery.html", html);
})();

/* ---- PRICING ---- */
(function pricing() {
  const t = `Pricing — Fixed Rates from PKR 14,000 + Recovery from PKR 5,000 | ${S.brand.name}`;
  const d = "Fixed rates: website 14,000 · management 20,000 · AI/voice 23,500 · apps 30,000/35,000. Recovery: website/PHP 7,000 · WhatsApp 5,000. Free domain, 3 demos.";
  const html = head({ file: "pricing.html", title: t, desc: d, jsonld: [...ldBase(), ldCatalog(), ldFaq(), ldBreadcrumb([["Home", "/index.html"], ["Pricing", "/pricing.html"]])] }) +
    bgfx + nav("pricing") + `<main id="main">
${bcrumbs([["Home", "/index.html"], ["Pricing", "/pricing.html"]])}
<div class="wrap page-head"><span class="eyebrow">Five products. Five clear rates.</span>
<h1 data-ur="مقررہ ریٹ — ویب سائٹ ۱۴,۰۰۰، مینجمنٹ ۲۰,۰۰۰، اے آئی ۲۳,۵۰۰، ایپس ۳۰,۰۰۰/۳۵,۰۰۰">Honest rates. No 300K quotes.</h1>
<p class="muted" data-ur="ویب سائٹ ۱۴,۰۰۰ · ویب سائٹ + مینجمنٹ ۲۰,۰۰۰ · اے آئی/وائس ۲۳,۵۰۰ · اینڈرائیڈ/ونڈوز ۳۰,۰۰۰ · آئی او ایس ۳۵,۰۰۰۔ سائٹ سروسز پر ڈومین فری، پہلے تین ڈیمو ڈیزائن، بعد میں سورس کوڈ۔ ایمرجنسی ریکوری: ہیک ویب سائٹ/پی ایچ پی ۷,۰۰۰ · واٹس ایپ ۵,۰۰۰۔">Website PKR 14,000 · Website + Management 20,000 · AI Agent / Voice 23,500 · Android / Windows 30,000 · iOS 35,000. Free domain on site services, 3 demo designs before build, source code after. Emergency recovery: hacked website/PHP 7,000 · WhatsApp 5,000.</p>
<div class="center" style="margin:26px 0 8px"><span class="cur-toggle" role="group" aria-label="Currency"><button class="on" data-cur="pkr" type="button">PKR ₨</button><button data-cur="usd" type="button">USD $</button></span></div>
</div>
${cert3dBand({ title: "Certified. Registered. Answerable.", sub: "Five credentials behind every fixed-rate project." })}
<section class="sec-tight"><div class="wrap">
  <div class="price-hero glass box3d box3d--gold rv center" style="grid-template-columns:1fr;margin-bottom:26px"><div><span class="eyebrow">Fixed rate card</span>
  <div class="amount" style="font-size:clamp(2.6rem,7vw,4.4rem);margin:10px 0">From <span data-pkr="${S.PRICE}">${pkr(S.PRICE)}</span></div>
  <p class="muted">Website 14K · management 20K · AI 23.5K · Android/Windows 30K · iOS 35K · 50% advance · 3 demos free · source code · 30-day support</p></div></div>
  <div class="grid c3 price-grid">${S.packages.map(priceCard).join("")}</div>
  <p class="hint center" style="margin-top:18px">Website + Management includes the website AND its admin panel. AI agents, voice bots, receptionists and WhatsApp bots are all PKR 23,500.</p>
  <div style="margin-top:24px">${recoveryStrip()}</div>
</div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><span class="eyebrow">Every build service · exact rate</span><h2 data-ur="ہر سروس کا مقررہ ریٹ">All 21 build services at a glance</h2></div>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Service</th><th>Price</th><th>Domain</th><th>Demos</th><th>Delivery</th></tr></thead><tbody>
${S.services.map(s => `<tr><td><a href="/${s.slug}.html"><b>${esc(s.name)}</b></a><br><span class="tiny muted">${esc(s.priceNote)}</span></td><td><b data-pkr="${s.price}">${pkr(s.price)}</b></td><td>${hasDomain(s) ? "FREE" : "—"}</td><td>3</td><td>${esc(s.days)} days</td></tr>`).join("")}
</tbody></table></div>
<div class="tbl-wrap" style="margin-top:26px"><table class="tbl"><caption class="tiny muted" style="padding:10px">Emergency recovery — separate fixed rates · ایمرجنسی ریکوری</caption>
<thead><tr><th>Recovery service</th><th>Price</th><th>Domain</th><th>Demos</th><th>Delivery</th></tr></thead><tbody>
${S.recovery.map(r => `<tr><td><a href="/recovery.html#${escA(r.id)}"><b>${esc(r.name)}</b></a><br><span class="tiny muted">${esc(r.short)}</span></td><td><b data-pkr="${r.price}">${pkr(r.price)}</b></td><td>—</td><td>—</td><td>${esc(r.days)} days</td></tr>`).join("")}
</tbody></table></div>
</div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><span class="eyebrow">Add-ons</span><h2>Bolt them on anytime</h2></div>
<div class="grid c2">${S.addons.map(a => `<div class="f-card row between" style="padding:18px 22px"><span>${esc(a[0])}</span><b class="grad-txt" style="white-space:nowrap">${a[1]}</b></div>`).join("")}</div>
<p class="hint center" style="margin-top:18px">50/50 payments · JazzCash / EasyPaisa / bank / office cash · Edu &amp; mosque/non-profit discounts on request</p>
</div></section>
<section class="sec" id="faq"><div class="wrap"><div class="sec-head"><span class="eyebrow" data-i18n="sec.faq">FAQ</span><h2>Price questions, answered</h2></div><div class="faq">${S.faqs.map(faqEl).join("")}</div></div></section>
${ctaBand("Abhi quote lein — WhatsApp par 15 minute me written fixed rate + demo timeline. Hacked? Recovery from PKR 5,000.")}
</main>` + footer() + quoteModal() + scripts + "</body></html>";
  PAGES.push({ file: "pricing.html", title: t, desc: d });
  write("pricing.html", html);
})();

/* ---- PORTFOLIO ---- */
(function portfolio() {
  const t = "Portfolio — 12 Case Studies, fixed-rate projects | " + S.brand.name;
  const d = "12 real Lahore case studies — websites, portals, ERPs, apps and AI agents, delivered at fixed rates from PKR 14,000.";
  const tags = ["All", ...new Set(S.portfolio.flatMap(p => p.tags))];
  const html = head({ file: "portfolio.html", title: t, desc: d, jsonld: [...ldBase(), ldBreadcrumb([["Home", "/index.html"], ["Portfolio", "/portfolio.html"]])] }) +
    bgfx + nav("portfolio") + `<main id="main">
${bcrumbs([["Home", "/index.html"], ["Portfolio", "/portfolio.html"]])}
<div class="wrap page-head"><span class="eyebrow">Selected work</span><h1 data-ur="ہمارے کام — اصل نمبروں کے ساتھ">Real work — fixed rates from 14K</h1>
<p class="muted">Budgets as delivered (2023–2026) — website 14K, management 20K, AI 23.5K, apps 30K/35K. Filter below; client names used with permission.</p></div>
${cert3dBand({ title: "Verified credentials behind the work", sub: "AWS, Google, IT Ministry experience and ZATCA-compliant delivery — checked before every handover." })}
<section class="sec-tight"><div class="wrap">
<div class="chips" data-target="pf-grid">${tags.map((x, i) => `<button class="chip ${i === 0 ? "on" : ""}" data-filter="${escA(x.toLowerCase())}" type="button">${esc(x)}</button>`).join("")}</div>
<div class="grid c3" id="pf-grid">${S.portfolio.map(pfCard).join("")}</div>
</div></section>${ctaBand()}</main>` + footer() + quoteModal() + scripts + "</body></html>";
  PAGES.push({ file: "portfolio.html", title: t, desc: d });
  write("portfolio.html", html);
})();

/* ---- ABOUT ---- */
(function about() {
  const t = "About — Lahore software house, honest fixed rates | " + S.brand.name;
  const d = "Wafa Smart Tech builds production-grade AI, websites and apps in Lahore at fixed rates from PKR 14,000. Free domain, 3 demo designs first.";
  const html = head({ file: "about.html", title: t, desc: d, jsonld: [...ldBase(), ldLocalBusiness(), ldBreadcrumb([["Home", "/index.html"], ["About", "/about.html"]])] }) +
    bgfx + nav("about") + `<main id="main">
${bcrumbs([["Home", "/index.html"], ["About", "/about.html"]])}
<div class="wrap page-head"><span class="eyebrow">Since ${S.brand.founded} · Lahore</span>
<h1 data-ur="وفا سمارٹ ٹیک — ہمارا وعدہ، مقررہ ریٹ">Software house with a wada — fixed rates, three demos, zero surprises</h1>
<p class="muted" data-ur="${escA(S.brand.descUr)}">${esc(S.brand.desc)}</p></div>
${cert3dBand({ title: "Certified. Registered. Answerable.", sub: "Five credentials behind every project — not borrowed badges." })}
<section class="sec-tight"><div class="wrap split">
<div class="img-side">${imgExists("about-team") ? widePic("about-team", "The Wafa Smart Tech team in Lahore") : widePic("hero-ai", "Wafa Smart Tech studio")}</div>
<div><h2>Why fixed rates?</h2><p class="muted panel3d panel3d--blue">Lahore's businesses were being quoted 300K for things that genuinely cost 40K — or handed junk for 5K. We publish a rate card instead: website 14K, website + management 20K, AI/voice 23.5K, Android/Windows 30K, iOS 35K. Reusable engineering keeps it honest — a fast 3D UI framework, hardened AI pipelines and static-fast websites. You still see 3 demo designs before paying the second half, and the free domain on site services is our way of starting the relationship, not trapping it.</p>
<ul class="checklist"><li>Small senior team — no juniors learning on your budget</li><li>Every project includes source code + handover video</li><li>Urdu, Roman Urdu &amp; English — whichever you think in</li><li>Clear rates from PKR 14,000, written quotes, no surprise invoices</li></ul></div>
</div></section>
<section class="sec"><div class="wrap"><div class="grid c4">${S.stats.map(statCard).join("")}</div></div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><span class="eyebrow">Our rules</span><h2>Values we refuse to break</h2></div>
<div class="grid c3">${whyEl({ icon: "shield", t: "Wafa means loyalty", u: "وفا کا مطلب ہے اعتماد", d: "Once we take your project, you're our project — priority support, honest scope talk, even when it's small." }, 0)}${whyEl({ icon: "spark", t: "Show before you promise", u: "دکھاؤ، پھر وعدہ", d: "Three demo designs before the final build. You pick; we commit to that one." }, 1)}${whyEl({ icon: "infinity", t: "Zero lock-in", u: "بندش نہیں", d: "Your domain, your code, your keys. If you ever leave, we'll help you migrate. That's the Lahore way." }, 2)}</div>
</div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><span class="eyebrow" data-i18n="sec.process">How we work</span><h2>The 6-step machine</h2></div><div class="grid c2 process-grid" style="max-width:900px;margin-inline:auto">${S.process.map(stepEl).join("")}</div></div></section>
${ctaBand("Lahore me chai pe milte hain, ya WhatsApp par — dono free hain")}
</main>` + footer() + quoteModal() + scripts + "</body></html>";
  PAGES.push({ file: "about.html", title: t, desc: d });
  write("about.html", html);
})();

/* ---- CONTACT ---- */
(function contact() {
  const t = "Contact — WhatsApp 0324 6627054 · " + S.brand.city;
  const d = "WhatsApp 0324 6627054 · Lahore-Sharqpur Road, Lahore. Fixed quotes from PKR 14,000, emergency recovery from PKR 5,000, same day.";
  const html = head({ file: "contact.html", title: t, desc: d, jsonld: [...ldBase(), ldLocalBusiness(), { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact " + S.brand.name, url: S.brand.url + "/contact.html", about: { "@id": S.brand.url + "/#business" } }, ldBreadcrumb([["Home", "/index.html"], ["Contact", "/contact.html"]])] }) +
    bgfx + nav("contact") + `<main id="main">
${bcrumbs([["Home", "/index.html"], ["Contact", "/contact.html"]])}
<div class="wrap page-head"><span class="eyebrow">Fastest reply on WhatsApp</span><h1 data-ur="رابطہ — جواب منٹوں میں">Let's talk — usually minutes, fixed rates from ${pkr(S.PRICE)}</h1>
<p class="muted">No call centers, no forms into the void. A developer reads every message. Hacked website/PHP or WhatsApp? Mark <b>Emergency recovery</b> and get a free inspection first.</p></div>
<section class="sec-tight creds3d creds3d--contact"><div class="wrap">
<div class="sec-head" style="margin-bottom:20px"><span class="eyebrow">Credentials &amp; registrations</span><h2 style="font-size:clamp(1.35rem,3.8vw,1.9rem)">Certified. Registered. Answerable.</h2>
<p>Five verified credentials behind every project — not borrowed badges. AWS, Google, IT Ministry experience, Saudi registration and ZATCA-compliant delivery.</p></div>
${cert3dGrid()}
<div class="panel3d panel3d--gold company3d">
<h3>WAFA Smart Tech — verified company profile</h3>
<p data-ur="${escA(S.brand.descUr)}">${esc(S.brand.desc)}</p>
</div>
</div></section>
<section class="sec-tight contact3d"><div class="wrap grid c2" style="align-items:start">
<div class="glass box3d box3d--blue" style="padding:30px">
  <h2 style="font-size:1.3rem;margin-bottom:6px">Send an inquiry</h2>
  <p class="tiny muted" style="margin-bottom:20px">Ye form kisi server par nahi jata — seedha aapka WhatsApp kholta hai, message ready</p>
  <form id="contact-form" novalidate>
    <div class="adm-grid2">
    <div class="field"><label for="cf-name">Your name *</label><input class="input" id="cf-name" name="name" autocomplete="name" required placeholder="Ali Raza" data-ur-ph="f.name"></div>
    <div class="field"><label for="cf-phone">WhatsApp number *</label><input class="input" id="cf-phone" name="phone" inputmode="tel" required placeholder="03XX-XXXXXXX"></div>
    </div>
    <div class="adm-grid2">
    <div class="field"><label for="cf-service" data-i18n="f.service">Service needed</label>
      <select class="input" id="cf-service" name="service"><option>Not sure yet</option>${S.services.map(s => `<option>${esc(s.name)}</option>`).join("")}${S.recovery.map(r => `<option>${esc(r.name)} — ${pkr(r.price)}</option>`).join("")}<option>Multiple services / custom</option></select></div>
    <div class="field"><label for="cf-demo" data-i18n="f.demo">Preferred demo style (builds)</label>
      <select class="input" id="cf-demo" name="demo"><option>${esc(S.DEMOS[0].n)}</option><option>${esc(S.DEMOS[1].n)}</option><option>${esc(S.DEMOS[2].n)}</option><option>Make all 3 — I'll pick after</option><option>Not applicable — emergency recovery</option></select></div>
    </div>
    <div class="field"><label for="cf-msg" data-i18n="f.msg">Project details</label><textarea class="input" id="cf-msg" name="message" placeholder="Biz ka naam, kya banana hai, deadline? Urdu/Roman Urdu chalega."></textarea></div>
    <button class="btn btn-lg btn-wa btn-block" type="submit">${svg("wa", 20)} <span data-i18n="f.send">Send on WhatsApp</span></button>
    <p class="hint center" style="margin-top:10px">Inquiry sirf aapke browser me rehti hai jab tak aap WhatsApp na bhejein</p>
  </form>
</div>
<div style="display:grid;gap:16px">
  <div class="glass box3d box3d--green" style="padding:24px"><h3>${svg("wa",20)} WhatsApp (recommended)</h3>
  <p class="muted" style="margin:8px 0 14px">Chat now — quote + demo timeline, same day.</p>
  <a class="btn btn-wa btn-block" target="_blank" rel="noopener" data-wa-msg="Assalam o Alaikum! ${S.brand.name} — naya project discuss karna hai, rate card aur 3 demos ke saath." href="${wa("Hello Wafa")}">Order / Chat: 0324 6627054</a>
  <div class="adm-grid2" style="margin-top:14px">
    <a class="btn btn-sm btn-wa" href="tel:+${escA(S.contact.whatsapp)}">${svg("phone",16)} Call</a>
    <a class="btn btn-sm btn-ghost" href="mailto:${escA(S.contact.email)}">${svg("mail",16)} Email</a>
  </div></div>
  <div class="glass box3d box3d--gold" style="padding:24px"><h3>${svg("pin", 18)} Office</h3>
  <p class="muted" style="margin:8px 0 4px" data-ur="${escA(S.contact.addressUr)}" data-wk="contact.address">${esc(S.contact.address)}</p>
  <p class="tiny muted">${svg("clock", 13)} <span data-wk="contact.hours">${esc(S.contact.hours)}</span></p>
  <a class="btn btn-sm btn-ghost" style="margin-top:12px" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(S.contact.mapQuery)}">Open in Google Maps ↗</a></div>
  <div class="glass box3d box3d--purple" style="padding:24px"><h3>${svg("bolt",20)} Rate card</h3>
  <p class="tiny muted" style="margin-top:8px">Website <b>${pkr(S.TIERS.website)}</b> · management ${pkr(S.TIERS.management)} · AI/voice ${pkr(S.TIERS.ai)} · Android/Windows ${pkr(S.TIERS.android)} · iOS ${pkr(S.TIERS.ios)}. Domain FREE on site services.</p></div>
  <div class="glass rec-contact-card box3d box3d--red" style="padding:24px"><span class="pill pill-demo">Emergency</span>
  <h3 style="margin-top:10px">Hacked website or WhatsApp?</h3>
  <p class="tiny muted">Website/PHP <b>${pkr(7000)}</b> · WhatsApp <b>${pkr(5000)}</b>. Free inspection, proof of ownership, no OTP requests.</p>
  <a class="btn btn-red btn-block" style="margin-top:12px" href="/recovery.html">Recovery details →</a></div>
</div></div></section>
<section class="sec"><div class="wrap"><div class="guar panel3d panel3d--green" style="justify-content:center">${svg("spark", 22)}<span>Visiting in person? <b>Pehle WhatsApp par time confirm kar lein</b> — 0324 6627054. Chai on us</span></div></div></section>
</main>` + footer() + quoteModal() + scripts + "</body></html>";
  PAGES.push({ file: "contact.html", title: t, desc: d });
  write("contact.html", html);
})();

/* ---- BLOG ---- */
(function blogIndex() {
  const t = "Blog — AI, websites & earning guides (Pakistan) | " + S.brand.name;
  const d = "Practical 2026 guides from Wafa Smart Tech: the fixed-rate pricing logic (14K–35K), 3-demo design process, AI receptionist numbers and earning-portal playbooks.";
  const html = head({ file: "blog.html", title: t, desc: d, jsonld: [...ldBase(), ldBreadcrumb([["Home", "/index.html"], ["Blog", "/blog.html"]])] }) +
    bgfx + nav("blog") + `<main id="main">
${bcrumbs([["Home", "/index.html"], ["Blog", "/blog.html"]])}
<div class="wrap page-head"><span class="eyebrow">Guides &amp; numbers</span><h1 data-ur="بلاگ">Things worth reading before you spend</h1>
<p class="muted">Pakistani market realities — prices, timelines and traps to avoid. New guides monthly.</p></div>
<section class="sec-tight"><div class="wrap"><div class="grid c2">${S.blog.map(blogCard).join("")}</div>
<div class="cta-band rv" style="margin-top:30px"><h2 style="font-size:1.3rem">Guide aapke kaam ki nahi?</h2><p class="muted">WhatsApp par topic bhejein — agle hafte publish.</p><a class="btn btn-wa" target="_blank" rel="noopener" data-wa-msg="Blog idea: " href="${wa("Blog idea: ")}">💬 Send idea</a></div>
</div></section></main>` + footer() + quoteModal() + scripts + "</body></html>";
  PAGES.push({ file: "blog.html", title: t, desc: d });
  write("blog.html", html);
})();
S.blog.forEach(b => {
  const t = b.title + " | " + S.brand.name;
  const html = head({ file: "blog/" + b.slug + ".html", title: t, desc: b.desc, heroImg: b.img, jsonld: [...ldBase(), ldArticle(b), ldBreadcrumb([["Home", "/index.html"], ["Blog", "/blog.html"], [b.title, "/blog/" + b.slug + ".html"]])] }) +
    bgfx + nav("blog") + `<main id="main">
${bcrumbs([["Home", "/index.html"], ["Blog", "/blog.html"], [b.title.slice(0, 40) + "…", "/blog/" + b.slug + ".html"]])}
<article class="wrap" style="padding-top:16px">
  <div class="sec-head"><span class="eyebrow">${svg("pen",14)} ${b.date} · ${b.read} read</span>
  <h1 data-ur="${escA(b.titleUr)}">${esc(b.title)}</h1><p class="muted" style="max-width:640px;margin-inline:auto">${esc(b.desc)}</p></div>
  <div style="border-radius:24px;overflow:hidden;border:1px solid var(--line);margin-bottom:34px">${pic(b.img, b.title, false, "", "(max-width:960px) 92vw,1000px")}</div>
  <div class="article-body">${b.body}</div>
  <div class="cta-band rv" style="margin:56px 0 70px"><h2 style="font-size:1.35rem" data-ur="خود بنوانا ہے؟">Want this for your business?</h2><p class="muted">Fixed rates from ${pkr(S.PRICE)} — 3 demos first, domain free on sites.</p><div class="hero-cta" style="justify-content:center"><a class="btn btn-wa btn-lg" target="_blank" rel="noopener" data-wa-msg="Maine blog padha — mujhe bhi apna project banwana hai (fixed rate card). (Page: {page})" href="${wa("From blog: " + b.slug)}">🛒 WhatsApp now</a><button class="btn btn-lg btn-wa" type="button" data-quote data-svc="From blog: ${escA(b.title)}">📋 Free quote</button></div></div>
</article></main>` + footer() + quoteModal() + scripts + "</body></html>";
  PAGES.push({ file: "blog/" + b.slug + ".html", title: t, desc: b.desc });
  write("blog/" + b.slug + ".html", html);
});

/* ---- 15 SEO landing pages ---- */
LANDING.forEach(landingPage);

/* ---- 404 + OFFLINE ---- */
write("404.html", head({ file: "404.html", title: "404 — Page not found | " + S.brand.name, desc: "The page you were looking for moved or never existed. Go home or WhatsApp us.", noindex: true }) + bgfx + `<main style="min-height:100svh;display:grid;place-items:center;text-align:center"><div class="wrap"><div style="font-size:clamp(6rem,20vw,12rem);font-weight:900;line-height:1" class="grad-txt">404</div><h1>Ye page nahi mila…</h1><p class="muted" style="max-width:420px;margin:14px auto 26px">The link is broken — but our reply never is. Go home or ping us directly.</p><div class="hero-cta" style="justify-content:center"><a class="btn btn-lg" href="/index.html">🏠 Back home</a><a class="btn btn-lg btn-wa" target="_blank" href="${wa("404 page mil gayi 😅 — help?")}">💬 WhatsApp</a></div></div></main>` + scripts + "</body></html>");
write("offline.html", head({ file: "offline.html", title: "Offline — " + S.brand.name, desc: "You are offline. The app cached this page for you.", noindex: true }) + bgfx + `<main style="min-height:100svh;display:grid;place-items:center;text-align:center"><div class="wrap"><div style="font-size:6rem">📡</div><h1>Internet nahi mila</h1><p class="muted" style="margin:12px 0 22px">Connection wapas aate hi sab kuch yahi rahega. WhatsApp par to har haal me pohanch sakte hain.</p><a class="btn btn-wa" href="${wa("Offline 😅")}">💬 0324 6627054</a></div></main>` + scripts + "</body></html>");

/* ---- ADMIN ---- */
write("admin.html", `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin — ${esc(S.brand.name)} CMS</title><meta name="robots" content="noindex,nofollow">
<meta name="description" content="Client admin: leads inbox, content editor, exports."><link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest">
<link rel="stylesheet" href="/assets/css/styles.css"><script>window.WST_CFG={wa:"${S.contact.whatsapp}",brand:"${escA(S.brand.name)}",price:${S.PRICE}};</script></head>
<body class="adm" data-svcs='${escA(JSON.stringify([...S.services, ...S.recovery].map(s => ({ slug: s.slug, name: s.name, from: s.price, to: s.price }))))}' data-pkgs='${escA(JSON.stringify(S.packages.map(p => ({ n: p.n, price: p.price }))))}'>
<div id="adm-app"></div><script src="/assets/js/admin.js" defer></script></body></html>`);

/* ---- custom 3D homepage (standalone template, overwrites generated index) ---- */
const home3d = path.join(SRC, "index-3d.html");
if (fs.existsSync(home3d)) fs.copyFileSync(home3d, path.join(DIST, "index.html"));

/* ---- SEO misc files ---- */
const abs = f => f === "index.html" ? S.brand.url + "/" : `${S.brand.url}/${f}`;
fs.writeFileSync(path.join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${PAGES.map(p => `  <url><loc>${abs(p.file)}</loc><lastmod>${NOW}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${abs(p.file)}"/><xhtml:link rel="alternate" hreflang="ur" href="${abs(p.file)}"/><changefreq>${p.file === "index.html" || p.file.startsWith("blog") ? "weekly" : "monthly"}</changefreq><priority>${p.file === "index.html" ? "1.0" : p.file.startsWith("blog") ? "0.7" : "0.9"}</priority></url>`).join("\n")}
</urlset>\n`);
fs.writeFileSync(path.join(DIST, "robots.txt"), `# ${S.brand.domain}
User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /offline.html
Sitemap: ${S.brand.url}/sitemap.xml
`);
fs.writeFileSync(path.join(DIST, "manifest.webmanifest"), JSON.stringify({
  name: S.brand.name + " — fixed rates from PKR 14,000 · AI, sites & apps (Lahore)", short_name: "Wafa Smart",
  description: S.brand.desc, start_url: "/index.html", scope: "/", display: "standalone",
  background_color: "#060f23", theme_color: "#060f23", orientation: "portrait-primary",
  lang: "en", dir: "auto", categories: ["business", "productivity"],
  icons: [
    { src: "/assets/img/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/assets/img/icon-512.png", sizes: "512x512", type: "image/png" },
    { src: "/assets/img/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
  ]
}, null, 2));
fs.writeFileSync(path.join(DIST, "sw.js"), `/* ${S.brand.name} service worker — fast shell v10 */
const C="wafa-v10";
const K=["/index.html","/recovery.html","/offline.html","/assets/css/styles.css","/assets/css/3d.css","/assets/js/main.js","/assets/js/3d.js","/assets/js/i18n.js","/assets/fonts/manrope-latin-var.woff2","/assets/fonts/sora-latin-var.woff2","/assets/img/logo.webp","/manifest.webmanifest"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(K)).catch(()=>{}));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin||e.request.method!=="GET")return;
  if(e.request.mode==="navigate"){
    e.respondWith(fetch(e.request).then(n=>{if(n.ok)caches.open(C).then(c=>c.put(e.request,n.clone()));return n;}).catch(()=>caches.match(e.request).then(r=>r||caches.match("/offline.html"))));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{
    if(n.ok&&u.pathname.match(/\\.(css|js|webp|png|jpg|jpeg|ico|svg|woff2)$/))caches.open(C).then(c=>c.put(e.request,n.clone()));
    return n;
  }).catch(()=>Response.error())));
});
`);

/* ---- host-level speed + caching config (cPanel/Apache + Netlify/Cloudflare Pages) ---- */
fs.writeFileSync(path.join(DIST, ".htaccess"), `# Wafa Smart Tech — compression, caching, security
Options -MultiViews
ErrorDocument 404 /404.html

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/xml application/xml
  AddOutputFilterByType DEFLATE application/javascript application/json application/manifest+json image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 30 days"
  ExpiresByType application/javascript "access plus 30 days"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType application/manifest+json "access plus 7 days"
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  <FilesMatch "\\.(webp|png|jpg|jpeg|svg|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(css|js)$">
    Header set Cache-Control "public, max-age=2592000"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>
`);
fs.writeFileSync(path.join(DIST, "_headers"), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN

/*.html
  Cache-Control: no-cache

/assets/css/*
  Cache-Control: public, max-age=2592000

/assets/js/*
  Cache-Control: public, max-age=2592000

/assets/img/*
  Cache-Control: public, max-age=31536000, immutable

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable
`);
fs.mkdirSync(path.join(DIST, "assets/data"), { recursive: true });
fs.writeFileSync(path.join(DIST, "assets/data/content.json"), JSON.stringify({ exportedAt: new Date().toISOString(), price: S.PRICE, tiers: S.TIERS, site: { hero: { title: S.hero.titleA + S.hero.titleGrad + S.hero.titleB, sub: S.hero.sub }, contact: S.contact, packages: S.packages.map(p => ({ n: p.n, price: p.price })), services: S.services.map(s => ({ slug: s.slug, name: s.name, price: s.price, priceNote: s.priceNote })), recovery: S.recovery.map(r => ({ slug: r.slug, name: r.name, price: r.price, priceNote: r.priceNote, features: r.features })) } }, null, 2));

/* ---- remove stale generated HTML (e.g. old wafa-3d.html) ---- */
for (const f of fs.readdirSync(DIST)) {
  if (f.endsWith(".html") && !written.includes(f)) fs.unlinkSync(path.join(DIST, f));
}

/* ---- report ---- */
const kb = f => (fs.statSync(path.join(DIST, f)).size / 1024).toFixed(1) + " KB";
console.log(`✅ BUILD OK — ${written.length} HTML pages`);
console.log("   " + written.map(f => f.replace(".html", "")).join(" · "));
if (missing.size) console.log("   ⚠ missing images: " + [...missing].join(", "));
console.log(`   index.html = ${kb("index.html")} · admin = ${kb("admin.html")}`);
