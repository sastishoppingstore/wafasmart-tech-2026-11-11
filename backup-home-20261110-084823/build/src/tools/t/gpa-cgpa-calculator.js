/* gpa-cgpa-calculator — credit-weighted CGPA + percentage→CGPA with mapping table. All local. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const card = $(".t-card.opts"), out = $("#out"), rowsEl = $("#rows"), mapEl = $("#maptbl");
  let mode = "grades", rowId = 0;

  const GP = { "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0.0 };
  const OPTS = Object.keys(GP).map(g => '<option value="' + g + '">' + g + " (" + GP[g].toFixed(1) + ")</option>").join("");
  const PK = [
    [80, 100, "A", 4.0], [75, 79.99, "A-", 3.7], [70, 74.99, "B+", 3.3], [65, 69.99, "B", 3.0],
    [60, 64.99, "B-", 2.7], [55, 59.99, "C+", 2.3], [50, 54.99, "C", 2.0], [45, 49.99, "C-", 1.7],
    [40, 44.99, "D", 1.0], [0, 39.99, "F", 0.0]
  ];

  function addRow() {
    const i = rowId++;
    const d = document.createElement("div");
    d.className = "row-item";
    d.innerHTML =
      '<span><label class="sr-only" for="cn' + i + '">Course name</label><input type="text" id="cn' + i + '" class="c-n" placeholder="Course" autocomplete="off" maxlength="40"></span>' +
      '<span><label class="sr-only" for="cc' + i + '">Credit hours</label><input type="number" id="cc' + i + '" class="c-c" inputmode="decimal" min="0" max="30" step="0.5" placeholder="Cr"></span>' +
      '<span><label class="sr-only" for="cg' + i + '">Grade</label><select id="cg' + i + '" class="c-g"><option value="">—</option>' + OPTS + '</select></span>' +
      '<button type="button" class="row-rm" aria-label="Remove course">✕</button>';
    rowsEl.appendChild(d);
  }

  function drawMap() {
    let html = '<table class="tbl"><thead><tr><th class="num">%</th><th>Grade</th><th class="num">Points</th></tr></thead><tbody>';
    if ($("#scheme").value === "lin") html += '<tr><td class="num">0–100</td><td>linear</td><td class="num">%/100×4</td></tr>';
    else PK.forEach(b => html += '<tr><td class="num">' + b[0] + "–" + b[1] + "</td><td>" + b[2] + '</td><td class="num">' + b[3].toFixed(1) + "</td></tr>");
    html += "</tbody></table><span class=\"hint\">Mapping varies by institution — use your own transcript's table.</span>";
    mapEl.innerHTML = html;
  }

  function calc() {
    T.setErr("");
    if (mode === "grades") {
      let creditSum = 0, ptSum = 0, used = 0;
      T.$$(".row-item", rowsEl).forEach(r => {
        const cr = parseFloat(r.querySelector(".c-c").value);
        const g = r.querySelector(".c-g").value;
        if (isFinite(cr) && cr > 0 && g in GP) { creditSum += cr; ptSum += cr * GP[g]; used++; }
      });
      if (!used) { out.replaceChildren(); T.status("Add courses with credit hours and a grade."); return; }
      const cgpa = ptSum / creditSum;
      const res = document.createElement("div");
      res.className = "res";
      res.innerHTML =
        '<div class="stat-row">' +
          '<div class="stat"><b>' + cgpa.toFixed(2) + '</b><small>CGPA (4.0)</small></div>' +
          '<div class="stat"><b>' + creditSum + '</b><small>total credits</small></div>' +
          '<div class="stat"><b>' + (Math.round(ptSum * 100) / 100) + '</b><small>grade points</small></div>' +
        '</div>' +
        '<div class="res-line"><span>Courses counted</span><span>' + used + '</span></div>' +
        '<div class="res-line"><span>Weighted total</span><span>' + ptSum.toFixed(2) + " ÷ " + creditSum + " = " + cgpa.toFixed(2) + "</span></div>";
      out.replaceChildren(res);
      T.status("CGPA " + cgpa.toFixed(2) + " over " + creditSum + " credits.");
    } else {
      const p = parseFloat($("#pct").value);
      if (!isFinite(p)) { out.replaceChildren(); T.status("Enter an average percentage."); return; }
      if (p < 0 || p > 100) { T.setErr("Percentage must be between 0 and 100."); out.replaceChildren(); return; }
      let cgpa, grade = "—";
      if ($("#scheme").value === "lin") { cgpa = p / 100 * 4; }
      else { const b = PK.find(x => p >= x[0]) || PK[PK.length - 1]; grade = b[2]; cgpa = b[3]; }
      const res = document.createElement("div");
      res.className = "res";
      res.innerHTML =
        '<div class="stat-row">' +
          '<div class="stat"><b>' + cgpa.toFixed(2) + '</b><small>converted CGPA</small></div>' +
          (grade === "—" ? "" : '<div class="stat"><b>' + grade + '</b><small>matched grade</small></div>') +
        '</div>' +
        '<div class="res-line"><span>Input percentage</span><span>' + p + " %</span></div>";
      out.replaceChildren(res);
      T.status("≈ CGPA " + cgpa.toFixed(2) + " on the selected scheme.");
    }
  }

  function setMode(m) {
    mode = m;
    T.$$(".seg[data-mode]").forEach(s => s.setAttribute("aria-pressed", String(s.dataset.mode === m)));
    $("#gradesWrap").hidden = m !== "grades";
    $("#percentWrap").hidden = m !== "percent";
    if (m === "percent") drawMap();
    out.replaceChildren(); T.setErr(""); T.status("");
  }

  rowsEl.addEventListener("input", calc);
  rowsEl.addEventListener("click", e => { if (e.target.classList.contains("row-rm")) { e.target.closest(".row-item").remove(); calc(); } });
  $("#scheme").addEventListener("change", () => { drawMap(); calc(); });
  card.addEventListener("input", () => { if (mode === "percent") calc(); });
  T.$$(".seg[data-mode]").forEach(s => T.on(s, "click", () => setMode(s.dataset.mode)));
  T.on($("#add"), "click", () => { addRow(); });
  T.on($("#go"), "click", calc);
  T.on($("#rst"), "click", () => { rowsEl.replaceChildren(); setMode("grades"); addRow(); addRow(); addRow(); addRow(); $("#pct").value = ""; $("#scheme").value = "pk"; });

  addRow(); addRow(); addRow(); addRow();
})();
