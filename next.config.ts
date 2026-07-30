import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Sector card imagery. Unsplash is a placeholder source — when licensed
     * photography lands, move the files into `public/sectors/` and delete this
     * entry rather than leaving a third-party host allowlisted in production.
     *
     * `search` is intentionally omitted: the Unsplash URLs carry transform
     * query strings (`?auto=format&fit=crop&...`), and pinning `search: ""`
     * would reject every one of them.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo-**",
      },
    ],
  },
};

export default nextConfig;
