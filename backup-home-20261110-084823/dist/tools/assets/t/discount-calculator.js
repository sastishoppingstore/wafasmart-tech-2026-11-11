/* discount-calculator — plain + stacked discounts, multi-currency, comparison table + CSV. Local. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const card = $(".t-card.opts"), out = $("#out"), dl = $("#dl");
  let lastUrl = null;

  function money(n) {
    n = Math.round(n * 100) / 100; const cur = $("#cur").value;
    try { return new Intl.NumberFormat(undefined, { style: "currency", currency: cur, minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(n); }
    catch (e) { return n + " " + cur; }
  }
  function num(el) { const v = parseFloat(el.value); return isFinite(v) ? v : null; }

  function calc() {
    T.setErr(""); dl.hidden = true;
    const p = num($("#price")), d1 = num($("#d1")), d2raw = $("#d2").value.trim(), d2 = d2raw === "" ? null : num($("#d2"));
    if (p == null || d1 == null) { out.replaceChildren(); if (lastUrl) { T.revoke(lastUrl); lastUrl = null; } T.status("Enter the price and the first discount."); return; }
    if (p <= 0) { T.setErr("Price must be greater than zero."); out.replaceChildren(); return; }
    if (d1 < 0 || d1 > 100) { T.setErr("Discount 1 must be between 0 and 100%."); out.replaceChildren(); return; }
    if (d2 != null && (d2 < 0 || d2 > 100)) { T.setErr("Discount 2 must be between 0 and 100%."); out.replaceChildren(); return; }

    const mult = (1 - d1 / 100) * (d2 ? (1 - d2 / 100) : 1);
    const final = p * mult, saved = p - final, eff = (1 - mult) * 100;

    const ref = [0.5, 1, 2, 5, 10].map(k => p * k);
    let rows = "";
    ref.forEach(rp => { const rf = rp * mult;
      rows += '<tr><td class="num">' + money(rp) + '</td><td class="num">' + money(rp - rf) + '</td><td class="num">' + money(rf) + '</td></tr>'; });

    const el = document.createElement("div");
    el.className = "res";
    el.innerHTML =
      '<div class="stat-row">' +
        '<div class="stat"><b>' + money(final) + '</b><small>final price</small></div>' +
        '<div class="stat"><b>' + money(saved) + '</b><small>you save</small></div>' +
        '<div class="stat"><b>' + (Math.round(eff * 100) / 100) + '%</b><small>effective off</small></div>' +
      '</div>' +
      '<table class="tbl"><thead><tr><th class="num">List price</th><th class="num">Saved</th><th class="num">After ' + (Math.round(eff * 100) / 100) + '% off</th></tr></thead><tbody>' + rows + '</tbody></table>';
    out.replaceChildren(el);

    let csv = "List price,Saved,Final\n";
    ref.forEach(rp => { const rf = rp * mult; csv += [rp.toFixed(2), (rp - rf).toFixed(2), rf.toFixed(2)].join(",") + "\n"; });
    if (lastUrl) { T.revoke(lastUrl); lastUrl = null; }
    lastUrl = T.makeURL(new Blob([csv], { type: "text/csv" }));
    dl.href = lastUrl; dl.download = "discount-" + $("#cur").value + ".csv"; dl.hidden = false;

    T.status("Effective " + (Math.round(eff * 100) / 100) + "% off — pay " + money(final) + ".");
  }

  function reset() { $("#price").value = ""; $("#d1").value = ""; $("#d2").value = ""; $("#cur").value = "PKR"; out.replaceChildren(); dl.hidden = true; T.setErr(""); T.status(""); }

  card.addEventListener("input", calc);
  T.on($("#go"), "click", calc);
  T.on($("#rst"), "click", reset);
})();
