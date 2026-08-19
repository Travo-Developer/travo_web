import { RIDGE_PATH } from "@/lib/site";
import { SiteHeader } from "./site-header";

/* Compact version of the home hero for inner pages: same estate-green block
   and same ridge line drawing itself in, without the photograph. Keeps the
   pages recognisably one site. */
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <header className="relative flex flex-col overflow-hidden bg-canopy text-mist">
      <SiteHeader variant="over-hero" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:px-10 sm:pb-20 sm:pt-14">
        <p className="rise text-xs uppercase tracking-[0.3em] text-laterite">
          {eyebrow}
        </p>
        <h1
          className="wordmark-serif rise mt-6 max-w-3xl text-[2.5rem] leading-[1.0] tracking-tight sm:text-6xl"
          style={{ animationDelay: "0.1s" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="rise mt-7 max-w-xl text-base leading-relaxed text-mist/75 sm:text-lg"
            style={{ animationDelay: "0.2s" }}
          >
            {intro}
          </p>
        )}
      </div>

      <svg
        className="relative block h-16 w-full text-laterite sm:h-24"
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
  );
}
