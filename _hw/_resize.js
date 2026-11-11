const { chromium } = require("playwright");
const fs = require("fs");
(async () => {
  const b = await chromium.launch({args:["--no-sandbox","--disable-dev-shm-usage"]});
  const p = await b.newPage();
  const png = fs.readFileSync("vibe_images/haramway-hero_1793866309176_8f5eae75.png").toString("base64");
  const out = await p.evaluate(async (b64) => {
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = "data:image/png;base64," + b64; });
    const W = 1600, H = Math.round(img.naturalHeight * W / img.naturalWidth);
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    c.getContext("2d").drawImage(img, 0, 0, W, H);
    return c.toDataURL("image/webp", 0.85);
  }, png);
  await b.close();
  fs.writeFileSync("_hw/hero.b64", out.replace(/^data:image\/webp;base64,/, ""));
  console.log("wrote hero.b64", out.length, "data-uri chars");
})();
