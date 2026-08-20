import Image from "next/image";
import Link from "next/link";
import { EMAIL, NAV, PHONE_DISPLAY, PHONE_TEL, WHATSAPP } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
        <div className="grid gap-12 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-laterite-deep">
              Plan your trip
            </p>
            <h2 className="wordmark-serif mt-5 max-w-lg text-3xl leading-tight tracking-tight sm:text-5xl">
              Call or message. We answer in Malayalam, Tamil and English.
            </h2>

            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-14">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-ink/45">
                  Phone
                </p>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="wordmark-serif mt-1 block text-2xl tracking-tight underline decoration-laterite-deep decoration-1 underline-offset-[6px] transition-colors hover:text-laterite-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite sm:text-3xl"
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
                  className="mt-2 block break-all text-base underline decoration-ink/25 decoration-1 underline-offset-[6px] transition-colors hover:text-laterite-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite sm:text-lg"
                >
                  {EMAIL}
                </a>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-canopy px-7 py-3.5 text-sm tracking-wide text-mist transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite"
              >
                Message on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-sm tracking-wide transition-colors hover:border-laterite-deep hover:text-laterite-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite"
              >
                Send an enquiry
              </Link>
            </div>
          </div>

          <Image
            src="/images/logo-mark.png"
            alt="Travo"
            width={2589}
            height={1017}
            className="h-14 w-auto self-start invert sm:h-20 sm:self-end"
          />
        </div>

        <nav aria-label="Footer" className="mt-16 border-t border-ink/15 pt-6">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink/60 transition-colors hover:text-laterite-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col gap-2 text-xs text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <p>Travo — Kerala tours &amp; holiday packages. Munnar, Kerala.</p>
          <p>Tours run year-round. Custom itineraries on request.</p>
        </div>
      </div>
    </footer>
  );
}
