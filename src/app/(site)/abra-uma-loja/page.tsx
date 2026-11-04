import type { Metadata } from "next";
import { getSeoMetadata, getSeoSettings } from "@/lib/server/seo";
import { AnchorBrandsStrip } from "@/components/sections/AnchorBrandsStrip";
import { OpenStoreHero } from "@/components/pages/open-store/OpenStoreHero";
import { OpenStoreFormats } from "@/components/pages/open-store/OpenStoreFormats";
import { OpenStoreBenefits } from "@/components/pages/open-store/OpenStoreBenefits";
import { OpenStoreProcess } from "@/components/pages/open-store/OpenStoreProcess";
import { OpenStoreContactSection } from "@/components/pages/open-store/OpenStoreContactSection";
import { OpenStoreFAQ } from "@/components/pages/open-store/OpenStoreFAQ";
import { openStoreFaq } from "@/lib/data/open-store";
import { serializeJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("/abra-uma-loja", "/abra-uma-loja");
}

export default async function AbraUmaLojaPage() {
  const seo = await getSeoSettings();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: openStoreFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {seo.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
        />
      )}
      <OpenStoreHero />
      <AnchorBrandsStrip />
      <OpenStoreFormats />
      <OpenStoreBenefits />
      <OpenStoreProcess />
      <OpenStoreContactSection />
      <OpenStoreFAQ />
    </>
  );
}
