#!/usr/bin/env node
"use strict";
/* Behavioural check for /tools/internet-speed-test — the one tool whose output cannot be
   verified by a static audit. Runs the real engine (build/src/tools/t/internet-speed-test.js)
   against the real page markup (dist/tools/internet-speed-test.html) inside a fake DOM whose
   fetch/XHR emulate a fixed-bandwidth link, then asserts that latency, download, upload,
   the dial, the verdict line and the Test-again button all behave.
   Usage: node build/speedtest-check.js [Mbps]   (default 24) */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ROOT = path.join(__dirname, "..");
const PAGE = path.join(ROOT, "dist", "tools", "internet-speed-test.html");
const RT = path.join(ROOT, "dist", "tools", "assets", "tools.js");
const MOD = path.join(ROOT, "build", "src", "tools", "t", "internet-speed-test.js");

const LINK_MBPS = parseFloat(process.argv[2] || "24");
const CHUNK_MS = 60;                       /* one simulated network chunk */
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------- DOM stub rebuilt from the ids that exist in the built page ---------- */
const PAGE_HTML = fs.readFileSync(PAGE, "utf8");
const ids = [...PAGE_HTML.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
const known = new Set(ids);
const nodes = new Map();
function node(id) {
  if (nodes.has(id)) return nodes.get(id);
  let tc = "";
  const n = {
    id, hidden: false, disabled: false, value: "quick", innerHTML: "", dataset: {}, style: {}, _at: {}, children: [],
    get textContent() { return tc; },
    set textContent(v) { tc = String(v); if (tc === "") n.children = []; },   /* mirrors the DOM: "" clears children */
    classList: { add() { }, remove() { }, toggle() { }, contains: () => false },
    _h: {},
    addEventListener(ev, fn) { (this._h[ev] = this._h[ev] || []).push(fn); },
    dispatchEvent(e) { (this._h[e.type] || []).forEach(fn => fn(Object.assign({ target: this, preventDefault() { } }, e))); },
    click() { this.dispatchEvent({ type: "click" }); },
    setAttribute(k, v) { this._at[k] = String(v); }, getAttribute(k) { return k in this._at ? this._at[k] : null; },
    appendChild(c) { this.children.push(c); return c; }, remove() { },
    getTotalLength: () => 314, querySelector: () => null, querySelectorAll: () => [],
    closest: () => null, focus() { }, blur() { }
  };
  nodes.set(id, n);
  return n;
}
const doc = {
  documentElement: { dataset: {} }, body: node("body"), hidden: false, readyState: "complete",
  getElementById: id => (known.has(id) ? node(id) : null),
  querySelector: s => {
    const m = /#([\w-]+)/.exec(s || "");
    if (m) return known.has(m[1]) ? node(m[1]) : null;
    if (/\[data-slug\]/.test(s)) return main;
    const c = /^\.([\w-]+)$/.exec(s || "");
    if (c && new RegExp('class="[^"]*\\b' + c[1] + '\\b').test(PAGE_HTML)) return node("class-" + c[1]);
    return null;
  },
  querySelectorAll: () => [],
  createElement: t => node("created-" + t),
  createElementNS: (ns, t) => node("svg-" + t),
  addEventListener(ev, fn) { (doc._h[ev] = doc._h[ev] || []).push(fn); }, _h: {},
  fire(ev) { (this._h[ev] || []).forEach(f => f({ type: ev })); }
};
const main = node("main"); main.dataset.slug = "internet-speed-test";

/* ---------- network stub: the simulated link is shared across streams, so aggregate
   throughput equals LINK_MBPS no matter how many streams the engine opens ---------- */
let simUp = 0, simDown = 0, upActive = 0, dlActive = 0;
const DL_STREAMS = 3, UP_STREAMS = 2;
const perDown = LINK_MBPS * 1e6 / 8 * (CHUNK_MS / 1000) / DL_STREAMS;
const perUp = LINK_MBPS * 1e6 / 8 * (CHUNK_MS / 1000) / UP_STREAMS;
const fetchStub = url => {
  if (/ipwho\.is/.test(url)) return sleep(120).then(() => ({ ok: true, status: 200, json: () => Promise.resolve({
    ip: "103.208.1.5", success: true, city: "Karachi", region: "Sindh", country: "Pakistan",
    latitude: 24.86, longitude: 67.01, flag: { emoji: "\u{1F1F5}\u{1F1F0}" },
    connection: { asn: 9541, isp: "Cybernet India Ltd", org: "Cybernet" }
  }) }));
  if (/get\.geojs\.io/.test(url)) return sleep(120).then(() => ({ ok: true, status: 200, json: () => Promise.resolve({ ip: "103.208.1.5", city: "Karachi", region: "Sindh", country: "Pakistan", asn: 9541, organization: "AS9541 Cybernet" }) }));
  const m = /[?&]bytes=(\d+)/.exec(url);
  if (!m) return sleep(CHUNK_MS).then(() => ({ ok: true, status: 200, arrayBuffer: () => Promise.resolve(new ArrayBuffer(1000)) }));
  if (m[1] === "0") return sleep(40).then(() => ({ ok: true, status: 200, headers: { get: k => (k === "cf-meta-ip" ? "103.208.1.5" : null) }, arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)) }));
  let left = Number(m[1]);
  dlActive++;
  const step = Math.max(1, Math.round(perDown));   /* one third of the link: the quick profile opens three streams */
  return sleep(CHUNK_MS / 2).then(() => ({
    ok: true, status: 200,
    arrayBuffer: () => { simDown += left; return sleep(CHUNK_MS).then(() => new ArrayBuffer(0)); },
    body: {
      getReader: () => ({
        read: () => {
          if (left <= 0) { dlActive = Math.max(1, dlActive - 1); return Promise.resolve({ done: true }); }
          const n = Math.min(step, left); left -= n; simDown += n;
          return sleep(CHUNK_MS).then(() => ({ done: false, value: new Uint8Array(n) }));
        }
      })
    }
  }));
};

