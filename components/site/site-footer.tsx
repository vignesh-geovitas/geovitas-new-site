import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  REGISTERED_ADDRESS,
} from "@/lib/contact";

/** Each resolves to its own sector practice page. */
const SECTOR_LINKS = [
  { label: "Urban Local Bodies", href: "/sectors/urban-local-bodies" },
  { label: "Manufacturing & Export", href: "/sectors/manufacturing-export" },
  { label: "Oil, Gas & Energy", href: "/sectors/oil-gas-energy" },
] as const;

/* Platform first, then the physical assets — the two halves of what we deploy
   — before the two ways in. */
const ENGAGEMENT_LINKS = [
  { label: "Green Factory 360 AI", href: "/platform" },
  { label: "Transition capabilities", href: "/capabilities" },
  { label: "The engagement model", href: "/approach" },
  { label: "Regulatory exposure model", href: "/#exposure" },
  { label: "Executive briefing", href: "/#briefing" },
] as const;

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Standards we report against — labels, not destinations. They sit in a
 * horizontal rail beneath the columns rather than in one of them: as
 * non-links they were the weakest thing competing for a column, and the
 * released width is what lets Company join the grid.
 */
const FRAMEWORKS = [
  "EU CBAM",
  "SEBI BRSR Core",
  "CCTS",
  "SBTi",
  "GHG Protocol",
  "ISSB",
] as const;

/** Bottom-bar legal. Both are scaffolds pending counsel review. */
const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <Container className="py-12 sm:py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Identity + registered contact */}
          <div className="lg:col-span-4">
            {/* Brand book: the colour brandmark is for white backgrounds. */}
            <Logo variant="colour" width={148} />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-500">
              Climate infrastructure, project development, and technology-enabled advisory
              for regulated industry.
            </p>

            {/* Details come from lib/contact.ts so the footer, /contact and every
                mailto CTA can never drift apart. */}
            <address className="mt-8 space-y-1 text-sm not-italic leading-relaxed text-ink-500">
              {REGISTERED_ADDRESS.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="pt-2">
                <a
                  href={CONTACT_PHONE_HREF}
                  className="transition-colors duration-200 hover:text-ink-950"
                >
                  {CONTACT_PHONE}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors duration-200 hover:text-ink-950"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </address>
          </div>

          <FooterColumn title="Sectors" className="lg:col-span-3">
            {SECTOR_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Engagement" className="lg:col-span-3">
            {ENGAGEMENT_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company" className="lg:col-span-2">
            {COMPANY_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        {/* Frameworks rail */}
        <div className="mt-14 border-t border-ink-200 pt-8">
          <h2 className="font-mono text-eyebrow uppercase text-ink-500">
            Frameworks we report against
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
            {FRAMEWORKS.map((framework) => (
              <li key={framework} className="text-sm text-ink-500">
                {framework}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 border-t border-ink-200 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-500">
              © {new Date().getFullYear()} Geovitas. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-ink-500 transition-colors duration-200 hover:text-ink-950"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-ink-500">
            Exposure figures shown on this site are indicative and are not a compliance
            determination.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="font-mono text-eyebrow uppercase text-ink-500">{title}</h2>
      <ul className="mt-5 space-y-3.5">{children}</ul>
    </div>
  );
}

/** One <li> + <Link> — the three link columns styled identically. */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-ink-500 transition-colors duration-200 hover:text-ink-950"
      >
        {children}
      </Link>
    </li>
  );
}
