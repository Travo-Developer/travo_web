import type { Metadata } from "next";
import { Fraunces, Archivo } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "./components/site-footer";
import {
  BUSINESS,
  EMAIL,
  PHONE_TEL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const body = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
});

const TITLE = "Travo — Kerala Tours & Holiday Packages";
const DESCRIPTION =
  "Tailor-made Kerala tour packages — Munnar hill stations, Alleppey backwaters, Thekkady spice country and the Malabar coast. Private tours planned and guided by locals.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Travo",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Kerala tour packages",
    "Munnar tour package",
    "Kerala holiday packages",
    "Alleppey houseboat",
    "Thekkady tour",
    "Kerala backwaters tour",
    "Munnar sightseeing",
    "Kerala travel agency",
    "South India tours",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Travo — your Kerala trip, planned by hand. Tea estates above Munnar.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "travel",
  formatDetection: { telephone: true, address: true, email: true },
};

/* TravelAgency is a LocalBusiness subtype, so one node carries both the
   "who we are" signals and the local/map signals Google uses for
   "kerala tour package" style queries. */
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  description:
    "Kerala tour operator based in Munnar, offering private tailor-made tours across the hill stations, backwaters, spice country and coast.",
  url: SITE_URL,
  telephone: PHONE_TEL,
  email: EMAIL,
  image: `${SITE_URL}/images/og-image.jpg`,
  logo: `${SITE_URL}/icon.png`,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.streetAddress,
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
  },
  areaServed: BUSINESS.areaServed.map((name) => ({ "@type": "Place", name })),
  knowsLanguage: ["ml", "ta", "hi", "en"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "21:00",
    },
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SiteFooter />
        <script
          type="application/ld+json"
          // JSON.stringify does not escape HTML; replace `<` so a stray tag
          // in any future data value cannot break out of the script element.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationLd, websiteLd]).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      </body>
    </html>
  );
}
