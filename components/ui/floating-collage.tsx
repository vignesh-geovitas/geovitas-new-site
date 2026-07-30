"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/ui/reveal";
import { SECTORS, calculateExposure, formatEuro, formatNumber } from "@/lib/cbam";

/**
 * Hero product collage for Green Factory 360 AI.
 *
 * Built from real DOM rather than a screenshot: it stays crisp at any density,
 * re-themes with the tokens, and its figures come from the same model that
 * drives the calculator further down the page — the hero must not quote a
 * number the tool would contradict.
 *
 * MOTION STRUCTURE
 * Entrance (`y: 24 -> 0`) and the ambient float (`y: [0,-10,0]`) both write
 * `transform.y`, so they live on two nested layers, one transform each. The
 * three cards then run on deliberately mismatched durations — identical timing
 * makes the collage bob as one rigid block, and the sense of depth comes
 * entirely from the cards drifting out of phase with each other.
 */

/* Illustrative position: a mid-size steel exporter at unabated intensity. */
const STEEL = SECTORS[0];
const ILLUSTRATIVE = {
  volume: 60_000,
  intensity: STEEL.defaultIntensity,
  benchmark: STEEL.benchmark,
  certificatePrice: 75,
};

const at2030 = calculateExposure({ ...ILLUSTRATIVE, year: 2030 });
const at2034 = calculateExposure({ ...ILLUSTRATIVE, year: 2034 });

const withinBenchmarkPct =
  (at2030.benchmarkAllowance / at2030.embeddedEmissions) * 100;

export function FloatingCollage() {
  return (
    <div className="relative w-full">
      {/*
        The collage is illustrative product chrome, not page content. Read
        linearly by a screen reader it is a stream of orphaned numbers, so the
        whole thing is hidden and replaced with one plain-language summary.
      */}
      <p className="sr-only">
        Illustrative Green Factory 360 AI dashboard, showing a modelled CBAM
        certificate obligation, Scope 1 to 3 inventory completeness, and a
        verified Product Carbon Footprint.
      </p>

      {/*
        Below lg the cards fall back to ordinary flow — an absolutely
        positioned collage has no way to stay inside a narrow viewport. The
        widest card reaches 23.5rem, which clears the five-column hero track
        at the lg breakpoint with room to spare.
      */}
      <div aria-hidden className="flex flex-col gap-5 lg:block lg:h-[29rem]">
        {/* Back — inventory completeness. Overlapped along its bottom 1.5rem,
            which its lg-only bottom padding keeps clear of content. */}
        <Float
          duration={9}
          floatDelay={0.4}
          enterDelay={0.28}
          className="lg:absolute lg:top-0 lg:left-0 lg:w-[13.5rem]"
        >
          <InventoryCard />
        </Float>

        {/* Front — the headline liability. Largest card, optical centre. */}
        <Float
          duration={7.5}
          floatDelay={0}
          enterDelay={0.16}
          className="z-20 lg:absolute lg:top-[6.5rem] lg:left-[6rem] lg:w-[18.5rem]"
        >
          <ExposureCard />
        </Float>

        {/* Foreground — verification chip, landing on the exposure card's
            reserved bottom margin rather than across its figures. */}
        <Float
          duration={8.2}
          floatDelay={0.9}
          enterDelay={0.4}
          className="z-30 lg:absolute lg:top-[22.5rem] lg:left-[1rem] lg:w-[15rem]"
        >
          <VerificationCard />
        </Float>
      </div>
    </div>
  );
}

