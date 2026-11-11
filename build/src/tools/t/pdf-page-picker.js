/* delete-pdf-pages + extract-pdf-pages — visual page picker, single module, mode from page URL */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$, $$ = T.$$;
  const MODE = location.pathname.indexOf("extract") > -1 ? "extract" : "delete";
  let file = null, doc = null, count = 0, picked = new Set(), outUrl = null;
  const chips = $("#chips"), goBtn = $("#go"), dl = $("#dl"), finfo = $("#finfo"), sel = $("#selinfo"), allBtn = $("#all"), noneBtn = $("#none");
  goBtn.textContent = MODE === "extract" ? "Create PDF" : "Create PDF";

  T.dropzone($("#dz"), $("#file"), async fs => {
    const f = fs.find(x => /^application\/pdf$/.test(x.type) || /\.pdf$/i.test(x.name));
    if (!f) { T.setErr("Please choose a .pdf file."); return; }
    picked.clear(); clearOut();
    file = f;
    T.status("Loading the PDF engine (first time only)…");
    let PDFLib;
    try { PDFLib = await T.cdn("pdf-lib"); } catch (e) { T.status(""); T.setErr(e.message); return; }
    try {
      doc = await PDFLib.PDFDocument.load(await f.arrayBuffer());
    } catch (e) {
      T.status("");
      T.setErr(/encrypt|password/i.test(String(e && e.message)) ? "This PDF is password-protected. Remove the password in a PDF reader first, then edit pages here." : "This PDF could not be opened — it may be corrupted.");
      return;
    }
    count = doc.getPageCount(); picked.clear();
    T.status("");
    finfo.hidden = false; finfo.textContent = f.name + " — " + T.bytes(f.size) + " · " + count + " pages";
    buildChips(); sync();
    allBtn.disabled = noneBtn.disabled = false;
  });

  function buildChips() {
    chips.hidden = false; chips.replaceChildren();
    for (let i = 0; i < count; i++) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.dataset.p = i;
      b.setAttribute("aria-pressed", "false");
      b.textContent = i + 1;
      b.addEventListener("click", () => { picked.has(i) ? picked.delete(i) : picked.add(i); b.setAttribute("aria-pressed", picked.has(i)); b.classList.toggle("on", picked.has(i)); sync(); });
      chips.appendChild(b);
    }
  }

  function indicesFromRanges(text) {
    const idx = [];
    String(text).split(/[,\s]+/).filter(Boolean).forEach(tok => {
      const m = tok.match(/^(\d+)(?:-(\d+))?$/);
      if (!m) throw new Error('"' + tok + '" is not a page or range.');
      const a = +m[1], b = m[2] ? +m[2] : a;
      if (a < 1 || b > count || a > b) throw new Error("Range " + tok + " is outside 1–" + count + ".");
      for (let i = a; i <= b; i++) idx.push(i - 1);
    });
    return idx;
  }

  function sync() {
    const kept = MODE === "extract" ? picked.size : count - picked.size;
    if (sel) {
      sel.textContent = MODE === "extract"
        ? "Selected to keep: " + (picked.size ? [...picked].sort((a, b) => a - b).map(i => i + 1).join(", ") : "none yet") + "."
        : "Marked for removal: " + (picked.size ? [...picked].sort((a, b) => a - b).map(i => i + 1).join(", ") : "none") + " — output keeps " + kept + " page" + (kept === 1 ? "" : "s") + ".";
    }
    $$(".chip", chips).forEach(c => { const on = picked.has(+c.dataset.p); c.classList.toggle("on", on); c.classList.toggle("del", on && MODE === "delete"); c.classList.toggle("keep", on && MODE === "extract"); });
    goBtn.disabled = !doc || kept < 1;
    goBtn.textContent = MODE === "extract" ? "Extract " + kept + " page" + (kept === 1 ? "" : "s") : "Create PDF without " + picked.size + " page" + (picked.size === 1 ? "" : "s");
  }

  T.on($("#ranges") || null, "keydown", e => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    try { indicesFromRanges(e.target.value).forEach(i => picked.add(i)); e.target.value = ""; sync(); }
    catch (err) { T.setErr(err.message); }
  });

  T.on(allBtn, "click", () => { for (let i = 0; i < count; i++) picked.add(i); sync(); });
  T.on(noneBtn, "click", () => { picked.clear(); sync(); });

  function clearOut() { if (outUrl) T.revoke(outUrl); outUrl = null; dl && (dl.hidden = true); }

  T.on(goBtn, "click", async () => {
    if (!doc) { T.setErr("Add a PDF first."); return; }
    if (MODE === "delete" && !picked.size) { T.setErr("Tap at least one page number to remove."); return; }
    if (MODE === "extract" && !picked.size) { T.setErr("Tap at least one page to extract."); return; }
    T.setErr(""); clearOut();
    const PDFLib = await T.cdn("pdf-lib").catch(e => { T.setErr(e.message); return null; });
    if (!PDFLib) return;
    try {
      const list = [];
      for (let i = 0; i < count; i++) {
        const hit = picked.has(i);
        if (MODE === "extract" ? hit : !hit) list.push(i);
      }
      if (!list.length) { T.setErr("That would leave an empty PDF — nothing to write."); return; }
      const out = await PDFLib.PDFDocument.create();
      T.status("Copying " + list.length + " pages…");
      (await out.copyPages(doc, list)).forEach(p => out.addPage(p));
      const bytes = await out.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const base = ($("#name") && $("#name").value.trim()) || (file.name.replace(/\.pdf$/i, "") || "document");
      outUrl = T.makeURL(blob);
      dl.download = base.replace(/[^\w\-. ]+/g, "_") + (MODE === "extract" ? "-extract" : "-edited") + ".pdf";
      dl.href = outUrl; dl.hidden = false;
      T.status(list.length + " of " + count + " pages written — " + T.bytes(blob.size) + ". Press Download PDF.");
      T.progress(100);
    } catch (e) {
      T.status(""); T.progress(0); const p = $(".prog"); if (p) p.hidden = true;
      T.setErr("Could not build the file: " + (e.message || e));
    }
  });
})();
