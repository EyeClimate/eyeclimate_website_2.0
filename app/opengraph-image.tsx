import { ImageResponse } from "next/og";

export const alt = "Eyeclimate — Earth observation intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        color: "#f2f7fa",
        background:
          "radial-gradient(circle at 80% 20%, rgba(165,240,82,.24), transparent 30%), linear-gradient(135deg, #050608, #0a0a0d)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 999,
            background: "#a5f052",
            boxShadow: "0 0 28px rgba(165,240,82,.7)",
          }}
        />
        <div style={{ fontSize: 30, fontWeight: 600 }}>Eyeclimate</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 72,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Building intelligence for
          <span style={{ color: "#a5f052" }}> Earth observation.</span>
        </div>
        <div style={{ fontSize: 28, color: "#a6adb3" }}>
          Satellite, airborne, and ground-sensor data into decision-ready
          climate intelligence.
        </div>
      </div>
    </div>,
    size,
  );
}
