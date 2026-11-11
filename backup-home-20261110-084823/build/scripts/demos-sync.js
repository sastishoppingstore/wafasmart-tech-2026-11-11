/* ------------------------------------------------------------------
   build/scripts/demos-sync.js — publish the demo builds in demos/ to
   their existing URLs without touching anything already live.

   demos/demoN.html          -> dist/demoN/index.html
   demos/<pack>/demoN.html   -> dist/demoN/index.html
   demos/<name>/*.html       -> dist/<name>/*.html

   Add-only: a file that already exists in dist is never overwritten, so
   links that are already live keep pointing at the same bytes.

     node build/scripts/demos-sync.js
   ------------------------------------------------------------------ */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const SRC = path.join(ROOT, "demos");
const DIST = path.join(ROOT, "dist");

const written = [], skipped = [];

function place(srcFile, destFile) {
  if (fs.existsSync(destFile)) { skipped.push(path.relative(DIST, destFile)); return; }
  fs.mkdirSync(path.dirname(destFile), { recursive: true });
  fs.copyFileSync(srcFile, destFile);
  written.push(path.relative(DIST, destFile) + "  <- demos/" + path.relative(SRC, srcFile));
}

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) { walk(f); continue; }
    if (!/\.html?$/i.test(e.name)) continue;
    const single = f.match(/(^|[\\/])demo(\d+)\.html$/i);
    if (single) place(f, path.join(DIST, "demo" + single[2], "index.html"));
    else {
      const pack = path.relative(SRC, path.dirname(f)).split(path.sep)[0];
      place(f, path.join(DIST, pack, e.name));
    }
  }
}

if (!fs.existsSync(SRC)) { console.log("no demos/ folder"); process.exit(0); }
walk(SRC);
console.log("published " + written.length + " demo file(s):");
written.forEach(w => console.log("  + " + w));
if (skipped.length) console.log("left untouched (already live): " + skipped.length + " file(s)");
