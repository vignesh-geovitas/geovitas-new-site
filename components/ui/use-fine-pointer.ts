"use client";

import { useSyncExternalStore } from "react";

/**
 * True only on devices with a precise pointing device — a mouse or trackpad.
 *
 * WHY THIS EXISTS
 * `onPointerMove` fires for touch as well as mouse. A card that tilts under a
 * fingertip is actively worse than a flat one: the rotation follows the finger
 * that is covering the card, the glare sits under the thumb, and because there
 * is no `pointerleave` on a tap the card can be left stranded at an angle. So
 * the 3D effects are gated on `(pointer: fine)` rather than on a viewport
 * width — a large tablet is still a touch device, and a small window on a
 * laptop still has a mouse.
 *
 * WHY useSyncExternalStore AND NOT useState + useEffect
 * A media query is external state, which is precisely what this hook is for.
 * The useState version has to call setState in an effect on mount to read the
 * initial value, which triggers a second render pass for every card on the
 * page — the cascading render `react-hooks/set-state-in-effect` warns about.
 * useSyncExternalStore reads the real value during render instead.
 *
 * `getServerSnapshot` returns false because `window.matchMedia` does not exist
 * on the server. That also makes the first client render match the server's, so
 * there is no hydration mismatch — and the failure mode of guessing wrong for
 * one frame is a card that is briefly inert, not one that is briefly broken.
 */

const QUERY = "(pointer: fine)";

function subscribe(onStoreChange: () => void): () => void {
  const list = window.matchMedia(QUERY);
  list.addEventListener("change", onStoreChange);
  return () => list.removeEventListener("change", onStoreChange);
}

/* Returns a boolean, so React's snapshot identity check is stable even though
   a fresh MediaQueryList is created on each read. */
function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useFinePointer(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
