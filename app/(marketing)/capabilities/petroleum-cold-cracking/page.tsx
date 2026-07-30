import type { Metadata } from "next";
import { CAPABILITIES_BY_SLUG } from "@/lib/capabilities";
import { CapabilityDetail } from "@/components/site/capability-detail";

const capability = CAPABILITIES_BY_SLUG["petroleum-cold-cracking"];

export const metadata: Metadata = {
  title: capability.metaTitle,
  description: capability.metaDescription,
};

export default function PetroleumColdCrackingPage() {
  return <CapabilityDetail capability={capability} />;
}
