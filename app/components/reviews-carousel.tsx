import { REVIEWS } from "@/lib/site";

/* Endless marquee. The track holds two identical copies of the list and
   slides exactly -50%, so the moment it completes the first copy sits
   pixel-for-pixel where the second began and the restart is invisible.

   No client JS: it's a CSS animation, so this stays a Server Component and
   every review ships in the HTML for crawlers. Hover/focus pause and the
   reduced-motion fallback are handled in globals.css. */

export function ReviewsCarousel() {
  return (
    <div
      className="review-marquee relative mt-12"
      // Longer lists would otherwise scroll faster, since the same duration
      // covers more ground. Scale it so the speed stays constant.
      style={{ "--marquee-duration": `${REVIEWS.length * 11}s` } as React.CSSProperties}
    >
      {/* Fade the strip into the background at both ends, so cards enter and
          leave rather than being chopped off at the edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-mist/60 to-transparent sm:w-24"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-mist/60 to-transparent sm:w-24"
      />

      <div className="review-viewport overflow-hidden">
        {/* items-stretch + h-full on the card keeps every card the height of
            the tallest quote, so the row reads as one band. */}
        <ul className="review-track flex w-max items-stretch gap-6">
          {/* Copy A — the real list, read by assistive tech. */}
          {REVIEWS.map((review, i) => (
            <ReviewCard key={`a-${i}`} review={review} />
          ))}
          {/* Copy B — visual filler only, hidden from the accessibility tree
              so screen readers don't announce every review twice. */}
          {REVIEWS.map((review, i) => (
            <ReviewCard key={`b-${i}`} review={review} duplicate />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  duplicate = false,
}: {
  review: (typeof REVIEWS)[number];
  duplicate?: boolean;
}) {
  return (
    <li
      aria-hidden={duplicate || undefined}
      className="w-76 shrink-0 sm:w-96"
    >
      <figure className="flex h-full flex-col rounded-lg border border-ink/10 bg-paper p-7">
        <svg
          aria-hidden="true"
          viewBox="0 0 32 24"
          className="h-5 w-7 shrink-0 text-laterite-deep/45"
          fill="currentColor"
        >
          <path d="M13.4 24V13.2C13.4 5.9 17.8 1 25.4 0l1.2 3.4c-4.3 1-6.6 3.6-6.9 7.2h5.6V24H13.4ZM0 24V13.2C0 5.9 4.4 1 12 0l1.2 3.4c-4.3 1-6.6 3.6-6.9 7.2h5.6V24H0Z" />
        </svg>

        <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-ink/75">
          {review.quote}
        </blockquote>

        <figcaption className="mt-6 border-t border-ink/10 pt-5">
          <p className="text-sm text-ink/85">{review.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink/45">
            {review.from} · {review.trip}
          </p>
        </figcaption>
      </figure>
    </li>
  );
}
