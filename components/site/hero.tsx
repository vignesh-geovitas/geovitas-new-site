import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button, ArrowRight } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { BrandMesh } from "@/components/ui/brand-mesh";
import { FloatingCollage } from "@/components/ui/floating-collage";
import { Parallax } from "@/components/ui/parallax";
import { Marquee } from "@/components/ui/marquee";

/* Aerial forest canopy — the "physical world" the data reports on. Served
   through next/image; `images.unsplash.com` is already allowlisted in
   next.config.ts under pathname "/photo-**", so this src resolves with no
   further configuration. */
const FOREST_BG =
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2000&q=80";

/** Instruments we report against. Labels, not claims. */
const FRAMEWORKS = [
  "EU CBAM",
  "SEBI BRSR Core",
  "CCTS",
  "GHG Protocol",
  "SBTi",
] as const;

/**
 * The hero speaks as the firm, not as the product. Geovitas' largest
 * positioning risk is being read as another carbon-accounting SaaS, so the
 * copy here stays on infrastructure, advisory and monetisation, and the
 * platform appears only as chrome inside the collage — named, but not sold.
 *
 * LAYERING — an explicit z-index stack so the forest photograph reads through
 * the glass panels rather than sitting inert behind flat colour:
 *   z-0   the photograph      (next/image, `fill` + `object-cover`, preloaded)
 *   z-10  heavy dark wash      the readability floor for white type
 *   z-20  brand mesh glow      faded out toward the section join
 *   z-30  content              headline, lede and glassed UI
 *
 * NEXT 16 IMAGE API: `fill` + `object-cover` is the current form — `layout` and
 * `objectFit` were removed in Next 13 — and `preload` supersedes the now
 * deprecated `priority`. See node_modules/next/dist/docs/.../image.md.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink-950">
      {/* Layer 0 — the physical world, drifting against the scroll.
          The photograph is the only thing in the stack that moves on scroll;
          the washes and the mesh above it stay pinned, which is what separates
          the layers visually. Parallax overscales the inner layer, so the
          translation never exposes an edge. */}
      <Parallax className="absolute inset-0 z-0" speed={0.12}>
        <div className="relative h-full w-full">
          <Image src={FOREST_BG} alt="" fill preload sizes="100vw" className="object-cover" />
        </div>
      </Parallax>

      {/* Layer 1 — heavy dark wash so white type clears WCAG AA on every pixel,
          plus a faint teal cast underneath for the organic climate-tech depth. */}
      <div aria-hidden className="absolute inset-0 z-10 bg-ink-950/85" />
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-gradient-to-b from-[#04211f]/50 via-transparent to-ink-950/70"
      />

      {/* Layer 2 — brand mesh. */}
      <BrandMesh
        variant="dark"
        className="z-20 [mask-image:linear-gradient(to_bottom,black_62%,transparent)]"
      />

      {/* Layer 3 — content. */}
      <Container className="relative z-30 pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* 7/5 rather than 6/6: the headline needs the wider measure to hold
            three lines, and the collage reads fine at the narrower width. */}
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
          {/* ---- Copy ---- */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="invert">
                Climate infrastructure &middot; Project development &middot; Advisory
              </Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 text-display font-bold text-white">
                Unlocking Economic Potential{" "}
                <span className="brand-gradient-text-bright">Through Climate Action.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-lead text-white">
                We build the audit-grade infrastructure that cities, manufacturers, and
                energy operators need to satisfy global regulatory mandates, reduce
                compliance costs, and monetize verified emission reductions.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/#briefing" variant="onDark" size="lg">
                  Schedule Executive Briefing
                  <ArrowRight />
                </Button>
                <Button href="/#platform" variant="glass" size="lg">
                  Get a Demo of Green Factory 360 AI
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              {/* Frosted white glass floating on the dark forest — the panel
                  reads light with the photograph blurred behind it. Label held
                  at ink-600 (not ink-500) so it clears AA on glass composited
                  over a dark backdrop, where the effective fill is grey, not
                  the near-white it sits on elsewhere. */}
              <div className="glass mt-12 max-w-xl rounded-card px-6 py-5">
                <p className="font-mono text-eyebrow uppercase text-ink-600">
                  Built to satisfy
                </p>
                {/* A ticker rather than a wrapped row: these are instruments we
                    report against, and set static they read as dead weight
                    under the headline. Marquee falls back to the wrapped row
                    under reduced motion. */}
                <Marquee
                  items={FRAMEWORKS}
                  className="mt-3.5"
                  duration={26}
                  itemClassName="text-sm font-bold text-ink-600"
                />
              </div>
            </Reveal>
          </div>

          {/* ---- Product collage ---- */}
          <div className="lg:col-span-5 lg:pl-4">
            <FloatingCollage />
          </div>
        </div>
      </Container>
    </section>
  );
}
