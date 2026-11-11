/* compress-image — binary search over canvas JPEG/WebP quality (and optional
   downscale) until the encoded blob actually fits the chosen KB target. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  T.rangeOut("q", "qv");

  const target = $("#target"), qEl = $("#q"), fmt = $("#fmt"), maxw = $("#maxw"), down = $("#down");
  T.on(down, "change", () => { maxw.disabled = !down.checked; maxw.classList.toggle("off", !down.checked); });
  maxw.disabled = !down.checked;

  async function attempt(bmp, scale, type, q, cap) {
    let w = Math.max(16, Math.round(bmp.width * scale));
    let h = Math.max(16, Math.round(bmp.height * scale));
    if (cap && cap < w) { const s = cap / w; w = Math.max(16, Math.round(w * s)); h = Math.max(16, Math.round(h * s)); }
    const c = T.paint(bmp, w, h, { alpha: false, fit: "stretch" });
    const blob = await T.encode(c, type, q);
    return { blob, w: c.width, h: c.height };
  }

  /* largest quality that still lands under `limit`, measured, not guessed */
  async function bisect(bmp, scale, type, limit) {
    let lo = 0.05, hi = 0.98, best = null;
    for (let i = 0; i < 8; i++) {
      const mid = Math.round(((lo + hi) / 2) * 100) / 100;
      const r = await attempt(bmp, scale, type, mid, 0);
      if (r.blob.size <= limit) { best = r; best.q = mid; lo = mid; } else { hi = mid; }
      if (hi - lo < 0.015) break;
      T.status("Testing quality " + Math.round(mid * 100) + "% → " + T.bytes(r.blob.size) + "…");
      await T.yieldUI();
    }
    if (!best) { const r = await attempt(bmp, scale, type, 0.05, 0); best = r; best.q = 0.05; best.over = true; }
    return best;
  }

  T.imageTool({
    acceptRe: /\.(jpe?g|png|webp|gif|bmp|jfif|heic|heif)$/i,
    typeRe: /^image\//,
    label: "an image (JPG, PNG, WebP, GIF, BMP or HEIC)",
    multiple: true,
    zipName: "compressed.zip",
    readOpts() {
      return {
        limit: +target.value,
        type: fmt.value,
        q: (+qEl.value) / 100,
        cap: down.checked ? +maxw.value : 0,
        allowDown: down.checked
      };
    },
    async process(ctx) {
      const o = ctx.opts, bmp = ctx.bmp, before = ctx.file.size;
      const ext = T.ext(o.type);
      let r;

      if (!o.limit) {
        r = await attempt(bmp, 1, o.type, o.q, o.cap);
      } else {
        let scale = o.cap && bmp.width > o.cap ? o.cap / bmp.width : 1, tries = 0;
        while (true) {
          r = await bisect(bmp, scale, o.type, o.limit);
          if (!r.over || !o.allowDown || scale <= 0.12 || ++tries > 6) break;
          scale = Math.max(0.12, scale * 0.82);
          T.status("Quality alone cannot reach the target — reducing to about " + Math.round(bmp.width * scale) + " px wide…");
          await T.yieldUI();
        }
      }

      const saved = before ? Math.round((1 - r.blob.size / before) * 100) : 0;
      const note = r.w + "×" + r.h + " · " + T.bytes(r.blob.size) +
        (r.over ? " · smallest possible" : (o.limit ? " · fits target" : (saved > 0 ? " · saved " + saved + "%" : "")));
      ctx.out([{
        name: ctx.base + "-compressed." + ext,
        blob: r.blob, type: o.type, note: note
      }]);
      if (r.over) T.setErr(ctx.file.name + ": even quality 5% came to " + T.bytes(r.blob.size) + ", above the target. It was saved as-is — crop it or pick a larger target.");
      T.status(ctx.base + ": " + T.bytes(before) + " → " + T.bytes(r.blob.size) + " (" + r.w + "×" + r.h + ").");
    }
  });
})();
