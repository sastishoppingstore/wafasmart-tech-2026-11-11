const { chromium } = require("playwright");
const URL = "http://127.0.0.1:8199/index.html";

(async () => {
  const b = await chromium.launch();
  const out = {};
  for (const [name, vp] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: name === "mobile" ? 2 : 1, isMobile: name === "mobile", hasTouch: name === "mobile" });
    const p = await ctx.newPage();
    const errs = [], bad = [];
    p.on("console", m => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
    p.on("pageerror", e => errs.push("PAGEERROR " + String(e).slice(0, 200)));
    p.on("response", r => { const u = r.url(); if (r.status() >= 400 && !u.includes("favicon")) bad.push(r.status() + " " + u.replace("http://127.0.0.1:8199", "")); });
    p.on("requestfailed", r => bad.push("FAIL " + r.url().replace("http://127.0.0.1:8199", "") + " " + (r.failure() || {}).errorText));
    await p.goto(URL, { waitUntil: "networkidle" });
    await p.waitForTimeout(600);
    await p.screenshot({ path: `/tmp/home-${name}-top.png` });
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await p.waitForTimeout(500);
    await p.screenshot({ path: `/tmp/home-${name}-mid.png` });
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await p.waitForTimeout(700);
    await p.screenshot({ path: `/tmp/home-${name}-end.png` });
    await p.evaluate(() => window.scrollTo(0, 0));

    const audit = await p.evaluate(() => {
      const q = s => Array.from(document.querySelectorAll(s));
      const dead = q("a").filter(a => !a.getAttribute("href")).map(a => a.textContent.trim().slice(0, 40));
      const clone = q("img,source,video").filter(e => /assets\/(images|sfiva|videos)|sfiva/i.test(e.src || e.getAttribute("data-src") || "")).length;
      const imgsNoDim = q("img").filter(i => !i.getAttribute("width")).length;
      const off = q("body *").filter(e => e.getBoundingClientRect().right > document.documentElement.clientWidth + 2 && getComputedStyle(e).position !== "fixed").slice(0, 5).map(e => e.className && String(e.className).slice(0, 40));
      const face = document.querySelector(".cube .face.is-active");
      return {
        h1: q("h1").map(h => h.textContent.trim()),
        h2count: q("h2").length,
        sections: q("main > section").map(s => s.id || s.className.split(" ")[0]),
        cubeActive: face ? face.querySelector(".f-title").textContent : "none",
        dots: q(".cube-dot").length,
        cards: { services: q(".p-grid .p-card").length, packages: q(".bundle-card").length, work: q(".j-card").length, reviews: q(".rv-card").length, faqs: q(".faq-item").length, cities: q(".cg-list li").length, tools: q(".bb-card").length },
        deadLinks: dead, cloneRefs: clone, imgsNoDim, overflow: off,
        docH: document.body.scrollHeight,
        revealed: q("[data-reveal]").filter(e => e.classList.contains("is-visible")).length + "/" + q("[data-reveal]").length
      };
    });
    out[name] = { errs: [...new Set(errs)], bad: [...new Set(bad)], audit };
    if (name === "mobile") {
      await p.click("[data-open-mnav]");
      await p.waitForTimeout(400);
      await p.screenshot({ path: "/tmp/home-mobile-drawer.png" });
      await p.click("[data-close-mnav]");
      await p.waitForTimeout(200);
      await p.click(".cube-dot:nth-child(3)");
      await p.waitForTimeout(400);
      const after = await p.evaluate(() => document.querySelector(".cube .face.is-active .f-title").textContent.trim());
      out[name].cubeDot = after;
    }
    if (name === "desktop") {
      await p.click("[data-mega]");
      await p.waitForTimeout(350);
      await p.screenshot({ path: "/tmp/home-desktop-mega.png" });
      out[name].megaOpen = await p.evaluate(() => !document.querySelector("#megaMenu").hidden);
    }
    const perf = await p.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      const lcp = performance.getEntriesByType("largest-contentful-paint").slice(-1)[0];
      return { domReady: Math.round(nav.domContentLoadedEventEnd), load: Math.round(nav.loadEventEnd), lcp: lcp ? Math.round(lcp.startTime) : null };
    });
    out[name].perf = perf;
    await ctx.close();
  }
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})();
