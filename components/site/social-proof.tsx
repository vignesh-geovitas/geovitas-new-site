import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { MotionCard } from "@/components/ui/motion-card";
import { StaggerList, StaggerItem } from "@/components/ui/stagger";

/* ===========================================================================
   SOCIAL PROOF — PLACEHOLDER, AWAITING REAL ASSETS
   ---------------------------------------------------------------------------
   TO POPULATE:
     1. Drop logo files into `public/clients/` (SVG preferred; otherwise PNG at
        2x the rendered size, transparent background, trimmed of whitespace).
     2. Fill CLIENT_LOGOS and, if you have approved quotes, TESTIMONIALS below.
     3. Replace HEADLINE with the real, defensible claim.

   Both arrays are empty on purpose. While they are empty the section renders
   neutral placeholder slots so the layout is visible; as soon as either array
   has entries the real content replaces the placeholder automatically. No
   invented client names, quotes, counts or performance figures ship from here
   — on a page aimed at CFOs an unverifiable proof point is worse than none.
=========================================================================== */

type ClientLogo = {
  /** Legal or brand name, used as the image alt text. */
  name: string;
  /** Path under /public, e.g. "/clients/acme.svg" */
  src: string;
  /** Intrinsic dimensions of the asset. */
  width: number;
  height: number;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const CLIENT_LOGOS: readonly ClientLogo[] = [];

const TESTIMONIALS: readonly Testimonial[] = [];

/** Replace with the real claim once client consent is confirmed. */
const HEADLINE = "Trusted by regulated operators";

/** Slot count the placeholder rail draws while CLIENT_LOGOS is empty. */
const PLACEHOLDER_SLOTS = 6;

export function SocialProof() {
  const hasLogos = CLIENT_LOGOS.length > 0;
  const hasTestimonials = TESTIMONIALS.length > 0;

  return (
    <section className="border-t border-ink-200 bg-ink-50">
      <Container className="py-14 sm:py-16 lg:py-24">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Clients</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 text-h3 font-bold text-ink-950">{HEADLINE}</h2>
          </Reveal>
        </div>

        {/* ---- Logo rail ---- */}
        <StaggerList
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          step={0.06}
        >
          {hasLogos
            ? CLIENT_LOGOS.map((logo) => (
                <StaggerItem
                  key={logo.name}
                  className="flex h-20 items-center justify-center rounded-card border border-ink-200 bg-white px-5 shadow-card"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="max-h-9 w-auto object-contain"
                  />
                </StaggerItem>
              ))
            : Array.from({ length: PLACEHOLDER_SLOTS }, (_, index) => (
                <StaggerItem
                  key={index}
                  className="flex h-20 items-center justify-center rounded-card
                             border border-dashed border-ink-250 bg-white/60"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.14em] uppercase text-ink-500">
                    Client logo
                  </span>
                </StaggerItem>
              ))}
        </StaggerList>

        {/* ---- Testimonials ---- */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {hasTestimonials
            ? TESTIMONIALS.map((testimonial, index) => (
                <MotionCard
                  key={testimonial.name}
                  delay={index * 0.08}
                  className="flex flex-col rounded-card border border-ink-200 bg-white p-7 shadow-card"
                >
                  <blockquote className="text-[0.9375rem] leading-relaxed text-ink-600">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex-1" />
                  <figcaption className="mt-6 border-t border-ink-150 pt-5">
                    <p className="text-sm font-bold text-ink-950">{testimonial.name}</p>
                    <p className="mt-0.5 text-xs text-ink-500">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </figcaption>
                </MotionCard>
              ))
            : Array.from({ length: 2 }, (_, index) => (
                <div
                  key={index}
                  className="flex min-h-[11rem] flex-col rounded-card border border-dashed
                             border-ink-250 bg-white/60 p-7"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.14em] uppercase text-ink-500">
                    Client testimonial
                  </span>
                  <div className="mt-4 space-y-2" aria-hidden>
                    <span className="block h-2 w-full rounded-full bg-ink-150" />
                    <span className="block h-2 w-11/12 rounded-full bg-ink-150" />
                    <span className="block h-2 w-8/12 rounded-full bg-ink-150" />
                  </div>
                  <div className="flex-1" />
                  <div className="mt-6 flex items-center gap-3 border-t border-ink-150 pt-5">
                    <span className="h-8 w-8 rounded-full bg-ink-150" aria-hidden />
                    <span className="block h-2 w-28 rounded-full bg-ink-150" aria-hidden />
                  </div>
                </div>
              ))}
        </div>
      </Container>
    </section>
  );
}
