import { Hero } from "@/components/site/hero";
import { ProofStrip } from "@/components/site/proof-strip";
import { AdvisoryBento } from "@/components/site/advisory-bento";
import { EvidencePanel } from "@/components/site/evidence-panel";
import { Platform } from "@/components/site/platform";
import { SocialProof } from "@/components/site/social-proof";
import { Process } from "@/components/site/process";
import { ExposureSection } from "@/components/site/exposure-section";
import { CtaBlock } from "@/components/site/cta-block";

/**
 * NARRATIVE ORDER — the parent-child hierarchy is carried by sequence, not by
 * assertion. The firm establishes itself first (hero, regulatory facts, the
 * three advisory verticals); the measurement layer arrives after them, as what
 * sits underneath the work rather than as the offer itself.
 *
 * EvidencePanel precedes Platform deliberately. It shows the OUTPUT — a verified
 * inventory, coverage, drawdown against pathway — and Platform then explains the
 * machinery that produced it. Reversing the two sells the tool before the reader
 * knows what it is for.
 *
 * Section rhythm alternates paper and white so the bands read as chapters,
 * bookended by the two dark anchors:
 *   ink     hero (forest anchor) and briefing card — the page's dark frames
 *   white   proof, evidence, platform, approach
 *   paper   advisory (bento), clients, exposure model
 *
 * Chrome (SiteNav, <main>, SiteFooter) is supplied by app/(marketing)/layout.tsx.
 * The nav reads the "/" pathname and renders its dark, over-the-forest form
 * here on its own — this page passes it nothing.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <AdvisoryBento />
      <EvidencePanel />
      <Platform />
      {/* Placeholder until client logos and approved quotes land — see the
          header comment in social-proof.tsx for how to populate it. */}
      <SocialProof />
      <Process />
      <ExposureSection />
      <CtaBlock />
    </>
  );
}
