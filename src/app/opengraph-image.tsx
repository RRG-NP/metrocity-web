import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { currentTenure } from "@/config/club.config";
import { siteSettings } from "@/data/siteSettings";

/**
 * The site-wide social share card (1200x630), inherited by every route unless a
 * segment ships its own. Replaces the old 800x320 `/logo-full.png`, which was
 * below the size `summary_large_image` expects and carried no context.
 *
 * Everything is derived from `club.config.ts`, so the tenure handover (new
 * president, new theme) regenerates the card with no edits here.
 *
 * Satori (which backs ImageResponse) supports flexbox only — no grid — and
 * requires an explicit `display: flex` on any element with multiple children.
 */

export const alt = `${siteSettings.clubName} — ${siteSettings.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND = {
  cranberry: "#de1675",
  azure: "#902d2c",
  ink: "#190a10",
  gold: "#ff8fbe",
} as const;

export default async function Image() {
  // process.cwd() is the project root at build time.
  const wheel = await readFile(join(process.cwd(), "public/wheel-white.png"));
  const wheelSrc = `data:image/png;base64,${wheel.toString("base64")}`;

  const themeLine = currentTenure.theme?.title ?? currentTenure.themeLine;
  const host = siteSettings.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: BRAND.ink,
        backgroundImage: `linear-gradient(135deg, ${BRAND.cranberry} 0%, ${BRAND.azure} 55%, ${BRAND.ink} 100%)`,
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      {/* Watermark — the wheel bled off the right edge, echoing the hero. */}
      <img
        src={wheelSrc}
        width={620}
        height={620}
        alt=""
        style={{
          position: "absolute",
          top: -60,
          right: -240,
          opacity: 0.1,
        }}
      />

      {/* Header: mark + district line */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <img src={wheelSrc} width={72} height={72} alt="" />
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          {`${siteSettings.district} · ${siteSettings.location}`}
        </div>
      </div>

      {/* Body: club name + presidential theme */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 820,
          }}
        >
          {siteSettings.clubName}
        </div>
        {themeLine && (
          <div
            style={{
              marginTop: 24,
              fontSize: 46,
              fontWeight: 700,
              letterSpacing: -1,
              color: BRAND.gold,
            }}
          >
            {themeLine}
          </div>
        )}
        <div
          style={{
            marginTop: 18,
            fontSize: 27,
            fontWeight: 500,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          {`“${siteSettings.motto}” · ${siteSettings.tagline}`}
        </div>
      </div>

      {/* Footer: the year's president, then the domain */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "2px solid rgba(255,255,255,0.25)",
          paddingTop: 28,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
          {`${siteSettings.president} · President ${siteSettings.rotaractYear}`}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 600,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          {host}
        </div>
      </div>
    </div>,
    size,
  );
}
