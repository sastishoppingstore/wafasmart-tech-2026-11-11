/* bmi-calculator — metric/imperial BMI, WHO category, colour scale, healthy range. All local. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const LB = 0.45359237;
  let unit = "metric";
  const card = $(".t-card.opts"), out = $("#out"), wtLabel = document.querySelector('label[for="wt"]');

  const CATS = [
    { max: 18.5, name: "Underweight", tone: "warn" },
    { max: 25, name: "Normal weight", tone: "" },
    { max: 30, name: "Overweight", tone: "warn" },
    { max: 35, name: "Obese class I", tone: "bad" },
    { max: 40, name: "Obese class II", tone: "bad" },
    { max: Infinity, name: "Obese class III", tone: "bad" }
  ];
  const catOf = b => CATS.find(c => b < c.max);

  function showUnit(u) {
    unit = u;
    T.$$(".seg[data-unit]").forEach(s => s.setAttribute("aria-pressed", String(s.dataset.unit === u)));
    wtLabel.textContent = "Weight (" + (u === "metric" ? "kg" : "lb") + ")";
    $("#hcm-f").hidden = u !== "metric";
    $("#hin-f").hidden = u !== "imperial";
  }

  function num(el) { const v = parseFloat(el.value); return isFinite(v) ? v : null; }
  function round(n, d) { const p = Math.pow(10, d); return Math.round(n * p) / p; }

  function calc() {
    T.setErr("");
    const w = num($("#wt"));
    const hEl = unit === "metric" ? $("#ht") : $("#ht2");
    const h = num(hEl);
    if (w == null || h == null) { out.replaceChildren(); T.status("Enter both your weight and height."); return; }
    if (w <= 0) { T.setErr("Weight must be a positive number."); out.replaceChildren(); return; }
    if (unit === "metric" && (h < 60 || h > 250)) { T.setErr("Height looks impossible — enter a value between 60 and 250 cm."); out.replaceChildren(); return; }
    if (unit === "imperial" && (h < 24 || h > 98)) { T.setErr("Height looks impossible — enter a value between 24 and 98 inches."); out.replaceChildren(); return; }

    const kg = unit === "metric" ? w : w * LB;
    const m = unit === "metric" ? h / 100 : h * 0.0254;
    const bmi = kg / (m * m);
    if (!isFinite(bmi) || bmi <= 0) { T.setErr("Something went wrong — please re-check your numbers."); out.replaceChildren(); return; }

    const c = catOf(bmi);
    const lo = 18.5 * m * m, hi = 24.9 * m * m;
    const showW = u => unit === "metric" ? round(u, 1) + " kg" : round(u / LB, 1) + " lb";
    const pos = Math.max(0, Math.min(100, (bmi - 14) / 26 * 100));

    const res = document.createElement("div");
    res.className = "res" + (c.tone ? " " + c.tone : "");
    res.innerHTML =
      '<div class="stat-row">' +
        '<div class="stat"><b>' + round(bmi, 1) + '</b><small>your BMI</small></div>' +
        '<div class="stat"><b>' + c.name + '</b><small>WHO category</small></div>' +
        '<div class="stat"><b>' + showW(lo) + '–' + showW(hi) + '</b><small>healthy weight for your height</small></div>' +
      '</div>' +
      '<div class="scale-bar" aria-hidden="true">' +
        '<i style="width:17.3%;background:#5aa2ff"></i>' +
        '<i style="width:25%;background:#25d366"></i>' +
        '<i style="width:19.2%;background:#ffd166"></i>' +
        '<i style="width:38.5%;background:#ff4d5e"></i>' +
        '<span class="mark" style="left:' + round(pos, 1) + '%"></span>' +
      '</div>' +
      '<div class="res-line"><span>BMI ' + round(bmi, 1) + ' — ' + c.name + '</span><span>Scale: blue underweight · green normal · amber overweight · red obese</span></div>' +
      '<div class="res-line"><span>For information only, not medical advice.</span></div>';
    out.replaceChildren(res);
    T.status("BMI " + round(bmi, 1) + " (" + c.name + ").");
  }

  function reset() {
    showUnit("metric");
    $("#wt").value = ""; $("#ht").value = ""; $("#ht2").value = "";
    out.replaceChildren(); T.setErr(""); T.status("");
  }

  card.addEventListener("input", calc);
  T.$$(".seg[data-unit]").forEach(s => T.on(s, "click", () => { showUnit(s.dataset.unit); calc(); }));
  T.on($("#go"), "click", calc);
  T.on($("#rst"), "click", reset);
})();
