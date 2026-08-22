import type { Metadata } from "next";
import { AnchorBrandsStrip } from "@/components/sections/AnchorBrandsStrip";
import { OpenStoreHero } from "@/components/pages/open-store/OpenStoreHero";
import { OpenStoreFormats } from "@/components/pages/open-store/OpenStoreFormats";
import { OpenStoreBenefits } from "@/components/pages/open-store/OpenStoreBenefits";
import { OpenStoreProcess } from "@/components/pages/open-store/OpenStoreProcess";
import { OpenStoreContactSection } from "@/components/pages/open-store/OpenStoreContactSection";
import { OpenStoreFAQ } from "@/components/pages/open-store/OpenStoreFAQ";
import { openStoreFaq } from "@/lib/data/open-store";

export const metadata: Metadata = {
  title: "Abra uma loja no Stop Shop",
  description:
    "Lojas, quiosques e espaços de mídia no maior shopping de moda de Brusque, SC. Mais de 160 marcas, 30 anos de história e público comprador de todo o Brasil.",
};

export default function AbraUmaLojaPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