const sand = {
  document: doc, console,
  setTimeout, clearTimeout, setInterval, clearInterval,
  performance: { now: () => Date.now() },
  navigator: { connection: { saveData: false }, userAgent: "node" },
  crypto: { getRandomValues: a => { for (let i = 0; i < a.length; i++) a[i] = i & 255; return a; } },
  fetch: fetchStub,
  AbortController: class { constructor() { this.signal = { aborted: false }; } abort() { this.signal.aborted = true; } },
  XMLHttpRequest: function () {
    const x = { upload: {}, open() { }, setRequestHeader() { }, abort() { x._dead = true; } };
    x.send = buf => {
      upActive++;
      const rate = LINK_MBPS * 1e6 / 8 / Math.max(1, upActive);
      const total = (buf && buf.byteLength) || 1e6, t0 = Date.now();
      const iv = setInterval(() => {
        if (x._dead) return clearInterval(iv);
        const loaded = Math.min(total, rate * CHUNK_MS / 1000 * Math.ceil((Date.now() - t0) / CHUNK_MS));
        simUp += Math.min(total - (loaded - rate * CHUNK_MS / 1000), rate * CHUNK_MS / 1000);
        if (x.upload.onprogress) x.upload.onprogress({ lengthComputable: true, loaded });
        if (loaded >= total) { upActive = Math.max(1, upActive - 1); clearInterval(iv); if (x.onload) x.onload(); }
      }, CHUNK_MS);
    };
    return x;
  },
  location: { pathname: "/tools/internet-speed-test.html" },
  Blob: function () { this.size = 10; },
  URL: { createObjectURL: () => "blob:x", revokeObjectURL() { } }
};
sand.window = sand; sand.self = sand; sand.globalThis = sand;
sand.window.addEventListener = (ev, fn) => (sand._wl = (sand._wl || []).concat([[ev, fn]]));
const ctx = vm.createContext(sand);

vm.runInContext(fs.readFileSync(RT, "utf8"), ctx, { filename: "tools.js" });
/* the profile select drives timing: shorten the windows so the check takes seconds, not minutes */
vm.runInContext("window.__t0 = Date.now()", ctx);
vm.runInContext(fs.readFileSync(MOD, "utf8").replace(/dlMs: (\d+)/g, (m, n) => "dlMs: " + Math.min(Number(n), 3500)).replace(/upMs: (\d+)/g, (m, n) => "upMs: " + Math.min(Number(n), 3000)), ctx, { filename: "internet-speed-test.js" });

