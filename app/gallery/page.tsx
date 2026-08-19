import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "../components/page-hero";

const DESCRIPTION =
  "Photographs from our Kerala tours — Munnar tea gardens, waterfalls, viewpoints, backwaters and the spice country.";

export const metadata: Metadata = {
  title: "Gallery",
  description: DESCRIPTION,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery — Kerala Tours by Travo",
    description: DESCRIPTION,
    url: "/gallery",
    type: "website",
  },
};

/* Drop a file at `public/images/gallery/<src>` and the placeholder for that
   tile is replaced automatically — set `ready: true` on the entry.
   Only hero-jeep.jpg ships with the site today, so the rest render as
   labelled panels rather than broken images. */
type Shot = {
  label: string;
  caption: string;
  src?: string;
  ready?: boolean;
  /** Tiles marked wide span two columns on desktop to break the grid rhythm. */
  wide?: boolean;
};

const SHOTS: Shot[] = [
  {
    label: "Munnar",
    caption: "The tea estates at first light, 7,130 ft.",
    src: "/images/hero-jeep.jpg",
    ready: true,
    wide: true,
  },
  { label: "Rose Garden", caption: "Day 1 — the first stop on the circuit." },
  { label: "Mattupetty Dam", caption: "Day 1 — still water under the ridge." },
  {
    label: "Sun Moon Valley",
    caption: "Day 1 — boating below the tea slopes.",
  },
  { label: "Echo Point", caption: "Day 1 — the valley answers back." },
  { label: "Kundala Lake", caption: "Day 1 — cherry blossom in season." },
  { label: "Top Station", caption: "Day 1 — the view into Tamil Nadu.", wide: true },
  { label: "Tea Garden View", caption: "Day 2 — the estates from the track." },
  { label: "Verivari Waterfall", caption: "Day 2 — cold water, warm day." },
  { label: "Cave Visit", caption: "Day 2 — the walk into the hillside." },
  {
    label: "Mountain View Point",
    caption: "Day 2 — the Western Ghats in layers.",
  },
  { label: "Blossom Park", caption: "Day 2 — the last light stop." },
  { label: "Attukad Waterfall", caption: "Day 3 — the morning descent.", wide: true },
  { label: "Spice Plantation", caption: "Day 3 — cardamom, pepper, vanilla." },
  { label: "Adventure Park", caption: "Day 3 — the zip line over the valley." },
  { label: "Elephant Ride", caption: "Day 3 — an afternoon at the camp." },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="From the road"
        title={
          <>
            What Kerala
            <br />
            <span className="italic text-laterite">looks like at 6 am.</span>
          </>
        }
        intro="Photographs from our tours — the tea estates and waterfalls of the hill country, the backwaters, and the spice plantations in between."
      />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SHOTS.map((shot) => (
              <li
                key={shot.label}
                className={shot.wide ? "sm:col-span-2" : undefined}
              >
                <figure className="group relative flex aspect-4/3 flex-col justify-end overflow-hidden rounded-lg bg-canopy">
                  {shot.ready && shot.src ? (
                    <>
                      <Image
                        src={shot.src}
                        alt={`${shot.label} — ${shot.caption}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="mono-photo object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-linear-to-t from-canopy-deep/85 via-canopy-deep/10 to-transparent"
                      />
                    </>
                  ) : (
                    /* Placeholder: the ridge motif on estate green, so an
                       empty tile still looks deliberate. */
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-canopy to-canopy-deep"
                    >
                      <svg
                        className="h-full w-full text-laterite/25"
                        viewBox="0 0 400 300"
                        preserveAspectRatio="xMidYMid slice"
                        fill="none"
                      >
                        <path
                          d="M0,210 C60,205 90,175 140,180 S230,140 280,150 C330,160 370,135 400,140"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M0,240 C70,235 110,215 170,220 S250,190 310,198 C350,203 380,190 400,193"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          opacity="0.6"
                        />
                      </svg>
                    </div>
                  )}

                  <figcaption className="relative p-5">
                    <p className="wordmark-serif text-lg tracking-tight text-mist">
                      {shot.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-mist/65">
                      {shot.caption}
                    </p>
                    {!shot.ready && (
                      <p className="mt-2 text-[0.65rem] uppercase tracking-[0.18em] text-laterite/80">
                        Photo coming soon
                      </p>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-8 border-t border-ink/15 pt-12 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <h2 className="wordmark-serif max-w-lg text-2xl leading-tight tracking-tight sm:text-3xl">
                Every photo here was taken on a trip we ran.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/60">
                Send us yours after your tour and we&apos;ll add them, with
                credit.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-canopy px-7 py-3.5 text-sm tracking-wide text-mist transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite"
            >
              Get in touch
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
