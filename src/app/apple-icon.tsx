import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const tile = (background: string) => ({
    width: 42,
    height: 42,
    background,
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
          background: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: 96,
            gap: 12,
            transform: "rotate(45deg)",
          }}
        >
          <div style={tile("#8f1710")} />
          <div style={tile("#a62218")} />
          <div style={tile("#a62218")} />
          <div style={tile("#4b0507")} />
        </div>
      </div>
    ),
    size,
  );
}
