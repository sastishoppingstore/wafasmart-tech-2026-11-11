/* ------------------------------------------------------------------
   build/scripts/stock-unsplash.js — pull freely-licensed photos from
   images.unsplash.com (the only stock CDN reachable from this server:
   unsplash.com/napi wants a key, and Pexels, Pixabay, Openverse, Burst and
   picjumbo all 403 or time out from this AWS range) and turn each one into
   the same responsive WebP ladder the rest of the homepage uses.

     node build/scripts/stock-unsplash.js stock3 stock7   # only matching stems
     node build/scripts/stock-unsplash.js --sheet          # + contact sheet

   Source JPEGs are cached in build/src/assets/img/stock/, so re-cutting a
   crop or a ladder width costs no bandwidth.

   Two ladders per photo: <stem> is 1:1 for card thumbs, <stem>w is 16:7 for
   full-bleed bands. --sheet writes
   build/src/assets/img/unsplash-sheet.png so every photo can be checked by
   eye (subject, watermark, faces) before a stem is wired into a card.

   ids file build/scripts/unsplash-ids.txt, one per line:  <photo-id> <stem>
   ------------------------------------------------------------------ */
const fs = require("fs");
const https = require("https");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..", "..");
const RAW = path.join(ROOT, "build", "src", "assets", "img", "raw");
const CACHE = path.join(ROOT, "build", "src", "assets", "img", "stock");
const OUT = path.join(ROOT, "dist", "assets", "img");
const SHEET = path.join(ROOT, "build", "src", "assets", "img", "unsplash-sheet.png");
const IDS = path.join(ROOT, "build", "scripts", "unsplash-ids.txt");
const SQUARE = [160, 320, 480, 640, 880];
const WIDE = [320, 640, 960, 1280, 1600];
const ORIGIN = "https://ustock.local.test";

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { "User-Agent": "wafa-smart.tech asset pipeline" } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return res(get(r.headers.location));
      if (r.statusCode !== 200) { r.resume(); return rej(new Error("HTTP " + r.statusCode)); }
      const c = [];
      r.on("data", d => c.push(d));
      r.on("end", () => res(Buffer.concat(c)));
      r.on("error", rej);
    }).on("error", rej);
  });
}

/* route.fulfill() silently truncates bodies above roughly 700 KB — that, not
   a bad source file, is what every old "source image cannot be decoded" was.
   Take the largest width that still arrives whole. */
async function fetchSource(id, stem) {
  const cached = path.join(CACHE, stem + ".jpg");
  if (fs.existsSync(cached) && fs.statSync(cached).size > 2000) return fs.readFileSync(cached);
  let buf = null;
  for (const w of [2400, 1600, 1200]) {
    buf = await get(`https://images.unsplash.com/${id}?fm=jpg&q=80&w=${w}&fit=max`);
    if (buf.length < 600000) break;
  }
  fs.mkdirSync(CACHE, { recursive: true }); fs.writeFileSync(cached, buf);
  return buf;
}

async function cut(page, buf, ar, targets) {
  await page.route(ORIGIN + "/**", route => route.request().url() === ORIGIN + "/img"
    ? route.fulfill({ status: 200, body: buf, contentType: "image/jpeg" })
    : route.fulfill({ status: 200, contentType: "text/html", body: "<body></body>" }));
  await page.goto(ORIGIN + "/");
  const out = await page.evaluate(async ([ar, targets]) => {
    const img = new Image(); img.src = "/img";
    await img.decode();
    const c = document.getElementById("c") ||
      Object.assign(document.body.appendChild(document.createElement("canvas")), { id: "c" });
    const ctx = c.getContext("2d"); ctx.imageSmoothingQuality = "high";
    const sw = img.naturalWidth, sh = img.naturalHeight;
    let cw = sw, ch = sh;
    if (sw / sh > ar) cw = sh * ar; else ch = sw / ar;
    const cx = (sw - cw) / 2, cy = (sh - ch) / 2;
    /* master at source size (never upscaled), then the responsive ladder */
    return [Math.min(3840, Math.round(cw))].concat(targets).map(w => {
      const h = Math.round(w / ar);
      c.width = w; c.height = h;
      ctx.fillStyle = "#0b1526"; ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h);
      return { w, h, data: c.toDataURL("image/webp", 0.82).split(",")[1] };
    });
  }, [ar, targets]);
  await page.unroute(ORIGIN + "/**");
  return out;
}

const jobs = fs.readFileSync(IDS, "utf8").split("\n")
  .map(l => l.trim()).filter(l => l && !l.startsWith("#"))
  .map(l => { const p = l.split(/\s+/); return { id: p[0], stem: p[1] }; });

(async () => {
  const argv = process.argv.slice(2);
  const sheet = argv.includes("--sheet");
  const only = argv.filter(a => !a.startsWith("--"));
  fs.mkdirSync(RAW, { recursive: true }); fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  const page = await (await b.newContext({ viewport: { width: 1200, height: 800 } })).newPage();
  const cells = [], bad = [];
  for (const j of jobs) {
    if (only.length && !only.some(f => j.stem.startsWith(f))) continue;
    try {
      const buf = await fetchSource(j.id, j.stem);
      const sq = await cut(page, buf, 1, SQUARE);
      const wd = await cut(page, buf, 16 / 7, WIDE);
      fs.writeFileSync(path.join(RAW, j.stem + "-master.webp"), Buffer.from(sq[0].data, "base64"));
      fs.writeFileSync(path.join(RAW, j.stem + "w-master.webp"), Buffer.from(wd[0].data, "base64"));
      sq.slice(1).forEach(o => fs.writeFileSync(path.join(OUT, j.stem + "-" + o.w + ".webp"), Buffer.from(o.data, "base64")));
      wd.slice(1).forEach(o => fs.writeFileSync(path.join(OUT, j.stem + "w-" + o.w + ".webp"), Buffer.from(o.data, "base64")));
      cells.push({ stem: j.stem, data: sq[1].data });
      console.log("ok  ", j.stem, j.id, sq[0].w + "px source");
    } catch (e) { bad.push(j.stem + " " + j.id + " — " + String(e.message).split("\n")[0]); console.log("SKIP", j.stem, j.id, String(e.message).split("\n")[0]); }
  }
  if (sheet && cells.length) {
    await page.goto("about:blank");
    await page.evaluate(cells => {
      document.body.style.cssText = "margin:0;background:#111;display:grid;grid-template-columns:repeat(5,220px);gap:6px;padding:10px;font:11px monospace;color:#fff";
      cells.forEach(c => {
        const d = document.createElement("div");
        d.innerHTML = `<img src="data:image/webp;base64,${c.data}" style="width:220px;height:220px;object-fit:cover;display:block"><div>${c.stem}</div>`;
        document.body.appendChild(d);
      });
    }, cells);
    await page.waitForTimeout(500);
    await page.screenshot({ path: SHEET, fullPage: true });
    console.log("sheet:", SHEET, cells.length, "cells");
  }
  console.log("failed:", bad.length); bad.forEach(x => console.log("   " + x));
  await b.close();
})();
