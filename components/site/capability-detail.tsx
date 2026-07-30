import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import {
  StaggerGroup,
  StaggerChild,
  StaggerList,
  StaggerItem,
} from "@/components/ui/stagger";
import { TiltCard } from "@/components/ui/tilt-card";
import { CountUp } from "@/components/ui/count-up";
import { ImageSlot } from "@/components/ui/image-slot";
import { Parallax } from "@/components/ui/parallax";
import { Button, ArrowRight } from "@/components/ui/button";
import { BrandMesh } from "@/components/ui/brand-mesh";
import { PageHeader } from "@/components/site/page-header";
import { CtaBlock } from "@/components/site/cta-block";
import { mailto } from "@/lib/contact";
import type { Capability } from "@/lib/capabilities";

/**
 * One renderer for every /capabilities/[slug] page — the three route files are
 * metadata plus <CapabilityDetail capability={...} />, so a layout change lands
 * on all three at once. This is the same arrangement SectorDetail has with
 * lib/advisory.ts, and content comes entirely from lib/capabilities.ts.
 *
 * NO PHOTOGRAPHY, DELIBERATELY. The sector pages carry an Unsplash placeholder
 * while licensed imagery is outstanding; repeating that here would have meant
 * three more stand-in photographs of equipment these pages describe precisely.
 * The technology instead sits on the page's one dark surface — the same gesture
 * the closing anchor uses — which reads as intent rather than as an image that
 * has not arrived yet.
 *
 * Chapter rhythm under the header: white (signals) -> paper (the problem and
 * the technology) -> white (who it is for) -> paper (the sequence) -> white
 * (what changes hands) -> paper (regulatory anchors) -> dark CtaBlock.
 */
