"use client";

import { motion, useReducedMotion, type Transition, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/components/ui/reveal";

/**
 * Parent-orchestrated stagger for lists and tile groups.
 *
 * The container declares the timing and the children only declare their target,
 * so a list of any length stays in sequence without hand-tuning a delay per
 * item. Pair `StaggerList` with `StaggerItem` (ul/li) or `StaggerGroup` with
 * `StaggerChild` (div/div) — the element pairs exist so a <li> is always the
 * direct child of its <ul>, which the HTML parser requires.
 *
 * REDUCED MOTION: as in reveal.tsx, the `show` target is identical either way
 * and only the timing collapses. Gating the target instead would leave SSR's
 * inline opacity:0 uncleared and hide the list permanently.
 */

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function containerVariants(step: number, reduce: boolean): Variants {
  return {
    hidden: {},
    show: {
      transition: reduce
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: step, delayChildren: 0.04 },
    },
  };
}

function itemTransition(reduce: boolean): Transition {
  return reduce ? { duration: 0 } : { duration: 0.45, ease: EASE };
}

const VIEWPORT = { once: true, margin: "-60px" } as const;

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. */
  step?: number;
};

type ItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerList({
  children,
  className,
  step = 0.07,
  ordered = false,
}: ContainerProps & {
  /** Render an <ol> instead of a <ul> for genuinely sequential content. */
  ordered?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const List = ordered ? motion.ol : motion.ul;

  return (
    <List
      className={className}
      variants={containerVariants(step, !!reduceMotion)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </List>
  );
}

export function StaggerItem({ children, className }: ItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      data-reveal
      className={className}
      variants={ITEM_VARIANTS}
      transition={itemTransition(!!reduceMotion)}
    >
      {children}
    </motion.li>
  );
}

export function StaggerGroup({ children, className, step = 0.07 }: ContainerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={containerVariants(step, !!reduceMotion)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChild({ children, className }: ItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={className}
      variants={ITEM_VARIANTS}
      transition={itemTransition(!!reduceMotion)}
    >
      {children}
    </motion.div>
  );
}
