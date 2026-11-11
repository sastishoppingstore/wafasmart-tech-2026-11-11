/* ideal-weight-calculator — Hamwi/Devine/Robinson/Miller + BMI band. All local. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const card = $(".t-card.opts"), out = $("#out");
  const LB = 0.45359237;
  const F = {
    Hamwi:   { m: [48.0, 2.70], f: [45.5, 2.20] },
    Devine:  { m: [50.0, 2.30], f: [45.5, 2.30] },
    Robinson:{ m: [52.0, 1.90], f: [49.0, 1.70] },
    Miller:  { m: [56.2, 1.41], f: [53.1, 1.36] }
  };
  const kg = n => Math.round(n * 10) / 10;
  function num(el) { const v = parseFloat(el.value); return isFinite(v) ? v : null; }

  function calc() {
    T.setErr("");
    const sex = $("#sex").value, cm = num($("#hgt"));
    if (cm == null) { out.replaceChildren(); T.status("Enter your height in centimetres."); return; }
    if (cm < 120 || cm > 250) { T.setErr("Height should be between 120 and 250 cm."); out.replaceChildren(); return; }

    const over = cm / 2.54 - 60;
    const m = cm / 100, lo = 18.5 * m * m, hi = 24.9 * m * m;

    let rows = "";
    for (const k in F) { const c = F[k][sex], w = c[0] + c[1] * over;
      rows += '<tr><td>' + k + '</td><td class="num">' + kg(w) + ' kg</td><td class="num">' + kg(w / LB) + ' lb</td></tr>'; }
    rows += '<tr><td>Healthy BMI range</td><td class="num">' + kg(lo) + '–' + kg(hi) + ' kg</td><td class="num">' + kg(lo / LB) + '–' + kg(hi / LB) + ' lb</td></tr>';

    const res = document.createElement("div");
    res.className = "res";
    res.innerHTML =
      '<div class="res-line"><span>Height ' + cm + ' cm · ' + (sex === "m" ? "male" : "female") + '</span><span>' + kg(over) + ' in over 5 ft</span></div>' +
      '<table class="tbl"><thead><tr><th>Formula</th><th class="num">Ideal weight</th><th class="num">In pounds</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      '<div class="res-line"><span>For information only, not medical advice.</span></div>';
    out.replaceChildren(res);
    T.status("Ideal-weight estimates range across the four formulas.");
  }

  function reset() { $("#sex").value = "m"; $("#hgt").value = ""; out.replaceChildren(); T.setErr(""); T.status(""); }

  card.addEventListener("input", calc);
  T.on($("#go"), "click", calc);
  T.on($("#rst"), "click", reset);
})();
