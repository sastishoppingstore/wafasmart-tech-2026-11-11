"use strict";
/* Builds branded SVG hero graphics for the /blog/info guide cluster.
   These replace AI-generated photos: they are tiny, on-theme (navy + gold +
   green, matching 3d.css) and carry no copyright or hotlink risk.
   Usage: node build/info-images.js */
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "dist", "assets", "img");
fs.mkdirSync(OUT, { recursive: true });

const GOLD = "#ffc83d";
const GREEN = "#25d366";
const BLUE = "#5aa2ff";

/* ---- small drawing helpers (coordinate space is roughly -150..150) ---- */
const R = (x, y, w, h, r, fill, extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const C = (cx, cy, r, fill, extra = "") =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra}/>`;

/* A soft monoline glyph per topic. `a` is the accent colour. */
function glyph(kind, a) {
  const glass = "rgba(255,255,255,.10)";
  const dark = "rgba(6,12,28,.72)";
  switch (kind) {
    case "sim-check": // phone with a SIM floating above it
      return `
        ${R(-70, -80, 150, 250, 24, glass, 'stroke="rgba(255,255,255,.25)" stroke-width="2"')}
        ${R(-54, -62, 118, 214, 15, dark)}
        ${C(0, 128, 7, "rgba(255,255,255,.5)")}
        ${R(-40, -20, 96, 60, 10, "rgba(255,255,255,.10)")}
        ${R(-30, 120, 50, 80, 14, a, 'opacity=".95"')}
        ${C(-16, 150, 8, dark)}
        ${C(6, 150, 8, dark)}
        ${R(-30, 128, 50, 8, 4, "rgba(255,255,255,.3)")}
        ${C(60, -120, 26, a, 'opacity=".22"')}
        ${R(62, -138, 10, 10, 3, a)}
        ${C(-96, 60, 18, a, 'opacity=".18"')}`;
    case "sim-owner": // CNIC card + SIM + shield
      return `
        ${R(-150, -60, 210, 132, 18, glass, 'stroke="rgba(255,255,255,.25)" stroke-width="2"')}
        ${C(-108, -18, 30, dark)}${C(-108, -26, 11, a)}${C(-108, -4, 15, "rgba(255,255,255,.14)")}
        ${R(-60, -30, 96, 12, 6, "rgba(255,255,255,.28)")}
        ${R(-60, 0, 76, 10, 5, "rgba(255,255,255,.18)")}
        ${R(-60, 24, 88, 10, 5, "rgba(255,255,255,.18)")}
        ${R(40, 40, 78, 92, 14, a, 'opacity=".92"')}
        ${C(58, 60, 7, dark)}${R(52, 74, 54, 7, 3, dark)}${R(52, 88, 40, 7, 3, dark)}
        ${C(120, -110, 30, a, 'opacity=".2"')}
        <path d="M122 -128 l20 10 v22 c0 18 -12 28 -20 33 c-8 -5 -20 -15 -20 -33 v-22 z" fill="${a}" opacity=".9"/>`;
    case "mobile-codes": // keypad tiles + check
      { let t = "";
        const cols = [-96, -32, 32], rows = [-70, -6, 58, 122];
        rows.forEach((y, ri) => cols.forEach((x, ci) => {
          const on = (ri + ci) % 3 === 0;
          t += R(x, y, 52, 52, 14, on ? a : glass, on ? 'opacity=".92"' : 'stroke="rgba(255,255,255,.18)" stroke-width="1.5"');
        }));
        return `${t}
        <path d="M-150 -110 l30 30 l60 -70" fill="none" stroke="${a}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
        ${C(120, 96, 34, a, 'opacity=".25"')}
        <path d="M104 96 l12 14 l22 -30" fill="none" stroke="${GREEN}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`; }
    case "bisp-payment": // cash + coin
      return `
        ${R(-140, -10, 210, 96, 16, glass, 'stroke="rgba(255,255,255,.22)" stroke-width="2"')}
        ${R(-118, 12, 166, 54, 10, "rgba(255,255,255,.08)")}
        ${C(-35, 39, 20, a, 'opacity=".85"')}
        ${R(40, -46, 200, 100, 16, a, 'opacity=".9"')}
        ${R(62, -26, 156, 60, 10, dark)}
        ${C(140, 4, 22, a)}${C(140, 4, 12, dark)}
        ${C(-120, -90, 40, GOLD, 'opacity=".9"')}${C(-120, -90, 24, "#c98a00")}${C(-120, -90, 14, "#fff0bd")}
        ${C(140, 100, 22, GOLD, 'opacity=".25"')}`;
    case "bisp-registration": // counter + person + form
      return `
        ${R(-160, 60, 320, 26, 12, a, 'opacity=".9"')}
        ${R(-160, 86, 320, 40, 10, "rgba(255,255,255,.09)")}
        ${R(-120, 20, 80, 46, 8, glass, 'stroke="rgba(255,255,255,.22)" stroke-width="1.6"')}
        ${R(-108, 32, 56, 6, 3, "rgba(255,255,255,.28)")}${R(-108, 46, 40, 6, 3, "rgba(255,255,255,.2)")}
        ${C(84, -60, 30, a, 'opacity=".9"')}
        <path d="M84 6 c-30 0 -52 20 -58 54 h116 c-6 -34 -28 -54 -58 -54 z" fill="${a}" opacity=".9"/>
        ${C(-30, -70, 26, "rgba(255,255,255,.22)")}
        <path d="M-30 -16 c-24 0 -42 16 -46 44 h92 c-4 -28 -22 -44 -46 -44 z" fill="rgba(255,255,255,.22)"/>
        ${R(96, -150, 58, 46, 8, GOLD, 'opacity=".3"')}`;
    case "education-stipend": // books + graduation cap + coin
      return `
        ${R(-150, 70, 200, 26, 8, "rgba(255,255,255,.16)")}
        ${R(-140, 40, 180, 26, 8, "rgba(255,255,255,.24)")}
        ${R(-130, 10, 160, 26, 8, a, 'opacity=".8"')}
        <path d="M-50 -80 l150 44 l-150 44 l-150 -44 z" fill="${a}" opacity=".95"/>
        <path d="M-50 -80 l150 44 l-150 44 z" fill="rgba(0,0,0,.14)"/>
        ${R(-42, -4, 84, 16, 8, dark)}
        <path d="M96 -70 v60" stroke="${GOLD}" stroke-width="8" stroke-linecap="round"/>
        ${C(96, -4, 14, GOLD)}
        ${C(120, 110, 26, GOLD, 'opacity=".28"')}
        ${C(-140, -40, 20, GOLD, 'opacity=".2"')}`;
    case "farmer-card": // field rows + sun + card
      return `
        ${C(-110, -100, 34, GOLD, 'opacity=".9"')}
        ${Array.from({ length: 18 }, (_, i) => (i % 2 ? "" : `<line x1="${-170}" y1="${-10 + i * 11}" x2="170" y2="${-10 + i * 11}" stroke="${GREEN}" stroke-width="3" opacity=".28"/>`)).join("")}
        <path d="M-40 40 c-4 -50 20 -84 60 -96 c4 46 -18 84 -60 96 z" fill="${GREEN}" opacity=".85"/>
        <path d="M-40 40 c30 -30 52 -52 60 -96" stroke="rgba(0,0,0,.2)" stroke-width="4" fill="none"/>
        ${R(40, -70, 130, 96, 14, a, 'opacity=".92"')}
        ${R(58, -50, 94, 12, 6, dark)}${R(58, -26, 70, 10, 5, dark)}${C(150, 6, 16, GOLD)}`;
    case "welfare-card": // heart in hands + card
      return `
        ${R(-150, -20, 190, 120, 16, glass, 'stroke="rgba(255,255,255,.22)" stroke-width="2"')}
        ${R(-128, 0, 146, 14, 7, "rgba(255,255,255,.22)")}
        ${R(-128, 26, 110, 12, 6, "rgba(255,255,255,.16)")}
        <path d="M50 -110 c-16 -22 -52 -18 -52 12 c0 24 30 40 52 58 c22 -18 52 -34 52 -58 c0 -30 -36 -34 -52 -12 z" fill="${a}" opacity=".95"/>
        <path d="M-60 70 c30 -26 62 -26 92 0 c14 12 26 10 40 -2" fill="none" stroke="${GREEN}" stroke-width="12" stroke-linecap="round"/>
        <path d="M100 70 c-14 16 -34 30 -60 34" fill="none" stroke="${GREEN}" stroke-width="12" stroke-linecap="round" opacity=".7"/>
        ${C(120, 120, 20, a, 'opacity=".22"')}`;
    case "solar-scheme": // tilted panel + sun
      return `
        ${C(-110, -104, 40, GOLD, 'opacity=".92"')}
        ${R(-150, -30, 210, 120, 14, a, 'opacity=".9" transform="skewY(-8)"')}
        ${R(-132, -12, 174, 84, 8, dark, 'transform="skewY(-8)"')}
        ${Array.from({ length: 3 }, (_, i) => `<line x1="${-132 + (i + 1) * 43}" y1="${-30}" x2="${-132 + (i + 1) * 43}" y2="60" stroke="${a}" stroke-width="3" opacity=".7" transform="skewY(-8)"/>`).join("")}
        ${Array.from({ length: 2 }, (_, i) => `<line x1="-132" y1="${-12 + (i + 1) * 30}" x2="42" y2="${-12 + (i + 1) * 30}" stroke="${a}" stroke-width="3" opacity=".7" transform="skewY(-8)"/>`).join("")}
        <rect x="-40" y="90" width="20" height="60" fill="rgba(255,255,255,.35)"/>
        ${C(120, 40, 26, GOLD, 'opacity=".25"')}
        ${C(-140, 110, 18, GOLD, 'opacity=".2"')}`;
    case "utility-bill": // meter + bolt + bill
      return `
        ${R(-160, -40, 130, 150, 16, glass, 'stroke="rgba(255,255,255,.22)" stroke-width="2"')}
        ${C(-95, 10, 40, dark)}${C(-95, 10, 28, "rgba(255,255,255,.1)")}
        <path d="M-95 -12 l-14 30 h18 l-10 28 l30 -34 h-18 z" fill="${BLUE}"/>
        ${R(-40, -60, 190, 170, 16, "rgba(255,255,255,.10)", 'stroke="rgba(255,255,255,.22)" stroke-width="2"')}
        ${R(-16, -36, 140, 14, 7, "rgba(255,255,255,.28)")}
        ${R(-16, -10, 110, 12, 6, "rgba(255,255,255,.2)")}
        ${R(-16, 16, 130, 12, 6, "rgba(255,255,255,.2)")}
        ${R(-16, 42, 84, 12, 6, "rgba(255,255,255,.2)")}
        <path d="M120 -110 l-26 70 h22 l-20 66 l58 -84 h-26 z" fill="${GOLD}"/>
        ${C(-150, 120, 22, GOLD, 'opacity=".2"')}`;
    case "tax-return": // calculator + shield + check
      return `
        ${R(-170, -70, 170, 210, 18, glass, 'stroke="rgba(255,255,255,.22)" stroke-width="2"')}
        ${R(-150, -48, 130, 40, 8, dark)}
        ${Array.from({ length: 9 }, (_, i) => {
          const x = -150 + (i % 3) * 46, y = 8 + Math.floor(i / 3) * 44;
          return R(x, y, 38, 34, 8, (i % 4 === 0) ? BLUE : "rgba(255,255,255,.14)");
        }).join("")}
        <path d="M96 -100 l34 16 v34 c0 28 -18 44 -34 52 c-16 -8 -34 -24 -34 -52 v-34 z" fill="${a}" opacity=".9"/>
        <path d="M80 -30 l12 14 l22 -30" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        ${C(150, 70, 26, GOLD, 'opacity=".25"')}`;
    case "documents": // id card + passport + seal
    default:
      return `
        ${R(-160, -40, 150, 100, 12, glass, 'stroke="rgba(255,255,255,.22)" stroke-width="2"')}
        ${C(-130, -6, 18, dark)}${R(-104, -16, 78, 10, 5, "rgba(255,255,255,.26)")}${R(-104, 4, 58, 8, 4, "rgba(255,255,255,.18)")}
        ${R(-96, -40, 160, 200, 14, a, 'opacity=".9"')}
        ${R(-72, -12, 112, 140, 8, dark)}
        ${C(20, 30, 30, a)}${C(20, 30, 16, dark)}
        ${R(-118, -80, 110, 80, 12, "rgba(255,255,255,.16)", 'stroke="rgba(255,255,255,.24)" stroke-width="2"')}
        ${R(-98, -58, 70, 9, 4, "rgba(255,255,255,.3)")}${R(-98, -38, 52, 8, 4, "rgba(255,255,255,.2)")}
        <path d="M112 40 l26 12 v20 c0 20 -14 32 -26 38 c-12 -6 -26 -18 -26 -38 v-20 z" fill="${GOLD}" opacity=".9"/>
        ${C(-150, 110, 20, GOLD, 'opacity=".2"')}`;
  }
}

