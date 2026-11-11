/* water-intake-calculator — 35 ml/kg base + exercise + climate + life stage. All local. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const card = $(".t-card.opts"), out = $("#out");
  const ML_PER_MIN = 355 / 30;
  const r1 = n => Math.round(n * 10) / 10;
  function num(el) { const v = parseFloat(el.value); return isFinite(v) ? v : null; }

  function calc() {
    T.setErr("");
    const w = num($("#wkg")), ex = num($("#exmin"));
    const cl = parseFloat($("#climate").value) || 0, st = parseFloat($("#stage").value) || 0;
    if (w == null) { out.replaceChildren(); T.status("Enter your weight in kilograms."); return; }
    if (w < 25 || w > 350) { T.setErr("Weight should be between 25 and 350 kg."); out.replaceChildren(); return; }
    const exv = ex == null ? 0 : ex;
    if (exv < 0 || exv > 600) { T.setErr("Exercise minutes should be between 0 and 600."); out.replaceChildren(); return; }

    const base = w * 35, exAdd = exv * ML_PER_MIN, total = base + exAdd + cl + st;
    const litres = total / 1000, cups = total / 250;

    const res = document.createElement("div");
    res.className = "res";
    res.innerHTML =
      '<div class="stat-row">' +
        '<div class="stat"><b>' + r1(litres) + ' L</b><small>per day</small></div>' +
        '<div class="stat"><b>' + Math.round(cups) + '</b><small>250 ml cups</small></div>' +
      '</div>' +
      '<div class="res-line"><span>Base (weight × 35 ml)</span><span>' + Math.round(base) + ' ml</span></div>' +
      '<div class="res-line"><span>Exercise (' + Math.round(exv) + ' min)</span><span>+' + Math.round(exAdd) + ' ml</span></div>' +
      '<div class="res-line"><span>Climate adjustment</span><span>+' + Math.round(cl) + ' ml</span></div>' +
      '<div class="res-line"><span>Life stage</span><span>+' + Math.round(st) + ' ml</span></div>' +
      '<div class="res-line"><span>Total</span><span>' + Math.round(total) + ' ml</span></div>' +
      '<div class="res-line"><span>For information only, not medical advice.</span></div>';
    out.replaceChildren(res);
    T.status("About " + r1(litres) + " litres (" + Math.round(cups) + " cups) a day.");
  }

  function reset() {
    $("#wkg").value = ""; $("#exmin").value = "0"; $("#climate").value = "0"; $("#stage").value = "0";
    out.replaceChildren(); T.setErr(""); T.status("");
  }

  card.addEventListener("input", calc);
  T.on($("#go"), "click", calc);
  T.on($("#rst"), "click", reset);
})();
