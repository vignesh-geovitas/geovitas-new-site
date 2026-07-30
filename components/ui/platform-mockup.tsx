"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/ui/reveal";

/**
 * Green Factory 360 AI product mockup.
 *
 * Composed from DOM and inline SVG rather than a screenshot: it stays sharp at
 * any density, re-themes with the tokens, and never goes stale against the real
 * product the way a captured PNG does.
 *
 * Motion follows the same two-layer split used everywhere else — the outer
 * element owns the entrance, the inner owns the continuous float, so the two
 * never contend for `transform.y`.
 */

/* Emissions trajectory. Y axis is inverted in SVG space, so a descending
   series moves downward — emissions falling across the compliance window. */
const ACTUAL_LINE =
  "M4,26 C40,32 64,44 104,40 C144,36 168,60 208,64 C248,68 280,80 316,88";
const ACTUAL_AREA = `${ACTUAL_LINE} L316,116 L4,116 Z`;
const TARGET_LINE = "M4,34 L316,98";

const SCOPES = [
  { label: "Scope 1", value: "12,480", delta: "−8.2%", fill: 100 },
  { label: "Scope 2", value: "30,152", delta: "−14.6%", fill: 96 },
  { label: "Scope 3", value: "107,368", delta: "−2.1%", fill: 61 },
] as const;

