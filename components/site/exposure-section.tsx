import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight } from "@/components/ui/button";
import { ExposureCalculator } from "@/components/site/exposure-calculator";
import { ImageSlot } from "@/components/ui/image-slot";
import { Parallax } from "@/components/ui/parallax";

/**
 * Secondary proof point, placed deliberately late. The calculator is not the
 * offer — it demonstrates that the modelling behind the offer is real, and
 * hands the visitor a number they now want explained, which is the job of the
 * briefing block immediately below it.
 */
export function ExposureSection() {
  return (
    <section id="exposure" className="scroll-mt-20 border-t border-ink-200 bg-ink-50">
      <Container className="py-16 sm:py-20 lg:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Regulatory exposure model</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                Calculate your regulatory exposure.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lead text-ink-600">
                Certificate obligations scale with the gap between your emissions intensity
                and the product benchmark — and with the phase-out of free allocation
                through 2034. Move the inputs to see where the liability lands.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <Link
              href="/exposure"
              className="inline-flex items-center gap-2 text-sm font-bold text-ink-950
                         transition-colors duration-200 hover:text-brand-cyan-ink"
            >
              Methodology and assumptions
              <ArrowRight />
            </Link>
          </Reveal>
        </div>

        {/* A wide plate of the thing the model is actually about — the border
            the certificates are surrendered at — before the tool itself. It
            gives the section a subject, and it separates the two dense text
            blocks either side of the calculator. */}
        <Reveal y={24} className="mt-12">
          <Parallax className="overflow-hidden rounded-card" speed={0.05}>
            <ImageSlot id="exposure-border" sizes="100vw" aspect="21/9" />
          </Parallax>
        </Reveal>

        <Reveal delay={0.2} y={24} className="mt-8">
          <ExposureCalculator />
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-6 max-w-4xl text-xs leading-relaxed text-ink-500">
            <span className="font-bold text-ink-600">Indicative only.</span> This model
            applies published EU ETS product benchmarks and the CBAM phase-in schedule
            under Regulation (EU) 2023/956 to volumes and intensities you supply. It is a
            scoping aid for executive discussion, not a compliance determination. Actual
            obligations depend on verified installation-level embedded emissions, any
            carbon price already paid in the country of origin, and your declarant&apos;s
            verified data.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
