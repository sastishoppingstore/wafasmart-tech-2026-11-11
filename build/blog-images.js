"use strict";
/* Builds ONE branded hero image per /blog info article (30 pages).
   - Telecom + BISP pages: the real brand logo on a light panel, navy card.
   - Other pages: a free-license Wikimedia Commons photo, navy tint, brand marks.
   Logos/photos come from Wikimedia Commons / Wikipedia and are used for
   identification. Attribution is written to build/blog/image-credits.json.

   Usage: node build/blog-images.js
*/
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "dist", "assets", "img");
const TMP = path.join("/tmp/opencode", "imgdl");
const CREDITS = path.join(__dirname, "blog", "image-credits.json");
const UA = "WafaSmartTechImageFetcher/1.0 (https://wafasmart.tech)";
const NAVY_A = "#0b1636", NAVY_B = "#050914", GOLD = "#ffc83d";
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });

const sh = (args) => execFileSync("convert", args, { stdio: ["ignore", "pipe", "pipe"] });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/* ---- brand logos (file on Commons or Wikipedia) ---- */
const LOGOS = {
  "telenor-sim-number-check-code": { host: "commons", file: "File:Telenor Logo.svg", accent: "#00a8e0", brand: "Telenor" },
  "jazz-sim-number-check-code": { host: "enwiki", file: "File:Jazz logo.svg", accent: "#ff4d5e", brand: "Jazz" },
  "ufone-sim-number-check-code": { host: "commons", file: "File:Ufone logo (2023).png", accent: "#8b3dff", brand: "Ufone" },
  "zong-sim-number-check-code": { host: "commons", file: "File:Zong Logo.png", accent: "#25d366", brand: "Zong", trimWhite: true },

  "bisp-new-qist-november-2026": { host: "enwiki", file: "File:BISP Logo.png", accent: "#25d366", brand: "BISP" },
  "bisp-8171-check-online-cnic": { host: "enwiki", file: "File:BISP Logo.png", accent: "#ffc83d", brand: "BISP" },
  "benazir-income-support-payment-check": { host: "enwiki", file: "File:BISP Logo.png", accent: "#5aa2ff", brand: "BISP" },
  "bisp-eligibility-check-2026": { host: "enwiki", file: "File:BISP Logo.png", accent: "#25d366", brand: "BISP" },
  "bisp-registration-online-2026": { host: "enwiki", file: "File:BISP Logo.png", accent: "#8b3dff", brand: "BISP" },
  "bisp-13500-qist-status-check": { host: "enwiki", file: "File:BISP Logo.png", accent: "#ffc83d", brand: "BISP" },
  "bisp-complaint-helpline-0800-26477": { host: "enwiki", file: "File:BISP Logo.png", accent: "#5aa2ff", brand: "BISP" },
  "ehsaas-program-check-online": { host: "enwiki", file: "File:BISP Logo.png", accent: "#25d366", brand: "BISP" }
};

