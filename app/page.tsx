import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "./components/site-header";
import { PHONE_TEL, RIDGE_PATH, TRIPS } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="relative flex min-h-168 flex-col overflow-hidden bg-canopy text-mist sm:min-h-184">
        <Image
          src="/images/hero-jeep.jpg"
          alt="Mist rising over the terraced tea estates of Munnar in the Western Ghats at sunrise"
          fill
          priority
          sizes="100vw"
          quality={85}
          /* Portrait viewports crop hard to the centre, which cuts the jeep
             out of frame — bias the crop right so it survives on phones. */
          className="object-cover object-[70%_38%] sm:object-center"
        />

        {/* Estate-green wash. The sunrise in this photo falls on the left,
            exactly where the headline sits, so the scrim is heaviest there
            and lifts over the jeep on the right. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(96deg, rgba(10,11,12,0.86) 0%, rgba(10,11,12,0.70) 28%, rgba(10,11,12,0.30) 55%, rgba(10,11,12,0.02) 78%, rgba(10,11,12,0.12) 100%), linear-gradient(to bottom, rgba(10,11,12,0.50) 0%, rgba(10,11,12,0.06) 34%, rgba(10,11,12,0.00) 62%)",
          }}
        />

        <SiteHeader variant="over-hero" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-10 pt-10 sm:px-10 sm:pb-14 sm:pt-16">
          <p className="rise text-xs uppercase tracking-[0.3em] text-laterite">
            Munnar · Alleppey · Thekkady · Kochi
          </p>

          <h1
            className="wordmark-serif rise mt-6 max-w-4xl text-[2.75rem] leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]"
            style={{ animationDelay: "0.1s" }}
          >
            Your Kerala trip,
            <br />
            <span className="text-laterite italic">planned by hand.</span>
          </h1>

          <p
            className="rise mt-8 max-w-xl text-base leading-relaxed text-mist/75 sm:text-lg"
            style={{ animationDelay: "0.2s" }}
          >
            Private tours through the hill stations of Munnar, the backwaters
            of Alleppey, the spice country of Thekkady and the beaches of the
            Malabar coast — built around your dates by people who live here.
          </p>

          <div
            className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-laterite px-7 py-3.5 text-sm font-medium tracking-wide text-canopy-deep transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mist"
            >
              Plan your trip
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center rounded-full border border-mist/25 px-7 py-3.5 text-sm tracking-wide transition-colors hover:border-mist/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite"
            >
              Call to book
            </a>
          </div>
        </div>

        {/* Signature: the climb drawn as it loads */}
        <svg
          className="relative block h-24 w-full text-laterite sm:h-32"
          viewBox="0 0 1440 44"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="trail-draw"
            d={RIDGE_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`${RIDGE_PATH} L1440,44 L0,44 Z`}
            fill="var(--color-paper)"
            stroke="none"
          />
        </svg>
      </header>

      <main className="flex-1">
        {/* ── Trips ────────────────────────────────────────────── */}
        <section
          id="trips"
          className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-28"
        >
          <div className="flex flex-col gap-4 border-b border-ink/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="wordmark-serif text-3xl tracking-tight sm:text-5xl">
              Where we&apos;ll take you
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-ink/60">
              Every tour is private — your group only. Itineraries are adjusted
              to your dates and pace.
            </p>
          </div>

          <ul className="mt-4 divide-y divide-ink/10">
            {TRIPS.map((trip) => (
              <li
                key={trip.name}
                className="grid gap-5 py-8 sm:grid-cols-[minmax(0,14rem)_1fr_1.2fr] sm:items-start sm:gap-10"
              >
                <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-canopy sm:aspect-3/2">
                  <Image
                    src={trip.image}
                    alt={`${trip.name} — ${trip.climb}`}
                    fill
                    sizes="(min-width: 640px) 14rem, 100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="wordmark-serif text-2xl tracking-tight sm:text-[1.75rem]">
                    {trip.name}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-laterite-deep">
                    {trip.time}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink/45">
                    {trip.climb}
                  </p>
                </div>
                <p className="text-base leading-relaxed text-ink/70">
                  {trip.blurb}
                </p>
              </li>
            ))}
          </ul>

          <Link
            href="/packages"
            className="mt-10 inline-flex items-center gap-2 text-sm tracking-wide text-laterite-deep underline decoration-laterite-deep/40 decoration-1 underline-offset-[6px] transition-colors hover:decoration-laterite-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
          >
            See the full 3-day Munnar itinerary
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        {/* ── What's included ──────────────────────────────────── */}
        <section className="bg-canopy text-mist">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 sm:grid-cols-3 sm:px-10 sm:py-24">
            {[
              {
                head: "Local guides",
                copy: "Our team is from Kerala and guides in Malayalam, Tamil and English. You get the places worth stopping for, not just the ones on the brochure.",
              },
              {
                head: "Stay & travel sorted",
                copy: "Homestays, resorts and houseboats we have stayed in ourselves, with transport and a driver for the whole trip.",
              },
              {
                head: "Built around you",
                copy: "Tell us your dates, budget and pace. Every itinerary is adjusted before you book — nothing is fixed-departure.",
              },
            ].map((item) => (
              <div key={item.head}>
                <h3 className="wordmark-serif text-xl tracking-tight text-laterite">
                  {item.head}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist/70">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
