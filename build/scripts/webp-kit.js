/* ------------------------------------------------------------------
   build/scripts/webp-kit.js — our own artwork → production WebP sets.

   No ImageMagick / cwebp / Pillow in this environment, so Chromium does the
   resampling: each master PNG becomes a 4K WebP archive copy in
   build/src/assets/img/raw and the responsive set the site actually serves.

     node build/scripts/webp-kit.js <stem>=<master.png> [...]
     node build/scripts/webp-kit.js --all      (every master in vibe_images)
   ------------------------------------------------------------------ */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..", "..");
const RAW = path.join(ROOT, "build", "src", "assets", "img", "raw");
const OUT = path.join(ROOT, "dist", "assets", "img");
const VIBE = path.join(ROOT, "vibe_images");

/* square card art and wide band art use different ladders */
const SQUARE = [160, 320, 480, 640, 880];
const WIDE = [320, 640, 960, 1280, 1600];

function masters() {
  const args = process.argv.slice(2);
  if (args[0] === "--all") {
    const byStem = {};
    fs.readdirSync(VIBE).forEach(f => {
      const m = f.match(/^(.+?)_\d+_[a-f0-9]+\.png$/i);
      if (m) byStem[m[1]] = path.join(VIBE, f);
    });
    return Object.keys(byStem).map(k => [k, byStem[k]]);
  }
  return args.map(a => {
    const [stem, file] = a.split("=");
    return [stem, path.resolve(file)];
  });
}

(async () => {
  const list = masters();
  if (!list.length) { console.log("nothing to do"); return; }
  fs.mkdirSync(RAW, { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent("<canvas id=c></canvas>");

  for (const [stem, file] of list) {
    const wide = /^home-/.test(stem);
    const sizes = wide ? WIDE : SQUARE;
    const b64 = fs.readFileSync(file).toString("base64");
    const targets = [3840].concat(sizes);
    const out = await page.evaluate(async ([b64, targets, wide]) => {
      const img = new Image();
      img.src = "data:image/png;base64," + b64;
      await img.decode();
      const ratio = img.naturalWidth / img.naturalHeight;
      const c = document.getElementById("c"), ctx = c.getContext("2d");
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
      return targets.map(w => {
        const h = Math.round(w / ratio);
        c.width = w; c.height = h;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        return { w: w, h: h, data: c.toDataURL("image/webp", 0.82).split(",")[1] };
      });
    }, [b64, targets, wide]);

    fs.writeFileSync(path.join(RAW, stem + "-master.webp"),
      Buffer.from(out[0].data, "base64"));
    console.log(stem + "-master.webp", out[0].w + "x" + out[0].h,
      Math.round(fs.statSync(path.join(RAW, stem + "-master.webp")).size / 1024) + " KB");

    let bytes = 0;
    out.slice(1).forEach(o => {
      const f = path.join(OUT, stem + "-" + o.w + ".webp");
      fs.writeFileSync(f, Buffer.from(o.data, "base64"));
      bytes += fs.statSync(f).size;
    });
    console.log("  served set", sizes.join("/"), Math.round(bytes / 1024) + " KB total");
  }
  await browser.close();
})();
