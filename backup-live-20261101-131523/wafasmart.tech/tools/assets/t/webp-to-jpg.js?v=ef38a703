/* convert-image — one module for the four format-converter pages.
   The page's data-slug picks the defaults; whichever inputs exist on the page are read. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const main = document.querySelector("main[data-slug]") || {};
  const slug = main.dataset ? main.dataset.slug : "";

  const PRE = {
    "jpg-to-png": { type: "image/png", name: "png" },
    "png-to-jpg": { type: "image/jpeg", name: "jpg" },
    "webp-to-jpg": { type: "image/jpeg", name: "jpg" },
    "heic-to-jpg": { type: "image/jpeg", name: "jpg" }
  };
  const p = PRE[slug] || { type: "image/jpeg", name: "jpg" };

  const fmt = $("#fmt"), qEl = $("#q"), bg = $("#bg"), keep = $("#keep");
  if (qEl) T.rangeOut("q", "qv");
  if (fmt && fmt.value === "") fmt.value = p.type;

  T.imageTool({
    acceptRe: /\.(jpe?g|png|webp|gif|bmp|jfif|avif|heic|heif)$/i,
    typeRe: /^image\//,
    label: "an image file",
    multiple: true,
    zipName: p.name + "-converted.zip",
    readOpts() {
      return {
        type: fmt ? fmt.value : p.type,
        q: qEl ? (+qEl.value) / 100 : 0.88,
        fill: bg ? bg.value : "#ffffff",
        exif: keep ? keep.checked : true
      };
    },
    async process(ctx) {
      const o = ctx.opts;
      const alpha = o.type === "image/png" || o.type === "image/webp";
      /* PNG/WebP keep alpha; JPG is flattened on the chosen colour */
      const c = T.paint(ctx.bmp, ctx.bmp.width, ctx.bmp.height, { alpha: alpha, fill: o.fill, fit: "stretch" });
      const blob = await T.encode(c, o.type, alpha ? undefined : o.q);
      ctx.out([{
        name: ctx.base + "." + T.ext(o.type),
        blob: blob, type: o.type,
        note: c.width + "×" + c.height + " · " + T.bytes(blob.size)
      }]);
      T.status(ctx.base + ": " + T.bytes(ctx.file.size) + " → " + T.bytes(blob.size) + " " + T.ext(o.type).toUpperCase() + " (" + c.width + "×" + c.height + ").");
    }
  });
})();
