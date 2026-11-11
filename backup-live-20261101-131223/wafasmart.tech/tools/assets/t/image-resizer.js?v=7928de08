/* image-resizer — rebuild each picture at an exact pixel size or percentage. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  T.rangeOut("q", "qv");

  const preset = $("#preset"), mode = $("#mode"), wEl = $("#w"), hEl = $("#h"),
        lock = $("#lock"), fmt = $("#fmt"), qEl = $("#q"), hFld = hEl.closest(".fld");

  function isPct() { return mode.value === "pct"; }
  function syncFields() {
    if (hFld) hFld.hidden = isPct();
    wEl.min = isPct() ? 1 : 1;
    wEl.max = isPct() ? 800 : 12000;
    wEl.placeholder = isPct() ? "percent, e.g. 50" : "";
    document.querySelector('label[for="w"]').textContent = isPct() ? "Percent (%)" : "Width (px)";
  }
  T.on(mode, "change", syncFields);
  T.on(preset, "change", () => {
    if (!preset.value) return;
    const p = preset.value.split("x");
    mode.value = "px"; syncFields();
    wEl.value = p[0]; hEl.value = p[1];
  });
  syncFields();

  T.imageTool({
    acceptRe: /\.(jpe?g|png|webp|gif|bmp|jfif|heic|heif)$/i,
    typeRe: /^image\//,
    label: "an image (JPG, PNG, WebP, GIF, BMP or HEIC)",
    multiple: true,
    zipName: "resized.zip",
    readOpts() {
      const o = { type: fmt.value, q: (+qEl.value) / 100, lock: lock.checked, pct: 0, w: 0, h: 0 };
      if (isPct()) o.pct = T.num(wEl, { min: 1, max: 800, def: 100, label: "Percent" });
      else {
        o.w = T.num(wEl, { min: 1, max: 12000, asInt: true, label: "Width" });
        o.h = T.num(hEl, { min: 1, max: 12000, asInt: true, label: "Height" });
      }
      return o;
    },
    async process(ctx) {
      const o = ctx.opts, bmp = ctx.bmp;
      let w = o.w, h = o.h;
      if (o.pct) {
        const s = o.pct / 100;
        w = Math.max(1, Math.round(bmp.width * s));
        h = Math.max(1, Math.round(bmp.height * s));
      }
      const alpha = o.type === "image/png";
      const c = T.paint(bmp, w, h, { alpha: alpha, fit: o.lock && !o.pct ? "contain" : "stretch" });
      const blob = await T.encode(c, o.type, o.type === "image/png" ? undefined : o.q);
      ctx.out([{
        name: ctx.base + "-" + c.width + "x" + c.height + "." + T.ext(o.type),
        blob: blob, type: o.type,
        note: c.width + "×" + c.height + " · " + T.bytes(blob.size)
      }]);
      T.status(ctx.base + " → " + c.width + "×" + c.height + " (" + T.bytes(blob.size) + ").");
    }
  });
})();
