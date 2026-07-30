import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Button, ArrowRight } from "@/components/ui/button";
import { BrandMesh } from "@/components/ui/brand-mesh";
import { StaggerList, StaggerItem } from "@/components/ui/stagger";

const AGENDA = [
  "Your CBAM certificate exposure under the current phase-in schedule",
  "SEBI BRSR Core data gaps that will block reasonable assurance",
  "CCTS credit origination potential against verified reductions",
  "Where physical abatement clears your hurdle rate — and where it does not",
] as const;

/**
 * The page's single dark surface, and its last frame.
 *
 * Kept as an inset card on the white canvas rather than a full-bleed band: a
 * full-bleed dark footer would read as the old theme reasserting itself, while
 * an inset block reads as deliberate punctuation. The brand mesh runs here too,
 * inverted — the page opens and closes on the same gesture.
 */
export function CtaBlock() {
  return (
    <section id="briefing" className="scroll-mt-20 bg-white pt-8 pb-16 sm:pb-24 lg:pb-32">
      <Container>
        <Reveal y={24}>
          <div className="relative overflow-hidden rounded-[1.25rem] bg-ink-950 px-6 py-10 sm:px-7 sm:py-14 lg:px-14 lg:py-20">
            <BrandMesh variant="dark" />
            <span aria-hidden className="brand-gradient absolute inset-x-0 top-0 h-px" />

            <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <Eyebrow tone="dark">Executive briefing</Eyebrow>
                <h2 className="mt-6 text-h2 font-bold text-white">
                  Quantify your exposure before your regulator does.
                </h2>
                <p className="mt-5 max-w-lg text-lead text-ink-300">
                  Forty-five minutes with our practice leads. You leave with a written
                  position on your regulatory exposure and the specific data gaps standing
                  between you and assurance.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href="mailto:venu@geovitas.com?subject=Executive%20briefing%20request"
                    variant="onDark"
                    size="lg"
                  >
                    Schedule Executive Briefing
                    <ArrowRight />
                  </Button>
                  <Button
                    href="mailto:venu@geovitas.com?subject=Green%20Factory%20360%20AI%20platform%20demo"
                    variant="onDarkOutline"
                    size="lg"
                  >
                    Book a Platform Demo
                  </Button>
                </div>
              </div>

              {/* Agenda lifted onto glass so the mesh reads through it. */}
              <div className="glass-dark rounded-card p-7 lg:p-8">
                <p className="font-mono text-eyebrow uppercase text-ink-400">
                  What we cover
                </p>
                <StaggerList className="mt-6 space-y-5">
                  {AGENDA.map((item, index) => (
                    <StaggerItem
                      key={item}
                      className="flex gap-4 border-b border-white/10 pb-5 last:border-b-0 last:pb-0"
                    >
                      <span className="tnum shrink-0 font-mono text-sm text-brand-cyan">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-ink-200">
                        {item}
                      </span>
                    </StaggerItem>
                  ))}
                </StaggerList>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
