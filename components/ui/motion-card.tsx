"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/components/ui/reveal";

/**
 * The site's single card-physics contract. Every interactive card — sector
 * pillars, bento tiles, platform capabilities — animates identically because
 * they all come through here.
 *
 * WHY TWO NESTED motion.div:
 * The entrance (`y: 20 -> 0`) and the hover lift (`y: -4`) both write
 * `transform.y`. Declared on one element they contend for the same value and
 * the card either snaps on hover or never settles from its entrance. Splitting
 * them across two layers gives each animation sole ownership of one transform,
 * which also lets the entrance stay a tween while the hover runs on a spring.
 */

/** Default lift. Restrained — most tiles on the page are informational. */
const HOVER_SHADOW = "0px 10px 30px rgba(0,0,0,0.05)";

/** For image-led cards, which need a deeper bed to look like they lifted. */
export const HOVER_SHADOW_LARGE = "0px 24px 60px rgba(11,12,13,0.12)";

/** Firm but unbouncy — enterprise surfaces should not wobble. */
const SPRING: Transition = { type: "spring", stiffness: 300, damping: 30, mass: 0.8 };

type MotionCardProps = {
  children: ReactNode;
  /** Classes for the card surface itself — background, border, padding. */
  className?: string;
  /**
   * Classes for the OUTER wrapper. Grid placement belongs here, not in
   * `className`: the outer element is the grid item, so a `col-span-*` passed
   * to the inner surface silently does nothing and the tile renders at one
   * column wide.
   */
  containerClassName?: string;
  /** Entrance stagger, in seconds. Group items by ~0.08. */
  delay?: number;
  /** Opt out of the hover lift for non-interactive tiles. */
  lift?: boolean;
  /** Override the hover shadow — pass HOVER_SHADOW_LARGE for image cards. */
  hoverShadow?: string;
};

export function MotionCard({
  children,
  className = "",
  containerClassName = "",
  delay = 0,
  lift = true,
  hoverShadow = HOVER_SHADOW,
}: MotionCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={`h-full ${containerClassName}`}
      /* Target is unconditional; only the transition responds to the motion
         preference. See the reduced-motion note in reveal.tsx — gating the
         target instead leaves SSR's inline opacity:0 permanently uncleared. */
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.55, delay, ease: EASE }
      }
    >
      <motion.div
        className={`h-full ${className}`}
        /* No entrance on this layer — it owns hover only. */
        initial={false}
        whileHover={
          reduceMotion || !lift ? undefined : { y: -4, boxShadow: hoverShadow }
        }
        transition={SPRING}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
