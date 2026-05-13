import type { Metadata } from "next";
import { Bus, ShoppingBag, LayoutGrid, Coffee } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { wholesaleBenefits } from "@/lib/site";

export const metadata: Metadata = {
  title: "Atacado",
  description:
    "Veja como funciona a experiência de compras no atacado no Stop Shop, com estrutura preparada para lojistas e excursões.",
};

const structureItems = [
  {
    icon: ShoppingBag,
    title: "Mix de marcas",
    description:
      "Moda feminina, masculina, infantil e segmentos complementares em um único destino de compras.",
  },
  {
    icon: LayoutGrid,
    title: "Circulação prática",
    description:
      "Estrutura planejada em quatro pavimentos para facilitar comparação, seleção e tomada de decisão.",
  },
  {
    icon: Bus,
    title: "Apoio a excursões",
    description:
      "Recepção preparada para grupos com estacionamento e área voltada a guias e motoristas.",
  },
  {
    icon: Coffee,
    title: "Conforto na visita",
    description:
      "Praça de alimentação e áreas de descanso para uma experiência mais agradável ao longo do dia.",
  },
];

export default function AtacadoPage() {
  return (
    <>
      <PageHero
        eyebrow="Atacado"
        title="Um ambiente pensado para compradores profissionais"
        description="O Stop Shop combina variedade, conforto e conveniência para atender lojistas, revendedores e excursões que vêm a Brusque em busca de moda com excelente custo-benefício."
        actions={[
          { label: "Conhecer as lojas", href: "/lojas" },
          { label: "Planejar visita", href: "/localizacao", variant: "secondary" },
        ]}
        stats={[
          { label: "Marcas disponíveis", value: "160+" },
          { label: "Pavimentos", value: "4" },
          { label: "Apoio para grupos", value: "Sim" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-border-default bg-[image:var(--gradient-brand-diagonal)] p-8 text-white shadow-card sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
              Para compradores
            </p>
            <div className="mt-6 space-y-4">
              {wholesaleBenefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl border border-white/12 bg-white/10 p-4">
                  <p className="text-sm leading-relaxed text-white/84">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {structureItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-border-default bg-white p-7 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold text-text-primary">
                  {item.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
