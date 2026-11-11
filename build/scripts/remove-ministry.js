#!/usr/bin/env node
/* One-off: removes the "IT Ministry, Govt. of Pakistan" credential wording from VISIBLE text
 * (dist/*.html and build/src source). JSON-LD lines (SEO schema) and protected pages are skipped.
 * Rollback: copy from backup-home-20261110-084823/ (dist/) and index.before-v2.html.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..", "..");

const PROTECTED = /^(demo(\d+)|school\d*|spgroup)[^/]*\.html$/;
const isProtected = f => {
  const b = path.basename(f);
  if (PROTECTED.test(b)) {
    const n = (b.match(/^demo(\d+)/) || [])[1];
    return !n || (+n >= 1 && +n <= 13) || (+n >= 20 && +n <= 42) || +n === 60 || !/^demo/.test(b);
  }
  return false;
};

// order matters: longest / most specific first
const RULES = [
  [/ ?\(Software Engineer, IT Ministry, Govt\. of Pakistan\)/g, " (Software Engineer)"],
  [/Software Engineer · IT Ministry, Govt\. of Pakistan/g, "Software Engineer"],
  [/Software Engineer, IT Ministry, Govt\. of Pakistan/g, "Software Engineer"],
  [/سافٹ ویئر انجینئر · آئی ٹی وزارت، حکومتِ پاکستان/g, "سافٹ ویئر انجینئر"],
  [/"IT Ministry, Govt\. of Pakistan", ?/g, ""],
  [/ · IT Ministry, Govt\. of Pakistan/g, ""],
  [/ · آئی ٹی وزارت، حکومتِ پاکستان/g, ""],
  [/ ?\(IT Ministry, Govt\. of Pakistan\)/g, ""],
  [/ ?\(آئی ٹی وزارت، حکومتِ پاکستان\)/g, ""],
  [/, IT Ministry, Govt\. of Pakistan/g, ""],
  [/, IT Ministry experience/g, ""],
  [/IT Ministry experience,? and /g, ""],
  [/ ,/g, ","],
];

const targets = [];
for (const f of fs.readdirSync(path.join(ROOT, "dist"))) {
  if (f.endsWith(".html") && !isProtected(f)) targets.push(path.join(ROOT, "dist", f));
}
for (const f of ["build/src/index-3d.html", "build/src/data/site.js", "build/src/data/landing.js"]) {
  targets.push(path.join(ROOT, f));
}

let changedFiles = 0, changedLines = 0;
for (const f of targets) {
  if (!fs.existsSync(f)) continue;
  const src = fs.readFileSync(f, "utf8");
  const lines = src.split("\n");
  let touched = 0;
  const out = lines.map(line => {
    if (/ld\+json/.test(line) || !/آئی ٹی وزارت|IT Ministry/.test(line)) return line;
    let l = line;
    for (const [re, to] of RULES) l = l.replace(re, to);
    if (l !== line) touched++;
    return l;
  });
  if (touched) {
    fs.writeFileSync(f, out.join("\n"));
    changedFiles++;
    changedLines += touched;
  }
}
console.log(`changed ${changedLines} lines in ${changedFiles} files`);
