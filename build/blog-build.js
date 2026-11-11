"use strict";
/* Builds 22 SEO blog articles + the blog index + sitemap entries.
   Usage: node build/blog-build.js
   Re-runnable: it reads dist/blog.html for the shared header/footer shell. */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "dist");
const BLOG = path.join(OUT, "blog");
const BASE = "https://wafasmart.tech";
const BRAND = "Wafa Smart Tech";
const TODAY = "2026-10-30";

const articles = [
  ...require("./blog/data-uae.js"),
  ...require("./blog/data-pakistan.js"),
  ...require("./blog/data-hosting.js"),
  ...require("./blog/data-construction.js"),
  ...require("./blog/data-info-sim.js"),
  ...require("./blog/data-info-bisp.js"),
  ...require("./blog/data-info-schemes.js"),
  ...require("./blog/data-info-docs.js")
];

const featured = [
  {
    slug: "ai-receptionist-pakistan-price",
    title: "AI Receptionist in Pakistan: Real Prices & Numbers (2026)",
    h1: "AI Receptionist in Pakistan: Real Prices & Numbers (2026)",
    desc: "Fixed PKR 23,500 at Wafa Smart Tech — here is exactly what the AI receptionist answers, how booking works, and BrightSmile's real numbers.",
    category: "AI & Earning",
    date: "2026-10-08",
    read: 6,
    image: "service-receptionist",
    imageAlt: "AI receptionist in Pakistan pricing guide"
  },
  {
    slug: "ghar-beth-kamai-portal",
    title: "Ghar Bethan Kamai: Build Your Own Job & Earning Portal",
    h1: "Ghar Bethan Kamai: Build Your Own Job & Earning Portal",
    desc: "A PKR 20,000 MVP portal with four income streams — featured posts, subscriptions, verified passes and referrals — plus the trust features that keep you legal.",
    category: "AI & Earning",
    date: "2026-09-21",
    read: 7,
    image: "service-job-portal",
    imageAlt: "Build a work-from-home job and earning portal"
  }
];

const esc = s => String(s)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const urlFor = a => `${BASE}/blog/${a.slug}.html`;
const imgFor = (a, size) => `${BASE}/assets/img/${a.image}-${size}.webp`;

function imageSet(a, alt, sizes) {
  return `<img src="/assets/img/${a.image}-640.webp" srcset="/assets/img/${a.image}-320.webp 320w, /assets/img/${a.image}-480.webp 480w, /assets/img/${a.image}-640.webp 640w, /assets/img/${a.image}-880.webp 880w" sizes="${sizes}" alt="${esc(alt)}" decoding="async" width="880" height="880">`;
}

/* The info cluster uses branded hero images. Per-article images are generated
   by build/blog-images.js as blog-<slug>.webp; older SVG heroes stay as a
   fallback. Resolve the real extension at build time. */
const IMG_CREDITS = (() => {
  try { return require("./blog/image-credits.json"); } catch { return {}; }
})();

function heroName(a) {
  const per = "blog-" + a.slug;
  if (fs.existsSync(path.join(OUT, "assets", "img", per + ".webp"))) return per;
  return a.image;
}
function infoExt(name) {
  for (const e of [".webp", ".jpg", ".png", ".svg"]) {
    if (fs.existsSync(path.join(OUT, "assets", "img", name + e))) return e;
  }
  return ".svg";
}
function infoImg(a, alt, hero = false, sizes = "(max-width:620px) 92vw,(max-width:900px) 46vw,560px") {
  const name = heroName(a);
  const ext = infoExt(name);
  const base = `/assets/img/${name}`;
  const altAttr = esc(alt || a.imageAlt || a.h1);
  const set = ext === ".webp"
    ? ` srcset="${base}-640.webp 640w, ${base}-960.webp 960w, ${base}.webp 1200w" sizes="${sizes}"`
    : "";
  const load = hero
    ? `loading="eager" fetchpriority="high"`
    : `loading="lazy"`;
  return `<img src="${base}${ext}"${set} alt="${altAttr}" ${load} decoding="async" width="1200" height="675">`;
}
function creditLine(a) {
  const c = IMG_CREDITS[a.slug];
  if (!c) return "";
  const src = c.source ? ` · <a href="${c.source}" target="_blank" rel="noopener noreferrer nofollow">source</a>` : "";
  return `<p class="hint" style="max-width:1000px;margin:8px auto 0;text-align:right;font-size:.72rem">${esc(c.credit)}${src}</p>`;
}

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND,
  url: BASE,
  logo: `${BASE}/assets/img/logo.png`,
  email: "info@wafasmart.tech",
  description: "Wafa Smart Tech, Lahore — web development, SEO, AI agents and free browser tools. Fixed website packages and a free domain with site services.",
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressRegion: "Punjab", addressCountry: "PK" },
  contactPoint: [{ "@type": "ContactPoint", telephone: "+92 324 6627054", contactType: "sales", areaServed: "PK", availableLanguage: ["en", "ur"] }],
  sameAs: [BASE]
};
const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND,
  url: BASE,
  inLanguage: ["en", "ur"],
  publisher: { "@type": "Organization", name: BRAND, url: BASE }
};

