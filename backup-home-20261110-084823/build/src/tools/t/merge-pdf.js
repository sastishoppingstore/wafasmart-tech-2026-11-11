/* merge-pdf — combine PDFs in the chosen order, locally, with pdf-lib */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const files = [];
  const listEl = $("#list"), emptyEl = $("#empty"), goBtn = $("#go"), clearBtn = $("#clear"), dl = $("#dl");
  let draw = null, outUrl = null;
  const isPdf = f => /^application\/pdf$/.test(f.type) || /\.pdf$/i.test(f.name);

  draw = T.tileList(files, els => listEl.replaceChildren(...els), refresh);
  function refresh() {
    goBtn.disabled = files.length < 2;
    clearBtn.disabled = !files.length;
    emptyEl.textContent = files.length ? files.length + " files ready — first tile becomes page 1." : "Add at least two PDFs.";
    emptyEl.hidden = false;
  }

  T.dropzone($("#dz"), $("#file"), fs => {
    const bad = fs.filter(f => !isPdf(f));
    if (bad.length) T.setErr("Not a PDF: " + bad.map(b => b.name).join(", "));
    fs.filter(isPdf).forEach(f => files.push(f));
    draw(); refresh();
  });

  T.on(clearBtn, "click", () => { files.length = 0; draw(); refresh(); dl.hidden = true; });

  T.on(goBtn, "click", async () => {
    if (files.length < 2) { T.setErr("Add at least two PDF files to merge."); return; }
    T.setErr(""); dl.hidden = true;
    let PDFLib;
    try { T.status("Loading the PDF engine (first time only, ~0.5 MB from jsDelivr)…"); T.progress(2); PDFLib = await T.cdn("pdf-lib"); }
    catch (e) { T.status(""); T.setErr(e.message); return; }
    try {
      const out = await PDFLib.PDFDocument.create();
      let totalPages = 0;
      for (let i = 0; i < files.length; i++) {
        T.status(`Reading ${i + 1}/${files.length}: ${files[i].name}`);
        const src = await PDFLib.PDFDocument.load(await files[i].arrayBuffer(), { ignoreEncryption: false });
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach(p => out.addPage(p));
        totalPages += pages.length;
        T.progress(5 + ((i + 1) / files.length) * 85);
        await T.yieldUI();
      }
      T.status("Writing merged file…");
      const bytes = await out.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const name = ($("#name").value.trim() || "merged").replace(/[^\w\-. ]+/g, "_") + ".pdf";
      if (outUrl) T.revoke(outUrl);
      outUrl = T.makeURL(blob);
      dl.download = name; dl.href = outUrl; dl.hidden = false;
      T.status(`Merged ${files.length} files, ${totalPages} pages — ${T.bytes(blob.size)}. Press Download PDF.`);
      T.progress(100);
    } catch (e) {
      T.status(""); T.progress(0); const p = $(".prog"); if (p) p.hidden = true;
      T.setErr(readable(e));
    }
  });

  function readable(e) {
    const m = String(e && e.message || e);
    if (/encrypt|password/i.test(m)) return "One of these PDFs is password-protected. Open it in a PDF reader, remove the password (or print to PDF), then merge again.";
    if (/invalid|parse|header/i.test(m)) return "One of the files is not a valid PDF (or is corrupted). Check the list and re-add the file that fails.";
    return "Could not merge (" + m + "). Try removing very large files or merging in two rounds.";
  }
})();
