import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [],
    unoptimized: false,
  },
};

export default nextConfig;