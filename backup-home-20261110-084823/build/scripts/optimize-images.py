#!/usr/bin/env python3
"""Wafa Smart Tech — image optimizer (WebP-only, responsive).

Reads build/src/assets/img/raw/*.png and writes lean production assets to
dist/assets/img/:

- Service/blog/portfolio art : <stem>-480.webp + <stem>-880.webp
- Hero / about art           : <stem>-800/-1280/-1600.webp
- Logo + PWA/favicon set     : optimized PNG (small palette) + logo.webp
- og-cover.jpg               : 1200x630, progressive JPEG (~150 KB)

Old PNG fallbacks and -640 files are removed so the dist stays small.
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
RAW = os.path.join(ROOT, "build", "src", "assets", "img", "raw")
OUT = os.path.join(ROOT, "dist", "assets", "img")
os.makedirs(OUT, exist_ok=True)

KEEP = set()


def crop_to(im, ratio):
    """center-crop to width/height ratio"""
    w, h = im.size
    cur = w / h
    if cur > ratio:  # too wide
        nw = int(h * ratio); x = (w - nw) // 2; box = (x, 0, x + nw, h)
    else:
        nh = int(w / ratio); y = (h - nh) // 2; box = (0, y, w, y + nh)
    return im.crop(box)


def save_webp(im, name, size, quality=72):
    im = im.resize(size, Image.LANCZOS)
    path = os.path.join(OUT, name + ".webp")
    im.save(path, "WEBP", quality=quality, method=6)
    KEEP.add(name + ".webp")
    print(f"  {name}.webp {im.size[0]}px {os.path.getsize(path)//1024} KB")


def save_png_palette(im, name, size):
    im = im.resize((size, size), Image.LANCZOS)
    im.convert("P", palette=Image.ADAPTIVE, colors=256).save(
        os.path.join(OUT, name + ".png"), "PNG", optimize=True)
    KEEP.add(name + ".png")
    print(f"  {name}.png {size}px {os.path.getsize(os.path.join(OUT, name + '.png'))//1024} KB")


def duotone(im, dark=(5, 13, 32), mid=(47, 107, 255), light=(244, 196, 48)):
    g = im.convert("L")

    def lerp(a, b, t):
        return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

    ramp = []
    for i in range(256):
        t = i / 255
        ramp.append(lerp(dark, mid, t * 2) if t < .5 else lerp(mid, light, (t - .5) * 2))
    rr = [c[0] for c in ramp]; gg = [c[1] for c in ramp]; bb = [c[2] for c in ramp]
    return Image.merge("RGB", (g.point(rr), g.point(gg), g.point(bb)))


def font(size, bold=True):
    for p in (f"/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
              "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf"):
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def main():
    # ---- logo + icons -------------------------------------------------
    logo_raw = Image.open(os.path.join(RAW, "logo.png")).convert("RGB")
    logo = duotone(crop_to(logo_raw, 1.0))
    save_webp(logo, "logo", (512, 512), quality=86)
    save_png_palette(logo, "logo", 256)  # schema.org logo (small)

    save_png_palette(logo, "apple-touch-icon", 180)
    save_png_palette(logo, "icon-192", 192)
    save_png_palette(logo, "icon-512", 512)

    # maskable: logo on brand bg, padded (kept as PNG)
    m = Image.new("RGB", (512, 512), (7, 11, 24))
    m.paste(logo.resize((360, 360), Image.LANCZOS), (76, 76))
    m.convert("P", palette=Image.ADAPTIVE, colors=256).save(
        os.path.join(OUT, "icon-maskable-512.png"), "PNG", optimize=True)
    KEEP.add("icon-maskable-512.png")

    for size in (32, 16):
        im = logo.resize((size, size), Image.LANCZOS)
        im.save(os.path.join(OUT, f"favicon-{size}.png"), "PNG", optimize=True)
        KEEP.add(f"favicon-{size}.png")
    print("  logo + favicon set ok")

    # ---- wide art: hero + about-team ---------------------------------
    for stem in ("hero-ai", "about-team"):
        src = Image.open(os.path.join(RAW, stem + ".png")).convert("RGB")
        src = crop_to(src, 16 / 9)
        save_webp(src, stem + "-800", (800, 450), quality=74)
        save_webp(src, stem + "-1280", (1280, 720), quality=73)
        save_webp(src, stem + "-1600", (1600, 900), quality=72)

    # ---- square service/blog/portfolio art ---------------------------
    for f in sorted(os.listdir(RAW)):
        if not f.endswith(".png"):
            continue
        stem = f[:-4]
        if stem in ("logo", "hero-ai", "about-team"):
            continue
        im = crop_to(Image.open(os.path.join(RAW, f)).convert("RGB"), 1.0)
        save_webp(im, stem + "-480", (480, 480), quality=72)
        save_webp(im, stem + "-880", (880, 880), quality=72)

    # ---- OG / social cover (JPEG is universal + tiny) ----------------
    hero = crop_to(Image.open(os.path.join(RAW, "hero-ai.png")).convert("RGB"), 1200 / 630)
    hero = hero.resize((1200, 630), Image.LANCZOS)
    ov = Image.new("RGBA", hero.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    for x in range(0, 620):
        d.line([(x, 0), (x, 630)], fill=(7, 11, 24, int(170 * (1 - x / 620))))
    hero = Image.alpha_composite(hero.convert("RGBA"), ov)
    d = ImageDraw.Draw(hero)
    d.text((64, 330), "WAFA SMART TECH", font=font(64), fill=(255, 255, 255))
    d.text((66, 416), "Every service PKR 14,000 fixed  ·  Domain FREE", font=font(30), fill=(244, 196, 48))
    d.text((66, 462), "AI Agents · Websites · Portals · Apps · 3 demo designs", font=font(26, False), fill=(150, 190, 255))
    d.text((66, 506), "Lahore, Pakistan  ·  WhatsApp 0324 6627054", font=font(24, False), fill=(215, 222, 245))
    hero.convert("RGB").save(os.path.join(OUT, "og-cover.jpg"), "JPEG", quality=84, optimize=True, progressive=True)
    KEEP.add("og-cover.jpg")
    print("  og-cover.jpg ok")

    # ---- prune legacy / unused images --------------------------------
    removed = 0
    for f in os.listdir(OUT):
        if f not in KEEP:
            os.remove(os.path.join(OUT, f)); removed += 1

    total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
    print(f"REMOVED {removed} old files · DIST IMG TOTAL: {total/1e6:.2f} MB · files: {len(os.listdir(OUT))}")


if __name__ == "__main__":
    main()
