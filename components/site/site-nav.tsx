"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button, ArrowRight } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { VERTICALS } from "@/lib/advisory";

/**
 * Flat destinations. Advisory is not here — it owns the mega-menu below and is
 * rendered separately, because it is the only item with a panel.
 */
const NAV_LINKS = [
  { label: "Platform", href: "/platform" },
  { label: "Impact", href: "/impact" },
  { label: "Insights", href: "/insights" },
  { label: "Company", href: "/company" },
] as const;

/**
 * The mega-menu's second column. The three verticals come from lib/advisory.ts
 * and fill the first; these are the adjacent surfaces a reader browsing the
 * advisory tree most often wants next, so they ride along rather than competing
 * for a slot in the bar.
 */
const ADVISORY_ADJACENT = [
  {
    label: "Transition capabilities",
    href: "/capabilities",
    hint: "Compressed biogas, cold cracking, carbon capture",
  },
  {
    label: "The engagement model",
    href: "/approach",
    hint: "How an engagement is scoped, run and handed over",
  },
  {
    label: "Regulatory exposure model",
    href: "/exposure",
    hint: "Model your indicative CBAM certificate cost",
  },
] as const;

/**
 * Contact does not get a desktop slot. Four links plus the Advisory trigger and
 * two buttons already fill the bar at the 1024px breakpoint. It is reachable
 * from both header buttons, from the Company hero and from the footer — while
 * the mobile sheet is a stacked list with room to spare, so it earns its place
 * there.
 */
const MOBILE_ONLY_LINKS = [{ label: "Contact", href: "/contact" }] as const;

