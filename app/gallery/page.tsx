import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "../components/page-hero";

const DESCRIPTION =
  "Photographs from across Kerala — the Munnar tea gardens, Alleppey backwaters, Periyar wildlife, Fort Kochi and the coast.";

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

/* Photographs are Wikimedia Commons files, desaturated at build time to sit
   inside the black-and-white design. `credit` is the photographer — most are
   CC BY-SA, which requires attribution, so the line under the grid is a
   licence obligation and not decoration. Full record, including licence and
   source URL per file, is in public/images/gallery/CREDITS.json.

   Replace any of these with a real Travo photo by overwriting the file in
   public/images/gallery/ and dropping the `credit` field. */
type Shot = {
  src: string;
  label: string;
  caption: string;
  credit?: string;
  /** Tiles marked wide span two columns on desktop to break the grid rhythm. */
  wide?: boolean;
};

const SHOTS: Shot[] = [
  {
    src: "/images/gallery/munnar-tea.jpg",
    label: "Munnar",
    caption: "Estate roads through the tea gardens of the high range.",
    credit: "Shino Jacob Koottanad",
    wide: true,
  },
  {
    src: "/images/gallery/mattupetty.jpg",
    label: "Mattupetty Dam",
    caption: "Day 1 — still water under the ridge.",
    credit: "Shanmugamp7",
  },
  {
    src: "/images/gallery/echo-point.jpg",
    label: "Echo Point",
    caption: "Day 1 — the valley answers back.",
    credit: "BinoBose",
  },
  {
    src: "/images/gallery/kundala.jpg",
    label: "Kundala Lake",
    caption: "Day 1 — cherry blossom in season.",
    credit: "Darshanhr.007",
  },
  {
    src: "/images/gallery/top-station.jpg",
    label: "Top Station",
    caption: "Day 1 — the highway to the Tamil Nadu border.",
    credit: "Rainer Halama",
  },
  {
    src: "/images/gallery/attukad.jpg",
    label: "Athirappilly Falls",
    caption: "Kerala's widest waterfall, in full monsoon flow.",
    credit: "Vis M",
  },
  {
    src: "/images/gallery/spice.jpg",
    label: "The High Range",
    caption: "Sunrise over the tea plantations and the ranges beyond.",
    credit: "LiteraryDP",
    wide: true,
  },
  {
    src: "/images/gallery/alleppey.jpg",
    label: "Alleppey",
    caption: "A night on the backwaters, moored among the palms.",
    credit: "Ingo Mehling",
  },
  {
    src: "/images/gallery/kumarakom.jpg",
    label: "Kumarakom",
    caption: "The Vembanad wetlands at first light.",
    credit: "Rainer Halama",
  },
  {
    src: "/images/gallery/thekkady.jpg",
    label: "Periyar Lake",
    caption: "Boat safari through the drowned forest at Thekkady.",
    credit: "Wouter Hagens",
  },
  {
    src: "/images/gallery/elephant.jpg",
    label: "Wild Elephants",
    caption: "A herd in the forest reserves of the Western Ghats.",
    credit: "N. A. Nazeer",
  },
  {
    src: "/images/gallery/kochi.jpg",
    label: "Fort Kochi",
    caption: "The Chinese fishing nets before the monsoon.",
    credit: "Vis M",
    wide: true,
  },
  {
    src: "/images/gallery/kathakali.jpg",
    label: "Kathakali",
    caption: "An evening of Kerala's classical theatre.",
    credit: "WonderFrames",
  },
  {
    src: "/images/gallery/varkala.jpg",
    label: "Varkala",
    caption: "The cliff promenade above the Arabian Sea.",
    credit: "Sunaina Pai & Susam Pal",
  },
  {
    src: "/images/gallery/kovalam.jpg",
    label: "Kovalam",
    caption: "The lighthouse beach at the end of the road south.",
    credit: "Amitbalani",
  },
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
        intro="The hill country, the backwaters, the spice plantations and the coast — the places our itineraries actually go."
      />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SHOTS.map((shot, i) => (
              <li
                key={shot.src}
                className={shot.wide ? "sm:col-span-2" : undefined}
              >
                <figure className="group relative flex aspect-4/3 flex-col justify-end overflow-hidden rounded-lg bg-canopy">
                  <Image
                    src={shot.src}
                    alt={`${shot.label}, Kerala — ${shot.caption}`}
                    fill
                    // The first two tiles are usually above the fold.
                    priority={i < 2}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Caption scrim. Kept tight to the bottom third — the
                      photos are in colour now, and a full-height wash greys
                      out the tea greens and backwater blues that are the
                      reason the picture is here. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-canopy-deep/85 via-canopy-deep/35 to-transparent"
                  />

                  <figcaption className="relative p-5">
                    <p className="wordmark-serif text-lg tracking-tight text-mist">
                      {shot.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-mist/70">
                      {shot.caption}
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          {/* Licence attribution. CC BY-SA requires crediting the photographer
              wherever the image is shown. */}
          <p className="mt-8 text-xs leading-relaxed text-ink/40">
            Photographs via Wikimedia Commons, under CC BY-SA, CC BY, CC0 and
            public-domain licences. Thanks to{" "}
            {SHOTS.filter((s) => s.credit)
              .map((s) => s.credit)
              .filter((c, i, a) => a.indexOf(c) === i)
              .join(", ")}
            .
          </p>

          <div className="mt-16 grid gap-8 border-t border-ink/15 pt-12 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <h2 className="wordmark-serif max-w-lg text-2xl leading-tight tracking-tight sm:text-3xl">
                Been on a trip with us?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/60">
                Send us your photos and we&apos;ll add them here, with credit.
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
