/**
 * Blurred brand-colour gradient mesh.
 *
 * Overlapping circles of Cyan, Teal and Green at `blur-3xl` — the colours mix
 * optically where they overlap, which is what gives the wash its depth. Panels
 * placed on top use the `glass` utilities so the colour glows through rather
 * than sitting behind flat white.
 *
 * IMPORTANT: the parent must be `relative overflow-hidden`. A 64px blur bleeds
 * well past each element's box, and without clipping those blobs extend the
 * document and produce a horizontal scrollbar.
 *
 * CONTRAST FLOOR: measured against the rendered mesh, ink-500 body copy drops
 * to 3.94-4.42:1 — below WCAG AA. Text placed directly on a mesh must be
 * ink-600 or darker (7.8:1+). Muted ink-500 copy is fine on the `glass`
 * panels, where the effective background measures near-white.
 *
 * Purely decorative and non-interactive — no client JS, so this stays a Server
 * Component.
 */

type BrandMeshProps = {
  /** "light" sits on white/paper, "dark" on the ink anchor. */
  variant?: "light" | "dark";
  /** Extra classes on the wrapper — usually a mask to fade the section join. */
  className?: string;
};

const BLOB = "absolute rounded-full blur-3xl";

export function BrandMesh({ variant = "light", className = "" }: BrandMeshProps) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {variant === "light" ? (
        <>
          {/* Cyan pulled back to a small top-edge note — enough to keep the
              signature, no more. Oceans and canopy carry the rest. */}
          <div
            className={`${BLOB} gv-blob-a -top-40 -right-24 h-[26rem] w-[26rem] bg-brand-cyan opacity-[0.18]`}
          />
          <div
            className={`${BLOB} gv-blob-b top-36 right-1/4 h-[28rem] w-[28rem] bg-brand-teal opacity-35`}
          />
          {/* Warm note, drawn from the brand book's own secondary palette so
              the warmth stays on-brand rather than becoming a stray beige. */}
          <div
            className={`${BLOB} gv-blob-c top-1/4 left-1/4 h-[30rem] w-[30rem] bg-chart-cream opacity-40`}
          />
          {/* Green amplified and widened — the organic anchor of the wash. Kept
              high enough to clear the section's bottom fade mask; anchored to
              the very bottom it was masked out entirely. */}
          <div
            className={`${BLOB} gv-blob-a bottom-4 -left-32 h-[34rem] w-[34rem] bg-brand-green opacity-[0.38]`}
          />
          <div
            className={`${BLOB} gv-blob-b top-1/2 -left-24 h-[26rem] w-[26rem] bg-brand-teal opacity-[0.28]`}
          />
        </>
      ) : (
        <>
          {/* Dark anchor (hero + closing CTA). Cyan is a small, low glow near
              the top edge; teal and green spread wide and warm underneath it so
              the atmosphere reads as ocean and forest, not a digital UI glow. */}
          <div
            className={`${BLOB} gv-blob-b -top-32 right-[-6%] h-[22rem] w-[22rem] bg-brand-cyan opacity-20`}
          />
          <div
            className={`${BLOB} gv-blob-a -top-16 right-1/4 h-[30rem] w-[30rem] bg-brand-teal opacity-40`}
          />
          <div
            className={`${BLOB} gv-blob-c top-1/3 left-[-8%] h-[32rem] w-[32rem] bg-brand-green opacity-35`}
          />
          <div
            className={`${BLOB} gv-blob-b -bottom-24 left-1/3 h-[26rem] w-[26rem] bg-brand-teal opacity-30`}
          />
        </>
      )}
    </div>
  );
}
