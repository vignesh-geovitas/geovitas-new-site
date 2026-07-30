import type { Metadata } from "next";
import { SECTORS_BY_SLUG } from "@/lib/sectors";
import { SectorDetail } from "@/components/site/sector-detail";

const sector = SECTORS_BY_SLUG["urban-local-bodies"];

export const metadata: Metadata = {
  title: sector.metaTitle,
  description: sector.metaDescription,
};

export default function UrbanLocalBodiesPage() {
  return <SectorDetail sector={sector} />;
}
