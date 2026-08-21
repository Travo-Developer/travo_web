import type { Metadata } from "next";
import { PageHero } from "../components/page-hero";
import { ContactForm } from "./contact-form";
import {
  EMAIL,
  PHONE_ALT_DISPLAY,
  PHONE_ALT_TEL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_URL,
  WHATSAPP,
} from "@/lib/site";

const DESCRIPTION =
  "Enquire about a Kerala tour — send us your dates and group size, or call and WhatsApp us directly. We answer in Malayalam, Tamil and English.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Travo — Plan Your Kerala Trip",
    description: DESCRIPTION,
    url: "/contact",
    type: "website",
  },
};

const contactLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Travo",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@id": `${SITE_URL}/#organization`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE_TEL,
      email: EMAIL,
      contactType: "reservations",
      availableLanguage: ["Malayalam", "Tamil", "English"],
      areaServed: "IN",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Tell us when.
            <br />
            <span className="italic text-laterite">We&apos;ll do the rest.</span>
          </>
        }
        intro="Send your dates and group size and we'll come back with an itinerary and a quote. We answer in Malayalam, Tamil and English."
      />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div>
              <h2 className="wordmark-serif text-2xl tracking-tight sm:text-3xl">
                Send an enquiry
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/60">
                All four fields are required. Your message goes straight to our
                inbox.
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>

            <aside className="flex flex-col gap-10 lg:border-l lg:border-ink/10 lg:pl-16">
              <div>
                <h2 className="wordmark-serif text-2xl tracking-tight sm:text-3xl">
                  Or reach us directly
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  Calling is the fastest way to book for tomorrow.
                </p>
              </div>

              <div className="flex flex-col gap-7 border-y border-ink/10 py-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-ink/45">
                    Phone
                  </p>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="wordmark-serif mt-1 block text-2xl tracking-tight underline decoration-laterite-deep decoration-1 underline-offset-[6px] transition-colors hover:text-laterite-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <a
                    href={`tel:${PHONE_ALT_TEL}`}
                    className="wordmark-serif mt-2 block text-xl tracking-tight underline decoration-laterite-deep/60 decoration-1 underline-offset-[6px] transition-colors hover:text-laterite-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
                  >
                    {PHONE_ALT_DISPLAY}
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-ink/45">
                    Email
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-2 block break-all text-base underline decoration-ink/25 decoration-1 underline-offset-[6px] transition-colors hover:text-laterite-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
                  >
                    {EMAIL}
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-ink/45">
                    Where we are
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-ink/70">
                    Based in Munnar, Idukki district, Kerala.
                    <br />
                    We run tours across the state, with airport pickup from
                    Kochi and Trivandrum.
                  </p>
                </div>
              </div>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-sm tracking-wide transition-colors hover:border-laterite-deep hover:text-laterite-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite"
              >
                Message on WhatsApp
              </a>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
