"use strict";
/* Downloads free-license hero photos for the /blog info guide cluster.
   Source: Wikimedia Commons (no auth, generous limits). We only accept
   CC0 / public-domain / plain CC-BY (no SA, NC or ND), landscape, >=1000px.
   Each photo is cropped to 1200x675 and given a subtle navy brand tint.
   Attribution is written to build/blog/info-image-credits.json and shown
   under the hero on each page.

   Usage: node build/fetch-images.js            (download + process)
          node build/fetch-images.js --dry       (search only, print picks)
*/
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const OUT = path.join(__dirname, "..", "dist", "assets", "img");
const TMP = path.join("/tmp/opencode", "imgdl");
const CREDITS = path.join(__dirname, "blog", "info-image-credits.json");
const DRY = process.argv.includes("--dry");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });

const NAVY = "#070b1a";
const UA = "WafaSmartTechImageFetcher/1.0 (https://wafasmart.tech; contact@wafasmart.tech)";

const THEMES = {
  "info-sim-check": { q: "sim card", alt: "A SIM card" },
  "info-sim-owner": { q: "identity card", alt: "An identity card" },
  "info-mobile-codes": { q: "mobile phone keypad", alt: "A mobile phone keypad" },
  "info-bisp-payment": { q: "pakistani rupee banknotes", alt: "Pakistani rupee banknotes" },
  "info-bisp-registration": { q: "office counter people", alt: "People at a service counter" },
  "info-education-stipend": { q: "classroom students school", alt: "Students in a classroom" },
  "info-farmer-card": { q: "farmer wheat field", alt: "A farmer in a wheat field" },
  "info-welfare-card": { q: "volunteer community help", alt: "A volunteer helping the community" },
  "info-solar-scheme": { q: "solar panels roof", alt: "Solar panels on a roof" },
  "info-utility-bill": { q: "electricity meter", alt: "An electricity meter" },
  "info-tax-return": { q: "accounting calculator", alt: "A calculator for tax work" },
  "info-documents": { q: "passport", alt: "A passport" }
};

const strip = s => String(s || "").replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

function licenseOk(short) {
  const s = String(short || "");
  if (/^CC0/i.test(s) || /public domain/i.test(s) || /^PD/i.test(s)) return true;
  if (/^CC[ -]BY(\s|$)/i.test(s) && !/SA|NC|ND/i.test(s)) return true; // plain CC-BY only
  return false;
}

async function search(q) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: q,
    gsrnamespace: "6",
    gsrlimit: "40",
    prop: "imageinfo",
    iiprop: "url|size|extmetadata",
    iiurlwidth: "1600",
    format: "json",
    origin: "*"
  });
  const res = await fetch("https://commons.wikimedia.org/w/api.php?" + params, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) throw new Error(`commons ${res.status}`);
  const data = await res.json();
  return Object.values((data.query || {}).pages || {});
}

function pick(pages, q) {
  const want = q.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const list = pages.map(p => {
    const ii = (p.imageinfo || [])[0] || {};
    const md = ii.extmetadata || {};
    const lic = (md.LicenseShortName || {}).value || "";
    const artist = strip((md.Artist || {}).value || "");
    return { p, ii, md, lic, artist, title: p.title || "" };
  }).filter(x =>
    licenseOk(x.lic) &&
    (x.ii.width || 0) >= 1000 &&
    (x.ii.height || 0) >= 600 &&
    (x.ii.thumburl || x.ii.url) &&
    !/\.svg$/i.test(x.ii.url || "") &&
    (x.ii.width / x.ii.height) >= 1.2 && (x.ii.width / x.ii.height) <= 2.6
  );
  const score = x => {
    const hay = (x.title + " " + strip((x.md.ImageDescription || {}).value || "")).toLowerCase();
    let s = want.reduce((n, w) => n + (hay.includes(w) ? 1 : 0), 0) * 4;
    if ((x.ii.width || 0) >= 1200) s += 2;
    if ((x.ii.width || 0) >= 1600) s += 1;
    return s;
  };
  list.sort((a, b) => score(b) - score(a));
  return list[0];
}

const sh = (cmd, args) => execFileSync(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) throw new Error(`download ${res.status}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return fs.statSync(dest).size;
}

function processImage(src, outWebp) {
  sh("convert", [
    src,
    "-auto-orient",
    "-resize", "1200x675^",
    "-gravity", "center",
    "-extent", "1200x675",
    "-modulate", "100,88,100",
    "(", "-size", "1200x675", "xc:" + NAVY, "-alpha", "set", "-channel", "A",
    "-evaluate", "set", "42%", "-channel", "A", ")",
    "-compose", "over", "-composite",
    "-strip",
    "-quality", "82",
    outWebp
  ]);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const credits = {};
  let ok = 0, fail = 0;
  for (const [name, t] of Object.entries(THEMES)) {
    try {
      const pages = await search(t.q);
      const win = pick(pages, t.q);
      if (!win) { console.log(`NO MATCH  ${name}  (${pages.length} results)`); fail++; await sleep(400); continue; }
      const line = `${win.lic} · ${win.artist || "unknown"} · ${win.ii.width}x${win.ii.height}`;
      if (DRY) { console.log(`DRY ${name}  ${line}\n    ${win.title}\n    ${(win.ii.thumburl || win.ii.url).split("?")[0]}`); await sleep(400); continue; }

      const raw = path.join(TMP, name + ".src");
      await download((win.ii.thumburl || win.ii.url).split("?")[0], raw);
      const out = path.join(OUT, name + ".webp");
      processImage(raw, out);
      const kb = Math.round(fs.statSync(out).size / 1024);
      const pageUrl = "https://commons.wikimedia.org/wiki/" + encodeURIComponent(win.title.replace(/^File:/, "File:"));
      credits[name] = {
        title: win.title.replace(/^File:/, ""),
        creator: win.artist || "Wikimedia Commons contributor",
        license: win.lic,
        licenseUrl: (win.md.LicenseUrl || {}).value || "",
        source: pageUrl,
        query: t.q
      };
      console.log(`OK  ${name}  ${line}  -> ${kb}KB`);
      ok++;
      await sleep(500);
    } catch (e) {
      console.log(`FAIL ${name}: ${e.message}`);
      fail++;
      await sleep(800);
    }
  }
  if (!DRY) {
    fs.writeFileSync(CREDITS, JSON.stringify(credits, null, 2));
    console.log(`\ndownloaded ${ok}, failed ${fail}; credits -> ${path.relative(path.join(__dirname, ".."), CREDITS)}`);
  }
})();