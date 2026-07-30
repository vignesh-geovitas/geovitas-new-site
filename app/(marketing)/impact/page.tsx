import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { StaggerGroup, StaggerChild } from "@/components/ui/stagger";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/page-header";
import { PlaceholderBlock } from "@/components/site/placeholder-block";
import { CtaBlock } from "@/components/site/cta-block";
import {
  DataPanel,
  MetricTile,
  ProgressRing,
  BarSeries,
} from "@/components/ui/data-viz";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Delivered outcomes across the three advisory verticals — abatement placed, inventories verified, and compliance exposure reduced. Figures are published only once they have been through assurance.",
  /* Off the index until the figures below are real. A page whose headline
     numbers are shaped placeholders should not be competing in search for
     "climate impact" — remove this key in the same change that lands the
     verified data. */
  robots: { index: false, follow: true },
};

/**
 * SCAFFOLD — READ BEFORE PUBLISHING THIS PAGE.
 *
 * The structure here is finished; the numbers are not. Every figure below is a
 * SHAPE showing what the page will look like once assurance-backed results
 * exist, and each renders behind an "Illustrative" chip (see the sourcing note
 * at the top of components/ui/data-viz.tsx).
 *
 * This site holds a strict line against unverifiable figures — the same line
 * taken in lib/advisory.ts and on /company, where the forward-looking client
 * and tCO₂e ambitions from the company one-pager were deliberately left off.
 * An impact page is exactly where that line matters most: it is the page a
 * diligence reader opens first.
 *
 * TO PUBLISH:
 *   1. Replace ILLUSTRATIVE_HEADLINE / ABATEMENT_SPLIT / TARGET_RINGS with
 *      assurance-backed figures, and pass `illustrative={false}` to each.
 *   2. Replace the two <PlaceholderBlock> case studies with signed-off write-ups.
 *   3. Drop the `robots` key from the metadata above.
 * Until all three are done, this page stays off the index.
 */

/** Headline counters. Shapes only — see the note above. */
const ILLUSTRATIVE_HEADLINE = [
  {
    label: "tCO₂e mitigated",
    value: "0",
    caption:
      "Cumulative verified abatement from deployed transition assets, counted only after third-party verification.",
  },
  {
    label: "Inventories verified",
    value: "0",
    caption:
      "Scope 1-3 baselines built to survive assurance and traced back to meter and grid-operator records.",
  },
  {
    label: "CBAM exposure modelled",
    value: "€0",
    caption:
      "Certificate cost identified and mitigated ahead of surrender obligations for EU-bound consignments.",
  },
  {
    label: "CCTS credits originated",
    value: "0",
    caption:
      "Tradeable instruments generated from verified over-performance against emission-intensity targets.",
  },
] as const;

/** Where abatement sits across the three verticals. Shape only. */
const ABATEMENT_SPLIT = [
  { label: "Oil, Gas & Energy", value: 0, readout: "— tCO₂e" },
  { label: "Manufacturing & Export", value: 0, readout: "— tCO₂e" },
  { label: "Urban Local Bodies", value: 0, readout: "— tCO₂e" },
] as const;

/** Progress against client reduction targets. Shape only. */
const TARGET_RINGS = [
  {
    value: 0,
    label: "Against client reduction targets",
    caption: "Weighted by baseline tonnage across active engagements.",
  },
  {
    value: 0,
    label: "Assets clearing hurdle rate",
    caption: "Share of deployed transition assets meeting underwritten ROI.",
  },
  {
    value: 0,
    label: "Inventories passing first assurance",
    caption: "Baselines accepted by the reviewer without a re-work cycle.",
  },
] as const;

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Impact"
        title="Measured, verified, and then published."
        lede="Abatement only counts once someone independent has agreed it happened. This page carries the delivered numbers behind our engagements — and carries nothing until it has been through assurance."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Impact" }]}
      >
        <Button href="/#briefing" variant="primary" size="lg">
          Schedule a briefing
        </Button>
        <Button href="/exposure" variant="outline" size="lg">
          Model your own exposure
        </Button>
      </PageHeader>

      {/* ===================== Headline counters ===================== */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-16 sm:py-20 lg:py-28">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Delivered to date</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                The numbers, and where each one comes from.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lead text-ink-600">
                Each figure below is tied to a named method and a verification
                step. Where a number is still being assured, it reads as zero
                rather than as an estimate.
              </p>
            </Reveal>
          </div>

          <StaggerGroup
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            step={0.08}
          >
            {ILLUSTRATIVE_HEADLINE.map((metric) => (
              <StaggerChild key={metric.label} className="h-full">
                <MetricTile
                  label={metric.label}
                  value={metric.value}
                  caption={metric.caption}
                />
              </StaggerChild>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* ===================== Rings + split ===================== */}
      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-16 sm:py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-5">
              <Reveal>
                <Eyebrow>Against target</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  Progress is a ratio, not a headline.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-lead text-ink-600">
                  A tonne abated means little without the baseline it came off.
                  These three ratios are the ones a lender&apos;s reviewer asks
                  for, so they are the ones we report.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-10">
                  <DataPanel
                    title="Abatement by vertical"
                    meta="Cumulative · verified only"
                  >
                    <div className="p-6">
                      <BarSeries bars={ABATEMENT_SPLIT} illustrative={false} />
                    </div>
                  </DataPanel>
                </div>
              </Reveal>
            </div>

            <div className="min-w-0 lg:col-span-6 lg:col-start-7">
              <StaggerGroup className="grid gap-10 sm:grid-cols-3" step={0.1}>
                {TARGET_RINGS.map((ring) => (
                  <StaggerChild key={ring.label}>
                    <ProgressRing
                      value={ring.value}
                      label={ring.label}
                      caption={ring.caption}
                    />
                  </StaggerChild>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== Case studies ===================== */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-16 sm:py-20 lg:py-28">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Case studies</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                What an engagement actually changed.
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <PlaceholderBlock
                title="Manufacturing & Export case study"
                needs={[
                  "Client sign-off on naming, or an agreed anonymised descriptor",
                  "Verified before / after Product Carbon Footprint at SKU level",
                  "The CBAM certificate exposure avoided, with the modelling basis stated",
                  "Assurance provider and the date of the opinion",
                ]}
              >
                A CBAM engagement written up end to end — the baseline as found,
                what the inventory changed, and the certificate cost that did
                not have to be surrendered as a result.
              </PlaceholderBlock>
            </Reveal>

            <Reveal delay={0.08}>
              <PlaceholderBlock
                title="Oil, Gas & Energy case study"
                needs={[
                  "Client sign-off on naming, or an agreed anonymised descriptor",
                  "Asset type, installed capacity and commissioning date",
                  "Underwritten ROI against the hurdle rate it had to clear",
                  "Verified abatement and any CCTS credits issued against it",
                ]}
              >
                A transition asset from underwriting through commissioning — the
                return it was built to clear, and the verified abatement and
                credits it has originated since.
              </PlaceholderBlock>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}
