"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";

/**
 * DASHBOARD PRIMITIVES — the marketing-page vocabulary for showing that there
 * is a real measurement product underneath the advisory work.
 *
 * Built from DOM and inline SVG for the same reasons platform-mockup.tsx is:
 * they stay sharp at any density, re-theme with the tokens, and never go stale
 * against the product the way a captured screenshot does.
 *
 * ------------------------------------------------------------------------
 * SOURCING — READ BEFORE PUTTING A NUMBER THROUGH ANY OF THESE.
 *
 * This site holds a strict line against unverifiable figures (see the sourcing
 * notes in lib/advisory.ts and app/(marketing)/company/page.tsx). These
 * components are shapes, not claims, and they carry no data of their own.
 *
 * Every one of them therefore takes an `illustrative` flag, default TRUE, which
 * renders a visible chip saying so. Pass `illustrative={false}` only for a
 * figure that is either drawn from a public instrument or has been signed off
 * for external use — never for a modelled, projected or indicative one.
 * ------------------------------------------------------------------------
 */

const INSTANT = { duration: 0 } as const;

/* -- Chrome ---------------------------------------------------------------- */

/**
 * Product-window frame. Wraps a group of tiles or a chart so they read as one
 * instrument panel rather than as loose cards — the same window language the
 * hero mockup uses, so the two are recognisably the same product.
 */
export function DataPanel({
  title,
  meta,
  illustrative = true,
  children,
  className = "",
}: {
  title: string;
  /** Secondary line in the chrome — e.g. "Verified inventory · FY26". */
  meta?: string;
  illustrative?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[1rem] border border-ink-200 bg-white shadow-panel ${className}`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-ink-150 bg-ink-50 px-4 py-2.5">
        <span className="flex gap-2" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-ink-250" />
          <span className="h-2 w-2 rounded-full bg-ink-250" />
          <span className="h-2 w-2 rounded-full bg-ink-250" />
        </span>
        <span className="font-mono text-[0.5625rem] tracking-[0.14em] uppercase text-ink-500">
          {title}
        </span>
        {meta && (
          <span className="text-[0.6875rem] text-ink-500">{meta}</span>
        )}
        {illustrative && <IllustrativeChip className="ml-auto" />}
      </div>
      {children}
    </div>
  );
}

/**
 * The honesty marker. Small, but never decorative — it is what keeps a shaped
 * number on a marketing page from reading as a delivered result.
 */
export function IllustrativeChip({ className = "" }: { className?: string }) {
  return (
    <span
      className={`rounded-full border border-ink-200 bg-white px-2 py-0.5 font-mono text-[0.5rem] tracking-[0.1em] uppercase text-ink-500 ${className}`}
    >
      Illustrative
    </span>
  );
}

/* -- Metric tile ----------------------------------------------------------- */

/**
 * One figure and what it means. The workhorse of /impact and the homepage
 * proof rows.
 *
 * `value` is the string the figure should finally read as — CountUp works out
 * for itself what part of it is countable, and server-renders the finished
 * value so it is correct without JavaScript.
 */
export function MetricTile({
  label,
  value,
  delta,
  deltaTone = "positive",
  caption,
  series,
  illustrative = true,
  className = "",
}: {
  label: string;
  value: string;
  /** Signed change, already formatted — e.g. "−14.6%". */
  delta?: string;
  /** "positive" is a reduction in emissions, which is why it renders green. */
  deltaTone?: "positive" | "neutral";
  caption?: string;
  /** Optional sparkline series, in display order. */
  series?: readonly number[];
  illustrative?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-card border border-ink-200 bg-white p-6 shadow-card ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-eyebrow uppercase text-ink-500">{label}</p>
        {illustrative && <IllustrativeChip />}
      </div>

      <p className="tnum mt-4 text-h2 leading-none font-bold text-ink-950">
        <CountUp value={value} />
      </p>

      {delta && (
        <p
          className={`tnum mt-3 font-mono text-xs ${
            deltaTone === "positive" ? "text-brand-green-ink" : "text-ink-500"
          }`}
        >
          {delta}
        </p>
      )}

      {series && series.length > 1 && (
        <Sparkline series={series} className="mt-5" />
      )}

      {caption && (
        <p className="mt-4 text-sm leading-relaxed text-ink-500">{caption}</p>
      )}
    </div>
  );
}

/* -- Sparkline ------------------------------------------------------------- */

/**
 * Trend shape only — no axes, no labels, no tooltip. It says "this moved in
 * this direction" and nothing more, which is all a marketing surface should
 * claim without a real chart behind it.
 *
 * Normalised to its own min/max so any series fills the box. `preserveAspect
 * Ratio="none"` lets it stretch to the tile width; stroke width is held with
 * `vectorEffect` so the line does not distort with it.
 */
export function Sparkline({
  series,
  className = "",
}: {
  series: readonly number[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  const min = Math.min(...series);
  const max = Math.max(...series);
  /* A flat series has zero range; dividing by it yields NaN and the path
     silently disappears. Fall back to a mid-height straight line. */
  const range = max - min || 1;

  const points = series.map((n, i) => {
    const x = (i / (series.length - 1)) * 100;
    const y = 28 - ((n - min) / range) * 24;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  const line = `M${points.join(" L")}`;
  const area = `${line} L100,32 L0,32 Z`;

  return (
    <svg
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      className={`h-8 w-full ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-teal)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-brand-green)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sparkLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-cyan)" />
          <stop offset="100%" stopColor="var(--color-brand-green)" />
        </linearGradient>
      </defs>

      <path d={area} fill="url(#sparkFill)" />
      <motion.path
        d={line}
        fill="none"
        stroke="url(#sparkLine)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={reduceMotion ? INSTANT : { duration: 1.1, ease: EASE }}
      />
    </svg>
  );
}

