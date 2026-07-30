import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { VERTICALS } from "@/lib/advisory";
import { CAPABILITIES } from "@/lib/capabilities";

/**
 * Only routes that actually resolve belong here — listing a page before it
 * ships points crawlers at a 404. Add /platform, /advisory/*, /company, etc. to
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
      url: `${SITE_URL}/advisory`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...VERTICALS.map((vertical) => ({
      url: `${SITE_URL}/advisory/${vertical.slug}`,
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
    /* Proof surfaces. /impact carries the delivered numbers, /insights the
       regulatory commentary — the latter changes most often on the site, hence
       the weekly frequency against everything else's monthly.

       /impact is listed while still carrying `robots: { index: false }`, on the
       same reasoning as the two legal routes below: the entry keeps the IA
       complete and is the thing that reminds whoever lands the verified figures
       to lift the noindex. Drop that metadata key on the page, not this entry. */
    {
      url: `${SITE_URL}/impact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/company`,
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
