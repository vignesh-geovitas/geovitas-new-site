import type { ReactNode } from "react";

/**
 * Section label. The short gradient rule is the page's recurring brand
 * signature — it is the only place the logo gradient appears at body scale.
 *
 * Defaults to the light tone now that the site canvas is white; `dark` is for
 * the closing anchor and any other inverted surface.
 */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  /**
   * "light"  = paper surfaces (ink-600).
   * "dark"   = the ink anchor (ink-400, 8.30:1).
   * "invert" = over a photograph / heavy wash, where a muted grey greys out —
   *            pure white is the only tone that holds against the hero forest.
   */
  tone?: "light" | "dark" | "invert";
  className?: string;
}) {
  /* ink-600, not ink-500, on light: eyebrows sit on the brand meshes, and
     measured against the rendered mesh ink-500 falls to 3.94-4.42:1 — below AA.
     ink-600 holds at 7.8:1 or better everywhere on the page. */
  const toneClass =
    tone === "light" ? "text-ink-600" : tone === "dark" ? "text-ink-400" : "text-white";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="brand-gradient h-px w-6 shrink-0" aria-hidden />
      <span className={`font-mono text-eyebrow uppercase ${toneClass}`}>
        {children}
      </span>
    </span>
  );
}
