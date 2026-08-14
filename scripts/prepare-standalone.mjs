import { cp, mkdir } from "node:fs/promises";

// Next.js intentionally leaves static and public assets outside the standalone
// bundle. Copy them beside the generated server so Railway can serve the whole
// site from the minimal production output.
await cp("public", ".next/standalone/public", { recursive: true });
await mkdir(".next/standalone/.next", { recursive: true });
await cp(".next/static", ".next/standalone/.next/static", { recursive: true });
