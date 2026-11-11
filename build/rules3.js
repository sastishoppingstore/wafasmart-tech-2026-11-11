const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await p.goto('https://wafasmart.tech/tools/unit-converter', { waitUntil: 'networkidle' });
  const r = await p.evaluate(async () => {
    const res = await fetch('/tools/assets/tools.css?v=e0289ff4', { cache: 'no-store' });
    const txt = await res.text();
    return { len: txt.length, has640: txt.includes('max-width:640px'), hasOpts: txt.includes('.opts'), head: txt.slice(0, 120), sig: txt.slice(-200) };
  });
  console.log(JSON.stringify(r, null, 1));
  const sel = await p.evaluate(() => { const s = document.styleSheets[1]; const out=[]; for (let i=0;i<Math.min(6,s.cssRules.length);i++) out.push(s.cssRules[i].cssText.slice(0,150)); return out; });
  console.log(sel);
  await b.close();
})();