/* ---- topic photos (Wikimedia Commons search; first license-clean hit) ---- */
const PHOTOS = {
  "sim-owner-details-check-cnic-pakistan": { q: ["sim card"], file: "File:ASDA Mobile SIM card.jpg", accent: "#5aa2ff" },
  "mobile-balance-data-check-codes-pakistan": { q: ["mobile phone keypad", "mobile phone"], accent: "#ffc83d" },
  "benazir-taleemi-wazaif-check-online": { q: ["school children classroom", "classroom students"], accent: "#ffc83d" },
  "benazir-nashonuma-program-check": { q: ["mother child health", "mother and child"], accent: "#25d366" },
  "kisan-card-check-online-punjab": { q: ["wheat harvest farmer"], file: "File:Wheat harvest on the Palouse.jpg", accent: "#25d366" },
  "himmat-card-check-online-2026": { q: ["volunteer community help", "helping hand"], accent: "#8b3dff" },
  "cm-punjab-solar-panel-scheme-check": { q: ["solar panels roof", "solar panel"], accent: "#ffc83d" },
  "punjab-laptop-scheme-check-2026": { q: ["laptop computer desk"], file: "File:Laptop on a desk (Unsplash).jpg", accent: "#5aa2ff" },
  "benazir-hunar-program-check": { q: ["sewing machine"], file: "File:Woman sewing with a Singer sewing machine.png", accent: "#25d366" },
  "punjab-sehat-card-check-online": { q: ["hospital doctor patient", "hospital"], accent: "#ff4d5e" },
  "electricity-bill-check-online-pakistan": { q: ["electricity meter", "electric meter"], accent: "#ffc83d" },
  "fbr-tax-return-check-online-2026": { q: ["calculator"], file: "File:Calculator (2198497019).jpg", accent: "#5aa2ff" },
  "nadra-cnic-status-check-online": { q: ["identity card", "identity document"], accent: "#25d366" },
  "driving-licence-check-online-punjab": { q: ["car driving road", "driving car"], accent: "#5aa2ff" },
  "passport-tracking-online-pakistan": { q: ["passport", "passport document"], accent: "#ffc83d" },
  "ptcl-internet-bill-check-online": { q: ["wifi router", "internet router"], accent: "#5aa2ff" },
  "sui-gas-bill-check-online": { q: ["gas stove flame", "gas meter"], accent: "#ff4d5e" },
  "domicile-certificate-check-online-punjab": { q: ["diploma certificate"], file: "File:Storer College Diploma.jpg", accent: "#25d366" }
};

/* ---- licenses we accept for photos ---- */
const OK_LIC = new Set(["cc0", "pdm", "by"]);
const strip = s => String(s || "").replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
function cleanAuthor(s) {
  let a = strip(s) || "Wikimedia Commons";
  if (/^unknown author\s+unknown author$/i.test(a)) return "Wikimedia Commons";
  const m = a.match(/^(.+?)\s+\1$/);
  if (m) a = m[1];
  return a;
}

function licOk(short) {
  const s = String(short || "");
  if (/^CC0/i.test(s) || /public domain/i.test(s) || /^PD/i.test(s)) return true;
  if (/^CC[ -]BY(\s|$)/i.test(s) && !/SA|NC|ND/i.test(s)) return true;
  return false;
}

async function api(host, params) {
  const base = host === "enwiki" ? "https://en.wikipedia.org/w/api.php" : "https://commons.wikimedia.org/w/api.php";
  const r = await fetch(base + "?" + new URLSearchParams({ ...params, format: "json", origin: "*" }), { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!r.ok) throw new Error(`api ${r.status}`);
  return r.json();
}

async function resolveFile(host, title) {
  const d = await api(host, { action: "query", titles: title, prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: "1600" });
  const pg = Object.values((d.query || {}).pages || {})[0] || {};
  return (pg.imageinfo || [])[0];
}

async function searchPhoto(queries) {
  for (const q of queries) {
    const d = await api("commons", { action: "query", generator: "search", gsrsearch: q, gsrnamespace: "6", gsrlimit: "40", prop: "imageinfo", iiprop: "url|size|extmetadata|mime", iiurlwidth: "1600" });
    const pages = Object.values((d.query || {}).pages || {});
    const want = q.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const cand = pages.map(p => {
      const ii = (p.imageinfo || [])[0] || {};
      const md = ii.extmetadata || {};
      return { p, ii, md, lic: (md.LicenseShortName || {}).value || "", title: p.title || "" };
    }).filter(x =>
      licOk(x.lic) && (x.ii.width || 0) >= 1000 && (x.ii.height || 0) >= 600 &&
      (x.ii.thumburl || x.ii.url) && !/\.svg$/i.test(x.ii.url || "") &&
      !/(painting|van gogh|drawing|artwork|broken|diagram|chart|map)/i.test(x.title) &&
      (x.ii.width / x.ii.height) >= 1.2 && (x.ii.width / x.ii.height) <= 2.6
    );
    const score = x => {
      const hay = (x.title + " " + strip((x.md.ImageDescription || {}).value || "")).toLowerCase();
      let s = want.reduce((n, w) => n + (hay.includes(w) ? 1 : 0), 0) * 4;
      if ((x.ii.width || 0) >= 1200) s += 2;
      if ((x.ii.width || 0) >= 1600) s += 1;
      return s;
    };
    cand.sort((a, b) => score(b) - score(a));
    if (cand[0]) return cand[0];
    await sleep(300);
  }
  return null;
}

async function download(url, dest) {
  const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!r.ok) throw new Error(`download ${r.status}`);
  fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
}

