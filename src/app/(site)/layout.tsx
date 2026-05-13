import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { getContact } from "@/lib/server/queries";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContact();

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer contact={contact} />
      <FloatingWhatsApp whatsapp={contact.whatsapp} />
    </>
  );
}
