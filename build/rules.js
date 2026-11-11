const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await p.goto('https://wafasmart.tech/tools/unit-converter', { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => {
    const el = document.querySelector('.opts');
    const rules = [];
    for (const sheet of document.styleSheets) {
      let list; try { list = sheet.cssRules } catch (e) { rules.push({ href: sheet.href, err: 'blocked' }); continue }
      const walk = (rl, ctx) => { for (const rule of rl) {
        if (rule.cssRules) { walk(rule.cssRules, rule.condition ? rule.condition.cssText : (rule.media ? rule.media.mediaText : ctx)); continue }
        if (rule.selectorText && el.matches(rule.selectorText.split(',').pop().trim() || 'x') ) {}
        if (rule.selectorText && /\.opts|\.t-card/.test(rule.selectorText) && /grid-template-columns|min-width|max-width|width/.test(rule.style ? rule.style.cssText : '')) rules.push({ sel: rule.selectorText, css: rule.style.cssText.slice(0,200), cond: ctx || null, href: sheet.href });
      } };
      walk(list, null);
    }
    return { n: document.styleSheets.length, rules, mq: { w640: matchMedia('(max-width:640px)').matches, w400: matchMedia('(max-width:400px)').matches } };
  });
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})();
