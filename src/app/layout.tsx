import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import { getSeoSettings } from "@/lib/server/seo";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const matter = localFont({
  src: [
    { path: "../fonts/Matter-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Matter-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-matter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();

  return {
    metadataBase: new URL(seo.siteUrl),
    title: { default: seo.defaultTitle, template: seo.titleTemplate },
    description: seo.defaultDescription,
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: seo.siteName,
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      ...(seo.defaultImage && {
        images: [{ url: seo.defaultImage, alt: seo.defaultImageAlt }],
      }),
    },
    twitter: {
      card: seo.defaultImage ? "summary_large_image" : "summary",
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      ...(seo.defaultImage && {
        images: [{ url: seo.defaultImage, alt: seo.defaultImageAlt }],
      }),
    },
    verification: {
      ...(seo.googleVerification && { google: seo.googleVerification }),
      ...(seo.bingVerification && { other: { "msvalidate.01": seo.bingVerification } }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${matter.variable}`}>
      <body className="bg-surface-white font-body antialiased text-text-primary">
        {children}
      </body>
    </html>
  );
}
