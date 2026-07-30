import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PlaceholderBanner } from "@/components/site/placeholder-block";
import { CONTACT_EMAIL, REGISTERED_ADDRESS } from "@/lib/contact";

/**
 * Shared shell for /privacy and /terms. Both are the same document shape — a
 * qualifying banner, a contents rail, then numbered clauses — so they share a
 * renderer and the two route files carry only their own headings.
 *
 * WHY THE CLAUSE BODIES ARE DESCRIPTIONS, NOT DRAFT LEGAL TEXT.
 * Each section below says what the clause *will* cover rather than attempting
 * the clause itself. Plausible-looking legal prose is the more dangerous
 * placeholder: a reader can rely on it, and a reviewer can skim past it as
 * already-drafted. A description cannot be mistaken for an operative term, and
 * it still gives counsel the structure to draft into.
 */
export type LegalSection = {
  /** Anchor id — the contents rail links to it. */
  id: string;
  heading: string;
  /** What this clause will cover. One or more short paragraphs. */
  body: readonly string[];
};

export function LegalScaffold({
  sections,
  /** Shown in the document furniture, e.g. "Not yet in force". */
  status,
}: {
  sections: readonly LegalSection[];
  status: string;
}) {
  return (
    <section className="border-t border-ink-200 bg-white">
      <Container className="py-16 lg:py-24">
        <Reveal>
          <PlaceholderBanner>
            The headings below are the standard structure this document will
            follow. The text under each one describes what the clause will cover
            — it is not the clause, and nothing on this page is in force or may
            be relied on. Counsel-approved copy replaces it in full before
            launch.
          </PlaceholderBanner>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---- Contents rail ---- */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="font-mono text-eyebrow uppercase text-ink-500">
                  Contents
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <ol className="mt-5 space-y-2.5">
                  {sections.map((section, index) => (
                    <li key={section.id} className="flex gap-3 text-sm">
                      <span className="tnum shrink-0 font-mono text-xs text-ink-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Link
                        href={`#${section.id}`}
                        className="text-ink-500 transition-colors duration-200 hover:text-ink-950"
                      >
                        {section.heading}
                      </Link>
                    </li>
                  ))}
                </ol>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-8 border-t border-ink-200 pt-5 font-mono text-eyebrow uppercase text-ink-500">
                  Status
                </p>
                <p className="mt-2.5 text-sm text-ink-600">{status}</p>
              </Reveal>
            </div>
          </div>

          {/* ---- Clauses ---- */}
          <div className="lg:col-span-8 lg:col-start-5">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <Reveal key={section.id} delay={0.04}>
                  {/* scroll-mt clears the fixed nav when the rail deep-links. */}
                  <section
                    id={section.id}
                    className="scroll-mt-28 border-t border-ink-200 pt-7 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="tnum shrink-0 font-mono text-sm font-bold text-brand-cyan-ink">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-h3 font-bold text-ink-950">
                        {section.heading}
                      </h2>
                    </div>
                    <div className="mt-4 space-y-3.5 pl-0 sm:pl-10">
                      {section.body.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraphIndex}
                          className="text-sm leading-relaxed text-ink-600"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>

            {/* Who to write to about this document. Real, even while the
                clauses are not — a query has to land somewhere. */}
            <Reveal delay={0.08}>
              <div className="mt-14 border-t border-ink-200 pt-8">
                <h2 className="text-[0.9375rem] font-bold text-ink-950">
                  Questions about this document
                </h2>
                <address className="mt-3 space-y-1 text-sm not-italic leading-relaxed text-ink-600">
                  <p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-brand-cyan-ink transition-colors duration-200 hover:text-ink-950"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                  {REGISTERED_ADDRESS.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
