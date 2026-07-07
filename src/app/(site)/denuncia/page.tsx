import type { Metadata } from "next";
import { Lock, EyeOff, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { DenunciaFormCard } from "@/components/pages/DenunciaFormCard";

export const metadata: Metadata = {
  title: "Portal de Denúncia",
  description:
    "Canal seguro e confidencial do Stop Shop para registrar denúncias de conduta, assédio, fraude ou questões de segurança, de forma identificada ou anônima.",
};

const commitments = [
  {
    icon: Lock,
    title: "Confidencial",
    description: "As informações são tratadas com sigilo e acesso restrito à equipe responsável.",
  },
  {
    icon: EyeOff,
    title: "Anônimo se preferir",
    description: "Você pode registrar sua denúncia sem se identificar. Nenhum dado é obrigatório.",
  },
  {
    icon: Clock,
    title: "Análise cuidadosa",
    description: "Cada manifestação é apurada com responsabilidade e imparcialidade pela nossa equipe.",
  },
];

export default function DenunciaPage() {
  return (
    <>
      <PageHero
        eyebrow="Portal de Denúncia"
        title="Um canal seguro para você se manifestar"
        description="O Stop Shop mantém um canal de denúncias para receber relatos de condutas inadequadas, assédio, fraude ou questões de segurança. Sua manifestação é importante e será tratada com sigilo."
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            {commitments.map((item) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-border-default bg-white p-7 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold text-text-primary">
                  {item.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <DenunciaFormCard />
        </div>
      </section>
    </>
  );
}
