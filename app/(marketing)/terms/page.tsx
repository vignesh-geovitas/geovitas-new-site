import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { LegalScaffold, type LegalSection } from "@/components/site/legal-scaffold";

/**
 * NOINDEX WHILE PROVISIONAL — same reasoning as /privacy. The route is in the
 * sitemap so the information architecture is complete, but placeholder terms
 * should not be indexed under the company's name where they could be cited.
 *
 * DELETE THE `robots` KEY BELOW when approved copy lands.
 */
export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing use of the Geovitas website, including the basis on which its indicative regulatory exposure model is provided.",
  robots: { index: false, follow: true },
};

const SECTIONS: readonly LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of these terms",
    body: [
      "Will identify the Geovitas legal entity operating this site and state that use of the site constitutes acceptance of these terms, together with the effective date and how continued use after a change is treated.",
    ],
  },
  {
    id: "scope",
    heading: "Scope — website use, not services",
    body: [
      "Will draw the line clearly: these terms govern use of the website only. Advisory, platform and project work is governed by the executed engagement letter or master services agreement, which prevails over anything on this page in the event of conflict.",
    ],
  },
  {
    id: "permitted-use",
    heading: "Permitted use",
    body: [
      "Will permit ordinary business use and prohibit the rest — scraping, bulk extraction, automated access outside published crawler rules, reverse engineering, attempts to circumvent access controls, and any use that interferes with the site's operation.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    body: [
      "Will confirm ownership of the site's content, trade marks, brand assets and the Green Factory 360 AI name, and set out the limited licence granted to a visitor to view and print material for their own internal evaluation.",
      "Will state the position on quoting or reproducing material published here, and the attribution required.",
    ],
  },
  {
    id: "indicative-tools",
    heading: "Indicative tools and no reliance",
    body: [
      "The clause this site most needs. The regulatory exposure model produces an indicative scoping figure from inputs the user supplies; it is not a compliance determination, not tax or legal advice, and not a substitute for verified installation-level data or a declarant's own assessment.",
      "Will make explicit that Geovitas gives no warranty as to the accuracy of any output, accepts no liability for decisions taken on it, and that the methodology and its stated limits are set out on the exposure page itself.",
      "Should be drafted alongside the disclaimer already carried on /exposure and in the site footer, so the three say the same thing.",
    ],
  },
  {
    id: "regulatory-content",
    heading: "Regulatory and framework content",
    body: [
      "Will note that descriptions of CBAM, SEBI BRSR Core, CCTS and other frameworks reflect our understanding as at the stated date, that these instruments change, and that nothing on the site should be read as a statement of a reader's own obligations.",
    ],
  },
  {
    id: "third-party",
    heading: "Third-party links and materials",
    body: [
      "Will disclaim responsibility for external sites and for third-party content, and confirm that a link is not an endorsement.",
    ],
  },
  {
    id: "confidentiality",
    heading: "Confidentiality of enquiries",
    body: [
      "Will state how information sent through the site is treated before an engagement exists, and confirm that an unsolicited email does not by itself create a confidential relationship or a duty of care.",
    ],
  },
  {
    id: "disclaimers",
    heading: "Disclaimers and availability",
    body: [
      "Will provide the site on an 'as is, as available' basis, disclaim implied warranties to the extent permitted by law, and reserve the right to change, suspend or withdraw the site or any tool on it without notice.",
    ],
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: [
      "Will cap liability arising from website use and exclude indirect and consequential loss, while preserving the liabilities that cannot lawfully be excluded — death or personal injury caused by negligence, and fraud.",
    ],
  },
  {
    id: "indemnity",
    heading: "Indemnity",
    body: [
      "Will require a user to indemnify Geovitas against claims arising from their misuse of the site or breach of these terms.",
    ],
  },
  {
    id: "governing-law",
    heading: "Governing law and jurisdiction",
    body: [
      "Will specify Indian law and the courts at Chennai, Tamil Nadu, subject to confirmation — and set out the dispute resolution route, including whether arbitration is required before proceedings.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: [
      "Will explain how these terms are amended, where the current version and its effective date are recorded, and how material changes are communicated.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        lede="The terms governing use of this website, including the basis on which the indicative regulatory exposure model is made available. This document is a structural scaffold and is not yet in force."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
      />
      <LegalScaffold
        sections={SECTIONS}
        status="Draft scaffold. Not in force, not published, and not to be relied on. Awaiting counsel review."
      />
    </>
  );
}
