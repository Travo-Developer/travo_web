import type { MetadataRoute } from "next";
import { NAV, SITE_URL } from "@/lib/site";

/* Generated from NAV, so a page added to the nav is added to the sitemap
   automatically rather than silently going unindexed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return NAV.map((item) => ({
    url: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    // Home first, then the two pages that actually convert.
    priority:
      item.href === "/"
        ? 1
        : item.href === "/packages" || item.href === "/contact"
          ? 0.8
          : 0.6,
  }));
}
