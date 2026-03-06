import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { ContactFormCard } from "@/components/pages/ContactFormCard";
import { PageHero } from "@/components/ui/PageHero";
import { siteContact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a equipe do Stop Shop para informações sobre lojas, atendimento, cadastro e atacado.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Nossa equipe está pronta para ajudar"
        description="Fale conosco para tirar dúvidas sobre o empreendimento, planejar sua visita ou obter informações sobre serviços e oportunidades."
        actions={[
          {
            label: "WhatsApp",
            href: `https://wa.me/${siteContact.whatsapp}?text=Olá! Gostaria de informações sobre o Stop Shop.`,
            external: true,
            variant: "whatsapp",
          },
          { label: "Ver localização", href: "/localizacao", variant: "secondary" },
        ]}
        stats={[
          { label: "Telefone", value: "(47) 3255-7000" },
          { label: "Atendimento", value: "Seg - Sáb" },
          { label: "E-mail", value: "Comercial" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <article className="rounded-[28px] border border-border-default bg-white p-7 shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral">
                <Phone className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold text-text-primary">
                Telefone
              </h2>
              <a
                href={`tel:${siteContact.phone}`}
                className="mt-3 inline-block text-base text-text-secondary hover:text-brand-coral"
              >
                (47) 3255-7000
              </a>
            </article>

            <article className="rounded-[28px] border border-border-default bg-white p-7 shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold text-text-primary">
                E-mail
              </h2>
              <a
                href={`mailto:${siteContact.email}`}
                className="mt-3 inline-block text-base text-text-secondary hover:text-brand-coral"
              >
                {siteContact.email}
              </a>
            </article>

            <article className="rounded-[28px] border border-border-default bg-white p-7 shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]/10 text-[#25D366]">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold text-text-primary">
                WhatsApp
              </h2>
              <a
                href={`https://wa.me/${siteContact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-base text-text-secondary hover:text-[#25D366]"
              >
                Fale com nossa equipe
              </a>
            </article>
          </div>

          <ContactFormCard />
        </div>
      </section>
    </>
  );
}
