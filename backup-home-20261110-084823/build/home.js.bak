/* ------------------------------------------------------------------
   build/home.js — regenerates the homepage (build/src/index-3d.html)
   plus its stylesheet (build/src/css/home.css).

   The retained visual design comes from build/src/sfiva.min.css, mechanically
   pruned to the selectors this page actually uses. All copy, prices, images
   and links come from build/src/data/site.js — Wafa Smart Tech only.
   ------------------------------------------------------------------ */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(__dirname, "src");
const S = require(path.join(SRC, "data", "site.js"));

const BASE = S.brand.url;
const BRAND = S.brand.name;
const TM = BRAND + '<sup class="tm">™</sup>';
const WA = "https://wa.me/" + S.contact.whatsapp;
const NOW = "2026-11-01";

const esc = s => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const attr = s => esc(s).replace(/'/g, "&#039;");
const money = n => "PKR " + Number(n).toLocaleString("en-US");
const waLink = (msg, cls, label) =>
  `<a class="${cls}" href="${WA}" target="_blank" rel="noopener" data-wa-msg="${attr(msg)}">${label}</a>`;

/* our own artwork lives in /assets/img — nothing from the cloned storefront */
function pic(name, w, alt, size, opts) {
  const o = opts || {};
  const widths = [160, 320, 480, 640, 880].filter(x => x <= w);
  const ss = widths.map(x => `/assets/img/${name}-${x}.webp ${x}w`).join(", ");
  return `<img src="/assets/img/${name}-${w}.webp" srcset="${ss}" sizes="${attr(o.sizes || size || "(max-width:700px) 82vw, 420px")}"` +
    ` alt="${attr(alt)}" width="${w}" height="${w}" loading="${o.eager ? "eager" : "lazy"}" decoding="async">`;
}

/* wide art (band + charter backdrops) uses its own 16:9 ladder */
function picW(name, alt, widths, ratio, opts) {
  const o = opts || {};
  const last = widths[widths.length - 1];
  const ss = widths.map(x => `/assets/img/${name}-${x}.webp ${x}w`).join(", ");
  return `<img src="/assets/img/${name}-${last}.webp" srcset="${ss}" sizes="100vw"` +
    ` alt="${attr(alt)}" width="${last}" height="${Math.round(last / ratio)}"` +
    ` loading="${o.eager ? "eager" : "lazy"}" decoding="async">`;
}

/* Font Awesome names that exist in the shipped icon subset */
const FA = {
  bot: "fa-robot", wave: "fa-volume-high", desk: "fa-table-cells-large", code: "fa-code",
  plane: "fa-map-location-dot", hotel: "fa-house-chimney", cap: "fa-graduation-cap",
  cross: "fa-stethoscope", home: "fa-building-columns", layers: "fa-layer-group",
  brief: "fa-briefcase", gear: "fa-gear", droid: "fa-mobile-screen-button", apple: "fa-apple",
  desktop: "fa-server", wa: "fa-whatsapp", pen: "fa-pen-nib", bowl: "fa-utensils",
  cart: "fa-cart-shopping", play: "fa-play", heart: "fa-hand-holding-heart",
  shield: "fa-shield-halved", spark: "fa-wand-magic-sparkles", brain: "fa-network-wired",
  chart: "fa-chart-line", infinity: "fa-rotate", phone: "fa-phone", check: "fa-check",
  circle: "fa-circle-check", image: "fa-image", calculator: "fa-calculator", mail: "fa-envelope",
  book: "fa-file-lines", crown: "fa-certificate",
  pin: "fa-location-dot", mic: "fa-microphone", rec: "fa-headset", gift: "fa-gift",
  lock: "fa-lock", globe: "fa-globe", design: "fa-palette", speed: "fa-gauge-high",
  tool: "fa-toolbox", file: "fa-file-pdf", qr: "fa-qrcode", key: "fa-key", star: "fa-star"
};
function fab(name, extra) {
  const n = FA[name] || "fa-check";
  const solid = ["fa-whatsapp", "fa-apple", "fa-google", "fa-instagram", "fa-facebook-f"].indexOf(n) > -1;
  return `<i class="fa-${solid ? "brands" : "solid"} ${n}${extra ? " " + extra : ""}" aria-hidden="true"></i>`;
}

const svc = slug => S.services.find(x => x.slug === slug);
const PAGE = {};
fs.readdirSync(path.join(ROOT, "dist")).forEach(f => { if (/^[a-z0-9-]+\.html$/.test(f)) PAGE[f.replace(/\.html$/, "")] = 1; });
const href = p => p === "index.html" ? BASE + "/" : BASE + "/" + p;

/* ---------------------------------------------------------------- cities */
const CITIES = [
  {
    country: "Pakistan", flag: "🇵🇰", note: "On-site meetings in Lahore, remote everywhere.",
    list: [
      ["Lahore", "web-development-lahore"], ["Karachi", "web-development-karachi"],
      ["Islamabad", "web-development-islamabad"], ["Rawalpindi", "web-development-rawalpindi"],
      ["Faisalabad", "web-development-faisalabad"], ["Multan", "web-development-multan"],
      ["Gujranwala", null], ["Sialkot", null], ["Bahawalpur", null], ["Sahiwal", null],
      ["Hyderabad", null], ["Peshawar", null], ["Quetta", null], ["Abbottabad", null],
      ["Mardan", null], ["Jhelum", null], ["Gujrat", null], ["Kasur", null]
    ]
  },
  {
    country: "Saudi Arabia", flag: "🇸🇦", note: "ZATCA-registered · Arabic UI & e-invoicing.",
    list: [
      ["Riyadh", null], ["Jeddah", null], ["Makkah", null], ["Madinah", null],
      ["Dammam", null], ["Al Khobar", null], ["Taif", null], ["Abha", null],
      ["Najran", null], ["Tabuk", null], ["Hail", null], ["Buraidah", null],
      ["Saudi Arabia — all regions", "website-design-saudi-arabia"]
    ]
  },
  {
    country: "United Arab Emirates", flag: "🇦🇪", note: "Remote-first builds, AED invoicing on request.",
    list: [
      ["Dubai", "web-development-dubai"], ["Sharjah", null], ["Abu Dhabi", null],
      ["Ajman", null], ["Ras Al Khaimah", null], ["Fujairah", null], ["Umm Al Quwain", null]
    ]
  }
];

/* ------------------------------------------------------------------ head */
const TITLE = "Wafa Smart Tech — Websites, AI Agents & Apps";
const DESC = "Lahore software house: websites from PKR 14,000, AI agents, Android & iOS apps. 3 free demo designs, free domain, source code yours.";

function head() {
  const ldOrg = {
    "@context": "https://schema.org", "@type": "ProfessionalService", "@id": BASE + "/#business",
    name: BRAND, url: BASE + "/", telephone: S.contact.phoneRaw, email: S.contact.email,
    image: BASE + "/assets/img/og-cover.jpg", logo: BASE + "/assets/img/logo.png",
    description: S.brand.tagline, foundingDate: S.brand.founded, priceRange: "PKR 5,000-35,000",
    address: { "@type": "PostalAddress", addressLocality: "Lahore", addressRegion: "Punjab", addressCountry: "PK" },
    hasCredential: S.trustBadges.map(b => `${b.label} — ${b.sub}`),
    knowsAbout: [...S.services.map(x => x.name), "AWS cloud", "Google Cloud", "ZATCA-compliant software (KSA)"],
    areaServed: ["Lahore", "Punjab", "Pakistan", "Saudi Arabia", "United Arab Emirates"],
    sameAs: [BASE]
  };
  const ldSite = {
    "@context": "https://schema.org", "@type": "WebSite", name: BRAND, url: BASE + "/",
    inLanguage: ["en", "ur"], publisher: { "@id": BASE + "/#business" }
  };
  const ldFaq = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: S.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  };
  const ldCrumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE + "/" },
      { "@type": "ListItem", position: 2, name: "Services", item: href("services.html") },
      { "@type": "ListItem", position: 3, name: "Free tools", item: BASE + "/tools" }
    ]
  };
  const ld = x => `<script type="application/ld+json">${JSON.stringify(x).replace(/</g, "\\u003c")}</script>`;
  const svcLd = {
    "@context": "https://schema.org", "@type": "ItemList", itemListElement: S.services.map((s, i) => ({
      "@type": "ListItem", position: i + 1, name: s.name, url: href(s.slug + ".html")
    }))
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(TITLE)}</title>
<meta name="description" content="${attr(DESC)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0b2218">
<link rel="canonical" href="${BASE}/">
<link rel="alternate" hreflang="en" href="${BASE}/">
<link rel="alternate" hreflang="x-default" href="${BASE}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${attr(BRAND)}">
<meta property="og:locale" content="en_PK">
<meta property="og:title" content="${attr(TITLE)}">
<meta property="og:description" content="${attr(DESC)}">
<meta property="og:url" content="${BASE}/">
<meta property="og:image" content="${BASE}/assets/img/og-cover.jpg">
<meta property="og:image:alt" content="${attr(BRAND)} — 3D websites, AI agents and apps">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(TITLE)}">
<meta name="twitter:description" content="${attr(DESC)}">
<meta name="twitter:image" content="${BASE}/assets/img/og-cover.jpg">
<meta name="author" content="${attr(BRAND)}, Lahore">
<meta name="format-detection" content="telephone=no">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32">
<link rel="icon" href="/assets/img/favicon-16.png" sizes="16x16">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/inter-latin-567244.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/ebgaramond-latin-143e88.woff2" crossorigin>
<link rel="preload" as="image" href="/assets/img/service-website-480.webp" fetchpriority="high">
<link rel="stylesheet" href="/assets/css/home.css">
${ld(ldOrg)}${ld(ldSite)}${ld(ldFaq)}${ld(ldCrumbs)}${ld(svcLd)}
<script>document.documentElement.classList.add("js");</script>
</head>`;
}

/* ---------------------------------------------------------------- header */
const MEGA = [
  {
    head: ["Websites & brands", "code", "website-design"], cols: [
      ["Business Website", "website-design"], ["Travel & Umrah", "travel-agency"],
      ["Hotel & Resort", "hotel-website"], ["School & Admissions", "school-website"],
      ["Hospital & Clinic", "hospital-website"], ["Restaurant & Delivery", "food-restaurant"],
      ["Masjid & Islamic Centre", "mosque-website"], ["Import–Export & Trading", "import-export"]
    ]
  },
  {
    head: ["Stores & portals", "cart", "ecommerce-store"], cols: [
      ["E-commerce Store", "ecommerce-store"], ["Property Portal", "property-portal"],
      ["Job & Earning Portal", "job-portal"], ["Online Courses (LMS)", "lms-platform"],
      ["Donation & Zakat", "donation-platform"], ["Courier & Logistics", "courier-logistics"],
      ["Pharmacy & Medical Store", "pharmacy-store"], ["Law Firm & Consulting", "law-firm"]
    ]
  },
  {
    head: ["Booking & AI", "bot", "ai-agents"], cols: [
      ["Salon & Spa Booking", "salon-booking"], ["Gym & Fitness Studio", "gym-fitness"],
      ["Car Dealer & Rental", "car-dealer"], ["Event & Wedding", "event-wedding"],
      ["Shaadi Hall & Banquet", "banquet-hall"], ["AI Agents", "ai-agents"],
      ["Voice AI Agents", "voice-agents"], ["AI Receptionist", "ai-receptionist"],
      ["WhatsApp Chatbot", "whatsapp-bot"]
    ]
  },
  {
    head: ["Apps & systems", "droid", "android-app"], cols: [
      ["Android Apps", "android-app"], ["iOS Apps", "ios-app"],
      ["Windows Software", "windows-app"], ["Management System / ERP", "management-system"],
      ["Website Admin Panel", "website-management"], ["POS & Billing Software", "pos-billing"],
      ["CV, Logo & Brand", "design-studio"]
    ]
  },
  {
    head: ["Company", "brief", "about"], cols: [
      ["Pricing & rate card", "pricing"], ["Our work", "portfolio"],
      ["Hacked? Recovery", "recovery"], ["Free tools", null],
      ["About us", "about"], ["Blog", "blog"], ["Contact", "contact"]
    ]
  }
];
const NAVLINKS = [["pricing", "Pricing"], ["portfolio", "Our work"], ["recovery", "Recovery"], ["blog", "Blog"], ["about", "About"], ["contact", "Contact"]];
const HEADER_LINKS = NAVLINKS.filter(l => l[0] !== "about");

function headerBlock() {
  const megaCols = MEGA.map(g => `<div class="mega-col">
      <a class="mega-head" href="${href(g.head[2] + ".html")}">${fab(g.head[1])} ${esc(g.head[0])}</a>
      ${g.cols.map(c => c[1] ? `<a class="mega-sub" href="${href(c[1] + ".html")}">${esc(c[0])}</a>`
        : `<a class="mega-sub" href="/tools">${esc(c[0])}<small>Free</small></a>`).join("")}
    </div>`).join("");

  return `<div class="announce" id="announce"> <div class="announce-inner"> <p> ${fab("spark")}
 <span>3 free demo designs before we build · fixed rates from PKR 14,000 · domain free for one year</span> </p>
 <button class="announce-close" type="button" data-announce-close aria-label="Dismiss announcement">
 <i class="fa-solid fa-xmark" aria-hidden="true"></i> </button> </div> </div>
