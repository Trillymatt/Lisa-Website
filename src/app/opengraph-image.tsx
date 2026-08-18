import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

/**
 * The image people see when the site is shared in a text, on Facebook, or in
 * Slack. Drawn at build time from the brand palette rather than shipped as a
 * binary, so it stays in sync if the colors or the tagline change.
 *
 * Deliberately uses no webfont: pulling one from Google here would add a
 * network dependency to the build, which is the kind of thing that breaks a
 * deploy at the worst moment.
 */
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
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px",
          // sand-50 → sage-50, matching the site's page backgrounds.
          background: "linear-gradient(160deg, #faf7f1 0%, #e6eddf 100%)",
        }}
      >
        {/* gold-400 rule, the site's accent */}
        <div
          style={{
            width: "72px",
            height: "6px",
            borderRadius: "999px",
            background: "#d4b574",
            marginBottom: "44px",
          }}
        />
        <div
          style={{
            fontSize: 62,
            fontWeight: 700,
            color: "#2e4757", // ocean-800
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          {site.shortName}
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#425836", // sage-700
            marginTop: "26px",
            lineHeight: 1.4,
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#547043", // sage-600
            marginTop: "40px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {`Counseling & Wellness · ${site.location.city}, ${site.location.state}`}
        </div>
      </div>
    ),
    size,
  );
}
