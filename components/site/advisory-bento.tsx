import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { StaggerList, StaggerItem } from "@/components/ui/stagger";
import { ArrowRight } from "@/components/ui/button";
import { VERTICALS, type AdvisorySlug } from "@/lib/advisory";

/**
 * The three advisory verticals, as a bento of cards. Content is the single
 * source of truth in lib/advisory.ts so the homepage, the /advisory index, and
 * each detail page never disagree; the line icons live here because they are
 * JSX, keyed back to the vertical slugs.
 *
 * `showHeading` is on by default for the homepage section. The /advisory index
 * suppresses it because its PageHeader already carries the title and lede.
 */
const ICONS: Record<AdvisorySlug, ReactNode> = {
  "urban-local-bodies": <CityIcon />,
  "green-factory-360": <FactoryIcon />,
  "energy-transition": <EnergyIcon />,
};

export function AdvisoryBento({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="advisory" className="scroll-mt-20 border-t border-ink-200 bg-ink-50">
      <Container className="py-16 sm:py-20 lg:py-32">
        {showHeading && (
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Advisory verticals</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                Three verticals. One evidence base.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lead text-ink-600">
                Every engagement begins with the same audit-grade inventory. What changes is
                the mandate it has to satisfy and the capital decision it has to justify.
              </p>
            </Reveal>
          </div>
        )}

        <div className={`grid gap-6 lg:grid-cols-3 ${showHeading ? "mt-14" : ""}`}>
          {/* TiltCard rather than MotionCard here: these three are the subject
              of the section, and the photographic anchor gives the rotation
              something to read against. The rest of the site's cards keep the
              flat 4px lift — see the rationing note in tilt-card.tsx. */}
          {VERTICALS.map((vertical, index) => (
            <TiltCard
              key={vertical.slug}
              delay={index * 0.08}
              className="group relative flex flex-col overflow-hidden rounded-card border
                         border-ink-200 bg-white shadow-card
                         transition-colors duration-300 ease-brand hover:border-brand-cyan/50"
            >
              {/* ---- Visual anchor ---- */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={vertical.image}
                  alt={vertical.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-brand
                             group-hover:scale-[1.04]"
                />
                {/* Brand wash: ties stock photography of three different
                    subjects into one family, and darkens the base enough for
                    the glass chip to read. */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-ink-950/5 to-transparent"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-brand-cyan/10 opacity-0 transition-opacity
                             duration-500 ease-brand group-hover:opacity-100"
                />

                <span className="glass absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg text-brand-cyan-ink">
                  {ICONS[vertical.slug]}
                </span>
                <span className="tnum glass absolute top-3 right-3 rounded-md px-2 py-1 font-mono text-[0.625rem] text-ink-600">
                  {vertical.index}
                </span>
              </div>

              {/* ---- Copy ---- */}
              <div className="flex flex-1 flex-col p-7">
                <p className="font-mono text-eyebrow uppercase text-brand-cyan-ink">
                  {vertical.practice}
                </p>
                <p className="mt-1.5 text-xs text-ink-500">{vertical.mode}</p>

                {/* Headlines and body wrap to different depths across the row.
                    Reserving the taller measure at lg keeps the dividers and
                    bullet lists on a shared baseline. */}
                <h3 className="mt-4 text-h3 font-bold text-ink-950 lg:min-h-[5.25rem]">
                  {vertical.headline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500 lg:min-h-[7rem]">
                  {vertical.cardBody}
                </p>

                <StaggerList className="mt-6 space-y-3 border-t border-ink-150 pt-6">
                  {vertical.outcomes.map((outcome) => (
                    <StaggerItem
                      key={outcome}
                      className="flex gap-3 text-sm leading-relaxed text-ink-600"
                    >
                      <span
                        aria-hidden
                        className="brand-gradient mt-2 h-px w-3 shrink-0"
                      />
                      <span>{outcome}</span>
                    </StaggerItem>
                  ))}
                </StaggerList>

                <div className="mt-7 flex-1" />
                <Link
                  href={`/advisory/${vertical.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-ink-950
                             transition-colors duration-200 hover:text-brand-cyan-ink"
                >
                  Explore this practice
                  <ArrowRight className="transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                </Link>
              </div>
            </TiltCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -- Icons: 1.5px line work, matched optical weight ----------------------- */

function CityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M3 21h18M5 21V9l6-4v16M15 21V11l4-2v12M8 12h1m-1 3h1m-1 3h1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M3 21h18M4 21V10l6 4V10l6 4V6l4-2v19M8 18h1m6 0h1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EnergyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M13 3L5 14h6l-1 7 8-11h-6l1-7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