export function CapabilityDetail({ capability }: { capability: Capability }) {
  return (
    <>
      <PageHeader
        eyebrow={`Energy transition · ${capability.mode}`}
        title={capability.name}
        lede={capability.lede}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Transition capabilities", href: "/capabilities" },
          { label: capability.shortName },
        ]}
      >
        <Button
          href={mailto(capability.enquirySubject)}
          variant="primary"
          size="lg"
        >
          Talk to an engineer
          <ArrowRight />
        </Button>
        <Button href="/advisory/energy-transition" variant="outline" size="lg">
          The Oil, Gas &amp; Energy practice
        </Button>
      </PageHeader>

      {/* ===================== Policy signals ===================== */}
      {/* Externally verifiable figures only, each checkable against the source
          line beneath — the discipline components/site/proof-strip.tsx sets. */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-10 sm:py-12 lg:py-16">
          {/* Three across only from md. At the sm breakpoint each column is
              ~190px, and "Schedule I" set at 2.5rem is wider than that — the
              figure would overflow its own cell. */}
          <StaggerGroup
            className="grid gap-x-10 gap-y-8 md:grid-cols-3"
            step={0.08}
          >
            {capability.signals.map((signal, index) => (
              <StaggerChild
                key={signal.label}
                className="md:border-l md:border-ink-200 md:pl-8 md:first:border-l-0 md:first:pl-0"
              >
                {/* CountUp leaves non-numeric figures — "Schedule I" — alone. */}
                <p className="tnum brand-gradient-text font-mono text-[2rem] leading-none font-bold sm:text-[2.5rem]">
                  <CountUp value={signal.figure} delay={index * 0.08} />
                </p>
                <p className="mt-3 text-sm font-bold text-ink-950">{signal.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {signal.detail}
                </p>
              </StaggerChild>
            ))}
          </StaggerGroup>

          <Reveal delay={0.24}>
            <p className="mt-12 border-t border-ink-200 pt-5 text-xs leading-relaxed text-ink-500">
              {capability.sources}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ===================== The problem, then the technology ============ */}
      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-5">
              <Reveal>
                <Eyebrow>The challenge</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  What it costs today.
                </h2>
              </Reveal>
            </div>

            <div className="min-w-0 lg:col-span-6 lg:col-start-7">
              <div className="space-y-5">
                {capability.challenge.map((paragraph, index) => (
                  <Reveal key={index} delay={index * 0.06}>
                    <p className="text-lead text-ink-600">{paragraph}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* The asset itself, full width under the problem it solves. These
              pages describe physical plant precisely and had nothing to show
              for it, which is most of why they read as dense. */}
          <Reveal y={24}>
            <Parallax className="mt-14 overflow-hidden rounded-card" speed={0.05}>
              <ImageSlot
                id={capability.imageSlot}
                sizes="(min-width: 1024px) 75rem, 100vw"
                caption={capability.shortName}
              />
            </Parallax>
          </Reveal>

          {/* The page's single dark surface. Inset rather than full-bleed, for
              the same reason the closing CTA block is: punctuation, not a
              second theme asserting itself. */}
          <Reveal y={24}>
            <div className="relative mt-14 overflow-hidden rounded-[1.25rem] bg-ink-950 px-7 py-12 lg:mt-16 lg:px-14 lg:py-16">
              <BrandMesh variant="dark" />
              <span
                aria-hidden
                className="brand-gradient absolute inset-x-0 top-0 h-px"
              />

              <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-16">
                <div className="min-w-0 lg:col-span-5">
                  <Eyebrow tone="dark">The technology</Eyebrow>
                  <h3 className="mt-6 text-h2 font-bold text-white">
                    {capability.technology.headline}
                  </h3>
                </div>
                <div className="min-w-0 lg:col-span-6 lg:col-start-7">
                  <p className="text-lead text-ink-300">
                    {capability.technology.body}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===================== Who it is for ===================== */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Who this is for</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                Where it pays for itself.
              </h2>
            </Reveal>
          </div>

          {/* Two audiences on the cold-cracking page, six on the others — the
              auto-fit track keeps both honest without a per-page override. */}
          <StaggerGroup
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            step={0.07}
          >
            {capability.audiences.map((audience) => (
              <StaggerChild key={audience.title} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-ink-200 bg-white p-6 shadow-card">
                  <span
                    aria-hidden
                    className="brand-gradient block h-0.5 w-8 rounded-full"
                  />
                  <h3 className="mt-5 text-[0.9375rem] font-bold text-ink-950">
                    {audience.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                    {audience.body}
                  </p>
                </div>
              </StaggerChild>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* ===================== The delivery sequence ===================== */}
      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-4">
              <Reveal>
                <Eyebrow>How it runs</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  The sequence.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-sm leading-relaxed text-ink-500">
                  Each stage produces something the next one is underwritten
                  against. Nothing is committed on a projection that has not
                  been validated at the site it will run on.
                </p>
              </Reveal>
            </div>

            <div className="min-w-0 lg:col-span-7 lg:col-start-6">
              <StaggerList className="space-y-0" ordered step={0.08}>
                {capability.stages.map((stage) => (
                  <StaggerItem
                    key={stage.index}
                    className="flex gap-6 border-t border-ink-200 py-6 first:border-t-0 first:pt-0"
                  >
                    <span className="tnum shrink-0 font-mono text-sm font-bold text-brand-cyan-ink">
                      {stage.index}
                    </span>
                    <div>
                      <h3 className="text-h3 font-bold text-ink-950">
                        {stage.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                        {stage.body}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerList>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== What changes hands ===================== */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-6">
              <Reveal>
                <Eyebrow>What we deliver</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  The documents.
                </h2>
              </Reveal>
              <StaggerList className="mt-9 space-y-0">
                {capability.deliverables.map((deliverable) => (
                  <StaggerItem
                    key={deliverable}
                    className="flex gap-4 border-t border-ink-200 py-5 first:border-t-0 first:pt-0 text-[0.9375rem] leading-relaxed text-ink-600"
                  >
                    <span
                      aria-hidden
                      className="brand-gradient mt-2.5 h-px w-4 shrink-0"
                    />
                    <span>{deliverable}</span>
                  </StaggerItem>
                ))}
              </StaggerList>
            </div>

            <div className="min-w-0 lg:col-span-5 lg:col-start-8">
              <Reveal>
                <div className="glass-strong rounded-card p-7 lg:p-8">
                  <p className="font-mono text-eyebrow uppercase text-ink-600">
                    What you are left holding
                  </p>
                  <StaggerList className="mt-6 space-y-5">
                    {capability.outcomes.map((outcome, index) => (
                      <StaggerItem
                        key={outcome}
                        className="flex gap-4 border-b border-ink-150 pb-5 last:border-b-0 last:pb-0"
                      >
                        <span className="tnum shrink-0 font-mono text-sm text-brand-cyan-ink">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[0.9375rem] leading-relaxed text-ink-600">
                          {outcome}
                        </span>
                      </StaggerItem>
                    ))}
                  </StaggerList>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== Regulatory anchors ===================== */}
      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-5">
              <Reveal>
                <Eyebrow>Why it is urgent</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  What it answers to.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-lead text-ink-600">
                  Three frameworks converge on the same asset — one that removes
                  a liability, one that lowers a cost at the border, and one that
                  turns the verified reduction into an instrument you can sell.
                </p>
              </Reveal>
            </div>

            <div className="min-w-0 lg:col-span-6 lg:col-start-7">
              <div className="grid gap-5">
                {/* glare off: these carry six lines of regulatory prose each,
                    and a moving highlight across body copy is unreadable. The
                    tilt alone gives them the depth. */}
                {capability.anchors.map((anchor, index) => (
                  <TiltCard
                    key={anchor.title}
                    delay={index * 0.08}
                    glare={false}
                    className="rounded-card border border-ink-200 bg-white p-6 shadow-card
                               transition-colors duration-300 ease-brand hover:border-brand-cyan/50"
                  >
                    <h3 className="text-h3 font-bold text-ink-950">{anchor.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">
                      {anchor.body}
                    </p>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>

          {/* The specific next step this capability asks for, ahead of the
              generic briefing the CtaBlock offers below. */}
          <Reveal delay={0.12}>
            <div className="mt-14 flex flex-col gap-6 border-t border-ink-200 pt-10 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-xl text-lead text-ink-600">
                {capability.enquiryPrompt}
              </p>
              <Button
                href={mailto(capability.enquirySubject)}
                variant="primary"
                size="lg"
                className="shrink-0"
              >
                Talk to an engineer
                <ArrowRight />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}