/* This ImageMagick build ignores -quality for WebP (always ~Q92), so photo
   output is capped with webp:target-size instead. Only re-encode when the
   default is already over the cap, so small images never get inflated. */
function capWebp(file, target) {
  if (target && fs.existsSync(file) && fs.statSync(file).size > target) {
    sh([file, "-define", "webp:target-size=" + target, file]);
  }
}

/* Draw the brand mark + wordmark shared by every card. */
function brandMarks(img, accent, textColor = "#8b99b6", target = 0) {
  sh([img,
    "-fill", accent, "-draw", "rectangle 0,669 1200,675",
    "-fill", GOLD, "-draw", "circle 70,62 70,50",
    "-fill", GOLD + "66", "-draw", "roundrectangle 92,52 150,66 7,7",
    "-fill", accent + "aa", "-draw", "roundrectangle 92,72 130,84 6,6",
    "-font", "DejaVu-Sans-Bold", "-pointsize", "26", "-fill", textColor,
    "-gravity", "SouthEast", "-annotate", "+36+24", "wafasmart.tech",
    "-quality", "86", img]);
  capWebp(img, target);
}

function variants(out, kind) {
  // Responsive sizes for phones/tablets (the 1200w original stays as fallback).
  const isPhoto = kind === "photo";
  const jobs = isPhoto
    ? [["960x540", "-960", 48000], ["640x360", "-640", 25000]]
    : [["960x540", "-960", 0], ["640x360", "-640", 0]];
  for (const [size, suffix, target] of jobs) {
    const dest = out.replace(/\.webp$/, suffix + ".webp");
    sh([out, "-resize", size, dest]);
    capWebp(dest, target);
  }
}

function logoCard(raw, out, accent, trimWhite) {
  let logo = raw;
  if (trimWhite) {
    logo = path.join(TMP, "clean-" + path.basename(path.basename(out, ".webp")) + ".png");
    sh([raw, "-fuzz", "6%", "-transparent", "white", logo]);
  }
  sh(["-size", "1200x675", `gradient:${NAVY_A}-${NAVY_B}`, path.join(TMP, "base.png")]);
  sh(["-size", "820x820", "xc:none", "-fill", accent + "33", "-draw", "circle 410,410 410,60", "-blur", "0x95", path.join(TMP, "glow.png")]);
  sh([path.join(TMP, "base.png"), path.join(TMP, "glow.png"), "-geometry", "+640-190", "-compose", "over", "-composite", path.join(TMP, "stage1.png")]);
  sh(["-size", "1200x675", "xc:none", "-fill", "#f6f8ff", "-stroke", "#ffffff", "-strokewidth", "2", "-draw", "roundrectangle 250,150 950,525 34,34", path.join(TMP, "panel.png")]);
  sh([path.join(TMP, "panel.png"), "(", logo, "-resize", "600x250", ")", "-gravity", "center", "-geometry", "+0-8", "-compose", "over", "-composite", path.join(TMP, "stage2.png")]);
  sh([path.join(TMP, "stage1.png"), path.join(TMP, "stage2.png"), "-compose", "over", "-composite", out]);
  brandMarks(out, accent);
}