<script>(function(b){try{if(sessionStorage.getItem("wst.announce.hidden")==="1"){b.parentNode.removeChild(b);return;}}catch(e){}document.documentElement.style.setProperty("--announce-h",b.offsetHeight+"px");})(document.getElementById("announce"));</script>
<header class="header" id="header"> <div class="wrap wrap-wide header-inner">
 <a class="brand" href="/" aria-label="${attr(BRAND)} home">
  <img src="/assets/img/logo.webp" alt="" width="40" height="40">
  <span class="brand-word">${esc(BRAND)}<sup class="tm">™</sup></span>
 </a>
 <nav class="nav" aria-label="Primary">
  <div class="mega-wrap">
   <button type="button" class="mega-btn" data-mega aria-expanded="false" aria-controls="megaMenu">Services <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
   <div class="mega" id="megaMenu" hidden><div class="mega-grid">${megaCols}</div></div>
  </div>
  ${HEADER_LINKS.map(l => `<a href="${href(l[0] + ".html")}">${esc(l[1])}</a>`).join("")}
  <a href="/tools">Free Tools<small class="st st-live">43</small></a>
 </nav>
 <div class="header-tools">
  ${waLink("Assalam o Alaikum! Mujhe free demo designs chahiye.", "icon-btn", fab("wa", "on-dark"))}
  <button class="icon-btn burger" type="button" data-open-mnav aria-label="Open menu" aria-expanded="false" aria-controls="mnav">
   <i class="fa-solid fa-bars-staggered" aria-hidden="true"></i> </button>
 </div>
