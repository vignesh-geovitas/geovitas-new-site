/**
 * Single source of truth for the three advisory verticals.
 *
 * The homepage bento (components/site/advisory-bento.tsx), the /advisory index,
 * and each /advisory/[slug] detail page all read from here, so the practice
 * names, modes, and outcomes never drift between surfaces. Icons live with the
 * card component (they are JSX) and are keyed back to these slugs.
 *
 * SLUGS ARE THE PUBLISHED URLs. They are deliberately market-facing rather than
 * descriptive — `green-factory-360` is the name buyers search for, even though
 * the practice it opens is titled "Manufacturing & Export". Note the adjacency
 * to the *platform* of the same name: /platform is the software, this vertical
 * is the advisory work sold around it. Renaming a slug is a breaking URL change
 * and needs a matching entry in the redirects block of next.config.ts.
 *
 * ALTITUDE / SOURCING. Copy stays at the site's CFO-facing altitude and invents
 * no clients, quotes, or performance metrics. Regulatory specifics (CBAM, its
 * proposed 2028 downstream expansion, the SEBI BRSR Core value-chain threshold,
 * CCTS) are drawn from the public instruments and the Green Factory 360 research
 * — described as mechanisms, never as guaranteed figures — and each detail page
 * carries the same source line the homepage proof strip uses.
 *
 * IMAGERY. The Unsplash URLs are placeholders, as on the homepage. When licensed
 * photography lands, move the files into `public/sectors/` and drop the
 * `images.unsplash.com` entry from next.config.ts.
 */

export type AdvisorySlug =
  | "urban-local-bodies"
  | "green-factory-360"
  | "energy-transition";

export type VerticalDriver = {
  title: string;
  body: string;
};

export type VerticalLink = {
  label: string;
  href: string;
};

export type AdvisoryVertical = {
  slug: AdvisorySlug;
  index: string;
  /** Practice name — the H1 on the detail page. */
  practice: string;
  /** How the work is delivered — the two-word parent-child story. */
  mode: string;

  /** Shared claim: the homepage card headline and the detail context H2. */
  headline: string;
  /** Homepage card body — the short version. */
  cardBody: string;
  /** Homepage card outcomes — three short lines. */
  outcomes: readonly string[];
  image: string;
  /** Describes the photograph as it actually is — a real <img> alt. */
  imageAlt: string;

  /** Detail page. */
  metaTitle: string;
  metaDescription: string;
  /** Detail hero lede — the expanded positioning. */
  lede: string;
  /** Detail context paragraphs, under the headline. */
  context: readonly string[];
  /** What is driving the work — four forces. */
  drivers: readonly VerticalDriver[];
  /** What an engagement leaves behind — the expanded outcomes. */
  deliverables: readonly string[];
  /** Cross-links surfaced at the foot of the detail page. */
  related: readonly VerticalLink[];
};

