/* password-generator — crypto-grade random passwords with entropy meter; nothing is stored or sent. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const out = $("#out"), copyBtn = $("#copy");
  const GROUPS = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    digit: "0123456789",
    sym: "!@#$%^&*()-_=+[]{};:,.<>?/~"
  };
  const AMBIG = new Set("Il1O0o`|\"'".split(""));
  let batch = [];

  function randInt(max) {
    const a = new Uint8Array(1);
    const limit = 256 - (256 % max);
    let x; do { crypto.getRandomValues(a); x = a[0]; } while (x >= limit);
    return x % max;
  }
  function buildPool() {
    let p = "";
    Object.keys(GROUPS).forEach(k => { if ($("#" + k).value === "y") p += GROUPS[k]; });
    if ($("#ambig").value === "y") p = p.split("").filter(c => !AMBIG.has(c)).join("");
    return p;
  }
  function makeOne(len, pool, noRep) {
    let s = "";
    for (let i = 0; i < len; i++) {
      let ch = pool[randInt(pool.length)], tries = 0;
      while (noRep && pool.length > 1 && s.endsWith(ch) && tries < 10) { ch = pool[randInt(pool.length)]; tries++; }
      s += ch;
    }
    return s;
  }
  function label(bits) {
    if (bits < 40) return ["Very weak", "bad"];
    if (bits < 60) return ["Weak", "bad"];
    if (bits < 80) return ["Fair", "warn"];
    if (bits < 120) return ["Strong", ""];
    return ["Very strong", ""];
  }
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function copyText(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, fallback); }
    else fallback();
    function fallback() {
      const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { T.setErr("Copy blocked — select the text and copy manually."); }
      ta.remove();
    }
  }

  async function generate() {
    out.replaceChildren(); batch = []; copyBtn.disabled = true; T.setErr("");
    const len = Math.min(64, Math.max(6, parseInt($("#len").value, 10) || 0));
    const count = Math.min(50, Math.max(1, parseInt($("#cnt").value, 10) || 0));
    if (!$("#len").value || parseInt($("#len").value, 10) < 6) { T.setErr("Set a length of at least 6 characters."); return; }
    const pool = buildPool();
    if (!pool) { T.setErr("Select at least one character group (lowercase, uppercase, digits or symbols)."); return; }
    if (pool.length < 2 && $("#norep").value === "y") { T.setErr("Not enough characters for 'no repeats' — include more groups."); return; }

    const bits = len * Math.log2(pool.length);
    const [lab, cls] = label(bits);
    const noRep = $("#norep").value === "y";

    const sum = el("div", "res" + (cls ? " " + cls : ""));
    sum.append(el("b", null, Math.round(bits) + " bits"));
    sum.appendChild(el("p", null, "Entropy = length × log2(pool of " + pool.length + "). Strength: " + lab + ". Generated with crypto.getRandomValues — never stored or sent."));
    out.appendChild(sum);

    const list = el("div", "stack");
    for (let i = 0; i < count; i++) {
      const pw = makeOne(len, pool, noRep);
      batch.push(pw);
      const row = el("div", "res-line");
      const code = el("code", null, pw); code.style.fontFamily = "ui-monospace,Menlo,Consolas,monospace";
      const right = el("div"); right.style.display = "flex"; right.style.gap = "8px"; right.style.alignItems = "center";
      const cp = el("button", "btn btn-ghost", "Copy"); cp.type = "button"; cp.style.padding = "4px 10px"; cp.style.fontSize = ".8rem";
      T.on(cp, "click", () => copyText(pw, () => T.status("Password copied.")));
      right.append(cp);
      row.append(code, right);
      list.appendChild(row);
      if (i % 10 === 9) await T.yieldUI();
    }
    out.appendChild(list);

    const allBtn = el("p", "cnt"); allBtn.textContent = "Generated " + count + " password" + (count > 1 ? "s" : "") + " of " + len + " characters. Nothing left your device.";
    out.appendChild(allBtn);
    copyBtn.disabled = false;
    T.status("Ready — " + lab + " (" + Math.round(bits) + " bits).");
  }

  T.on($("#go"), "click", generate);
  T.on(copyBtn, "click", () => copyText(batch.join("\n"), () => T.status("Copied " + batch.length + " passwords.")));
  T.on($("#rst"), "click", () => { out.replaceChildren(); batch = []; copyBtn.disabled = true; T.setErr(""); T.status("Cleared."); });
})();