</div> </header>
<div class="mnav" id="mnav" hidden> <div class="mnav-panel" role="dialog" aria-label="Menu" aria-modal="true">
 <div class="mnav-top"> <span class="brand-word">${esc(BRAND)}<sup class="tm">™</sup></span>
  <button class="icon-btn" type="button" data-close-mnav aria-label="Close menu"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button> </div>
 ${MEGA.map(g => `<a class="mnav-link" href="${href(g.head[2] + ".html")}">${fab(g.head[1], "f-i")} ${esc(g.head[0])}</a>`).join("")}
 <p class="mnav-k">Company</p>
 ${NAVLINKS.map(l => `<a class="mnav-link" href="${href(l[0] + ".html")}">${esc(l[1])}</a>`).join("")}
 <p class="mnav-k">Free tools — no sign-up, nothing uploaded</p>
 <div class="mnav-biz">
  <a href="/tools"><i class="fa-solid fa-toolbox" aria-hidden="true"></i><b>All tools</b><small>43 browser tools</small></a>
  <a href="/tools/pdf-tools"><i class="fa-solid fa-file-pdf" aria-hidden="true"></i><b>PDF tools</b><small>Merge · split · compress</small></a>
  <a href="/tools/image-tools"><i class="fa-solid fa-image" aria-hidden="true"></i><b>Image tools</b><small>Resize · convert</small></a>
  <a href="/tools/calculator-tools"><i class="fa-solid fa-calculator" aria-hidden="true"></i><b>Calculators</b><small>Zakat · EMI · age</small></a>
 </div>
 <p class="mnav-k">Talk to a developer</p>
 ${waLink("Assalam o Alaikum! Mujhe apne project ke baare me baat karni hai.", "mnav-link", `<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp ${esc(S.contact.whatsappDisplay)}`)}
 <a class="mnav-link" href="mailto:${S.contact.email}"><i class="fa-solid fa-envelope" aria-hidden="true"></i> ${esc(S.contact.email)}</a>
</div> </div>`;
}

/* --------------------------------------------------------------- the cube */
const FACES = [
  { s: svc("website-design"), ic: "code", alt: "3D website preview" },
  { s: svc("ai-agents"), ic: "bot", alt: "3D AI agent preview" },
  { s: svc("android-app"), ic: "droid", alt: "3D mobile app preview" },
  { s: S.recovery[0], ic: "shield", alt: "Website security recovery preview", red: 1 }
];

function cubeBlock() {
  const faces = FACES.map((f, i) => {
    const o = f.s;
    return `<div class="face"${i ? " inert" : ""}>
        <div class="f-media${f.red ? " red" : ""}">
          ${pic(o.img, 640, f.alt, "(max-width:520px) 66vw, 330px", { eager: i === 0 ? 1 : 0 })}
          <span class="f-media-ic">${fab(f.ic)}</span>
        </div>
        <div class="f-body">
          <span class="f-price">${esc(money(o.price))}</span>
          <h2 class="f-title">${esc(o.name)}</h2>
          <p class="f-desc">${esc(o.short)}</p>
          <div class="f-actions">
            ${waLink(`Assalam o Alaikum! Mujhe *${o.name}* chahiye — ${money(o.price)} fixed + 3 free demos.`, "btn f-order", "Order Now")}
            <a class="btn f-quote" href="${href(o.slug + ".html")}">Details</a>
          </div>
        </div>
      </div>`;
  }).join("\n      ");
  const dots = FACES.map((f, i) => `<button type="button" class="cube-dot" aria-pressed="${i ? "false" : "true"}" aria-label="${attr(f.s.name)}"><i></i></button>`).join("");

  return `<div class="wst-cube-root">
      <div class="cube-stage" id="cubeStage" role="group" aria-label="Rotating service cube — swipe or use the dots">
        <div class="cube" id="cube">
      ${faces}
        </div>
        <div class="cube-top" aria-hidden="true">${esc(BRAND)}</div>
        <div class="cube-bottom" aria-hidden="true">EST. ${esc(S.brand.founded)}</div>
      </div>
      <div class="cube-dots">${dots}</div>
      <p class="cube-hint">Swipe · tap a dot — <span id="cube-live" aria-live="polite">${esc(FACES[0].s.name)} — ${esc(money(FACES[0].s.price))}</span></p>
    </div>`;
}

/* ------------------------------------------------------------------ hero */
function hero() {
  const st = S.stats.map(x => `<li><b data-count="${x.n}" data-suffix="${attr(x.suffix)}">0</b><span>${esc(x.label)}</span></li>`).join("");
  const guar = S.guarantees.map(g => `<li>${fab(g[0])}<span><b>${esc(g[1])}</b> — ${esc(g[2])}</span></li>`).join("");
  return `<section class="section eco-dark signature is-hero" id="top">
  <div class="wrap wrap-wide lh-grid">
    <div class="lh-copy">
      <span class="eyebrow" data-reveal>${esc(S.hero.eyebrow)}</span>
      <h1 class="split-words" data-reveal data-split>Websites, AI agents &amp; apps. <em>Fixed rates.</em></h1>
      <p class="lead" data-reveal>${esc(S.hero.sub)}</p>
      <ul class="sig-list" data-reveal>${guar}</ul>
      <div class="eh-cta" data-reveal>
        ${waLink("Assalam o Alaikum! Mujhe free demo designs chahiye — 3 demos aur fixed rate card bhejein.", "btn btn-gold btn-lg", fab("spark") + " Get Free Demo")}
        <a class="btn btn-ghost on-dark btn-lg" href="${href("services.html")}">All ${S.services.length} services</a>
      </div>
      <ul class="eh-stats" data-reveal>${st}</ul>
      <p class="roman" data-reveal>${esc(S.hero.ur)}</p>
    </div>
    ${cubeBlock()}
  </div>
