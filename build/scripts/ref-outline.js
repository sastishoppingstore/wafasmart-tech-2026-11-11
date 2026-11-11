/* Dump the reference homepage's section-by-section structure from the DOM. */
const { chromium } = require("playwright");
const path = require("path");
const FILE = "file://" + path.join(process.cwd(), "sfiva-clone", "sfiva.ae", "index.html");
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(FILE, { waitUntil: "load" });
  const out = await p.evaluate(() => {
    const name = e => e.tagName.toLowerCase() + (e.id ? "#" + e.id : "") +
      [...e.classList].map(c => "." + c).join("");
    const skel = (e, d, max) => {
      const kids = [...e.children].filter(c => !["script", "style", "noscript", "template"].includes(c.tagName.toLowerCase()));
      let s = "";
      kids.forEach(c => {
        const line = "  ".repeat(d) + name(c);
        const txt = c.children.length === 0 ? "  «" + (c.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60) + "»" : "";
        s += "\n" + line + txt;
        if (d < max) s += skel(c, d + 1, max);
      });
      return s;
    };
    const bg = e => { const s = getComputedStyle(e); return s.backgroundColor + " | " + s.backgroundImage.slice(0, 70) + " | pad " + s.paddingTop + "/" + s.paddingBottom; };
    return [...document.querySelectorAll("body > *:is(section, header, footer), main > section, main > div")].map(e => ({
      sec: name(e),
      h: Math.round(e.getBoundingClientRect().height),
      bg: bg(e),
      structure: skel(e, 0, 3)
    }));
  });
  out.forEach(o => console.log("\n==== " + o.sec + "  [h=" + o.h + "]\n  bg: " + o.bg + o.structure));
  await b.close();
})();
