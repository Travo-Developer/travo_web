import Image from "next/image";

const PHONE_DISPLAY = "+91 94972 92483";
const PHONE_TEL = "+919497292483";
const EMAIL = "Travo.info365@gmail.com";
const WHATSAPP = `https://wa.me/919497292483?text=${encodeURIComponent(
  "Hi Travo, I'd like to book a jeep safari.",
)}`;

/* Elevation profile of the climb: plantation floor → shola belt → ridge → viewpoint.
   Reused at three scales as the page's connective tissue. */
const RIDGE_PATH =
  "M0,38 C120,36 190,30 280,31 S430,20 520,17 C620,14 660,6 760,7 S900,17 1000,21 C1110,25 1180,20 1280,26 S1390,34 1440,32";

const TRIPS = [
  {
    name: "Kolukkumalai Sunrise",
    time: "3:30 am – 9:00 am",
    climb: "Estate road, 7,130 ft",
    blurb:
      "Leave in the dark, climb the broken estate track and reach the world's highest tea plantation as the mist burns off the Western Ghats.",
  },
  {
    name: "Shola & Waterfall Trail",
    time: "9:00 am – 1:00 pm",
    climb: "Forest track, river crossing",
    blurb:
      "Open jeep through cardamom hills and shola forest, with stops to swim where the stream pools below the falls.",
  },
  {
    name: "Sunset Ridge Run",
    time: "3:00 pm – 7:30 pm",
    climb: "Ridge road, 6,200 ft",
    blurb:
      "Tea gardens in low light, then the ridge viewpoint over the valley. Chai and short eats at a plantation shed on the way down.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="relative flex min-h-168 flex-col overflow-hidden bg-canopy text-mist sm:min-h-184">
        <Image
          src="/images/hero-jeep.jpg"
          alt="A Mahindra Thar on a red-earth track above the Munnar tea estates at sunrise"
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
          className="pointer-events-none absolute inset-0 bg-canopy/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(96deg, rgba(11,26,18,0.88) 0%, rgba(11,26,18,0.72) 28%, rgba(11,26,18,0.34) 55%, rgba(11,26,18,0.04) 78%, rgba(11,26,18,0.16) 100%), linear-gradient(to bottom, rgba(11,26,18,0.50) 0%, rgba(11,26,18,0.06) 34%, rgba(11,26,18,0.00) 62%)",
          }}
        />

        <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
          <Image
            src="/images/logo-mark.png"
            alt="Travo"
            width={2589}
            height={1017}
            priority
            className="h-8 w-auto drop-shadow-[0_1px_12px_rgba(11,26,18,0.55)] sm:h-10"
          />
          <a
            href={`tel:${PHONE_TEL}`}
            className="rounded-full border border-mist/30 px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors hover:border-laterite hover:text-laterite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite sm:px-5 sm:text-[0.7rem]"
          >
            {PHONE_DISPLAY}
          </a>
        </nav>

        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-10 pt-10 sm:px-10 sm:pb-14 sm:pt-16">
          <p className="rise text-xs uppercase tracking-[0.3em] text-laterite">
            Munnar · Vagamon · Idukki
          </p>

          <h1
            className="wordmark-serif rise mt-6 max-w-4xl text-[2.75rem] leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]"
            style={{ animationDelay: "0.1s" }}
          >
            The road stops.
            <br />
            <span className="text-laterite italic">We keep going.</span>
          </h1>

          <p
            className="rise mt-8 max-w-xl text-base leading-relaxed text-mist/75 sm:text-lg"
            style={{ animationDelay: "0.2s" }}
          >
            Open-top 4x4 safaris into the tea country above Munnar — sunrise at
            Kolukkumalai, shola forest tracks, and ridge roads no bus will ever
            take. Driven by people who grew up on these slopes.
          </p>

          <div
            className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center rounded-full bg-laterite px-7 py-3.5 text-sm font-medium tracking-wide text-canopy-deep transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mist"
            >
              Call to book
            </a>
            <a
              href="#trips"
              className="inline-flex items-center justify-center rounded-full border border-mist/25 px-7 py-3.5 text-sm tracking-wide transition-colors hover:border-mist/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite"
            >
              See the routes
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
        <section id="trips" className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <div className="flex flex-col gap-4 border-b border-ink/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="wordmark-serif text-3xl tracking-tight sm:text-5xl">
              Three ways up the hill
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-ink/60">
              Every trip is a private jeep — your group only, up to six people.
            </p>
          </div>

          <ul className="mt-4 divide-y divide-ink/10">
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
        </section>

        {/* ── What's included ──────────────────────────────────── */}
        <section className="bg-canopy text-mist">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 sm:grid-cols-3 sm:px-10 sm:py-24">
            {[
              {
                head: "Local drivers",
                copy: "Every driver is from Idukki and holds a hill-route licence. They know which tracks wash out after rain.",
              },
              {
                head: "Serviced jeeps",
                copy: "Mahindra 4x4s checked before each run, with roll bars, seatbelts and a first-aid kit on board.",
              },
              {
                head: "Pickup included",
                copy: "We collect you from your stay in Munnar town or the estates around it at no extra cost.",
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

      {/* ── Contact ──────────────────────────────────────────── */}
      <footer id="contact" className="bg-paper">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
          <div className="grid gap-12 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-laterite">
                Book a jeep
              </p>
              <h2 className="wordmark-serif mt-5 max-w-lg text-3xl leading-tight tracking-tight sm:text-5xl">
                Call or message. We answer in Malayalam, Tamil, Hindi and
                English.
              </h2>

              <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-14">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-ink/45">
                    Phone
                  </p>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="wordmark-serif mt-1 block text-2xl tracking-tight underline decoration-laterite decoration-1 underline-offset-[6px] transition-colors hover:text-laterite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite sm:text-3xl"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-ink/45">
                    Email
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-2 block text-base break-all underline decoration-ink/25 decoration-1 underline-offset-[6px] transition-colors hover:text-laterite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite sm:text-lg"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center justify-center rounded-full bg-canopy px-7 py-3.5 text-sm tracking-wide text-mist transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite"
              >
                Message on WhatsApp
              </a>
            </div>

            <Image
              src="/images/logo-mark.png"
              alt="Travo"
              width={2589}
              height={1017}
              className="h-14 w-auto self-start invert sm:h-20 sm:self-end"
            />
          </div>

          <div className="mt-16 flex flex-col gap-2 border-t border-ink/15 pt-6 text-xs text-ink/45 sm:flex-row sm:items-center sm:justify-between">
            <p>Travo — jeep safaris in Kerala. Munnar, Idukki district.</p>
            <p>Trips run daily, weather permitting.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
