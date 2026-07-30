import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { StaggerList, StaggerItem } from "@/components/ui/stagger";
import { Button, ArrowRight } from "@/components/ui/button";
import { PlatformMockup } from "@/components/ui/platform-mockup";
import { Parallax } from "@/components/ui/parallax";
import { Marquee } from "@/components/ui/marquee";

/**
 * Green Factory 360 AI.
 *
 * Positioned deliberately AFTER the sector practices: the platform is the
 * instrumentation layer underneath the advisory and infrastructure work, not
 * the thing being sold. Leading with it would collapse Geovitas into the
 * carbon-software category the rest of the page is working to stay out of.
 */

/** One inventory, mapped outward. This is the platform's whole argument. */
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
    title: "Scope 1-3 tracking, automated",
    body: "The platform ingests meter, invoice, ERP and logistics data on a continuous basis and calculates against current emission factors. Inventory stops being an annual project.",
    icon: <PulseIcon />,
  },
  {
    title: "Primary data over estimates",
    body: "Supplier-specific figures are collected and validated in-platform, then replace spend-based estimates line by line. Every substitution is versioned.",
    icon: <LayersIcon />,
  },
  {
    title: "Traceable to source",
    body: "Each figure carries a reference an assurance provider can follow back to the meter, the invoice, or the grid operator — the difference between a report and an audit-grade baseline.",
    icon: <TrailIcon />,
  },
];

export function Platform() {
  return (
    <section
      id="platform"
      className="gv-grid-pan relative scroll-mt-20 overflow-hidden border-t border-ink-200 bg-white"
      /* Faint geospatial dot-grid across the whole band — environmental data
         points scattered under the whitepaper layout. The radial-gradient rides
         on the section's own background, behind every child. `gv-grid-pan`
         creeps the tile's background-position rather than moving the box, so
         the texture drifts and the layout never shifts. */
      style={{
        backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Localised brand glow behind the mockup rather than a full-section
          mesh — the energy belongs where the product is, and the surrounding
          bands stay clean. The two blobs drift out of phase and the aurora
          filter walks the hue a few degrees, so the glow reads as atmosphere
          rather than as a static airbrush. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="gv-aurora absolute inset-0">
          <div className="gv-blob-b absolute top-24 -right-32 h-[34rem] w-[34rem] rounded-full bg-brand-teal opacity-20 blur-3xl" />
          <div className="gv-blob-c absolute top-1/2 right-1/4 h-[24rem] w-[24rem] rounded-full bg-brand-green opacity-15 blur-3xl" />
        </div>
      </div>

      <Container className="relative py-16 sm:py-20 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ================= Left: copy and benefits ================= */}
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>The platform</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                Powered by{" "}
                <span className="brand-gradient-text">Green Factory 360 AI</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lead text-ink-600">
                Our proprietary platform is the measurement layer underneath every
                engagement. It automates Scope 1, 2 and 3 tracking against live
                operational data, and maps a single verified inventory to every framework
                you report against — so the same tonne is never counted twice, or counted
                differently for two regulators.
              </p>
            </Reveal>

            <StaggerList className="mt-10 space-y-6" step={0.09}>
              {CAPABILITIES.map((capability) => (
                <StaggerItem key={capability.title} className="flex gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
                               border border-ink-200 bg-white text-brand-cyan-ink shadow-card"
                  >
                    {capability.icon}
                  </span>
                  <div>
                    <h3 className="text-[0.9375rem] font-bold text-ink-950">
                      {capability.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                      {capability.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerList>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/#briefing" variant="accent" size="lg">
                  Book a Platform Demo
                  <ArrowRight />
                </Button>
                <Button href="/#exposure" variant="outline" size="lg">
                  See the model at work
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ================= Right: product mockup =================
              Allowed to run past the content column on wide viewports so the
              product reads as the section's centre of gravity. Only from xl,
              where the container is capped and there is gutter to spend — at
              lg the column already touches the edge and this would clip. */}
          <div className="lg:col-span-6 xl:-mr-10 2xl:-mr-16">
            {/* Gentle counter-scroll on the product itself. Low speed and no
                overscan — the mockup is not clipped, so growing it would only
                soften the chrome. */}
            <Parallax speed={0.04} overscan={false}>
              <PlatformMockup />
            </Parallax>

            {/* One inventory, mapped outward — restated under the product so
                the claim sits next to the thing that makes it. Set as a ticker
                to echo the hero's framework rail. */}
            <Reveal delay={0.2}>
              <div className="glass mt-6 rounded-card px-6 py-5">
                <p className="font-mono text-eyebrow uppercase text-ink-500">
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
        </div>
      </Container>
    </section>
  );
}

/* -- Icons ---------------------------------------------------------------- */

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

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M5 5h9a4 4 0 010 8H8a4 4 0 000 8h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="5" cy="5" r="1.6" fill="currentColor" />
      <circle cx="19" cy="21" r="1.6" fill="currentColor" />
    </svg>
  );
}
