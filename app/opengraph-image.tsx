import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#16191f",
          backgroundImage:
            "linear-gradient(135deg, #16191f 0%, #1a2228 50%, #16191f 100%)",
          color: "#f8fafc",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#34d4d9",
            fontSize: 22,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 88,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontWeight: 500,
            maxWidth: 1000,
          }}
        >
          Automate the busy. Amplify the human.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#94a3b8",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Productized AI automation · 90-Day ROI Promise
        </div>
      </div>
    ),
    size
  );
}
