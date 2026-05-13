import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { OpeningHoursStrip } from "@/components/sections/OpeningHoursStrip";
import { AnchorBrandsStrip } from "@/components/sections/AnchorBrandsStrip";
import { SegmentCarousel } from "@/components/sections/SegmentCarousel";
import { FeaturedStores } from "@/components/sections/FeaturedStores";
import { AgendaSection } from "@/components/sections/AgendaSection";
import { AtacadoCTA } from "@/components/sections/AtacadoCTA";
import { GallerySection } from "@/components/sections/GallerySection";
import { PlanejeSection } from "@/components/sections/PlanejeSection";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { StopCredSection } from "@/components/sections/StopCredSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { MapSection } from "@/components/sections/MapSection";
import {
  getAllSegments,
  getFeaturedStores,
  getHero,
} from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Stop Shop — Shopping de Moda em Brusque, SC | 160+ Marcas",
  description:
    "Mais de 160 marcas de moda em um só lugar. Atacado e varejo com os melhores preços. Visite o Stop Shop em Brusque, SC.",
};

export default async function HomePage() {
  const [hero, segments, featuredStores] = await Promise.all([
    getHero(),
    getAllSegments(),
    getFeaturedStores(6),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ShoppingCenter",
            name: "Stop Shop",
            description:
              "Shopping de moda com mais de 160 marcas. Atacado e varejo em Brusque, SC.",
            url: "https://stopshop.com.br",
            telephone: "+55-47-3255-7000",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Rod. Antônio Heil, 635",
              addressLocality: "Brusque",
              addressRegion: "SC",
              postalCode: "88353-100",
              addressCountry: "BR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -27.0979,
              longitude: -48.9118,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "19:00",
              },
            ],
            numberOfStores: 160,
          }),
        }}
      />

      <HeroSection hero={hero} />
      <OpeningHoursStrip />
      <AnchorBrandsStrip />
      <SegmentCarousel segments={segments} />
      <FeaturedStores stores={featuredStores} />
      <AgendaSection />
      <AtacadoCTA />
      <GallerySection />
      <PlanejeSection />
      <InstagramFeed />
      <StopCredSection />
      <FAQSection />
      <MapSection />
    </>
  );
}
