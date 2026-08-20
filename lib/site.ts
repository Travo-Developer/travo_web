/* Single source of truth for contact details and route lists.
   Both the header nav and the footer render from NAV, so adding a page
   here wires it into every layout at once. */

/* Canonical origin, used for canonical tags, Open Graph URLs, the sitemap
   and JSON-LD. Set NEXT_PUBLIC_SITE_URL in the host's env to the real
   domain — everything SEO-related follows from this one value.
   Vercel exposes VERCEL_PROJECT_PRODUCTION_URL automatically, which keeps
   preview deploys pointing at the production origin rather than a preview one. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://travo.in")
).replace(/\/$/, "");

export const SITE_NAME = "Travo";

export const PHONE_DISPLAY = "+91 94451 56432";
export const PHONE_TEL = "+919445156432";
export const EMAIL = "travo.info365@gmail.com";

/* Used by the JSON-LD LocalBusiness block. Coordinates are Munnar town. */
export const BUSINESS = {
  streetAddress: "Munnar",
  addressLocality: "Munnar",
  addressRegion: "Kerala",
  postalCode: "685612",
  addressCountry: "IN",
  latitude: 10.0889,
  longitude: 77.0595,
  /* Regions we actually sell tours in — these double as the areaServed
     list in structured data. */
  areaServed: [
    "Munnar",
    "Idukki",
    "Alleppey",
    "Kumarakom",
    "Thekkady",
    "Kochi",
    "Kovalam",
    "Varkala",
    "Kerala",
  ],
} as const;

/* Derived from PHONE_TEL rather than repeating the digits — wa.me wants the
   number without a leading + or spaces. Keeps the WhatsApp link from drifting
   out of sync when the number changes. */
export const WHATSAPP = `https://wa.me/${PHONE_TEL.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi Travo, I'd like to plan a Kerala trip.",
)}`;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/packages", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

/* Elevation profile of the climb: plantation floor → shola belt → ridge →
   viewpoint. Reused at three scales as the site's connective tissue. */
export const RIDGE_PATH =
  "M0,38 C120,36 190,30 280,31 S430,20 520,17 C620,14 660,6 760,7 S900,17 1000,21 C1110,25 1180,20 1280,26 S1390,34 1440,32";

/* Headline tours. `time` is the duration, `climb` the region covered — the
   field names are shared with the itinerary cards on the packages page. */
export const TRIPS = [
  {
    name: "Munnar Hill Country",
    time: "3 days / 2 nights",
    climb: "Munnar · Idukki",
    blurb:
      "Tea estates, waterfalls, viewpoints and the Kolukkumalai sunrise. Our most complete Munnar itinerary — the full three-day circuit, day by day.",
    image: "/images/gallery/munnar-tea.jpg",
  },
  {
    name: "Alleppey & the Backwaters",
    time: "2 days / 1 night",
    climb: "Alappuzha · Kumarakom",
    blurb:
      "A night on a private houseboat through the paddy-field canals, village stops along the way, and sunset over Vembanad Lake.",
    image: "/images/gallery/alleppey.jpg",
  },
  {
    name: "Thekkady Wildlife & Spice",
    time: "2 days / 1 night",
    climb: "Periyar · Kumily",
    blurb:
      "Boat safari on Periyar Lake, a guided walk through cardamom and pepper plantations, and an evening of Kathakali and Kalaripayattu.",
    image: "/images/gallery/thekkady.jpg",
  },
  {
    name: "Kerala Grand Tour",
    time: "7 days / 6 nights",
    climb: "Kochi → Munnar → Thekkady → Alleppey → Kovalam",
    blurb:
      "The whole state in one run: colonial Kochi, the hill stations, the spice country, the backwaters, and the Arabian Sea beaches to finish.",
    image: "/images/gallery/kochi.jpg",
  },
] as const;

/* ⚠️ PLACEHOLDER REVIEWS — NOT REAL CUSTOMERS. Replace before the site goes
   live, or delete the section from the home page.

   These exist so the layout can be judged; publishing invented testimonials
   as if they were real is a false-advertising problem, not just a style one.

   REVIEWS_ARE_REAL is false, so the carousel shows the quote and stars only
   — no name, city or trip. Attribution is what makes an invented quote read
   as a real customer's words. The names below stay "Sample review" as a
   backstop: if the flag is flipped before real quotes land, the cards say so
   rather than inventing a customer.

   `rating` is out of 5 and drives the stars on each card. The stars are
   presentational only — they carry NO AggregateRating structured data, so
   they cannot produce (or falsify) rating snippets in search results.

   Once genuine reviews are in: replace these entries, flip the flag to
   surface the attribution, and only THEN add AggregateRating to the
   TravelAgency node in app/layout.tsx. That markup against placeholder
   reviews breaches Google's review-snippet policy and risks a manual
   penalty on the whole domain. */
