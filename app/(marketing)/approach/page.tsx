import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { StaggerList, StaggerItem } from "@/components/ui/stagger";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "@/components/ui/image-slot";
import { Parallax } from "@/components/ui/parallax";
import { PageHeader } from "@/components/site/page-header";
import { CtaBlock } from "@/components/site/cta-block";

export const metadata: Metadata = {
  title: "Our Approach — Measure, Comply, Deliver",
  description:
    "The Geovitas engagement model: an audit-grade inventory first, lowest-cost compliance pathways second, and monetization of verified reductions last — each stage standing on the one before it.",
};

/**
 * The homepage carries Measure → Comply → Deliver as a single three-up section
 * (components/site/process.tsx). This page is that model at full depth: one band
 * per stage, each with the deliverable an engagement actually leaves behind.
 *
 * Copy stays at the same CFO-facing altitude as the rest of the site and invents
 * no metrics, client names, or outcomes — every deliverable is drawn from work
 * the site already describes (the sector practices and the platform).
 */
type Phase = {
  index: string;
  /** Anchor id, so the stages are deep-linkable. */
  id: string;
  title: string;
  /** Short framing line beside the title. */
  tagline: string;
  /** The one-sentence claim, carried over from the homepage model. */
  lead: string;
  /** Why the stage sits where it does in the sequence. */
  body: string;
  deliverables: readonly string[];
};

const PHASES: readonly Phase[] = [
  {
    index: "01",
    id: "measure",
    title: "Measure",
    tagline: "Establish an evidence base that survives assurance.",
    lead: "Audit-grade Scope 1, 2, and 3 inventory, traceable to utility and RTO source records.",
    body: "Primary data over estimation. A baseline that cannot be traced to source becomes a liability the moment a buyer's auditor asks where a figure came from, so the evidence is built first — before anything is reported or monetized on top of it.",
    deliverables: [
      "Scope 1–3 inventory built on metered, invoiced and grid-operator data rather than spend-based proxies",
      "Every figure referenced to source and versioned as primary data replaces estimates, line by line",
      "A baseline an assurance provider can follow back to the meter without re-work",
    ],
  },
  {
    index: "02",
    id: "comply",
    title: "Comply",
    tagline: "One inventory, mapped to every mandate you answer to.",
    lead: "Lowest-cost pathways for CBAM, SEBI BRSR Core, and SBTi targets.",
    body: "The same verified inventory maps outward to every framework you report against, so the same tonne is never counted twice or counted differently for two regulators. Pathways are ranked by cost per tonne abated, not by ease of disclosure — compliance treated as a capital-efficiency question, not a reporting exercise.",
    deliverables: [
      "EU CBAM certificate exposure modelled and reduced ahead of surrender obligations",
      "SEBI BRSR Core reasonable-assurance gaps closed from the same data, without re-keying",
      "Abatement pathways ranked by cost per tonne across CBAM, BRSR Core, SBTi and CCTS",
    ],
  },
  {
    index: "03",
    id: "deliver",
    title: "Deliver",
    tagline: "Turn verified reductions into instruments and access.",
    lead: "Monetize reductions via CCTS carbon credits, green finance terms, and export eligibility.",
    body: "Verified reductions convert into tradeable instruments, improved lending terms, and continued access to regulated export markets. Monetization built on unverified reductions does not survive contact with a buyer's auditor — which is why delivery sits last, on an inventory and a compliance position that already hold.",
    deliverables: [
      "Tradeable CCTS carbon credits originated against verified, additional abatement",
      "Green finance and lending terms improved on the strength of a defensible baseline",
      "Continued eligibility for EU-bound and other regulated export markets",
    ],
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHeader
        eyebrow="The engagement model"
        title="Measure. Comply. Deliver."
        lede="A sequence, not a menu. Compliance built on an inventory that cannot be defended is a liability, and monetization built on unverified reductions does not survive contact with a buyer's auditor — so the stages run in order, each standing on the one before it."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Approach" }]}
      >
        <Button href="#briefing" variant="primary" size="lg">
          Schedule an executive briefing
        </Button>
        <Button href="/exposure" variant="outline" size="lg">
          Calculate your exposure
        </Button>
      </PageHeader>

      {PHASES.map((phase, index) => (
        <section
          key={phase.id}
          id={phase.id}
          /* Paper / white alternation carries the stages as chapters, the same
             rhythm the homepage uses. scroll-mt clears the fixed nav on
             deep-link. */
          className={`scroll-mt-20 border-t border-ink-200 ${
            index % 2 === 0 ? "bg-ink-50" : "bg-white"
          }`}
        >
          <Container className="py-14 sm:py-16 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              {/* ---- Stage identity ---- */}
              <div className="lg:col-span-5">
                <Reveal>
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl
                               border border-ink-200 bg-white text-brand-cyan-ink shadow-card"
                  >
                    {PHASE_ICONS[phase.id]}
                  </span>
                </Reveal>
                <Reveal delay={0.04}>
                  <div className="mt-6 flex items-center gap-4">
                    <span
                      className="tnum flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                                 border border-brand-cyan/35 bg-white font-mono text-sm font-bold
                                 text-brand-cyan-ink shadow-card"
                    >
                      {phase.index}
                    </span>
                    <h2 className="text-h2 font-bold text-ink-950">{phase.title}</h2>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-6 text-lead text-ink-600">{phase.tagline}</p>
                </Reveal>

                {/* Only the first stage carries a photograph. The page is four
                    near-identical two-column bands; giving every one an image
                    would flatten the sequence back out, and it is the MEASURE
                    stage that has a physical act to show. */}
                {index === 0 && (
                  <Reveal delay={0.16}>
                    <Parallax className="mt-10 overflow-hidden rounded-card" speed={0.06}>
                      <ImageSlot
                        id="approach-fieldwork"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                      />
                    </Parallax>
                  </Reveal>
                )}
              </div>

              {/* ---- What the stage delivers ---- */}
              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal>
                  <p className="text-[0.9375rem] leading-relaxed font-bold text-ink-950">
                    {phase.lead}
                  </p>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{phase.body}</p>
                </Reveal>

                <StaggerList className="mt-7 space-y-3 border-t border-ink-150 pt-6">
                  {phase.deliverables.map((deliverable) => (
                    <StaggerItem
                      key={deliverable}
                      className="flex gap-3 text-sm leading-relaxed text-ink-600"
                    >
                      <span aria-hidden className="brand-gradient mt-2 h-px w-3 shrink-0" />
                      <span>{deliverable}</span>
                    </StaggerItem>
                  ))}
                </StaggerList>
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* Closing dark anchor — the same briefing CTA the homepage ends on. Its
          id="briefing" is what the header's primary button scrolls to. */}
      <CtaBlock />
    </>
  );
}

/* -- Stage icons: 1.5px line work, matched to the site's icon set ----------- */

const PHASE_ICONS: Record<Phase["id"], ReactNode> = {
  measure: <MeasureIcon />,
  comply: <ComplyIcon />,
  deliver: <DeliverIcon />,
};

/** Gauge — measurement. */
function MeasureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M4 15a8 8 0 0116 0M12 15l4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" />
    </svg>
  );
}

/** Shield-check — compliance held to assurance. */
function ComplyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zm-3 8.5l2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Outbound arrow — reductions converted and delivered. */
function DeliverIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M5 12h11m0 0l-4-4m4 4l-4 4M17 4h2a1 1 0 011 1v14a1 1 0 01-1 1h-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
