/* scratch: same photos, routed through the real pipeline at a smaller width */
const { chromium } = require("playwright");
const https = require("https");
const ORIGIN = "https://ustock.local.test";

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { "User-Agent": "x" } }, r => {
      const c = [];
      r.on("data", d => c.push(d));
      r.on("end", () => res(Buffer.concat(c)));
      r.on("error", rej);
    }).on("error", rej);
  });
}

const IDS = ["photo-1507003211169-0a1dd7228f2d", "photo-1500530855697-b586d89ba3ee", "photo-1584556812952-905ffd0c611a"];

(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext()).newPage();
  for (const id of IDS) {
    for (const w of [800, 1600, 2400]) {
      const buf = await get(`https://images.unsplash.com/${id}?fm=jpg&q=80&w=${w}&fit=max`);
      await p.route(ORIGIN + "/**", r => r.request().url() === ORIGIN + "/img"
        ? r.fulfill({ status: 200, body: buf, contentType: "image/jpeg" })
        : r.fulfill({ status: 200, contentType: "text/html", body: "<body></body>" }));
      await p.goto(ORIGIN + "/");
      const out = await p.evaluate(async () => {
        const i = new Image(); i.src = "/img";
        try { await i.decode(); return i.naturalWidth + "x" + i.naturalHeight; } catch (e) { return "FAIL"; }
      });
      await p.unroute(ORIGIN + "/**");
      console.log(id.slice(0, 28).padEnd(30), ("w=" + w).padEnd(7), (buf.length / 1024).toFixed(0).padStart(6) + " KB", out);
    }
  }
  await b.close();
})();
