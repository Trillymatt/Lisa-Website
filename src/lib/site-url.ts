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
 * True when we fell through to localhost — i.e. no public origin is known yet.
 *
 * This is a normal, expected state before a domain is attached, not an error.
 * The build succeeds either way; the site simply keeps itself out of search
 * results until it has a real address to point crawlers at.
 *
 * Note that `siteUrl` is baked in at BUILD time, because most pages are
 * statically prerendered. Railway injects `RAILWAY_PUBLIC_DOMAIN` as soon as a
 * domain exists, so generating one is usually all that's needed — but either
 * way, a change of address requires a redeploy, not just a restart.
 */
export const siteUrlIsPlaceholder = siteUrl.startsWith("http://localhost");

/** Absolute URL for a site-relative path, e.g. `absoluteUrl("/about")`. */
export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
