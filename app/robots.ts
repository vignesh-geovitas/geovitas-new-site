import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Open the whole marketing site to crawlers and point them at the sitemap.
 * There is nothing private to exclude yet; add `disallow` entries here if an
 * app or gated area is introduced later.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
