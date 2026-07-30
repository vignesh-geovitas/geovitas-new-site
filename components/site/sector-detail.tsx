import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { StaggerGroup, StaggerChild, StaggerList, StaggerItem } from "@/components/ui/stagger";
import { Button, ArrowRight } from "@/components/ui/button";
import { Parallax } from "@/components/ui/parallax";
import { PageHeader } from "@/components/site/page-header";
import { CtaBlock } from "@/components/site/cta-block";
import type { Sector } from "@/lib/sectors";

/**
 * One renderer for every /sectors/[slug] detail page — the three route files are
 * just metadata plus <SectorDetail sector={...} />, so a change to the layout
 * lands on all three at once. Content comes entirely from lib/sectors.ts.
 *
 * Structure holds the site's paper/white chapter rhythm under the PageHeader:
 *   header (light mesh) → context (white) → drivers (paper) → deliverables
 *   (white) → CtaBlock (dark anchor).
 */
export function SectorDetail({ sector }: { sector: Sector }) {
  return (
    <>
      <PageHeader
        eyebrow={sector.mode}
        title={sector.practice}
        lede={sector.lede}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Sectors", href: "/sectors" },
          { label: sector.practice },
        ]}
      >
        <Button href="#briefing" variant="primary" size="lg">
          Schedule a briefing
        </Button>
        {sector.related[0] && (
          <Button href={sector.related[0].href} variant="outline" size="lg">
            {sector.related[0].label}
          </Button>
        )}
      </PageHeader>

      {/* ---- Context ---- */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <h2 className="text-h2 font-bold text-ink-950">{sector.headline}</h2>
              </Reveal>
              <div className="mt-6 space-y-5">
                {sector.context.map((paragraph, index) => (
                  <Reveal key={index} delay={0.06 + index * 0.05}>
                    <p className="text-lead text-ink-600">{paragraph}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <Reveal y={24}>
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-card border border-ink-200 shadow-panel">
                  {/* Counter-scroll inside the fixed crop. The figure clips, so
                      Parallax's overscan is what keeps the frame full at both
                      ends of the travel. */}
                  <Parallax className="absolute inset-0" speed={0.07}>
                    <div className="relative h-full w-full">
                      <Image
                        src={sector.image}
                        alt={sector.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-brand
                                   group-hover:scale-[1.03]"
                      />
                    </div>
                  </Parallax>
                  {/* Brand wash — the same family treatment as the homepage
                      sector cards, so the photography reads as one system. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-ink-950/5 to-transparent"
                  />
                  <div aria-hidden className="absolute inset-0 bg-brand-cyan/10" />
                  <figcaption className="glass absolute bottom-4 left-4 rounded-md px-3 py-1.5 font-mono text-eyebrow uppercase text-ink-600">
                    {sector.mode}
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Drivers ---- */}
      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>What&apos;s driving this</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">The forces at work.</h2>
            </Reveal>
          </div>

          <StaggerGroup
            className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2"
            step={0.08}
          >
            {sector.drivers.map((driver) => (
              <StaggerChild key={driver.title} className="pt-6">
                <span
                  aria-hidden
                  className="brand-gradient block h-0.5 w-8 rounded-full"
                />
                <h3 className="mt-4 text-[0.9375rem] font-bold text-ink-950">
                  {driver.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                  {driver.body}
                </p>
              </StaggerChild>
            ))}
          </StaggerGroup>

          <Reveal delay={0.12}>
            <p className="mt-12 border-t border-ink-200 pt-5 text-xs leading-relaxed text-ink-500">
              Sources: Regulation (EU) 2023/956 establishing the Carbon Border Adjustment
              Mechanism &middot; SEBI BRSR Core framework &middot; Carbon Credit Trading
              Scheme, Ministry of Power / Bureau of Energy Efficiency. Regulatory position
              as at Q3 2026.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ---- Deliverables ---- */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>What we deliver</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  What an engagement leaves behind.
                </h2>
              </Reveal>
              {sector.related.length > 0 && (
                <Reveal delay={0.12}>
                  <div className="mt-8 flex flex-col gap-3">
                    {sector.related.map((link) => (
                      <Button
                        key={link.href}
                        href={link.href}
                        variant="outline"
                        size="md"
                        className="justify-between"
                      >
                        {link.label}
                        <ArrowRight />
                      </Button>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <StaggerList className="space-y-0">
                {sector.deliverables.map((deliverable) => (
                  <StaggerItem
                    key={deliverable}
                    className="flex gap-4 border-t border-ink-200 py-5 first:border-t-0 first:pt-0 text-[0.9375rem] leading-relaxed text-ink-600"
                  >
                    <span aria-hidden className="brand-gradient mt-2.5 h-px w-4 shrink-0" />
                    <span>{deliverable}</span>
                  </StaggerItem>
                ))}
              </StaggerList>
            </div>
          </div>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}
