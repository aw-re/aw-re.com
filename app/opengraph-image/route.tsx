import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
const size = { width: 1200, height: 630 };
export async function GET() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/aw-re-tech.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    <div
      style={{
        background: "#0b0f0e",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "70px",
        color: "#f3f3f0",
        fontFamily: "sans-serif",
        borderBottom: "8px solid #b6ff3b",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: 240,
          height: 63,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Raster artwork is embedded for the server-rendered social image. */}
        <img
          src={logoSrc}
          alt="AW-RE Tech"
          width={259}
          height={104}
          style={{ position: "absolute", left: -7, top: -25 }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 96,
          fontWeight: 700,
          marginTop: 42,
          lineHeight: 1.1,
        }}
      >
        <span>A Smarter</span>
        <span style={{ color: "#b6ff3b" }}>Tomorrow.</span>
      </div>
      <p style={{ fontSize: 25, color: "#a9b2ae" }}>
        Software, AI & Digital Systems built for real business impact.
      </p>
    </div>,
    size,
  );
}
