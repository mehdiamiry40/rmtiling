import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0f766e 0%, #042f2e 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: 92,
              height: 92,
              borderRadius: 22,
              padding: 12,
              gap: 8,
              background: "rgba(255,255,255,0.12)",
            }}
          >
            <div style={{ width: 30, height: 30, borderRadius: 7, background: "#ffffff" }} />
            <div style={{ width: 30, height: 30, borderRadius: 7, background: "rgba(255,255,255,0.5)" }} />
            <div style={{ width: 30, height: 30, borderRadius: 7, background: "rgba(255,255,255,0.5)" }} />
            <div style={{ width: 30, height: 30, borderRadius: 7, background: "#fbbf24" }} />
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
            RM Tiling
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 70, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Tiling &amp; regrouting,
          </div>
          <div style={{ display: "flex", fontSize: 70, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            <span style={{ color: "#fbbf24" }}>done right</span>
            <span>&nbsp;in Melbourne.</span>
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 30 }}>
          <div style={{ display: "flex", color: "#99f6e4" }}>
            Free quotes · Licensed &amp; insured
          </div>
          <div style={{ display: "flex", fontWeight: 700 }}>{site.phone.display}</div>
        </div>
      </div>
    ),
    size,
  );
}
