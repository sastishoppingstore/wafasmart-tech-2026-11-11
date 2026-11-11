"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "QR Code Generator",
  short: "Make a scannable QR for a link, text, a WhatsApp chat or a Wi-Fi network — pick error level and size, download SVG or PNG.",
  title: "QR Code Generator — URL, WhatsApp, WiFi | Wafa Smart",
  desc: "Create QR codes for links, text, WhatsApp numbers and WiFi logins. Choose error correction and size, download SVG or PNG. Free, private, in-browser.",
  h1: "QR Code Generator — links, text, WhatsApp and Wi-Fi",
  kw: ["qr code generator", "create qr code online", "whatsapp qr code", "wifi qr code generator", "svg qr code download", "free qr code maker"],
  libs: ["qr"],
  intro: [
    "A QR code turns something short — a web address, a phone number, a shop's Wi-Fi password — into a pattern a camera can read in a fraction of a second. This generator builds that pattern inside your browser using the well-known qrcode-generator engine, which is pulled from a pinned CDN only when you press Generate, so the page itself stays tiny and the code is drawn on your own device rather than on someone else's server.",
    "Four content types cover the everyday jobs in Pakistan: a URL for a menu, form or landing page; free text for a coupon code or instruction; a WhatsApp link that opens a chat pre-filled with a message using https://wa.me/<number>?text=…; and a Wi-Fi login that stores the SSID, password and encryption type so a guest's phone joins the network without anyone reading out a long passphrase. Each tab shows only the fields that type needs.",
    "Because a code that cannot be printed at the right size is useless, you control the error-correction level (L, M, Q or H — the higher the level, the more damage the code can survive and stay scannable), the pixel size and the quiet-zone margin. Every run offers both an SVG download, which scales infinitely for posters and flex banners, and a PNG at your chosen size for WhatsApp, email or a web page."
  ],
  steps: [
    "Pick the content type — URL, Text, WhatsApp or WiFi — using the tabs at the top.",
    "Fill in the fields for that type (a link, a message, or a network name and password).",
    "Choose the error-correction level, the pixel size and the margin.",
    "Press 'Generate QR' — the qrcode engine loads from the CDN on this first click and is cached after.",
    "Scan it with your camera to check, then download it as SVG (for print) or PNG (for screen)."
  ],
  ur: "Pehle type chunein (URL, Text, WhatsApp ya WiFi), phir uske fields bharein — jaise link ya network ka naam aur password. Error level, size aur margin set karke 'Generate QR' dabayein; QR foran screen par aata hai. Camera se scan karke check karein, phir SVG (print ke liye) ya PNG (screen ke liye) download kar lein.",
  features: [
    "Four modes: website URL, free text, WhatsApp chat link and Wi-Fi network login",
    "Error-correction selector (L / M / Q / H) for durability on posters and menus",
    "Pixel size and margin control, with inline preview that keeps layout stable",
    "Download as crisp scalable SVG for print and PNG for screen",
    "WhatsApp mode builds a ready https://wa.me/<number>?text=… link with your message",
    "Live payload-length readout with a warning when a code grows past ~1,200 characters"
  ],
  tips: [
    "Use level Q or H for codes that get handled, printed on packaging or photographed at a distance.",
    "Download SVG when the code goes on a flex, signboard or letterhead — it stays razor-sharp at any size.",
    "For Wi-Fi, tick 'Hidden network' only if the SSID really is not broadcast, or scanning will fail.",
    "Keep URLs short — a long tracking link with many parameters makes a denser, harder-to-scan code.",
    "Always test the generated code with your own phone camera before printing a hundred copies."
  ],
  faqs: [
    { q: "Do the QR codes expire or get tracked?", a: "No. The code is a static image that only ever encodes the text you typed — there is no short-link redirect, no analytics and no expiry, because nothing is stored on any server." },
    { q: "Can a WhatsApp QR open a chat with a pre-typed message?", a: "Yes — the WhatsApp tab builds https://wa.me/<number>?text=<encoded message>, so scanning opens the chat with your message ready to send. Enter the number in international format without '+' or spaces." },
    { q: "Which error-correction level should I choose?", a: "M is a good default. Use L for clean indoor prints, Q for menus and posters, and H for codes that may get dirty, partly covered or printed small — H survives up to about 30% damage." },
    { q: "What is the payload-length warning about?", a: "A QR code holds a finite amount of data; beyond roughly 1,200 characters the pattern becomes extremely dense and hard to scan. The tool shows the exact length and warns you before you print." },
    { q: "Is my Wi-Fi password safe to put here?", a: "The password is turned into the code inside your browser and never uploaded, but remember anyone who scans the resulting code can read it — print such codes only where you want that access shared." },
    H.faqOffline("QR Code Generator")
  ],
  related: [["image-to-base64", "Embed an image as data"], ["word-counter", "Check a link's text"], ["password-generator", "Create a strong Wi-Fi key"], ["unit-converter", "Toolbox"]],
  ui: `<section class="t-card opts" aria-label="QR code options">
  <div class="segs" role="group" aria-label="Content type">
    <button class="seg" type="button" data-tab="url" aria-pressed="true">URL</button>
    <button class="seg" type="button" data-tab="text" aria-pressed="false">Text</button>
    <button class="seg" type="button" data-tab="wa" aria-pressed="false">WhatsApp</button>
    <button class="seg" type="button" data-tab="wifi" aria-pressed="false">WiFi</button>
  </div>
  <div class="fld wide" data-panel="url"><label for="f_url">Website URL</label><input type="text" id="f_url" value="https://wafasmart.tech" autocomplete="off" spellcheck="false"></div>
  <div class="fld wide" data-panel="text" hidden><label for="f_text">Text to encode</label><textarea id="f_text" class="ta text" rows="3" spellcheck="false" placeholder="Type any text…"></textarea></div>
  <div class="fld" data-panel="wa" hidden><label for="f_wanum">WhatsApp number (country code, no +)</label><input type="text" id="f_wanum" inputmode="tel" placeholder="923001234567" autocomplete="off"></div>
  <div class="fld" data-panel="wa" hidden><label for="f_wamsg">Pre-filled message</label><input type="text" id="f_wamsg" placeholder="Assalam-o-alaikum, I need…" autocomplete="off"></div>
  <div class="fld" data-panel="wifi" hidden><label for="f_ssid">Network name (SSID)</label><input type="text" id="f_ssid" autocomplete="off" spellcheck="false"></div>
  <div class="fld" data-panel="wifi" hidden><label for="f_wifipass">Wi-Fi password</label><input type="text" id="f_wifipass" autocomplete="off" spellcheck="false"></div>
  <div class="fld" data-panel="wifi" hidden><label for="f_enc">Encryption</label><select id="f_enc"><option value="WPA" selected>WPA / WPA2</option><option value="WEP">WEP</option><option value="nopen">None (open)</option></select></div>
  <div class="fld" data-panel="wifi" hidden><label for="f_hidden">Hidden network</label><select id="f_hidden"><option value="false" selected>No</option><option value="true">Yes (SSID not broadcast)</option></select></div>
  <div class="fld"><label for="f_ec">Error correction</label><select id="f_ec"><option value="L">L (7%)</option><option value="M" selected>M (15%)</option><option value="Q">Q (25%)</option><option value="H">H (30%)</option></select></div>
  <div class="fld"><label for="f_size">PNG pixel size</label><select id="f_size"><option value="256">256 px</option><option value="400">400 px</option><option value="600" selected>600 px</option><option value="1024">1024 px</option></select></div>
  <div class="fld"><label for="f_margin">Margin (modules)</label><input type="number" id="f_margin" min="0" max="10" value="2"></div>
  <div class="acts">
    <button id="go" class="btn" type="button">Generate QR</button>
    <button id="rst" class="btn btn-ghost" type="button">Reset</button>
  </div>
  <div class="prog" hidden><div id="bar" class="prog-i"></div></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div class="preview" id="preview" style="min-height:272px"><p class="hint" style="margin:0">Your QR code preview will appear here.</p></div>
  <div id="out"></div>
</section>`
};
