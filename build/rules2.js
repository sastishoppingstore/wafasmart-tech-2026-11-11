const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await p.goto('https://wafasmart.tech/tools/unit-converter', { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => {
    const el = document.querySelector('.opts');
    const sheets = [...document.styleSheets].map(s => {
      let info = { href: s.href, disabled: s.disabled, rules: -1, err: null, matches: [] };
      try {
        const list = s.cssRules; info.rules = list.length;
        const walk = (rl, cond) => { for (const rule of rl) {
          if (rule.type === 1 && rule.cssRules) { walk(rule.cssRules, rule.conditionText || cond); continue }
          if (!rule.selectorText) continue;
          if (!/\.opts\b|\.t-card\b|\.segs\b/.test(rule.selectorText)) continue;
          if (!rule.style) continue;
          info.matches.push({ sel: rule.selectorText, cond, gtc: rule.style.getPropertyValue('grid-template-columns'), mw: rule.style.getPropertyValue('max-width') });
        } };
        walk(list, null);
      } catch (e) { info.err = e.message }
      return info;
    });
    return { gtc: getComputedStyle(el).gridTemplateColumns, w: el.getBoundingClientRect().width, sheets };
  });
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})();
