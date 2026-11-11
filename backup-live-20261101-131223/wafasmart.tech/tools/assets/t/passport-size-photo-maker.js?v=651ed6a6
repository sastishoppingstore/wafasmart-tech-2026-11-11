/* passport-size-photo-maker — crop to exact mm at 300 dpi, then tile on a print sheet. */
(function () {
  "use strict";
  const T = window.WST_T, D = document; if (!T) return;
  const $ = T.$;
  T.rangeOut("ox", "oxv", "%"); T.rangeOut("oy", "oyv", "%"); T.rangeOut("q", "qv", "%");

  const DPI = 300, MM = 0.0393701; /* mm → inch */
  const SHEETS = { "46": [6, 4], "57": [7, 5], a4: [8.27, 11.69] };
  const preset = $("#preset"), custom = $("#custommm"), customH = $("#custommmh");
  const go = $("#go"), dl = $("#dl"), outBox = $("#out"), clearBtn = $("#clear"), emptyEl = $("#empty");
  let bmp = null, file = null, lastUrl = null;

  T.on(preset, "change", () => {
    const c = preset.value === "custom";
    custom.hidden = !c; customH.hidden = !c;
    preview();
  });
  function mm() {
    if (preset.value === "custom") {
      const w = T.num($("#mmw"), { min: 20, max: 80, def: 35, label: "Width (mm)" });
      const h = T.num($("#mmh"), { min: 20, max: 100, def: 45, label: "Height (mm)" });
      return { w: w, h: h };
    }
    const p = preset.value.split("x");
    return { w: +p[0], h: +p[1] };
  }
  function pxSize() {
    const m = mm();
    return { w: Math.round(m.w * MM * DPI), h: Math.round(m.h * MM * DPI), mm: m };
  }
  /* crop window positioned by the two sliders, then drawn into the exact pixel box */
  function photo(o) {
    const t = pxSize(), ar = t.w / t.h;
    let cw = bmp.width, ch = Math.round(cw / ar);
    if (ch > bmp.height) { ch = bmp.height; cw = Math.round(ch * ar); }
    const x = Math.round((bmp.width - cw) * o.ox), y = Math.round((bmp.height - ch) * o.oy);
    return T.paint(bmp, t.w, t.h, { crop: { x: x, y: y, w: cw, h: ch }, alpha: false, fill: o.bg });
  }
  function opts() {
    return {
      ox: (+$("#ox").value) / 100,
      oy: (+$("#oy").value) / 100,
      bg: $("#bg").value,
      sheet: $("#sheet").value,
      gap: T.num($("#gap"), { min: 0, max: 15, def: 3, label: "Gap" }),
      cut: $("#cut").checked,
      guide: $("#guide").checked,
      q: (+$("#q").value) / 100
    };
  }
  function guides(c) {
    const g = c.getContext("2d"), w = c.width, h = c.height;
    if (!$("#guide").checked) return;
    g.save();
    g.strokeStyle = "rgba(47,107,255,.85)"; g.lineWidth = Math.max(1, w / 300); g.setLineDash([w / 28, w / 40]);
    /* head must occupy ~70–80% of height, chin at ~88%, crown at ~8% */
    [0.08, 0.22, 0.88].forEach(p => { g.beginPath(); g.moveTo(0, h * p); g.lineTo(w, h * p); g.stroke(); });
    g.beginPath(); g.moveTo(w * 0.2, 0); g.lineTo(w * 0.2, h); g.stroke();
    g.beginPath(); g.moveTo(w * 0.8, 0); g.lineTo(w * 0.8, h); g.stroke();
    g.restore();
    return g;
  }
  function preview() {
    if (!bmp) return;
    let src;
    try { src = photo(opts()); } catch (e) { return; }
    const t = pxSize();
    const c = D.createElement("canvas");
    const k = Math.min(1, 260 / t.w);
    c.width = Math.round(t.w * k); c.height = Math.round(t.h * k);
    c.getContext("2d").drawImage(src, 0, 0, c.width, c.height);
    guides(c);
    outBox.replaceChildren();
    const box = D.createElement("div"); box.className = "imgwrap";
    box.appendChild(c);
    const cap = D.createElement("p"); cap.className = "hint";
    cap.textContent = "Cropped preview — " + t.mm.w + "×" + t.mm.h + " mm at 300 dpi = " + t.w + "×" + t.h + " px. Guide lines are preview only.";
    box.appendChild(cap);
    outBox.appendChild(box);
  }
  ["ox", "oy", "bg", "guide", "sheet", "cut", "gap", "q"].forEach(id => T.on($("#" + id), "input", preview));

  T.dropzone($("#dz"), $("#file"), fs => {
    T.setErr("");
    const f = fs.slice(-1)[0];
    if (!f) return;
    const bad = T.checkFile(f, /^image\//, "an image (JPG, PNG, WebP or HEIC)");
    if (bad) { T.setErr(bad); return; }
    file = f;
    T.decode(f).then(b => {
      if (bmp && bmp.close) bmp.close();
      bmp = b;
      if (emptyEl) emptyEl.hidden = true;
      go.disabled = false; clearBtn.disabled = false;
      T.status(f.name + " — " + b.width + "×" + b.height + " px. Position the face with the two sliders.");
      preview();
    }, e => { bmp = null; T.setErr(e.message || "That image could not be opened."); });
  }, /\.(jpe?g|png|webp|gif|bmp|jfif|heic|heif)$/i);

  T.on(clearBtn, "click", () => {
    bmp = null; file = null; go.disabled = true; clearBtn.disabled = true;
    if (lastUrl) { T.revoke(lastUrl); lastUrl = null; }
    if (dl) dl.hidden = true;
    outBox.replaceChildren();
    if (emptyEl) emptyEl.hidden = false;
    T.status(""); T.setErr("");
  });

  T.on(go, "click", async () => {
    if (!bmp) { T.setErr("Add a photo first."); return; }
    T.setErr("");
    const o = opts();
    go.disabled = true;
    try {
      const t = pxSize();
      const single = photo(o);
      const base = (file.name.replace(/\.[^.]+$/, "").slice(0, 30) || "photo");
      const items = [];
      const jpg = await T.encode(single, "image/jpeg", o.q);
      items.push({ name: base + "-" + t.mm.w + "x" + t.mm.h + "mm-" + t.w + "x" + t.h + ".jpg", blob: jpg, type: "image/jpeg" });

      let sheetInfo = "";
      if (o.sheet !== "0") {
        const s = SHEETS[o.sheet];
        const sw = Math.round(s[0] * DPI), sh = Math.round(s[1] * DPI);
        const gap = Math.round(o.gap * MM * DPI), margin = Math.round(4 * MM * DPI);
        const cols = Math.max(1, Math.floor((sw - 2 * margin + gap) / (t.w + gap)));
        const rows = Math.max(1, Math.floor((sh - 2 * margin + gap) / (t.h + gap)));
        const total = cols * rows;
        sheetInfo = total + " photos on " + s[0] + "×" + s[1] + " in";
        const sheet = D.createElement("canvas");
        sheet.width = sw; sheet.height = sh;
        const x = sheet.getContext("2d");
        x.fillStyle = o.bg; x.fillRect(0, 0, sw, sh);
        const blockW = cols * t.w + (cols - 1) * gap, blockH = rows * t.h + (rows - 1) * gap;
        const x0 = Math.round((sw - blockW) / 2), y0 = Math.round((sh - blockH) / 2);
        for (let r = 0; r < rows; r++) for (let cI = 0; cI < cols; cI++) {
          const px = x0 + cI * (t.w + gap), py = y0 + r * (t.h + gap);
          x.drawImage(single, px, py);
          if (o.cut) {
            x.strokeStyle = "rgba(90,110,150,.75)";
            x.lineWidth = Math.max(1, Math.round(DPI / 300));
            x.strokeRect(px + 0.5, py + 0.5, t.w - 1, t.h - 1);
          }
        }
        const blob = await T.encode(sheet, "image/jpeg", Math.max(0.9, o.q));
        items.push({ name: base + "-sheet-" + (o.sheet === "a4" ? "A4" : o.sheet + "in") + "-" + total + "pcs.jpg", blob: blob, type: "image/jpeg" });
        sheetInfo += " (" + T.bytes(blob.size) + ")";
      }

      /* one download link for the most useful file; grid holds both */
      if (outBox) {
        outBox.replaceChildren();
        const grid = D.createElement("div"); grid.className = "out-grid";
        items.forEach(it => {
          const url = T.makeURL(it.blob);
          const box = D.createElement("div"); box.className = "out-item";
          if (/^image\//.test(it.type)) {
            const im = D.createElement("img"); im.src = url; im.alt = it.name; im.loading = "lazy";
            box.appendChild(im);
          }
          const cap = D.createElement("span"); cap.className = "tiny muted";
          cap.textContent = it.name.length > 24 ? it.name.slice(0, 22) + "…" : it.name;
          const a = D.createElement("a"); a.className = "btn btn-sm btn-ghost"; a.href = url; a.download = it.name; a.textContent = "Save";
          box.append(cap, a); grid.appendChild(box);
        });
        outBox.appendChild(grid);
        const note = D.createElement("p"); note.className = "hint";
        note.textContent = "Print at 100% scale (“fit to page” off) and measure with a ruler before submitting. Official specs change — verify the current requirement for your document." + (sheetInfo ? " Sheet: " + sheetInfo + "." : "");
        outBox.appendChild(note);
      }
      if (dl) dl.hidden = true;
      T.status("Ready: " + items.map(i => T.bytes(i.blob.size) + " " + i.name.split(".").pop()).join(" · ") + ". Save from the grid.");
    } catch (e) {
      T.setErr(e.user ? e.message : "Could not build the sheet — " + (e.message || e) + ".");
    } finally { go.disabled = false; }
  });
})();
