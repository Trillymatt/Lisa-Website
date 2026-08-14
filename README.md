# Above All Else Counseling and Wellness Center — Website

A calm, faith-inspired (non-denominational) website for a mental health
counseling practice. Built with **Next.js 16** (App Router), **TypeScript**,
and **Tailwind CSS v4**.

## Pages

| Route        | Purpose                                                            |
| ------------ | ------------------------------------------------------------------ |
| `/`          | Home — hero, mission, values, services preview, testimonials, CTAs |
| `/about`     | Mission & values                                                   |
| `/services`  | Services with clear, upfront pricing                               |
| `/schedule`  | Google Calendar appointment booking                                |
| `/intake`    | New-client next steps with live booking, phone, and email links    |
| `/contact`   | Phone, email, address, and quick-start CTAs                        |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # lint
```

## Editing content (start here)

Almost all copy lives in one file: **[`src/lib/content.ts`](src/lib/content.ts)**.
Search it for `TODO` — every placeholder is marked. Update:

- **Business details** — name, email, phone, address.
- **`schedulingUrl`** — the public Google Calendar Appointment Schedule link.
  This powers the "Book a Session" buttons and booking page on `/schedule`.
- **`services`** — service names, descriptions, and pricing.
- **`testimonials`** — real, permission-given client quotes.
- **`values`** / mission copy (the mission paragraphs are in
  [`src/app/about/page.tsx`](src/app/about/page.tsx)).

### Branding

Colors and fonts are defined in [`src/app/globals.css`](src/app/globals.css)
(palette under `@theme`) and [`src/app/layout.tsx`](src/app/layout.tsx) (fonts).
Swap the hex values once the official brand colors are confirmed.

Replace the favicon at `src/app/favicon.ico`, and (optionally) add an
`src/app/opengraph-image.png` for nice social-share previews.

Placeholder phone details and sample testimonials are automatically hidden.
After adding permission-given testimonials, set `testimonialsAreApproved` to
`true` in `content.ts`.

## Online scheduling

`/schedule` opens the practice's Google Calendar Appointment Schedule using
`site.schedulingUrl`. Paste the public Google booking-page link into
`content.ts`. Until then, the page shows working contact options rather
than linking visitors to a placeholder.

## New-client page

`/intake` currently offers three working ways to get started: the public Google
Calendar booking page, click-to-call, and email. A future intake workflow can be
added when the practice is ready to receive online submissions.

## Deploying to Railway

1. Push this repo to GitHub and create a Railway project from the repository.
2. Railway reads `railway.json`, builds the standalone Next.js server, and
   checks `/api/health` before switching traffic to the new deployment.
3. In **Settings → Networking**, generate a Railway domain or attach the
   practice's custom domain.

Railway injects `PORT` automatically; the standalone server reads it at runtime.
The standalone server binds `0.0.0.0`, so Railway's `/api/health` check can
reach it.

### Why Tailwind and TypeScript are in `dependencies`

Railway builds with `NODE_ENV=production` set, which makes `npm ci` skip
`devDependencies`. Anything `next build` actually needs must therefore live in
`dependencies`, not `devDependencies` — otherwise the build dies with
`Cannot find module '@tailwindcss/postcss'` while compiling `globals.css`.

That is why `tailwindcss`, `@tailwindcss/postcss`, `typescript`, and the
`@types/*` packages sit in `dependencies`. **Do not "tidy" them back into
`devDependencies`** — it will break the deploy. This costs nothing at runtime:
`output: "standalone"` traces only the modules the server actually imports, so
these never reach the deployed bundle.

`eslint` and `eslint-config-next` stay in `devDependencies` because `next build`
does not run lint.

Node is pinned to 22 via `engines.node` and `.node-version` so the builder
cannot drift onto a version older than Next 16's `>=20.9.0` floor.
