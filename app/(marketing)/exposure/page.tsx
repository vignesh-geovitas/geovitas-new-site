import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button, ArrowRight } from "@/components/ui/button";
import { ExposureCalculator } from "@/components/site/exposure-calculator";
import { PageHeader } from "@/components/site/page-header";
import { CBAM_PHASE_IN, SECTORS } from "@/lib/cbam";

export const metadata: Metadata = {
  title: "Regulatory Exposure Model — Methodology",
  description:
    "How Geovitas models indicative CBAM certificate exposure: product benchmarks, the phase-in schedule under Regulation (EU) 2023/956, and the limits of the estimate.",
};

const ASSUMPTIONS = [
  {
    term: "Embedded emissions",
    detail:
      "EU-bound export volume multiplied by the emissions intensity you supply. A real declaration uses verified installation-level data covering direct emissions and, for some goods, indirect emissions from electricity.",
  },
  {
    term: "Benchmark allowance",
    detail:
      "The share of embedded emissions shielded from charge, set by the EU ETS product benchmark for the good. Benchmarks are editable in the model because installation-level values differ materially.",
  },
  {
    term: "CBAM factor",
    detail:
      "The proportion of above-benchmark emissions subject to certificate surrender in a given year, mirroring the phase-out of free allocation for CBAM goods through 2034.",
  },
  {
    term: "Certificate price",
    detail:
      "CBAM certificates are priced against the weekly average EU ETS auction price. The model treats this as a single user-set figure rather than forecasting the carbon market.",
  },
  {
    term: "Not modelled",
    detail:
      "Carbon prices already paid in the country of origin, which may be deducted from the obligation; downstream goods; and any transitional reliefs specific to your declarant arrangements.",
  },
] as const;

export default function ExposurePage() {
  return (
    <>
      <PageHeader
        eyebrow="Methodology"
        title="How this exposure model works — and where it stops."
        lede="The model is deliberately simple. It exists to size a liability quickly enough to be useful in a board conversation, and it is explicit about every figure it does not account for."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Regulatory exposure model" },
        ]}
      />

      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-14 lg:py-20">
          <Reveal y={24}>
            <ExposureCalculator />
          </Reveal>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-7">
              <Reveal>
                <h2 className="text-h3 font-bold text-ink-950">
                  What each input means
                </h2>
              </Reveal>
              <dl className="mt-8 space-y-7">
                {ASSUMPTIONS.map((item, index) => (
                  <Reveal key={item.term} delay={index * 0.05}>
                    <div className="border-t border-ink-200 pt-6">
                      <dt className="text-[0.9375rem] font-bold text-ink-950">
                        {item.term}
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-ink-600">
                        {item.detail}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>

            <div className="min-w-0 lg:col-span-5">
              <Reveal>
                <h2 className="text-h3 font-bold text-ink-950">Phase-in schedule</h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  Share of above-benchmark emissions subject to certificate surrender,
                  by compliance year.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <table className="mt-7 w-full text-sm">
                  <caption className="sr-only">
                    CBAM factor by compliance year
                  </caption>
                  <thead>
                    <tr className="border-b border-ink-200">
                      <th scope="col" className="pb-2.5 text-left font-mono text-eyebrow uppercase text-ink-500">
                        Year
                      </th>
                      <th scope="col" className="pb-2.5 text-right font-mono text-eyebrow uppercase text-ink-500">
                        CBAM factor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(CBAM_PHASE_IN).map(([yearKey, factor]) => (
                      <tr key={yearKey} className="border-b border-ink-200">
                        <td className="tnum py-2.5 font-mono text-ink-950">{yearKey}</td>
                        <td className="tnum py-2.5 text-right font-mono text-ink-950">
                          {(factor * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>

              <Reveal delay={0.14}>
                <h3 className="mt-12 text-[0.9375rem] font-bold text-ink-950">
                  Default benchmarks applied
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {SECTORS.map((sector) => (
                    <li
                      key={sector.key}
                      className="flex items-baseline justify-between gap-4 border-b border-ink-200 pb-2.5 text-sm"
                    >
                      <span className="text-ink-600">
                        {sector.label}
                        <span className="block text-xs text-ink-500">
                          per {sector.basis}
                        </span>
                      </span>
                      <span className="tnum shrink-0 font-mono text-ink-950">
                        {sector.benchmark.toFixed(2)} tCO₂e/t
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.1}>
            <p className="mt-16 max-w-4xl border-t border-ink-200 pt-8 text-xs leading-relaxed text-ink-500">
              <span className="font-bold text-ink-600">Indicative only.</span> Figures
              produced by this model are a scoping aid for executive discussion and are
              not a compliance determination. Actual obligations depend on verified
              installation-level embedded emissions, any carbon price already paid in the
              country of origin, and your declarant&apos;s verified data. Source:
              Regulation (EU) 2023/956 establishing the Carbon Border Adjustment
              Mechanism. Position as at Q3 2026.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Button
                href="mailto:venu@geovitas.com?subject=Executive%20briefing%20request"
                variant="primary"
                size="lg"
              >
                Schedule Executive Briefing
                <ArrowRight />
              </Button>
              <Button href="/" variant="outline" size="lg">
                Back to homepage
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
