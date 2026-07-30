import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { StaggerList, StaggerItem } from "@/components/ui/stagger";
import { MotionCard, HOVER_SHADOW_LARGE } from "@/components/ui/motion-card";
import { Button, ArrowRight } from "@/components/ui/button";
import { ImageSlot } from "@/components/ui/image-slot";
import { ArchitectureDiagram } from "@/components/ui/architecture-diagram";
import { Parallax } from "@/components/ui/parallax";
import { Marquee } from "@/components/ui/marquee";
import { PageHeader } from "@/components/site/page-header";
import { PlatformMockup } from "@/components/ui/platform-mockup";
import { CtaBlock } from "@/components/site/cta-block";

export const metadata: Metadata = {
  title: "Green Factory 360 AI — The Platform",
  description:
    "Green Factory 360 AI is the audit-grade measurement layer beneath every Geovitas engagement: automated Scope 1–3 accounting mapped to CBAM, SEBI BRSR Core, CCTS, GHG Protocol and SBTi from one verified inventory.",
};

/**
 * Green Factory 360 AI — the dedicated platform page.
 *
 * SOURCING NOTE. The capability, jobs-to-be-done and value copy below is drawn
 * from the Green Factory 360 GTM research deck, but only its customer-facing
 * substance: what the platform does and why it matters to a CFO. The deck's
 * confidential material — pricing/SKUs, ICP scoring, the competitive map and
 * named competitors, SWOT, sales objection scripts, financial targets and named
 * target accounts — is deliberately NOT reproduced here; a public marketing page
 * is the wrong surface for it. Automotive-specific and OEM-named framing from the
 * deck is generalised to the site's multi-sector CFO altitude, and directional
 * figures (e.g. the "~30%" CBAM default-value estimate) are described as a
 * mechanism rather than asserted as fact, matching the rest of the site's
 * verifiable-only discipline.
 *
 * Positioning is held steady with the homepage: the platform is the
 * instrumentation layer underneath the advisory and infrastructure work, not a
 * standalone carbon-accounting product — see the Platform section in
 * components/site/platform.tsx and the narrative note in app/(marketing)/page.tsx.
 */

/** One inventory, mapped outward — the platform's whole argument. */
const FRAMEWORKS = [
  "EU CBAM",
  "SEBI BRSR Core",
  "CCTS",
  "GHG Protocol",
  "SBTi / ISSB",
] as const;

type Capability = {
  title: string;
  body: string;
  icon: ReactNode;
};

const CAPABILITIES: readonly Capability[] = [
  {
    title: "Scope 1, 2 & 3 automation",
    body: "Meter, invoice, ERP and logistics data is ingested continuously and calculated against current emission factors, aggregated across every plant. Multi-site aggregation is the point where spreadsheets fail — and where the platform earns its place.",
    icon: <PulseIcon />,
  },
  {
    title: "Supplier data capture & portal",
    body: "A portal and assisted outreach collect value-chain data where supplier digital maturity is thin — the Scope 3 bottleneck sits upstream, not at your plant. Where a supplier cannot yet respond, a spend-based baseline stands in until primary data replaces it.",
    icon: <NetworkIcon />,
  },
  {
    title: "ERP & operational-system integration",
    body: "Pre-built connectors for SAP, Tally and Oracle pull fuel, power and procurement data from where it already lives, with a CSV fallback for everything else. Adoption sticks because the data pipeline does.",
    icon: <PlugIcon />,
  },
  {
    title: "Decarbonization roadmap",
    body: "Emissions are ranked into cost-out actions by cost per tonne abated, turning an inventory into a capital plan. This is the answer to the board's “so what?” — reductions sequenced the way any other capital decision is.",
    icon: <RouteIcon />,
  },
  {
    title: "Product Carbon Footprint (PCF)",
    body: "Product-level carbon for export-exposed goods, as scrutiny shifts from company-level to product-level. LCA-grade figures for the specific SKUs your buyers and their auditors ask about.",
    icon: <CubeIcon />,
  },
  {
    title: "Audit trail & verifiable data",
    body: "Every figure carries a source reference an assurance provider can follow back to the meter, the invoice, or the grid operator — defensible methodology and traceable evidence, which is the difference between a report and an audit-grade baseline.",
    icon: <ShieldIcon />,
  },
];

