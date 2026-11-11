/* case-converter — ten text cases with live preview, acronym guard and one-click copy. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const txt = $("#txt"), mode = $("#mode"), acro = $("#acro"), out = $("#out"), copyBtn = $("#copy");
  let result = "";

  const capAlpha = s => s.replace(/\p{L}/u, c => c.toUpperCase());
  const isAcro = w => /^[A-Z][A-Z0-9'’\-]+$/.test(w);

  function lowerKeep(t, keep) {
    if (!keep) return t.toLowerCase();
    return t.split(/(\s+)/).map(p => (/^\s*$/.test(p) || p === "") ? p : (isAcro(p) ? p : p.toLowerCase())).join("");
  }
  function wordList(t) {
    return (t.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .match(/[\p{L}\p{N}'’\-]+/gu) || []).filter(Boolean);
  }
  const capWord = w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

  async function convertAll(t, m, keep) {
    switch (m) {
      case "upper": return t.toUpperCase();
      case "lower": return t.toLowerCase();
      case "alternating": {
        let flip = false, o = "";
        for (const ch of t) { if (/[\p{L}]/u.test(ch)) { o += flip ? ch.toLowerCase() : ch.toUpperCase(); flip = !flip; } else o += ch; }
        return o;
      }
      case "reverse": return Array.from(t).reverse().join("");
      case "title": {
        return t.split(/(\s+)/).map(p => (/^\s*$/.test(p) || p === "") ? p
          : (keep && isAcro(p) ? p : capAlpha(p.toLowerCase()))).join("");
      }
      case "sentence": {
        const base = lowerKeep(t, keep);
        return base.split(/([.!?\u06D4\u061F\n])/).map(seg => {
          if (/[.!?\u06D4\u061F]/.test(seg)) return seg;
          return capAlpha(seg);
        }).join("");
      }
      case "camel": { const w = wordList(t); return w.map((x, i) => i === 0 ? x.toLowerCase() : capWord(x)).join(""); }
      case "pascal": return wordList(t).map(capWord).join("");
      case "snake": return wordList(t).map(w => w.toLowerCase()).join("_");
      case "kebab": return wordList(t).map(w => w.toLowerCase()).join("-");
      default: return t;
    }
  }

  function stat(label, value) { const b = document.createElement("div"); b.className = "stat";
    const bb = document.createElement("b"); bb.textContent = value;
    const sm = document.createElement("small"); sm.textContent = label; b.append(bb, sm); return b; }
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  async function run() {
    out.replaceChildren();
    const t = txt.value;
    if (!t.trim()) { T.setErr("Type or paste some text to convert."); result = ""; copyBtn.disabled = true; T.status(""); return; }
    T.setErr("");
    let r = "";
    try { r = await convertAll(t, mode.value, acro.value === "y"); }
    catch (e) { T.setErr("Could not finish converting (" + (e.message || e) + ")."); return; }
    result = r;
    const row = el("div", "stat-row");
    row.append(stat("Input words", (t.match(/[\p{L}\p{N}'’\-]+/gu) || []).length),
      stat("Output words", (r.match(/[\p{L}\p{N}'’\-]+/gu) || []).length),
      stat("Output chars", Array.from(r).length));
    out.append(el("h3", "cnt", "Converted text"), el("div", "codebox", r));
    copyBtn.disabled = false;
    T.status("Converted to " + mode.options[mode.selectedIndex].text + ".");
  }

  let timer = null;
  function schedule() { clearTimeout(timer); timer = setTimeout(run, 140); }
  T.on(txt, "input", schedule);
  T.on(mode, "change", run);
  T.on(acro, "change", run);
  T.on($("#go"), "click", run);

  T.on(copyBtn, "click", async () => {
    if (!result) return;
    try { await navigator.clipboard.writeText(result); T.status("Result copied to your clipboard."); }
    catch (e) {
      const ta = document.createElement("textarea"); ta.value = result; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); T.status("Result copied."); }
      catch (e2) { T.setErr("Your browser blocked copying — select the text and copy manually."); }
      ta.remove();
    }
  });

  T.on($("#rst"), "click", () => { txt.value = ""; result = ""; out.replaceChildren(); copyBtn.disabled = true; T.setErr(""); T.status("Cleared."); txt.focus(); });
})();
