/* image-to-base64 — build a data URI from the picked file, plus paste-ready snippets. */
(function () {
  "use strict";
  const T = window.WST_T, D = document; if (!T) return;
  const $ = T.$;

  const dz = $("#dz"), inp = $("#file"), go = $("#go"), clearBtn = $("#clear"), emptyEl = $("#empty");
  const resCard = $("#resCard"), code = $("#code"), copyBtn = $("#copy"), dl = $("#dl"), trunc = $("#truncated");
  const mode = $("#mode"), fmt = $("#fmt"), outBox = $("#out");
  const file = { cur: null };
  let full = "";

  function b64(blob) {
    return blob.arrayBuffer().then(buf => {
      const bytes = new Uint8Array(buf);
      let bin = "";
      const CH = 32768;
      for (let i = 0; i < bytes.length; i += CH) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
      return btoa(bin);
    });
  }
  function snippet(uri, mime) {
    const m = mode.value;
    if (m === "html") return '<img src="' + uri + '" alt="Describe this image" width="" height="">';
    if (m === "css") return ".hero{\n  background-image:url(\"" + uri + "\");\n  background-size:contain;\n}";
    if (m === "js") return 'const icon = "' + uri + '"; // ' + mime;
    return uri;
  }
  function stat(label, value) {
    const p = D.createElement("p"); p.className = "res-line";
    const a = D.createElement("span"); a.textContent = label;
    const b = D.createElement("span"); b.textContent = value;
    p.append(a, b); return p;
  }

  T.dropzone(dz, inp, fs => {
    T.setErr("");
    const f = fs.slice(-1)[0];
    if (!f) return;
    const bad = T.checkFile(f, /^image\//, "an image");
    if (bad) { T.setErr(bad); return; }
    file.cur = f;
    if (emptyEl) emptyEl.hidden = true;
    go.disabled = false; clearBtn.disabled = false;
    T.status(f.name + " ready (" + T.bytes(f.size) + ").");
  }, /\.(jpe?g|png|webp|gif|bmp|svg|jfif|heic|heif|avif)$/i);

  T.on(clearBtn, "click", () => {
    file.cur = null; full = "";
    go.disabled = true; clearBtn.disabled = true;
    if (emptyEl) emptyEl.hidden = false;
    resCard.hidden = true; outBox.replaceChildren();
    T.status(""); T.setErr("");
  });

  T.on(copyBtn, "click", async () => {
    if (!full) return;
    const ok = await T.copy(full);
    copyBtn.textContent = ok ? "Copied" : "Copy failed — select the text";
    T.status(ok ? "Copied " + T.bytes(full.length) + " of text to the clipboard." : "Your browser blocked the clipboard: select the text and copy manually.");
    setTimeout(() => { copyBtn.textContent = "Copy to clipboard"; }, 2200);
  });

  T.on(go, "click", async () => {
    if (!file.cur) { T.setErr("Add an image first."); return; }
    T.setErr(""); outBox.replaceChildren(); resCard.hidden = true;
    go.disabled = true; T.status("Encoding…");
    try {
      let blob = file.cur, mime = file.cur.type || "";
      let want = fmt.value;
      if (T.isHeic(file.cur) && want === "keep") {
        T.status("HEIC cannot be inlined usefully — decoding it to PNG first…");
        want = "image/png";
      }
      if (want !== "keep") {
        const bmp = await T.decode(file.cur);
        const c = T.paint(bmp, bmp.width, bmp.height, { alpha: want === "image/png", fill: "#fff", fit: "stretch" });
        blob = await T.encode(c, want, want === "image/jpeg" ? 0.9 : undefined);
        if (bmp.close) bmp.close();
      }
      mime = blob.type || (T.isHeic(file.cur) ? "image/png" : "image/" + T.ext(blob.type || "jpeg"));
      if (/heic|heif/.test(mime)) mime = "image/png";
      const text = await b64(blob);
      const uri = "data:" + mime + ";base64," + text;
      full = snippet(uri, mime);

      const res = D.createElement("div"); res.className = "res";
      res.append(
        stat("Original file", T.bytes(file.cur.size) + (want !== "keep" ? " → re-encoded " + T.bytes(blob.size) : " (bytes kept)")),
        stat("Base64 text", T.bytes(text.length) + " characters"),
        stat("Overhead", "+" + Math.round((text.length / Math.max(1, blob.size) - 1) * 100) + "% — base64 always costs about a third"),
        stat("MIME type", mime),
        stat("Snippet style", mode.options[mode.selectedIndex].text)
      );
      const wrap = D.createElement("div"); wrap.className = "imgwrap";
      const im = D.createElement("img"); im.src = uri; im.alt = "Preview of the encoded " + file.cur.name; im.loading = "lazy";
      wrap.appendChild(im);
      const warn = D.createElement("p"); warn.className = "disc";
      warn.textContent = blob.size > 30720
        ? "This is larger than the ~30 KB usually worth inlining — consider hosting the file instead."
        : "Comfortably small for inlining inside HTML or CSS.";
      outBox.append(res, wrap, warn);

      const SHOW = 4000;
      code.value = full.length > SHOW ? full.slice(0, SHOW) + "\n… truncated in this box …" : full;
      code.rows = full.length > SHOW ? 8 : Math.max(3, Math.min(12, Math.ceil(full.length / 60)));
      trunc.hidden = full.length <= SHOW;
      resCard.hidden = false;
      const txt = new Blob([full], { type: "text/plain" });
      if (dl) { dl.href = T.makeURL(txt); dl.download = (file.cur.name.replace(/\.[^.]+$/, "") || "image") + "-base64.txt"; }
      T.status("Encoded " + T.bytes(blob.size) + " into " + T.bytes(full.length) + " of text.");
    } catch (e) {
      T.setErr(e.user ? e.message : "Could not encode that file — " + (e.message || e) + ".");
    } finally { go.disabled = false; }
  });
})();
