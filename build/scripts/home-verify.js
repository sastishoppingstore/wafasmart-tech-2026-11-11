#!/usr/bin/env node
/* home-verify — browser check of the home page served from dist/ (needs a static server on URL).
 * Usage: node build/scripts/home-verify.js [url] [chromium-exe]
 * Reports console/page errors, horizontal overflow, text blocks still >2 lines without a 3D box,
 * 3D box count, and images rendered larger than their natural width (blur risk) at 390 and 1440 px.
 */
const path = require("path");
const fs = require("fs");
const os = require("os");

const { chromium } = require(path.join(__dirname, "..", "..", "node_modules", "playwright"));
const URL = process.argv[2] || "http://127.0.0.1:8199/index.html";
const home = os.homedir();
const guess = () => {
  const dir = path.join(home, ".cache", "ms-playwright");
  const d = fs.readdirSync(dir).filter(x => /^chromium-\d+$/.test(x)).sort().pop();
  return path.join(dir, d, "chrome-linux", "chrome");
};
const EXE = process.argv[3] || guess();

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox"] });
  const out = {};
  for (const [name, vp, dpr] of [["mobile390", { width: 390, height: 844 }, 2], ["desktop1440", { width: 1440, height: 900 }, 1]]) {
    const page = await browser.newPage({ viewport: vp, deviceScaleFactor: dpr });
    const errors = [];
    page.on("pageerror", e => errors.push("pageerror: " + String(e).slice(0, 160)));
    page.on("console", m => { if (m.type() === "error") errors.push("console: " + m.text().slice(0, 160)); });
    await page.goto(URL, { waitUntil: "load" });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(1200);
    out[name] = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      const boxes = document.querySelectorAll(".tb3d").length;
      const unboxed = [];
      document.querySelectorAll("body p, body li, body blockquote, body figcaption").forEach(el => {
        if (el.classList.contains("tb3d") || el.closest(".wst-cube-root, nav, header, footer, .btn, button, .box3d")) return;
        if (el.querySelector("p, div, ul, ol, section") || !el.textContent.trim() || !el.getBoundingClientRect().width) return;
        const cs = getComputedStyle(el); const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.4;
        const lines = Math.round(el.getBoundingClientRect().height / lh);
        if (lines > 2) unboxed.push(el.textContent.trim().slice(0, 50) + " [" + lines + "]");
      });
      const blurry = [];
      document.querySelectorAll("img").forEach(i => {
        const r = i.getBoundingClientRect(); if (!r.width || !i.naturalWidth) return;
        const need = r.width * devicePixelRatio;
        /* srcset images: naturalWidth is density-scaled, so use the real file width from the chosen candidate */
        let real = i.naturalWidth;
        if (i.srcset && i.currentSrc) {
          const hit = i.srcset.split(",").map(s => s.trim().split(/\s+/)).find(p => i.currentSrc.endsWith(p[0]));
          if (hit && hit[1]) real = parseInt(hit[1], 10);
        }
        if (real < need * 0.95 && r.width > 60) blurry.push(i.getAttribute("src").split("/").pop() + " real=" + real + " need=" + Math.round(need));
      });
      const brokenImgs = Array.from(document.querySelectorAll("img")).filter(i => i.complete && i.getAttribute("src") && i.naturalWidth === 0).map(i => i.getAttribute("src"));
      return { overflowPx: overflow, tb3dBoxes: boxes, textOver2LinesNotBoxed: unboxed.length, unboxedSample: unboxed.slice(0, 8), blurryCount: blurry.length, blurrySample: blurry.slice(0, 10), brokenImgs: brokenImgs.slice(0, 5) };
    });
    out[name].errors = errors.slice(0, 6);
    await page.close();
  }
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})().catch(e => { console.error("FAIL", e.message.slice(0, 300)); process.exit(1); });
