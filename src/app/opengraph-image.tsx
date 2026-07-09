import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo/metadata";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #0A1628 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 12,
              height: 80,
              background: "#FF9933",
              borderRadius: 4,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1 }}>
              {siteConfig.name}
            </div>
            <div style={{ fontSize: 24, color: "#FF9933", marginTop: 8 }}>
              {siteConfig.tagline}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#E5E7EB", maxWidth: 900, lineHeight: 1.5 }}>
          Open-access multidisciplinary knowledge journal for Bharat — research,
          education, innovation & nation building.
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
            fontSize: 18,
            color: "#9CA3AF",
          }}
        >
          <span>Open Access</span>
          <span>·</span>
          <span>Peer Reviewed</span>
          <span>·</span>
          <span>Google Scholar Ready</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
