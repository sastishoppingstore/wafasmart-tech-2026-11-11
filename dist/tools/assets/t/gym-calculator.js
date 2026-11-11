/* gym-calculator — BMI, BMR/TDEE, macros, US Navy body fat, 1RM, HR zones, water.
   Units are converted when the selector changes; all formulas run in metric internally. */
(function(){
  "use strict";
  const $ = s => document.querySelector(s), $$ = s => Array.from(document.querySelectorAll(s));
  const LB = 2.2046226218, IN = 2.54;
  let unit = "metric";

  function setNum(id, v, suffix) {
    const el = $("#" + id); if (el) el.textContent = v + (suffix || "");
  }
  function fail(id, msg) {
    const r = $("#" + id); if (!r) return;
    r.style.display = "block";
    const b = r.querySelector("b"); if (b) b.textContent = "—";
    const note = r.querySelector(".err-note") || document.createElement("p");
    note.className = "disc err-note"; note.textContent = msg;
    if (!note.parentNode) r.appendChild(note);
  }

  /* ---- tabs ---- */
  $$(".gym-tab").forEach(b => {
    b.setAttribute("aria-pressed", b.classList.contains("active") ? "true" : "false");
    b.addEventListener("click", () => {
      $$(".gym-tab").forEach(x => { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("active"); b.setAttribute("aria-pressed", "true");
      ["bmi","bmr","macros","bf","rm","hr","water"].forEach(t => { $("#tab-" + t).style.display = t === b.dataset.tab ? "grid" : "none"; });
    });
  });

  /* ---- units: convert current values and relabel ---- */
  const labels = {
    metric: { "lb-bw":"Weight (kg)", "lb-bh":"Height (cm)", "lb-bw2":"Weight (kg)", "lb-bh2":"Height (cm)",
      "lb-bfh":"Height (cm)", "lb-bfw":"Waist (cm)", "lb-bfn":"Neck (cm)", "lb-bfhp":"Hip (cm, female)", "lb-rmw":"Weight Lifted (kg)", "lb-ww":"Weight (kg)" },
    imp: { "lb-bw":"Weight (lb)", "lb-bh":"Height (in)", "lb-bw2":"Weight (lb)", "lb-bh2":"Height (in)",
      "lb-bfh":"Height (in)", "lb-bfw":"Waist (in)", "lb-bfn":"Neck (in)", "lb-bfhp":"Hip (in, female)", "lb-rmw":"Weight Lifted (lb)", "lb-ww":"Weight (lb)" }
  };
  function convert(id, fn) {
    const el = $("#" + id); if (!el || el.value === "") return;
    const n = +el.value; if (!isFinite(n)) return;
    el.value = Math.round(fn(n) * 100) / 100;
  }
  const unitsSel = $("#units");
  if (unitsSel) unitsSel.addEventListener("change", () => {
    const next = unitsSel.value === "imp" ? "imp" : "metric";
    if (next === unit) return;
    const toImp = next === "imp";
    ["bw","bw2","rmw","ww"].forEach(id => convert(id, n => toImp ? n * LB : n / LB));
    ["bh","bh2","bfh","bfw","bfn","bfhp"].forEach(id => convert(id, n => toImp ? n / IN : n * IN));
    Object.entries(labels[next]).forEach(([id, text]) => { const l = $("#" + id); if (l) l.textContent = text; });
    unit = next;
  });

  /* ---- BMI ---- */
  $("#gobmi").onclick = () => {
    let w = +$("#bw").value, h = +$("#bh").value;
    if (!(w > 0) || !(h > 0)) return fail("rbmi", "Enter a valid weight and height.");
    if (unit === "imp") { w /= LB; h *= IN; }
    const m = h / 100, bmi = w / (m * m);
    const r = $("#rbmi"); r.style.display = "block";
    const old = r.querySelector(".err-note"); if (old) old.remove();
    const b = r.querySelector("b"); b.textContent = bmi.toFixed(1);
    $("#rbmit").textContent = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
  };

  /* ---- BMR / TDEE ---- */
  $("#gobmr").onclick = () => {
    let age = +$("#bage").value, w = +$("#bw2").value, h = +$("#bh2").value;
    const g = $("#bg").value, a = +$("#bact").value, goal = $("#bgoal").value;
    if (!(age > 0) || !(w > 0) || !(h > 0)) return fail("rbmr", "Enter a valid age, weight and height.");
    if (unit === "imp") { w /= LB; h *= IN; }
    const bmr = g === "m" ? (10 * w + 6.25 * h - 5 * age + 5) : (10 * w + 6.25 * h - 5 * age - 161);
    const tdee = bmr * a;
    let tgt = tdee;
    if (goal === "cut") tgt = tdee - 400;
    if (goal === "bulk") tgt = tdee + 300;
    const r = $("#rbmr"); r.style.display = "block";
    const old = r.querySelector(".err-note"); if (old) old.remove();
    if (tgt < 1200) {
      tgt = 1200;
      r.insertAdjacentHTML("beforeend", '<p class="disc err-note">Target was below 1,200 kcal — raised to the recommended minimum. Consult a professional.</p>');
    }
    setNum("rbmr1", Math.round(bmr));
    setNum("rtdee", Math.round(tdee));
    setNum("rtgt", Math.round(tgt));
  };

  /* ---- macros ---- */
  $("#gomac").onclick = () => {
    const c = +$("#mcal").value, sp = $("#msplit").value;
    if (!(c > 0)) return fail("rmac", "Enter daily calories.");
    let p, c1, f;
    if (sp === "balanced") { p = .3; c1 = .4; f = .3; }
    else if (sp === "highp") { p = .4; c1 = .3; f = .3; }
    else { p = .4; c1 = .25; f = .35; }
    $("#rmac").style.display = "block";
    setNum("mp", Math.round(c * p / 4), "g");
    setNum("mc", Math.round(c * c1 / 4), "g");
    setNum("mf", Math.round(c * f / 9), "g");
  };

  /* ---- body fat (US Navy; formula expects inches) ---- */
  $("#gobf").onclick = () => {
    const g = $("#bfg").value;
    let h = +$("#bfh").value, w = +$("#bfw").value, n = +$("#bfn").value, hp = +$("#bfhp").value;
    if (!(h > 0) || !(w > 0) || !(n > 0) || (g === "f" && !(hp > 0))) return fail("rbf", "Enter height, waist, neck" + (g === "f" ? " and hip" : "") + ".");
    if (unit === "metric") { h /= IN; w /= IN; n /= IN; hp /= IN; }
    let bf;
    if (g === "m") bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    else bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.221 * Math.log10(h)) - 450;
    const r = $("#rbf"); r.style.display = "block";
    const old = r.querySelector(".err-note"); if (old) old.remove();
    const b = r.querySelector("b");
    b.textContent = bf > 0 && bf < 70 ? bf.toFixed(1) + "%" : "—";
    if (!(bf > 0 && bf < 70)) fail("rbf", "Those measurements are outside the formula's valid range.");
  };

  /* ---- 1RM ---- */
  $("#gorm").onclick = () => {
    const w = +$("#rmw").value, rp = +$("#rmr").value;
    if (!(w > 0) || !(rp > 0) || rp > 36) return fail("rrm", "Enter a weight and reps between 1 and 36.");
    const u = unit === "imp" ? " lb" : " kg";
    $("#rrm").style.display = "block";
    const old = $("#rrm").querySelector(".err-note"); if (old) old.remove();
    setNum("re1", Math.round(w * (1 + rp / 30) * 10) / 10, u);
    setNum("re2", Math.round(w * 36 / (37 - rp) * 10) / 10, u);
  };

  /* ---- heart-rate zones (Karvonen when resting HR is supplied) ---- */
  $("#gohr").onclick = () => {
    const a = +$("#hra").value;
    if (!(a > 0)) return fail("rhr", "Enter a valid age.");
    const max = 220 - a, rest = +$("#hrr").value || 0;
    $("#rhr").style.display = "block";
    const old = $("#rhr").querySelector(".err-note"); if (old) old.remove();
    setNum("rhrm", Math.round(max));
    const ranges = [[.5,.6],[.6,.7],[.7,.8],[.8,.9],[.9,1]];
    ranges.forEach(([lo, hi], i) => {
      const low = rest ? (max - rest) * lo + rest : max * lo;
      const high = rest ? (max - rest) * hi + rest : max * hi;
      const el = $("#rz" + (i + 1));
      if (el) el.textContent = Math.round(low) + "–" + Math.round(high) + " bpm";
    });
    const note = $("#rhrnote");
    if (note) { note.hidden = !rest; note.textContent = rest ? "Karvonen formula used with resting HR " + rest + " bpm." : ""; }
  };

  /* ---- water ---- */
  $("#gow").onclick = () => {
    let w = +$("#ww").value;
    if (!(w > 0)) return fail("rw", "Enter a valid weight.");
    if (unit === "imp") w /= LB;
    const r = $("#rw"); r.style.display = "block";
    const old = r.querySelector(".err-note"); if (old) old.remove();
    const b = r.querySelector("b");
    b.textContent = (w * 0.035).toFixed(2);
  };
})();
