// One-off: copies the live perf-opt <style> block from dist/index.html into build/src/home/perf-opt.css
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..", "..");
const h = fs.readFileSync(path.join(root, "dist", "index.html"), "utf8");
const m = h.match(/<style id="perf-opt">([\s\S]*?)<\/style>/);
if (!m) throw new Error("perf-opt not found");
fs.writeFileSync(path.join(root, "build", "src", "home", "perf-opt.css"), m[1].trim() + "\n");
console.log("saved perf-opt.css", m[1].length, "bytes");
