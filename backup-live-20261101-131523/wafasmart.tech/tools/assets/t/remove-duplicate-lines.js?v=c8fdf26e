/* remove-duplicate-lines — dedupe / count a pasted list, chunked so the tab stays responsive. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const txt = $("#txt"), out = $("#out"), copyBtn = $("#copy");
  let resultText = "";

  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function stat(label, value) { const b = el("div", "stat"); b.append(el("b", null, String(value)), el("small", null, label)); return b; }

  async function process() {
    out.replaceChildren(); resultText = ""; copyBtn.disabled = true;
    const raw = txt.value;
    if (!raw.trim()) { T.setErr("Paste at least one line to process."); T.status(""); return; }
    T.setErr("");
    const flags = $("#opts").value;
    const doTrim = flags.includes("t"), doCase = flags.includes("i"), dropEmpty = flags.includes("e");
    const keep = $("#keep").value, sort = $("#sort").value, mode = $("#mode").value;

    const lines = raw.split(/\r?\n/);
    const total = lines.length;
    const map = new Map(), order = [];
    let processed = 0;
    for (let i = 0; i < total; i++) {
      let content = lines[i];
      if (doTrim) content = content.trim();
      if (dropEmpty && content.trim() === "") { if (i % 2000 === 0) { T.progress((i / total) * 100); await T.yieldUI(); } continue; }
      const key = doCase ? content.toLowerCase() : content;
      if (mode === "count") {
        if (map.has(key)) map.get(key).count++; else { map.set(key, { content, count: 1 }); order.push(key); }
      } else {
        if (map.has(key)) { if (keep === "last") map.set(key, content); }
        else { map.set(key, content); order.push(key); }
      }
      processed++;
      if (i % 2000 === 0) { T.progress((i / total) * 100); await T.yieldUI(); }
    }
    T.progress(100);

    const row = el("div", "stat-row");
    if (mode === "count") {
      const recs = order.map(k => map.get(k)).sort((a, b) => b.count - a.count || a.content.localeCompare(b.content));
      row.append(stat("Lines in", total), stat("Unique lines", recs.length), stat("Empty dropped", total - processed));
      const table = el("table", "tbl");
      table.append((function () { const tr = el("tr"); tr.append(el("th", null, "Line"), el("th", "num", "Count")); return tr; })());
      recs.forEach(r => { const tr = el("tr"); tr.append(el("td", null, r.content), el("td", "num", String(r.count))); table.appendChild(tr); });
      resultText = recs.map(r => r.content + " (" + r.count + ")").join("\n");
      out.append(row, el("h3", "cnt", "Occurrence count"), table);
      T.status(recs.length + " unique lines counted from " + total + ".");
    } else {
      let res = order.map(k => map.get(k));
      if (sort === "asc") res = res.slice().sort((a, b) => a.localeCompare(b));
      else if (sort === "desc") res = res.slice().sort((a, b) => b.localeCompare(a));
      row.append(stat("Lines in", total), stat("Lines out", res.length), stat("Duplicates removed", total - res.length));
      resultText = res.join("\n");
      out.append(row, el("h3", "cnt", "Cleaned list"), el("div", "codebox", resultText || "(empty)"));
      T.status("Removed " + (total - res.length) + " duplicate line(s).");
    }
    copyBtn.disabled = !resultText;
  }

  T.on($("#go"), "click", process);

  T.on(copyBtn, "click", async () => {
    if (!resultText) return;
    try { await navigator.clipboard.writeText(resultText); T.status("Result copied to clipboard."); }
    catch (e) {
      const ta = document.createElement("textarea"); ta.value = resultText; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); T.status("Result copied."); }
      catch (e2) { T.setErr("Copy blocked — select the cleaned text and copy manually."); }
      ta.remove();
    }
  });

  T.on($("#rst"), "click", () => { txt.value = ""; out.replaceChildren(); resultText = ""; copyBtn.disabled = true; T.setErr(""); T.status("Cleared."); txt.focus(); });
})();
