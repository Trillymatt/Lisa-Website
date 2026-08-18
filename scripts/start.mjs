/**
 * Production launcher for the standalone Next.js server.
 *
 * Why this exists instead of running `node .next/standalone/server.js`:
 *
 * Next's generated server.js binds to `process.env.HOSTNAME || '0.0.0.0'`.
 * Container runtimes — Docker, and therefore Railway — set `HOSTNAME` to the
 * container's ID (something like `a3f9c2b1d4e5`). The server then tries to bind
 * to that name, DNS has never heard of it, and startup dies with:
 *
 *     ⨯ Failed to start server
 *     Error: getaddrinfo ENOTFOUND a3f9c2b1d4e5
 *
 * The container then has nothing listening, so Railway's proxy answers requests
 * with "Application failed to respond" even though the build and deploy both
 * succeeded.
 *
 * Forcing `HOSTNAME` to 0.0.0.0 makes the server listen on every interface,
 * which is what a container behind a proxy always wants. `HOST` is left as a
 * deliberate override for the rare case of binding somewhere specific.
 *
 * Written as a Node script rather than an inline env assignment in the npm
 * script so it works the same on Windows, and so this explanation lives next to
 * the workaround.
 */
process.env.HOSTNAME = process.env.HOST?.trim() || "0.0.0.0";

// server.js is CommonJS and calls process.chdir(__dirname) itself, so it does
// not care what directory we were launched from.
await import("../.next/standalone/server.js");
