import type { Metadata } from "next";
import { VERTICALS_BY_SLUG } from "@/lib/advisory";
import { AdvisoryDetail } from "@/components/site/advisory-detail";

const vertical = VERTICALS_BY_SLUG["green-factory-360"];

export const metadata: Metadata = {
  title: vertical.metaTitle,
  description: vertical.metaDescription,
};

export default function GreenFactory360Page() {
  return <AdvisoryDetail vertical={vertical} />;
}