</section>`;
}

/* ----------------------------------------------------------------- ribbon */
function ribbon() {
  const items = [
    ["crown", `${BRAND}™ software house, Lahore`], ["shield", "AWS Certified team"],
    ["spark", "Google Certified"], ["brief", "Engr. Jamshaid · IT Ministry, Govt. of Pakistan"],
    ["layers", "Registered in Saudi Arabia (ZATCA)"], ["check", "Fixed rates from PKR 14,000"],
    ["gift", "Domain FREE for 1 year"], ["key", "100% source code handover"],
    ["phone", "WhatsApp 0324 6627054"], ["toolbox", "43 free browser tools"]
  ];
  const group = `<div class="marquee-group"> ${items.map(i =>
    `<span class="marquee-item">${fab(i[0])} ${esc(i[1])}</span><span class="marquee-dot"></span>`).join("")} </div>`;
  return `<div class="ribbon eco-ribbon" aria-label="Why businesses pick ${attr(BRAND)}">
  <div class="marquee">${group}<div class="marquee-group" aria-hidden="true">${items.map(i =>
    `<span class="marquee-item">${fab(i[0])} ${esc(i[1])}</span><span class="marquee-dot"></span>`).join("")}</div></div>
</div>`;
}

/* ------------------------------------------------------------ credentials */
function credentials() {
  const seals = S.trustBadges.map((b, i) => `<a class="cs-cert" href="${href("about.html")}" style="--i:${i}" data-reveal>
    <span class="cs-seal">${fab(b.icon)}</span>
    <span class="cs-txt"><b>${esc(b.label)}</b><small>${esc(b.sub)}</small></span></a>`).join("");
  const extra = [
    ["chart", `${S.stats[0].n}${S.stats[0].suffix} projects delivered`, "Lahore · Karachi · KSA · UAE"],
    ["tool", "43 free browser tools", "no sign-up, nothing uploaded"]
  ].map((b, i) => `<a class="cs-cert" href="${href("about.html")}" style="--i:${S.trustBadges.length + i}" data-reveal>
    <span class="cs-seal">${fab(b[0])}</span>
    <span class="cs-txt"><b>${esc(b[1])}</b><small>${esc(b[2])}</small></span></a>`).join("");

  return `<section class="cert-strip cs-charter has-bg" id="credentials" aria-label="Credentials and registrations">
  <div class="cs-bg" aria-hidden="true">${picW("about-team", "", [800, 1280, 1600], 1672 / 941)}</div>
  <div class="wrap wrap-wide">
    <div class="cs-head">
      <span class="eyebrow" data-reveal>${fab("shield")} ${esc(BRAND)} charter</span>
      <h2 data-reveal>The people <em>behind every build</em></h2>
      <p data-reveal>Seven facts you can verify before you pay a rupee — certificates, registrations and the engineer who signs off your project.</p>
    </div>
    <div class="cs-row" data-drag>${seals}${extra}</div>
  </div>
</section>`;
}

/* ------------------------------------------------------------- new verticals */
const NEWBAND = ["salon-booking", "gym-fitness", "car-dealer", "event-wedding", "banquet-hall",
  "courier-logistics", "pharmacy-store", "mosque-website", "import-export", "law-firm"];

function seasonBand() {
  const cards = NEWBAND.map(slug => {
    const s = svc(slug);
    return `<a class="sb-card" href="${href(s.slug + ".html")}" data-reveal>
      <span class="sb-img">${pic(s.img, 480, s.name + " — 3D artwork", "(max-width:700px) 46vw, 200px")}</span>
      <span class="sb-body"><b>${esc(s.name.split("(")[0].trim())}</b><small>${esc(s.short)}</small><em>${money(s.price)} fixed</em></span></a>`;
  }).join("");

  return `<section class="season-band" id="rate" aria-label="One fixed rate for every website">
  <div class="sb-media" aria-hidden="true">${picW("home-season", "", [320, 640, 960, 1280, 1600], 1792 / 1024, { eager: 1 })}</div>
  <div class="sb-shade" aria-hidden="true"></div>
  <div class="wrap wrap-wide sb-inner">
    <div class="sb-copy">
      <span class="eyebrow" data-reveal>${fab("spark")} Now building · PKR 14,000 flat</span>
      <h2 data-reveal>Every kind of website. <em>One published rate.</em></h2>
      <p class="lead" data-reveal>Salon, gym, car dealer, shaadi hall, event, courier, pharmacy, masjid, import–export or law firm — each ships with three demo designs, a free domain for one year, WhatsApp ordering and the full source code. No quote roulette.</p>
      <ul class="sb-facts" data-reveal>
        <li><b>${S.services.length}</b><span>services listed</span></li>
        <li><b>14,000</b><span>PKR · every website</span></li>
        <li><b>4–10</b><span>days to launch</span></li>
      </ul>
      <div class="eh-cta" data-reveal>
        ${waLink("Assalam o Alaikum! Mujhe PKR 14,000 wali website chahiye — 3 demo designs bhej dein.", "btn btn-gold btn-lg", fab("wa") + " Order on WhatsApp")}
        <a class="btn btn-ghost on-dark btn-lg" href="${href("services.html")}">All ${S.services.length} services</a>
      </div>
    </div>
    <div class="sb-men">
      <div class="sb-men-head">
        <div><span class="eyebrow">Fresh on the rate card</span><h3>Ten new verticals, <em>same fixed rate</em></h3></div>
        <a class="link-gold" href="${href("services.html")}">All services <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
      </div>
      <div class="sb-rail sb-men-rail" data-drag aria-label="New website verticals at PKR 14,000">${cards}</div>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------ quick rail */
const QUICK = [
  ["website-design", "Websites"], ["ai-agents", "AI Agents"], ["voice-agents", "Voice AI"],
  ["ai-receptionist", "Receptionist"], ["android-app", "Android"], ["ios-app", "iOS"],
  ["ecommerce-store", "Online store"], ["management-system", "ERP"],
  ["whatsapp-bot", "WA bot"], ["design-studio", "Design"], ["recovery", "Recovery"],
  [null, "Free Tools"], [null, "Pricing"]
];
function quickRail() {
  const cells = QUICK.map(q => {
    if (q[0]) { const o = q[0] === "recovery" ? S.recovery[0] : svc(q[0]); return `<a class="qc" href="${href(o.slug + ".html")}">
        <span class="qc-img">${pic(o.img, 160, o.name, "82px")}</span><b>${esc(q[1])}</b></a>`; }
    const to = q[1] === "Pricing" ? "pricing" : null;
    const img = q[1] === "Pricing" ? "service-design" : "service-cms";
    return `<a class="qc" href="${to ? href(to + ".html") : "/tools"}">
        <span class="qc-img contain">${pic(img, 160, q[1], "82px")}<em>Free</em></span><b>${esc(q[1])}</b></a>`;
  }).join("");
  return `<section class="qc-sec eco-light" id="quick" aria-label="Popular services">
  <div class="wrap wrap-wide">
    <div class="rail-head"><div><span class="eyebrow" data-reveal>Pick your lane</span>
      <h2 data-reveal>What do you need <em>built?</em></h2></div>
      <a class="btn btn-dark" href="${href("services.html")}" data-reveal>${fab("tool")} All services</a></div>
    <div class="qc-rail" data-drag>${cells}</div>
  </div>
</section>`;
}

