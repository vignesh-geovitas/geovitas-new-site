import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { BrandMesh } from "@/components/ui/brand-mesh";

/**
 * Subpage hero. The dark forest anchor stays home-only; every other page opens
 * on this — the same brand gesture as the hero, but in its light form on the
 * white canvas, so subpages read as the same site without competing with the
 * homepage for weight.
 *
 * The heading is `text-h2`, not the hero's `text-display`: it is an <h1>
 * semantically, but sized a rung down so the homepage keeps the largest type on
 * the site. Top padding clears the fixed, transparent nav that rides over it
 * (matching the hero's `pt-32 / lg:pt-40`).
 *
 * Server Component — the Reveal wrappers are the only client pieces, and they
 * compose fine as children. BrandMesh needs a `relative overflow-hidden`
 * parent; the <section> provides it and clips the blur bleed.
 */
type Crumb = {
  label: string;
  /** Omit on the current page — the trailing crumb renders as plain text. */
  href?: string;
};

export function PageHeader({
  eyebrow,
  title,
  lede,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  breadcrumb?: readonly Crumb[];
  /** Optional actions (buttons, links) rendered beneath the lede. */
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Faint geospatial dot-grid, concentrated toward the upper right and
          fading out — the same technical texture the platform section carries,
          so subpage heroes read as part of the data story rather than empty
          paper. Decorative and non-interactive. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-ink-300) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 78% 20%, black, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 78% 20%, black, transparent 72%)",
          opacity: 0.5,
        }}
      />
      {/* A single slow-bobbing brand orb on the right, where the copy leaves the
          most air — enough motion to keep the header alive without pulling the
          eye off the headline. */}
      <div
        aria-hidden
        className="gv-float pointer-events-none absolute top-16 right-[10%] hidden h-44 w-44 rounded-full bg-brand-teal/15 blur-3xl lg:block"
      />

      <BrandMesh
        variant="light"
        className="[mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
      />

      {/* pt clears the fixed nav (64px on mobile, 72px at lg) and then adds the
          header's own breathing room. Tightened on phones — 128px of dead space
          above an h1 pushes the lede off a 667px screen entirely. */}
      <Container className="relative pt-26 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
        {breadcrumb && breadcrumb.length > 0 && (
          <Reveal>
            <Breadcrumb items={breadcrumb} />
          </Reveal>
        )}

        <Reveal delay={breadcrumb ? 0.04 : 0}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-3xl text-h2 font-bold text-ink-950">{title}</h1>
        </Reveal>
        {lede && (
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-lead text-ink-600">{lede}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">{children}</div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

/** Compact breadcrumb. The last crumb is the current page and is not a link. */
function Breadcrumb({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-7">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-eyebrow uppercase text-ink-500">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-x-2">
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="transition-colors duration-200 hover:text-ink-950"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-ink-600">
                  {crumb.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden className="text-ink-300">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
