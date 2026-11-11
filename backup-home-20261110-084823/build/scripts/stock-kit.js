/* ------------------------------------------------------------------
   build/scripts/stock-kit.js — real product photography for the service
   cards, sourced from freely-licensed files and turned into the same
   4K master + responsive WebP ladder our own artwork uses.

     node build/scripts/stock-kit.js            # everything in WANTED
     node build/scripts/stock-kit.js salon gym  # only matching stems
     node build/scripts/stock-kit.js --pick     # search only, write the
                                                # chosen-file manifest

   Commons originals frequently fail to decode in Chromium and
   upload.wikimedia.org throttles this server hard, so the reliable path is
   to save any licensed photo as stock-drop/<stem>.jpg and re-run.
   ------------------------------------------------------------------ */
const fs = require("fs");
const https = require("https");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..", "..");
const RAW = path.join(ROOT, "build", "src", "assets", "img", "raw");
const DL = path.join(ROOT, "build", "src", "assets", "img", "stock");
const DROP = path.join(ROOT, "build", "src", "assets", "img", "stock-drop");
const OUT = path.join(ROOT, "dist", "assets", "img");
const MANIFEST = path.join(ROOT, "build", "src", "assets", "img", "stock-manifest.json");

const SQUARE = [160, 320, 480, 640, 880];
const WIDE = [320, 640, 960, 1280, 1600];

/* search terms per card; first hits win, so order matters */
const WANTED = {
  "service-salon": { q: "hairdresser salon interior", wide: 0 },
  "service-gym": { q: "fitness gym equipment room", wide: 0 },
  "service-car": { q: "car showroom dealership", wide: 0 },
  "service-event": { q: "wedding stage decoration flowers", wide: 0 },
  "service-banquet": { q: "banquet hall tables", wide: 0 },
  "service-courier": { q: "delivery parcels warehouse logistics", wide: 0 },
  "service-pharmacy": { q: "pharmacy shelves medicine", wide: 0 },
  "service-mosque": { q: "mosque architecture", wide: 0 },
  "service-trade": { q: "container port cranes", wide: 0 },
  "service-pos": { q: "retail checkout counter shop", wide: 0 },
  "service-law": { q: "law court library books", wide: 0 },
  "service-travel": { q: "airport departure hall travellers", wide: 0 },
  "service-hotel": { q: "hotel lobby reception", wide: 0 },
  "service-school": { q: "school classroom students", wide: 0 },
  "service-hospital": { q: "hospital corridor medical", wide: 0 },
  "service-property": { q: "residential buildings street", wide: 0 },
  "service-job-portal": { q: "office people meeting", wide: 0 },
  "service-food": { q: "restaurant interior tables", wide: 0 },
  "service-ecommerce": { q: "online shopping parcels", wide: 0 },
  "service-donation": { q: "charity volunteers food distribution", wide: 0 },
  "home-season": { q: "Lahore shop street market", wide: 1 },
};

const LIC_RANK = { "CC0": 0, "Public domain": 0, "PD": 0, "CC BY 4.0": 1, "CC BY 3.0": 1, "CC BY 2.0": 1, "CC BY-SA 4.0": 2, "CC BY-SA 3.0": 2, "CC BY-SA 2.0": 2 };