const THEMES = {
  "info-sim-check": { a: GREEN, b: "#5aa2ff", kind: "sim-check", label: "SIM number check" },
  "info-sim-owner": { a: GREEN, b: "#8b3dff", kind: "sim-owner", label: "SIM owner details" },
  "info-mobile-codes": { a: GOLD, b: "#25d366", kind: "mobile-codes", label: "Mobile USSD codes" },
  "info-bisp-payment": { a: GREEN, b: GOLD, kind: "bisp-payment", label: "BISP payment check" },
  "info-bisp-registration": { a: GREEN, b: "#5aa2ff", kind: "bisp-registration", label: "BISP registration" },
  "info-education-stipend": { a: GOLD, b: GREEN, kind: "education-stipend", label: "Education stipend" },
  "info-farmer-card": { a: GREEN, b: GOLD, kind: "farmer-card", label: "Farmer card scheme" },
  "info-welfare-card": { a: GREEN, b: "#8b3dff", kind: "welfare-card", label: "Welfare card scheme" },
  "info-solar-scheme": { a: GOLD, b: "#5aa2ff", kind: "solar-scheme", label: "Solar panel scheme" },
  "info-utility-bill": { a: GOLD, b: "#5aa2ff", kind: "utility-bill", label: "Utility bill check" },
  "info-tax-return": { a: "#5aa2ff", b: GOLD, kind: "tax-return", label: "Tax return check" },
  "info-documents": { a: GOLD, b: GREEN, kind: "documents", label: "Documents and status check" }
};

