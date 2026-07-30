"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * A figure that rolls to its value when it scrolls into view.
 *
 * Every statistic on this site is a real, citable one, and the point of
 * animating it is to make the reader actually look at it rather than skim past
 * a wall of numerals. It takes the figure as the STRING it is already written
 * as — "5,000", "15 MMT", "45%", "Schedule I" — and works out for itself what
 * part of that is countable.
 *
 * WHY IT WRITES textContent DIRECTLY
 * Sixty renders a second through useState would re-render the surrounding card
 * on every frame for a purely visual effect. Motion's `animate()` with an
 * onUpdate that writes to the node keeps the whole roll off the render cycle,
 * which is the same reasoning tilt-card.tsx uses for motion values.
 *
 * SERVER-RENDERED VALUE IS THE FINAL ONE. The element ships with the finished
 * figure as its children, so it is correct with JavaScript disabled, correct
 * for a crawler, and correct under reduced motion — the animation only ever
 * overwrites a value that was already right. That is the opposite of the usual
 * count-up implementation, which starts at zero and is wrong until it finishes.
 */

/** Digits, optional thousands separators, optional decimals. */
const NUMERIC = /-?\d[\d,]*(\.\d+)?/;

/** Years read badly counting from zero — roll them over a short run instead. */
const YEAR_RANGE = { min: 1900, max: 2199, runUp: 14 } as const;

export function CountUp({
  value,
  className = "",
  /** Seconds. Long enough to register, short enough not to hold the eye. */
  duration = 1.1,
  delay = 0,
}: {
  /** The figure exactly as it should read when finished. */
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const node = ref.current;
    if (!node) return;

    const match = value.match(NUMERIC);
    if (!match) return; // "Schedule I" and friends — nothing to count.

    const raw = match[0];
    const target = Number(raw.replace(/,/g, ""));
    if (!Number.isFinite(target)) return;

    const prefix = value.slice(0, match.index ?? 0);
    const suffix = value.slice((match.index ?? 0) + raw.length);
    const grouped = raw.includes(",");
    const decimals = raw.split(".")[1]?.length ?? 0;

    const isYear =
      decimals === 0 &&
      !grouped &&
      target >= YEAR_RANGE.min &&
      target <= YEAR_RANGE.max;
    const from = isYear ? target - YEAR_RANGE.runUp : 0;

    const format = (n: number) => {
      const rounded = decimals > 0 ? Number(n.toFixed(decimals)) : Math.round(n);
      return grouped || (!isYear && Math.abs(rounded) >= 1000)
        ? rounded.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : rounded.toFixed(decimals);
    };

    const controls = animate(from, target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = `${prefix}${format(latest)}${suffix}`;
      },
      /* Snap to the authored string at the end rather than to the formatter's
         idea of it — the printed figure has to match lib/* exactly. */
      onComplete: () => {
        node.textContent = value;
      },
    });

    return () => controls.stop();
  }, [inView, reduceMotion, value, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
