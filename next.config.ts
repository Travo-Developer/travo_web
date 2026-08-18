import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 requires quality values to be allowlisted. 85 is used by the
    // hero photo, where the extra detail in the tea terraces is worth the bytes.
    qualities: [75, 85],
  },
};

export default nextConfig;
