/* WAFA Smart Tech /tools — shared runtime. Classic script, loaded defer on every tool page.
   Public surface: window.WST_T (utils, hub, PDF) and window.WST_T_PAGE (per-page init hook). */
(function () {
  "use strict";
  const D = document, W = window;
  const $$ = (s, c) => Array.from((c || D).querySelectorAll(s));
  const $ = (s, c) => (c || D).querySelector(s);

  /* ---------- object-URL registry: everything revoked on unload ---------- */
  const urls = new Set();
  function makeURL(blob) { const u = URL.createObjectURL(blob); urls.add(u); return u; }
  function revoke(u) { if (u && urls.has(u)) { URL.revokeObjectURL(u); urls.delete(u); } }
  W.addEventListener("pagehide", () => urls.forEach(u => URL.revokeObjectURL(u)));

  /* ---------- format + DOM helpers ---------- */
  const T = {
    $, $$, makeURL, revoke,
    /* per-page CDN manifest injected in <head> as WST_T.LIBS */
    LIBS: (W.WST_T && W.WST_T.LIBS) || {},
    bytes(n) {
      if (!isFinite(n)) return "—";
      if (n < 1024) return n + " B";
      if (n < 1048576) return (n / 1024).toFixed(n < 10240 ? 2 : 1) + " KB";
      return (n / 1048576).toFixed(2) + " MB";
    },
    on(el, ev, fn) { if (el) el.addEventListener(ev, fn); },
    setErr(msg) { const e = $("#err"); if (!e) return; e.textContent = msg || ""; e.hidden = !msg; },
    status(msg) { const s = $("#status"); if (s) s.textContent = msg || ""; },
    progress(p) { const w = $(".prog"), b = $("#bar"); if (!w || !b) return; w.hidden = false; b.style.width = Math.round(Math.min(100, Math.max(0, p)) * 100) / 100 + "%"; if (p >= 100) setTimeout(() => { w.hidden = true; b.style.width = "0"; }, 900); },
    download(blob, name) { const u = makeURL(blob); const a = D.createElement("a"); a.href = u; a.download = name || "download"; D.body.appendChild(a); a.click(); a.remove(); setTimeout(() => revoke(u), 30000); },
    /* integrity-safe CDN loader: resolves once, human error on fail */
    cdn(key) {
      const L = (T.LIBS || {})[key];
      if (!L) return Promise.reject(new Error("Unknown library " + key));
      if (L.global && W[L.global]) return Promise.resolve(W[L.global]);
      if (T._cdn && T._cdn[key]) return T._cdn[key];
      T._cdn = T._cdn || {};
      T._cdn[key] = new Promise((res, rej) => {
        const s = D.createElement("script");
        s.src = L.url; s.crossOrigin = "anonymous";
        if (L.sri && L.sri.indexOf("TBD") === -1) s.integrity = L.sri;
        s.onload = () => res(W[L.global]);
        s.onerror = () => { delete T._cdn[key]; rej(new Error("Could not download the " + key + " engine (" + L.url.split("/")[3] + "). Check your internet connection and try again.")); };
        D.head.appendChild(s);
      });
      return T._cdn[key];
    },
    /* ---------- images: EXIF-aware decode, HEIC support, canvas encode ---------- */
    isHeic(f) { return /\.heic?$|\.heif$/i.test(f.name) || (f.type || "").indexOf("heic") > -1 || (f.type || "").indexOf("heif") > -1; },
    async decode(f) {
      if (T.isHeic(f)) {
        const heic2any = await T.cdn("heic2any");
        let png;
        try { png = await heic2any({ blob: f, toType: "image/png" }); }
        catch (e) { throw new Error("This HEIC file could not be decoded — it may use a profile the browser decoder does not support."); }
        return await createImageBitmap(png, { imageOrientation: "from-image" });
      }
      try { return await createImageBitmap(f, { imageOrientation: "from-image" }); }
      catch (e) { return await T.decodeViaImg(f); }
    },
    decodeViaImg(f) {
      return new Promise((res, rej) => {
        const u = makeURL(f), im = new Image();
        im.onload = () => { createImageBitmap(im, { imageOrientation: "from-image" }).then(b => { revoke(u); res(b); }, () => { revoke(u); res(im); }); };
        im.onerror = () => { revoke(u); rej(new Error("The file " + f.name + " is not a readable image.")); };
        im.src = u;
      });
    },
    canvasOf(bmp, scale) {
      scale = scale || 1;
      const c = D.createElement("canvas");
      c.width = Math.max(1, Math.round(bmp.width * scale));
      c.height = Math.max(1, Math.round(bmp.height * scale));
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(bmp, 0, 0, c.width, c.height);
      return c;
    },
    toBlob(c, type, q) { return new Promise(r => c.toBlob(b => r(b), type, q)); },
    /* paint = resize/crop a decoded bitmap onto a canvas.
       fit: "stretch" (fill exactly, may distort) | "contain" (inside box, padded) | "cover" (fill box, cropped)
       alpha: keep transparency; otherwise flattened on white so JPG never turns black. */
    paint(bmp, w, h, o) {
      o = o || {};
      w = Math.max(1, Math.round(w || bmp.width)); h = Math.max(1, Math.round(h || bmp.height));
      const c = D.createElement("canvas"); c.width = w; c.height = h;
      const ctx = c.getContext("2d");
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
      if (!o.alpha) { ctx.fillStyle = o.fill || "#fff"; ctx.fillRect(0, 0, w, h); }
      let dw = w, dh = h, dx = 0, dy = 0, sx = 0, sy = 0;
      const fit = o.fit || "stretch";
      if (fit === "contain" || fit === "cover") {
        const s = fit === "contain" ? Math.min(w / bmp.width, h / bmp.height) : Math.max(w / bmp.width, h / bmp.height);
        dw = bmp.width * s; dh = bmp.height * s; dx = (w - dw) / 2; dy = (h - dh) / 2;
        if (fit === "cover") { sx = -dx; sy = -dy; dx = 0; dy = 0; }
      }
      if (o.crop) {
        /* crop is source-space {x,y,w,h}; drawn into the whole canvas */
        ctx.drawImage(bmp, o.crop.x, o.crop.y, o.crop.w, o.crop.h, 0, 0, w, h);
        return c;
      }
      ctx.drawImage(bmp, sx, sy, bmp.width, bmp.height, dx, dy, dw, dh);
      return c;
    },
    async encode(c, type, q) {
      const b = await T.toBlob(c, type, q);
      if (!b) throw new Error("The browser could not save this as " + T.ext(type).toUpperCase() + ". Try JPG or PNG instead.");
      return b;
    },
    ext(type) { return type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg"; },
    /* live read-out for a range input: #q -> #qv */
    rangeOut(inId, outId, suffix) {
      const i = typeof inId === "string" ? $("#" + inId) : inId, o = $("#" + outId);
      if (!i || !o) return;
      const f = () => { o.textContent = i.value + (suffix || "%"); };
      T.on(i, "input", f); f();
    },
    /* yield so the UI never freezes on big files */
    yieldUI() { return new Promise(r => setTimeout(r, 0)); },
    /* ---------- shared validation + small utils ---------- */
    MAX_BYTES: 60 * 1048576,
    checkFile(f, re, label) {
      if (!f) return "No file selected — choose a file first.";
      if (f.size === 0) return f.name + " is empty (0 bytes). Pick a different file.";
      if (f.size > T.MAX_BYTES) return f.name + " is " + T.bytes(f.size) + " — the browser runs out of memory past about " + T.bytes(T.MAX_BYTES) + ". Crop or compress it first.";
      if (re && !re.test(f.type) && !re.test(f.name)) return "That does not look like " + label + ". Choose a " + label + " file.";
      return "";
    },
    num(id, { min = -Infinity, max = Infinity, asInt = false, def = null, req = true, label = "Value" } = {}) {
      const el = typeof id === "string" ? $("#" + id) : id;
      const raw = el ? String(el.value).trim() : "";
      if (raw === "") { if (!req) return def; throw new Error(label + " is required."); }
      const v = Number(raw.replace(/[,_\s]/g, ""));
      if (!isFinite(v)) throw new Error(label + " must be a number.");
      if (v < min || v > max) throw new Error(label + " must be between " + min + " and " + max + ".");
      return asInt ? Math.round(v) : v;
    },
    userErr(msg) { const e = new Error(msg); e.user = true; return e; },
    async copy(text) {
      try { await navigator.clipboard.writeText(text); return true; }
      catch (e) {
        const ta = D.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        D.body.appendChild(ta); ta.select();
        let ok = false; try { ok = D.execCommand("copy"); } catch (_) { ok = false; }
        ta.remove(); return ok;
      }
    },
    /* ZIP several named blobs using lazily-loaded JSZip */
    async zip(pairs) {
      const JSZip = await T.cdn("jszip");
      const z = new JSZip();
      pairs.forEach(p => z.file(p.name, p.blob));
      return z.generateAsync({ type: "blob" });
    },
    /* results list with per-item download buttons + optional group download */
    results(host, items, groupLabel) {
      const h = typeof host === "string" ? $(host) : host; if (!h) return;
      h.replaceChildren();
      items.forEach(it => {
        const p = D.createElement("p"); p.className = "hint";
        const a = D.createElement("a"); a.className = "res-link"; a.href = it.url; a.download = it.name; a.textContent = it.name;
        const s = D.createElement("span"); s.className = "tiny muted"; s.textContent = " " + T.bytes(it.blob.size) + (it.note ? " · " + it.note : "");
        p.append(a, s); h.appendChild(p);
      });
      const n = D.createElement("p"); n.className = "hint"; n.textContent = items.length + " result" + (items.length === 1 ? "" : "s") + (groupLabel ? " — " + groupLabel : "");
      h.appendChild(n);
    },
    /* ---------- generic image-tool pipeline ----------
       spec: { acceptRe, typeRe, label, maxOut, prepare(bmp,file,opts) -> canvas-like,
               process(ctx) where ctx = {file,bmp,opts,i,n,out(push),status,progress} }
       Wires: dropzone, single/multi, progress, results, ZIP, clear, error handling. */
    imageTool(spec) {
      const files = [], out = [];
      const dz = $("#dz"), inp = $("#file"), goBtn = $("#go"), clearBtn = $("#clear"),
            dl = $("#dl"), zipBtn = $("#zip"), outBox = $("#out"), emptyEl = $("#empty");
      let draw = null, groupUrl = null;
      const nameBase = f => f.name.replace(/\.[^.]+$/, "").slice(0, 40) || "image";
      const clearOut = () => { out.forEach(o => o.url && T.revoke(o.url)); out.length = 0; if (groupUrl) { T.revoke(groupUrl); groupUrl = null; } dl && (dl.hidden = true); zipBtn && (zipBtn.disabled = true, zipBtn.textContent = "Download all as ZIP"); outBox && outBox.replaceChildren(); };
      const refresh = () => { if (emptyEl) emptyEl.hidden = !!files.length; if (clearBtn) clearBtn.disabled = !files.length; if (goBtn) goBtn.disabled = !files.length; };
      draw = T.tileList(files, els => { if ($("#list")) $("#list").replaceChildren(...els); }, refresh);

      T.dropzone(dz, inp, async fs => {
        T.setErr("");
        const keep = spec.multiple ? fs : fs.slice(-1);
        const bad = [];
        if (!spec.multiple) files.length = 0; /* a new single file replaces the previous one */
        keep.forEach(f => { const m = T.checkFile(f, spec.typeRe || spec.acceptRe, spec.label); m ? bad.push(m) : files.push(f); });
        clearOut(); draw(); refresh();
        if (bad.length) T.setErr(bad.join(" "));
        if (spec.onFiles) spec.onFiles(files);
      }, spec.acceptRe);

      T.on(clearBtn, "click", () => { files.length = 0; clearOut(); draw(); refresh(); T.setErr(""); T.status(""); });

      const run = async () => {
        if (!files.length) { T.setErr("Add an image first."); return; }
        T.setErr(""); clearOut(); T.progress(1);
        const opts = spec.readOpts ? spec.readOpts() : {};
        try {
          for (let i = 0; i < files.length; i++) {
            const f = files[i];
            T.status("Working on " + (i + 1) + "/" + files.length + ": " + f.name + " (" + T.bytes(f.size) + ")");
            const bmp = await T.decode(f);
            const ctx = { T, file: f, bmp, opts, i, n: files.length, base: nameBase(f),
              out(items) { items.forEach(it => { const url = T.makeURL(it.blob); out.push({ ...it, url }); }); },
              userErr: m => T.userErr(m) };
            await spec.process(ctx);
            if (bmp.close) bmp.close();
            T.progress(((i + 1) / files.length) * 98);
            await T.yieldUI();
          }
          if (!out.length) throw new Error("Nothing was produced — check the options.");
          if (outBox) { outBox.appendChild(buildGrid(out)); }
          if (out.length === 1 && dl) { dl.href = out[0].url; dl.download = out[0].name; dl.textContent = "Download result"; dl.hidden = false; T.status("Ready — press Download (" + T.bytes(out[0].blob.size) + ")."); }
          else if (zipBtn) { zipBtn.hidden = false; zipBtn.disabled = false; if (dl) dl.hidden = true; T.status(out.length + " files ready — save individually from the grid, or press Download all as ZIP."); }
          T.progress(100);
        } catch (e) {
          T.progress(0); const p = $(".prog"); if (p) p.hidden = true;
          T.status("");
          T.setErr(e && e.user ? e.message : ("Could not finish: " + (e.message || e) + ". Try a smaller or different file."));
        }
      };
      function buildGrid(items) {
        const g = D.createElement("div"); g.className = "out-grid";
        items.forEach(it => {
          const box = D.createElement("div"); box.className = "out-item";
          if (/^image\//.test(it.type || "") && !/pdf/.test(it.name)) {
            const im = D.createElement("img"); im.src = it.url; im.alt = it.name + " preview"; im.loading = "lazy"; im.width = 200; im.height = 200; box.appendChild(im);
          }
          const cap = D.createElement("span"); cap.className = "tiny muted"; cap.textContent = (it.name.length > 22 ? it.name.slice(0, 20) + "…" : it.name) + (it.note ? " · " + it.note : "");
          const a = D.createElement("a"); a.className = "btn btn-sm btn-ghost"; a.href = it.url; a.download = it.name; a.textContent = "Save";
          box.append(cap, a); g.appendChild(box);
        });
        return g;
      }
      T.on(goBtn, "click", run);
      T.on(zipBtn, "click", async () => {
        if (out.length < 1) return;
        zipBtn.disabled = true; zipBtn.textContent = "Packing…";
        try {
          const blob = await T.zip(out.map(o => ({ name: o.name, blob: o.blob })));
          if (groupUrl) T.revoke(groupUrl);
          groupUrl = T.makeURL(blob);
          if (dl) { dl.href = groupUrl; dl.download = (spec.zipName || "images") + ".zip"; dl.textContent = "Download ZIP (" + out.length + " files)"; dl.hidden = false; }
          else T.download(blob, (spec.zipName || "images") + ".zip");
          T.status("ZIP ready (" + T.bytes(blob.size) + ").");
          zipBtn.textContent = "Download all as ZIP (" + out.length + ")";
        } catch (e) { T.setErr(e.message); }
        zipBtn.disabled = false;
      });
      return { files, out, run, clearOut, refresh };
    },
    /* ---------- drag-and-drop file zone ---------- */
    dropzone(el, input, cb, acceptRe) {
      if (!el) return;
      const ok = fs => !acceptRe || fs.filter(f => acceptRe.test(f.name || f.type)).length === fs.length;
      el.addEventListener("click", () => input && input.click());
      el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input && input.click(); } });
      ["dragenter", "dragover"].forEach(ev => el.addEventListener(ev, e => { e.preventDefault(); el.classList.add("over"); }));
      ["dragleave", "drop"].forEach(ev => el.addEventListener(ev, e => { e.preventDefault(); el.classList.remove("over"); }));
      el.addEventListener("drop", async e => {
        const files = Array.from((e.dataTransfer && e.dataTransfer.files) || []);
        if (!files.length) return;
        if (!ok(files)) { T.setErr("Wrong file type. Please drop " + (el.dataset.acceptHint || "the supported") + " files."); return; }
        cb(files);
      });
      if (input) input.addEventListener("change", () => { if (input.files.length) cb(Array.from(input.files)); input.removeAttribute("data-keep"); input.value = ""; });
    },
    /* reorderable thumbnails bound to a file array */
    tileList(files, render, onReorder) {
      let dragI = null;
      return function draw() {
        render(files.map((f, i) => {
          const li = D.createElement("li");
          li.className = "tile"; li.draggable = true; li.dataset.i = i;
          li.innerHTML = '<span class="tile-thumb"></span><span class="tile-meta"><b></b><small></small></span><button type="button" class="tile-x" aria-label="Remove">✕</button>';
          li.querySelector("b").textContent = f.name.length > 28 ? f.name.slice(0, 25) + "…" : f.name;
          li.querySelector("small").textContent = T.bytes(f.size);
          const thumb = li.querySelector(".tile-thumb");
          if (f.type.startsWith("image") || /\.heic?$/i.test(f.name)) { const im = D.createElement("img"); im.alt = ""; im.loading = "lazy"; im.src = makeURL(f); thumb.appendChild(im); }
          li.querySelector(".tile-x").addEventListener("click", () => { files.splice(i, 1); draw(); onReorder && onReorder(files); });
          li.addEventListener("dragstart", () => { dragI = i; li.classList.add("drag"); });
          li.addEventListener("dragend", () => { li.classList.remove("drag"); onReorder && onReorder(files); });
          li.addEventListener("dragover", e => { e.preventDefault(); li.classList.add("hit"); });
          li.addEventListener("dragleave", () => li.classList.remove("hit"));
          li.addEventListener("drop", e => { e.preventDefault(); li.classList.remove("hit"); if (dragI === null || dragI === i) return; const [m] = files.splice(dragI, 1); files.splice(i, 0, m); dragI = null; draw(); onReorder && onReorder(files); });
          return li;
        }));
      };
    }
  };

  W.WST_T = Object.assign(W.WST_T || {}, T);

  /* ---------- link prefetch: the next tool is fetched the moment a finger or cursor reaches it ---------- */
  (function prefetch() {
    if (!("requestIdleCallback" in W) && !W.Promise) return;
    const done = new Set();
    function warm(e) {
      const a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!a) return;
      const h = a.getAttribute("href") || "";
      if (done.has(h) || h.charAt(0) !== "/" || !/^\/(tools\/[\w.-]+|[\w-]+\.html)$/.test(h)) return;
      if (h === location.pathname) return;
      done.add(h);
      const l = D.createElement("link");
      l.rel = "prefetch"; l.href = h;
      D.head.appendChild(l);
    }
    ["pointerover", "focusin"].forEach(ev => D.addEventListener(ev, warm, { passive: true, capture: true }));
  })();

  /* ---------- install this tool as its own app ----------
     Every tool page links a manifest with its own id + start_url, so the browser installs
     exactly the tool that is open rather than the whole site. The prompt is position:fixed,
     which is what keeps it from shifting any content when the browser decides to offer it. */
  (function installApp() {
    const main = D.querySelector("main[data-slug]");
    if (!main) return;
    if (W.matchMedia && W.matchMedia("(display-mode: standalone)").matches) return;
    const h1 = D.querySelector(".tool-hero h1");
    const name = ((h1 && h1.textContent) || (document.title || "").split("—")[0] || "this tool").trim();
    let deferred = null, box = null;
    function mount() {
      if (box) return box;
      box = D.createElement("div");
      box.id = "ip-box"; box.className = "ip-box"; box.setAttribute("role", "region");
      box.setAttribute("aria-label", "Install app");
      box.innerHTML = '<span class="ip-x" role="img" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24"><path d="M12 3v11m0 0 4-4m-4 4-4-4M4 19h16"/></svg></span>' +
        '<span class="ip-t"><b>' + name.replace(/&/g, "&amp;").replace(/</g, "&lt;") +
        '</b><small>Install as an app — opens full screen, works offline.</small></span>' +
        '<button type="button" class="btn btn-sm btn-pri" id="ip-go">Install</button>' +
        '<button type="button" class="ip-no" id="ip-no" aria-label="Dismiss the install suggestion">✕</button>';
      D.body.appendChild(box);
      box.querySelector("#ip-go").addEventListener("click", ask);
      box.querySelector("#ip-no").addEventListener("click", close);
      return box;
    }
    function ask(ev) {
      ev && ev.preventDefault();
      if (!deferred) return close();
      deferred.prompt();
      deferred.userChoice.then(() => { deferred = null; close(); }).catch(() => { });
    }
    function close() { if (box) box.remove(); box = null; }
    W.addEventListener("beforeinstallprompt", ev => { ev.preventDefault(); deferred = ev; mount(); });
    W.addEventListener("appinstalled", close);
    W.addEventListener("message", ev => { if (ev.data === "wafa-install") ask(); });
  })();

  /* ---------- hub search filter ---------- */
  D.addEventListener("DOMContentLoaded", () => {
    const q = $("#q");
    if (q) {
      const cards = $$(".t3d-card[data-search]"), secs = $$("[data-cat]");
      q.addEventListener("input", () => {
        const v = q.value.trim().toLowerCase();
        cards.forEach(c => { c.hidden = !!v && (c.dataset.search || "").indexOf(v) === -1; });
        secs.forEach(s => { s.hidden = !!v && !$$(".t3d-card[data-search]:not([hidden])", s).length; });
        const n = $("#no-res"); if (n) n.hidden = !v || !!$$(".t3d-card[data-search]:not([hidden])").length;
      });
    }
    /* tools-page EN/UR note toggle (data-ur lines) */
    const lt = $("#lang-toggle");
    if (lt && location.pathname.indexOf("/tools") === 0) {
      lt.addEventListener("click", () => {
        const ur = D.body.classList.toggle("ur-view");
        $$("[data-ru]", lt.ownerDocument).forEach(el => { el.hidden = !ur; });
        lt.textContent = ur ? "English" : "اردو";
        lt.setAttribute("aria-pressed", ur);
      });
    }
  });
})();
