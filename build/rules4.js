const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await p.goto('https://wafasmart.tech/tools/unit-converter', { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => {
    const el = document.querySelector('.opts');
    const out = [];
    const walk = (rl, cond) => { for (const rule of rl) {
      if (rule.cssRules && !rule.selectorText) { walk(rule.cssRules, rule.conditionText || cond); continue }
      if (!rule.selectorText || !rule.style) continue;
      if (!rule.selectorText.split(',').some(s => { try { return el.matches(s.trim()) } catch { return false } })) return;
      out.push({ cond, sel: rule.selectorText.slice(0, 70), gtc: rule.style.getPropertyValue('grid-template-columns') || null, minw: rule.style.getPropertyValue('min-width') || null });
    } };
    for (const s of document.styleSheets) { try { walk(s.cssRules, s.href && s.href.includes('tools.css') ? 'TOOLS' : (s.href||'inline')) } catch (e) {} }
    const cs = getComputedStyle(el);
    const kids = [...el.children].map(c => ({ t: c.tagName + '.' + (c.className || '').toString().slice(0, 25), mw: getComputedStyle(c).minWidth, mc: c.scrollWidth, gc: getComputedStyle(c).gridColumn }));
    return { computed: cs.gridTemplateColumns, nChildren: el.children.length, out, kids, mainCls: document.querySelector('main')?.className, hasToolsMain: !!document.querySelector('.tools-main') };
  });
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})();
