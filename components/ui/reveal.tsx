"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Single easing curve for the whole site. Decelerating, no overshoot. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/*
 * Both primitives always render a motion.div and toggle the animation props,
 * rather than swapping to a plain <div> when motion is reduced. Swapping the
 * element type changes the tree between the server and client render and
 * trips a hydration mismatch.
 *
 * REDUCED MOTION — READ BEFORE CHANGING THE PROPS BELOW.
 * The obvious implementation is `initial={reduce ? false : {opacity:0}}` with
 * `whileInView={reduce ? undefined : {opacity:1}}`. It silently hides the
 * entire page. `useReducedMotion()` cannot resolve a media query on the
 * server, so SSR always emits `style="opacity:0"`; if the client then decides
 * motion is reduced and supplies no target, Motion has nothing to animate to
 * and never clears that inline style. Every revealed element stays invisible.
 *
 * So the target is unconditional and only the TRANSITION changes: reduced
 * motion collapses the duration to zero, which honours the preference (no
 * perceived movement) while still guaranteeing the element ends up visible.
 *
 * `data-reveal` is the hook the root layout's <noscript> stylesheet uses to
 * force these visible — the server HTML ships them at opacity:0, so without
 * that fallback a JS failure would leave the page blank.
 */

const INSTANT = { duration: 0 } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Stagger groups by ~0.06 per item. */
  delay?: number;
  /** Travel distance in px. Keep small — this is hierarchy, not decoration. */
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduceMotion ? INSTANT : { duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Hairline that draws itself in from the left as it enters the viewport. */
export function RevealRule({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={`brand-gradient h-px w-full origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduceMotion ? INSTANT : { duration: 0.9, delay, ease: EASE }}
    />
  );
}
