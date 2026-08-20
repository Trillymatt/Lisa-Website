import type { NextConfig } from "next";

// Static media in `public/` is served by Next with `Cache-Control: max-age=0`,
// so every visit re-validates (and on a cache miss re-downloads) the hero clip.
// Railway serves this app straight from the Node process with no CDN in front,
// so that round trip is the difference between an instant hero and a slow one.
// A week is long enough to matter and short enough that replacing the
// placeholder footage reaches visitors quickly; `stale-while-revalidate` lets
// the browser paint the cached copy while it checks for a newer one.
const MEDIA_CACHE_CONTROL =
  "public, max-age=604800, stale-while-revalidate=2592000";

const MEDIA_FILES = ["/hero.webm", "/hero-poster.jpg", "/lisa.jpg"];

const nextConfig: NextConfig = {
  // Railway's Node deployment runs the minimal self-contained server output.
  output: "standalone",

  async headers() {
    return MEDIA_FILES.map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: MEDIA_CACHE_CONTROL }],
    }));
  },
};

export default nextConfig;
