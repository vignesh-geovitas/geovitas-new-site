import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealRule } from "@/components/ui/reveal";
import { StaggerList, StaggerItem } from "@/components/ui/stagger";
import { ImageSlot } from "@/components/ui/image-slot";
import { Parallax } from "@/components/ui/parallax";

const STEPS = [
  {
    index: "01",
    title: "Measure",
    lead: "Audit-grade Scope 1, 2, and 3 inventory, traceable to utility and RTO source records.",
    detail:
      "Primary data over estimation. Every figure carries a source reference an assurance provider can follow back to the meter, the invoice, or the grid operator.",
  },
  {
    index: "02",
    title: "Comply",
    lead: "Lowest-cost pathways for CBAM, SEBI BRSR Core, and SBTi targets.",
    detail:
      "One inventory, mapped to every framework you report against. Pathways are ranked by cost per tonne abated, not by ease of disclosure.",
  },
  {
    index: "03",
    title: "Deliver",
    lead: "Monetize reductions via CCTS carbon credits, green finance terms, and export eligibility.",
    detail:
      "Verified reductions convert into tradeable instruments, improved lending terms, and continued access to regulated export markets.",
  },
] as const;

export function Process() {
  return (
    <section id="approach" className="scroll-mt-20 bg-white">
      <Container className="py-16 sm:py-20 lg:py-32">
        {/* Copy and photograph share the top of the section. The section used to
            open on three columns of text under a heading, which is precisely
            where the page felt heaviest. */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>The engagement model</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                Measure. Comply. Deliver.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lead text-ink-600">
                A sequence, not a menu. Compliance built on an inventory that cannot be
                defended is a liability, and monetization built on unverified reductions
                does not survive contact with a buyer&apos;s auditor.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal y={24}>
              <Parallax className="overflow-hidden rounded-card" speed={0.06}>
                <ImageSlot id="process-engagement" sizes="(min-width: 1024px) 40vw, 100vw" />
              </Parallax>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-16">
          {/* Connector draws itself across the row as the section enters. */}
          <div className="absolute inset-x-0 top-[1.375rem] hidden lg:block">
            <RevealRule className="opacity-30" delay={0.2} />
          </div>

          {/* StaggerList renders the <ol> itself so each <li> stays a direct
              child — wrapping items in a plain <div> makes the parser hoist
              them out of the list. */}
          <StaggerList
            ordered
            className="grid gap-12 lg:grid-cols-3 lg:gap-10"
            step={0.12}
          >
            {STEPS.map((step) => (
              <StaggerItem key={step.index} className="relative">
                <div className="flex items-center gap-4 bg-white lg:pr-6">
                  <span
                    className="tnum flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                               border border-brand-cyan/35 bg-white font-mono text-sm font-bold
                               text-brand-cyan-ink shadow-card"
                  >
                    {step.index}
                  </span>
                  <h3 className="text-h3 font-bold text-ink-950">{step.title}</h3>
                </div>

                <p className="mt-6 text-[0.9375rem] leading-relaxed font-bold text-ink-950">
                  {step.lead}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{step.detail}</p>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </Container>
    </section>
  );
}
