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

All optional — the site builds and deploys without any of them, and features
that depend on one stay hidden rather than half-working.

| Variable                            | Effect                                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`              | Canonical origin, e.g. `https://lisanormantherapy.com`. **Set this in Railway.** See warning below. |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | Formspree (or similar) endpoint. Without it the `/contact` form is hidden entirely.                |
| `NEXT_PUBLIC_NOINDEX`               | Set to `1` on a staging environment to block all crawlers.                                          |

> **These are read at _build_ time**, because the pages are statically
> prerendered. Railway exposes service variables to the build, so setting them
> in the service is enough — but changing one requires a **redeploy**, not just
> a restart. If neither URL variable is present, the build prints a loud
> `[site-url] WARNING` and falls back to `localhost`, which would leave
> canonical tags and the sitemap pointing at the wrong place.

Indexing is **allowed by default** on any real deployed origin, including
Railway's own `*.up.railway.app` domain, so the site can never be accidentally
invisible to Google because a variable was missed. Blocking is opt-in via
`NEXT_PUBLIC_NOINDEX`.

### Setting up the contact form

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
4. Set `NEXT_PUBLIC_SITE_URL` to that domain (see **Environment variables**)
   and redeploy, so canonical URLs and the sitemap are correct.

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
