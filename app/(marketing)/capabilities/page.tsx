import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { ImageSlot } from "@/components/ui/image-slot";
import { Button, ArrowRight } from "@/components/ui/button";
import { PageHeader } from "@/components/site/page-header";
import { CtaBlock } from "@/components/site/cta-block";
import { CAPABILITIES } from "@/lib/capabilities";

export const metadata: Metadata = {
  title: "Transition Capabilities",
  description:
    "The three physical assets behind the Oil, Gas & Energy practice — petroleum cold cracking, compressed biogas project development, and microalgae carbon capture — each underwritten to hurdle-rate ROI before capital is committed.",
};

/**
 * Index for the three energy-transition capabilities.
 *
 * Deliberately thin. Everything substantive lives on the detail pages, and the
 * job here is to make the choice between them obvious — which is why each card
 * leads with the mode of delivery rather than with the technology name. Content
 * comes from lib/capabilities.ts, so this page cannot drift from the three it
 * links to.
 */
export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Energy transition"
        title="Three assets. One test."
        lede="Abatement that does not clear your cost of capital does not get built. These are the three transition assets we engineer, underwrite and deploy — each against the same return test as any other capital project, and each originating the credits it earns."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Transition capabilities" },
        ]}
      >
        <Button href="/advisory/energy-transition" variant="primary" size="lg">
          The Oil, Gas &amp; Energy practice
          <ArrowRight />
        </Button>
        <Button href="/approach" variant="outline" size="lg">
          How we work
        </Button>
      </PageHeader>

      {/* ===================== The three ===================== */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>What we deploy</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                Physical infrastructure, not a pledge.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lead text-ink-600">
                Each of these removes a cost the operator is already carrying —
                a yield gap, a disposal liability, an unpriced emission — and
                leaves behind a verified reduction that can be sold. That is the
                only version of the energy transition that survives an
                investment committee.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {CAPABILITIES.map((capability, index) => (
              <TiltCard
                key={capability.slug}
                delay={index * 0.08}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-ink-200
                           bg-white shadow-card
                           transition-colors duration-300 ease-brand hover:border-brand-cyan/50"
              >
                {/* Same photograph the detail page opens on, cropped to 16:9.
                    Compact placeholder while the art is outstanding — the full
                    brief belongs on the detail page, not repeated in a tile. */}
                <ImageSlot
                  id={capability.imageSlot}
                  aspect="16/9"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  caption={false}
                  compact
                  chrome={false}
                />

                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="tnum font-mono text-sm font-bold text-brand-cyan-ink">
                      {capability.index}
                    </span>
                    <span className="font-mono text-eyebrow uppercase text-ink-500">
                      {capability.mode}
                    </span>
                  </div>
                  <span aria-hidden className="brand-gradient mt-5 block h-px w-10" />

                  <h3 className="mt-6 text-h3 font-bold text-ink-950">
                    {capability.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">
                    {capability.cardBody}
                  </p>

                  {/* mt-auto pins the action to the card foot, so three cards of
                      unequal copy length still line their links up. */}
                  <div className="mt-auto pt-7">
                    <Link
                      href={`/capabilities/${capability.slug}`}
                      className="inline-flex items-center gap-2 text-[0.9375rem] font-bold text-ink-950
                                 transition-colors duration-200 hover:text-brand-cyan-ink"
                    >
                      {capability.shortName}
                      <ArrowRight className="transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================== Where they sit ===================== */}
      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-5">
              <Reveal>
                <Eyebrow>Where these sit</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  Under one practice.
                </h2>
              </Reveal>
            </div>

            <div className="min-w-0 lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="text-lead text-ink-600">
                  All three belong to the Oil, Gas &amp; Energy practice, which
                  is where the physical work of the business happens. The
                  measurement layer beneath them is the same one every other
                  engagement runs on — an asset that cannot prove what it abated
                  originates no credits and satisfies no regulator.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href="/advisory/energy-transition"
                    variant="outline"
                    size="md"
                    className="justify-between"
                  >
                    Oil, Gas &amp; Energy
                    <ArrowRight />
                  </Button>
                  <Button
                    href="/advisory"
                    variant="outline"
                    size="md"
                    className="justify-between"
                  >
                    All three practices
                    <ArrowRight />
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}
