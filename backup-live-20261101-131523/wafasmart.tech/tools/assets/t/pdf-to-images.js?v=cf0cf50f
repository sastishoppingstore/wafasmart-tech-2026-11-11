/* pdf-to-images — pdf.js renders each page to canvas; JSZip packs the set. All local. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$, $$ = T.$$;
  let file = null, parts = [];
  const goBtn = $("#go"), zipBtn = $("#zip"), clearBtn = $("#clear"), grid = $("#grid"), finfo = $("#finfo");

  function clearParts() { parts.forEach(p => p.url && T.revoke(p.url)); parts = []; grid.replaceChildren(); zipBtn.disabled = true; }

  T.dropzone($("#dz"), $("#file"), async fs => {
    const f = fs.find(x => /^application\/pdf$/.test(x.type) || /\.pdf$/i.test(x.name));
    if (!f) { T.setErr("Please choose a .pdf file — this tool converts PDF pages, not images."); return; }
    if (f.size > 200 * 1048576) { T.setErr("That PDF is " + T.bytes(f.size) + ". Please split it first (Split PDF) and convert part at a time."); return; }
    file = f; clearParts();
    finfo.hidden = false; finfo.textContent = f.name + " — " + T.bytes(f.size);
    clearBtn.disabled = false;
    T.status("Loading the PDF renderer…");
    try { await loadEngine(); goBtn.disabled = false; T.status("Ready. Choose format and scale, then Convert."); }
    catch (e) { T.status(""); T.setErr(e.message); }
  });

  async function loadEngine() {
    const pdfjsLib = await T.cdn("pdfjs");
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      const L = T.LIBS["pdfjs-worker"];
      const r = await fetch(L.url, { integrity: L.sri && L.sri.indexOf("TBD") === -1 ? L.sri : undefined, mode: "cors" });
      const txt = await r.text();
      pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([txt], { type: "text/javascript" }));
    }
    return pdfjsLib;
  }

  T.on(clearBtn, "click", () => { file = null; finfo.hidden = true; goBtn.disabled = true; clearBtn.disabled = true; clearParts(); T.setErr(""); T.status(""); });

  T.on(goBtn, "click", async () => {
    if (!file) { T.setErr("Add a PDF first."); return; }
    T.setErr(""); clearParts();
    const type = $("#fmt").value, scale = Number($("#scale").value);
    const ext = type === "image/png" ? "png" : "jpg";
    let pdfjsLib;
    try { pdfjsLib = await loadEngine(); } catch (e) { T.setErr(e.message); return; }
    let doc;
    try {
      doc = await pdfjsLib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    } catch (e) {
      T.setErr(/password|encrypt/i.test(String(e && e.message)) ? "This PDF is password-protected. Open it in a PDF reader and remove the password, then convert again." : "This PDF could not be opened — it may be corrupted. Try re-saving it from another viewer.");
      return;
    }
    try {
      const pad = String(doc.numPages).length;
      for (let n = 1; n <= doc.numPages; n++) {
        T.status(`Rendering page ${n} of ${doc.numPages}…`);
        const page = await doc.getPage(n);
        const vp = page.getViewport({ scale });
        const c = document.createElement("canvas");
        c.width = Math.floor(vp.width); c.height = Math.floor(vp.height);
        const ctx = c.getContext("2d");
        ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        const blob = await T.toBlob(c, type, type === "image/jpeg" ? 0.92 : undefined);
        const url = T.makeURL(blob);
        const name = (file.name.replace(/\.pdf$/i, "") || "page") + "-" + String(n).padStart(Math.max(2, pad), "0") + "." + ext;
        parts.push({ name, blob, url });
        addTile(n, url, name, blob.size, c.width, c.height);
        c.width = c.height = 0;
        T.progress((n / doc.numPages) * 100);
        await T.yieldUI();
      }
      zipBtn.disabled = !parts.length;
      T.status(doc.numPages + " page" + (doc.numPages > 1 ? "s" : "") + " rendered as " + ext.toUpperCase() + " at " + scale + "×. Click a page to save it, or use ZIP.");
    } catch (e) {
      T.setErr("Rendering stopped at page " + (parts.length + 1) + " (" + (e.message || e) + "). Try a lower scale.");
    }
  });

  function addTile(n, url, name, size) {
    const box = document.createElement("div");
    box.className = "out-item";
    const img = document.createElement("img");
    img.src = url; img.alt = "Page " + n + " preview"; img.loading = "lazy"; img.width = 200; img.height = 260;
    const cap = document.createElement("span");
    cap.className = "tiny muted";
    cap.textContent = "p" + n + " · " + T.bytes(size);
    const a = document.createElement("a");
    a.className = "btn btn-sm btn-ghost"; a.href = url; a.download = name; a.textContent = "Save";
    box.append(img, cap, a);
    grid.appendChild(box);
  }

  T.on(zipBtn, "click", async () => {
    if (!parts.length) return;
    let JSZip;
    try { T.status("Loading ZIP packer (first time only)…"); JSZip = await T.cdn("jszip"); } catch (e) { T.setErr(e.message); return; }
    const z = new JSZip();
    parts.forEach(p => z.file(p.name, p.blob));
    T.status("Packing " + parts.length + " images…");
    const blob = await z.generateAsync({ type: "blob", compression: "STORE" }, m => T.progress(m.percent));
    T.download(blob, (file.name.replace(/\.pdf$/i, "") || "pages") + "-" + $("#fmt").value.split("/")[1] + "s.zip");
    T.status("ZIP ready: " + parts.length + " images, " + T.bytes(blob.size) + " — check your downloads.");
  });
})();
