/* age-calculator — Gregorian exact age, Hijri (Umm al-Qura) age, and Desi/Bikrami
   conversion from the editable config. All calculation is local. */
(function () {
  "use strict";
  const $ = s => document.querySelector(s);
  const DAY = 86400000;

  /* fallback mirrors build/src/tools/config/desi-months.json */
  let DESI_MONTHS = [
    { name: "Chet", startDay: 14, startMonth: 3 }, { name: "Vaisakh", startDay: 14, startMonth: 4 },
    { name: "Jeth", startDay: 15, startMonth: 5 }, { name: "Harh", startDay: 16, startMonth: 6 },
    { name: "Sawan", startDay: 16, startMonth: 7 }, { name: "Bhadon", startDay: 17, startMonth: 8 },
    { name: "Assu", startDay: 17, startMonth: 9 }, { name: "Katak", startDay: 17, startMonth: 10 },
    { name: "Maghar", startDay: 17, startMonth: 11 }, { name: "Poh", startDay: 15, startMonth: 12 },
    { name: "Magh", startDay: 14, startMonth: 1 }, { name: "Phagan", startDay: 13, startMonth: 2 }
  ];
  fetch("/tools/assets/config/desi-months.json", { cache: "force-cache" })
    .then(r => r.ok ? r.json() : null)
    .then(j => { if (j && Array.isArray(j.months) && j.months.length === 12) DESI_MONTHS = j.months; })
    .catch(() => { });

  const hadj = $("#hadj"), hadjv = $("#hadjv");
  if (hadj) hadj.oninput = () => { hadjv.textContent = hadj.value; };

  const localDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const utcDay = d => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const fmtLong = d => d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  function gregorianDiff(dob, asof) {
    let years = asof.getFullYear() - dob.getFullYear();
    let months = asof.getMonth() - dob.getMonth();
    let days = asof.getDate() - dob.getDate();
    if (days < 0) {
      months--;
      days += new Date(asof.getFullYear(), asof.getMonth(), 0).getDate();
    }
    if (months < 0) { years--; months += 12; }
    return { years, months, days };
  }

  /* ---------- Desi / Bikrami ---------- */
  function desiParts(date) {
    const d = localDay(date);
    const list = [];
    for (let gy = d.getFullYear() - 1; gy <= d.getFullYear() + 1; gy++) {
      DESI_MONTHS.forEach((m, idx) => {
        const start = new Date(gy, m.startMonth - 1, m.startDay);
        /* Chet (Mar) starts the new Bikrami year; Magh/Phagan (Jan/Feb) belong to the previous one. */
        const year = gy + (m.startMonth >= 3 ? 57 : 56);
        list.push({ start, year, idx, name: m.name });
      });
    }
    list.sort((a, b) => a.start - b.start);
    let pos = 0;
    for (let i = 0; i < list.length; i++) if (list[i].start <= d) pos = i; else break;
    const cur = list[pos];
    return { year: cur.year, idx: cur.idx, name: cur.name, day: Math.floor((d - cur.start) / DAY) + 1, pos, list };
  }
  function desiDiff(dob, asof) {
    const a = desiParts(dob), b = desiParts(asof);
    let months = (b.year * 12 + b.idx) - (a.year * 12 + a.idx);
    let days = b.day - a.day;
    if (days < 0) {
      months--;
      const prev = b.list[b.pos - 1], cur = b.list[b.pos];
      days += Math.round((cur.start - prev.start) / DAY);
    }
    const years = Math.floor(months / 12);
    months = ((months % 12) + 12) % 12;
    return { years, months, days, dob: a };
  }

  /* ---------- Hijri (Umm al-Qura via Intl) ---------- */
  function hijriParts(date) {
    const fmt = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", { day: "numeric", month: "numeric", year: "numeric" });
    const out = {};
    fmt.formatToParts(date).forEach(p => { if (p.type !== "literal") out[p.type] = p.value; });
    return { y: parseInt(String(out.year).replace(/\D/g, ""), 10), m: parseInt(out.month, 10), d: parseInt(out.day, 10) };
  }
  function hijriDiff(a, b) {
    let y = b.y - a.y, m = b.m - a.m, d = b.d - a.d;
    if (d < 0) { m--; d += 30; }
    if (m < 0) { y--; m += 12; }
    return { y, m, d };
  }

  $("#goage").onclick = () => {
    const d = +$("#ad").value, m = +$("#am").value, y = +$("#ay").value;
    const err = msg => {
      const box = $("#rage1");
      box.style.display = "block";
      $("#ageg").textContent = "—";
      $("#ageg2").textContent = msg;
      $("#ageg3").textContent = "";
      $("#agenb").textContent = "—";
    };
    if (!d || !m || !y) return err("Enter a valid day, month and year of birth.");
    const dob = new Date(y, m - 1, d);
    if (dob.getFullYear() !== y || dob.getMonth() !== m - 1 || dob.getDate() !== d) return err("That date does not exist — check the day and month.");

    let asof;
    if ($("#aof").value) {
      asof = new Date($("#aof").value + "T00:00:00");
      if (isNaN(asof)) return err("The 'age as of' date is invalid.");
      asof = localDay(asof);
    } else {
      asof = localDay(new Date());
    }
    if (dob > asof) return err("Date of birth is in the future — enter a past date.");

    /* Gregorian */
    const g = gregorianDiff(dob, asof);
    const totalDays = Math.floor((utcDay(asof) - utcDay(dob)) / DAY);
    $("#rage1").style.display = "block";
    $("#ageg").textContent = g.years + "y " + g.months + "m " + g.days + "d";
    $("#ageg2").textContent = "Total months ~" + Math.floor(totalDays / 30.44) + " • Weeks " + Math.floor(totalDays / 7) +
      " • Days " + totalDays + " • Hours " + (totalDays * 24).toLocaleString("en-US");
    $("#ageg3").textContent = fmtLong(dob);
    let nb = new Date(asof.getFullYear(), dob.getMonth(), dob.getDate());
    if (utcDay(nb) < utcDay(asof)) nb = new Date(asof.getFullYear() + 1, dob.getMonth(), dob.getDate());
    $("#agenb").textContent = Math.ceil((utcDay(nb) - utcDay(asof)) / DAY);

    /* Hijri — the ±2 day adjustment is applied to both dates for display and age. */
    try {
      const adj = parseInt(hadj.value || "0", 10) || 0;
      const dobH = addDays(dob, adj), asofH = addDays(asof, adj);
      const longFmt = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", { day: "numeric", month: "long", year: "numeric" });
      $("#hijriDob").textContent = longFmt.format(dobH);
      const h = hijriDiff(hijriParts(dobH), hijriParts(asofH));
      $("#hijriAge").textContent = h.y + "y " + h.m + "m " + h.d + "d";
      $("#rage2").style.display = "block";
    } catch (e) {
      $("#hijriAge").textContent = "This browser does not support the Umm al-Qura calendar.";
      $("#rage2").style.display = "block";
    }

    /* Desi / Bikrami */
    try {
      const dd = desiDiff(dob, asof);
      $("#desiDob").textContent = dd.dob.name + " " + dd.dob.day + ", " + dd.dob.year + " Bikrami";
      $("#desiAge").textContent = dd.years + "y " + dd.months + "m " + dd.days + "d";
      $("#rage3").style.display = "block";
    } catch (e) {
      $("#desiDob").textContent = "Desi conversion unavailable.";
      $("#desiAge").textContent = "—";
    }
  };
})();
