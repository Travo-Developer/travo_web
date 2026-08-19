import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components/page-hero";

const DESCRIPTION =
  "Travo is a Kerala tour operator run by people from the state. Tailor-made itineraries, vetted stays and local guides across Munnar, Alleppey, Thekkady and the coast.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Travo — Kerala Tour Operator in Munnar",
    description: DESCRIPTION,
    url: "/about",
    type: "website",
  },
};

const VALUES = [
  {
    head: "We are from here",
    copy: "Our team grew up in Kerala and guides in Malayalam, Tamil, Hindi and English. That is the difference between a guide reciting a script and one who knows which festival is on this week and where to eat after it.",
  },
  {
    head: "Private, never fixed-departure",
    copy: "Your group only. No coach parties, no strangers on the itinerary, no schedule set six months ago. If you want a second morning in the tea gardens, you take it.",
  },
  {
    head: "Stays we have slept in",
    copy: "Homestays, resorts and houseboats we have checked ourselves. We will tell you honestly when the cheaper option is the better one.",
  },
  {
    head: "Honest pricing",
    copy: "The tour price is the tour price. Entry tickets and activity fees charged at each site are listed up front, so nothing lands as a surprise at the gate.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title={
          <>
            Born here.
            <br />
            <span className="italic text-laterite">Still showing people around.</span>
          </>
        }
        intro="Travo is a Kerala tour operator based in Munnar — planning private, tailor-made trips across the hill stations, backwaters, spice country and coast."
      />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <div className="grid gap-12 sm:grid-cols-[1fr_1.3fr] sm:gap-16">
            <h2 className="wordmark-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              The story
            </h2>
            <div className="flex flex-col gap-6 text-base leading-relaxed text-ink/70">
              <p>
                Travo started in Munnar with a single itinerary — the three-day
                circuit of the hill country that we knew better than anyone,
                because we had grown up driving it. Visitors kept asking for a
                trip that felt like being shown around by a friend rather than
                processed by an agency.
              </p>
              <p>
                Word travelled. People who came for Munnar started asking what
                else was worth seeing, so we built the routes we would take our
                own families on: the backwaters at Alleppey, the spice
                plantations and wildlife at Thekkady, colonial Kochi, and the
                quieter beaches down the coast.
              </p>
              <p>
                Today we plan trips across the whole state, from a two-day
                houseboat break to a week that takes in the hills, the water
                and the sea. Every itinerary is still put together by hand, for
                your dates and your pace, by people who live here.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-canopy text-mist">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
            <h2 className="wordmark-serif text-3xl tracking-tight sm:text-4xl">
              How we work
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-12">
              {VALUES.map((value) => (
                <div key={value.head}>
                  <h3 className="wordmark-serif text-xl tracking-tight text-laterite">
                    {value.head}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist/70">
                    {value.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <div className="grid gap-8 border-t border-ink/15 pt-12 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <h2 className="wordmark-serif max-w-lg text-3xl leading-tight tracking-tight sm:text-4xl">
                Where we go
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70">
                Munnar and the Idukki hill country, the Alleppey and Kumarakom
                backwaters, Thekkady and the Periyar reserve, Fort Kochi, and
                the coast down to Kovalam and Varkala. Airport pickup from Kochi
                or Trivandrum and transport for the whole trip are included in
                every package.
              </p>
            </div>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center rounded-full bg-canopy px-7 py-3.5 text-sm tracking-wide text-mist transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite"
            >
              See the packages
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