function svg(name, t) {
  const id = (s) => s.replace(/[^a-z0-9]/gi, "");
  const u = id(name);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-label="${t.label}">
<defs>
<linearGradient id="bg${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#070b1a"/><stop offset=".55" stop-color="#080f24"/><stop offset="1" stop-color="#0a1330"/></linearGradient>
<radialGradient id="ga${u}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${t.a}" stop-opacity=".30"/><stop offset="1" stop-color="${t.a}" stop-opacity="0"/></radialGradient>
<radialGradient id="gb${u}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${t.b}" stop-opacity=".26"/><stop offset="1" stop-color="${t.b}" stop-opacity="0"/></radialGradient>
<linearGradient id="gl${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".10"/><stop offset="1" stop-color="#ffffff" stop-opacity=".02"/></linearGradient>
<filter id="bl${u}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26"/></filter>
</defs>
<rect width="1200" height="675" fill="url(#bg${u})"/>
<ellipse cx="900" cy="90" rx="360" ry="260" fill="url(#ga${u})"/>
<ellipse cx="260" cy="600" rx="380" ry="280" fill="url(#gb${u})"/>
<g opacity=".35" stroke="#ffffff" stroke-opacity=".05" stroke-width="1">
${Array.from({ length: 10 }, (_, i) => `<line x1="${(i + 1) * 110}" y1="0" x2="${(i + 1) * 110}" y2="675"/>`).join("")}
${Array.from({ length: 6 }, (_, i) => `<line x1="0" y1="${(i + 1) * 96}" x2="1200" y2="${(i + 1) * 96}"/>`).join("")}
</g>
<g transform="translate(600 352)">
  <rect x="-250" y="-215" width="500" height="430" rx="46" fill="url(#gl${u})" stroke="#ffffff" stroke-opacity=".16" stroke-width="2"/>
  <rect x="-250" y="-215" width="500" height="430" rx="46" fill="none" stroke="${t.a}" stroke-opacity=".28" stroke-width="2"/>
  <rect x="-240" y="199" width="480" height="16" rx="8" fill="${t.a}" opacity=".35" filter="url(#bl${u})"/>
  <g transform="translate(0 -12) scale(1.32)">${glyph(t.kind, t.a)}</g>
</g>
<g transform="translate(54 52)" aria-hidden="true">
  <rect x="0" y="0" width="86" height="52" rx="26" fill="rgba(255,255,255,.06)" stroke="rgba(255,200,61,.45)"/>
  <circle cx="30" cy="26" r="12" fill="${GOLD}"/>
  <rect x="50" y="15" width="22" height="7" rx="3.5" fill="${GOLD}" opacity=".85"/>
  <rect x="50" y="30" width="14" height="7" rx="3.5" fill="${t.a}" opacity=".85"/>
</g>
<g transform="translate(1080 596)" aria-hidden="true">
  <circle cx="12" cy="12" r="12" fill="${GOLD}"/>
  <rect x="32" y="4" width="34" height="8" rx="4" fill="#6f7fa6"/>
  <rect x="32" y="16" width="22" height="8" rx="4" fill="#4b5780"/>
</g>
</svg>`;
}

let n = 0;
for (const [name, t] of Object.entries(THEMES)) {
  fs.writeFileSync(path.join(OUT, name + ".svg"), svg(name, t));
  n++;
}
console.log(`wrote ${n} info hero svgs to dist/assets/img/`);
