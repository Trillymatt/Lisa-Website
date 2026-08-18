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
    if (siteUrlIsPlaceholder && !noindexRequested) {
      // Logged here rather than at module scope in site-url.ts, because that
      // module is imported by every static-generation worker and would repeat
      // the message once per worker. robots.txt is generated exactly once.
      console.info(
        "[site-url] No public domain yet — building with localhost URLs and a " +
          "no-index robots.txt. Generate a Railway domain (or set " +
          "NEXT_PUBLIC_SITE_URL) and redeploy to publish.",
      );
    }
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
