import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SECTORS } from "@/lib/sectors";
import { CAPABILITIES } from "@/lib/capabilities";

/**
 * Only routes that actually resolve belong here — listing a page before it
 * ships points crawlers at a 404. Add /platform, /sectors/*, /about, etc. to
 * this array as each page lands, not before.
 *
 * `priority` ranks pages relative to one another: the home page leads, the
 * engagement model sits just under it, and the methodology deep-dive trails.
 * `lastModified` resolves at build time, so it moves with each deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/platform`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/approach`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sectors`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...SECTORS.map((sector) => ({
      url: `${SITE_URL}/sectors/${sector.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    /* The three transition capabilities sit a level below the Oil, Gas &
       Energy practice that deploys them, and are ranked accordingly. */
    {
      url: `${SITE_URL}/capabilities`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...CAPABILITIES.map((capability) => ({
      url: `${SITE_URL}/capabilities/${capability.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/exposure`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    /* The two legal routes are listed so the information architecture is
       complete, but both pages currently carry `robots: { index: false }` while
       their copy is a scaffold — see the note in each page file. Remove that
       metadata key when counsel-approved copy lands; these entries stay. */
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
