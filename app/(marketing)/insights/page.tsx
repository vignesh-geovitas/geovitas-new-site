import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { StaggerGroup, StaggerChild } from "@/components/ui/stagger";
import { MotionCard } from "@/components/ui/motion-card";
import { ArrowRight } from "@/components/ui/button";
import { PageHeader } from "@/components/site/page-header";
import { CtaBlock } from "@/components/site/cta-block";
import {
  INSIGHTS_BY_RECENCY,
  INSIGHT_CATEGORIES,
  type Insight,
} from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Breakdowns of the regulatory instruments that govern industrial carbon — CBAM, SEBI BRSR Core, CCTS — and of the measurement practice underneath them.",
};

/**
 * The content hub index.
 *
 * Every entry in lib/insights.ts is currently `status: "planned"`, so this page
 * renders as a commissioned slate rather than as an archive. That is deliberate:
 * a content hub with eight fake article links is worse than an honest one that
 * says what is coming, and the topics themselves signal the firm's depth even
 * before the writing lands.
 *
 * A planned entry is NOT a link — see `InsightCard`. When an article ships, add
 * its route at /insights/[slug], flip the entry to `status: "published"` with a
 * `published` date, and the card becomes a link with no change to this file.
 */
export default function InsightsPage() {
  const published = INSIGHTS_BY_RECENCY.filter((i) => i.status === "published");
  const planned = INSIGHTS_BY_RECENCY.filter((i) => i.status === "planned");

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="The instruments, read closely."
        lede="Regulatory breakdowns and measurement practice, written for the person who has to act on them. No commentary on announcements — only on what the text of an instrument actually requires."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      {/* ===================== Topic rail ===================== */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-12 sm:py-14">
          <Reveal>
            <h2 className="font-mono text-eyebrow uppercase text-ink-500">
              Topics
            </h2>
          </Reveal>
          {/* Labels, not filters. A filter control that cannot change anything
              because every entry is still planned would be worse than none —
              wire these to real filtering in the change that publishes the
              first few articles. */}
          <Reveal delay={0.06}>
            <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-3">
              {INSIGHT_CATEGORIES.map((category) => {
                const count = INSIGHTS_BY_RECENCY.filter(
                  (i) => i.category === category,
                ).length;
                return (
                  <li key={category}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-1.5 text-sm text-ink-600">
                      {category}
                      <span className="tnum font-mono text-[0.625rem] text-ink-400">
                        {count}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* ===================== Published ===================== */}
      {published.length > 0 && (
        <section className="border-t border-ink-200 bg-white">
          <Container className="py-16 sm:py-20 lg:py-28">
            <Reveal>
              <Eyebrow>Latest</Eyebrow>
            </Reveal>
            <StaggerGroup
              className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              step={0.07}
            >
              {published.map((insight) => (
                <StaggerChild key={insight.slug} className="h-full">
                  <InsightCard insight={insight} />
                </StaggerChild>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      )}

      {/* ===================== Commissioned ===================== */}
      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-16 sm:py-20 lg:py-28">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>In preparation</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                What we are writing next.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lead text-ink-600">
                Each of these is a breakdown of a public instrument or of the
                measurement practice beneath it. If one of them answers a
                question you have now, ask us directly rather than waiting for
                it to publish.
              </p>
            </Reveal>
          </div>

          <StaggerGroup
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            step={0.06}
          >
            {planned.map((insight) => (
              <StaggerChild key={insight.slug} className="h-full">
                <InsightCard insight={insight} />
              </StaggerChild>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1}>
            <p className="mt-12 text-sm text-ink-500">
              Want one of these ahead of publication?{" "}
              <Link
                href="/contact"
                className="font-bold text-ink-950 underline underline-offset-4 transition-colors duration-200 hover:text-brand-cyan-ink"
              >
                Get in touch
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}

/**
 * One card. A published entry is a link to its article; a planned one is a
 * static panel with a status chip — the guard is on `status`, so an entry can
 * never link to a route that has not shipped.
 */
function InsightCard({ insight }: { insight: Insight }) {
  const isPublished = insight.status === "published";

  const body = (
    <div className="flex h-full flex-col p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-eyebrow uppercase text-brand-cyan-ink">
          {insight.category}
        </span>
        {!isPublished && (
          <span className="rounded-full border border-ink-200 bg-ink-50 px-2 py-0.5 font-mono text-[0.5rem] tracking-[0.1em] uppercase text-ink-500">
            In preparation
          </span>
        )}
      </div>

      <h3 className="mt-4 text-h3 font-bold text-ink-950">{insight.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-500">
        {insight.standfirst}
      </p>

      <div className="mt-6 flex-1" />

      {isPublished ? (
        <span className="inline-flex items-center gap-2 text-sm font-bold text-ink-950 transition-colors duration-200 group-hover:text-brand-cyan-ink">
          Read
          <ArrowRight className="transition-transform duration-300 ease-brand group-hover:translate-x-1" />
        </span>
      ) : (
        <div className="flex items-center gap-3 border-t border-ink-150 pt-5 font-mono text-eyebrow uppercase text-ink-400">
          {insight.readingTime ?? "Not yet published"}
        </div>
      )}

      {isPublished && insight.published && (
        <time
          dateTime={insight.published}
          className="mt-4 block font-mono text-eyebrow uppercase text-ink-400"
        >
          {new Date(insight.published).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
      )}
    </div>
  );

  if (!isPublished) {
    return (
      <div className="h-full rounded-card border border-ink-200 bg-white shadow-card">
        {body}
      </div>
    );
  }

  return (
    <MotionCard className="group h-full rounded-card border border-ink-200 bg-white shadow-card transition-colors duration-300 ease-brand hover:border-brand-cyan/50">
      <Link href={`/insights/${insight.slug}`} className="block h-full">
        {body}
      </Link>
    </MotionCard>
  );
}
