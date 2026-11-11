const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const base = 'http://127.0.0.1:4173';
  const browser = await chromium.launch({ headless: true });
  const pages = fs.readdirSync(path.join(__dirname, '..', 'dist', 'tools'))
    .filter(f => f.endsWith('.html')).sort();
  const blogPages = fs.readdirSync(path.join(__dirname, '..', 'dist', 'blog')).filter(f => f.endsWith('.html')).sort();
  const all = ['/index.html', '/services.html', '/pricing.html', '/contact.html', '/about.html', '/portfolio.html', '/admin.html', '/blog.html', ...blogPages.map(f => '/blog/' + f), ...pages.map(f => '/tools/' + f)];
  const results = [];
  for (const route of all) {
    const ctx = await browser.newContext({ viewport: { width: 360, height: 844 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
    try {
      const resp = await page.goto(base + route, { waitUntil: 'load', timeout: 30000 });
      await page.waitForTimeout(500);
      const info = await page.evaluate(() => {
        const de = document.documentElement;
        const overflow = de.scrollWidth - window.innerWidth;
        const bad = [];
        document.querySelectorAll('button,a.btn,.btn,input,select,textarea').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (r.right > window.innerWidth + 1 || r.left < -1) bad.push({ tag: el.tagName, text: (el.textContent || el.value || '').trim().slice(0, 40), l: Math.round(r.left), r: Math.round(r.right) });
          const cs = getComputedStyle(el);
          if ((el.tagName === 'BUTTON' || el.classList.contains('btn')) && cs.overflow === 'hidden' && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1)) {
            bad.push({ tag: el.tagName, text: (el.textContent || '').trim().slice(0, 40), clip: true, sw: el.scrollWidth, cw: el.clientWidth, sh: el.scrollHeight, ch: el.clientHeight });
          }
        });
        return { title: document.title, overflow, bad: bad.slice(0, 15) };
      });
      results.push({ route, status: resp && resp.status(), errors, ...info });
    } catch (e) {
      results.push({ route, fatal: e.message, errors });
    }
    await ctx.close();
  }
  await browser.close();
  const bad = results.filter(r => r.fatal || r.errors.length || r.overflow > 1 || r.bad.length);
  console.log('pages:', results.length, 'problems:', bad.length);
  for (const r of bad) {
    console.log('\n### ' + r.route + (r.status ? ' [' + r.status + ']' : ''));
    if (r.fatal) console.log('  FATAL ' + r.fatal);
    if (r.overflow > 1) console.log('  OVERFLOW ' + r.overflow + 'px');
    if (r.errors.length) r.errors.slice(0, 5).forEach(e => console.log('  ' + e));
    (r.bad || []).forEach(b => console.log('  BAD ' + JSON.stringify(b)));
  }
})();
