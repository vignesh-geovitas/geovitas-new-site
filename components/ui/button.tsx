import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * VARIANT INTENT
 *   primary  — the workhorse CTA on light surfaces. Near-black, not brand
 *              colour: at 19.58:1 it carries more authority than any accent
 *              can, and it keeps cyan meaningful by not spending it everywhere.
 *   accent   — reserved for Green Factory 360 AI calls to action, so the brand
 *              colour reads as "the platform" rather than "a button".
 *   outline  — secondary action on light surfaces.
 *   onDark / onDarkOutline — the closing dark anchor only.
 *
 * Contrast, measured (WCAG 2.1):
 *   white   on ink-950     19.58:1
 *   ink-950 on brand-cyan   7.52:1
 *   ink-950 on white       19.58:1
 * White on brand-cyan is 2.60:1 and never appears.
 */

type Variant = "primary" | "accent" | "outline" | "glass" | "onDark" | "onDarkOutline";
type Size = "sm" | "md" | "lg";

/**
 * LABELS WRAP; THEY DO NOT OVERFLOW.
 *
 * This used to be `whitespace-nowrap` on a fixed `h-*`. On a 320px screen the
 * longest label on the site — "Get a Demo of Green Factory 360 AI" — is wider
 * than the content column, so it broke out of its own button and gave the whole
 * page a horizontal scrollbar. Removing nowrap alone would have been worse: a
 * second line inside a fixed height just clips.
 *
 * So the sizes below pair `min-h-*` with explicit padding and `leading-tight`.
 * A single-line button computes shorter than its `min-h` and therefore renders
 * at exactly the height it always did; a wrapped one grows instead of spilling.
 */
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-btn text-center font-bold " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-brand " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-ink-950 text-white hover:bg-ink-800",
  accent: "bg-brand-cyan text-ink-950 hover:bg-brand-cyan-lo",
  outline:
    "border border-ink-200 bg-white text-ink-950 hover:border-ink-300 hover:bg-ink-50",
  /* Secondary action sitting on a brand mesh. Built from plain utilities rather
     than the `glass` @utility so the hover state wins cleanly — both live in the
     utilities layer, and a same-specificity background would be a source-order
     coin flip. */
  glass:
    "border border-white/60 bg-white/70 text-ink-950 shadow-lift backdrop-blur-xl " +
    "hover:border-white hover:bg-white/90",
  onDark: "bg-white text-ink-950 hover:bg-ink-100",
  onDarkOutline:
    "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
};

/* Heights are unchanged for single-line labels — see the note on BASE for the
   arithmetic that keeps them identical. */
const SIZES: Record<Size, string> = {
  sm: "min-h-9 px-4 py-2 text-sm leading-tight",
  md: "min-h-11 px-5 py-2.5 text-[0.9375rem] leading-tight",
  lg: "min-h-12 px-6 py-3 text-[0.9375rem] leading-tight",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

/** Trailing arrow used on secondary / inline calls to action. */
export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      /* shrink-0: as a flex child next to a label that can now wrap, the arrow
         would otherwise be squashed to a sliver rather than the label breaking. */
      className={`h-4 w-4 shrink-0 ${className}`}
    >
      <path
        d="M2.5 8h11m0 0L9 3.5M13.5 8L9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
