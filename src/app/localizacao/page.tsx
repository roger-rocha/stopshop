import type { Metadata } from "next";
import { MapPin, Car, Bus, Clock3, Navigation } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { siteContact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Localização",
  description:
    "Veja como chegar ao Stop Shop em Brusque, consulte horários de funcionamento e conheça a estrutura de estacionamento.",
};

const logistics = [
  {
    icon: Car,
    title: "Estacionamento",
    description:
      "Dois estacionamentos externos gratuitos e um estacionamento coberto pago para mais conveniência.",
  },
  {
    icon: Bus,
    title: "Excursões",
    description:
      "São 15 vagas para ônibus e área de apoio para recepção de grupos e guias.",
  },
  {
    icon: Clock3,
    title: "Horários",
    description: "Segunda a sábado das 09h às 19h, com comunicados especiais para datas sazonais.",
  },
];

export default function LocalizacaoPage() {
  return (
    <>
      <PageHero
        eyebrow="Localização"
        title="Chegue com facilidade ao Stop Shop"
        description="O empreendimento está localizado em um eixo estratégico de Brusque, com acesso simples para quem vem da região ou em excursões de compras."
        actions={[
          {
            label: "Abrir no Google Maps",
            href: "https://maps.google.com/?q=Stop+Shop+Brusque",
            external: true,
          },
          {
            label: "Abrir no Waze",
            href: "https://waze.com/ul?q=Stop+Shop+Brusque",
            external: true,
            variant: "secondary",
          },
        ]}
        stats={[
          { label: "Vagas para carros e vans", value: "310" },
          { label: "Vagas para ônibus", value: "15" },
          { label: "Endereço", value: "Brusque/SC" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-border-default bg-[image:var(--gradient-brand-diagonal)] p-8 text-white shadow-card sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
              Endereço
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight">
              {siteContact.addressLine1}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/78">
              {siteContact.addressLine2} · {siteContact.cityLine}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/12 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">Funcionamento</p>
                <p className="mt-2 text-lg font-medium">{siteContact.hours}</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">Contato</p>
                <p className="mt-2 text-lg font-medium">(47) 3255-7000</p>
              </div>
            </div>

            {/* Google Maps */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.5!2d-48.9183!3d-27.0978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94df1db8fba3b2db%3A0x4c8e1e1e1e1e1e1e!2sRodovia+Ant%C3%B4nio+Heil%2C+635+-+Santa+Terezinha%2C+Brusque+-+SC!5e0!3m2!1spt-BR!2sbr"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Stop Shop no Google Maps"
                className="grayscale-[0.2]"
              />
            </div>
          </div>

          <div className="rounded-[32px] border border-border-default bg-white p-8 shadow-card sm:p-10">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-brand-coral" />
              <div>
                <p className="font-semibold text-text-primary">Como chegar</p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  O Stop Shop fica na Rodovia Antônio Heil, com acesso rápido para quem vem do centro de Brusque, da BR-101 e de cidades vizinhas.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {logistics.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border-default bg-surface-soft p-5"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-brand-coral" />
                    <p className="font-semibold text-text-primary">{item.title}</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="https://maps.google.com/?q=Stop+Shop+Brusque"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-coral hover:text-brand-coral-dark"
            >
              <Navigation className="h-4 w-4" />
              Traçar rota agora
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
