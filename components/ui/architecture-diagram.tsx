import { Reveal } from "@/components/ui/reveal";
import { StaggerGroup, StaggerChild } from "@/components/ui/stagger";

/**
 * "One inventory, mapped outward" — the platform's whole argument, drawn.
 *
 * WHY THIS IS DOM AND NOT AN IMAGE
 * lib/imagery.ts marks this slot `treatment: "diagram"` precisely because it
 * must not be generated: a model cannot draw a technically correct data flow,
 * and a wrong one on a page read by engineers is worse than no picture. Built
 * from real elements it also stays crisp at any density, re-themes with the
 * tokens, and can be read by a screen reader — the same reasoning behind
 * components/ui/floating-collage.tsx and platform-mockup.tsx.
 *
 * THE CLAIM IT HAS TO MAKE VISUALLY: many inputs, ONE inventory, many outputs.
 * So the centre column is the only filled, dark element on the board, and both
 * side columns are plain outlined chips of equal weight. If a future edit makes
 * the outputs heavier than the centre, the diagram stops arguing the point.
 *
 * The connector rails are decorative and hidden from assistive tech; the three
 * columns read in DOM order as sources, then inventory, then frameworks, which
 * is the order the sentence would be spoken in.
 */

const SOURCES = [
  "Meters & sensors",
  "ERP & finance",
  "Logistics",
  "Supplier submissions",
] as const;

const FRAMEWORKS = [
  "EU CBAM",
  "SEBI BRSR Core",
  "CCTS",
  "GHG Protocol",
  "SBTi / ISSB",
] as const;

export function ArchitectureDiagram({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`relative overflow-hidden rounded-card border border-ink-200 bg-white p-6 shadow-panel lg:p-8 ${className}`}
    >
      {/* Dot grid, drifting — the same technical texture the platform band and
          the subpage headers carry. */}
      <div
        aria-hidden
        className="gv-grid-pan pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-ink-300) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative">
        <figcaption className="font-mono text-eyebrow uppercase text-ink-500">
          One inventory, mapped outward
        </figcaption>

        {/* Stacks on mobile, three columns from md. The connector rails only
            appear at md, where there is a horizontal axis for them to run
            along; stacked, the DOM order already carries the sequence. */}
        <div className="mt-7 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-4">
          {/* ---- Sources ---- */}
          <StaggerGroup className="space-y-2.5" step={0.06}>
            {SOURCES.map((source) => (
              <StaggerChild key={source}>
                <div className="rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-center text-xs leading-tight text-ink-600 shadow-card md:text-left">
                  {source}
                </div>
              </StaggerChild>
            ))}
          </StaggerGroup>

          {/* ---- The single inventory ---- */}
          <Reveal delay={0.18}>
            <div className="relative mx-auto w-full max-w-[13rem]">
              {/* Converging rail in, diverging rail out. Hidden below md. */}
              <span
                aria-hidden
                className="brand-gradient absolute top-1/2 -left-4 hidden h-px w-4 md:block"
              />
              <span
                aria-hidden
                className="brand-gradient absolute top-1/2 -right-4 hidden h-px w-4 md:block"
              />

              <div className="relative overflow-hidden rounded-card bg-ink-950 px-5 py-6 text-center shadow-panel">
                <span
                  aria-hidden
                  className="brand-gradient absolute inset-x-0 top-0 h-px"
                />
                <p className="font-mono text-[0.5625rem] tracking-[0.14em] uppercase text-ink-400">
                  Verified
                </p>
                <p className="mt-2 text-[0.9375rem] leading-tight font-bold text-white">
                  One Scope 1–3 inventory
                </p>
                <p className="mt-2.5 text-[0.6875rem] leading-relaxed text-ink-300">
                  Every figure traceable to the meter, the invoice or the grid
                  operator
                </p>
              </div>
            </div>
          </Reveal>

          {/* ---- Frameworks ---- */}
          <StaggerGroup className="space-y-2.5" step={0.06}>
            {FRAMEWORKS.map((framework) => (
              <StaggerChild key={framework}>
                <div className="rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-center text-xs leading-tight font-bold text-ink-950 shadow-card md:text-right">
                  {framework}
                </div>
              </StaggerChild>
            ))}
          </StaggerGroup>
        </div>

        <p className="mt-7 border-t border-ink-200 pt-4 text-xs leading-relaxed text-ink-500">
          The same tonne is never counted twice, or counted differently for two
          regulators.
        </p>
      </div>
    </figure>
  );
}