/** The three jobs the platform is built to do — the product's narrative spine. */
const JOBS = [
  {
    index: "01",
    title: "Create credible emissions data, efficiently",
    body: "Replace spreadsheet workflows with automated Scope 1, 2 and 3 baselining across multi-plant operations — a defensible Scope 1–2 position in the first weeks, primary-data depth across the first quarter.",
  },
  {
    index: "02",
    title: "Pull fragmented data into one workflow",
    body: "Supplier and operational data lands in a single system, so value-chain collection stops being a spreadsheet chase where digital maturity is thin — and the inventory closes instead of stalling.",
  },
  {
    index: "03",
    title: "Translate reports into action & ROI",
    body: "Convert emissions into export and customer readiness, surfaced cost savings, and a ranked decarbonization roadmap — the platform is a P&L instrument, not a compliance filing.",
  },
] as const;

/** CFO-salient outcomes, generalised from the deck's messaging pillars. */
const OUTCOMES = [
  {
    title: "Protect export and customer contracts",
    body: "Respond to customer Scope-3 data requests inside RFP timelines. As emissions data is written into sourcing decisions, a slow or unverifiable response is a seat lost on the preferred-supplier list.",
  },
  {
    title: "Reach audit-readiness you can defend",
    body: "Defensible methodology, traceable evidence, and a verified data pipeline that clears SEBI BRSR Core, CBAM and customer ESG review on the first pass rather than the third.",
  },
  {
    title: "Stay ahead of the CBAM cost mechanism",
    body: "Without verified primary data, EU importers fall back on punitive default values for covered goods. Measured, traceable data keeps that gap off your export margin — a direct P&L line, not a disclosure footnote.",
  },
  {
    title: "Solve supplier collaboration at scale",
    body: "The portal and assisted outreach close the value-chain data problem, so you report to a regulator or a buyer from primary data rather than estimates.",
  },
  {
    title: "Read emissions as cost signals",
    body: "The decarbonization roadmap surfaces energy and material inefficiency, so carbon accounting becomes operational P&L — reductions that pay for themselves before they count toward a target.",
  },
] as const;

