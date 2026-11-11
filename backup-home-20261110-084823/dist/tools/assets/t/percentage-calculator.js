/* percentage-calculator — 3 modes with worked steps. All local. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const card = $(".t-card.opts"), out = $("#out");
  const LABELS = {
    of: ["X (percentage %)", "Y (value)"],
    what: ["X (part)", "Y (whole)"],
    change: ["From (old)", "To (new)"]
  };
  let mode = "of";
  const fmt = n => Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—";
  function num(el) { const v = parseFloat(el.value); return isFinite(v) ? v : null; }

  function setMode(m) {
    mode = m;
    T.$$(".seg[data-mode]").forEach(s => s.setAttribute("aria-pressed", String(s.dataset.mode === m)));
    $("#l1").textContent = LABELS[m][0];
    $("#l2").textContent = LABELS[m][1];
  }

  function calc() {
    T.setErr("");
    const a = num($("#n1")), b = num($("#n2"));
    if (a == null || b == null) { out.replaceChildren(); T.status("Enter both numbers."); return; }

    let res, steps = [], head = "";
    if (mode === "of") {
      res = a / 100 * b;
      head = fmt(a) + "% of " + fmt(b);
      steps = [fmt(a) + " % = " + fmt(a) + " ÷ 100 = " + fmt(a / 100), fmt(a / 100) + " × " + fmt(b) + " = " + fmt(res)];
      res = fmt(res);
    } else if (mode === "what") {
      if (b === 0) { T.setErr("Cannot divide by zero — 'Y (whole)' must not be 0."); out.replaceChildren(); return; }
      res = a / b * 100;
      head = fmt(a) + " is what % of " + fmt(b);
      steps = [fmt(a) + " ÷ " + fmt(b) + " = " + fmt(a / b), fmt(a / b) + " × 100 = " + fmt(res) + "%"];
      res = fmt(res) + "%";
    } else {
      if (a === 0) { T.setErr("Cannot divide by zero — the 'from' value must not be 0."); out.replaceChildren(); return; }
      res = (b - a) / a * 100;
      head = "Change from " + fmt(a) + " to " + fmt(b);
      steps = ["change = " + fmt(b) + " − " + fmt(a) + " = " + fmt(b - a), fmt(b - a) + " ÷ " + fmt(a) + " = " + fmt((b - a) / a), fmt((b - a) / a) + " × 100 = " + fmt(res) + "%"];
      res = fmt(res) + "% " + (res >= 0 ? "(increase)" : "(decrease)");
    }

    const el = document.createElement("div");
    el.className = "res";
    let html = '<div class="res-line"><span>' + head + '</span><b>' + res + '</b></div>';
    html += '<table class="tbl"><thead><tr><th>Worked steps</th></tr></thead><tbody>';
    steps.forEach(s => html += '<tr><td>' + s + '</td></tr>');
    html += '</tbody></table>';
    el.innerHTML = html;
    out.replaceChildren(el);
    T.status("Result: " + res);
  }

  function reset() { setMode("of"); $("#n1").value = ""; $("#n2").value = ""; out.replaceChildren(); T.setErr(""); T.status(""); }

  card.addEventListener("input", calc);
  T.$$(".seg[data-mode]").forEach(s => T.on(s, "click", () => { setMode(s.dataset.mode); calc(); }));
  T.on($("#go"), "click", calc);
  T.on($("#rst"), "click", reset);
})();