/* -------------------------------------------------------------- services */
function services() {
  const cards = S.services.map((s, i) => `<a class="p-card" href="${href(s.slug + ".html")}" data-reveal style="--reveal-delay:${Math.min(i % 4, 3) * 70}ms">
      <span class="p-img">${pic(s.img, 480, s.name, "(max-width:700px) 46vw, 22vw")}</span>
      <span class="p-body">
        <small class="p-brand">${esc(BRAND)}</small>
        <b class="p-name">${esc(s.name)}</b>
        <span class="p-short">${esc(s.short)}</span>
        <span class="p-price">${esc(money(s.price))} <em>${esc(s.days)} days</em></span>
      </span>
    </a>`).join("");
  const urdu = S.services.slice(0, 8).map(s => `<a class="chip" href="${href(s.slug + ".html")}">${esc(s.nameUr)}</a>`).join("");
  return `<section class="section eco-stone" id="services">
  <div class="wrap wrap-wide">
    <div class="section-head">
      <span class="eyebrow center" data-reveal>The rate card</span>
      <h2 class="split-words" data-reveal data-split>${S.services.length} services. <em>One published price list.</em></h2>
      <p class="lead" data-reveal>No 300K quotes and no 5K junk. Every build below is a fixed product price — written quote, delivery date, 3 demo designs first, source code yours.</p>
    </div>
    <div class="p-grid">${cards}</div>
    <p class="chips-row" data-reveal>${urdu}</p>
    <div class="eh-cta center-cta" data-reveal>
      ${waLink(`Assalam o Alaikum! Mujhe *${S.services[0].name}* chahiye — ${money(S.services[0].price)} fixed.`, "btn btn-gold", fab("wa") + " Order on WhatsApp")}
      <a class="btn btn-ghost" href="${href("pricing.html")}">Packages &amp; add-ons</a>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ doors */
function doors() {
  const d = S.whyUs.map((w, i) => `<a class="e55-door" href="${href("services.html")}" data-reveal style="--reveal-delay:${i * 60}ms">
      ${fab(w.icon)}<b>${esc(w.t)}</b><small>${esc(w.u)}</small><span>${esc(w.d)}</span>
      <em>More <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></em></a>`).join("");
  return `<section class="section eco-dark" id="why" aria-label="Why ${attr(BRAND)}">
  <div class="wrap wrap-wide">
    <div class="e55-head">
      <span class="eyebrow center" data-reveal>Why ${attr(BRAND)}</span>
      <h2 data-reveal>One team. <em>Every door open.</em></h2>
      <p class="lead" data-reveal>Six reasons Lahore, Riyadh and Dubai businesses hand us their builds — and keep coming back.</p>
    </div>
    <div class="e55-grid">${d}</div>
  </div>
</section>`;
}

/* --------------------------------------------------------------- packages */
function packages() {
  const imgFor = [svc("website-design"), svc("management-system"), svc("ai-agents"), svc("android-app"), svc("ios-app")];
  const cards = S.packages.map((p, i) => `<article class="bundle-card${p.pop ? " best" : ""}" data-reveal>
      <span class="bc-img"><span class="fit" style="--fit:url('/assets/img/${imgFor[i].img}-320.webp')">${pic(imgFor[i].img, 480, p.n, "(max-width:700px) 100vw, 44vw")}</span></span>
      <span class="bc-body">
        <b>${esc(p.n)}</b><small>${esc(p.desc)}</small>
        <span class="p-price">${esc(money(p.price))} <em>${esc(p.tag)}</em></span>
        <span class="bc-items">${p.items.map(x => `<span class="chip">${esc(x[0])}</span>`).join("")}</span>
        ${waLink(`Assalam o Alaikum! *${p.n}* package chahiye — ${money(p.price)} fixed.`, "btn btn-gold", fab("wa") + " Get this package")}
      </span>
    </article>`).join("");
  const add = S.addons.map(a => `<li><span>${esc(a[0])}</span><b>${esc("PKR " + a[1])}</b></li>`).join("");
  return `<section class="section eco-light" id="pricing">
  <div class="wrap wrap-wide">
    <div class="section-head">
      <span class="eyebrow center" data-reveal>Fixed packages</span>
      <h2 class="split-words" data-reveal data-split>Five tiers. <em>No surprise invoices.</em></h2>
      <p class="lead" data-reveal>Pick a tier and you know the number before we open a laptop. 50% advance, 50% at delivery — JazzCash, EasyPaisa, bank or cash at the office.</p>
    </div>
    <div class="bundle-grid">${cards}</div>
    <div class="addon-wrap">
      <h3 data-reveal>Add-ons — bolt any of these onto a build</h3>
      <ul class="hc-list" data-reveal>${add}</ul>
    </div>
  </div>
</section>`;
}

/* -------------------------------------------------------------- portfolio */
function portfolio() {
  const cards = S.portfolio.map(p => `<a class="j-card" href="${href("portfolio.html")}" data-reveal>
      <span class="j-img"><span class="fit" style="--fit:url('/assets/img/${p.img}-320.webp')">${pic(p.img, 480, p.t, "(max-width:700px) 84vw, 30vw")}</span></span>
      <span class="j-body"><small>${esc(p.tags.join(" · "))}</small><b>${esc(p.t)}</b><span>${esc(p.r)}</span></span>
    </a>`).join("");
  return `<section class="section eco-stone" id="work">
  <div class="wrap wrap-wide">
    <div class="rail-head"><div><span class="eyebrow" data-reveal>Shipped &amp; live</span>
      <h2 class="split-words" data-reveal data-split>Twelve builds, <em>real numbers.</em></h2>
      <p class="lead" data-reveal>Websites, portals, ERPs, apps and AI agents — delivered at the fixed price on the tin.</p></div>
      <span class="rail-acts"><a class="btn btn-ghost" href="/demos.html" data-reveal>Open live demos</a>
      <a class="btn btn-dark" href="${href("portfolio.html")}" data-reveal>Full case studies</a></span></div>
    <div class="journal-grid">${cards}</div>
  </div>
</section>`;
}

/* ------------------------------------------------------------ say + process */
function sayAndProcess() {
  const cards = S.testimonials.concat(S.testimonials).map(t => `<figure class="rv-card">
      <span class="rv-stars">${"★".repeat(t.s)}<i>${"★".repeat(5 - t.s)}</i></span>
      <h4>${esc(t.r)}</h4>
      <blockquote>${esc(t.qEn)}</blockquote>
      <figcaption>${esc(t.n)} ${fab("circle", "verified")}<span class="sr-only">Verified client</span></figcaption>
    </figure>`).join("");
  const steps = S.process.map((p, i) => `<li data-reveal style="--reveal-delay:${i * 60}ms"><b>${esc(p.t)}</b><span>${esc(p.d)}</span></li>`).join("");
  return `<section class="section eco-light" id="reviews" aria-label="Client reviews">
  <div class="wrap wrap-wide">
    <div class="section-head"><span class="eyebrow center" data-reveal>Clients</span>
      <h2 class="split-words" data-reveal data-split>What they say <em>after launch.</em></h2>
      <p class="lead" data-reveal>Every quote below is from a client we still support. Urdu first, English below — same promise either way.</p></div>
  </div>
  <div class="rv-loop" aria-label="Client review cards"><div class="rv-track">${cards}</div></div>
  <div class="wrap wrap-wide">
    <div class="section-head"><span class="eyebrow center" data-reveal>How it works</span>
      <h2 data-reveal>From first message <em>to live build.</em></h2></div>
    <ul class="how-steps">${steps}</ul>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ tools */
function toolsBand() {
  const t = [
    ["/tools", "tool", "43 free browser tools", "PDF, image, calculator and text tools — open a page, use it, no sign-up.", 1],
    ["/tools/pdf-tools", "file", "PDF tools", "Merge, split, compress, watermark, extract and convert — files never leave your device.", 0],
    ["/tools/image-tools", "image", "Image tools", "Compress to 50 KB, resize, crop, rotate, HEIC to JPG, image to PDF, passport photos.", 0],
    ["/tools/calculator-tools", "calculator", "Calculators", "Zakat, khums, EMI, salary tax, BMI, age, calories, building material and more.", 0]
  ].map(x => `<a class="bb-card${x[4] ? " bb-feature" : ""}" href="${x[0]}" data-reveal>
      <span class="bb-body">${fab(x[1])}<b>${esc(x[2])}</b><small>${esc(x[3])}</small>
      <em>Open <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></em></span></a>`).join("");
  const soon = `<a class="bb-card" href="/tools/text-tools" data-reveal>
      <span class="bb-body">${fab("code")}<b>Text &amp; utilities</b><small>Case converter, JSON formatter, lorem ipsum, base64, password generator — plus the internet speed test.</small>
      <em>Open <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></em></span></a>`;
  return `<section class="section eco-stone biz-band" id="tools" aria-label="${attr(BRAND)} free tools">
  <div class="wrap wrap-wide">
    <div class="rail-head"><div><span class="eyebrow" data-reveal>Free forever · no sign-up</span>
      <h2 data-reveal>${esc(BRAND)} <em>at work</em></h2>
      <p class="lead" data-reveal>The same engineering team that builds your site publishes its tools for everyone. Everything runs in your browser — no uploads, no server storage, no account.</p></div>
      <a class="btn btn-dark" href="/tools" data-reveal>${fab("tool")} All free tools</a></div>
    <div class="biz-band-grid">${t}${soon}</div>
  </div>
</section>`;
}

/* ----------------------------------------------------------------- cities */
function cities() {
  const cols = CITIES.map(c => `<div class="cg" data-reveal>
      <h3><i aria-hidden="true">${c.flag}</i> ${esc(c.country)}</h3>
      <p class="cg-note">${esc(c.note)}</p>
      <ul class="cg-list">${c.list.map(x => x[1] && PAGE[x[1]]
        ? `<li><a href="${href(x[1] + ".html")}">${esc(x[0])}</a></li>`
        : `<li><span>${esc(x[0])}</span></li>`).join("")}</ul>
    </div>`).join("");
  const badges = S.trustBadges.map(b => `<div class="tb" data-reveal>${fab(b.icon)}<b>${esc(b.label)}</b><small>${esc(b.sub)}</small></div>`).join("");
  return `<section class="section eco-emerald export-band" id="areas" aria-label="Cities we serve">
  <div class="wrap wrap-wide">
    <div class="section-head"><span class="eyebrow center" data-reveal>Where we build</span>
      <h2 class="split-words" data-reveal data-split>Pakistan, Saudi Arabia <em>&amp; the UAE.</em></h2>
      <p class="lead" data-reveal>Office on Lahore–Sharqpur Road; clients from Karachi to Riyadh. WhatsApp-first, so distance never shows up on the invoice.</p></div>
    <div class="city-grid">${cols}</div>
    <div class="trust-badges city-badges">${badges}</div>
    <div class="eh-cta center-cta" data-reveal>
      ${waLink("Assalam o Alaikum! Main " + CITIES[0].list[6][0] + " se hoon — mera project hai.", "btn btn-gold btn-lg", fab("wa") + " Your city? Message us")}
      <a class="btn btn-ghost on-dark btn-lg" href="${href("contact.html")}">Address &amp; hours</a>
    </div>
  </div>
</section>`;
}

/* -------------------------------------------------------------------- faq */
function faq() {
  const items = S.faqs.map((f, i) => `<details class="faq-item"${i < 2 ? " open" : ""}>
      <summary class="faq-q">${esc(f.q)}<i class="fa-solid fa-plus" aria-hidden="true"></i></summary>
      <div class="faq-a"><p>${esc(f.a)}</p></div>
    </details>`).join("");
  const recovery = S.recovery.map(r => `<a class="p-card" href="${href(r.slug + ".html")}" data-reveal>
      <span class="p-img">${pic(r.img, 480, r.name, "(max-width:700px) 46vw, 22vw")}</span>
      <span class="p-body"><small class="p-brand">${esc(BRAND)}</small><b class="p-name">${esc(r.name)}</b>
        <span class="p-short">${esc(r.short)}</span>
        <span class="p-price">${esc(money(r.price))} <em>${esc(r.days)} days</em></span></span></a>`).join("");
  return `<section class="section eco-light" id="faq">
  <div class="wrap-narrow wrap">
    <div class="section-head"><span class="eyebrow center" data-reveal>Questions</span>
      <h2 class="split-words" data-reveal data-split>Asked on WhatsApp <em>every week.</em></h2></div>
    <div class="faq">${items}</div>
  </div>
  <div class="wrap wrap-wide">
    <div class="rail-head" style="margin-top:3rem"><div><span class="eyebrow" data-reveal>Emergency</span>
      <h2 data-reveal>Hacked? <em>We fix it today.</em></h2></div></div>
    <div class="p-grid recovery-grid">${recovery}</div>
  </div>
</section>`;
}

/* ----------------------------------------------------------------- finale */
function finale() {
  const links = S.services.slice(0, 6).map(s => `<a class="chip" href="${href(s.slug + ".html")}">${esc(s.name)}</a>`).join("");
  return `<section class="section eco-dark finale eco-finale" id="join">
  <div class="wrap-narrow wrap">
    <span class="eyebrow center" data-reveal>Free consultation</span>
    <h2 class="split-words" data-reveal data-split>Ready? <em>Let's build it.</em></h2>
    <p class="lead" data-reveal>${esc(S.hero.ctaMain)} — 3 complete demo designs of your project before you commit to anything. Fixed price, delivery date, no lock-in.</p>
    <div class="eh-cta center-cta">
      ${waLink("Assalam o Alaikum! Mujhe free demo designs chahiye — 3 demos aur fixed rate card bhejein.", "btn btn-gold btn-lg", fab("wa") + " " + esc(S.hero.ctaWa))}
      <a class="btn btn-ghost on-dark btn-lg" href="${href("contact.html")}">Visit the office</a>
    </div>
    <p class="trust-row" data-reveal>${[["shield", "AWS Certified"], ["spark", "Google Certified"], ["brief", "IT Ministry, Govt. of Pakistan"], ["layers", "ZATCA registered — KSA"], ["check", "160+ projects delivered"]]
      .map(b => `<span>${fab(b[0])}${esc(b[1])}</span>`).join("")}</p>
    <p class="roman" data-reveal>${esc(S.brand.descUr.slice(0, 240))}</p>
    <p class="chips-row" data-reveal>${links}</p>
  </div>
</section>`;
}

/* ----------------------------------------------------------------- footer */
function footer() {
  const cols = [
    ["Builds", S.services.slice(0, 8).map(s => `<a href="${href(s.slug + ".html")}">${esc(s.name)}</a>`).join("")],
    ["Platforms & AI", S.services.slice(8, 16).map(s => `<a href="${href(s.slug + ".html")}">${esc(s.name)}</a>`).join("")],
    ["Free from " + BRAND, [
      `<a href="/tools">All 43 free tools</a>`, `<a href="/tools/pdf-tools">PDF tools</a>`,
      `<a href="/tools/image-tools">Image tools</a>`, `<a href="/tools/calculator-tools">Calculators</a>`,
      `<a href="/tools/text-tools">Text &amp; utilities</a>`, `<a href="/tools/internet-speed-test">Internet speed test</a>`,
      `<a href="/tools/zakat-calculator">Zakat calculator</a>`, `<a href="/tools/building-material-calculator">Building material calculator</a>`
    ].join("")],
    ["Company", [
      `<a href="${href("services.html")}">Services</a>`, `<a href="${href("pricing.html")}">Pricing</a>`,
      `<a href="${href("portfolio.html")}">Our work</a>`, `<a href="${href("about.html")}">About</a>`,
      `<a href="${href("recovery.html")}">Recovery</a>`, `<a href="${href("blog.html")}">Blog</a>`,
      `<a href="${href("contact.html")}">Contact</a>`, `<a href="${href("demo4")}">Free demos</a>`
    ].join("")]
  ];
  const grid = cols.map(c => `<div><h5>${esc(c[0])}</h5><div class="footer-links">${c[1]}</div></div>`).join("");
  return `<footer class="footer">
  <div class="ft-promise"><div class="wrap wrap-wide ft-promise-grid">
    <div class="ft-p">${fab("spark")}<span><b>3 free demo designs</b><small>pick your favourite</small></span></div>
    <div class="ft-p">${fab("brief")}<span><b>Fixed rate card</b><small>from PKR 14,000</small></span></div>
    <div class="ft-p">${fab("gift")}<span><b>Domain FREE</b><small>1 year, on your name</small></span></div>
    <div class="ft-p">${fab("key")}<span><b>Source code yours</b><small>no lock-in, ever</small></span></div>
    <div class="ft-p">${fab("wa")}<span><b>Real developers</b><small>on WhatsApp, daily</small></span></div>
  </div></div>
  <div class="wrap wrap-wide">
    <div class="ft-head">
      <div class="footer-brand">
        <a class="ft-crest" href="/" aria-label="${attr(BRAND)} — ${attr(S.brand.city)}">
          <span class="ft-crest-ring" aria-hidden="true"><img src="/assets/img/logo.webp" alt="" width="64" height="64" loading="lazy"></span>
          <span class="ft-crest-text">
            <span class="ft-crest-house">${esc(S.city || "Lahore")} software house</span>
            <span class="ft-crest-word">${TM}</span>
            <span class="ft-crest-est"><i aria-hidden="true"></i>Est. ${esc(S.brand.founded)}<i aria-hidden="true"></i></span>
          </span>
        </a>
        <p class="footer-note">${esc(BRAND)} builds 3D, SEO-ready websites, AI agents, WhatsApp bots and Android/iOS/Windows apps for businesses in Pakistan, Saudi Arabia and the UAE — at published fixed rates, with the domain free and the source code handed over.</p>
        <div class="socials">
          <a href="https://wa.me/${S.contact.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a>
          <a href="mailto:${S.contact.email}" aria-label="Email"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a>
          <a href="${href("blog.html")}" aria-label="Blog">${fab("book")}</a>
        </div>
      </div>
      <div class="ft-contact">
        <h5>Talk to us</h5>
        <div class="wa-list">
          <a class="wa-item" href="${WA}" target="_blank" rel="noopener">${fab("wa")}<span><b>${esc(S.contact.whatsappDisplay)}</b><small>WhatsApp · fastest reply</small></span></a>
          <a class="wa-item" href="tel:+923246627054">${fab("phone")}<span><b>${esc(S.contact.phoneRaw)}</b><small>${esc(S.contact.hours)}</small></span></a>
          <a class="wa-item" href="mailto:${S.contact.email}"><i class="fa-solid fa-envelope" aria-hidden="true"></i><span><b>${esc(S.contact.email)}</b><small>Quotes &amp; documents</small></span></a>
          <a class="wa-item" href="https://www.google.com/maps/search/?api=1&amp;query=${attr(S.contact.mapQuery)}" target="_blank" rel="noopener">${fab("pin")}<span><b>${esc(S.contact.address)}</b><small>Map &amp; directions</small></span></a>
        </div>
      </div>
    </div>
    <div class="footer-grid">${grid}</div>
    <div class="ft-bottom">
      <p>© ${new Date().getFullYear()} ${TM} — ${esc(BRAND)}, Lahore, Pakistan. Websites, AI agents &amp; apps at fixed rates.</p>
      <p class="ft-legal">No cart, no checkout, no tracking: this page runs on static files only, and our free tools never upload your files.</p>
    </div>
  </div>
</footer>`;
}

/* ------------------------------------------------------------------- page */
const page = `${head()}
<body class="has-hero">
<a class="skip-link sr-only" href="#main">Skip to content</a>
${headerBlock()}
<main id="main">
${hero()}
${credentials()}
${ribbon()}
${quickRail()}
${seasonBand()}
${services()}
${doors()}
${packages()}
${portfolio()}
${sayAndProcess()}
${toolsBand()}
${cities()}
${faq()}
${finale()}
</main>
${footer()}
${waLink("Assalam o Alaikum! Mujhe free demo designs chahiye.", "wa-fab", fab("wa", "fab-i") + "<span>WhatsApp</span>")}
<script src="/assets/js/home.js" defer></script>
</body>
</html>
`;

/* -------------------------------------------------------- CSS: prune + add */
const CUBE_CSS = fs.readFileSync(path.join(SRC, "home", "cube.css"), "utf8");
const EXTRA_CSS = fs.readFileSync(path.join(SRC, "home", "extra.css"), "utf8");

const STATE_CLASSES = ["is-visible", "is-stuck", "is-spinning", "is-offscreen", "is-drag", "is-open",
  "is-active", "is-paused", "is-dragging", "no-scroll", "sw", "open", "on", "best", "moving", "has-bg",
  "is-live", "is-soon", "is-out", "is-new", "is-static", "js", "big-text", "has-hero", "eco-light",
  "eco-dark", "eco-stone", "eco-emerald", "eco-nav", "eco-ribbon", "eco-trust", "eco-grow", "eco-finale",
  "sr-only", "tm", "wrap", "wrap-wide", "wrap-narrow", "section", "lead", "eyebrow", "center", "btn",
  "btn-gold", "btn-dark", "btn-ghost", "btn-lg", "on-dark", "st", "st-live", "st-soon", "mnav", "mnav-panel",
  "fa-solid", "fa-brands", "fa-regular", "fas", "far", "fab"];

const CLS = new Set(STATE_CLASSES);
String(page).replace(/class="([^"]*)"/g, (m, c) => { c.split(/\s+/).forEach(x => { if (x) CLS.add(x); }); return m; });
const IDS = new Set(String(page).match(/\bid="([^"]+)"/g).map(s => s.slice(4, -1)));