export default function PlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="The platform"
        title="Green Factory 360 AI"
        lede="The audit-grade measurement layer beneath every Geovitas engagement. It automates Scope 1, 2 and 3 accounting against live operational data and maps one verified inventory to every framework you report against — so you can answer a regulator, a lender, or an export customer from the same defensible baseline, without standing up a sustainability team."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Platform" }]}
      >
        <Button
          href="mailto:venu@geovitas.com?subject=Green%20Factory%20360%20AI%20platform%20demo"
          variant="accent"
          size="lg"
        >
          Book a platform demo
          <ArrowRight />
        </Button>
        <Button href="/exposure" variant="outline" size="lg">
          Calculate your exposure
        </Button>
      </PageHeader>

      {/* ===================== Overview + product ===================== */}
      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <Reveal>
                <Eyebrow>One inventory, mapped outward</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  The instrumentation layer under the work.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-lead text-ink-600">
                  Green Factory 360 AI is not a report you file and forget. It is the
                  continuous data layer beneath our advisory and project work — the same
                  verified inventory mapped to every mandate, so a tonne is never counted
                  twice, or counted differently for two regulators.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="glass mt-8 rounded-card px-6 py-5">
                  <p className="font-mono text-eyebrow uppercase text-ink-600">
                    One inventory, mapped to
                  </p>
                  <Marquee
                    items={FRAMEWORKS}
                    className="mt-3.5"
                    duration={30}
                    itemClassName="text-sm font-bold text-ink-600"
                  />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Parallax speed={0.04} overscan={false}>
                <PlatformMockup />
              </Parallax>
            </div>
          </div>

          {/* The architecture claim, drawn. "One inventory mapped outward" is
              the platform's whole argument and it was carried entirely in
              prose — the diagram makes it in one glance. Built from real DOM
              rather than filled from lib/imagery.ts: that slot is flagged
              `treatment: "diagram"` because a generated data flow would be
              wrong in ways engineers would catch. */}
          <Reveal y={24}>
            <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <ArchitectureDiagram />
              </div>
              <div className="lg:col-span-5">
                <Parallax className="overflow-hidden rounded-card" speed={0.06}>
                  <ImageSlot
                    id="platform-source-data"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </Parallax>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===================== Capabilities ===================== */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-16 sm:py-20 lg:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Capabilities</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                What the platform actually does.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lead text-ink-600">
                Six capabilities, ordered the way an engagement uses them — measure first,
                extend outward as the mandate and the export exposure demand.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {CAPABILITIES.map((capability, index) => (
              <MotionCard
                key={capability.title}
                delay={index * 0.06}
                hoverShadow={HOVER_SHADOW_LARGE}
                className="flex flex-col rounded-card border border-ink-200 bg-white p-7 shadow-card
                           transition-colors duration-300 ease-brand hover:border-brand-cyan/50"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
                             border border-ink-200 bg-white text-brand-cyan-ink shadow-card"
                >
                  {capability.icon}
                </span>
                <h3 className="mt-5 text-[0.9375rem] font-bold text-ink-950">
                  {capability.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                  {capability.body}
                </p>
              </MotionCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================== Jobs to be done ===================== */}
      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-16 sm:py-20 lg:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>What it&apos;s built to do</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                Three jobs, in sequence.
              </h2>
            </Reveal>
          </div>

          <StaggerList
            ordered
            className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10"
            step={0.12}
          >
            {JOBS.map((job) => (
              <StaggerItem key={job.index}>
                <span className="tnum font-mono text-sm font-bold text-brand-cyan-ink">
                  {job.index}
                </span>
                <span aria-hidden className="brand-gradient mt-4 block h-px w-10" />
                <h3 className="mt-5 text-h3 font-bold text-ink-950">{job.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{job.body}</p>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </section>

      {/* ===================== Why it earns its place ===================== */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-16 sm:py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>Why it earns its place</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  Measured against the P&amp;L, not the dashboard.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-lead text-ink-600">
                  Every outcome below is a revenue or risk line a CFO already owns. The
                  carbon number is the means; the contract, the audit, and the margin are
                  the point.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <StaggerList className="space-y-0">
                {OUTCOMES.map((outcome, index) => (
                  <StaggerItem
                    key={outcome.title}
                    className="flex gap-5 border-t border-ink-200 py-6 first:border-t-0 first:pt-0"
                  >
                    <span className="tnum shrink-0 font-mono text-sm font-bold text-brand-cyan-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[0.9375rem] font-bold text-ink-950">
                        {outcome.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">
                        {outcome.body}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerList>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing dark anchor — reuses the site's briefing CTA. */}
      <CtaBlock />
    </>
  );
}

/* -- Icons: 1.5px line work, matched to the platform section's set ---------- */

function PulseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M3 12h4l2.5-6 5 12L17 12h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M12 7.5V5m0 0a2 2 0 100-4 2 2 0 000 4zM6.5 19a2 2 0 100-4 2 2 0 000 4zm11 0a2 2 0 100-4 2 2 0 000 4zM12 7.5l-4.5 8m4.5-8l4.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M9 3v4m6-4v4M6 7h12v3a6 6 0 01-6 6 6 6 0 01-6-6V7zm6 12v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M4 5h6a3 3 0 013 3v8a3 3 0 003 3h4m0 0l-3-3m3 3l-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="4" cy="5" r="1.6" fill="currentColor" />
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 0v9m0 0l8-4.5M12 12l-8-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
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
