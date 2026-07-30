import type { ReactNode } from "react";

/**
 * A scaffold marker for content that has not been supplied yet.
 *
 * DELIBERATELY UGLY, WITHIN REASON. Everything else on this site is finished
 * work, so a placeholder that quietly adopts the same card treatment would read
 * as shipped copy and survive to launch unnoticed. The dashed edge, the sunken
 * fill and the mono PLACEHOLDER chip exist so that nobody — client, reviewer or
 * the next agent through this repo — can mistake one of these for final content.
 *
 * It still uses the site's own tokens rather than a stray warning yellow: it has
 * to be obviously unfinished, not obviously broken.
 *
 * Every instance should be deleted, not edited into shape, once the real content
 * lands — grep for `<PlaceholderBlock` to find what is still outstanding.
 */
export function PlaceholderBlock({
  title,
  children,
  needs,
  className = "",
}: {
  /** What this block will become — e.g. "Company history". */
  title: string;
  /** Short note on why it is empty, in the site's own voice. */
  children: ReactNode;
  /** The specific inputs required to replace it. Rendered as a checklist. */
  needs?: readonly string[];
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border border-dashed border-ink-300 bg-ink-50 p-7 lg:p-8 ${className}`}
    >
      <p className="font-mono text-eyebrow uppercase text-ink-500">
        Placeholder — content pending
      </p>
      <h3 className="mt-4 text-h3 font-bold text-ink-950">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-ink-600">{children}</div>

      {needs && needs.length > 0 && (
        <>
          <p className="mt-6 font-mono text-eyebrow uppercase text-ink-500">
            To replace this block
          </p>
          <ul className="mt-3 space-y-2">
            {needs.map((need) => (
              <li
                key={need}
                className="flex gap-3 text-sm leading-relaxed text-ink-600"
              >
                {/* Hollow square, not the brand gradient rule — the gradient is
                    the signature of finished content and is not spent here. */}
                <span
                  aria-hidden
                  className="mt-[0.4rem] h-2 w-2 shrink-0 rounded-[2px] border border-ink-400"
                />
                <span>{need}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/**
 * Full-width banner for a page that is entirely provisional — the two legal
 * scaffolds. Heavier than PlaceholderBlock because it qualifies everything
 * beneath it rather than one section.
 */
export function PlaceholderBanner({ children }: { children: ReactNode }) {
  return (
    <div
      role="note"
      className="rounded-card border border-dashed border-ink-400 bg-ink-100 px-6 py-5 lg:px-7"
    >
      <p className="font-mono text-eyebrow uppercase text-ink-600">
        Placeholder — not legal copy, pending review
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-600">{children}</p>
    </div>
  );
}