function head({ title, desc, kw, canonical, type = "article", image, ogWidth = 880, ogHeight = 880, ogImage: ogImageIn, ogType, published, modified, section, articleLd, faqLd, crumbLd, listLd, preloadImage }) {
  const ogImage = ogImageIn || (image === "og-cover" ? `${BASE}/assets/img/og-cover.jpg` : (image ? `${BASE}/assets/img/${image}-880.webp` : `${BASE}/assets/img/og-cover.jpg`));
  const ogImgType = ogType || (image === "og-cover" ? "image/jpeg" : "image/webp");
  const preload = preloadImage
    ? `<link rel="preload" as="image" href="${preloadImage.href}"${preloadImage.srcset ? ` imagesrcset="${preloadImage.srcset}" imagesizes="${preloadImage.sizes}"` : ""} fetchpriority="high">\n`
    : "";
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
${preload}<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="keywords" content="${esc(kw)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${canonical}"><link rel="alternate" hreflang="ur" href="${canonical}"><link rel="alternate" hreflang="x-default" href="${canonical}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="${type}"><meta property="og:site_name" content="${esc(BRAND)}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}"><meta property="og:image" content="${ogImage}"><meta property="og:image:width" content="${ogWidth}"><meta property="og:image:height" content="${ogHeight}"><meta property="og:image:type" content="${ogImgType}"><meta property="og:locale" content="en_PK"><meta property="og:locale:alternate" content="ur_PK">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${ogImage}">
${published ? `<meta property="article:published_time" content="${published}"><meta property="article:modified_time" content="${modified || published}">` : ""}
${section ? `<meta property="article:section" content="${esc(section)}">` : ""}
<meta name="theme-color" content="#071a16"><meta name="format-detection" content="telephone=no">
<meta name="author" content="Wafa Smart Tech, Lahore">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32"><link rel="icon" href="/assets/img/favicon-16.png" sizes="16x16">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest">
<link rel="preload" href="/assets/fonts/manrope-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/sora-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/css/styles.css" as="style"><link rel="stylesheet" href="/assets/css/styles.css">
<link rel="stylesheet" href="/assets/css/3d.css">
<script type="application/ld+json">${JSON.stringify(orgLd)}</script>
<script type="application/ld+json">${JSON.stringify(siteLd)}</script>
${articleLd ? `<script type="application/ld+json">${JSON.stringify(articleLd)}</script>` : ""}
${faqLd ? `<script type="application/ld+json">${JSON.stringify(faqLd)}</script>` : ""}
${crumbLd ? `<script type="application/ld+json">${JSON.stringify(crumbLd)}</script>` : ""}
${listLd ? `<script type="application/ld+json">${JSON.stringify(listLd)}</script>` : ""}
<script>window.WST_CFG={wa:"923246627054",brand:"Wafa Smart Tech",price:14000,url:${JSON.stringify(canonical)}};</script>`;
}

function articleHead(a) {
  const canonical = urlFor(a);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.h1,
    description: a.desc,
    datePublished: a.date,
    dateModified: a.date,
    image: [imgFor(a, 880)],
    author: { "@type": "Organization", name: BRAND, url: BASE },
    publisher: { "@type": "Organization", name: BRAND, logo: { "@type": "ImageObject", url: `${BASE}/assets/img/logo.png` } },
    mainEntityOfPage: canonical,
    articleSection: a.category,
    keywords: a.kw.split(",").map(s => s.trim()),
    isPartOf: { "@id": `${BASE}/blog.html` }
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: a.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  };
  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/index.html` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog.html` },
      { "@type": "ListItem", position: 3, name: a.h1, item: canonical }
    ]
  };
  const isInfo = a.cluster === "info";
  const imgName = isInfo ? heroName(a) : a.image;
  const imgExt = isInfo ? infoExt(imgName) : ".webp";
  const ogTypeForExt = { ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp" };
  const preloadImage = isInfo ? {
    href: `/assets/img/${imgName}${imgExt}`,
    srcset: imgExt === ".webp" ? `/assets/img/${imgName}-640.webp 640w, /assets/img/${imgName}-960.webp 960w, /assets/img/${imgName}.webp 1200w` : "",
    sizes: "(max-width:620px) 94vw, 1000px"
  } : undefined;
  return head({
    title: `${a.title} | ${BRAND}`,
    desc: a.desc,
    kw: a.kw,
    canonical,
    type: "article",
    image: imgName,
    ogImage: isInfo ? `${BASE}/assets/img/${imgName}${imgExt}` : undefined,
    ogType: isInfo ? ogTypeForExt[imgExt] : undefined,
    ogWidth: isInfo ? 1200 : 880,
    ogHeight: isInfo ? 675 : 880,
    published: a.date,
    modified: a.date,
    section: a.category,
    articleLd,
    faqLd,
    crumbLd,
    preloadImage
  });
}

function articleMain(a) {
  const faq = a.faqs.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("\n");
  const related = a.related.map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`).join("\n");
  return `<div class="wrap"><nav class="bcrumbs" aria-label="Breadcrumb"><a href="/index.html">Home</a><span aria-hidden="true">›</span><a href="/blog.html">Blog</a><span aria-hidden="true">›</span><span>${esc(a.category)}</span></nav></div>
<article class="wrap" style="padding-top:16px">
  <div class="sec-head"><span class="eyebrow">${esc(a.category)} · ${a.date} · ${a.read} min read</span>
  <h1>${esc(a.h1)}</h1><p class="muted" style="max-width:720px;margin-inline:auto">${esc(a.desc)}</p></div>
  <div style="border-radius:24px;overflow:hidden;border:1px solid var(--line);margin-bottom:34px">${imageSet(a, a.imageAlt, "(max-width:960px) 92vw,1000px")}</div>
  <div class="article-body">
    <p><b>Short answer:</b> ${esc(a.intro)}</p>
    ${a.body}
    <h2 id="faq">Frequently asked questions</h2>
    ${faq}
    <div class="cta-band" style="margin:40px 0"><h2 style="font-size:1.35rem">${esc(a.cta.h)}</h2><p class="muted">${esc(a.cta.p)}</p><div class="hero-cta" style="justify-content:center"><a class="btn btn-wa btn-lg" href="${a.cta.href}">${esc(a.cta.label)}</a><a class="btn btn-lg btn-ghost" href="/tools/index.html">Browse free tools</a></div></div>
    <h2 id="related">Related guides</h2>
    <ul>${related}</ul>
    <p class="hint">Published ${a.date} by ${BRAND}, Lahore. This is general information, not legal, tax or financial advice. Confirm current rules with the relevant authority or a qualified professional.</p>
  </div>
</article>`;
}

