import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const tile = (opacity: number) => ({
    width: 46,
    height: 46,
    borderRadius: 11,
    background: `rgba(255,255,255,${opacity})`,
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f7d70",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", width: 104, gap: 12 }}>
          <div style={tile(0.95)} />
          <div style={tile(0.5)} />
          <div style={tile(0.5)} />
          <div style={tile(0.95)} />
        </div>
      </div>
    ),
    size,
  );
}