export const VERTICALS: readonly AdvisoryVertical[] = [
  {
    slug: "urban-local-bodies",
    index: "01",
    practice: "Urban Local Bodies",
    mode: "Advisory + Project development",
    headline: "Audit-grade baselines that defend public climate finance.",
    cardBody:
      "Municipal climate commitments fail diligence when the underlying inventory cannot be traced to source. We build the evidence base first, then take it through submission.",
    outcomes: [
      "SAPCC submissions defended under third-party scrutiny",
      "Audit-grade Scope 1-3 baselines traceable to utility and grid operator records",
      "Climate finance unlocked against verified, bankable reductions",
    ],
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
    imageAlt: "A detached house on a tree-lined road at sunrise",
    metaTitle: "Urban Local Bodies — Sector Practice",
    metaDescription:
      "Audit-grade Scope 1-3 baselines that defend public climate finance — built to survive third-party diligence, then carried through SAPCC and city-level submission.",
    lede: "Public climate commitments fail diligence when the underlying inventory cannot be traced to source. We build the audit-grade evidence base first, then carry it through submission — so the climate finance resting on those numbers survives third-party scrutiny.",
    context: [
      "A city's climate ambition is only as bankable as the inventory beneath it. State and national submissions, concessional finance, and multilateral programmes all turn on whether an emissions baseline can be independently defended — and most cannot, because the data was estimated rather than traced.",
      "We start where the diligence will: at source. Utility records, grid-operator data and municipal operational data become a Scope 1-3 baseline an assurance provider can follow back to the meter, and then a submission that holds when the reviewer arrives.",
    ],
    drivers: [
      {
        title: "State Action Plans on Climate Change",
        body: "SAPCC and city-level commitments require inventories that stand up to independent review, not internal estimates.",
      },
      {
        title: "Climate finance diligence",
        body: "Concessional and multilateral finance is released against baselines a lender's reviewer can trace back to source.",
      },
      {
        title: "Third-party assurance",
        body: "Greenwashing scrutiny raises the bar on data credibility — public bodies need defensible, verifiable claims.",
      },
      {
        title: "Public accountability",
        body: "Figures published in a city's name are read by auditors and citizens alike; they have to be right the first time.",
      },
    ],
    deliverables: [
      "SAPCC and city-level submissions defended under third-party scrutiny",
      "Audit-grade Scope 1-3 baselines traceable to utility and grid-operator records",
      "Climate finance unlocked against verified, bankable reductions",
      "A submission-ready evidence trail an assurance provider can follow without re-work",
    ],
    related: [{ label: "The engagement model", href: "/approach" }],
  },
  {
    slug: "green-factory-360",
    index: "02",
    practice: "Manufacturing & Export",
    mode: "Advisory + Platform",
    headline: "CBAM tariff mitigation for EU-bound supply chains.",
    cardBody:
      "Every tonne of embedded emissions above benchmark is a certificate you buy. Measurement precision is a margin decision, not a reporting exercise.",
    outcomes: [
      "EU CBAM certificate exposure modelled and reduced ahead of surrender obligations",
      "Product Carbon Footprint (PCF) verified at SKU and process level",
      "SEBI BRSR Core compliance from the same inventory, without re-keying data",
    ],
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Engineer reviewing process data on a workstation",
    metaTitle: "Manufacturing & Export — Sector Practice",
    metaDescription:
      "CBAM tariff mitigation for EU-bound supply chains: certificate exposure modelled and reduced, PCF verified at SKU level, and SEBI BRSR Core met from one verified inventory.",
    lede: "Every tonne of embedded emissions above benchmark is a certificate your buyer's importer has to surrender. For export-exposed manufacturers, measurement precision is a margin decision long before it is a reporting one.",
    context: [
      "The EU's Carbon Border Adjustment Mechanism moved to its definitive regime in 2026, and a proposed downstream expansion would widen its scope again from 2028. Where verified primary data is missing, importers fall back on punitive default values — a cost that lands directly on the exporter's margin.",
      "The same pressure now arrives from customers and domestic regulation at once: buyers cascade Scope-3 data requests inside RFP timelines, and SEBI's BRSR Core names value-chain partners above a materiality threshold. One verified inventory, mapped outward, answers all of them — which is where Green Factory 360 AI does the work.",
    ],
    drivers: [
      {
        title: "EU CBAM",
        body: "Certificate obligations on embedded emissions above benchmark, with a proposed 2028 downstream expansion widening the covered goods.",
      },
      {
        title: "Customer Scope-3 cascade",
        body: "Buyers increasingly write supplier emissions data into sourcing decisions, and on RFP timelines.",
      },
      {
        title: "SEBI BRSR Core value-chain",
        body: "Disclosure reaches value-chain partners contributing 2% or more of purchases or sales — mid-market suppliers are named in the request.",
      },
      {
        title: "Product-level (PCF) demand",
        body: "Scrutiny is shifting from company-level to product-level carbon, especially for export SKUs.",
      },
    ],
    deliverables: [
      "EU CBAM certificate exposure modelled and reduced ahead of surrender obligations",
      "Product Carbon Footprint (PCF) verified at SKU and process level",
      "SEBI BRSR Core compliance from the same inventory, without re-keying data",
      "Value-chain data collected through Green Factory 360 AI, so you report from primary data, not estimates",
    ],
    related: [
      { label: "Green Factory 360 AI", href: "/platform" },
      { label: "Model your CBAM exposure", href: "/exposure" },
    ],
  },
  {
    slug: "energy-transition",
    index: "03",
    practice: "Oil, Gas & Energy",
    mode: "Physical infrastructure",
    headline: "Transition assets that clear enterprise hurdle rates.",
    cardBody:
      "Abatement that does not meet your cost of capital does not get built. We engineer, underwrite and deploy each asset against the same test as any other capital project.",
    outcomes: [
      "Compressed biogas (CBG), cold cracking and carbon capture deployed at scale",
      "Every asset underwritten to hurdle-rate ROI before capital commitment",
      "Tradeable CCTS carbon credits generated from verified abatement",
    ],
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Wind turbines on open grassland",
    metaTitle: "Oil, Gas & Energy — Sector Practice",
    metaDescription:
      "Physical transition assets — compressed biogas, cold cracking, carbon capture — underwritten to hurdle-rate ROI before capital commitment, originating tradeable CCTS credits.",
    lede: "Abatement that does not meet your cost of capital does not get built. We engineer, underwrite and deploy each transition asset against the same test as any other capital project — then originate the credits it earns.",
    context: [
      "Energy and heavy-industry operators do not need another pledge; they need assets that pencil. Compressed biogas, cold cracking and carbon capture only get built when the abatement clears the hurdle rate — so we underwrite each one to ROI before any capital is committed.",
      "India's Carbon Credit Trading Scheme turns verified abatement into a tradeable instrument. Obligated entities carry emission-intensity targets directly, and the assets we deploy both meet those targets and originate the credits that trade against them.",
    ],
    drivers: [
      {
        title: "CCTS compliance",
        body: "Emission-intensity targets are notified for obligated entities, with tradeable credits for verified over-performance.",
      },
      {
        title: "Hurdle-rate discipline",
        body: "Transition capital competes with every other project for the same balance sheet — abatement has to clear the same return test.",
      },
      {
        title: "Carbon credit origination",
        body: "Verified abatement converts into tradeable CCTS instruments, turning a cost centre into a revenue line.",
      },
      {
        title: "Physical deployment",
        body: "Compressed biogas, cold cracking and carbon capture, engineered and deployed at industrial scale.",
      },
    ],
    deliverables: [
      "Compressed biogas (CBG), cold cracking and carbon capture deployed at scale",
      "Every asset underwritten to hurdle-rate ROI before capital commitment",
      "Tradeable CCTS carbon credits generated from verified abatement",
      "Emission-intensity obligations met with assets that also originate credits",
    ],
    /* The three assets named above each have their own page under
       /capabilities — see lib/capabilities.ts. That link leads here because it
       is the one a reader of this page most often wants next. */
    related: [
      { label: "Transition capabilities", href: "/capabilities" },
      { label: "The engagement model", href: "/approach" },
    ],
  },
];

export const VERTICALS_BY_SLUG: Readonly<
  Record<AdvisorySlug, AdvisoryVertical>
> = Object.fromEntries(
  VERTICALS.map((vertical) => [vertical.slug, vertical]),
) as Record<AdvisorySlug, AdvisoryVertical>;
