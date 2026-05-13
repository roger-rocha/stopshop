import type { Metadata } from "next";
import { FileText, UserRoundPlus, WalletCards } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Cadastro",
  description:
    "Faça seu cadastro e conheça as vantagens para clientes do Stop Shop, com atendimento prático e benefícios exclusivos.",
};

const steps = [
  {
    icon: UserRoundPlus,
    title: "Preencha seus dados",
    description: "Informe seus dados principais para iniciar o relacionamento com o Stop Shop.",
  },
  {
    icon: FileText,
    title: "Validação simples",
    description: "Nossa equipe orienta as informações necessárias para o processo seguir com agilidade.",
  },
  {
    icon: WalletCards,
    title: "Aproveite as vantagens",
    description: "Receba novidades, condições especiais e mais conveniência na sua jornada de compra.",
  },
];

export default function CadastroPage() {
  return (
    <>
      <PageHero
        eyebrow="Cadastro"
        title="Cadastre-se e aproveite vantagens exclusivas"
        description="O cadastro de clientes ajuda a tornar a experiência no Stop Shop mais prática, conectando você a novidades, campanhas e benefícios especiais."
        actions={[
          { label: "Entrar em contato", href: "/contato" },
          { label: "Conhecer o Stop Cred", href: "/stop-cred", variant: "secondary" },
        ]}
        stats={[
          { label: "Atendimento", value: "Humanizado" },
          { label: "Processo", value: "Prático" },
          { label: "Benefícios", value: "Exclusivos" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.title}
              className="rounded-[28px] border border-border-default bg-white p-7 shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral">
                <step.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold text-text-primary">
                {step.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[32px] border border-border-default bg-surface-light p-8 sm:p-10">
          <h2 className="font-display text-4xl font-bold text-text-primary">
            Interesse em se cadastrar?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
            Esta primeira versão organiza a jornada e deixa o conteúdo principal acessível.
            Caso queira iniciar o atendimento, nossa equipe pode orientar o processo por
            telefone, WhatsApp ou presencialmente no empreendimento.
          </p>
        </div>
      </section>
    </>
  );
}
