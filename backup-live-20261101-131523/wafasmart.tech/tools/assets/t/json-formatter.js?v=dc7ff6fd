/* json-formatter — parse, pretty/minify, sort keys, validate with line/column, chunked for large input. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const txt = $("#txt"), out = $("#out"), copyBtn = $("#copy");
  let resultText = "";

  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function stat(label, value) { const b = el("div", "stat"); b.append(el("b", null, String(value)), el("small", null, label)); return b; }

  function errLocation(raw, e) {
    const msg = String(e && e.message || e);
    let m = msg.match(/line (\d+) column (\d+)/);
    if (m) return { line: +m[1], col: +m[2] };
    m = msg.match(/position (\d+)/);
    if (m) {
      const pos = Math.min(+m[1], raw.length);
      let nl = 0, last = -1;
      for (let i = 0; i < pos; i++) { if (raw.charCodeAt(i) === 10) { nl++; last = i; } }
      return { line: nl + 1, col: pos - last };
    }
    return { line: -1, col: -1 };
  }
  function snippet(raw, line) {
    const lines = raw.split("\n");
    return (lines[line - 1] || "").slice(0, 120);
  }
  function sortDeep(v) {
    if (Array.isArray(v)) return v.map(sortDeep);
    if (v && typeof v === "object") {
      const o = {};
      Object.keys(v).sort((a, b) => a.localeCompare(b)).forEach(k => { o[k] = sortDeep(v[k]); });
      return o;
    }
    return v;
  }

  async function run() {
    out.replaceChildren(); resultText = ""; copyBtn.disabled = true; T.setErr("");
    const raw = txt.value;
    if (!raw.trim()) { T.status(""); T.setErr("Paste some JSON to format — the box is empty."); return; }
    T.progress(5); T.status("Parsing JSON…"); await T.yieldUI();

    let data;
    try { data = JSON.parse(raw); }
    catch (e) {
      T.progress(100); T.status("");
      const loc = errLocation(raw, e);
      const where = loc.line > 0 ? " at line " + loc.line + ", column " + loc.col : " (the parser did not give a position).";
      const box = el("div", "res bad");
      box.append(el("b", null, "This is not valid JSON" + where));
      box.appendChild(el("p", null, String(e.message || e)));
      if (loc.line > 0) {
        const sn = el("div", "codebox"); sn.textContent = "line " + loc.line + ": " + snippet(raw, loc.line);
        box.appendChild(sn);
        box.appendChild(el("p", "cnt", "Common causes: a trailing comma before } or ], a missing quote or comma, or single quotes instead of double."));
      }
      out.appendChild(box);
      return;
    }

    const mode = $("#mode").value;
    if ($("#sortk").value === "y") { data = sortDeep(data); T.status("Sorting keys…"); await T.yieldUI(); }
    let indent;
    if (mode === "minify") indent = 0;
    else indent = $("#indent").value === "tab" ? "\t" : Number($("#indent").value);
    const outStr = mode === "minify" ? JSON.stringify(data) : JSON.stringify(data, null, indent);

    T.progress(85); await T.yieldUI();
    const inBytes = new Blob([raw]).size, outBytes = new Blob([outStr]).size;
    const row = el("div", "stat-row");
    row.append(stat("Valid", mode === "minify" ? "Minified" : "Pretty"),
      stat("Input", T.bytes(inBytes)),
      stat("Output", T.bytes(outBytes)),
      stat(mode === "minify" ? "Saved" : "Lines", mode === "minify"
        ? T.bytes(Math.max(0, inBytes - outBytes))
        : (outStr.match(/\n/g) || []).length + 1));
    out.appendChild(row);
    out.appendChild(el("h3", "cnt", "Formatted JSON"));
    out.appendChild(el("div", "codebox", outStr));
    resultText = outStr; copyBtn.disabled = false;
    T.progress(100);
    T.status("Valid JSON — output " + T.bytes(outBytes) + ". Press Copy result.");
  }

  T.on($("#go"), "click", run);
  T.on(copyBtn, "click", async () => {
    if (!resultText) return;
    try { await navigator.clipboard.writeText(resultText); T.status("Copied to clipboard."); }
    catch (e) {
      const ta = document.createElement("textarea"); ta.value = resultText; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); T.status("Copied."); } catch (e2) { T.setErr("Copy blocked — select the JSON and copy manually."); }
      ta.remove();
    }
  });
  T.on($("#rst"), "click", () => { txt.value = ""; out.replaceChildren(); resultText = ""; copyBtn.disabled = true; T.setErr(""); T.status("Cleared."); txt.focus(); });
})();
