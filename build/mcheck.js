const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [name, w, h] of [['iphone', 390, 844], ['small', 360, 740]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
    const errs = [];
    p.on('console', m => m.type() === 'error' && errs.push(m.text().slice(0, 160)));
    p.on('pageerror', e => errs.push('PAGEERR ' + e.message.slice(0, 160)));
    await p.goto('https://wafasmart.tech/tools/unit-converter', { waitUntil: 'networkidle' });
    const r = await p.evaluate((vw) => {
      const wide = [];
      document.querySelectorAll('body *').forEach(el => {
        const b = el.getBoundingClientRect();
        if (b.right > vw + 1 && b.width > 20 && getComputedStyle(el).position !== 'fixed') {
          wide.push({ sel: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : ''), right: Math.round(b.right), width: Math.round(b.width), sw: el.scrollWidth, cw: el.clientWidth });
        }
      });
      return { docSW: document.documentElement.scrollWidth, vw, inner: window.innerWidth, overflowX: document.scrollingElement.scrollLeft, wide: wide.slice(0, 12), bodyH: document.body.scrollHeight };
    }, w);
    console.log('===', name, JSON.stringify(r, null, 1));
    console.log('errors:', errs.slice(0, 6));
    await p.screenshot({ path: `/tmp/uc-${name}.png`, fullPage: false });
    await p.close();
  }
  await b.close();
})();
