import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { LegalScaffold, type LegalSection } from "@/components/site/legal-scaffold";

/**
 * NOINDEX WHILE PROVISIONAL. A placeholder privacy policy indexed under the
 * company's name is a liability — it can be surfaced, cited or relied on before
 * counsel has seen a word of it. The route stays in the sitemap so the
 * information architecture is complete and the link is crawlable, but the page
 * itself asks not to be listed.
 *
 * DELETE THE `robots` KEY BELOW the moment approved copy lands. It is one line,
 * and leaving it in place would quietly keep a real policy out of the index.
 */
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Geovitas handles personal data collected through this website and in the course of client engagements.",
  robots: { index: false, follow: true },
};

const SECTIONS: readonly LegalSection[] = [
  {
    id: "introduction",
    heading: "Introduction and scope",
    body: [
      "Will identify the Geovitas legal entity acting as data controller, its registered address, and the jurisdictions whose data protection law applies — at minimum India's Digital Personal Data Protection Act, and the EU GDPR to the extent EU-based client and supplier contacts are processed in the course of CBAM work.",
      "Will state what this policy covers: this website, enquiries made through it, and personal data processed during client engagements where Geovitas acts as controller rather than processor.",
    ],
  },
  {
    id: "data-we-collect",
    heading: "Personal data we collect",
    body: [
      "Will list each category collected and its source. As the site stands, that is limited to what a visitor puts in an email they choose to send — there is no form, no account and no login.",
      "Will separately describe operational data collected during an engagement: client contact details, and the plant, utility and supplier records that underpin an emissions inventory, where those happen to identify an individual.",
    ],
  },
  {
    id: "how-we-use",
    heading: "How we use personal data",
    body: [
      "Will set out each purpose: responding to enquiries, delivering contracted services, meeting our own statutory and audit obligations, and maintaining the traceability that assurance providers require of the evidence base.",
      "Will confirm the position on marketing use and on any profiling — including that emissions data supplied by a client is not used to train models or build products beyond that client's engagement, if that is the intended commitment.",
    ],
  },
  {
    id: "legal-basis",
    heading: "Legal basis for processing",
    body: [
      "Will map each purpose above to its lawful basis — consent, contractual necessity, legal obligation, or legitimate interests — and record the balancing test where legitimate interests is relied on.",
    ],
  },
  {
    id: "sharing",
    heading: "Sharing and disclosure",
    body: [
      "Will name the categories of recipient: cloud hosting and infrastructure providers, assurance and verification bodies, professional advisers, and regulators where disclosure is compelled.",
      "Will state whether personal data is ever shared with the technology and delivery partners referenced elsewhere on this site, and on what basis.",
    ],
  },
  {
    id: "transfers",
    heading: "International transfers",
    body: [
      "Will identify where data is hosted and processed, and the safeguards applied to any transfer out of India or out of the EEA — standard contractual clauses, adequacy, or the DPDP Act's transfer provisions as applicable.",
    ],
  },
  {
    id: "retention",
    heading: "Data retention",
    body: [
      "Will give a retention period or the criteria used to set one, per category. Engagement records carry a longer floor than website enquiries: an audit trail has to remain reconstructable for as long as the reporting position it supports can be challenged.",
    ],
  },
  {
    id: "security",
    heading: "Security",
    body: [
      "Will describe the technical and organisational measures protecting personal data — access control, encryption in transit and at rest, and the incident response and breach notification process, including notification timelines.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: [
      "Will set out the rights available — access, correction, erasure, restriction, portability, objection, and withdrawal of consent — how to exercise each, the response time, and the right to complain to the relevant supervisory authority.",
      "Will name the Data Protection Officer or grievance officer and give their contact details, where appointment is required.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and analytics",
    body: [
      "Will disclose every cookie and similar technology in use, its purpose and its lifetime, together with the consent mechanism where one is required.",
      "This needs a factual audit before it is written. No analytics or tracking is currently installed on this site; if any is added, this section and the consent mechanism have to land in the same change.",
    ],
  },
  {
    id: "children",
    heading: "Children's data",
    body: [
      "Will confirm that the site and services are directed at businesses and public bodies rather than children, and state the position on verifiable parental consent under the DPDP Act should children's data ever be processed.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: [
      "Will explain how material changes are notified and where the effective date and version history are recorded.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lede="How Geovitas collects, uses and protects personal data — through this website and in the course of an engagement. This document is a structural scaffold and is not yet in force."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <LegalScaffold
        sections={SECTIONS}
        status="Draft scaffold. Not in force, not published, and not to be relied on. Awaiting counsel review."
      />
    </>
  );
}
