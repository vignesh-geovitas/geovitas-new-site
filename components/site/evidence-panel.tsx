import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { StaggerGroup, StaggerChild } from "@/components/ui/stagger";
import { ArrowRight } from "@/components/ui/button";
import {
  DataPanel,
  MetricTile,
  ProgressRing,
  BarSeries,
} from "@/components/ui/data-viz";

/**
 * Homepage data-visualisation band — the section that shows, rather than
 * asserts, that there is an instrument under the advisory work.
 *
 * WHY THE FIGURES HERE ARE NON-ZERO AND THE ONES ON /impact ARE NOT.
 * There are two different kinds of number on this site and they are held to
 * different standards:
 *
 *   - What the PRODUCT PRODUCES. A shape, demonstrating the form of an output.
 *     Illustrative figures are legitimate here so long as they are chipped as
 *     such — this is the same licence platform-mockup.tsx already takes with its
 *     Scope 1/2/3 panel, and it is what lets the section look like software
 *     rather than an empty frame.
 *
 *   - What GEOVITAS HAS DELIVERED. A claim about the firm, and subject to the
 *     strict line this site holds against unverifiable figures. /impact reads
 *     zero until assurance-backed results exist, and says so.
 *
 * Do not move numbers from the first category into the second. If a figure
 * below ever starts being read as a delivered result, chip it harder or pull it.
 */

/** Illustrative product output — the shape of a verified inventory. */
const SCOPE_SPLIT = [
  { label: "Scope 1 · direct", value: 12480, readout: "12,480 tCO₂e" },
  { label: "Scope 2 · purchased", value: 30152, readout: "30,152 tCO₂e" },
  { label: "Scope 3 · value chain", value: 107368, readout: "107,368 tCO₂e" },
] as const;

const TILES = [
  {
    label: "Inventory coverage",
    value: "94%",
    delta: "+11 pts vs. baseline",
    caption: "Share of consumption traced to primary source data, not estimates.",
    series: [42, 51, 58, 63, 71, 80, 88, 94],
  },
  {
    label: "Reporting cycle",
    value: "6 weeks",
    delta: "−9 weeks",
    caption: "From close to assurance-ready position, once the pipeline is live.",
    series: [15, 14, 12, 11, 9, 8, 7, 6],
  },
] as const;

export function EvidencePanel() {
  return (
    <section
      id="evidence"
      className="scroll-mt-20 border-t border-ink-200 bg-white"
    >
      <Container className="py-16 sm:py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---- Copy ---- */}
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <Eyebrow>The evidence base</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                Every claim traces back to a meter.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lead text-ink-600">
                Advisory judgement is only as good as the inventory underneath
                it. Green Factory 360 AI builds that inventory from primary
                data — so the position you report is one an assurance provider
                can follow back to source without a re-work cycle.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10">
                <DataPanel
                  title="Verified inventory"
                  meta="Scope 1-3 · FY26 baseline"
                >
                  <div className="p-6">
                    {/* The panel chrome already carries the Illustrative chip,
                        so the series inside does not repeat it. */}
                    <BarSeries bars={SCOPE_SPLIT} illustrative={false} />
                  </div>
                </DataPanel>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <Link
                href="/platform"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-ink-950 transition-colors duration-200 hover:text-brand-cyan-ink"
              >
                How the platform builds it
                <ArrowRight className="transition-transform duration-300 ease-brand group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {/* ---- Instruments ---- */}
          <div className="min-w-0 lg:col-span-6 lg:col-start-7">
            <StaggerGroup className="grid gap-6 sm:grid-cols-2" step={0.08}>
              {TILES.map((tile) => (
                <StaggerChild key={tile.label} className="h-full">
                  <MetricTile
                    label={tile.label}
                    value={tile.value}
                    delta={tile.delta}
                    caption={tile.caption}
                    series={tile.series}
                  />
                </StaggerChild>
              ))}
            </StaggerGroup>

            <Reveal delay={0.2}>
              <div className="mt-6 rounded-card border border-ink-200 bg-ink-50 p-8">
                <ProgressRing
                  value={68}
                  label="Against the SBTi pathway"
                  caption="Illustrative drawdown across a full compliance window."
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
