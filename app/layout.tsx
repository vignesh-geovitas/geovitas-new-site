import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/**
 * Century Gothic is the brand book's primary typeface for outward / client
 * facing communication (Bold for headings, Regular for body). Licensed
 * Monotype face — self-hosted from WOFF2 under the client's own licence
 * rather than served from a third party.
 */
const centuryGothic = localFont({
  src: [
    { path: "./fonts/CenturyGothic-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/CenturyGothic-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-century-gothic",
  display: "swap",
  fallback: ["Futura", "Century Gothic", "ui-sans-serif", "system-ui", "sans-serif"],
});

/** Scoped strictly to data readouts and eyebrows — never to brand copy. */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Geovitas — Unlocking Economic Potential Through Climate Action",
    template: "%s | Geovitas",
  },
  description:
    "Geovitas builds the audit-grade infrastructure that cities, manufacturers, and energy operators need to satisfy CBAM and SEBI BRSR mandates, reduce compliance costs, and monetize verified emission reductions.",
  keywords: [
    "CBAM",
    "SEBI BRSR Core",
    "CCTS carbon credits",
    "Product Carbon Footprint",
    "Scope 1-3 emissions",
    "climate infrastructure",
    "decarbonisation advisory",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Geovitas",
    title: "Unlocking Economic Potential Through Climate Action",
    description:
      "Audit-grade climate infrastructure for CBAM, SEBI BRSR Core, and CCTS compliance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geovitas — Unlocking Economic Potential Through Climate Action",
    description:
      "Audit-grade climate infrastructure for CBAM, SEBI BRSR Core, and CCTS compliance.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /* Next 16 no longer overrides scroll-behaviour during navigation. This
         attribute restores the instant jump-to-top on route change while
         keeping smooth scrolling for in-page anchors. */
      data-scroll-behavior="smooth"
      className={`${centuryGothic.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full bg-white font-sans antialiased">
        {/* Scroll reveals are server-rendered at opacity:0 and animated in by
            Motion after hydration. Without JS that would leave the page blank,
            so force every reveal visible when scripting is unavailable. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
