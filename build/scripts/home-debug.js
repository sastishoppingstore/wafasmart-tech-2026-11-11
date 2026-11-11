#!/usr/bin/env node
// Debug helper: check raw decoded size of a file in the browser, and what the page's img elements report.
const path = require("path");
const fs = require("fs");
const { chromium } = require(path.join(__dirname, "..", "..", "node_modules", "playwright"));
const dir = path.join(require("os").homedir(), ".cache", "ms-playwright");
const exe = path.join(dir, fs.readdirSync(dir).filter(x => /^chromium-\d+$/.test(x)).sort().pop(), "chrome-linux", "chrome");
(async () => {
  const b = await chromium.launch({ executablePath: exe, args: ["--no-sandbox"] });
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await p.goto("http://127.0.0.1:8199/index.html", { waitUntil: "load" });
  const raw = await p.evaluate(() => new Promise(res => { const i = new Image(); i.onload = () => res({ nat: i.naturalWidth }); i.onerror = () => res("err"); i.src = "/assets/img/service-website-640.webp"; }));
  console.log("raw 640 file in browser:", JSON.stringify(raw));
  const els = await p.evaluate(() => Array.from(document.querySelectorAll('img')).filter(i => /service-website/.test(i.currentSrc)).slice(0, 2).map(i => ({ src: i.getAttribute("src"), srcset: (i.getAttribute("srcset") || "").slice(0, 300), cw: i.currentSrc, nat: i.naturalWidth, nh: i.naturalHeight })));
  console.log(JSON.stringify(els, null, 1));
  await b.close();
})();
