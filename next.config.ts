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

  /**
   * IA MIGRATION — /sectors became /advisory, /about became /company.
   *
   * 308s, because the old paths are gone for good and the replacements are
   * their exact equivalents. Two of the three vertical slugs changed as well,
   * so each one is listed individually rather than being caught by a wildcard
   * — `/sectors/:slug` → `/advisory/:slug` would 404 on the two that were
   * renamed, which is worse than not redirecting at all.
   *
   * The wildcard entry last is a safety net for any deeper /sectors path: it
   * lands on the hub rather than a dead end.
   *
   * These stay until the old URLs stop appearing in logs and in the Search
   * Console coverage report. They cost one lookup per request; a broken inbound
   * link costs the lead.
   */
  async redirects() {
    return [
      {
        source: "/sectors/manufacturing-export",
        destination: "/advisory/green-factory-360",
        permanent: true,
      },
      {
        source: "/sectors/oil-gas-energy",
        destination: "/advisory/energy-transition",
        permanent: true,
      },
      {
        source: "/sectors/urban-local-bodies",
        destination: "/advisory/urban-local-bodies",
        permanent: true,
      },
      { source: "/sectors", destination: "/advisory", permanent: true },
      { source: "/sectors/:path*", destination: "/advisory", permanent: true },
      { source: "/about", destination: "/company", permanent: true },
    ];
  },
};

export default nextConfig;
