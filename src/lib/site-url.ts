/**
 * The site's canonical origin, used for `metadataBase`, canonical tags, the
 * sitemap, and JSON-LD.
 *
 * Resolution order:
 *   1. `NEXT_PUBLIC_SITE_URL` — set this in Railway once the real domain is
 *      attached (e.g. `https://lisanormantherapy.com`). Always wins.
 *   2. `RAILWAY_PUBLIC_DOMAIN` — injected by Railway, so preview deploys get
 *      correct absolute URLs without any configuration.
 *   3. localhost, for `npm run dev`.
 *
 * Read at build time, since most pages are statically prerendered.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return stripTrailingSlash(withProtocol(explicit));

  const railway = process.env.RAILWAY_PUBLIC_DOMAIN?.trim();
  if (railway) return stripTrailingSlash(withProtocol(railway));

  return "http://localhost:3000";
}

/** Railway exposes a bare hostname; metadataBase needs a full origin. */
function withProtocol(value: string) {
  return /^https?:\/\//.test(value) ? value : `https://${value}`;
}

function stripTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const siteUrl = resolveSiteUrl();

/**
 * True when we fell through to localhost — i.e. neither env var was present.
 *
 * This matters because `siteUrl` is baked in at BUILD time (most pages are
 * statically prerendered), so a production build without either variable would
 * ship localhost canonical tags and an un-indexable robots.txt. Railway exposes
 * service variables to the build, so setting `NEXT_PUBLIC_SITE_URL` there is
 * enough — but the warning below makes a miss visible in the build log instead
 * of silently sinking the site's SEO weeks later.
 */
export const siteUrlIsPlaceholder = siteUrl.startsWith("http://localhost");

if (siteUrlIsPlaceholder && process.env.NODE_ENV === "production") {
  console.warn(
    "\n[site-url] WARNING: neither NEXT_PUBLIC_SITE_URL nor RAILWAY_PUBLIC_DOMAIN " +
      "was set at build time.\n" +
      "           Canonical URLs, the sitemap, and social previews will point at " +
      "localhost, and\n" +
      "           robots.txt will block all crawlers. Set NEXT_PUBLIC_SITE_URL in " +
      "Railway and rebuild.\n",
  );
}

/** Absolute URL for a site-relative path, e.g. `absoluteUrl("/about")`. */
export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
