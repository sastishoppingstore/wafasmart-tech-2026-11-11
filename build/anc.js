const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await p.goto('https://wafasmart.tech/tools/unit-converter', { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => {
    let el = document.querySelector('.t-card'), out = [];
    while (el && el !== document.documentElement) {
      const cs = getComputedStyle(el), b2 = el.getBoundingClientRect();
      out.push({ tag: el.tagName.toLowerCase(), cls: (el.className || '').toString().slice(0, 60), w: Math.round(b2.width), left: Math.round(b2.left), display: cs.display, gtc: cs.gridTemplateColumns, minW: cs.minWidth, width: cs.width, maxW: cs.maxWidth, pos: cs.position });
      el = el.parentElement;
    }
    return out;
  });
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})();
