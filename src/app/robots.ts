import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl, siteUrlIsPlaceholder } from "@/lib/site-url";

/**
 * Indexing is allowed by default for any real deployed origin, including
 * Railway's own `*.up.railway.app` domain — a small practice that needs to be
 * found should never be silently invisible to Google because an environment
 * variable was missed. Blocking crawlers is therefore opt-in:
 *
 *   - set `NEXT_PUBLIC_NOINDEX=1` on staging/preview environments, and
 *   - localhost is never indexable regardless.
 */
export default function robots(): MetadataRoute.Robots {
  const noindexRequested = process.env.NEXT_PUBLIC_NOINDEX === "1";

  if (noindexRequested || siteUrlIsPlaceholder) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The health endpoint exists for Railway, not for people.
      disallow: "/api/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
