/**
 * The insights content model and its opening slate.
 *
 * Same arrangement as lib/advisory.ts and lib/capabilities.ts: content lives
 * here, the page under app/(marketing)/insights is thin. When individual
 * articles land they become routes at /insights/[slug] and this file grows a
 * `body` field — the shape below is deliberately the subset a card needs, so
 * adding the full article later is additive rather than a rewrite.
 *
 * STATUS IS LOAD-BEARING. Nothing here is written yet, so every entry carries
 * `status: "planned"` and the index renders it as a commissioned topic rather
 * than as a link to a page that does not exist. An entry only becomes a link
 * once it has `status: "published"` AND a `slug` route to point at — see the
 * guard in the page component.
 *
 * SUBJECT MATTER. These are breakdowns of PUBLIC regulatory instruments — CBAM,
 * SEBI BRSR Core, CCTS — and of the measurement practice underneath them. That
 * is the one class of claim this site can make in depth without client sign-off,
 * which is exactly why the content hub leads with it.
 */

export type InsightStatus = "published" | "planned";

export type InsightCategory =
  | "Regulatory"
  | "Measurement"
  | "Technology"
  | "Markets";

export type Insight = {
  /** URL segment under /insights. Reserved now, routed when the article lands. */
  slug: string;
  title: string;
  /** One-line standfirst — what the reader gets out of it. */
  standfirst: string;
  category: InsightCategory;
  status: InsightStatus;
  /** ISO date, published entries only. Drives ordering and <time>. */
  published?: string;
  /** Rough length signal, so a reader can triage. */
  readingTime?: string;
};

export const INSIGHT_CATEGORIES: readonly InsightCategory[] = [
  "Regulatory",
  "Measurement",
  "Technology",
  "Markets",
];

export const INSIGHTS: readonly Insight[] = [
  {
    slug: "cbam-definitive-regime-what-changed",
    title: "The CBAM definitive regime: what actually changed in 2026",
    standfirst:
      "The transitional period ended and the surrender obligation began. A read of the instrument as it now stands, and what it asks of an Indian exporter in practice.",
    category: "Regulatory",
    status: "planned",
  },
  {
    slug: "cbam-default-values-margin-cost",
    title: "Why default values are a margin decision",
    standfirst:
      "Where verified primary data is missing, an importer falls back on punitive defaults. Working through what that substitution costs, and where measurement pays for itself.",
    category: "Regulatory",
    status: "planned",
  },
  {
    slug: "brsr-core-value-chain-threshold",
    title: "BRSR Core and the value-chain threshold",
    standfirst:
      "SEBI's disclosure reaches partners contributing 2% or more of purchases or sales. What that means if you are the supplier being named in someone else's filing.",
    category: "Regulatory",
    status: "planned",
  },
  {
    slug: "ccts-intensity-targets-and-credits",
    title: "CCTS: intensity targets, and the credits that trade against them",
    standfirst:
      "India's Carbon Credit Trading Scheme turns verified over-performance into a tradeable instrument. How the obligation and the opportunity sit on the same balance sheet.",
    category: "Markets",
    status: "planned",
  },
  {
    slug: "audit-grade-what-it-means",
    title: "What “audit-grade” has to mean to survive diligence",
    standfirst:
      "An inventory an assurance provider can follow back to the meter, versus one that was estimated. The difference is procedural, and it shows up under review.",
    category: "Measurement",
    status: "planned",
  },
  {
    slug: "product-carbon-footprint-at-sku",
    title: "Taking carbon accounting down to the SKU",
    standfirst:
      "Scrutiny is shifting from company-level to product-level. What changes in the data model when the unit of account becomes a product rather than a legal entity.",
    category: "Measurement",
    status: "planned",
  },
  {
    slug: "metering-to-inventory-pipeline",
    title: "From meter to inventory: the data pipeline underneath",
    standfirst:
      "How primary consumption data becomes a Scope 1-3 position that holds up — the ingestion, reconciliation and evidence trail that Green Factory 360 AI automates.",
    category: "Technology",
    status: "planned",
  },
  {
    slug: "compressed-biogas-project-economics",
    title: "Compressed biogas: the project economics",
    standfirst:
      "Feedstock, offtake and capital cost, and the hurdle rate a CBG asset has to clear before it gets built.",
    category: "Technology",
    status: "planned",
  },
];

/** Published first and newest-first within that; planned entries trail. */
export const INSIGHTS_BY_RECENCY: readonly Insight[] = [...INSIGHTS].sort(
  (a, b) => {
    if (a.status !== b.status) return a.status === "published" ? -1 : 1;
    return (b.published ?? "").localeCompare(a.published ?? "");
  },
);
