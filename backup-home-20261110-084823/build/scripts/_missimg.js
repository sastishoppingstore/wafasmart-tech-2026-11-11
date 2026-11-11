const fs = require("fs"), path = require("path");
const pages = [];
const w = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
  const p = path.join(d, e.name);
  if (e.isDirectory()) { if (e.name !== "assets" && e.name !== "node_modules") w(p); }
  else if (/\.html$/.test(e.name)) pages.push(p);
});
w("dist");
const IMGRE = /assets\/img\/[^"'?)\s]+\.(?:webp|jpe?g|png)/g;
const miss = new Map();
for (const pg of pages) {
  const h = fs.readFileSync(pg, "utf8");
  const base = pg.replace(/^dist/, "").replace(/[^/]*$/, "");
  const rels = new Set();
  for (const m of h.matchAll(/(?:src|href|content)="([^"]+)"/g)) rels.add(m[1]);
  for (const m of h.matchAll(/srcset="([^"]+)"/g)) m[1].split(",").forEach(s => rels.add(s.trim().split(" ")[0]));
  for (const m of h.matchAll(/url\(([^)]+)\)/g)) rels.add(m[1].replace(/^['"]|['"]$/g, ""));
  for (const r of rels) {
    if (!r || r.startsWith("data:")) continue;
    const mm = r.match(IMGRE); if (!mm) continue;
    const imgpath = mm[0];
    const abs = r.startsWith("/") || /^https?:/.test(r) ? "/" + imgpath : path.posix.join(base, imgpath);
    if (!fs.existsSync("dist" + abs)) {
      if (!miss.has(abs)) miss.set(abs, new Set());
      miss.get(abs).add(pg.replace("dist/", ""));
    }
  }
}
console.log("distinct MISSING image files referenced in dist:", miss.size);
for (const [f, ps] of [...miss].sort()) console.log("  " + f + "   <- " + [...ps].slice(0, 5).join(", ") + (ps.size > 5 ? " …+" + (ps.size - 5) : ""));