/* -- Progress ring --------------------------------------------------------- */

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/**
 * Carbon progress ring — share of a reduction target achieved.
 *
 * The arc is drawn with a dash pattern the length of the full circumference and
 * animated by its offset, which is the one way to animate a stroke's extent
 * without re-pathing it every frame.
 *
 * Rotated -90° so the arc starts at twelve o'clock rather than three.
 *
 * ACCESSIBILITY. The SVG is `aria-hidden` and the figure is restated in the
 * centre as real text, so the value is read once rather than twice.
 */
export function ProgressRing({
  value,
  label,
  caption,
  illustrative = true,
  className = "",
}: {
  /** Percentage, 0-100. Clamped. */
  value: number;
  label: string;
  caption?: string;
  illustrative?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const pct = Math.max(0, Math.min(100, value));
  const offset = RING_CIRCUMFERENCE * (1 - pct / 100);

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="relative">
        <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90" aria-hidden>
          <defs>
            <linearGradient id="ringStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-brand-cyan)" />
              <stop offset="55%" stopColor="var(--color-brand-teal)" />
              <stop offset="100%" stopColor="var(--color-brand-green)" />
            </linearGradient>
          </defs>

          {/* Track */}
          <circle
            cx="60"
            cy="60"
            r={RING_RADIUS}
            fill="none"
            stroke="var(--color-ink-150)"
            strokeWidth="8"
          />
          {/* Arc */}
          <motion.circle
            cx="60"
            cy="60"
            r={RING_RADIUS}
            fill="none"
            stroke="url(#ringStroke)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            initial={{ strokeDashoffset: RING_CIRCUMFERENCE }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true, margin: "-60px" }}
            transition={reduceMotion ? INSTANT : { duration: 1.2, ease: EASE }}
          />
        </svg>

        <span className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="tnum font-mono text-2xl leading-none font-bold text-ink-950">
            {pct}%
          </span>
        </span>
      </div>

      <p className="mt-5 text-[0.9375rem] font-bold text-ink-950">{label}</p>
      {caption && (
        <p className="mt-2 max-w-[22ch] text-sm leading-relaxed text-ink-500">
          {caption}
        </p>
      )}
      {illustrative && <IllustrativeChip className="mt-4" />}
    </div>
  );
}

/* -- Bar series ------------------------------------------------------------ */

/**
 * Small labelled bar chart, for a breakdown that needs its categories named —
 * Scope 1/2/3 splits, per-site intensity. Horizontal, because the labels are
 * words rather than dates and vertical bars would force them on the diagonal.
 */
export function BarSeries({
  bars,
  illustrative = true,
  className = "",
}: {
  bars: readonly { label: string; value: number; readout: string }[];
  illustrative?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const max = Math.max(...bars.map((b) => b.value)) || 1;

  return (
    <div className={className}>
      <ul className="space-y-4">
        {bars.map((bar, index) => (
          <li key={bar.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-eyebrow uppercase text-ink-500">
                {bar.label}
              </span>
              <span className="tnum font-mono text-xs font-bold text-ink-950">
                {bar.readout}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-150">
              <motion.div
                className="brand-gradient h-full rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: bar.value / max }}
                viewport={{ once: true, margin: "-60px" }}
                transition={
                  reduceMotion
                    ? INSTANT
                    : { duration: 0.9, delay: index * 0.08, ease: EASE }
                }
                /* Scaling a full-width bar rather than animating `width` keeps
                   the work on the compositor — same rule as the ambient motion
                   layer in globals.css. */
                style={{ transformOrigin: "left" }}
              />
            </div>
          </li>
        ))}
      </ul>
      {illustrative && <IllustrativeChip className="mt-5" />}
    </div>
  );
}
