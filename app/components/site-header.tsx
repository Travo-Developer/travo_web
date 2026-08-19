"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

/* The home hero puts the nav over a dark photo; every other page puts it on
   paper. Rather than two components, the palette swaps on `variant` and the
   markup stays identical. */
type Variant = "over-hero" | "solid";

export function SiteHeader({ variant = "solid" }: { variant?: Variant }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // A fixed-position drawer over a scrollable body lets the page scroll
  // behind it on iOS; lock the body while it's open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const overHero = variant === "over-hero";

  const linkBase =
    "text-sm tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite";
  const linkIdle = overHero
    ? "text-mist/75 hover:text-mist"
    : "text-ink/60 hover:text-ink";
  // Bright gold reads well on the hero photo but fails contrast on paper.
  const linkActive = overHero ? "text-laterite" : "text-laterite-deep";

  return (
    <nav
      className={`relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10 ${
        overHero ? "text-mist" : "text-ink"
      }`}
    >
      <Link
        href="/"
        aria-label="Travo — home"
        className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
      >
        <Image
          src="/images/logo-mark.png"
          alt="Travo"
          width={2589}
          height={1017}
          priority
          className={
            overHero
              ? "h-8 w-auto drop-shadow-[0_1px_12px_rgba(10,11,12,0.6)] sm:h-10"
              : "h-8 w-auto invert sm:h-10"
          }
        />
      </Link>

      {/* Desktop */}
      <div className="hidden items-center gap-8 md:flex">
        <ul className="flex items-center gap-7">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`${linkBase} ${active ? linkActive : linkIdle}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <a
          href={`tel:${PHONE_TEL}`}
          className={`rounded-full border px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite sm:px-5 ${
            overHero
              ? "border-mist/30 hover:border-laterite hover:text-laterite"
              : "border-ink/20 hover:border-laterite-deep hover:text-laterite-deep"
          }`}
        >
          {PHONE_DISPLAY}
        </a>
      </div>

      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className={`-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite md:hidden ${
          overHero ? "text-mist hover:bg-mist/10" : "text-ink hover:bg-ink/5"
        }`}
      >
        <svg
          width="20"
          height="14"
          viewBox="0 0 20 14"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M0.8 1h18.4M0.8 7h18.4M0.8 13h18.4" />
        </svg>
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full bg-canopy-deep/70 backdrop-blur-sm"
          />
          <div className="rise absolute inset-x-0 top-0 bg-canopy px-6 pb-10 pt-6 text-mist shadow-2xl">
            <div className="flex items-center justify-between">
              <Image
                src="/images/logo-mark.png"
                alt="Travo"
                width={2589}
                height={1017}
                className="h-8 w-auto"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors hover:bg-mist/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <path d="M1 1l14 14M15 1L1 15" />
                </svg>
              </button>
            </div>

            <ul className="mt-8 flex flex-col divide-y divide-mist/10 border-y border-mist/10">
              {NAV.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`wordmark-serif block py-4 text-2xl tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite ${
                        active ? "text-laterite" : "text-mist hover:text-laterite"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-mist px-7 py-3.5 text-sm font-medium tracking-wide text-canopy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mist"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
