import type { Metadata } from "next";
import { getSeoMetadata, getSeoSettings } from "@/lib/server/seo";
import { HeroSection } from "@/components/sections/HeroSection";
import { OpeningHoursStrip } from "@/components/sections/OpeningHoursStrip";
import { AnchorBrandsStrip } from "@/components/sections/AnchorBrandsStrip";
import { SegmentCarousel } from "@/components/sections/SegmentCarousel";
import { AgendaSection } from "@/components/sections/AgendaSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { MapSection } from "@/components/sections/MapSection";
import {
  getActiveEvents,
  getAllSegments,
  getContact,
  getGalleryImages,
  getHero,
  getOpeningSchedule,
} from "@/lib/server/queries";
import { shoppingMonth } from "@/lib/opening-schedule";
import { withEventStatus } from "@/lib/events";
import { serializeJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("/", "/");
}

export const revalidate = 60;

export default async function HomePage() {
  const [
    hero,
    segments,
    contact,
    events,
    galleryImages,
    openingSchedule,
    seo,
  ] = await Promise.all([
    getHero(),
    getAllSegments(),
    getContact(),
    getActiveEvents(),
    getGalleryImages(),
    getOpeningSchedule(),
    getSeoSettings(),
  ]);

  const agendaEvents = withEventStatus(events);

  const shoppingCenterSchema = {
    "@context": "https://schema.org",
    "@type": "ShoppingCenter",
    name: seo.siteName,
    description: seo.defaultDescription,
    url: seo.siteUrl,
    ...(seo.defaultImage && { image: new URL(seo.defaultImage, seo.siteUrl).href }),
    ...(seo.logo && { logo: new URL(seo.logo, seo.siteUrl).href }),
    ...(seo.socialLinks.length > 0 && { sameAs: seo.socialLinks }),
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

  return (
    <>
      {seo.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(shoppingCenterSchema) }}
        />
      )}

      <HeroSection hero={hero} />
      <OpeningHoursStrip schedule={openingSchedule} currentMonth={shoppingMonth()} regularHours={contact.hours} whatsapp={contact.whatsapp} />
      <AgendaSection events={agendaEvents} />
      <AnchorBrandsStrip />
      <SegmentCarousel segments={segments} />
      <GallerySection images={galleryImages} />
      <InstagramFeed />
      <MapSection />
    </>
  );
}
