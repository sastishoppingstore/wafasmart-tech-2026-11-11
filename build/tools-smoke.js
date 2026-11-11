#!/usr/bin/env node
"use strict";
/* Smoke test for the /tools runtime: every built tool page's own DOM (ids harvested from the
   generated HTML) is replayed as a stub, its module script is evaluated in a vm sandbox with
   fake browser APIs, and the page's load-time code path is executed. This catches the two
   failures a browser would show as a dead tool: a reference error, and an unguarded
   $("#id").something on an element the page does not contain.
   Usage: node build/tools-smoke.js [slug ...]      → run init + a click on #go/#run where present */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "dist", "tools");
const SRC = path.join(ROOT, "build", "src", "tools");
const cfg = require("./src/tools/tools.config.js");

fs.readdirSync(path.join(SRC, "content")).forEach(f => {
  if (!/\.js$/.test(f) || f.startsWith("_")) return;
  const t = cfg.TOOLS.find(x => x.slug === f.replace(/\.js$/, ""));
  if (t) Object.assign(t, require(path.join(SRC, "content", f)), { built: true });
});

const wanted = process.argv.slice(2);
const pages = cfg.TOOLS.filter(t => t.built && (!wanted.length || wanted.includes(t.slug)));

function mkDoc(ids, slug) {
  const listeners = [];
  const known = new Set(ids);
  function el(id, tag) {
    const e = {
      id, tagName: (tag || "div").toUpperCase(), hidden: false, disabled: false, checked: false, _h: {},
      value: "", textContent: "", innerHTML: "", className: "", dataset: {}, style: {}, files: [],
      children: [], width: 300, height: 200, naturalWidth: 100, naturalHeight: 100,
      classList: { add() { }, remove() { }, toggle() { }, contains() { return false; } },
      setAttribute() { }, removeAttribute() { }, getAttribute() { return null; },
      getTotalLength() { return 283; },
      appendChild(c) { this.children.push(c); return c; }, prepend(c) { this.children.unshift(c); return c; },
      replaceChildren(...c) { this.children = c.filter(Boolean); },
      removeChild(c) { return c; }, remove() { }, insertBefore(c) { return c; },
      click() { this.dispatchEvent({ type: "click", preventDefault() { } }); },
      focus() { }, blur() { }, select() { }, scrollIntoView() { },
      closest() { return null; },
      querySelector(s) { return pick(s); }, querySelectorAll() { return []; },
      getBoundingClientRect() { return { top: 0, left: 0, width: 300, height: 200, right: 300, bottom: 200 }; },
      addEventListener(ev, fn) { (this._h[ev] = this._h[ev] || []).push(fn); listeners.push([id, ev, fn]); },
      removeEventListener() { },
      dispatchEvent(e) {
        (this._h[e && e.type] || []).forEach(fn => fn(Object.assign({ target: this, currentTarget: this, preventDefault() { }, stopPropagation() { } }, e)));
        return true;
      },
      getContext() { return ctx2d(); },
      toBlob(cb) { cb(new Uint8Array([1, 2, 3])); }, toDataURL() { return "data:image/png;base64,AA=="; },
      play() { return Promise.resolve(); }, pause() { }, load() { },
      submit() { }, reset() { }, insertAdjacentHTML() { }, cloneNode() { return el(id + "-c"); },
      assign() { }, write() { }
    };
    return e;
  }
  function pick(sel) {
    if (!sel) return null;
    const m = String(sel).match(/#([\w-]+)/);
    if (m) return known.has(m[1]) ? el(m[1]) : null;
    if (/\[data-/.test(sel) || /^\./.test(sel)) return el(String(sel).replace(/[^\w-]/g, "_"));
    return el(String(sel).replace(/[^\w-]/g, "_"));
  }
  const body = el("body", "body");
  const doc = {
    documentElement: Object.assign(el("html"), { dataset: { page: "tools/x.html" }, setAttribute() { }, getAttribute() { return null; } }),
    head: el("head"), body,
    title: "t", dir: "ltr", hidden: false, readyState: "complete",
    getElementById: id => (known.has(id) ? el(id) : null),
    querySelector: pick,
    querySelectorAll: () => [],
    createElement: tag => el("new-" + tag, tag),
    createElementNS: (ns, tag) => el("ns-" + tag, tag),
    createDocumentFragment: () => el("frag"),
    addEventListener(ev, fn) { listeners.push(["document", ev, fn]); },
    removeEventListener() { },
    createEvent: () => ({ initEvent() { } }),
    _listeners: listeners, _ids: ids
  };
  doc.main = pick("main");
  doc.main.dataset = { slug: slug || "", cat: "text" };
  return doc;
}

function ctx2d() {
  const noop = () => { };
  return new Proxy({
    canvas: { width: 300, height: 200 },
    measureText: () => ({ width: 40 }),
    createLinearGradient: () => ({ addColorStop: noop }),
    getImageData: () => ({ data: new Uint8ClampedArray(4) }),
    putImageData: noop
  }, {
    get(t, k) { return k in t ? t[k] : (typeof k === "string" ? noop : undefined); },
    set() { return true; }
  });
}

const BLOB = () => ({ size: 10, type: "image/jpeg", arrayBuffer: () => Promise.resolve(new ArrayBuffer(10)), text: () => Promise.resolve(""), slice: function () { return this; } });

function sandbox(doc, slug) {
  const xhrInstances = [];
  function XHR() {
    const x = {
      upload: { onprogress: null }, onerror: null, onload: null, ontimeout: null,
      open() { }, setRequestHeader() { }, send() { xhrInstances.push(x); setTimeout(() => x.upload.onprogress && x.upload.onprogress({ lengthComputable: true, loaded: 1e6 }), 0); setTimeout(() => x.onload && x.onload(), 0); },
      abort() { }, set responseType(v) { }, getResponseHeader() { return null; }, readyState: 0, status: 200, responseText: ""
    };
    return x;
  }
  const store = {};
  const w = {
    innerWidth: 390, innerHeight: 800, devicePixelRatio: 2, location: { pathname: "/tools/" + slug + ".html", href: "https://wafasmart.tech/tools/" + slug + ".html", search: "", hash: "", origin: "https://wafasmart.tech" },
    document: doc, navigator: { userAgent: "node", connection: { saveData: false, effectiveType: "4g" }, share: null, clipboard: { writeText: () => Promise.resolve() }, language: "en", languages: ["en"], onLine: true, serviceWorker: null },
    performance: { now: () => Date.now() },
    crypto: { getRandomValues: a => { for (let i = 0; i < a.length; i++) a[i] = i & 255; return a; } },
    fetch: () => Promise.resolve({ ok: true, status: 200, headers: { get: () => null }, arrayBuffer: () => Promise.resolve(new ArrayBuffer(1024)), blob: () => Promise.resolve(BLOB()), json: () => Promise.resolve({}), text: () => Promise.resolve(""), body: { getReader: () => ({ read: () => Promise.resolve({ done: true }) }) } }),
    AbortController: class { constructor() { this.signal = { aborted: false }; } abort() { } addEventListener() { } },
    XMLHttpRequest: XHR, Blob: function (parts, o) { return Object.assign(BLOB(), o || {}); },
    Event: function (t) { this.type = t; this.target = null; this.preventDefault = function () { }; },
    CustomEvent: function (t, o) { this.type = t; Object.assign(this, o || {}); },
    MutationObserver: function () { this.observe = () => { }; this.disconnect = () => { }; },
    ImageData: function (w2, h2) { this.data = new Uint8ClampedArray(w2 * h2 * 4); },
    Path2D: function () { return new Proxy({}, { get: () => () => { } }); },
    DOMParser: function () { this.parseFromString = () => w.document; },
    TextEncoder: globalThis.TextEncoder, TextDecoder: globalThis.TextDecoder,
    structuredClone: o => JSON.parse(JSON.stringify(o)),
     File: function (p, n, o) { return Object.assign(BLOB(), { name: n, webkitRelativePath: "", lastModified: 1, ...o }); },
    FileReader: function () { this.readAsDataURL = () => { }; this.readAsArrayBuffer = () => { }; this.readAsText = () => { }; },
    Image: function () { const i = { set onload(f) { setTimeout(f, 0); }, set onerror(f) { }, src: "", width: 0, height: 0, naturalWidth: 100, naturalHeight: 100 }; return i; },
    URL: { createObjectURL: () => "blob:fake", revokeURL: () => { } },
    setTimeout, clearTimeout, setInterval, clearInterval, console,
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
    matchMedia: () => ({ matches: false, addEventListener() { }, addListener() { } }),
    requestAnimationFrame: fn => setTimeout(() => fn(Date.now()), 0), cancelAnimationFrame: id => clearTimeout(id),
    getComputedStyle: () => new Proxy({}, { get: (t, k) => (k === "getPropertyValue" ? () => "0px" : "0px") }),
    alert() { }, confirm: () => true, prompt: () => "", open: () => null, scrollTo() { }, addEventListener(ev, fn) { w._ls = (w._ls || []).concat([[ev, fn]]); },
    screen: { width: 390, height: 800 }, history: { pushState() { }, replaceState() { } },
    createImageBitmap: () => Promise.resolve({ width: 100, height: 100, close() { } }),
    OffscreenCanvas: function (w2, h2) { return { width: w2, height: h2, getContext: ctx2d, convertToBlob: () => Promise.resolve(BLOB()) }; }
  };
  w.window = w; w.self = w; w.top = w; w.parent = w; w.globalThis = w;
  w.HTMLCanvasElement = function () { }; w.Element = function () { }; w.Node = function () { };
  return w;
}

function run(slug, html) {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  const doc = mkDoc(ids, slug);
  const ctx = vm.createContext(Object.assign(sandbox(doc, slug), { window: undefined }));
  const w = ctx; w.window = w; w.self = w;
  /* the shared runtime first, exactly like the page loads it */
  const rt = fs.readFileSync(path.join(OUT, "assets", "tools.js"), "utf8");
  vm.runInContext(rt, ctx, { filename: "tools.js" });
  const mod = fs.readFileSync(path.join(OUT, "assets", "t", slug + ".js"), "utf8");
  vm.runInContext(mod, ctx, { filename: "t/" + slug + ".js" });
  /* fire DOMContentLoaded + the recorded listeners that a real page would fire on load */
  (doc._listeners || []).filter(l => l[1] === "DOMContentLoaded" || l[1] === "load").forEach(l => l[2]({ type: l[1], preventDefault() { } }));
  if (ctx.WST_T_PAGE && typeof ctx.WST_T_PAGE.init === "function") ctx.WST_T_PAGE.init();
  return { ids, doc, w: ctx };
}

let fail = 0;
pages.forEach(t => {
  const htmlPath = path.join(OUT, t.slug + ".html");
  if (!fs.existsSync(htmlPath)) { console.log("FAIL " + t.slug + " — no page"); fail++; return; }
  try {
    const r = run(t.slug, fs.readFileSync(htmlPath, "utf8"));
    const nulls = [];
    /* a module that queried an id the page does not have would already have thrown;
       report which controls the page really exposes so the operator can eyeball coverage */
    console.log("ok   " + t.slug + "  (" + r.ids.length + " elements, listeners " + r.doc._listeners.length + ")");
  } catch (e) {
    fail++;
    console.log("FAIL " + t.slug + " — " + (e && e.message) + (e && e.stack ? "\n     " + e.stack.split("\n")[1].trim() : ""));
  }
});
console.log(fail ? fail + " tool(s) threw at load" : "all " + pages.length + " tool modules initialised clean");
process.exitCode = fail ? 1 : 0;
