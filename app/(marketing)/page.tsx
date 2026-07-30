import { Hero } from "@/components/site/hero";
import { ProofStrip } from "@/components/site/proof-strip";
import { SectorPillars } from "@/components/site/sector-pillars";
import { Platform } from "@/components/site/platform";
import { SocialProof } from "@/components/site/social-proof";
import { Process } from "@/components/site/process";
import { ExposureSection } from "@/components/site/exposure-section";
import { CtaBlock } from "@/components/site/cta-block";

/**
 * NARRATIVE ORDER — the parent-child hierarchy is carried by sequence, not by
 * assertion. The firm establishes itself first (hero, regulatory facts, sector
 * practices); Green Factory 360 AI arrives fourth, as the measurement layer
 * underneath that work rather than as the offer itself.
 *
 * Section rhythm alternates paper and white so the bands read as chapters,
 * bookended by the two dark anchors:
 *   ink     hero (forest anchor) and briefing card — the page's dark frames
 *   white   proof, platform, approach
 *   paper   sectors (bento), clients, exposure model
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
      <SectorPillars />
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