function photoCard(raw, out, accent) {
  // cover-crop, soft tint, bottom shade for the wordmark, brand marks.
  sh([raw, "-auto-orient", "-resize", "1200x675^", "-gravity", "center", "-extent", "1200x675",
    "-auto-level", "-modulate", "108,94,100", "-brightness-contrast", "6x4",
    "(", "-size", "1200x675", "xc:" + NAVY_A, "-alpha", "set", "-channel", "A", "-evaluate", "set", "24%", "-channel", "A", ")",
    "-compose", "over", "-composite",
    "(", "-size", "1200x675", "gradient:#00000000-#050914cc", "-rotate", "180", ")", "-compose", "over", "-composite",
    out]);
  brandMarks(out, accent, "#e6ecff", 88000);
}

(async () => {
  const credits = {};
  let ok = 0, fail = 0;
  const photosOnly = process.argv.includes("--photos-only");
  const logosOnly = process.argv.includes("--logos-only");
  for (const [slug, spec] of Object.entries(LOGOS)) {
    if (photosOnly) break;
    try {
      const ii = await resolveFile(spec.host, spec.file);
      if (!ii) throw new Error("file not found");
      const raw = path.join(TMP, slug + ".logo");
      await download((ii.thumburl || ii.url).split("?")[0], raw);
      const out = path.join(OUT, "blog-" + slug + ".webp");
      logoCard(raw, out, spec.accent, spec.trimWhite);
      variants(out, "logo");
      const md = ii.extmetadata || {};
      credits[slug] = {
        kind: "logo",
        label: spec.brand,
        license: (md.LicenseShortName || {}).value || "",
        creator: cleanAuthor((md.Artist || {}).value || spec.brand),
        source: "https://" + (spec.host === "enwiki" ? "en.wikipedia.org" : "commons.wikimedia.org") + "/wiki/" + encodeURIComponent(spec.file.replace(/ /g, "_")),
        credit: `${spec.brand} logo — used for identification only`
      };
      console.log(`LOGO  ${slug}  ${Math.round(fs.statSync(out).size / 1024)}KB`);
      ok++;
      await sleep(400);
    } catch (e) { console.log(`FAIL ${slug}: ${e.message}`); fail++; }
  }

  for (const [slug, spec] of Object.entries(PHOTOS)) {
    if (logosOnly) break;
    try {
      let win;
      if (spec.file) {
        const ii = await resolveFile("commons", spec.file);
        if (!ii) throw new Error("file not found");
        win = { ii, md: ii.extmetadata || {}, title: spec.file };
      } else {
        win = await searchPhoto(spec.q);
      }
      if (!win) throw new Error("no licensed photo");
      const raw = path.join(TMP, slug + ".src");
      await download((win.ii.thumburl || win.ii.url).split("?")[0], raw);
      const out = path.join(OUT, "blog-" + slug + ".webp");
      photoCard(raw, out, spec.accent);
      variants(out, "photo");
      const md = win.md || {};
      const artist = cleanAuthor((md.Artist || {}).value || "Wikimedia Commons");
      credits[slug] = {
        kind: "photo",
        label: win.title.replace(/^File:/, ""),
        license: (md.LicenseShortName || {}).value || "",
        creator: artist,
        source: "https://commons.wikimedia.org/wiki/" + encodeURIComponent(win.title.replace(/ /g, "_")),
        credit: `Photo: ${artist} · ${(md.LicenseShortName || {}).value || "Wikimedia Commons"}`
      };
      console.log(`PHOTO ${slug}  ${Math.round(fs.statSync(out).size / 1024)}KB  [${credits[slug].license}] ${win.title}`);
      ok++;
      await sleep(400);
    } catch (e) { console.log(`FAIL ${slug}: ${e.message}`); fail++; }
  }

  let prev = {};
  try { prev = JSON.parse(fs.readFileSync(CREDITS, "utf8")); } catch { /* first run */ }
  fs.writeFileSync(CREDITS, JSON.stringify({ ...prev, ...credits }, null, 2));
  console.log(`\nbuilt ${ok} images, failed ${fail}; credits -> ${path.relative(ROOT, CREDITS)}`);
})();