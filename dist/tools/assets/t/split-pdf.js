/* split-pdf — one file per page / fixed chunks / custom ranges, packed as separate downloads or a ZIP */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  let file = null, doc = null, count = 0;
  const goBtn = $("#go"), zipBtn = $("#zip"), clearBtn = $("#clear"), out = $("#out"), finfo = $("#finfo");
  let parts = []; /* {name, blob} */
  const urls = [];

  function reset() {
    parts.forEach(p => p.url && T.revoke(p.url));
    file = null; doc = null; count = 0; parts = [];
    out.replaceChildren(); zipBtn.disabled = true; clearBtn.disabled = true;
  }

  T.dropzone($("#dz"), $("#file"), fs => {
    const f = fs.find(x => /^application\/pdf$/.test(x.type) || /\.pdf$/i.test(x.name));
    if (!f) { T.setErr("Please choose a .pdf file."); return; }
    reset(); file = f;
    finfo.hidden = false; finfo.textContent = file.name + " — " + T.bytes(file.size) + ". Reading page count…";
    T.cdn("pdf-lib").then(async PDFLib => {
      doc = await PDFLib.PDFDocument.load(await file.arrayBuffer());
      count = doc.getPageCount();
      finfo.textContent = file.name + " — " + T.bytes(file.size) + " · " + count + " pages";
      goBtn.disabled = false; clearBtn.disabled = false;
    }).catch(e => { finfo.textContent = file.name + " — " + T.bytes(file.size); T.setErr(readable(e)); });
  });

  ["mode", "chunk"].forEach(id => T.on($("#" + id), "input", () => {
    const m = $("#mode").value;
    $("#chunkf").hidden = m !== "chunk";
    $("#rangef").hidden = m !== "custom";
  }));

  T.on(clearBtn, "click", () => { reset(); finfo.hidden = true; goBtn.disabled = true; clearBtn.disabled = true; });

  function ranges(text, total) {
    const out = [];
    text.split(/[,\s]+/).filter(Boolean).forEach(tok => {
      const m = tok.match(/^(\d+)(?:-(\d+))?$/);
      if (!m) throw new Error('"' + tok + '" is not a page or range.');
      const a = +m[1], b = m[2] ? +m[2] : a;
      if (a < 1 || b > total || a > b) throw new Error("Range " + tok + " is outside 1–" + total + ".");
      out.push([a - 1, b - 1]);
    });
    if (!out.length) throw new Error("Type at least one range, e.g. 1-4, 9, 12-16.");
    return out;
  }

  T.on(goBtn, "click", async () => {
    if (!doc) { T.setErr("Add a PDF first."); return; }
    T.setErr(""); parts.forEach(p => p.url && T.revoke(p.url)); parts = []; out.replaceChildren();
    const mode = $("#mode").value;
    let groups;
    try {
      if (mode === "each") groups = Array.from({ length: count }, (_, i) => [i, i]);
      else if (mode === "chunk") { const n = Math.max(1, +$("#chunk").value || 5); groups = []; for (let i = 0; i < count; i += n) groups.push([i, Math.min(count - 1, i + n - 1)]); }
      else groups = ranges($("#ranges").value, count);
    } catch (e) { T.setErr(e.message); return; }
    const PDFLib = await T.cdn("pdf-lib").catch(e => { T.setErr(e.message); return null; });
    if (!PDFLib) return;
    const pad = String(count).length;
    try {
      for (let g = 0; g < groups.length; g++) {
        const [a, b] = groups[g];
        const sub = await PDFLib.PDFDocument.create();
        const idx = []; for (let i = a; i <= b; i++) idx.push(i);
        (await sub.copyPages(doc, idx)).forEach(p => sub.addPage(p));
        const blob = new Blob([await sub.save()], { type: "application/pdf" });
        const name = (file.name.replace(/\.pdf$/i, "") || "part") + "_" + String(a + 1).padStart(pad, "0") + "-" + String(b + 1).padStart(pad, "0") + ".pdf";
        const url = T.makeURL(blob);
        parts.push({ name, blob, url });
        const row = document.createElement("p");
        row.className = "hint";
        const link = document.createElement("a");
        link.href = url; link.download = name; link.textContent = name; link.className = "res-link";
        const sp = document.createElement("span");
        sp.className = "tiny muted";
        sp.textContent = " " + (b - a + 1) + " pages · " + T.bytes(blob.size);
        row.append(link, sp);
        out.appendChild(row);
        T.progress(((g + 1) / groups.length) * 100);
        await T.yieldUI();
      }
      zipBtn.disabled = parts.length < 1;
      clearBtn.disabled = false;
      T.status(parts.length + " file" + (parts.length > 1 ? "s" : "") + " created — download individually or as ZIP.");
    } catch (e) { T.status(""); T.progress(0); $(".prog").hidden = true; T.setErr(readable(e)); }
  });

  T.on(zipBtn, "click", async () => {
    if (!parts.length) return;
    let JSZip;
    try { T.status("Loading ZIP packer (first time only)…"); JSZip = await T.cdn("jszip"); } catch (e) { T.setErr(e.message); return; }
    const z = new JSZip();
    parts.forEach(p => z.file(p.name, p.blob));
    T.status("Packing…");
    const blob = await z.generateAsync({ type: "blob", compression: "STORE" });
    T.download(blob, (file.name.replace(/\.pdf$/i, "") || "pdf") + "-parts.zip");
    T.status("ZIP saved (" + T.bytes(blob.size) + ").");
  });

  function readable(e) {
    const m = String(e && e.message || e);
    if (/encrypt|password/i.test(m)) return "This PDF is password-protected — remove the password in a PDF reader first.";
    if (/invalid|parse|header|EOF/i.test(m)) return "That file does not look like a valid PDF (or is corrupted). Try re-saving it from a PDF viewer.";
    return "Something went wrong: " + m;
  }
})();