/* ---------- drive it ---------- */
const out = {};
const t0 = Date.now();
setTimeout(() => {
  /* nothing may run on load: the panel is filled by one lookup, the test itself waits for the tap */
  out.idleBeforeStart = node("phase").textContent.indexOf("Stage") !== 0;
  out.ipAtLoad = node("ip").textContent;
  out.cityAtLoad = node("city").textContent;
  node("go").click();
}, 900);
setTimeout(() => node("go").click(), 1300);        /* a second press while running must be ignored */
setTimeout(() => {
  out.ping = node("ping").textContent;
  out.min = node("min").textContent;
  out.jitter = node("jitter").textContent;
  out.down = node("down").textContent;
  out.up = node("up").textContent;
  out.rating = node("rating").hidden ? "" : node("rating").textContent;
  out.engine = node("engine").textContent;
  out.button = node("go").textContent;
  out.buttonEnabled = node("go").disabled === false;
  out.dial = node("mbps").textContent;
  out.arcOffset = node("g-arc").style.strokeDashoffset;
  out.ip = node("ip").textContent;
  out.isp = node("isp").textContent;
  out.city = node("city").textContent;
  out.region = node("region").textContent;
  out.country = node("country").textContent;
  out.asn = node("asn").textContent;
  out.marker = node("g-mark").style.display;
  out.coords = node("coords").textContent;
  out.tickNodes = node("g-ticks").children.length;
  out.gratNodes = node("g-grat").children.length;
  out.tone = node("class-st-meter")._at["data-tone"];
  out.needle = node("needle") ? "" : "";
  out.bytesMoved = Math.round((simDown + simUp) / 1e6);
  out.simMbps = ((simDown + simUp) * 8 / (out.elapsedMs / 1000) / 1e6).toFixed(1);
  out.elapsedMs = Date.now() - t0;
  /* the download figure must be within a sane band of the simulated link */
  const d = parseFloat(out.down);
  out.downPlausible = isFinite(d) && d > LINK_MBPS * 0.55 && d < LINK_MBPS * 1.45;
  out.upPlausible = (() => { const u = parseFloat(out.up); return isFinite(u) && u > LINK_MBPS * 0.4; })();
  out.done = /done|Stopped/i.test(node("phase").textContent);
  console.log(JSON.stringify(out, null, 2));
  const bad = [];
  if (!out.idleBeforeStart) bad.push("the test started by itself before any tap");
  if (/^—$|^$/.test(out.ipAtLoad)) bad.push("IP was not filled on arrival: " + out.ipAtLoad);
  if (/^—$|^$/.test(out.cityAtLoad)) bad.push("city was not filled on arrival: " + out.cityAtLoad);
  if (!out.done) bad.push("phase never reached done: " + node("phase").textContent);
  if (!out.downPlausible) bad.push("download " + out.down + " not close to the simulated " + LINK_MBPS + " Mbps link");
  if (!out.upPlausible) bad.push("upload " + out.up + " not measured");
  if (!/^\d/.test(out.ping)) bad.push("ping not numeric: " + out.ping);
  if (!/^\d/.test(out.jitter)) bad.push("jitter not numeric: " + out.jitter);
  if (!out.rating) bad.push("verdict line hidden");
  if (!/Test again/.test(out.button)) bad.push("button label wrong: " + out.button);
  if (!out.buttonEnabled) bad.push("button left disabled");
  if (out.arcOffset === undefined || out.arcOffset === "") bad.push("gauge arc never moved");
  if (parseFloat(out.arcOffset) > 314 * 0.6) bad.push("meter barely filled at this speed: offset " + out.arcOffset);
  if (!/^\d+\./.test(out.ip)) bad.push("IP not filled: " + out.ip);
  if (out.city !== "Karachi") bad.push("city not filled: " + out.city);
  if (!out.isp) bad.push("ISP not filled");
  if (!/AS\d+/.test(out.asn)) bad.push("ASN not filled: " + out.asn);
  if (out.tickNodes !== 12) bad.push("meter scale ticks not drawn: " + out.tickNodes);
  if (out.gratNodes < 15) bad.push("location grid not drawn: " + out.gratNodes);
  if (out.marker !== "block") bad.push("map marker not shown: " + out.marker);
  if (!/24\.86/.test(out.coords)) bad.push("coordinates line not filled: " + out.coords);
  if (!/^[1-4]$/.test(String(out.tone))) bad.push("meter tone class never set: " + out.tone);
  if (bad.length) { console.log("SPEED TEST FAIL:\n - " + bad.join("\n - ")); process.exitCode = 1; }
  else console.log("SPEED TEST OK — idle until tapped, connection panel filled on arrival, measured " + out.down + " down / " + out.up + " up / " + out.ping + " ms ping on a simulated " + LINK_MBPS + " Mbps link, meter " + Math.round((1 - parseFloat(out.arcOffset) / 314) * 100) + "% filled (tone " + out.tone + "), IP " + out.ip + " / " + out.city + ", " + out.country + " / " + out.isp + " / " + out.asn + " + marker drawn, verdict + Test-again all wired.");
}, 14000);
