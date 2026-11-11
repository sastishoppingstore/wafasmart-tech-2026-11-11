/* word-counter — live, Unicode-aware count of words, characters, scripts, reading time, keywords. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const txt = $("#txt"), out = $("#out");
  const WORD_RE = /[\p{L}\p{N}'\u2019\-]+/gu;
  const ARABIC_RE = /\p{Script=Arabic}/gu;
  const LATIN_RE = /\p{Script=Latin}/gu;
  const DIGIT_RE = /\p{Nd}/gu;
  const ZWJ_RE = /\u200D/g;
  const SENT_SPLIT = /[.!?۔؟،\u06D4\u061F…|]+/;
  const STOP = new Set(("a an the and or but of to in on for with is are was were be been this that these those it its as at by from\n" +
    "کے اور کا کی کو سے میں پر نے جو ہے ہوں ہوتی ہوتا تھا تھی کہ یا تو بھی ہی تو اپنا اپنی ہم تم آپ وہ یہ سب").split(/\s+/));

  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function stat(label, value) { const b = el("div", "stat"); b.append(el("b", null, value), el("small", null, label)); return b; }
  function mins(words, rate) {
    const m = words / rate;
    if (words === 0) return "0 sec";
    if (m < 1) return Math.max(1, Math.round(m * 60)) + " sec";
    const whole = Math.floor(m), sec = Math.round((m - whole) * 60);
    return whole + " min" + (sec ? " " + sec + " sec" : "");
  }

  function buildKeywordTable(rows) {
    const table = el("table", "tbl");
    const head = el("tr"); head.append(el("th", null, "#"), el("th", null, "Word"), el("th", "num", "Count"));
    table.appendChild(head);
    rows.forEach((r, i) => { const tr = el("tr"); tr.append(el("td", null, String(i + 1)), el("td", null, r.w), el("td", "num", String(r.c))); table.appendChild(tr); });
    return table;
  }

  function render(text) {
    out.replaceChildren();
    if (!text.trim()) { T.setErr("Type or paste some text and the counts will appear here."); T.status(""); return; }
    T.setErr("");

    const words = text.match(WORD_RE) || [];
    const wordCount = words.length;
    const charsAll = Array.from(text).length;
    const charsNoSpace = Array.from(text).filter(c => !/\s/.test(c)).length;
    const sentences = text.split(SENT_SPLIT).map(s => s.trim()).filter(s => WORD_RE.test(s) || /[\p{L}]/u.test(s)).length;
    WORD_RE.lastIndex = 0;
    const paragraphs = text.split(/\n+/).map(p => p.trim()).filter(Boolean).length;
    const lower = words.map(w => w.toLowerCase());
    const uniq = new Set(lower).size;
    const arabic = (text.match(ARABIC_RE) || []).length;
    const latin = (text.match(LATIN_RE) || []).length;
    const digits = (text.match(DIGIT_RE) || []).length;
    const zwj = (text.match(ZWJ_RE) || []).length;

    const row = el("div", "stat-row");
    row.append(
      stat("Words", wordCount.toLocaleString()),
      stat("Characters", charsAll.toLocaleString()),
      stat("No spaces", charsNoSpace.toLocaleString()),
      stat("Sentences", sentences.toLocaleString()),
      stat("Paragraphs", paragraphs.toLocaleString()),
      stat("Unique words", uniq.toLocaleString())
    );
    out.appendChild(row);

    const times = el("div", "res");
    times.append(
      line("Reading time (200 wpm)", mins(wordCount, 200)),
      line("Speaking time (130 wpm)", mins(wordCount, 130))
    );
    out.appendChild(times);

    const scripts = el("div", "res");
    scripts.append(el("b", null, "Script breakdown"));
    scripts.append(
      line("Latin letters", latin.toLocaleString()),
      line("Urdu / Arabic letters", arabic.toLocaleString()),
      line("Digits", digits.toLocaleString()),
      line("Zero-width joiners (ZWJ)", zwj.toLocaleString())
    );
    out.appendChild(scripts);

    const counts = new Map();
    for (const w of lower) { if (STOP.has(w) || w.length < 2) continue; counts.set(w, (counts.get(w) || 0) + 1); }
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 10);
    const kw = el("div", "stack");
    kw.appendChild(el("b", null, "Top keywords"));
    if (top.length) kw.appendChild(buildKeywordTable(top.map(([w, c]) => ({ w, c }))));
    else kw.appendChild(el("p", "hint", "No repeatable keywords found in this text."));
    out.appendChild(kw);

    T.status("Counted " + wordCount.toLocaleString() + " words and " + charsAll.toLocaleString() + " characters.");
  }

  function line(label, value) {
    const r = el("div", "res-line");
    r.append(el("span", null, label), el("b", null, value));
    return r;
  }

  let timer = null;
  function schedule() { clearTimeout(timer); timer = setTimeout(() => render(txt.value), 120); }
  T.on(txt, "input", schedule);

  T.on($("#go"), "click", () => render(txt.value));

  T.on($("#sample"), "click", () => {
    txt.value = "اردو ایک خوبصورت زبان ہے۔ یہ لفظ شمار کرنے والا آلہ اردو اور انگریزی دونوں کو صحیح گنتا ہے۔ " +
      "طلباء اور لکھاری اسے اپنا مضمون جانچنے کے لیے استعمال کر سکتے ہیں۔ Reading time and keyword stats update live as you type.";
    render(txt.value);
  });

  T.on($("#rst"), "click", () => { txt.value = ""; out.replaceChildren(); T.setErr(""); T.status("Cleared."); txt.focus(); });
})();
