import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components/page-hero";
import {
  ITINERARY,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_URL,
  TRIPS,
} from "@/lib/site";

const DESCRIPTION =
  "Kerala tour packages — the three-day Munnar circuit stop by stop, plus backwater, wildlife and grand-tour itineraries across the state. Call for a quote.";

export const metadata: Metadata = {
  title: "Kerala Tour Packages",
  description: DESCRIPTION,
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Kerala Tour Packages — Munnar, Alleppey & Thekkady",
    description: DESCRIPTION,
    url: "/packages",
    type: "website",
  },
};

/* Each package as a TouristTrip, wrapped in an ItemList so the set can
   surface as a list rather than five unrelated nodes. No `offers` block:
   we deliberately do not publish prices, and claiming one we don't show
   would be a structured-data violation. */
const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Kerala tour packages",
  itemListElement: TRIPS.map((trip, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "TouristTrip",
      name: trip.name,
      description: trip.blurb,
      touristType: "Leisure travellers",
      provider: { "@id": `${SITE_URL}/#organization` },
      itinerary: {
        "@type": "ItemList",
        name: trip.climb,
      },
    },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Packages",
      item: `${SITE_URL}/packages`,
    },
  ],
};

export default function PackagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([itemListLd, breadcrumbLd]).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <PageHero
        eyebrow="Tours & pricing"
        title={
          <>
            Kerala, planned
            <br />
            <span className="italic text-laterite">the way you&apos;d plan it.</span>
          </>
        }
        intro="Our signature Munnar circuit listed stop by stop, plus backwater, wildlife and full-state itineraries. Every one is private and adjustable to your dates — call us for a price."
      />

      <main className="flex-1">
        {/* ── 3-day circuit ────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <div className="flex flex-col gap-4 border-b border-ink/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="wordmark-serif text-3xl tracking-tight sm:text-5xl">
              The Munnar circuit
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-ink/60">
              Book all three days or any single day. Transport, driver and
              pickup from your stay in Munnar are included.
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-16 sm:gap-20">
            {ITINERARY.map((day) => (
              <article key={day.day} className="grid gap-8 sm:grid-cols-[1fr_1.5fr] sm:gap-14">
                <div className="sm:sticky sm:top-10 sm:self-start">
                  <p className="text-xs uppercase tracking-[0.28em] text-laterite-deep">
                    {day.day}
                  </p>
                  <h3 className="wordmark-serif mt-4 text-2xl leading-tight tracking-tight sm:text-[2rem]">
                    {day.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink/60">
                    {day.summary}
                  </p>
                  <p className="mt-5 text-xs uppercase tracking-[0.16em] text-ink/45">
                    {day.stops.length} stops
                  </p>
                </div>

                <ul className="divide-y divide-ink/10 border-y border-ink/10">
                  {day.stops.map((stop) => (
                    <li
                      key={stop.name}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                    >
                      <span className="text-base text-ink/85">{stop.name}</span>
                      {stop.ticketed ? (
                        <span className="text-xs uppercase tracking-[0.16em] text-ink/40">
                          Optional · ticketed
                        </span>
                      ) : (
                        <span className="text-xs uppercase tracking-[0.16em] text-ink/25">
                          Included
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-14 max-w-2xl border-l-2 border-ink/20 pl-5">
            <p className="text-sm leading-relaxed text-ink/60">
              Stops marked <span className="text-ink/80">optional · ticketed</span>{" "}
              charge their own entry or activity fee at the gate — boating,
              the adventure park, the elephant ride and similar. They are
              entirely your choice: take them if you want them, skip them and
              the rest of the day runs the same.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/60">
              We don&apos;t publish those amounts because the operators change
              them without notice, and we would rather quote you correctly than
              cheaply.{" "}
              <a
                href={`tel:${PHONE_TEL}`}
                className="text-ink underline decoration-ink/30 decoration-1 underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
              >
                Call us on {PHONE_DISPLAY}
              </a>{" "}
              and we&apos;ll give you the current price for the whole plan,
              including whichever extras you want.
            </p>
          </div>
        </section>

        {/* ── Half-day trips ───────────────────────────────────── */}
        <section className="bg-canopy text-mist">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
            <div className="flex flex-col gap-4 border-b border-mist/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="wordmark-serif text-3xl tracking-tight sm:text-4xl">
                Other packages
              </h2>
              <p className="max-w-xs text-sm leading-relaxed text-mist/60">
                Beyond Munnar — the backwaters, the spice country, and the whole
                state end to end.
              </p>
            </div>

            <ul className="mt-4 divide-y divide-mist/10">
              {TRIPS.map((trip) => (
                <li
                  key={trip.name}
                  className="grid gap-3 py-8 sm:grid-cols-[1fr_1.4fr] sm:gap-10"
                >
                  <div>
                    <h3 className="wordmark-serif text-2xl tracking-tight sm:text-[1.75rem]">
                      {trip.name}
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-laterite">
                      {trip.time}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-mist/45">
                      {trip.climb}
                    </p>
                  </div>
                  <p className="text-base leading-relaxed text-mist/70">
                    {trip.blurb}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-laterite-deep">
                Ready when you are
              </p>
              <h2 className="wordmark-serif mt-5 max-w-lg text-3xl leading-tight tracking-tight sm:text-4xl">
                Tell us your dates and group size, and we&apos;ll send back a
                full quote.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center justify-center rounded-full bg-canopy px-7 py-3.5 text-sm font-medium tracking-wide text-mist transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canopy"
              >
                Call for a price
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-sm tracking-wide transition-colors hover:border-ink/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite"
              >
                Send an enquiry
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
