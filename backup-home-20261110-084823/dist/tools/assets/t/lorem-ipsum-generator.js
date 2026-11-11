/* lorem-ipsum-generator — classic Latin word bank assembled into paragraphs / lists. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const out = $("#out"), copyBtn = $("#copy");
  const BANK = ("lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim " +
    "ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate " +
    " velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum " +
    "nunc faucibus tellus justo vel porttitor ligula massa tincidunt rutrum").trim().split(/\s+/);
  const pick = n => Array.from({ length: n }, () => BANK[Math.floor(Math.random() * BANK.length)]);
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  let lastText = "";

  function sentence() {
    const w = pick(8 + Math.floor(Math.random() * 9));
    let s = w.join(" ");
    if (s.length > 40) { const at = 25 + Math.floor(Math.random() * 25); s = s.slice(0, at) + ", " + s.slice(at).trim(); }
    return cap(s) + ".";
  }
  function paragraph(first) {
    const n = 4 + Math.floor(Math.random() * 4), parts = [];
    for (let i = 0; i < n; i++) parts.push(sentence());
    if (first) { parts[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."; }
    return parts.join(" ");
  }

  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function build() {
    out.replaceChildren();
    const mode = $("#mode").value, start = $("#start").value === "y", html = $("#html").value;
    let count = Math.min(500, Math.max(1, parseInt($("#count").value, 10) || 0));
    if (!$("#count").value || parseInt($("#count").value, 10) < 1) { T.setErr("Enter a count between 1 and 500."); return; }
    T.setErr("");

    /* Words mode counts words, not blocks. */
    if (mode === "words") {
      let words = pick(count);
      if (start) words = ["Lorem", "ipsum", ...words.slice(2)];
      const text = cap(words.join(" ")) + ".";
      if (text === lastText) return build2Fresh();
      lastText = text; show(text); return;
    }

    const arr = [];
    for (let i = 0; i < count; i++) {
      if (mode === "sentences") arr.push(start && i === 0 ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit." : sentence());
      else if (mode === "list") arr.push(sentence().replace(/\.$/, ""));
      else arr.push(paragraph(start && i === 0));
    }

    let text;
    if (mode === "list" && html === "ul") {
      text = "<ul>\n" + arr.map(a => "  <li>" + a + "</li>").join("\n") + "\n</ul>";
    } else if ((mode === "paragraphs" || mode === "sentences") && html === "p") {
      text = arr.map(a => "<p>" + a + "</p>").join("\n");
    } else {
      text = arr.join(mode === "paragraphs" ? "\n\n" : "\n");
    }

    if (text === lastText) return build2Fresh();
    lastText = text; show(text);
  }
  function build2Fresh() { build(); }

  function show(text) {
    const box = document.createElement("div"); box.className = "codebox"; box.textContent = text;
    const plain = text.replace(/<[^>]+>/g, " ");
    const words = (plain.match(/[\p{L}\p{N}]+/gu) || []).length;
    const head = document.createElement("h3"); head.className = "cnt"; head.textContent = "Generated text";
    out.append(head, box);
    const note = document.createElement("p"); note.className = "cnt";
    note.textContent = words + " words · " + text.length + " characters. Placeholder only — replace before publishing.";
    out.appendChild(note);
    copyBtn.disabled = false;
    T.status("Generated. Press Copy text to use it.");
    out._text = text;
  }

  T.on($("#go"), "click", build);
  T.on(copyBtn, "click", async () => {
    const text = out._text; if (!text) return;
    try { await navigator.clipboard.writeText(text); T.status("Copied to clipboard."); }
    catch (e) {
      const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); T.status("Copied."); } catch (e2) { T.setErr("Copy blocked — select the text and copy manually."); }
      ta.remove();
    }
  });
  T.on($("#rst"), "click", () => { out.replaceChildren(); lastText = ""; copyBtn.disabled = true; $("#count").value = 3; T.setErr(""); T.status("Reset."); });
})();