const get = (url, bin) => new Promise((res, rej) => {
  https.get(url, { headers: { "User-Agent": "wafa-smart-tech asset pipeline (contact: wafasmart.tech)" } }, r => {
    if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return res(get(r.headers.location, bin));
    const chunks = []; r.on("data", c => chunks.push(c));
    r.on("end", () => { const b = Buffer.concat(chunks); if (r.statusCode !== 200) return rej(new Error(r.statusCode + " " + url)); res(bin ? b : b.toString("utf8")); });
  }).on("error", rej);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function api(params, tries) {
  const u = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams(Object.assign({ format: "json" }, params));
  for (let i = 0; i < (tries || 4); i++) {
    try { return JSON.parse(await get(u)); }
    catch (e) { await sleep(2500 * (i + 1)); }
  }
  throw new Error("commons api unreachable: " + u);
}

function licOf(em) {
  const s = (em.LicenseShortName && em.LicenseShortName.value) || "";
  return s.replace(/\s+/g, " ").trim();
}
/* archive/vintage files are free-licensed but wrong for a product card */
function stale(em, title) {
  const raw = String((em.DateTimeOriginal && em.DateTimeOriginal.value) || "") + " " + title;
  const y = raw.match(/\b(1[6-9]\d\d|20[01]\d)\b/);
  if (y && +y[1] < 2013) return true;
  return /(vintage|engraving|drawing|sketch|painting|postcard|scan|archive)/i.test(title);
}

function authorOf(em) {
  const a = em.Artist && em.Artist.value;
  if (!a) return "unknown";
  return String(a).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() || "unknown";
}

/* pick the largest, cleanest-licensed, non-weird file for a search term */
async function choose(stem, cfg) {
  const d = await api({
    action: "query", generator: "search", gsrsearch: cfg.q + " filetype:bitmap",
    gsrnamespace: 6, gsrlimit: 24, prop: "imageinfo",
    iiprop: "url|size|extmetadata|mime", iiurlwidth: 3600,
  });
  const pages = d.query && d.query.pages ? Object.values(d.query.pages) : [];
  const cand = pages.map(p => {
    const ii = p.imageinfo && p.imageinfo[0]; if (!ii) return null;
    const em = ii.extmetadata || {};
    const lic = licOf(em);
    if (!(ii.mime === "image/jpeg" || ii.mime === "image/png")) return null;
    if (ii.width < 1600) return null;
    if (!/^File:/i.test(p.title)) return null;
    const rank = LIC_RANK[lic];
    if (rank === undefined) return null;                 /* anything stricter stays out */
    if (/GFDL|NC|ND/i.test(lic)) return null;
    const title = p.title.replace(/^File:/, "");
    if (/\.(tif|tiff|svg)$/i.test(title)) return null;
    return {
      stem, title, lic, rank, author: authorOf(em), w: ii.width, h: ii.height,
      src: ii.thumburl || ii.url,
      orig: ii.url,
      penalty: stale(em, title) ? 3 : 0,
    };
  }).filter(Boolean).sort((a, b) => ((a.rank + a.penalty) - (b.rank + b.penalty)) || ((b.w * b.h) - (a.w * a.h)));
  return cand[0] || null;
}

/* square cards get a centre crop, wide bands a 16:7 crop.
   The bytes are served to the page through a route so Chromium decodes
   them as a normal image response. A file in stock-drop/ wins over the
   download, so any photo you drop there is picked up on the next run. */
async function emit(page, src, stem, wide) {
  const drop = [".jpg", ".jpeg", ".png", ".webp"].map(e => path.join(DROP, stem + e)).find(f => fs.existsSync(f));
  const buf = drop ? fs.readFileSync(drop) : await get(src, true);
  fs.mkdirSync(DL, { recursive: true });
  const png = /\.png($|\?)/i.test((drop || src));
  fs.writeFileSync(path.join(DL, stem + (png ? ".png" : ".jpg")), buf);
  const sizes = wide ? WIDE : SQUARE;
  const targets = [3840].concat(sizes);

  await page.route(/\.stock-local\//, route => {
    const u = route.request().url();
    if (u.endsWith("/img")) return route.fulfill({ status: 200, body: buf, contentType: png ? "image/png" : "image/jpeg" });
    return route.fulfill({ status: 200, contentType: "text/html", body: "<body></body>" });
  });
  await page.goto("https://" + stem + ".stock-local/");
  const out = await page.evaluate(async ([targets, wide]) => {
    const img = new Image();
    img.src = "/img";
    await img.decode();
    const c = document.getElementById("c") || Object.assign(document.body.appendChild(document.createElement("canvas")), { id: "c" });
    const ctx = c.getContext("2d"); ctx.imageSmoothingQuality = "high";
    const ar = wide ? 16 / 7 : 1;
    const sw = img.naturalWidth, sh = img.naturalHeight;
    let cw = sw, ch = sh;
    if (sw / sh > ar) cw = sh * ar; else ch = sw / ar;
    const cx = (sw - cw) / 2, cy = (sh - ch) / 2;
    return targets.map(w => {
      const h = Math.round(w / ar);
      c.width = w; c.height = h;
      ctx.fillStyle = "#0a1c34"; ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h);
      return { w, h, data: c.toDataURL("image/webp", 0.82).split(",")[1] };
    });
  }, [targets, wide]);
  await page.unroute(/\.stock-local\//);

  fs.mkdirSync(RAW, { recursive: true });
  fs.writeFileSync(path.join(RAW, stem + "-master.webp"), Buffer.from(out[0].data, "base64"));
  let bytes = 0;
  for (const o of out.slice(1)) {
    const f = path.join(OUT, stem + "-" + o.w + ".webp");
    fs.writeFileSync(f, Buffer.from(o.data, "base64"));
    bytes += fs.statSync(f).size;
  }
  return { master: out[0].w + "x" + out[0].h, kb: Math.round(bytes / 1024) };
}

(async () => {
  const argv = process.argv.slice(2);
  const pickOnly = argv.includes("--pick");
  const filter = argv.filter(a => !a.startsWith("--"));
  const stems = Object.keys(WANTED).filter(s => !filter.length || filter.some(f => s.includes(f)));

  fs.mkdirSync(OUT, { recursive: true });
  const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};
  const skipped = [];

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent("<body></body>");
  for (const stem of stems) {
    let row = manifest[stem];
    if (!row || !row.title) {
      row = await choose(stem, WANTED[stem]);
      if (!row) { console.log("!! no free-licensed match for " + stem); continue; }
      manifest[stem] = row;
      fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1));
      console.log("   chosen " + stem + " <- " + row.title + " [" + row.lic + "]");
    }
    if (pickOnly) continue;
    let r = null;
    for (const src of [row.src, row.orig].filter(Boolean)) {
      try { r = await emit(page, src, stem, WANTED[stem].wide); break; }
      catch (e) { console.log("   !! " + stem + " " + String(e.message || e).slice(0, 70)); }
    }
    if (!r) { skipped.push(stem); continue; }
    console.log("   " + stem.padEnd(20) + r.master + " ladder " + (WANTED[stem].wide ? WIDE : SQUARE).join("/") + " " + r.kb + " KB   " + (row.lic || "local drop"));
    await sleep(400);
  }
  await page.close();
  await browser.close();
  const rows = Object.values(manifest);
  if (rows.length) console.log("\n" + rows.length + " files licensed: " +
    rows.map(r => r.lic).filter((v, i, a) => a.indexOf(v) === i).join(", "));
  if (skipped.length) console.log("kept our own artwork for: " + skipped.join(", "));
})();
