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
  getActiveEvents,
  getAllSegments,
  getContact,
  getFeaturedStores,
  getGalleryImages,
  getHero,
} from "@/lib/server/queries";
import { withEventStatus } from "@/lib/events";
import { faqItems } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Stop Shop — Shopping de Moda em Brusque, SC | 160+ Marcas",
  description:
    "Mais de 160 marcas de moda em um só lugar. Atacado e varejo com os melhores preços. Visite o Stop Shop em Brusque, SC.",
};

export default async function HomePage() {
  const [
    hero,
    segments,
    featuredStores,
    contact,
    events,
    galleryImages,
  ] = await Promise.all([
    getHero(),
    getAllSegments(),
    getFeaturedStores(6),
    getContact(),
    getActiveEvents(),
    getGalleryImages(),
  ]);

  const agendaEvents = withEventStatus(events);

  const shoppingCenterSchema = {
    "@context": "https://schema.org",
    "@type": "ShoppingCenter",
    name: "Stop Shop",
    description:
      "Shopping de moda com mais de 160 marcas. Atacado e varejo em Brusque, SC.",
    url: "https://stopshop.com.br",
    telephone: `+55${contact.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressLine1,
      addressLocality: contact.city,
      addressRegion: contact.state,
      postalCode: contact.zip,
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
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(shoppingCenterSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <HeroSection hero={hero} />
      <OpeningHoursStrip />
      <AnchorBrandsStrip />
      <SegmentCarousel segments={segments} />
      <FeaturedStores stores={featuredStores} />
      <AgendaSection events={agendaEvents} />
      <AtacadoCTA />
      <GallerySection images={galleryImages} />
      <PlanejeSection />
      <InstagramFeed />
      <StopCredSection />
      <FAQSection />
      <MapSection />
    </>
  );
}