function used(sel) {
  const cls = sel.match(/\.[A-Za-z][\w-]*/g) || [];
  const ids = sel.match(/#[\w-]+/g) || [];
  for (const c of cls) if (!CLS.has(c.slice(1))) return 0;
  for (const i of ids) if (!IDS.has(i.slice(1)) && i !== "#business") return 0;
  return 1;
}
const POISON = /url\((["']?)(?:assets\/images|assets\/videos|assets\/sfiva|sfiva\.)/;

function cleanBody(body) {
  if (POISON.test(body)) {
    body = body.split(";").filter(d => d.indexOf(":") > 0 && !POISON.test(d)).join(";") +
      (body.trim().endsWith(";") ? ";" : "");
  }
  return body.replace(/url\(\s*(['"]?)assets\/fonts\//g, "url($1/assets/fonts/");
}

function prune(css) {
  let out = "", i = 0;
  const n = css.length;
  function scanBlock(start) { /* returns [prelude, body, nextIndex] for a balanced block */
    let d = 0, j = start;
    for (; j < n; j++) {
      const ch = css[j];
      if (ch === '"' || ch === "'") { const q = ch; j++; while (j < n && css[j] !== q) j++; continue; }
      if (ch === "{") d++;
      else if (ch === "}") { d--; if (!d) break; }
    }
    return j;
  }
  while (i < n) {
    while (css[i] === " " || css[i] === "\n" || css[i] === "\t" || css[i] === ";") i++;
    if (i >= n) break;
    if (css[i] === "/" && css[i + 1] === "*") { const e = css.indexOf("*/", i); i = e < 0 ? n : e + 2; continue; }
    let j = i, d = 0;
    while (j < n) {
      const ch = css[j];
      if (ch === '"' || ch === "'") { const q = ch; j++; while (j < n && css[j] !== q) j++; j++; continue; }
      if (ch === "{") { d++; break; }
      if (ch === "}") { d = -1; break; }
      j++;
    }
    if (d !== 1) { i = j + 1; continue; }
    const prelude = css.slice(i, j).trim();
    const close = scanBlock(j);
    const inner = css.slice(j + 1, close);
    i = close + 1;
    if (/^@(media|supports|layer)/.test(prelude)) {
      const kid = prune(inner);
      if (kid.trim()) out += prelude + "{" + kid + "}";
    } else if (/^@/.test(prelude)) {
      if (POISON.test(inner)) continue;
      out += prelude + "{" + cleanBody(inner) + "}";
    } else {
      const keep = prelude.split(",").map(s => s.trim()).filter(s => s && used(s));
      if (!keep.length) continue;
      const body = cleanBody(inner);
      if (!body.replace(/[^;]/g, "").length && !body.trim()) continue;
      out += keep.join(",") + "{" + body + "}";
    }
  }
  return out;
}

const rawCss = fs.readFileSync(path.join(SRC, "sfiva.min.css"), "utf8");
const pruned = prune(rawCss) + "\n" + CUBE_CSS + "\n" + EXTRA_CSS;
fs.mkdirSync(path.join(SRC, "css"), { recursive: true });
fs.writeFileSync(path.join(SRC, "css", "home.css"), pruned.trim() + "\n");
fs.writeFileSync(path.join(SRC, "index-3d.html"), page);

/* fonts the stylesheet references, minus the latin-ext subsets we do not need */
const KEEP_FONTS = ["inter-latin-567244.woff2", "ebgaramond-latin-143e88.woff2", "cinzel-latin-400.woff2",
  "cinzel-latin-500.woff2", "fa-solid-900-df80e6.woff2", "fa-brands-400-61a9c9.woff2", "fa-regular-400-6f9d08.woff2"];
const from = path.join(SRC, "assets", "fonts"), into = path.join(SRC, "fonts");
fs.mkdirSync(into, { recursive: true });
KEEP_FONTS.forEach(f => { if (fs.existsSync(path.join(from, f))) fs.copyFileSync(path.join(from, f), path.join(into, f)); });

const kb = b => (b / 1024).toFixed(1) + " KB";
const gzip = b => require("zlib").gzipSync(Buffer.from(b), { level: 9 }).length;
console.log("home page   ", kb(page.length), "→ gz", kb(gzip(page)));
console.log("home.css    ", kb(pruned.length), "→ gz", kb(gzip(pruned)));
console.log("selectors kept:", pruned.split("{").length - 1, "of", rawCss.split("{").length - 1);
if (/\b(herbal|garment|murabba|oil|vest|sock|gift set|perfume|oud)\b/i.test(pruned.replace(/\/\*[^]*?\*\//g, ""))) {
  console.warn("NOTE: commerce words still present in CSS declarations (harmless unless they render text)");
}
