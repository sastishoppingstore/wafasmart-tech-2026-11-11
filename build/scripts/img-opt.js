/* ------------------------------------------------------------------
   build/scripts/img-opt.js — tighten served WebP sizes for PageSpeed.

   For each rung we render the best source we have: the lossless/4K master
   when it is wide enough (a clean downscale beats re-compressing a small
   rung), otherwise the existing served file re-encoded at a lower q so we
   never upscale. Chromium does the resample; no ImageMagick/cwebp needed.

     node build/scripts/img-opt.js
   ------------------------------------------------------------------ */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..", "..");
const IMG = path.join(ROOT, "dist", "assets", "img");
const RAW = path.join(ROOT, "build", "src", "assets", "img", "raw");
const b64 = f => fs.readFileSync(f).toString("base64");

const JOBS = [
  // new small logo mark for header (40px) / footer (64px)
  { out: "logo-mark.webp", w: 128, h: 128, mode: "contain", q: 0.9, master: "logo.png" },

  // LCP hero band, 16:7 — single clean encode from its matching master (≤1200),
  // the 1280/1600 rungs re-encode the served file so we never upscale.
  { stem: "stock18w", master: "stock18w-master.webp", q: 0.66,
    rungs: [[320, 140], [640, 280], [960, 420], [1280, 560], [1600, 700]] },

  // rest: the PNG masters no longer match the artwork that is served, so we
  // re-encode the served rung (same picture, tighter q) instead of re-rendering.
  { stem: "about-team", reencode: true, q: 0.58,
    rungs: [[800, 450], [1280, 720], [1600, 900]] },
  { stem: "service-ai-agents", reencode: true, q: 0.46,
    rungs: [[160, 160], [320, 320], [480, 480], [640, 640], [880, 880]] },
  { stem: "demo-group-b", reencode: true, q: 0.55,
    rungs: [[320, 200], [640, 400], [960, 600], [1280, 800]] },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent("<canvas id=c></canvas>");

  async function render(src, w, h, mode, q) {
    return await page.evaluate(async ([src, w, h, mode, q]) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const c = document.getElementById("c"), ctx = c.getContext("2d");
      c.width = w; c.height = h;
      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
      if (mode === "contain") {
        const s = Math.min(w / iw, h / ih), dw = iw * s, dh = ih * s;
        ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      } else {
        const s = Math.max(w / iw, h / ih), dw = iw * s, dh = ih * s;
        ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      }
      return c.toDataURL("image/webp", q).split(",")[1];
    }, [src, w, h, mode, q]);
  }

  async function dims(src) {
    return await page.evaluate(async s => {
      const img = new Image(); img.src = s; await img.decode();
      return [img.naturalWidth, img.naturalHeight];
    }, src);
  }

  for (const job of JOBS) {
    if (job.out) {                 // single-file job (logo-mark)
      const mf = path.join(RAW, job.master);
      const mmime = /\.png$/i.test(mf) ? "image/png" : "image/webp";
      const src = "data:" + mmime + ";base64," + b64(mf);
      const data = await render(src, job.w, job.h, job.mode, job.q);
      const f = path.join(IMG, job.out);
      fs.writeFileSync(f, Buffer.from(data, "base64"));
      console.log(job.out.padEnd(22), job.w + "x" + job.h, Math.round(fs.statSync(f).size / 1024) + " KB (master " + Math.round(fs.statSync(path.join(RAW, job.master)).size / 1024) + " KB)");
      continue;
    }

    const masterFile = path.join(RAW, job.master || "x");
    const mext = path.extname(masterFile).slice(1).toLowerCase();
    const mime = mext === "png" ? "image/png" : "image/webp";
    let msrc = null, mw = 0, mh = 0;
    if (!job.reencode && job.master && fs.existsSync(masterFile)) {
      msrc = "data:" + mime + ";base64," + b64(masterFile);
      try { [mw, mh] = await dims(msrc); } catch (e) { mw = 0; }
    }
    console.log("\n" + job.stem + "  " + (job.reencode ? "re-encode served" :
      "master " + job.master + " = " + (mw ? mw + "x" + mh : "UNDECODABLE (re-encode served)")));

    for (const [w, h] of job.rungs) {
      const file = path.join(IMG, job.stem + "-" + w + ".webp");
      const hadBefore = fs.existsSync(file) ? fs.statSync(file).size : 0;
      let src = msrc;
      if (!src || mw < w) {                       // no usable master: re-encode the served rung
        if (!fs.existsSync(file)) { console.log("  skip (missing) " + file); continue; }
        src = "data:image/webp;base64," + b64(file);
      }
      const data = await render(src, w, h, "cover", job.q);
      fs.writeFileSync(file, Buffer.from(data, "base64"));
      const now = fs.statSync(file).size;
      console.log("  " + (job.stem + "-" + w + ".webp").padEnd(26) +
        (hadBefore / 1024).toFixed(1).padStart(7) + " KB -> " +
        (now / 1024).toFixed(1).padStart(7) + " KB" +
        (mw < w ? "  (re-encoded)" : "  (from master)"));
    }
  }

  await browser.close();
})();
