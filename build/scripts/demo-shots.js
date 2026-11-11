/* ------------------------------------------------------------------
   build/scripts/demo-shots.js — photograph the live demo builds.

   The demos are real sites in dist/, so the gallery on /demos.html can
   show the actual page instead of a placeholder. Serve dist first:
     python3 -m http.server 8199 --bind 127.0.0.1 -d dist
     node build/scripts/demo-shots.js
   ------------------------------------------------------------------ */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..", "..");
const OUT = path.join(ROOT, "dist", "assets", "img");
const BASE = "http://127.0.0.1:8199";
const WIDE = [320, 640, 960, 1280];

/* the ERP demos open on a PIN screen; the demo PIN is printed on the page,
   so log in first to photograph the actual dashboard */
async function loginPin(page) {
  const pin = await page.$("input[type=password], input[inputmode=numeric], input[name*=pin i], #pin, .pin");
  if (!pin) return false;
  await pin.fill("1111");
  const btn = await page.$("button[type=submit], button:has-text('Login'), button:has-text('لاگ ان'), button:has-text('داخلہ')");
  if (!btn) return false;
  await btn.click();
  await page.waitForTimeout(1600);
  return true;
}

const DEMOS = [
  ["demo-travel", "/demo4/", 0],
  ["demo-erp-en", "/demo20/", 1],
  ["demo-erp-ur", "/demo21/", 1],
  ["demo-surgical-a", "/demo30/", 0],
  ["demo-surgical-b", "/demo31/", 0],
  ["demo-surgical-c", "/demo32/", 0],
  ["demo-realestate", "/demo40/", 0],
  ["demo-group-a", "/demo41/", 0],
  ["demo-group-b", "/demo42/", 0],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const [stem, route, pinLogin] of DEMOS) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
    } catch (e) {
      console.log("!! " + stem + " " + String(e.message).slice(0, 60));
      await ctx.close(); continue;
    }
    await page.waitForTimeout(1200);
    if (pinLogin && await loginPin(page)) console.log("   " + stem + " logged in with the demo PIN");
    await page.evaluate(() => window.scrollTo(0, 0));
    const png = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: 1440, height: 900 } });
    const shot = await page.evaluate(async ([b64, targets]) => {
      const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
      const c = document.createElement("canvas"), ctx2 = c.getContext("2d");
      ctx2.imageSmoothingQuality = "high";
      const ar = 16 / 10;
      let cw = img.naturalWidth, ch = img.naturalHeight;
      if (cw / ch > ar) cw = ch * ar; else ch = cw / ar;
      const cx = (img.naturalWidth - cw) / 2, cy = (img.naturalHeight - ch) / 2;
      return targets.map(w => {
        const h = Math.round(w / ar); c.width = w; c.height = h;
        ctx2.fillStyle = "#0a1c34"; ctx2.fillRect(0, 0, w, h);
        ctx2.drawImage(img, cx, cy, cw, ch, 0, 0, w, h);
        return { w, data: c.toDataURL("image/webp", 0.8).split(",")[1] };
      });
    }, [png.toString("base64"), [3840].concat(WIDE)]);
    const RAWDIR = path.join(ROOT, "build", "src", "assets", "img", "raw");
    fs.mkdirSync(RAWDIR, { recursive: true });
    fs.writeFileSync(path.join(RAWDIR, stem + "-master.webp"), Buffer.from(shot[0].data, "base64"));
    for (let i = 1; i < shot.length; i++) {
      fs.writeFileSync(path.join(OUT, stem + "-" + shot[i].w + ".webp"), Buffer.from(shot[i].data, "base64"));
    }
    const kb = Math.round(fs.statSync(path.join(OUT, stem + "-1280.webp")).size / 1024);
    console.log("   " + stem.padEnd(16) + " 1440x900 -> 3840 master + " + WIDE.join("/") + " (" + kb + " KB at 1280)");
    await ctx.close();
  }
  await browser.close();
})();
