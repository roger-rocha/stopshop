import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Bus, Coffee, ShoppingBag } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { MapSection } from "@/components/sections/MapSection";
import { CTAButton } from "@/components/ui/CTAButton";
import { InstitutionalVideo } from "@/components/ui/InstitutionalVideo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getGalleryImages } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a história do Stop Shop, o ninho da moda de Brusque, com mais de 160 marcas de moda em um só lugar.",
};

const highlights = [
  { value: "30+", label: "anos de história" },
  { value: "160+", label: "marcas em um só lugar" },
  { value: "4", label: "pavimentos planejados" },
  { value: "310+", label: "vagas de estacionamento" },
];

const experiences = [
  {
    icon: ShoppingBag,
    title: "Moda para cada momento",
    description:
      "Moda feminina, masculina, infantil e muito mais. Um mix de marcas para renovar o seu guarda-roupa ou encontrar novidades para a sua loja.",
    href: "/lojas",
    action: "Explore as lojas",
  },
  {
    icon: Coffee,
    title: "Uma pausa entre as compras",
    description:
      "A visita também tem espaço para um café, um almoço e uma boa conversa. Aproveite a praça de alimentação e os serviços do shopping.",
    href: "/servicos",
    action: "Conheça os serviços",
  },
  {
    icon: Bus,
    title: "De portas abertas para você",
    description:
      "Estrutura para receber clientes, compradores e excursões, com estacionamento para carros, vans e ônibus e área de descanso para guias e motoristas.",
    href: "/atacado",
    action: "Saiba mais sobre o atacado",
  },
];

export default async function SobrePage() {
  const images = (await getGalleryImages()).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Sobre"
        title="O ninho da moda de Brusque"
        description="São mais de 30 anos reunindo marcas de moda, atacado e varejo em um único endereço."
        actions={[
          { label: "Conheça nossas lojas", href: "/lojas" },
          { label: "Planeje sua visita", href: "/localizacao", variant: "secondary" },
        ]}
      />

      <section aria-label="O Stop Shop em números" className="bg-surface-soft pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-[var(--spacing-section-x)]">
          <figure className="pt-8 sm:pt-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] outline-1 -outline-offset-1 outline-black/10 sm:aspect-[2/1]">
              <Image
                src="/images/stopshop-hero.png"
                alt="Fachada do Stop Shop em Brusque, com o ninho da moda na entrada"
                fill
                priority
                sizes="(min-width: 1280px) 1216px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                className="object-cover object-[center_60%]"
              />
            </div>
            <figcaption className="mt-4 text-sm text-text-secondary">
              Stop Shop · Brusque, Santa Catarina
            </figcaption>
          </figure>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.label} className="flex flex-col border-l-2 border-brand-coral/20 pl-5 sm:pl-7">
                <dt className="mt-3 text-sm text-text-secondary">{item.label}</dt>
                <dd className="-order-1 font-display text-5xl font-bold leading-none text-brand-navy sm:text-6xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white py-[var(--spacing-section-y)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-[var(--spacing-section-x)] lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeader
              label="Nossa história"
              title="A moda faz parte da nossa história. E da sua."
              highlight="nossa história."
              align="left"
              light
              className="mb-6"
            />
            <AnimateOnScroll>
              <div className="space-y-5 text-lg leading-relaxed text-text-secondary">
                <p>
                  Há mais de 30 anos, o Stop Shop faz parte da vida de quem compra
                  e de quem vive da moda. Em Brusque, Santa Catarina, reunimos
                  mais de 160 marcas em um espaço que aproxima pessoas, estilos
                  e novas oportunidades.
                </p>
                <p>
                  Somos um ponto de encontro para o atacado e o varejo: de quem
                  vem escolher uma peça especial a quem chega em busca da próxima
                  coleção para a sua loja. É essa mistura que dá vida ao nosso
                  ninho da moda.
                </p>
              </div>
              <CTAButton href="/lojas" variant="secondary" className="mt-8 rounded-full">
                Encontre sua próxima marca
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CTAButton>
            </AnimateOnScroll>
          </div>
          <AnimateOnScroll>
            <InstitutionalVideo
              src="https://mayoqfpgidrxfis3.public.blob.vercel-storage.com/videos/video-insti.mp4"
              poster="https://mayoqfpgidrxfis3.public.blob.vercel-storage.com/videos/video-insti-poster.jpg"
            />
            <p className="mt-4 text-sm text-text-secondary">
              Conheça de perto o lugar onde essas histórias se encontram.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="bg-surface-light py-[var(--spacing-section-y)]">
        <div className="mx-auto max-w-7xl px-[var(--spacing-section-x)]">
          <SectionHeader
            label="Viva o Stop Shop"
            title="Muito mais que uma parada para comprar"
            highlight="Muito mais"
            subtitle="Um lugar para descobrir marcas, fazer bons encontros e aproveitar cada momento da sua visita."
            light
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {experiences.map((experience) => (
              <article key={experience.title} className="flex flex-col items-start rounded-[28px] bg-white p-7 shadow-card sm:p-8">
                <experience.icon className="h-7 w-7 text-brand-coral" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-6 font-display text-2xl font-bold text-brand-navy">{experience.title}</h3>
                <p className="mt-4 mb-6 leading-relaxed text-text-secondary">{experience.description}</p>
                <CTAButton href={experience.href} variant="ghost" className="mt-auto min-h-11 px-0 text-sm">
                  {experience.action}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </CTAButton>
              </article>
            ))}
          </div>
          {images.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {images.map((image) => (
                <div key={image.id} className="relative aspect-[4/5] overflow-hidden rounded-card outline-1 -outline-offset-1 outline-black/10">
                  <Image
                    src={image.image}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1280px) 292px, (min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-border-subtle pt-10 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-brand-navy">Sua marca também pode fazer parte dessa história.</h3>
              <p className="mt-2 text-text-secondary">Conheça as oportunidades para abrir sua loja no Stop Shop.</p>
            </div>
            <CTAButton href="/abra-uma-loja" className="shrink-0 rounded-full">
              Abra uma loja
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CTAButton>
          </div>
        </div>
      </section>

      <MapSection />
    </>
  );
}