/* The info cluster shares the blog shell but gets a stronger 3D treatment:
   a "short answer" box, an official-links box, an accordion FAQ and a
   branded CTA that always points back to Wafa Smart Tech. */
function infoMain(a) {
  const official = (a.official || []).map(([l, u]) =>
    `<li><a href="${u}" target="_blank" rel="noopener noreferrer">${esc(l)}</a></li>`).join("");
  const faq = a.faqs.map(f =>
    `<details class="faq3d"><summary>${esc(f.q)}</summary><div class="faq3d-a">${esc(f.a)}</div></details>`).join("\n");
  const related = a.related.map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`).join("\n");
  const wa = "https://wa.me/923246627054?text=" + encodeURIComponent("Assalam o Alaikum Wafa Smart Tech — mujhe website, tools ya services ke bare me maloomat chahiye.");
  return `<div class="wrap"><nav class="bcrumbs" aria-label="Breadcrumb"><a href="/index.html">Home</a><span aria-hidden="true">›</span><a href="/blog.html">Blog</a><span aria-hidden="true">›</span><span>${esc(a.category)}</span></nav></div>
<div class="wrap page-head" style="text-align:center">
  <span class="eyebrow">${esc(a.category)} · ${a.date} · ${a.read} min read</span>
  <h1>${esc(a.h1)}</h1>
  <p class="muted" style="max-width:760px;margin-inline:auto">${esc(a.desc)}</p>
</div>
<div class="wrap" style="max-width:1000px;border-radius:22px;overflow:hidden;border:1px solid var(--w3d-line,#243)">${infoImg(a, a.imageAlt, true, "(max-width:620px) 94vw, 1000px")}</div>
${creditLine(a)}
<div class="wrap" style="max-width:820px;margin-top:26px">
  <div class="box3d box3d--green" style="padding:16px 18px;border-radius:18px;border:1px solid"><p style="margin:0"><b style="color:#7ff0ae">Short answer:</b> ${esc(a.intro)}</p></div>
</div>
<article class="wrap article-body" style="margin-top:24px">
  ${a.body}
  ${official ? `<div class="box3d box3d--blue" style="padding:16px 18px;border-radius:16px;border:1px solid;margin:24px 0"><h2 id="official" style="margin-top:0">Official websites</h2><ul style="margin:0;padding-inline-start:22px">${official}</ul><p class="hint" style="margin:10px 0 0">Always confirm on the official site — this is general information, not a government service.</p></div>` : ""}
  <h2 id="faq">Frequently asked questions</h2>
  <div class="faq3d">${faq}</div>
  <h2 id="related">Related guides</h2>
  <ul>${related}</ul>
  <div class="cta3d" style="margin:32px 0">
    <h2>${esc(a.cta.h)}</h2>
    <p>${esc(a.cta.p)}</p>
    <div class="btn3d-row">
      <a class="btn3d btn3d--gold" href="${a.cta.href}">${esc(a.cta.label)}</a>
      <a class="btn3d btn3d--green" href="${wa}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a class="btn3d btn3d--ghost" href="/index.html">wafasmart.tech</a>
    </div>
    <p style="margin:14px 0 0;font-size:.78rem;color:#8b99b6">Yeh guide <b style="color:#ffd166">Wafa Smart Tech</b> (Lahore) ne publish ki hai. Website design, SEO, AI chatbot aur 36+ free online tools ke liye <a href="/index.html" style="color:#ffd166">wafasmart.tech</a> par jayein.</p>
  </div>
  <p class="hint">Published ${a.date} by ${BRAND}, Lahore. General information only — raqam aur rules badalte rehte hain. Confirm current details on the official portal.</p>
</article>
<script>(function(){var d=document,h=d.querySelector(".hdr"),b=d.querySelector(".burger"),n=d.querySelector(".nav-links"),t=false;function s(){if(t)return;t=true;requestAnimationFrame(function(){if(h)h.classList.toggle("scrolled",window.scrollY>24);var e=d.documentElement;e.style.setProperty("--sp",(e.scrollTop/(e.scrollHeight-e.clientHeight)*100)+"%");t=false;});}window.addEventListener("scroll",s,{passive:true});s();if(b&&n){b.addEventListener("click",function(){b.classList.toggle("on");n.classList.toggle("open");});n.addEventListener("click",function(e){if(e.target.closest("a")){b.classList.remove("on");n.classList.remove("open");}});}d.querySelectorAll("[data-wa-msg]").forEach(function(a){var m=a.getAttribute("data-wa-msg");if(!m)return;var num=a.getAttribute("data-wa")||"923246627054";a.href="https://wa.me/"+num+"?text="+encodeURIComponent(m.replace("{page}",location.pathname));a.target="_blank";a.rel="noopener";});d.querySelectorAll(".faq3d").forEach(function(w){var x=[].slice.call(w.querySelectorAll("details"));x.forEach(function(y){y.addEventListener("toggle",function(){if(!y.open)return;x.forEach(function(o){if(o!==y)o.open=false;});});});});})();</script>`;
}

function card(a) {
  const href = `/blog/${a.slug}.html`;
  const pic = a.cluster === "info"
    ? infoImg(a, a.imageAlt)
    : imageSet(a, a.imageAlt, "(max-width:620px) 92vw,(max-width:900px) 46vw,560px").replace('decoding="async"', 'loading="lazy" decoding="async"');
  return `<a class="svc-card" style="display:block" href="${href}" data-tilt="7"><div class="svc-shine"></div><div class="svc-img">${pic}<span class="svc-badge">${esc(a.category)} · ${a.date} · ${a.read} min</span></div><div class="svc-body"><h3>${esc(a.h1)}</h3><p class="svc-desc">${esc(a.desc)}</p><span class="kb">Read article →</span></div></a>`;
}

function group(title, items) {
  return `<h2 style="margin:34px 0 14px">${esc(title)}</h2><div class="grid c2">${items.map(card).join("")}</div>`;
}

function blogMain() {
  const uae = articles.filter(a => a.category === "UAE VAT");
  const pak = articles.filter(a => a.category === "Pakistan Tools");
  const host = articles.filter(a => a.category === "Free Domain & Hosting");
  const build = articles.filter(a => a.category === "Construction & Materials");
  const sim = articles.filter(a => a.category === "SIM & Telecom");
  const bisp = articles.filter(a => a.category === "BISP & Ehsaas");
  const scheme = articles.filter(a => a.category === "Govt Schemes");
  const docs = articles.filter(a => a.category === "Bills & Documents");
  return `<div class="wrap"><nav class="bcrumbs" aria-label="Breadcrumb"><a href="/index.html">Home</a><span aria-hidden="true">›</span><span>Blog</span></nav></div>
<div class="wrap page-head"><span class="eyebrow">Guides &amp; numbers · updated ${TODAY}</span><h1>SIM check, BISP 8171, government schemes, bills and free tools guides</h1>
<p class="muted">Practical 2026 guides: how to check Telenor, Jazz, Ufone and Zong SIM numbers, BISP 8171 and Benazir payment checks, Punjab government schemes, electricity and tax checks, plus UAE VAT, Pakistani salaries and Zakat, building materials, free domains and hosting. New articles added regularly.</p></div>
<section class="sec-tight"><div class="wrap">
${group("SIM, telecom and number check guides", sim)}
${group("BISP, Benazir and Ehsaas check guides", bisp)}
${group("Government scheme check guides", scheme)}
${group("Bills and documents check guides", docs)}
${group("UAE VAT guides", uae)}
${group("Pakistan tools and money guides", pak)}
${group("Construction and building material guides", build)}
${group("Free domain and hosting guides", host)}
${group("AI and earning guides", featured)}
<div class="cta-band rv" style="margin-top:30px"><h2 style="font-size:1.3rem">Need a guide on a different topic?</h2><p class="muted">Send the question on WhatsApp and we will consider it for the next batch.</p><a class="btn btn-wa" target="_blank" rel="noopener" data-wa-msg="Blog idea: " href="https://wa.me/923246627054?text=Blog%20idea%3A%20">💬 Send idea</a></div>
</div></section>`;
}

function blogHead() {
  const all = [...articles, ...featured];
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wafa Smart Tech guides",
    itemListElement: all.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.h1, url: `${BASE}/blog/${a.slug}.html` }))
  };
  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/index.html` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog.html` }
    ]
  };
  const h = head({
    title: "Blog — SIM Check, BISP 8171, Govt Schemes & Tool Guides | Wafa Smart Tech",
    desc: "2026 guides for Pakistan: Telenor, Jazz, Ufone and Zong SIM number check codes, BISP 8171 and Benazir payment checks, Punjab schemes, bills and documents, plus UAE VAT, salary, Zakat, construction and free hosting.",
    kw: "sim number check code, telenor sim number check, jazz sim number check, ufone sim number check, zong sim number check, bisp 8171 check, benazir payment check, kisan card check, himmat card check, electricity bill check, fbr tax return check, uae vat guides, pakistan tools guides, construction cost lahore, free domain guide",
    canonical: `${BASE}/blog.html`,
    type: "website",
    image: "og-cover",
    ogWidth: 1200,
    ogHeight: 630,
    listLd,
    crumbLd
  });
  return h;
}

function writePage(file, headHtml, mainHtml, shell) {
  const bodyStart = shell.indexOf("<body");
  const mainStart = shell.indexOf('<main id="main">');
  const mainEnd = shell.indexOf("</main>") + "</main>".length;
  const bodyPrefix = shell.slice(bodyStart, mainStart);
  const bodySuffix = shell.slice(mainEnd);
  const html = `<!doctype html>
<html lang="en" dir="ltr" data-page="${file}">
<head>
${headHtml}
</head>
${bodyPrefix}<main id="main">
${mainHtml}
</main>${bodySuffix}`;
  fs.writeFileSync(path.join(OUT, file), html);
}

function updateSitemap() {
  const p = path.join(OUT, "sitemap.xml");
  let xml = fs.readFileSync(p, "utf8");

  // Drop any previously generated block (indented or not).
  xml = xml.replace(/[ \t]*<!-- BLOG-GUIDES -->[\s\S]*?<!-- \/BLOG-GUIDES -->\n?/, "");

  // The deployed sitemap may not contain the TOOLS marker, so make the
  // insertion point explicit: before </urlset> when no marker is found.
  const urls = articles.map(urlFor);
  const wanted = new Set(urls);

  // Remove existing <url> entries for these slugs so the generated block is
  // the single source of truth (prevents duplicates on re-runs).
  xml = xml.replace(/[ \t]*<url>[\s\S]*?<\/url>\n?/g, (entry) => {
    const loc = (entry.match(/<loc>([^<]+)<\/loc>/) || [])[1];
    return loc && wanted.has(loc) ? "" : entry;
  });

  const block = `  <!-- BLOG-GUIDES -->\n${urls.map(u => `  <url><loc>${u}</loc><lastmod>${TODAY}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${u}"/><xhtml:link rel="alternate" hreflang="ur" href="${u}"/><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n")}\n  <!-- /BLOG-GUIDES -->\n`;

  if (xml.includes("  <!-- TOOLS -->")) {
    xml = xml.replace("  <!-- TOOLS -->", block + "  <!-- TOOLS -->");
  } else {
    xml = xml.replace(/<\/urlset>\s*$/, block + "</urlset>\n");
  }

  xml = xml.replace(/<loc>https:\/\/wafasmart\.tech\/blog\.html<\/loc><lastmod>[^<]+<\/lastmod>/, `<loc>${BASE}/blog.html</loc><lastmod>${TODAY}</lastmod>`);
  fs.writeFileSync(p, xml);

  const missing = urls.filter(u => !xml.includes(`<loc>${u}</loc>`));
  if (missing.length) throw new Error(`sitemap missing ${missing.length} blog URLs, e.g. ${missing[0]}`);
}

function build() {
  fs.mkdirSync(BLOG, { recursive: true });
  // Read the shell from a pristine snapshot so repeated runs stay stable while
  // still allowing per-page script tweaks below.
  const SHELL = path.join(__dirname, "blog", "_shell.html");
  const shell = fs.readFileSync(fs.existsSync(SHELL) ? SHELL : path.join(OUT, "blog.html"), "utf8");

  // Info pages are CSS-only 3D. main.js / 3d.js are unused there and were the
  // main long tasks on mobile, so drop them. i18n.js is only needed when the
  // visitor switches to Urdu, so lazy-load it on demand (or immediately when
  // Urdu was saved) with a tiny inline loader.
  const I18N_LOADER = `<script>(function(){function go(){if(window.__wstI18nOn)return;window.__wstI18nOn=1;var s=document.createElement("script");s.src="/assets/js/i18n.js";s.onload=function(){var f=window.__wstI18nThen;window.__wstI18nThen=null;if(f)f();};document.head.appendChild(s);}var l=null;try{l=localStorage.getItem("wst.lang");}catch(e){}if(l==="ur"){go();return;}var b=document.querySelector("#lang-toggle");if(b){b.addEventListener("click",function(e){if(window.__wstI18nOn)return;window.__wstI18nThen=function(){var q=document.querySelector("#lang-toggle");if(q)q.click();};e.preventDefault();e.stopImmediatePropagation();go();},true);}})();</script>`;
  const infoShell = shell
    .replace(/\s*<script src="\/assets\/js\/3d\.js"[^>]*><\/script>/, "")
    .replace(/\s*<script src="\/assets\/js\/main\.js"[^>]*><\/script>/, "")
    .replace(/\s*<script src="\/assets\/js\/i18n\.js"[^>]*><\/script>/, "\n" + I18N_LOADER);

  // The blog index needs nav + scroll + WhatsApp links + reveal + tilt, but not
  // the canvas/counters/slider work in main.js, and not 3d.js. Use a tiny inline
  // script instead of main.js, and lazy-load i18n.js like the info pages.
  const INDEX_SCRIPT = `<script>(function(){var D=document,W=window,h=D.querySelector(".hdr"),sc=false;function onScroll(){if(sc)return;sc=true;requestAnimationFrame(function(){if(h)h.classList.toggle("scrolled",W.scrollY>24);var e=D.documentElement;e.style.setProperty("--sp",(e.scrollTop/(e.scrollHeight-e.clientHeight)*100)+"%");sc=false;});}W.addEventListener("scroll",onScroll,{passive:true});onScroll();var b=D.querySelector(".burger"),n=D.querySelector(".nav-links");if(b&&n){b.addEventListener("click",function(){b.classList.toggle("on");n.classList.toggle("open");});n.addEventListener("click",function(e){if(e.target.closest("a")){b.classList.remove("on");n.classList.remove("open");}});}D.querySelectorAll("[data-wa-msg]").forEach(function(a){var m=a.getAttribute("data-wa-msg");if(!m)return;var num=a.getAttribute("data-wa")||"923246627054";a.href="https://wa.me/"+num+"?text="+encodeURIComponent(m.replace("{page}",D.title));a.target="_blank";a.rel="noopener";});var rv=D.querySelectorAll(".rv");if("IntersectionObserver"in W){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target);}});},{threshold:.12,rootMargin:"0px 0px -40px 0px"});rv.forEach(function(e){io.observe(e);});}else rv.forEach(function(e){e.classList.add("in");});if(W.matchMedia&&W.matchMedia("(hover:hover) and (pointer:fine)").matches){D.querySelectorAll(".svc-card,.pf-card").forEach(function(c){var k=parseFloat(c.dataset.tilt||"7");c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.setProperty("--ry",(x*k)+"deg");c.style.setProperty("--rx",(-y*k)+"deg");});c.addEventListener("pointerleave",function(){c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg");});});}})();</script>`;
  const indexShell = shell
    .replace(/\s*<script src="\/assets\/js\/3d\.js"[^>]*><\/script>/, "")
    .replace(/\s*<script src="\/assets\/js\/main\.js"[^>]*><\/script>/, "\n" + INDEX_SCRIPT)
    .replace(/\s*<script src="\/assets\/js\/i18n\.js"[^>]*><\/script>/, "\n" + I18N_LOADER);

  for (const a of articles) {
    writePage(`blog/${a.slug}.html`, articleHead(a), a.cluster === "info" ? infoMain(a) : articleMain(a), a.cluster === "info" ? infoShell : shell);
  }
  writePage("blog.html", blogHead(), blogMain(), indexShell);
  updateSitemap();
  console.log(`built ${articles.length} blog articles + blog.html`);
  console.log(`sitemap updated: ${articles.length} guide URLs`);
}

build();
