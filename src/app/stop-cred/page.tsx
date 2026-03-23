import type { Metadata } from "next";
import { Check, BadgePercent, HandCoins, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { stopCredBenefits } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stop Cred",
  description:
    "Conheça o Stop Cred, o crediário do Stop Shop com condições especiais, atendimento próximo e mais flexibilidade para suas compras.",
};

const pillars = [
  {
    icon: BadgePercent,
    title: "Condições atrativas",
    description: "Mais liberdade para comprar com condições pensadas para o dia a dia do cliente.",
  },
  {
    icon: HandCoins,
    title: "Atendimento próximo",
    description: "Equipe preparada para orientar o processo de forma simples e objetiva.",
  },
  {
    icon: ShieldCheck,
    title: "Experiência confiável",
    description: "Uma solução criada para facilitar compras com segurança e clareza.",
  },
];

export default function StopCredPage() {
  return (
    <>
      <PageHero
        eyebrow="Stop Cred"
        title="Mais facilidade para comprar no Stop Shop"
        description="O Stop Cred amplia a conveniência da experiência de compra com condições acessíveis, atendimento próximo e um processo descomplicado."
        actions={[
          { label: "Falar com a equipe", href: "/contato" },
          { label: "Ver cadastro", href: "/cadastro", variant: "secondary" },
        ]}
        stats={[
          { label: "Anuidade", value: "Zero" },
          { label: "Parcelamento", value: "6x" },
          { label: "Primeiro vencimento", value: "30 dias" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] border border-border-default bg-[image:var(--gradient-brand-diagonal)] p-8 text-white shadow-card sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
              Benefícios
            </p>
            <div className="mt-6 space-y-4">
              {stopCredBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/14">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-relaxed text-white/82">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[28px] border border-border-default bg-white p-7 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold text-text-primary">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