export function PlatformMockup() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      <p className="sr-only">
        Illustrative Green Factory 360 AI dashboard, showing the emissions
        trajectory against target and Scope 1, 2 and 3 inventory totals.
      </p>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: EASE }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-[1rem] border border-ink-200 bg-white shadow-panel"
        >
          {/* -- Window chrome -- */}
          <div className="flex items-center gap-2 border-b border-ink-150 bg-ink-50 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-ink-250" />
            <span className="h-2 w-2 rounded-full bg-ink-250" />
            <span className="h-2 w-2 rounded-full bg-ink-250" />
            <span className="ml-3 font-mono text-[0.5625rem] tracking-[0.14em] uppercase text-ink-500">
              Green Factory 360 AI
            </span>
            <span className="ml-auto rounded-full border border-ink-200 bg-white px-2 py-0.5 font-mono text-[0.5rem] tracking-[0.1em] uppercase text-ink-500">
              Illustrative
            </span>
          </div>

          <div className="flex">
            {/* -- Icon rail -- */}
            <div className="hidden shrink-0 flex-col items-center gap-1 border-r border-ink-150 bg-ink-50/60 px-2.5 py-3.5 sm:flex">
              <span className="brand-gradient mb-2 h-5 w-5 rounded-md" />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={`flex h-7 w-7 items-center justify-center rounded-md ${
                    i === 2 ? "bg-brand-cyan/15 text-brand-cyan-ink" : "text-ink-400"
                  }`}
                >
                  <RailIcon index={i} />
                </span>
              ))}
            </div>

            {/* -- Main panel -- */}
            <div className="min-w-0 flex-1 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-ink-950">Emissions trajectory</p>
                  <p className="mt-0.5 text-[0.6875rem] text-ink-500">
                    Verified inventory &middot; FY26 baseline
                  </p>
                </div>
                <div className="flex gap-1">
                  {["Scope", "Site", "Product"].map((tab, i) => (
                    <span
                      key={tab}
                      className={`rounded-md px-2 py-1 font-mono text-[0.5625rem] tracking-[0.1em] uppercase ${
                        i === 0
                          ? "bg-ink-950 text-white"
                          : "border border-ink-200 text-ink-500"
                      }`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
              </div>

              {/* -- Chart -- */}
              <div className="relative mt-3.5 overflow-hidden rounded-lg border border-ink-150 bg-white p-3">
                {/* Carbon watermark — ghosted behind the trace so the panel
                    reads as a CO₂e tool at a glance without fighting the data. */}
                <span
                  aria-hidden
                  className="tnum pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[2.25rem] leading-none font-bold tracking-[0.06em] text-brand-teal/10 select-none"
                >
                  CO₂e
                </span>

                <div className="relative flex items-center gap-4">
                  <Legend swatch="bg-brand-teal" label="Actual" />
                  <Legend swatch="bg-brand-green" label="SBTi pathway" dashed />
                  <span className="tnum ml-auto font-mono text-[0.6875rem] font-bold text-ink-950">
                    150,000 tCO₂e
                  </span>
                </div>

                <svg
                  viewBox="0 0 320 120"
                  className="mt-2 h-28 w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Fill leans into teal→green rather than cyan: the drawdown
                        area now reads as canopy, not a data-tool accent. Teal
                        sits under the line for identity, green settles below. */}
                    <linearGradient id="gfArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-brand-teal)" stopOpacity="0.30" />
                      <stop offset="60%" stopColor="var(--color-brand-green)" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="var(--color-brand-green)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gfLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--color-brand-teal)" />
                      <stop offset="100%" stopColor="var(--color-brand-green)" />
                    </linearGradient>
                  </defs>

                  {[20, 48, 76, 104].map((y) => (
                    <line
                      key={y}
                      x1="4"
                      x2="316"
                      y1={y}
                      y2={y}
                      stroke="var(--color-ink-150)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}

                  <path d={ACTUAL_AREA} fill="url(#gfArea)" />
                  <path
                    d={TARGET_LINE}
                    fill="none"
                    stroke="var(--color-brand-green)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={ACTUAL_LINE}
                    fill="none"
                    stroke="url(#gfLine)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle cx="316" cy="88" r="3" fill="var(--color-brand-green)" />
                </svg>

                <div className="mt-1 flex justify-between font-mono text-[0.5rem] tracking-[0.1em] text-ink-400">
                  {["2026", "2028", "2030", "2032", "2034"].map((year) => (
                    <span key={year}>{year}</span>
                  ))}
                </div>
              </div>

              {/* -- Scope cards -- */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {SCOPES.map((scope) => (
                  <div
                    key={scope.label}
                    className="rounded-lg border border-ink-150 bg-white p-2.5"
                  >
                    <p className="font-mono text-[0.5rem] tracking-[0.12em] uppercase text-ink-500">
                      {scope.label}
                    </p>
                    <p className="tnum mt-1 font-mono text-[0.8125rem] leading-none font-bold text-ink-950">
                      {scope.value}
                    </p>
                    <p className="tnum mt-1 font-mono text-[0.5625rem] text-brand-green-ink">
                      {scope.delta}
                    </p>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink-150">
                      <div
                        className={`h-full rounded-full ${
                          scope.fill === 100 ? "bg-brand-green" : "bg-brand-cyan"
                        }`}
                        style={{ width: `${scope.fill}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Legend({
  swatch,
  label,
  dashed = false,
}: {
  swatch: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={`h-0.5 w-4 rounded-full ${swatch} ${dashed ? "opacity-70" : ""}`}
      />
      <span className="font-mono text-[0.5625rem] tracking-[0.1em] uppercase text-ink-500">
        {label}
      </span>
    </span>
  );
}

/** Six flat 14px glyphs for the rail — deliberately generic product chrome. */
function RailIcon({ index }: { index: number }): ReactNode {
  const paths = [
    "M3 10.5V6l4-3 4 3v4.5M5.5 10.5v-3h3v3", // home
    "M2.5 11.5h9M4 9.5v-4M7 9.5v-6M10 9.5v-2", // bars
    "M7 2.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM7 4.5v5M4.5 7h5", // active
    "M3 3.5h8M3 7h8M3 10.5h5", // list
    "M7 2.5l4 2.5v4L7 11.5 3 9V5l4-2.5z", // cube
    "M4 11V4a1 1 0 011-1h4a1 1 0 011 1v7M4 7h6", // doc
  ];

  return (
    <svg viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5">
      <path
        d={paths[index]}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