function Float({
  children,
  className = "",
  duration,
  floatDelay,
  enterDelay,
}: {
  children: ReactNode;
  className?: string;
  duration: number;
  /** Offsets the loop so the cards never share a phase. */
  floatDelay: number;
  enterDelay: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      /* Hero sits above the fold — animate on mount, not on scroll. Target is
         unconditional; see the reduced-motion note in reveal.tsx. */
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.7, delay: enterDelay, ease: EASE }
      }
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{
          duration,
          delay: floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* -- Shared card shell ----------------------------------------------------- */

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  /* glass-strong rather than glass: these cards carry figures, and the higher
     fill opacity keeps tabular numerals crisp where the mesh is most saturated.
     The utility supplies its own border and shadow. */
  return (
    <div className={`glass-strong overflow-hidden rounded-card ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ label, meta }: { label: string; meta?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-ink-150 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-green" />
        </span>
        <span className="font-mono text-[0.625rem] tracking-[0.14em] uppercase text-ink-500">
          {label}
        </span>
      </div>
      {meta && (
        /* "Illustrative" is a disclaimer, not decoration — it stays at ink-500
           (5.19:1) rather than ink-400 (2.36:1) so it is actually readable. */
        <span className="font-mono text-[0.5625rem] tracking-[0.12em] uppercase text-ink-500">
          {meta}
        </span>
      )}
    </div>
  );
}

/* -- Cards ----------------------------------------------------------------- */

function ExposureCard() {
  return (
    <Card>
      <CardHeader label="Green Factory 360 AI" meta="Illustrative" />

      {/* Extra bottom padding at lg is the safe zone the verification card
          overlaps into — the collage must never cover a figure. */}
      <div className="px-4 pt-4 pb-4 lg:pb-10">
        <p className="text-xs text-ink-500">2030 certificate obligation</p>
        <div className="mt-1.5 flex items-baseline gap-2.5">
          <span className="tnum font-mono text-[2.25rem] leading-none font-bold text-ink-950">
            {formatEuro(at2030.annualCost)}
          </span>
          <span className="text-[0.6875rem] leading-tight text-ink-500">
            {formatEuro(at2034.annualCost)} at
            <br />
            full phase-in
          </span>
        </div>

        <div className="mt-5 space-y-2">
          <Row
            label="Embedded emissions"
            value={`${formatNumber(at2030.embeddedEmissions)} t`}
          />
          <Row
            label="Benchmark allowance"
            value={`${formatNumber(at2030.benchmarkAllowance)} t`}
          />
          <Row
            label="Above benchmark"
            value={`${formatNumber(at2030.excessEmissions)} t`}
            emphasis
          />
        </div>

        <div className="mt-4 flex h-1.5 w-full overflow-hidden rounded-full bg-ink-150">
          <div
            className="h-full bg-brand-cyan"
            style={{ width: `${withinBenchmarkPct}%` }}
          />
          <div
            className="h-full bg-brand-green"
            style={{ width: `${100 - withinBenchmarkPct}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[0.5625rem] tracking-[0.12em] uppercase text-ink-500">
          <span>Within benchmark</span>
          <span>Chargeable</span>
        </div>
      </div>
    </Card>
  );
}

function InventoryCard() {
  return (
    <Card>
      {/* Same reserved margin, overlapped by the exposure card. */}
      <div className="px-4 pt-3.5 pb-3.5 lg:pb-8">
        <p className="font-mono text-[0.625rem] tracking-[0.14em] uppercase text-ink-500">
          Inventory completeness
        </p>
        <div className="mt-3.5 space-y-2.5">
          <ScopeBar label="Scope 1" value={100} />
          <ScopeBar label="Scope 2" value={96} />
          <ScopeBar label="Scope 3" value={61} />
        </div>
      </div>
    </Card>
  );
}

function VerificationCard() {
  return (
    <Card>
      <div className="flex items-center gap-2.5 px-4 py-3">
        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0">
          <circle cx="8" cy="8" r="7" stroke="var(--color-brand-green-ink)" strokeWidth="1.5" />
          <path
            d="M5 8.2l2.1 2.1L11 6.4"
            stroke="var(--color-brand-green-ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-ink-500">
          PCF verified
        </span>
        <span className="tnum ml-auto font-mono text-sm font-bold text-ink-950">
          1.42 tCO₂e/t
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-ink-150 px-4 py-2.5">
        {["CBAM", "BRSR Core", "CCTS"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-ink-200 px-2 py-0.5 font-mono text-[0.5625rem] tracking-[0.1em] uppercase text-ink-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
}

/* -- Card internals -------------------------------------------------------- */

function Row({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-[0.6875rem]">
      <span className="text-ink-500">{label}</span>
      <span
        className={`tnum font-mono ${
          emphasis ? "font-bold text-brand-cyan-ink" : "text-ink-600"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function ScopeBar({ label, value }: { label: string; value: number }) {
  /* Green marks a fully closed scope only. Reserving it that tightly keeps the
     accent meaningful and stops the panel reading as an eco-dashboard. */
  const complete = value === 100;

  return (
    <div className="flex items-center gap-2.5">
      <span className="w-12 shrink-0 font-mono text-[0.5625rem] tracking-[0.1em] uppercase text-ink-500">
        {label}
      </span>
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink-150">
        <div
          className={`h-full rounded-full ${complete ? "bg-brand-green" : "bg-brand-cyan"}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="tnum w-7 shrink-0 text-right font-mono text-[0.5625rem] text-ink-600">
        {value}%
      </span>
    </div>
  );
}
