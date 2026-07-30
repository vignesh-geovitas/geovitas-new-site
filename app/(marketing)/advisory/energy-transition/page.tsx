import type { Metadata } from "next";
import { VERTICALS_BY_SLUG } from "@/lib/advisory";
import { AdvisoryDetail } from "@/components/site/advisory-detail";

const vertical = VERTICALS_BY_SLUG["energy-transition"];

export const metadata: Metadata = {
  title: vertical.metaTitle,
  description: vertical.metaDescription,
};

export default function EnergyTransitionPage() {
  return <AdvisoryDetail vertical={vertical} />;
}
