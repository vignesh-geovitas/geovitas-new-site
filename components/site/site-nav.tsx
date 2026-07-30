"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

/**
 * Every entry resolves to a real destination. Only "Exposure model" is still an
 * in-page anchor on the homepage; the rest are full pages. Rendered through
 * next/link so that following one from a subpage is a client navigation rather
 * than a full document load.
 */
const NAV_LINKS = [
  { label: "Sectors", href: "/sectors" },
  { label: "Platform", href: "/platform" },
  { label: "Approach", href: "/approach" },
  { label: "Exposure model", href: "/#exposure" },
  { label: "About", href: "/about" },
] as const;

/**
 * Contact does not get a desktop slot. Five links plus two buttons already fill
 * the bar at the 1024px breakpoint, and a sixth pushes the CTAs into the logo.
 * It is reachable there from both header buttons, from the About hero and from
 * the footer — while the mobile sheet is a stacked list with room to spare, so
 * it earns its place there.
 */
const MOBILE_ONLY_LINKS = [{ label: "Contact", href: "/contact" }] as const;

/**
 * The nav derives its own treatment from the route rather than taking a prop:
 * the dark, over-the-forest form belongs only to the home hero, so it applies
 * on "/" and nowhere else. While the header is transparent at the top of that
 * page its logo, links and buttons switch to their on-dark forms; the moment it
 * gains its white scrolled background — or the mobile sheet opens — it reverts
 * to the light treatment every other route uses from the start.
 *
 * `usePathname()` resolves to "/" on the server render for the home route too,
 * so the initial `onDark` matches on both sides and there is no hydration flip.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Light content on a transparent header, but only while it actually sits over
  // the dark hero — once scrolled or the sheet is open the header is white.
  const onDark = pathname === "/" && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-brand ${
        scrolled || menuOpen
          ? "border-b border-ink-200 bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between lg:h-[72px]">
          <Link href="/" className="shrink-0" aria-label="Geovitas — home">
            {/* Brand book: colour brandmark on white, white brandmark on dark. */}
            <Logo
              variant={onDark ? "white" : "colour"}
              width={138}
              priority
              className="h-auto w-[124px] lg:w-[138px]"
            />
          </Link>

          {/* gap-8, not gap-9: the fifth link costs more width than the bar has
              spare at the lg breakpoint. */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[0.9375rem] transition-colors duration-200 ${
                    onDark
                      ? "text-white/80 hover:text-white"
                      : "text-ink-600 hover:text-ink-950"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              href="/platform"
              variant={onDark ? "onDarkOutline" : "outline"}
              size="sm"
            >
              Platform demo
            </Button>
            <Button
              href="/#briefing"
              variant={onDark ? "onDark" : "primary"}
              size="sm"
            >
              Schedule briefing
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`-mr-2 flex h-10 w-10 items-center justify-center rounded-btn lg:hidden ${
              onDark ? "text-white" : "text-ink-950"
            }`}
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
              {menuOpen ? (
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </nav>
      </Container>

      {menuOpen && (
        /* Capped to the viewport below the bar and scrollable inside it. The
           sheet is seven links plus two full-width buttons; on a short phone in
           landscape that is taller than the screen, and without this the last
           button is simply unreachable — the body is locked while the sheet is
           open, so the page behind it cannot scroll to reveal it. */
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-ink-200 bg-white lg:hidden"
        >
          <Container className="py-6">
            <ul className="flex flex-col">
              {[...NAV_LINKS, ...MOBILE_ONLY_LINKS].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-ink-150 py-4 text-lg text-ink-950"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <Button href="/#briefing" variant="primary" size="lg">
                Schedule Executive Briefing
              </Button>
              <Button href="/platform" variant="outline" size="lg">
                Get a Demo of Green Factory 360 AI
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
