/**
 * Indicative CBAM certificate exposure model.
 *
 * SCOPE AND LIMITS — read before changing any number in this file.
 * This is a scoping tool for executive conversations, not a compliance
 * calculation. It applies published EU ETS product benchmarks and the CBAM
 * phase-in schedule to a user-supplied production volume and emissions
 * intensity. A real declaration depends on verified installation-level
 * embedded emissions, any carbon price already paid in the country of origin,
 * and the declarant's verified data.
 *
 * Every figure below is traceable to Regulation (EU) 2023/956 (CBAM) and the
 * EU ETS free-allocation benchmarks. Benchmarks are exposed in the UI as
 * editable inputs precisely because installation-level values differ.
 */

/**
 * CBAM factor — the share of embedded emissions subject to certificate
 * surrender in each compliance year, mirroring the phase-out of EU ETS free
 * allocation for CBAM goods.
 */
export const CBAM_PHASE_IN: Readonly<Record<number, number>> = {
  2026: 0.025,
  2027: 0.05,
  2028: 0.1,
  2029: 0.225,
  2030: 0.485,
  2031: 0.61,
  2032: 0.735,
  2033: 0.86,
  2034: 1,
};

export const COMPLIANCE_YEARS = Object.keys(CBAM_PHASE_IN).map(Number);

export type SectorKey = "steel" | "aluminium" | "cement" | "fertiliser";

export type Sector = {
  key: SectorKey;
  label: string;
  /** What one tonne of "product" refers to for this benchmark. */
  basis: string;
  /** Indicative EU ETS product benchmark, tCO2e per tonne of product. */
  benchmark: number;
  /** Typical unabated intensity used as the starting position, tCO2e/t. */
  defaultIntensity: number;
  /** Upper bound of the intensity slider. */
  maxIntensity: number;
  /** Starting EU-bound export volume, tonnes per year. */
  defaultVolume: number;
  maxVolume: number;
};

export const SECTORS: readonly Sector[] = [
  {
    key: "steel",
    label: "Iron & steel",
    basis: "tonne of crude steel",
    benchmark: 1.33,
    defaultIntensity: 2.5,
    maxIntensity: 4,
    defaultVolume: 60_000,
    maxVolume: 500_000,
  },
  {
    key: "aluminium",
    label: "Aluminium",
    basis: "tonne of primary aluminium",
    benchmark: 1.51,
    defaultIntensity: 9.5,
    maxIntensity: 20,
    defaultVolume: 25_000,
    maxVolume: 250_000,
  },
  {
    key: "cement",
    label: "Cement",
    basis: "tonne of grey clinker",
    benchmark: 0.69,
    defaultIntensity: 0.86,
    maxIntensity: 1.5,
    defaultVolume: 120_000,
    maxVolume: 800_000,
  },
  {
    key: "fertiliser",
    label: "Fertiliser",
    basis: "tonne of ammonia",
    benchmark: 1.62,
    defaultIntensity: 2.1,
    maxIntensity: 4,
    defaultVolume: 40_000,
    maxVolume: 300_000,
  },
] as const;

export type ExposureInput = {
  /** EU-bound export volume, tonnes per year. */
  volume: number;
  /** Emissions intensity of production, tCO2e per tonne of product. */
  intensity: number;
  /** Applicable product benchmark, tCO2e per tonne of product. */
  benchmark: number;
  /** CBAM certificate price, EUR per tCO2e. */
  certificatePrice: number;
  /** Compliance year, drives the phase-in factor. */
  year: number;
};

export type ExposureResult = {
  /** Total embedded emissions in the EU-bound volume, tCO2e. */
  embeddedEmissions: number;
  /** Emissions shielded by the free-allocation benchmark, tCO2e. */
  benchmarkAllowance: number;
  /** Emissions above benchmark before phase-in, tCO2e. */
  excessEmissions: number;
  /** Certificates to surrender after phase-in, tCO2e. */
  certificatesRequired: number;
  /** Indicative annual cost, EUR. */
  annualCost: number;
  /** Indicative cost loaded onto each tonne of product, EUR. */
  costPerTonneProduct: number;
  /** Applied CBAM factor for the selected year. */
  phaseInFactor: number;
  /** Intensity above benchmark, as a share of benchmark. Drives the gap bar. */
  intensityGapRatio: number;
};

export function calculateExposure({
  volume,
  intensity,
  benchmark,
  certificatePrice,
  year,
}: ExposureInput): ExposureResult {
  const phaseInFactor = CBAM_PHASE_IN[year] ?? 1;

  const embeddedEmissions = volume * intensity;
  const benchmarkAllowance = volume * benchmark;
  const excessEmissions = Math.max(0, embeddedEmissions - benchmarkAllowance);
  const certificatesRequired = excessEmissions * phaseInFactor;
  const annualCost = certificatesRequired * certificatePrice;

  return {
    embeddedEmissions,
    benchmarkAllowance,
    excessEmissions,
    certificatesRequired,
    annualCost,
    costPerTonneProduct: volume > 0 ? annualCost / volume : 0,
    phaseInFactor,
    intensityGapRatio: benchmark > 0 ? Math.max(0, intensity - benchmark) / benchmark : 0,
  };
}

/* -- Formatting ----------------------------------------------------------- */

export function formatEuro(value: number): string {
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `€${(value / 1_000).toFixed(0)}k`;
  return `€${value.toFixed(0)}`;
}

export function formatTonnes(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M t`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k t`;
  return `${value.toFixed(0)} t`;
}

/**
 * Thousands grouping, not lakh/crore — these figures sit beside euro amounts
 * and are read by EU buyers and auditors as much as by Indian operators.
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-GB").format(Math.round(value));
}
