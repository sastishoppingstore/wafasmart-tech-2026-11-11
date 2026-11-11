/* crop-image — drag a selection on a live preview, export the selected pixels. */
(function () {
  "use strict";
  const T = window.WST_T, D = document; if (!T) return;
  const $ = T.$;
  T.rangeOut("q", "qv");

  const cv = $("#cv"), ctx = cv.getContext("2d"), go = $("#go"), dl = $("#dl"), outBox = $("#out");
  const cx = $("#cx"), cy = $("#cy"), cw = $("#cw"), ch = $("#ch"), ow = $("#ow");
  const emptyEl = $("#empty"), tip = $("#tip");
  let bmp = null, rect = null, ar = 0, file = null, mode = "", start = null, anchor = null, lastUrl = null;

  function viewK() { return cv.width / bmp.width; }
  function srcPt(e) {
    const r = cv.getBoundingClientRect();
    return { x: (e.clientX - r.left) * bmp.width / r.width, y: (e.clientY - r.top) * bmp.height / r.height };
  }
  function norm(a, b, c, d) {
    return { x: Math.min(a, c), y: Math.min(b, d), w: Math.abs(c - a), h: Math.abs(d - b) };
  }
  function clampRect(r) {
    if (!r) return null;
    let w = Math.round(r.w), h = Math.round(r.h);
    w = Math.max(16, Math.min(w, bmp.width)); h = Math.max(16, Math.min(h, bmp.height));
    if (ar) {
      h = Math.round(w / ar);
      if (h > bmp.height) { h = bmp.height; w = Math.round(h * ar); }
      w = Math.max(16, Math.min(w, bmp.width));
    }
    return {
      x: Math.max(0, Math.min(Math.round(r.x), bmp.width - w)),
      y: Math.max(0, Math.min(Math.round(r.y), bmp.height - h)),
      w: w, h: h
    };
  }
  function draw() {
    if (!bmp) return;
    const k = viewK();
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.drawImage(bmp, 0, 0, cv.width, cv.height);
    if (!rect) return;
    const x = rect.x * k, y = rect.y * k, w = rect.w * k, h = rect.h * k;
    ctx.fillStyle = "rgba(5,13,32,.66)";
    ctx.fillRect(0, 0, cv.width, y);
    ctx.fillRect(0, y + h, cv.width, cv.height - y - h);
    ctx.fillRect(0, y, x, h);
    ctx.fillRect(x + w, y, cv.width - x - w, h);
    ctx.strokeStyle = "#f4c430"; ctx.lineWidth = 2; ctx.setLineDash([7, 4]);
    ctx.strokeRect(x + 1, y + 1, w - 2, h - 2); ctx.setLineDash([]);
    ctx.strokeStyle = "rgba(255,255,255,.42)"; ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(x + w * i / 3, y); ctx.lineTo(x + w * i / 3, y + h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y + h * i / 3); ctx.lineTo(x + w, y + h * i / 3); ctx.stroke();
    }
    ctx.fillStyle = "#f4c430";
    [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].forEach(p => ctx.fillRect(p[0] - 5, p[1] - 5, 10, 10));
  }
  function sync() {
    if (!rect) return;
    [cx, cy, cw, ch].forEach(el => { el.disabled = false; });
    cx.value = rect.x; cy.value = rect.y; cw.value = rect.w; ch.value = rect.h;
    T.status("Crop " + rect.w + "×" + rect.h + " px of a " + bmp.width + "×" + bmp.height + " image.");
  }
  function hit(p) {
    const tol = 14 * bmp.width / cv.width, r = rect;
    const near = a => Math.abs(p.x - a) <= tol, nearY = a => Math.abs(p.y - a) <= tol;
    let m = "";
    if (near(r.x)) m += "w"; else if (near(r.x + r.w)) m += "e";
    if (nearY(r.y)) m += "n"; else if (nearY(r.y + r.h)) m += "s";
    if (m) return m;
    if (p.x > r.x && p.x < r.x + r.w && p.y > r.y && p.y < r.y + r.h) return "move";
    return "new";
  }
  T.on(cv, "pointerdown", e => {
    if (!bmp) return;
    e.preventDefault();
    try { cv.setPointerCapture(e.pointerId); } catch (_) { }
    const p = srcPt(e);
    mode = rect ? hit(p) : "new";
    start = { p: p, rect: rect ? { x: rect.x, y: rect.y, w: rect.w, h: rect.h } : null };
    if (mode === "new") anchor = p;
  });
  T.on(cv, "pointermove", e => {
    if (!mode || !bmp) return;
    const p = srcPt(e);
    if (mode === "new") rect = clampRect(norm(anchor.x, anchor.y, p.x, p.y));
    else if (mode === "move") {
      const r = start.rect;
      rect = clampRect({ x: r.x + (p.x - start.p.x), y: r.y + (p.y - start.p.y), w: r.w, h: r.h });
    } else {
      const r = { x: start.rect.x, y: start.rect.y, w: start.rect.w, h: start.rect.h };
      if (mode.indexOf("w") > -1) { const nx = Math.min(p.x, r.x + r.w - 16); r.w += r.x - nx; r.x = nx; }
      if (mode.indexOf("e") > -1) r.w = Math.max(16, p.x - r.x);
      if (mode.indexOf("n") > -1) { const ny = Math.min(p.y, r.y + r.h - 16); r.h += r.y - ny; r.y = ny; }
      if (mode.indexOf("s") > -1) r.h = Math.max(16, p.y - r.y);
      if (ar) { if (mode === "n" || mode === "s") r.w = r.h * ar; else r.h = r.w / ar; }
      rect = clampRect(r);
    }
    draw(); sync();
  });
  ["pointerup", "pointercancel"].forEach(ev => T.on(cv, ev, () => { mode = ""; }));

  const boxes = [cx, cy, cw, ch];
  boxes.forEach(el => T.on(el, "change", () => {
    if (!bmp) return;
    try {
      const r = {
        x: T.num(cx, { min: 0, max: bmp.width - 16, asInt: true, label: "Left X" }),
        y: T.num(cy, { min: 0, max: bmp.height - 16, asInt: true, label: "Top Y" }),
        w: T.num(cw, { min: 16, max: bmp.width, asInt: true, label: "Width" }),
        h: T.num(ch, { min: 16, max: bmp.height, asInt: true, label: "Height" })
      };
      rect = clampRect(r); draw(); T.setErr("");
    } catch (e) { T.setErr(e.message); }
  }));

  T.$$(".seg[data-ar]").forEach(s => T.on(s, "click", () => {
    ar = +s.dataset.ar;
    T.$$(".seg[data-ar]").forEach(o => o.setAttribute("aria-pressed", String(o === s)));
    if (rect) {
      /* keep the box centred on its middle, then re-lock */
      const mx = rect.x + rect.w / 2, my = rect.y + rect.h / 2;
      const w = Math.min(bmp.width, ar ? Math.min(rect.w, bmp.height * ar) : rect.w);
      rect = clampRect({ x: mx - w / 2, y: my - (ar ? w / ar : rect.h) / 2, w: w, h: ar ? w / ar : rect.h });
      draw(); sync();
    }
    if (bmp) T.status(ar ? "Aspect locked to " + s.textContent.trim() + "." : "Free cropping.");
  }));

  function load(fs) {
    file = fs[0];
    T.setErr("");
    T.decode(file).then(b => {
      if (bmp && bmp.close) bmp.close();
      bmp = b;
      const k = Math.min(1, 600 / Math.max(bmp.width, bmp.height));
      cv.width = Math.max(1, Math.round(bmp.width * k));
      cv.height = Math.max(1, Math.round(bmp.height * k));
      rect = clampRect({ x: bmp.width * 0.08, y: bmp.height * 0.08, w: bmp.width * 0.84, h: bmp.height * 0.84 });
      cx.max = bmp.width - 16; cy.max = bmp.height - 16; cw.max = bmp.width; ch.max = bmp.height;
      boxes.forEach(el => { el.disabled = false; });
      if (emptyEl) emptyEl.hidden = true;
      if (tip) tip.textContent = file.name + " — " + bmp.width + "×" + bmp.height + " px. Drag to redraw the crop, drag inside it to move, drag an edge to resize.";
      go.disabled = false;
      $("#clear").disabled = false;
      draw(); sync();
    }).catch(e => { bmp = null; T.setErr(e.message || "That image could not be opened."); });
  }
  T.dropzone($("#dz"), $("#file"), fs => {
    const bad = T.checkFile(fs[0], /^image\//, "an image (JPG, PNG, WebP, GIF, BMP or HEIC)");
    if (bad) { T.setErr(bad); return; }
    load(fs.slice(-1));
  }, /\.(jpe?g|png|webp|gif|bmp|jfif|heic|heif)$/i);

  T.on($("#clear"), "click", () => {
    bmp = null; rect = null; file = null; go.disabled = true;
    if (lastUrl) { T.revoke(lastUrl); lastUrl = null; }
    if (dl) dl.hidden = true;
    if (outBox) outBox.replaceChildren();
    if (emptyEl) emptyEl.hidden = false;
    ctx.clearRect(0, 0, cv.width, cv.height);
    T.status(""); T.setErr("");
    boxes.forEach(el => { el.value = ""; el.disabled = true; });
  });

  T.on(go, "click", async () => {
    if (!bmp) { T.setErr("Add a photo first."); return; }
    T.setErr("");
    if (!rect) { T.setErr("Drag a crop box on the picture first."); return; }
    try {
      const type = $("#fmt").value, q = (+$("#q").value) / 100;
      let w = rect.w, h = rect.h;
      const targetW = ow.value ? T.num(ow, { min: 0, max: 8000, asInt: true, label: "Output width" }) : 0;
      if (targetW) { h = Math.max(1, Math.round(rect.h * (targetW / rect.w))); w = targetW; }
      go.disabled = true; T.status("Cropping…");
      const c = T.paint(bmp, w, h, { crop: rect, alpha: type === "image/png" || type === "image/webp", fill: "#fff" });
      const blob = await T.encode(c, type, type === "image/jpeg" ? q : undefined);
      const name = (file.name.replace(/\.[^.]+$/, "").slice(0, 40) || "image") + "-cropped." + T.ext(type);
      if (lastUrl) T.revoke(lastUrl);
      lastUrl = T.makeURL(blob);
      if (dl) { dl.href = lastUrl; dl.download = name; dl.textContent = "Download cropped image"; dl.hidden = false; }
      if (outBox) {
        outBox.replaceChildren();
        const box = D.createElement("div"); box.className = "imgwrap";
        const im = D.createElement("img"); im.src = lastUrl; im.alt = name + " preview"; im.width = w; im.height = h;
        const cap = D.createElement("p"); cap.className = "hint";
        cap.textContent = name + " — " + w + "×" + h + " px, " + T.bytes(blob.size) + (targetW ? " (resized from " + rect.w + "×" + rect.h + ")" : "");
        box.append(im, cap); outBox.appendChild(box);
      }
      T.status("Cropped to " + w + "×" + h + " (" + T.bytes(blob.size) + ").");
    } catch (e) {
      T.setErr(e.user ? e.message : "Could not crop this file — " + (e.message || e) + ".");
    } finally { go.disabled = false; }
  });
})();
