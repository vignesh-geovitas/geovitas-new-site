"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * A rail that scrolls forever.
 *
 * Used for the framework labels — CBAM, BRSR Core, CCTS and the rest. They are
 * a list of instruments, not a hierarchy, and set as a static wrapped row they
 * read as dead weight under the headline. Moving them turns the same words into
 * a ticker, which is closer to what they actually are.
 *
 * WHY THE TRACK IS DUPLICATED
 * A single copy translated by -100% leaves the rail empty for one frame as it
 * snaps back. Two identical copies laid end to end mean that when the first has
 * travelled its full width the second sits exactly where the first began — the
 * reset is invisible because the pixels are identical. The duplicate is
 * aria-hidden so a screen reader hears the list once.
 *
 * WHY A LINEAR EASE AND NO SPRING
 * Any easing at all makes an infinite loop visibly pulse at the seam. This is
 * the one animation on the site that must not decelerate.
 *
 * REDUCED MOTION renders the plain wrapped row, which is what the markup was
 * before this component existed.
 *
 * WHY `itemClassName` AND NOT A RENDER PROP
 * The obvious API is `children: (item) => ReactNode`. It cannot work: every
 * caller here is a Server Component, and a function prop crossing into a Client
 * Component is not serialisable — React rejects it at prerender with "Functions
 * cannot be passed directly to Client Components". Passing the styling as a
 * class string keeps the rail dumb and the boundary clean.
 */
export function Marquee({
  items,
  className = "",
  /** Seconds for one full pass. Longer is calmer; under ~20s reads as urgent. */
  duration = 32,
  /** Classes applied to each label. */
  itemClassName = "",
}: {
  items: readonly string[];
  className?: string;
  duration?: number;
  itemClassName?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={`flex flex-wrap items-center gap-x-8 gap-y-2 ${className}`}>
        {items.map((item) => (
          <span key={item} className={itemClassName}>
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    /* The mask is what stops the rail looking cut off: labels dissolve at both
       edges instead of colliding with the panel border. */
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-x-8 pr-8"
          >
            {items.map((item) => (
              <span key={item} className={`shrink-0 whitespace-nowrap ${itemClassName}`}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
