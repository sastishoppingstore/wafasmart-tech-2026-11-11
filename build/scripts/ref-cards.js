/* Dump the full markup of one representative card from each reference component. */
const { chromium } = require("playwright");
const path = require("path");
const FILE = "file://" + path.join(process.cwd(), "sfiva-clone", "sfiva.ae", "index.html");
const SELS = ["section.hall", "nav.hall-portals .portal", ".cs-cert", ".qc", "section.signature",
  ".season-band .sb-card", "#new .p-card", "section.scene55", ".gift-tile", ".gs-film",
  "section.sd53", ".sc-card", ".house-tile", ".e55-door", ".pantry-tile", ".edit-card", ".bundle-card",
  ".ugc-card", ".rv-card", "section.easy-order", ".launch-card", ".grow-card", ".bb-card",
  "section.export-band", ".bq-card", ".bq-film", "#journal .j-card", ".news-band", "footer .ft-promise",
  "footer .footer-grid", "footer .ft-pay", "footer .ft-app", "footer .footer-cities", "footer .footer-bottom"];
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(FILE, { waitUntil: "load" });
  const out = await p.evaluate((sels) => sels.map(s => {
    const e = document.querySelector(s);
    return "\n########## " + s + "\n" + (e ? e.outerHTML.replace(/\s+/g, " ").slice(0, 2600) : "NOT FOUND");
  }).join("\n"), SELS);
  require("fs").writeFileSync("/tmp/ref-cards.txt", out);
  console.log("wrote", out.length, "bytes");
  await b.close();
})();
