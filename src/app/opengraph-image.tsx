import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const swatches = ["#f5f7fa", "#ffffff", "#8f1710", "#a62218", "#4b0507"];

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
          background: "#f5f7fa",
          color: "#142124",
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
              gap: 8,
              transform: "rotate(45deg)",
            }}
          >
            <div style={{ width: 24, height: 24, background: "#8f1710" }} />
            <div style={{ width: 24, height: 24, background: "#a62218" }} />
            <div style={{ width: 24, height: 24, background: "#a62218" }} />
            <div style={{ width: 24, height: 24, background: "#4b0507" }} />
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: 0 }}>
            RM Tiling
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: 0, color: "#310005" }}>
            Melbourne Bathroom
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: 0, color: "#310005" }}>
            Renovations & Tiling
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#8f1710", letterSpacing: 0 }}>
            Melbourne · Waterproofing · Regrouting · Splashbacks
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>
            {site.phone.display || site.email}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {swatches.map((c) => (
              <div
                key={c}
                style={{
                  width: 44,
                  height: 44,
                  background: c,
                  border: "1px solid #dce4e6",
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
