"use client";

import { useMemo, useState } from "react";
import {
  CBAM_PHASE_IN,
  COMPLIANCE_YEARS,
  SECTORS,
  calculateExposure,
  formatEuro,
  formatNumber,
  type SectorKey,
} from "@/lib/cbam";

export function ExposureCalculator() {
  const [sectorKey, setSectorKey] = useState<SectorKey>("steel");
  const sector = SECTORS.find((s) => s.key === sectorKey) ?? SECTORS[0];

  const [volume, setVolume] = useState(sector.defaultVolume);
  const [intensity, setIntensity] = useState(sector.defaultIntensity);
  const [benchmark, setBenchmark] = useState(sector.benchmark);
  const [certificatePrice, setCertificatePrice] = useState(75);
  const [year, setYear] = useState(2030);

  // Switching sector resets the physical inputs to that sector's defaults;
  // price and compliance year are the user's framing and persist.
  function selectSector(key: SectorKey) {
    const next = SECTORS.find((s) => s.key === key);
    if (!next) return;
    setSectorKey(key);
    setVolume(next.defaultVolume);
    setIntensity(next.defaultIntensity);
    setBenchmark(next.benchmark);
  }

  const result = useMemo(
    () => calculateExposure({ volume, intensity, benchmark, certificatePrice, year }),
    [volume, intensity, benchmark, certificatePrice, year]
  );

  const withinBenchmarkPct =
    result.embeddedEmissions > 0
      ? Math.min(100, (result.benchmarkAllowance / result.embeddedEmissions) * 100)
      : 100;

  return (
    /* The readout panel stays ink while the controls stay paper. Brand cyan
       measures 7.44:1 on ink-950 against 2.60:1 on white, so the dark panel is
       the one place the accent can carry a number legibly — and the contrast
       between the two halves is what makes the figure land. */
    <div className="overflow-hidden rounded-card border border-ink-200 bg-white shadow-panel">
      <div className="grid lg:grid-cols-5">
        {/* ---------------- Controls ---------------- */}
        <div className="space-y-7 p-6 lg:col-span-3 lg:p-8">
          <fieldset>
            <legend className="font-mono text-eyebrow uppercase text-ink-500">
              CBAM good
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SECTORS.map((option) => {
                const active = option.key === sectorKey;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => selectSector(option.key)}
                    aria-pressed={active}
                    className={`rounded-btn border px-3 py-2.5 text-sm font-bold transition-colors duration-200 ${
                      active
                        ? "border-ink-950 bg-ink-950 text-white"
                        : "border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:bg-ink-50"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-2.5 text-xs text-ink-500">
              Benchmark basis: one {sector.basis}.
            </p>
          </fieldset>

          <SliderField
            label="EU-bound export volume"
            display={`${formatNumber(volume)} t / yr`}
            min={1000}
            max={sector.maxVolume}
            step={1000}
            value={volume}
            onChange={setVolume}
          />

          <SliderField
            label="Emissions intensity"
            display={`${intensity.toFixed(2)} tCO₂e / t`}
            min={0}
            max={sector.maxIntensity}
            step={0.01}
            value={intensity}
            onChange={setIntensity}
            hint={`Your verified installation figure. Benchmark for this good is ${sector.benchmark.toFixed(2)}.`}
          />

          <SliderField
            label="Certificate price"
            display={`€${certificatePrice} / tCO₂e`}
            min={40}
            max={160}
            step={1}
            value={certificatePrice}
            onChange={setCertificatePrice}
            hint="CBAM certificate price tracks the weekly average EU ETS auction price."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="benchmark-input"
                className="block text-sm font-bold text-ink-950"
              >
                Product benchmark
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="benchmark-input"
                  type="number"
                  min={0}
                  step={0.01}
                  value={benchmark}
                  onChange={(event) => setBenchmark(Math.max(0, Number(event.target.value)))}
                  className="tnum w-full rounded-btn border border-ink-200 bg-white px-3 py-2 font-mono text-sm text-ink-950
                             focus:border-brand-cyan-ink focus:outline-none"
                />
                <span className="shrink-0 font-mono text-xs text-ink-500">tCO₂e/t</span>
              </div>
              <p className="mt-1.5 text-xs text-ink-500">
                Editable — installation-level values differ.
              </p>
            </div>

            <div>
              <label
                htmlFor="year-select"
                className="block text-sm font-bold text-ink-950"
              >
                Compliance year
              </label>
              <select
                id="year-select"
                value={year}
                onChange={(event) => setYear(Number(event.target.value))}
                className="tnum mt-2 w-full rounded-btn border border-ink-200 bg-white px-3 py-2 font-mono text-sm text-ink-950
                           focus:border-brand-cyan-ink focus:outline-none"
              >
                {COMPLIANCE_YEARS.map((option) => (
                  <option key={option} value={option}>
                    {option} — {(CBAM_PHASE_IN[option] * 100).toFixed(1)}% phase-in
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-ink-500">
                Free allocation phases out to 2034.
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- Output ---------------- */}
        <div className="bg-ink-950 p-6 lg:col-span-2 lg:p-8">
          <p className="font-mono text-eyebrow uppercase text-ink-400">
            Indicative annual exposure
          </p>

          {/* A seven-figure euro amount at 2.75rem is wider than a 375px screen
              once the panel padding is taken off. `break-all` is the backstop
              if the number grows past even the reduced mobile size. */}
          <p className="tnum mt-3 font-mono text-[2rem] leading-none font-bold break-all text-white sm:text-[2.75rem] sm:break-normal">
            {formatEuro(result.annualCost)}
          </p>
          <p className="mt-2.5 text-sm text-ink-400">
            <span className="tnum font-mono text-brand-cyan">
              {formatEuro(result.costPerTonneProduct)}
            </span>{" "}
            loaded onto every tonne shipped
          </p>

          {/* Benchmark vs chargeable */}
          <div className="mt-7">
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-ink-800">
              <div
                className="h-full bg-brand-cyan transition-[width] duration-500 ease-brand"
                style={{ width: `${withinBenchmarkPct}%` }}
              />
              <div
                className="h-full bg-brand-green transition-[width] duration-500 ease-brand"
                style={{ width: `${100 - withinBenchmarkPct}%` }}
              />
            </div>
            <div className="mt-2.5 flex justify-between font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-400">
              <span>Within benchmark</span>
              <span>Above benchmark</span>
            </div>
          </div>

          <dl className="mt-7 space-y-3 border-t border-white/10 pt-6">
            <OutputRow
              term="Embedded emissions"
              value={`${formatNumber(result.embeddedEmissions)} tCO₂e`}
            />
            <OutputRow
              term="Benchmark allowance"
              value={`${formatNumber(result.benchmarkAllowance)} tCO₂e`}
            />
            <OutputRow
              term="Above benchmark"
              value={`${formatNumber(result.excessEmissions)} tCO₂e`}
            />
            <OutputRow
              term={`CBAM factor, ${year}`}
              value={`${(result.phaseInFactor * 100).toFixed(1)}%`}
            />
            <OutputRow
              term="Certificates to surrender"
              value={`${formatNumber(result.certificatesRequired)} tCO₂e`}
              emphasis
            />
          </dl>

          {result.excessEmissions === 0 && (
            <p className="mt-6 rounded-btn border border-brand-green/30 bg-brand-green/10 px-3 py-2.5 text-xs leading-relaxed text-brand-green-hi">
              At this intensity you sit at or below the product benchmark — no certificate
              obligation arises on this volume.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function SliderField({
  label,
  display,
  min,
  max,
  step,
  value,
  onChange,
  hint,
}: {
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-bold text-ink-950">
          {label}
        </label>
        <span className="tnum shrink-0 font-mono text-sm font-bold text-ink-950">
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        /* No appearance-none: the native control gives us a filled track in
           brand cyan via accent-color, plus correct keyboard behaviour.
           `h-6` widens the pointer target to a comfortable thumb band on
           touch — the native track still renders centred inside it — and
           `touch-manipulation` stops a quick double-drag being read as a
           double-tap zoom on iOS. */
        className="mt-2 h-6 w-full cursor-pointer touch-manipulation accent-brand-cyan"
      />
      {hint && <p className="mt-2 text-xs leading-relaxed text-ink-500">{hint}</p>}
    </div>
  );
}

function OutputRow({
  term,
  value,
  emphasis = false,
}: {
  term: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <dt className={emphasis ? "font-bold text-white" : "text-ink-400"}>{term}</dt>
      <dd
        className={`tnum shrink-0 font-mono ${
          emphasis ? "font-bold text-brand-cyan" : "text-ink-200"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
