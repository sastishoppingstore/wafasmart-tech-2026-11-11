/* ------------------------------------------------------------------
   build/scripts/brand-kit.js — our own logo, app icons and social card.

   Everything is drawn from scratch: an SVG "W" badge rasterised by
   Chromium plus canvas text set in the fonts the site already ships.
   Masters are written at 4K into build/src/assets/img/raw, the sizes the
   site references into dist/assets/img.

     node build/scripts/brand-kit.js
   ------------------------------------------------------------------ */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..", "..");
const FONTS = path.join(ROOT, "build", "src", "fonts");
const RAW = path.join(ROOT, "build", "src", "assets", "img", "raw");
const OUT = path.join(ROOT, "dist", "assets", "img");

const NAVY = ["#04101f", "#0a1c34", "#122b4d"];
const GOLD = ["#fbeecb", "#e8cf8e", "#d9b96c", "#a97f36"];

/* the mark: a bold W cut from two gold strokes over an emerald glow */
function badgeSVG(pad) {
  const s = 1024, k = Math.round(s * pad);
  const x0 = k + 128, x1 = s - k - 128, mid = s / 2;
  const top = k + 150, bot = s - k - 150, dip = k + (bot - k - top) * 0.42;
  const w = Math.round((s - 2 * k) * 0.135);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 ${s} ${s}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${NAVY[2]}"/><stop offset=".55" stop-color="${NAVY[1]}"/><stop offset="1" stop-color="${NAVY[0]}"/>
  </linearGradient>
  <linearGradient id="au" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${GOLD[0]}"/><stop offset=".45" stop-color="${GOLD[2]}"/><stop offset="1" stop-color="${GOLD[3]}"/>
  </linearGradient>
  <radialGradient id="gl" cx=".5" cy=".62" r=".5">
    <stop offset="0" stop-color="#1fbf7a" stop-opacity=".5"/><stop offset="1" stop-color="#1fbf7a" stop-opacity="0"/>
  </radialGradient>
  <filter id="sh" x="-30%" y="-30%" width="160%" height="160%">
    <feDropShadow dx="0" dy="14" stdDeviation="22" flood-color="#000" flood-opacity=".55"/>
  </filter>
</defs>
<rect width="${s}" height="${s}" rx="${Math.round(s * 0.22)}" fill="url(#bg)"/>
<rect x="18" y="18" width="${s - 36}" height="${s - 36}" rx="${Math.round(s * 0.2) - 12}" fill="none" stroke="${GOLD[2]}" stroke-opacity=".38" stroke-width="6"/>
<circle cx="${mid}" cy="${s * 0.6}" r="${s * 0.42}" fill="url(#gl)"/>
<g stroke="url(#au)" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#sh)">
  <path d="M${x0} ${top} L${x0 + (mid - x0) * 0.62} ${bot} L${mid} ${dip}"/>
  <path d="M${mid} ${dip} L${x1 - (x1 - mid) * 0.62} ${bot} L${x1} ${top}"/>
</g>
<g fill="${GOLD[1]}" opacity=".85">
  <circle cx="${x0}" cy="${top}" r="${w * 0.22}"/><circle cx="${x1}" cy="${top}" r="${w * 0.22}"/>
  <circle cx="${mid}" cy="${dip}" r="${w * 0.26}"/>
</g>
</svg>`;
}

const write = (file, dataUrl) => fs.writeFileSync(file, Buffer.from(dataUrl.split(",")[1], "base64"));

(async () => {
  fs.mkdirSync(RAW, { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  const page = await b.newPage();

  const face = (fam, f, wt) => {
    const b64 = fs.readFileSync(path.join(FONTS, f)).toString("base64");
    return `@font-face{font-family:"${fam}";src:url(data:font/woff2;base64,${b64}) format("woff2");font-weight:${wt};font-style:normal}`;
  };
  await page.setContent(`<style>${face("Cinzel", "cinzel-latin-500.woff2", 500)}${face("Inter", "inter-latin-567244.woff2", 400)}${face("Inter", "inter-latin-567244.woff2", 700)}</style><canvas id=c></canvas>`);
  await page.evaluate(() => Promise.all([document.fonts.load('500 40px Cinzel'), document.fonts.load('700 40px Inter')]).then(() => document.fonts.ready));

  /* ---------- badge at every size the site asks for ---------- */
  const sizes = [
    ["logo.webp", 512, "webp", 0.9], ["logo.png", 512, "png", 0],
    ["icon-512.png", 512, "png", 0], ["icon-192.png", 192, "png", 0],
    ["apple-touch-icon.png", 180, "png", 0], ["favicon-32.png", 32, "png", 0],
    ["favicon-16.png", 16, "png", 0], ["logo-master.webp", 3840, "webp", 0.86]
  ];
  for (const [name, size, fmt, q] of sizes) {
    const url = await page.evaluate(async ([svg, size, fmt, q]) => {
      const img = new Image();
      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
      await img.decode();
      const c = document.getElementById("c");
      c.width = size; c.height = size;
      const x = c.getContext("2d");
      x.imageSmoothingEnabled = true; x.imageSmoothingQuality = "high";
      x.drawImage(img, 0, 0, size, size);
      return c.toDataURL("image/" + fmt, q || undefined);
    }, [badgeSVG(name === "icon-maskable-512.png" ? 0.18 : 0.02), size, fmt, q]);
    const dest = path.join(name.endsWith("master.webp") ? RAW : OUT, name);
    write(dest, url);
    console.log(name.padEnd(22), size + "px", Math.round(fs.statSync(dest).size / 1024) + " KB");
  }

  /* maskable needs its own padded render */
  {
    const url = await page.evaluate(async ([svg, size, fmt]) => {
      const img = new Image();
      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
      await img.decode();
      const c = document.getElementById("c");
      c.width = size; c.height = size;
      c.getContext("2d").drawImage(img, 0, 0, size, size);
      return c.toDataURL("image/" + fmt, 0.95);
    }, [badgeSVG(0.16), 512, "png"]);
    write(path.join(OUT, "icon-maskable-512.png"), url);
    console.log("icon-maskable-512.png  512px", Math.round(fs.statSync(path.join(OUT, "icon-maskable-512.png")).size / 1024) + " KB");
  }

  /* ---------- social card (og-cover) ---------- */
  const card = async (W, H, file, type, q) => {
    const url = await page.evaluate(async ([svg, W, H, type, q]) => {
      const img = new Image();
      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
      await img.decode();
      const c = document.getElementById("c");
      c.width = W; c.height = H;
      const x = c.getContext("2d");
      x.imageSmoothingEnabled = true; x.imageSmoothingQuality = "high";

      const g = x.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#04101f"); g.addColorStop(.5, "#0a1c34"); g.addColorStop(1, "#06132a");
      x.fillStyle = g; x.fillRect(0, 0, W, H);
      const rg = x.createRadialGradient(W * .82, H * .78, 10, W * .82, H * .78, W * .55);
      rg.addColorStop(0, "rgba(217,185,108,.22)"); rg.addColorStop(1, "rgba(217,185,108,0)");
      x.fillStyle = rg; x.fillRect(0, 0, W, H);
      x.strokeStyle = "rgba(217,185,108,.16)"; x.lineWidth = Math.max(1, W / 1200);
      for (let i = 1; i < 8; i++) { x.beginPath(); x.moveTo(0, H * i / 8); x.lineTo(W, H * i / 8); x.stroke(); }

      const pad = W * .05, mark = H * .40;
      x.drawImage(img, pad, H * .16, mark, mark);

      const tx = pad + mark + W * .045;
      const maxW = W - tx - pad;
      x.textBaseline = "alphabetic";
      /* every line is measured and shrunk until it fits the card */
      const fit = (t, spec, px) => {
        let s = px;
        do { x.font = spec.replace("%", Math.round(s) + "px"); if (x.measureText(t).width <= maxW) break; s *= 0.96; } while (s > px * 0.4);
        return s;
      };
      const line = (t, spec, px, color, y) => {
        const s = fit(t, spec, px);
        x.font = spec.replace("%", Math.round(s) + "px");
        x.fillStyle = color;
        x.fillText(t, tx, y);
        return s;
      };

      line("Wafa Smart Tech\u2122", "500 % Cinzel", H * .145, "#f7ead0", H * .3);
      line("Websites \u00b7 AI agents \u00b7 Android, iOS & Windows apps", "400 % Inter", H * .058, "#cfe3d8", H * .395);
      line("Fixed PKR 14,000 \u2014 3 free demo designs first", "700 % Inter", H * .075, "#e8cf8e", H * .53);

      const chips = ["Domain free for 1 year", "100% source code", "Lahore \u00b7 Saudi Arabia \u00b7 UAE", "43 free browser tools"];
      let cx = tx, cy = H * .605, ch = H * .08;
      x.font = `400 ${Math.round(H * .04)}px Inter`;
      chips.forEach(t => {
        const w = x.measureText(t).width + ch * 1.1;
        if (cx + w > W - pad) { cx = tx; cy += ch * 1.35; }
        x.strokeStyle = "rgba(217,185,108,.5)"; x.lineWidth = Math.max(1, W / 900);
        x.beginPath(); x.roundRect(cx, cy, w, ch, ch / 2); x.stroke();
        x.fillStyle = "#f3e3b8"; x.fillText(t, cx + ch * .55, cy + ch * .63);
        cx += w + H * .022;
      });

      x.fillStyle = "rgba(243,227,184,.85)";
      x.font = `700 ${Math.round(H * .046)}px Inter`;
      x.fillText("wafasmart.tech", pad, H * .9);
      x.textAlign = "right";
      x.fillStyle = "rgba(207,227,216,.7)";
      x.font = `400 ${Math.round(H * .04)}px Inter`;
      x.fillText("AWS & Google certified \u00b7 ZATCA-registered (KSA)", W - pad, H * .9);
      x.textAlign = "left";
      return c.toDataURL("image/" + type, q);
    }, [badgeSVG(0.02), W, H, type, q]);
    write(file, url);
    console.log(path.basename(file), W + "x" + H, Math.round(fs.statSync(file).size / 1024) + " KB");
  };
  await card(3840, 2016, path.join(RAW, "og-cover-master.webp"), "webp", 0.9);
  await card(1200, 630, path.join(OUT, "og-cover.jpg"), "jpeg", 0.86);

  await b.close();
})();
