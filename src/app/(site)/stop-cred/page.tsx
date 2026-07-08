import type { Metadata } from "next";
import { Check, BadgePercent, HandCoins, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { StopCredCard } from "@/components/ui/StopCredCard";
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

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        {/* Vitrine: cartão 3D + benefícios (mesmo destaque da home) */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center lg:justify-start">
            <StopCredCard />
          </div>

          <div>
            <h2 className="font-display text-[length:var(--font-size-heading)] font-bold text-text-primary">
              Seu crediário sem complicação
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-text-secondary">
              Uma solução prática para clientes de Brusque e região comprarem com
              mais flexibilidade e atendimento próximo.
            </p>

            <ul className="mt-8 space-y-3.5">
              {stopCredBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-coral shadow-[0_3px_10px_-2px_rgba(255,107,107,0.55)]">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-text-secondary">{benefit}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-text-muted">
              Válido para residentes de Brusque e região.
            </p>
          </div>
        </div>

        {/* Pilares */}
        <div className="mt-16 grid gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-[28px] border border-border-default bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(11,20,43,0.25)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral">
                <pillar.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-text-primary">
                {pillar.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
