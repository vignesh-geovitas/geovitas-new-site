/**
 * Single source of truth for how to reach Geovitas.
 *
 * The footer, the /contact page and every mailto call to action read from here,
 * so a change of inbox or a move of the registered office is a one-line edit
 * rather than a search across the tree — the same discipline lib/site.ts applies
 * to the canonical origin and lib/advisory.ts to the practices.
 *
 * NOTE ON THE INBOX — OUTSTANDING DECISION. `venu@geovitas.com` is the address
 * the site's existing calls to action already point at, so it stays the
 * destination here. But `contact@geovitas.com` is now the ONLY address on
 * Geovitas's published contact page and footer, which is stronger evidence than
 * the printed overview was that it is the routed inbox. Changing CONTACT_EMAIL
 * moves every mailto on the site in one edit; it has not been changed here
 * because where enquiries land is a business decision, not a build one.
 */

export const CONTACT_EMAIL = "venu@geovitas.com";

/** Display form and dial form are deliberately separate — one is typography. */
export const CONTACT_PHONE = "+91 98456 94128";
export const CONTACT_PHONE_HREF = "tel:+919845694128";

/** Registered office, as it appears on the company's own printed collateral. */
export const REGISTERED_ADDRESS = [
  "8/1, 12th Avenue, Ashok Nagar",
  "Chennai – 600083, Tamil Nadu, India",
] as const;

/**
 * Build a mailto with a pre-filled subject.
 *
 * `encodeURIComponent` rather than hand-written `%20` sequences: subjects are
 * editorial copy and will eventually contain an ampersand or a comma, both of
 * which silently truncate an unencoded mailto query in some clients.
 */
export function mailto(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

/**
 * The three reasons someone writes in, and the subject line each one sets.
 *
 * Capability pages set their own, more specific subjects — they live beside the
 * copy they belong to in lib/capabilities.ts and still route through mailto()
 * above, so this map stays the list of GENERAL enquiry types rather than
 * accumulating one key per page.
 */
export const ENQUIRY_SUBJECTS = {
  briefing: "Executive briefing request",
  demo: "Green Factory 360 AI platform demo",
  general: "General enquiry",
} as const;
