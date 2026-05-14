import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://stopshop.com.br"),
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
    <html lang="pt-BR" className={`${playfair.variable} ${matter.variable}`}>
      <body className="bg-surface-white font-body antialiased text-text-primary">
        {children}
      </body>
    </html>
  );
}
