/* emi-loan-calculator — EMI + year-by-year amortisation + CSV. All local. */
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
    const p = num($("#p")), rate = num($("#rate")), ten = num($("#ten"));
    const tu = $("#tu").value, ppy = Number($("#freq").value) || 12;
    if (p == null || rate == null || ten == null) { out.replaceChildren(); if (lastUrl) { T.revoke(lastUrl); lastUrl = null; } T.status("Enter principal, rate and tenure."); return; }
    if (p <= 0) { T.setErr("Principal must be greater than zero."); out.replaceChildren(); return; }
    if (rate < 0 || rate > 100) { T.setErr("Annual rate should be between 0 and 100%."); out.replaceChildren(); return; }
    if (ten <= 0) { T.setErr("Tenure must be greater than zero."); out.replaceChildren(); return; }
    const n = Math.round((tu === "y" ? ten : ten / 12) * ppy);
    if (n < 1) { T.setErr("Tenure is too short for that frequency."); out.replaceChildren(); return; }

    const r = rate / 100 / ppy;
    const pow = Math.pow(1 + r, n);
    const emi = r === 0 ? p / n : p * r * pow / (pow - 1);
    if (!isFinite(emi)) { T.setErr("Could not compute EMI — please re-check the inputs."); out.replaceChildren(); return; }
    const totalPay = emi * n, totalInt = totalPay - p;

    // amortise, grouping periods into calendar years
    let bal = p, yrs = [], acc = { y: 1, open: p, prin: 0, int: 0, close: p };
    const csv = ["Year,Opening,Principal,Interest,Closing\n"];
    for (let i = 1; i <= n; i++) {
      const interest = bal * r;
      let principal = emi - interest;
      if (i === n) principal = bal; // clear residual on last period
      bal = Math.max(0, bal - principal);
      const yIdx = Math.floor((i - 1) / ppy) + 1;
      if (yIdx !== acc.y) { yrs.push(acc); acc = { y: yIdx, open: 0, prin: 0, int: 0, close: 0 }; }
      acc.prin += principal; acc.int += interest;
    }
    yrs.push(acc);
    // rebuild openings/closings from running balance so years chain exactly
    let prevClose = p;
    yrs.forEach(a => { a.open = prevClose; a.close = prevClose - a.prin; prevClose = a.close; });

    const show = yrs.slice(0, 10);
    let rows = "";
    show.forEach(a => { rows += '<tr><td class="num">' + a.y + '</td><td class="num">' + money(a.open) + '</td><td class="num">' + money(a.prin) + '</td><td class="num">' + money(a.int) + '</td><td class="num">' + money(a.close) + '</td></tr>'; });
    yrs.forEach(a => { csv.push([a.y, a.open.toFixed(2), a.prin.toFixed(2), a.int.toFixed(2), a.close.toFixed(2)].join(",") + "\n"); });

    const more = yrs.length > show.length ? '<div class="res-line"><span>+ ' + (yrs.length - show.length) + ' more years in the CSV export</span></div>' : "";
    const el = document.createElement("div");
    el.className = "res";
    el.innerHTML =
      '<div class="stat-row">' +
        '<div class="stat"><b>' + money(emi) + '</b><small>per ' + (ppy === 12 ? "month" : ppy === 4 ? "quarter" : "year") + ' (EMI)</small></div>' +
        '<div class="stat"><b>' + money(totalInt) + '</b><small>total interest</small></div>' +
        '<div class="stat"><b>' + money(totalPay) + '</b><small>total payment</small></div>' +
      '</div>' +
      '<table class="tbl"><thead><tr><th class="num">Yr</th><th class="num">Opening</th><th class="num">Principal</th><th class="num">Interest</th><th class="num">Closing</th></tr></thead><tbody>' + rows + '</tbody></table>' + more;
    out.replaceChildren(el);

    if (lastUrl) { T.revoke(lastUrl); lastUrl = null; }
    lastUrl = T.makeURL(new Blob([csv.join("")], { type: "text/csv" }));
    dl.href = lastUrl; dl.download = "emi-schedule-" + $("#cur").value + ".csv"; dl.hidden = false;

    T.status("EMI " + money(emi) + " × " + n + " payments; total interest " + money(totalInt) + ".");
  }

  function reset() { ["#p", "#rate", "#ten"].forEach(s => $(s).value = ""); $("#tu").value = "y"; $("#freq").value = "12"; $("#cur").value = "PKR"; out.replaceChildren(); dl.hidden = true; T.setErr(""); T.status(""); }

  card.addEventListener("input", calc);
  T.on($("#go"), "click", calc);
  T.on($("#rst"), "click", reset);
})();
