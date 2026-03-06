import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Stop Shop — Shopping de Moda em Brusque, SC",
    template: "%s | Stop Shop",
  },
  description:
    "Mais de 160 marcas de moda em um só lugar. Visite o Stop Shop em Brusque, SC e aproveite preços de atacado e varejo.",
  keywords: [
    "Stop Shop",
    "shopping Brusque",
    "moda Brusque",
    "atacado Brusque",
    "outlet Santa Catarina",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Stop Shop",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-surface-white font-body antialiased text-text-primary">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
