# Travo — Kerala tours

Marketing site for Travo, a Kerala tour operator based in Munnar. Built with
Next.js 16 (App Router) and Tailwind CSS 4.

## Pages

| Route       | What's on it                                                       |
| ----------- | ------------------------------------------------------------------ |
| `/`         | Hero, headline tours, why-us                                        |
| `/about`    | Company story, how we work, regions covered                         |
| `/packages` | The 3-day Munnar circuit stop by stop, plus the other packages      |
| `/gallery`  | Photo grid (placeholders until images are supplied — see below)     |
| `/contact`  | Enquiry form (name, email, phone, message) + direct contact details |

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev
```

Open <http://localhost:3000>.

## Contact form / Resend setup

The form at `/contact` posts to a Server Action ([`app/contact/actions.ts`](app/contact/actions.ts))
which validates with Zod and sends through [Resend](https://resend.com).

1. Create an account at [resend.com](https://resend.com) and generate an API key
   at <https://resend.com/api-keys>.
2. Put it in `.env.local` as `RESEND_API_KEY`.
3. **Verify a sending domain** at <https://resend.com/domains>, then set
   `CONTACT_FROM_EMAIL` to an address on it, e.g. `Travo <hello@travo.in>`.

   Until a domain is verified you can leave the default
   `Travo <onboarding@resend.dev>`, but Resend will **only deliver to the email
   address that owns the Resend account** — enquiries will not reach
   `travo.info365@gmail.com`. Verifying a domain is required before going live.

4. `CONTACT_TO_EMAIL` is where enquiries land. Defaults to
   `travo.info365@gmail.com`.

Replies in the inbox go to the visitor: the outgoing mail sets `replyTo` to the
address they entered.

Environment variables are read server-side only and are never exposed to the
browser. Remember to add all three to your host (e.g. Vercel → Project →
Settings → Environment Variables) as well as `.env.local`.

### Anti-spam

The form includes a hidden honeypot field (`company`). Submissions that fill it
are silently accepted and discarded. If spam becomes a problem, add rate
limiting or a CAPTCHA in the Server Action.

## SEO

Set `NEXT_PUBLIC_SITE_URL` to the live domain **before deploying**. Canonical
tags, Open Graph URLs, `sitemap.xml`, `robots.txt` and the structured data all
derive from it; if it's wrong, Google indexes the wrong URLs.

What's in place:

- **Per-page titles, descriptions and canonicals** — each page sets its own in
  its `metadata` export.
- **Open Graph + Twitter cards** — share image at
  `public/images/og-image.jpg` (1200×630).
- **`sitemap.xml`** — generated from `NAV` in [`lib/site.ts`](lib/site.ts), so a
  page added to the nav is listed automatically.
- **`robots.txt`** — allows everything, points at the sitemap.
- **Structured data (JSON-LD)** — a `TravelAgency` / `LocalBusiness` node in the
  root layout with address, geo, languages and hours; `ItemList` of
  `TouristTrip`s plus breadcrumbs on `/packages`; `ContactPage` on `/contact`.

Verify structured data after deploying with the
[Rich Results Test](https://search.google.com/test/rich-results), then submit
the sitemap in [Google Search Console](https://search.google.com/search-console).

Business details used by the structured data (address, coordinates, regions
served) live in the `BUSINESS` object in [`lib/site.ts`](lib/site.ts) — correct
the street address and postcode there if they're not exact.

### Not done yet

- No Google Search Console verification token. Add one to `metadata.verification`
  in [`app/layout.tsx`](app/layout.tsx) when you have it.
- No reviews/ratings markup. `AggregateRating` needs genuine reviews — adding it
  without them violates Google's guidelines and can earn a manual penalty.

## Editing content

Almost all copy that repeats across pages lives in [`lib/site.ts`](lib/site.ts):

- `PHONE_DISPLAY` / `PHONE_TEL` / `EMAIL` — contact details, used everywhere
- `NAV` — the nav list; adding an entry here updates the header *and* footer
- `TRIPS` — the tour packages shown on `/` and `/packages`
- `ITINERARY` — the 3-day Munnar circuit

### Prices

Prices are deliberately **not** published. Stops that charge their own entry or
activity fee are flagged with `ticketed: true` in `ITINERARY` and render as
"Optional · ticketed"; visitors are directed to call for a current quote. To
show an amount instead, add the figure to the stop and render it in
[`app/packages/page.tsx`](app/packages/page.tsx).

## Gallery images

Tiles in [`app/gallery/page.tsx`](app/gallery/page.tsx) render a placeholder
until a photo is supplied. To add one:

1. Drop the file in `public/images/gallery/`.
2. On that tile's entry in the `SHOTS` array, set `src` to the path and
   `ready: true`.

Photos are desaturated in CSS (`.mono-photo`) to suit the black-and-white
design — no need to convert them first.

## Design

Black and white. The palette is six CSS custom properties in the `@theme` block
of [`app/globals.css`](app/globals.css) — `canopy` (dark ground), `laterite`
(grey accent), `mist`/`paper` (light grounds) and `ink` (text). Changing those
six values re-skins the entire site; no component hard-codes a colour.

Form errors deliberately keep a true red (`.form-error`) rather than the grey
accent, so they still read as errors.

## Icons

`app/icon.png` and `app/apple-icon.png` are generated from
`public/images/travologo.png`, cropped to the wordmark so it stays legible at
tab size. If the logo changes, regenerate them rather than dropping the raw
file in — the raw square has heavy white padding that renders blurred at 32px.

## Commands

```bash
pnpm dev     # dev server
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # eslint
```
