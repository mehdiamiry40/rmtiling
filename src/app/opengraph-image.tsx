import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const swatches = ["#f5f5f4", "#e7e5e4", "#a8a29e", "#57534e", "#1c1917"];

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
          background: "#ffffff",
          color: "#1c1917",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: 56,
              height: 56,
              borderRadius: 13,
              padding: 8,
              gap: 5,
              background: "#1c1917",
            }}
          >
            <div style={{ width: 17, height: 17, borderRadius: 4, background: "#ffffff" }} />
            <div style={{ width: 17, height: 17, borderRadius: 4, background: "rgba(255,255,255,0.5)" }} />
            <div style={{ width: 17, height: 17, borderRadius: 4, background: "rgba(255,255,255,0.5)" }} />
            <div style={{ width: 17, height: 17, borderRadius: 4, background: "#ffffff" }} />
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
            RM Tiling
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 600, lineHeight: 1.02, letterSpacing: -3 }}>
            Tiling &amp; regrouting,
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 600, lineHeight: 1.02, letterSpacing: -3 }}>
            done right.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#78716c", letterSpacing: -0.5 }}>
            Melbourne · Free quotes · Licensed &amp; insured
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>
            {site.phone.display}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {swatches.map((c) => (
              <div
                key={c}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 9,
                  background: c,
                  border: "1px solid #e7e5e4",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
