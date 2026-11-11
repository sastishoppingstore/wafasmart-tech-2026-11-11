/* pakistan-salary-tax-calculator — FY2025-26 Finance Act 2024 salaried slabs from config. Local. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const card = $(".t-card.opts"), out = $("#out"), dl = $("#dl");
  let lastUrl = null;

  const DEF = {
    lastUpdated: "2026-10-28", effectiveFy: "2025-26", disclaimer: "Verify with FBR", currency: "PKR",
    salaried: [
      { upTo: 600000, base: 0, rate: 0 },
      { upTo: 1200000, base: 0, rate: 5 },
      { upTo: 2200000, base: 30000, rate: 15 },
      { upTo: 3200000, base: 180000, rate: 25 },
      { upTo: 35000000, base: 430000, rate: 30 },
      { upTo: null, base: 9970000, rate: 35 }
    ],
    minTax: 5000, minTaxAbove: 600000
  };
  let cfg = Object.assign({}, DEF);
  const grp = n => Math.round(n).toLocaleString("en-US");
  const money = n => grp(n) + " PKR";

  function computeTax(annual) {
    const arr = cfg.salaried;
    let lower = 0, tax = 0, bandIdx = 0;
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      if (e.upTo == null || annual <= e.upTo) { tax = (e.base || 0) + ((e.rate || 0) / 100) * (annual - lower); bandIdx = i; break; }
      lower = e.upTo;
    }
    if (tax < 0) tax = 0;
    if (annual > (cfg.minTaxAbove || 0)) tax = Math.max(tax, cfg.minTax || 0);
    return { tax, bandIdx };
  }

  function calc() {
    T.setErr("");
    const inc = parseFloat($("#income").value);
    if (!isFinite(inc)) { out.replaceChildren(); if (lastUrl) { T.revoke(lastUrl); lastUrl = null; } dl.hidden = true; T.status("Enter your salary."); return; }
    if (inc < 0) { T.setErr("Salary cannot be negative."); out.replaceChildren(); dl.hidden = true; return; }
    const basis = $("#basis").value;
    const annual = basis === "m" ? inc * 12 : inc;
    const { tax, bandIdx } = computeTax(annual);
    const monthlyTax = tax / 12;
    const eff = annual > 0 ? tax / annual * 100 : 0;
    const takeM = (annual - tax) / 12;

    const res = document.createElement("div");
    res.className = "res";
    res.innerHTML =
      '<div class="stat-row">' +
        '<div class="stat"><b>' + money(tax) + '</b><small>annual tax</small></div>' +
        '<div class="stat"><b>' + money(monthlyTax) + '</b><small>monthly tax</small></div>' +
        '<div class="stat"><b>' + (Math.round(eff * 100) / 100) + '%</b><small>effective rate</small></div>' +
        '<div class="stat"><b>' + money(takeM) + '</b><small>monthly take-home</small></div>' +
      '</div>';

    // slab table (DOM build; all cell text via textContent)
    const table = document.createElement("table");
    table.className = "tbl";
    const thead = document.createElement("thead");
    const htr = document.createElement("tr");
    ["Annual income band", "Marginal rate", "Fixed tax at start"].forEach(h => { const th = document.createElement("th"); th.textContent = h; htr.appendChild(th); });
    thead.appendChild(htr); table.appendChild(thead);
    const tbody = document.createElement("tbody");
    let lower = 0;
    const csv = ["Band upTo,Rate%,Base\n"];
    cfg.salaried.forEach((e, i) => {
      const tr = document.createElement("tr");
      if (i === bandIdx) tr.style.background = "rgba(244,196,48,.14)";
      const c1 = document.createElement("td"); c1.textContent = grp(lower) + " – " + (e.upTo == null ? "∞" : grp(e.upTo)) + (i === bandIdx ? " ◄ you" : "");
      const c2 = document.createElement("td"); c2.className = "num"; c2.textContent = (e.rate || 0) + "%";
      const c3 = document.createElement("td"); c3.className = "num"; c3.textContent = money(e.base || 0);
      tr.append(c1, c2, c3); tbody.appendChild(tr);
      csv.push([(e.upTo == null ? "INF" : e.upTo), (e.rate || 0), (e.base || 0)].join(",") + "\n");
      if (e.upTo != null) lower = e.upTo;
    });
    res.appendChild(table);

    const note = document.createElement("span");
    note.className = "hint";
    note.textContent = "Slabs for " + (cfg.effectiveFy ? "FY " + cfg.effectiveFy : "the loaded year") + " · config last updated " + cfg.lastUpdated + " · " + (cfg.disclaimer || "Verify with FBR") + (cfg.fallback ? " (config file could not load — using built-in defaults.)" : "");
    out.replaceChildren(res, note);

    if (lastUrl) { T.revoke(lastUrl); lastUrl = null; }
    lastUrl = T.makeURL(new Blob([csv.join("")], { type: "text/csv" }));
    dl.href = lastUrl; dl.download = "pakistan-tax-slabs.csv"; dl.hidden = false;

    T.status("Annual tax " + money(tax) + " (" + money(monthlyTax) + "/month).");
  }

  function reset() { $("#income").value = ""; $("#basis").value = "m"; out.replaceChildren(); dl.hidden = true; T.setErr(""); T.status(""); }

  fetch("/tools/assets/config/pakistan-tax.json", { cache: "force-cache" })
    .then(r => { if (!r.ok) throw new Error("bad"); return r.json(); })
    .then(j => {
      if (Array.isArray(j.salaried) && j.salaried.length) cfg = Object.assign({}, DEF, j);
      else throw new Error("empty");
      T.status("Slabs loaded (FY " + cfg.effectiveFy + ", updated " + cfg.lastUpdated + "). Enter your salary.");
    })
    .catch(() => { cfg.fallback = true; T.status("Could not load the slab file — using built-in FY 2025-26 defaults."); });

  card.addEventListener("input", calc);
  T.on($("#go"), "click", calc);
  T.on($("#rst"), "click", reset);
})();
