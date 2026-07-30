"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Scroll-linked vertical drift.
 *
 * Everything else that moves on this site moves ONCE, on entry. Parallax is the
 * only effect here tied to scroll position for its whole life, which is why it
 * is rationed: photography, and the decorative layers behind a dark panel.
 * Applied to body copy it makes text hard to read while it settles.
 *
 * WHY `offset: ["start end", "end start"]`
 * That measures progress across the element's ENTIRE pass through the viewport
 * — 0 when its top edge meets the bottom of the screen, 1 when its bottom edge
 * leaves the top. Using the default window-based progress instead ties every
 * parallax on a page to the same clock, so elements low on the page have
 * already finished their travel before they are ever visible.
 *
 * WHY THE CONTENT IS OVERSCALED
 * Translating an element vertically inside a clipped box exposes an empty strip
 * at whichever edge it moves away from. `scale` on the inner layer grows the
 * content enough to cover the full travel. Callers that clip (a figure with
 * overflow-hidden) should leave `overscan` on; callers that do not clip can
 * turn it off and avoid the extra paint.
 */
export function Parallax({
  children,
  className = "",
  /**
   * Travel as a fraction of the element's own height, applied symmetrically.
   * 0.08 moves it 8% up and 8% down across the pass. Keep it under ~0.15 —
   * beyond that the layer visibly outruns the page and reads as a glitch.
   */
  speed = 0.08,
  /** Grow the inner layer to cover the strip the travel would otherwise expose. */
  overscan = true,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  overscan?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const percent = speed * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`${percent}%`, `-${percent}%`]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full w-full"
        style={{
          y,
          /* 1 + 2x the travel, so both extremes stay covered. */
          scale: overscan ? 1 + speed * 2 : 1,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
