import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="Página não encontrada"
        description="A rota que você tentou acessar não existe ou foi reorganizada na nova experiência do Stop Shop."
        actions={[
          { label: "Ir para a home", href: "/" },
          { label: "Ver lojas", href: "/lojas", variant: "secondary" },
        ]}
        stats={[
          { label: "Páginas principais", value: "7" },
          { label: "Guia de lojas", value: "Disponível" },
          { label: "Contato", value: "Ativo" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8 sm:py-16">
        <div className="rounded-[32px] border border-border-default bg-white px-6 py-10 shadow-card">
          <p className="text-lg leading-relaxed text-text-secondary">
            Use a navegação principal ou siga para alguma das páginas mais acessadas
            abaixo.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/localizacao"
              className="rounded-full border border-border-subtle px-5 py-3 font-medium text-text-primary hover:border-brand-coral hover:text-brand-coral"
            >
              Localização
            </Link>
            <Link
              href="/atacado"
              className="rounded-full border border-border-subtle px-5 py-3 font-medium text-text-primary hover:border-brand-coral hover:text-brand-coral"
            >
              Atacado
            </Link>
            <Link
              href="/contato"
              className="rounded-full border border-border-subtle px-5 py-3 font-medium text-text-primary hover:border-brand-coral hover:text-brand-coral"
            >
              Contato
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
