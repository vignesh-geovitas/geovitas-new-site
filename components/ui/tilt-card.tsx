"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { EASE } from "@/components/ui/reveal";
import { useFinePointer } from "@/components/ui/use-fine-pointer";

/**
 * Pointer-driven 3D tilt.
 *
 * The site's card physics up to now was a 4px lift (see motion-card.tsx). This
 * is the same idea one dimension further out: the card rotates toward the
 * cursor on two axes, with a glare that tracks the same position. Reserved for
 * the cards that are genuinely the subject of their section — sector pillars,
 * capability tiles, people. Applying it to every card on the page would make
 * the whole site feel loose.
 *
 * WHY MOTION VALUES AND NOT REACT STATE
 * A tilt updates on every pointermove. Routed through useState that is a React
 * render per frame, which drops the animation to the reconciler's cadence and
 * re-renders the whole subtree as a side effect. Motion values write straight
 * to the DOM node and never touch the render cycle, so this stays on the
 * compositor no matter how complex the card is.
 *
 * WHY A SPRING ON THE WAY IN AND OUT
 * Raw pointer position maps 1:1 to rotation and feels brittle — the card snaps
 * to the cursor and stops dead when it leaves. The spring supplies the settle
 * that reads as physical mass, and it is what returns the card to flat on
 * pointerleave without a second transition.
 *
 * ROTATION IS SMALL ON PURPOSE. 7 degrees at the corners. Enterprise surfaces
 * carrying tabular figures cannot swing about; past roughly 10 degrees the type
 * visibly keystones and the numbers stop looking trustworthy.
 *
 * TOUCH DEVICES GET NO TILT AT ALL. `onPointerMove` fires for touch too, and a
 * card that rotates under the fingertip covering it — with no `pointerleave` on
 * a tap to put it back — is worse than a flat one. See use-fine-pointer.ts for
 * why this is gated on `(pointer: fine)` and not on a breakpoint.
 *
 * HOOK ORDER. Every motion value and transform below is declared
 * unconditionally, including the glare's, and only the RENDER is gated on
 * `glare` / `interactive`. Declaring them inside the conditional would change
 * the hook order between renders the moment a preference resolves.
 */

/** Degrees of rotation at the extreme corners. */
const MAX_TILT = 7;

/** Soft and slightly damped — settles quickly, never oscillates. */
const SPRING = { stiffness: 220, damping: 22, mass: 0.6 } as const;

/** The glare fades rather than tracking instantly; slower in than out. */
const GLARE_SPRING = { stiffness: 140, damping: 26, mass: 0.5 } as const;

export function TiltCard({
  children,
  className = "",
  containerClassName = "",
  /** Entrance stagger, in seconds — matches MotionCard's contract. */
  delay = 0,
  /** Moving highlight that tracks the cursor. Off for text-dense cards. */
  glare = true,
}: {
  children: ReactNode;
  /** Classes for the tilting surface — background, border, padding. */
  className?: string;
  /** Classes for the outer grid item. Grid placement belongs HERE. */
  containerClassName?: string;
  delay?: number;
  glare?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  /* One flag for "should this card respond to the pointer at all". */
  const interactive = finePointer && !reduceMotion;
  const ref = useRef<HTMLDivElement>(null);

  /* -1 .. 1 across each axis, origin at the card's centre. */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const hovered = useMotionValue(0);

  const springX = useSpring(pointerX, SPRING);
  const springY = useSpring(pointerY, SPRING);
  const glareOpacity = useSpring(hovered, GLARE_SPRING);

  /* Y pointer drives X rotation and vice versa — that cross-mapping is what
     makes the card appear to pivot about the cursor rather than away from it.
     The X axis is negated so pushing down tips the top edge away. */
  const rotateX = useTransform(springY, [-1, 1], [MAX_TILT, -MAX_TILT]);
  const rotateY = useTransform(springX, [-1, 1], [-MAX_TILT, MAX_TILT]);

  /* Glare rides the raw pointer, not the spring: a highlight that lags the
     cursor reads as a smear rather than as a reflection. */
  const glareX = useTransform(pointerX, [-1, 1], ["0%", "100%"]);
  const glareY = useTransform(pointerY, [-1, 1], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(26rem circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.5), transparent 55%)`;

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
    hovered.set(1);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
    hovered.set(0);
  }

  return (
    <motion.div
      data-reveal
      className={`perspective-card h-full ${containerClassName}`}
      /* Entrance stays identical to MotionCard so a grid mixing the two keeps
         one rhythm. Target unconditional; see the note in reveal.tsx. */
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.55, delay, ease: EASE }}
    >
      <motion.div
        ref={ref}
        onPointerMove={interactive ? handlePointerMove : undefined}
        onPointerLeave={interactive ? handlePointerLeave : undefined}
        /* preserve-3d so the glare layer shares the surface's 3D space instead
           of being flattened onto it. */
        className={`preserve-3d relative h-full ${className}`}
        style={interactive ? { rotateX, rotateY } : undefined}
      >
        {children}

        {glare && interactive && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBackground, opacity: glareOpacity }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
