const fs = require("fs");
for (const u of ["index.html", "demos.html"]) {
  let j; try { j = JSON.parse(fs.readFileSync("/tmp/lh-" + u + ".json", "utf8")); } catch (e) { console.log(u, "NO REPORT"); continue; }
  const a = j.audits;
  console.log("=== " + u + " ===");
  console.log(" perf:", Math.round(j.categories.performance.score * 100),
    "| FCP", a["first-contentful-paint"].displayValue,
    "| LCP", a["largest-contentful-paint"].displayValue,
    "| SI", a["speed-index"].displayValue,
    "| TBT", a["total-blocking-time"].displayValue,
    "| CLS", a["cumulative-layout-shift"].displayValue);
  const rb = a["render-blocking-resources"];
  if (rb) console.log(" render-blocking:", rb.displayValue || "none", "(score " + rb.score + ")");
  const ia = j.categories.accessibility;
  if (ia && ia.score != null) console.log(" a11y:", Math.round(ia.score * 100));
  a["largest-contentful-paint-element"].details.items.forEach(g => {
    if (Array.isArray(g.items) && g.items[0] && g.items[0].phase)
      g.items.forEach(p => console.log("   LCP " + String(p.phase).padEnd(12), Math.round(p.timing) + "ms"));
  });
}
