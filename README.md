# Above All Else Counseling and Wellness Center — Website

A calm, faith-inspired (non-denominational) website for a mental health
counseling practice. Built with **Next.js 16** (App Router), **TypeScript**,
and **Tailwind CSS v4**.

## Pages

| Route       | Purpose                                                              |
| ----------- | -------------------------------------------------------------------- |
| `/`         | Home — hero, mission, values, services preview, first-session, CTAs  |
| `/about`    | Mission & values                                                     |
| `/services` | Services with per-service pricing, rate menu, Good Faith Estimate     |
| `/schedule` | Google Calendar appointment booking                                  |
| `/intake`   | New-client next steps with live booking, phone, and email links      |
| `/faq`      | Frequently asked questions (also emits FAQPage structured data)       |
| `/contact`  | Contact form, phone, email, address, and quick-start CTAs            |
| `/privacy`  | Website privacy policy (not the clinical Notice of Privacy Practices) |

`robots.txt`, `sitemap.xml`, and the social share image at `/opengraph-image`
are generated automatically from `content.ts` — there is nothing to hand-edit.

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
- **`services`** — service names, descriptions, and which `rate` each one uses.
- **`rates`** — the rate menu.
- **`faqs`** — questions and answers.
- **`values`** / mission copy (the mission paragraphs are in
  [`src/app/about/page.tsx`](src/app/about/page.tsx)).

### Still to confirm before launch

These are gated: while unset, the site stays silent rather than publishing a
guess. Each is marked `TODO` in `content.ts`.

| What                    | Where                | Until it's set                                                       |
| ----------------------- | -------------------- | -------------------------------------------------------------------- |
| **Licence / credentials** | `site.practitioner`  | Shows "Counselor". See the note below — this one matters most.       |
| Insurance answer        | `insurance.accepted` | The insurance FAQ is hidden and `/services` keeps generic wording.    |
| Cancellation policy     | `faqs`               | That FAQ entry is hidden.                                            |
| Street address          | `site.location`      | Structured data publishes city/state only, not a partial address.    |
| Services priced "on request" | `services[].rate` | Those cards read "Rate on request" instead of showing a number.      |

> **Worth a professional check:** the site advertises counseling under the title
> "Counselor" with an MA in Marriage & Family Therapy. Texas regulates LMFT
> titles and advertising, so confirm the wording in `site.practitioner` matches
> Lisa's actual licence status — or, if she is not licensed as a clinician,
> that the site frames the work as biblical counseling / coaching. This is a
> question for Lisa, not a code change.

### A note on testimonials

There are none, deliberately. AAMFT and ACA ethics codes both restrict
soliciting endorsements from clients, so the homepage runs a "what your first
session looks like" section instead (`firstSession` in `content.ts`) — same
reassurance, none of the risk. Please don't add client quotes without checking
the ethics requirements first.

### Branding

Colors and fonts are defined in [`src/app/globals.css`](src/app/globals.css)
(palette under `@theme`) and [`src/app/layout.tsx`](src/app/layout.tsx) (fonts).
Swap the hex values once the official brand colors are confirmed.

Replace the favicon at `src/app/favicon.ico`. The social-share image is drawn
from the brand palette at build time in
[`src/app/opengraph-image.tsx`](src/app/opengraph-image.tsx) — edit that file
rather than adding a PNG.

Placeholder phone details are automatically hidden until configured.

## Environment variables

**None of these are required.** The site builds and deploys with no variables
set at all; anything that depends on one stays hidden rather than half-working,
so you can add them whenever you're ready.

| Variable                            | If you set it                                                       | If you don't                                                    |
| ----------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`              | Used as the canonical origin, e.g. `https://lisanormantherapy.com`. | Falls back to the Railway domain — see below. Nothing breaks.     |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | The `/contact` form appears and posts there.                        | The form is hidden; the page keeps its email/phone/booking cards. |
| `NEXT_PUBLIC_NOINDEX`               | Set to `1` to block all crawlers (for a staging environment).       | Normal indexing rules apply.                                      |

### You probably don't need to set the site URL

Railway injects `RAILWAY_PUBLIC_DOMAIN` as soon as the service has a domain, and
the site picks that up on its own. So:

- **No domain generated yet** — the build succeeds, the site runs, and
  `robots.txt` returns `Disallow: /`. That's intentional: there's no public
  address to send search engines to yet. The build logs one informational
  `[site-url]` line saying so.
- **Railway domain generated** — canonical URLs, the sitemap, and social
  previews all switch to that domain automatically, and indexing turns on. No
  variable needed.
- **Custom domain attached** — set `NEXT_PUBLIC_SITE_URL` to it so search
  engines treat the custom domain as canonical rather than the Railway one.

> These values are read at **build** time, because the pages are statically
> prerendered. So attaching a domain or changing a variable needs a
> **redeploy**, not just a restart.

### Adding the contact form later

Nothing to do until you want it. `/contact` works today with email, phone, and
booking links; the form simply isn't rendered. When you're ready:

1. Create a form at [formspree.io](https://formspree.io) pointed at Lisa's inbox.
2. Set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` in Railway to the endpoint URL.
3. Redeploy. The form appears on `/contact`, and the privacy policy grows a
   matching section automatically.

The form asks only for name, email, optional phone, contact preference, and a
short message, and tells visitors in plain language not to send medical details
— it is an ordinary web form, not a HIPAA-secured channel.

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
4. Generating a Railway domain is enough to make the site publicly indexable —
   it configures its own URLs from it. Only set `NEXT_PUBLIC_SITE_URL` once a
   custom domain is attached (see **Environment variables**), then redeploy.

Railway injects `PORT` automatically; the standalone server reads it at runtime.

### Why `npm start` goes through `scripts/start.mjs`

Next's generated `server.js` binds to `process.env.HOSTNAME || '0.0.0.0'`.
Containers — Docker, and therefore Railway — set `HOSTNAME` to the container's
ID, so the server tries to bind to a name DNS has never heard of and dies on
startup:

```
⨯ Failed to start server
Error: getaddrinfo ENOTFOUND a3f9c2b1d4e5
```

Nothing is then listening, and Railway's proxy serves **"Application failed to
respond"** even though the build and deploy both succeeded — a confusing failure,
because every stage in the dashboard is green.

[`scripts/start.mjs`](scripts/start.mjs) forces `HOSTNAME=0.0.0.0` before
launching the server, which is what a container behind a proxy always wants.
Set `HOST` if you ever need to bind somewhere specific.

**Don't change `start` back to `node .next/standalone/server.js`** — it works
locally (where `HOSTNAME` is usually unset) and fails only once deployed.

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
