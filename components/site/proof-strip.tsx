import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { StaggerGroup, StaggerChild } from "@/components/ui/stagger";
import { CountUp } from "@/components/ui/count-up";

/**
 * Externally verifiable regulatory facts only. No performance claims, no
 * client outcomes, no savings percentages — every figure here can be checked
 * against the cited instrument, which is the point. Client-side proof lives in
 * `social-proof.tsx` and stays separate from it by design.
 */
const FACTS = [
  {
    figure: "2026",
    label: "CBAM definitive regime in force",
    detail:
      "EU importers of covered goods now carry certificate obligations for embedded emissions.",
  },
  {
    figure: "6",
    label: "Goods categories in CBAM scope",
    detail: "Cement, iron & steel, aluminium, fertilisers, electricity, and hydrogen.",
  },
  {
    figure: "1,000",
    label: "Listed entities phased into BRSR Core",
    detail:
      "India's largest listed companies by market capitalisation, with assurance obligations.",
  },
  {
    figure: "9",
    label: "Obligated sectors under CCTS",
    detail:
      "Emission intensity targets notified for compliance entities, with tradeable credits.",
  },
] as const;

export function ProofStrip() {
  return (
    <section className="border-t border-ink-200 bg-white">
      <Container className="py-10 sm:py-12 lg:py-16">
        <StaggerGroup
          className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          step={0.08}
        >
          {FACTS.map((fact, index) => (
            <StaggerChild
              key={fact.figure + fact.label}
              className="lg:border-l lg:border-ink-200 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              {/* The figure rolls in on scroll. It ships server-rendered at its
                  final value, so it is never briefly wrong — see count-up.tsx.
                  The delay tracks the stagger so the four do not fire at once. */}
              <p className="tnum brand-gradient-text font-mono text-[2rem] leading-none font-bold sm:text-[2.5rem]">
                <CountUp value={fact.figure} delay={index * 0.08} />
              </p>
              <p className="mt-3 text-sm font-bold text-ink-950">{fact.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{fact.detail}</p>
            </StaggerChild>
          ))}
        </StaggerGroup>

        <Reveal delay={0.24}>
          <p className="mt-12 border-t border-ink-200 pt-5 text-xs leading-relaxed text-ink-500">
            Sources: Regulation (EU) 2023/956 establishing the Carbon Border Adjustment
            Mechanism &middot; SEBI BRSR Core framework &middot; Carbon Credit Trading
            Scheme, Ministry of Power / Bureau of Energy Efficiency. Regulatory position
            as at Q3 2026.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
