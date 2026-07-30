import Image from "next/image";
import { IMAGE_SLOTS, ASPECT_CLASS, type ImageSlotId } from "@/lib/imagery";

/**
 * One image position on the site.
 *
 * Reads the slot out of lib/imagery.ts and renders ONE of two things:
 *   • the photograph, if `src` has been filled in;
 *   • an unmistakable commissioning placeholder, if it has not.
 *
 * That switch is the whole point. Art direction arrives piecemeal on a project
 * like this, and a component that silently renders nothing while it waits
 * leaves a hole nobody notices until launch. This leaves a brief on the page
 * instead, so the gap is visible to the client and to whoever picks the repo
 * up next — the same bargain components/site/placeholder-block.tsx strikes for
 * copy and social-proof.tsx strikes for client logos.
 *
 * PLACEHOLDER STYLING is deliberately unlovely: dashed edge, sunken fill, mono
 * chip. It still uses the site's own tokens rather than a warning yellow — it
 * has to read as unfinished, not as broken. The slow brand sweep across it is
 * there so a large empty rectangle reads as pending rather than as a bug.
 *
 * Server Component. The ken-burns push on hover is a CSS transition on the
 * group, so nothing here needs to ship JavaScript; wrap it in <Parallax> at the
 * call site when the slot wants scroll movement too.
 */
export function ImageSlot({
  id,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  /** Set on the one slot that appears above the fold. */
  preload = false,
  /** Suppress the gradient wash — for slots that are not sitting under text. */
  wash = true,
  /** Caption chip in the corner. Defaults to the slot's own label. */
  caption,
  /** Overrides the manifest's aspect where a layout needs a different crop. */
  aspect,
  /**
   * Short-form placeholder — chip and filename only, no brief. For slots inside
   * cards, where the full brief would overflow the crop. Has no effect once the
   * image lands.
   */
  compact = false,
  /**
   * Own border, radius and shadow. Turn OFF when the slot sits flush inside a
   * card that already supplies them.
   *
   * This is a prop rather than something a caller overrides with
   * `className="rounded-none border-0"`, because Tailwind resolves conflicting
   * utilities by their order in the generated STYLESHEET, not by their order in
   * the class attribute — so an override like that wins or loses depending on
   * which utility Tailwind happened to emit first. Not emitting the class at
   * all is the only deterministic answer.
   */
  chrome = true,
}: {
  id: ImageSlotId;
  className?: string;
  sizes?: string;
  preload?: boolean;
  wash?: boolean;
  caption?: string | false;
  aspect?: keyof typeof ASPECT_CLASS;
  compact?: boolean;
  chrome?: boolean;
}) {
  const slot = IMAGE_SLOTS[id];
  const aspectClass = ASPECT_CLASS[aspect ?? slot.aspect];
  const label = caption === false ? null : (caption ?? slot.label);
  const chromeClass = chrome
    ? "rounded-card border border-ink-200 shadow-panel"
    : "";

  if (!slot.src) {
    return (
      <ImagePending
        slot={slot}
        aspectClass={aspectClass}
        className={className}
        compact={compact}
        chrome={chrome}
      />
    );
  }

  return (
    <figure
      className={`group relative overflow-hidden ${chromeClass} ${aspectClass} ${className}`}
    >
      <Image
        src={slot.src}
        alt={slot.alt}
        fill
        preload={preload}
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
      />

      {wash && (
        <>
          {/* The same family treatment the sector cards carry, so photography
              from several sources still reads as one commissioned set. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-ink-950/5 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-brand-cyan/10 opacity-0 transition-opacity duration-500 ease-brand group-hover:opacity-100"
          />
        </>
      )}

      {label && (
        <figcaption className="glass absolute bottom-4 left-4 rounded-md px-3 py-1.5 font-mono text-eyebrow uppercase text-ink-600">
          {label}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * The unfilled state. Prints enough of the brief to be actionable without
 * opening lib/imagery.ts — the filename to save, the crop, and what the picture
 * is supposed to show.
 */
function ImagePending({
  slot,
  aspectClass,
  className,
  compact,
  chrome,
}: {
  slot: (typeof IMAGE_SLOTS)[ImageSlotId];
  aspectClass: string;
  className: string;
  compact: boolean;
  chrome: boolean;
}) {
  const isDiagram = slot.treatment === "diagram";
  const kind = isDiagram ? "Diagram pending" : "Image pending";
  /* The dashed edge is the placeholder's whole tell, so it survives chrome:false
     — only the radius is dropped, since the parent card supplies it. */
  const chromeClass = chrome
    ? "rounded-card border border-dashed border-ink-300"
    : "border-b border-dashed border-ink-300";

  if (compact) {
    return (
      <div
        role="note"
        className={`gv-shimmer flex flex-col items-start justify-end gap-1 bg-ink-50 p-5 ${chromeClass} ${aspectClass} ${className}`}
      >
        <p className="font-mono text-eyebrow uppercase text-ink-500">{kind}</p>
        <p className="text-sm font-bold text-ink-950">{slot.label}</p>
        <p className="font-mono text-[0.625rem] tracking-[0.12em] text-ink-500">
          {slot.id}
        </p>
      </div>
    );
  }

  return (
    <div
      role="note"
      className={`gv-shimmer flex flex-col bg-ink-50 p-6 lg:p-7 ${chromeClass} ${aspectClass} ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-eyebrow uppercase text-ink-500">
          {kind} — {isDiagram ? "to be drawn" : "to be generated"}
        </p>
        <span className="shrink-0 rounded-full border border-ink-300 px-2 py-0.5 font-mono text-[0.5625rem] tracking-[0.12em] uppercase text-ink-500">
          {slot.aspect}
        </span>
      </div>

      <h3 className="mt-4 text-h3 font-bold text-ink-950">{slot.label}</h3>

      {/* Clamped rather than scrolled: the brief is a prompt for whoever fills
          the slot, not page content, and it must never push the layout around
          or steal the scroll from the section it sits in. */}
      <p className="mt-3 line-clamp-6 text-sm leading-relaxed text-ink-600">
        {slot.brief}
      </p>

      <div className="mt-auto pt-5">
        <p className="font-mono text-[0.625rem] tracking-[0.12em] text-ink-500">
          public/imagery/{slot.id}.webp
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-ink-500">
          Set <span className="font-mono">src</span> on{" "}
          <span className="font-mono">{slot.id}</span> in{" "}
          <span className="font-mono">lib/imagery.ts</span> to replace this block.
        </p>
      </div>
    </div>
  );
}