export const REVIEWS_ARE_REAL = false;

export const REVIEWS = [
  {
    quote:
      "They rebuilt our whole itinerary the night before when the weather turned, and we still saw everything we came for. The driver knew exactly which roads were passable.",
    name: "Sample review",
    from: "Bengaluru",
    trip: "Munnar Hill Country",
    rating: 5,
  },
  {
    quote:
      "The houseboat was moored away from the main channel, so we woke up to nothing but birds and the water. Not the crowded stretch you see in photos.",
    name: "Sample review",
    from: "London",
    trip: "Alleppey & the Backwaters",
    rating: 5,
  },
  {
    quote:
      "We had two small children and were expecting to compromise. They planned around nap times, kept the drives short and found places the kids actually enjoyed.",
    name: "Sample review",
    from: "Dubai",
    trip: "Kerala Grand Tour",
    rating: 5,
  },
  {
    quote:
      "Booked three days out and still got a proper itinerary rather than a stock one. They asked what we wanted out of the trip before quoting anything.",
    name: "Sample review",
    from: "Mumbai",
    trip: "Munnar Hill Country",
    rating: 4,
  },
  {
    quote:
      "The guide at Periyar spotted a herd across the water we'd have driven straight past. Twenty minutes later they were on the bank in front of us.",
    name: "Sample review",
    from: "Singapore",
    trip: "Thekkady Wildlife & Spice",
    rating: 5,
  },
  {
    quote:
      "No pressure to add extras, and they told us plainly which of the paid stops were worth it and which we could skip. That honesty is why we'd use them again.",
    name: "Sample review",
    from: "Chennai",
    trip: "Munnar Hill Country",
    rating: 5,
  },
] as const;

/* The three-day Munnar circuit.
   `ticketed: true` marks a stop that charges its own entry or activity fee at
   the gate. We deliberately do not publish those amounts — operators change
   them without notice, and visitors should call for the current figure.
   Every ticketed stop is optional: skip it and the rest of the day is
   unaffected. */
export const ITINERARY = [
  {
    day: "Day 1",
    title: "Munnar Classic Sightseeing",
    summary:
      "The full circuit of gardens, dams and lakes that most people picture when they picture Munnar — done in one unhurried loop.",
    stops: [
      { name: "Rose Garden", ticketed: true },
      { name: "Photo Point", ticketed: false },
      { name: "Mattupetty Dam", ticketed: false },
      { name: "Sun Moon Valley Boating", ticketed: true },
      { name: "Echo Point", ticketed: true },
      { name: "Kundala Lake", ticketed: false },
      { name: "Top Station", ticketed: false },
    ],
  },
  {
    day: "Day 2",
    title: "Nature & Adventure",
    summary:
      "Off the tar and into the tea. Estate tracks, a waterfall you can stand under, and a cave walk before the light goes.",
    stops: [
      { name: "Tea Garden View", ticketed: false },
      { name: "Verivari Waterfall", ticketed: true },
      { name: "Cave Visit", ticketed: true },
      { name: "Mountain View Point", ticketed: false },
      { name: "Blossom Park", ticketed: false },
    ],
  },
  {
    day: "Day 3",
    title: "Waterfalls & Fun Activities",
    summary:
      "The longest day. Waterfalls in the morning, spice country by noon, then the choice of adventure park, boating or an elephant ride.",
    stops: [
      { name: "Attukad Waterfall", ticketed: false },
      { name: "2 Mile View Point", ticketed: false },
      { name: "Chocolate Factory", ticketed: false },
      { name: "Spice Plantation", ticketed: true },
      { name: "Adventure Park", ticketed: true },
      { name: "Senkulam Dam Boating", ticketed: true },
      { name: "Sathurangapara View Point", ticketed: false },
      { name: "Elephant Ride", ticketed: true },
    ],
  },
] as const;
