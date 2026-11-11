/* image-to-pdf — all processing local; pdf-lib loads only on Convert click. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) { console.error("tools.js missing"); return; }
  const $ = T.$, $$ = T.$$;
  const files = [];
  const listEl = $("#list"), emptyEl = $("#empty"), clearBtn = $("#clear");
  let draw = null, outUrl = null;

  draw = T.tileList(files, els => { listEl.replaceChildren(...els); }, refresh);
  function refresh() {
    clearBtn.disabled = !files.length;
    emptyEl.hidden = !!files.length;
    T.setErr("");
  }

  T.dropzone($("#dz"), $("#file"), fs => {
    const bad = fs.filter(f => !/^image\//.test(f.type) && !/\.(jpe?g|png|webp|gif|bmp|avif|heic|heif)$/i.test(f.name));
    if (bad.length) { T.setErr("Not an image: " + bad.map(b => b.name).join(", ") + ". Supported: JPG, PNG, WebP, GIF, BMP, AVIF, HEIC."); }
    const big = fs.filter(f => f.size > 50 * 1048576);
    if (big.length) { T.setErr(big.map(b => b.name).join(", ") + " is over 50 MB — please crop or compress it first."); return; }
    fs.filter(f => f.size <= 50 * 1048576).forEach(f => files.push(f));
    draw(); refresh();
  }, /^image\/|\.heic?$/i);

  T.on($("#q"), "input", e => $("#qv").textContent = e.target.value + "%");
  T.on(clearBtn, "click", () => { files.length = 0; draw(); refresh(); });

  const SIZES = { a4: [595.28, 841.89], letter: [612, 792] };

  T.on($("#go"), "click", async () => {
    if (!files.length) { T.setErr("Add at least one image first."); return; }
    T.setErr("");
    const dl = $("#dl"); if (dl) dl.hidden = true;
    let PDFLib;
    try {
      T.status("Loading the PDF engine (first time only, from jsDelivr CDN)…");
      T.progress(2);
      PDFLib = await T.cdn("pdf-lib");
    } catch (e) { T.status(""); T.setErr(e.message); return; }
    const size = $("#size").value, orient = $("#orient").value, margin = Number($("#margin").value);
    const q = Number($("#q").value) / 100;
    const doc = await PDFLib.PDFDocument.create();
    try {
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        T.status(`Page ${i + 1}/${files.length}: ${f.name} (${T.bytes(f.size)})`);
        const bmp = await T.decode(f);
        let pxW = bmp.width, pxH = bmp.height;
        // fit-to-image: page = picture at ~150 dpi, no margins
        let pw, ph, m = margin;
        if (size === "fit") {
          const s = 72 / 150;
          pw = pxW * s; ph = pxH * s; m = 0;
        } else {
          let [w, h] = SIZES[size];
          const land = pxW > pxH;
          if (orient === "auto") { pw = land ? h : w; ph = land ? w : h; }
          else if (orient === "l") { pw = h; ph = w; }
          else { pw = w; ph = h; }
        }
        const cw = pw - 2 * m, ch = ph - 2 * m;
        const scale = Math.min(cw / pxW, ch / pxH);
        const c = T.canvasOf(bmp, scale >= 1 ? 1 : Math.max(0.02, scale)); // never upscale; downscale to printed size
        const blob = await T.toBlob(c, "image/jpeg", q);
        const emb = await doc.embedJpg(await blob.arrayBuffer());
        const page = doc.addPage([pw, ph]);
        const iw = pxW * scale, ih = pxH * scale;
        page.drawImage(emb, { x: m + (cw - iw) / 2, y: m + (ch - ih) / 2, width: iw, height: ih });
        if (bmp.close) bmp.close();
        T.progress(5 + ((i + 1) / files.length) * 90);
        await T.yieldUI();
      }
      T.status("Finishing…");
      const bytes = await doc.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const name = (($("#name") && $("#name").value.trim()) || "photos").replace(/[^\w\-. ]+/g, "_") + ".pdf";
      if (outUrl) T.revoke(outUrl);
      outUrl = T.makeURL(blob);
      dl.download = name; dl.href = outUrl; dl.hidden = false;
      T.status(`Done — ${files.length} page${files.length > 1 ? "s" : ""}, ${T.bytes(blob.size)}. Press Download PDF.`);
      T.progress(100);
    } catch (e) {
      T.status(""); T.progress(0); $(".prog") && ($(".prog").hidden = true);
      T.setErr(e && /heic/i.test(e.message) ? e.message : "Something went wrong while building the PDF (" + (e.message || e) + "). Try fewer or smaller images.");
    }
  });
})();
