#!/usr/bin/env python3
"""Regenerate the PWA icon set in public/icons/ from the club logos.

Usage:  pip3 install pillow && python3 scripts/generate-icons.py

Inputs: public/logo.png (color, transparent) and public/logo-white.png.
Change BRAND when re-branding a fork (keep in sync with --color-cranberry
in src/app/globals.css and themeColor in src/app/layout.tsx / manifest.ts).
"""

from PIL import Image

BRAND = (222, 22, 117, 255)  # #DE1675 — --color-cranberry

logo = Image.open("public/logo.png").convert("RGBA")
logo_white = Image.open("public/logo-white.png").convert("RGBA")


def fit(img, box):
    im = img.copy()
    im.thumbnail((box, box), Image.LANCZOS)
    return im


def make(base_logo, size, scale, bg, out):
    canvas = Image.new("RGBA", (size, size), bg)
    im = fit(base_logo, int(size * scale))
    canvas.paste(im, ((size - im.width) // 2, (size - im.height) // 2), im)
    canvas.save(out, optimize=True)
    print(out, canvas.size)


# Regular icons: logo on white (safe on any launcher background)
make(logo, 192, 0.82, (255, 255, 255, 255), "public/icons/icon-192.png")
make(logo, 512, 0.82, (255, 255, 255, 255), "public/icons/icon-512.png")
# Maskable: white logo on brand, inside the ~80% safe zone (58% is conservative)
make(logo_white, 192, 0.58, BRAND, "public/icons/icon-maskable-192.png")
make(logo_white, 512, 0.58, BRAND, "public/icons/icon-maskable-512.png")
# Apple touch icon (iOS rounds the corners itself)
make(logo_white, 180, 0.68, BRAND, "public/icons/apple-touch-icon.png")
