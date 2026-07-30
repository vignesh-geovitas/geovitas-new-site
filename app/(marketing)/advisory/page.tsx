import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ImageSlot } from "@/components/ui/image-slot";
import { Parallax } from "@/components/ui/parallax";
import { PageHeader } from "@/components/site/page-header";
import { AdvisoryBento } from "@/components/site/advisory-bento";
import { CtaBlock } from "@/components/site/cta-block";

export const metadata: Metadata = {
  title: "Advisory",
  description:
    "Three advisory verticals — Urban Local Bodies, Manufacturing & Export, and Oil, Gas & Energy — on one audit-grade evidence base. What changes is the mandate and the capital decision each has to justify.",
};

export default function AdvisoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Advisory verticals"
        title="Three verticals. One evidence base."
        lede="Every engagement begins with the same audit-grade inventory. What changes is the mandate it has to satisfy and the capital decision it has to justify. Each vertical below opens into how we run it."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Advisory" }]}
      />

      {/* The homepage bento, reused with its heading suppressed — the PageHeader
          above already carries the section's title and lede. */}
      <AdvisoryBento showHeading={false} />

      {/* One wide plate holding all three verticals in a single frame, between
          the cards and the closing anchor. It is the only place on the site that
          argues the "one evidence base" claim visually rather than in prose. */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-12 sm:py-14 lg:py-20">
          <Reveal y={24}>
            <Parallax className="overflow-hidden rounded-card" speed={0.05}>
              <ImageSlot id="sectors-overview" sizes="100vw" />
            </Parallax>
          </Reveal>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}
