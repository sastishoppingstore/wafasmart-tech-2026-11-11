/* calorie-calculator — Mifflin-St Jeor BMR, TDEE, goal target + macro split. All local. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const card = $(".t-card.opts"), out = $("#out");
  const GOAL = { lose: 0.8, keep: 1, gain: 1.15 };
  const kcal = n => Math.round(n).toLocaleString() + " kcal";
  function num(el) { const v = parseFloat(el.value); return isFinite(v) ? v : null; }

  function calc() {
    T.setErr("");
    const sex = $("#sex").value, age = num($("#age")), h = num($("#hgt")), w = num($("#wgt"));
    const act = parseFloat($("#act").value) || 1.2, g = $("#goal").value;
    if (age == null || h == null || w == null) { out.replaceChildren(); T.status("Fill in age, height and weight."); return; }
    if (age < 10 || age > 120) { T.setErr("Age should be between 10 and 120 years."); out.replaceChildren(); return; }
    if (h < 90 || h > 250) { T.setErr("Height should be between 90 and 250 cm."); out.replaceChildren(); return; }
    if (w < 25 || w > 350) { T.setErr("Weight should be between 25 and 350 kg."); out.replaceChildren(); return; }

    const bmr = 10 * w + 6.25 * h - 5 * age + (sex === "m" ? 5 : -161);
    const tdee = bmr * act;
    const target = tdee * GOAL[g];
    const p = Math.round(target * 0.30 / 4), c = Math.round(target * 0.40 / 4), f = Math.round(target * 0.30 / 9);

    const res = document.createElement("div");
    res.className = "res";
    res.innerHTML =
      '<div class="stat-row">' +
        '<div class="stat"><b>' + kcal(bmr) + '</b><small>BMR (at rest)</small></div>' +
        '<div class="stat"><b>' + kcal(tdee) + '</b><small>TDEE (maintenance)</small></div>' +
        '<div class="stat"><b>' + kcal(target) + '</b><small>your daily target</small></div>' +
      '</div>' +
      '<div class="res-line"><span>Activity multiplier</span><span>' + act + '×</span></div>' +
      '<div class="res-line"><span>Protein (≈30%)</span><span>' + p + ' g</span></div>' +
      '<div class="res-line"><span>Carbohydrate (≈40%)</span><span>' + c + ' g</span></div>' +
      '<div class="res-line"><span>Fat (≈30%)</span><span>' + f + ' g</span></div>' +
      '<div class="res-line"><span>For information only, not medical advice.</span></div>';
    out.replaceChildren(res);
    T.status("Target about " + Math.round(target).toLocaleString() + " kcal/day.");
  }

  function reset() {
    $("#sex").value = "m"; $("#age").value = ""; $("#hgt").value = ""; $("#wgt").value = "";
    $("#act").value = "1.55"; $("#goal").value = "keep";
    out.replaceChildren(); T.setErr(""); T.status("");
  }

  card.addEventListener("input", calc);
  T.on($("#go"), "click", calc);
  T.on($("#rst"), "click", reset);
})();