/**
 * The nav derives its own treatment from the route rather than taking a prop:
 * the dark, over-the-forest form belongs only to the home hero, so it applies
 * on "/" and nowhere else. While the header is transparent at the top of that
 * page its logo, links and buttons switch to their on-dark forms; the moment it
 * gains its white scrolled background — or either menu opens — it reverts to the
 * light treatment every other route uses from the start.
 *
 * `usePathname()` resolves to "/" on the server render for the home route too,
 * so the initial `onDark` matches on both sides and there is no hydration flip.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  /* The mega-menu is a hover affordance on a pointer device, but hovering off
     the trigger and onto the panel crosses a gap. Closing on `mouseleave`
     immediately would snatch the panel away mid-travel, so the close is
     deferred and any re-entry within the delay cancels it. */
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const closeMega = (delay = 140) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), delay);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Light content on a transparent header, but only while it actually sits over
  // the dark hero — once scrolled or a menu is open the header is white.
  const onDark = pathname === "/" && !scrolled && !menuOpen && !megaOpen;

  const advisoryActive = pathname.startsWith("/advisory");

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

  // Escape closes the mega-menu. Without this a keyboard user who opened it on
  // focus has no way out but tabbing through every link in the panel.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMegaOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  /* Following a link must dismiss the panel it was in — otherwise the menu
     survives the navigation it just triggered and covers the page the reader
     asked for. This is done on the links themselves rather than in an effect
     watching `pathname`: setState in an effect body cascades renders, and a
     pathname watcher would also miss a click on the route already showing. */
  const dismiss = () => {
    setMegaOpen(false);
    setMenuOpen(false);
  };

  const linkClass = onDark
    ? "text-white/80 hover:text-white"
    : "text-ink-600 hover:text-ink-950";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-brand ${
        scrolled || menuOpen || megaOpen
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

          <ul className="hidden items-center gap-8 lg:flex">
            {/* ---- Advisory: the one item with a panel ---- */}
            <li
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={() => closeMega()}
            >
              <button
                type="button"
                /* A disclosure, not a link. Hover and keyboard focus open the
                   panel; click toggles it. The hub itself is reached by the
                   "All verticals" link inside — a trigger that both navigated
                   and disclosed would give a keyboard user no way to see the
                   panel without leaving the page. */
                onClick={() => setMegaOpen((open) => !open)}
                onFocus={openMega}
                aria-expanded={megaOpen}
                aria-controls="advisory-mega"
                className={`flex items-center gap-1.5 text-[0.9375rem] transition-colors duration-200 ${linkClass} ${
                  advisoryActive ? (onDark ? "text-white" : "text-ink-950") : ""
                }`}
              >
                Advisory
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden
                  className={`h-3 w-3 transition-transform duration-200 ease-brand ${
                    megaOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </li>

            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={dismiss}
                    className={`text-[0.9375rem] transition-colors duration-200 ${linkClass} ${
                      active ? (onDark ? "text-white" : "text-ink-950") : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
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

      {/* ================= Advisory mega-menu (desktop) =================
          Full-bleed under the bar rather than a dropdown pinned to the trigger:
          three verticals with their modes plus an adjacent column is wider than
          any anchored panel can be without overhanging the viewport edge. */}
      {megaOpen && (
        <div
          id="advisory-mega"
          onMouseEnter={openMega}
          onMouseLeave={() => closeMega()}
          className="hidden border-t border-ink-150 bg-white shadow-panel lg:block"
        >
          <Container className="py-10">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <h2 className="font-mono text-eyebrow uppercase text-ink-500">
                  Advisory
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-600">
                  Three verticals on one audit-grade evidence base. What changes
                  is the mandate it has to satisfy.
                </p>
                <Link
                  href="/advisory"
                  onClick={dismiss}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ink-950 transition-colors duration-200 hover:text-brand-cyan-ink"
                >
                  All verticals
                  <ArrowRight />
                </Link>
              </div>

              {/* ---- The three verticals ---- */}
              <ul className="grid gap-2 lg:col-span-6 lg:grid-cols-1">
                {VERTICALS.map((vertical) => (
                  <li key={vertical.slug}>
                    <Link
                      href={`/advisory/${vertical.slug}`}
                      onClick={dismiss}
                      className="group flex gap-4 rounded-card border border-transparent p-4 transition-colors duration-200 hover:border-ink-200 hover:bg-ink-50"
                    >
                      <span className="tnum mt-0.5 font-mono text-[0.6875rem] font-bold text-brand-cyan-ink">
                        {vertical.index}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.9375rem] font-bold text-ink-950">
                          {vertical.practice}
                        </span>
                        <span className="mt-1 block font-mono text-eyebrow uppercase text-ink-500">
                          {vertical.mode}
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-ink-600">
                          {vertical.headline}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* ---- Adjacent surfaces ---- */}
              <div className="lg:col-span-3">
                <h2 className="font-mono text-eyebrow uppercase text-ink-500">
                  Alongside
                </h2>
                <ul className="mt-5 space-y-4">
                  {ADVISORY_ADJACENT.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} onClick={dismiss} className="group block">
                        <span className="block text-sm font-bold text-ink-950 transition-colors duration-200 group-hover:text-brand-cyan-ink">
                          {link.label}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-ink-500">
                          {link.hint}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </div>
      )}

      {menuOpen && (
        /* Capped to the viewport below the bar and scrollable inside it. The
           sheet is the full tree plus two full-width buttons; on a short phone
           in landscape that is taller than the screen, and without this the last
           button is simply unreachable — the body is locked while the sheet is
           open, so the page behind it cannot scroll to reveal it. */
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-ink-200 bg-white lg:hidden"
        >
          <Container className="py-6">
            {/* The mega-menu does not translate to a phone. Advisory becomes a
                labelled group with its three verticals indented under it —
                same hierarchy, no disclosure to operate. */}
            <div className="border-b border-ink-150 py-4">
              <Link
                href="/advisory"
                onClick={dismiss}
                className="block text-lg text-ink-950"
              >
                Advisory
              </Link>
              <ul className="mt-3 space-y-3 border-l border-ink-200 pl-4">
                {VERTICALS.map((vertical) => (
                  <li key={vertical.slug}>
                    <Link
                      href={`/advisory/${vertical.slug}`}
                      onClick={dismiss}
                      className="block text-[0.9375rem] text-ink-600"
                    >
                      {vertical.practice}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="flex flex-col">
              {[...NAV_LINKS, ...MOBILE_ONLY_LINKS].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={dismiss}
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
