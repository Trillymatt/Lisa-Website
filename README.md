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
| `/schedule`  | Online appointment booking (embedded Calendly)                     |
| `/intake`    | New client intake questionnaire (posts to `/api/intake`)           |
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
- **`schedulingUrl`** — your Calendly (or Acuity) booking link. This powers the
  "Book a Session" buttons and the embedded scheduler on `/schedule`.
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

## Online scheduling

`/schedule` embeds Calendly inline using `site.schedulingUrl`. Just paste the
real Calendly event link into `content.ts`. To use **Acuity** instead, swap the
embed snippet in [`src/components/calendly-embed.tsx`](src/components/calendly-embed.tsx).

## Intake form

The form posts to [`src/app/api/intake/route.ts`](src/app/api/intake/route.ts),
which currently validates and logs submissions server-side. Before launch, wire
up delivery (see the TODO at the top of that file). Easiest options:

- **Resend** (email) — copy `.env.example` to `.env.local`, fill in the keys,
  and send the payload to the practice inbox.
- **Formspree** — point the form at Formspree and delete the API route.

## Deploying (recommended: Vercel)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — it auto-detects Next.js.
3. Add any env vars from `.env.example` in the Vercel dashboard.
4. Deploy, then point your custom domain at it.

Hosting fits comfortably in a free/low-cost tier.
