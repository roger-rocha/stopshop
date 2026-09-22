import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Bus, Coffee, ShoppingBag } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { MapSection } from "@/components/sections/MapSection";
import { CTAButton } from "@/components/ui/CTAButton";
import { InstitutionalVideo } from "@/components/ui/InstitutionalVideo";
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
    title: "Encontre seu estilo",
    description:
      "Moda feminina, masculina, infantil e muito mais. Explore as marcas e encontre a loja que combina com você.",
    href: "/lojas",
    action: "Explore as lojas",
  },
  {
    icon: Coffee,
    title: "Uma pausa entre as compras",
    description:
      "Faça uma pausa para o café ou almoço. Conheça a praça de alimentação e os serviços para facilitar sua visita.",
    href: "/servicos",
    action: "Conheça os serviços",
  },
  {
    icon: Bus,
    title: "Excursões e grupos",
    description:
      "Planeje uma visita em grupo ao Stop Shop. Recebemos excursões com estrutura para ônibus e vans e apoio a guias e motoristas.",
    href: "/contato",
    action: "Planeje sua excursão",
  },
];

export default async function SobrePage() {
  const images = (await getGalleryImages()).slice(0, 4);

  return (
    <>
      <section aria-labelledby="sobre-title" className="bg-surface-soft pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-7xl px-[var(--spacing-section-x)]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
            <div className="max-w-xl py-4 lg:py-8">
              <p className="text-sm font-medium text-brand-coral">Conheça o Stop Shop</p>
              <h1 id="sobre-title" className="mt-5 text-[clamp(2.75rem,5vw,4.5rem)] font-bold leading-[1.06] tracking-[-0.025em] text-balance text-brand-navy">
                O ninho da moda de Brusque.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
                Há mais de 30 anos, um ponto de encontro para quem ama moda
                e para quem vive dela. Atacado e varejo em um só lugar.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CTAButton href="/lojas" className="rounded-full">Conheça nossas lojas</CTAButton>
                <CTAButton href="#visite" variant="secondary" className="rounded-full">Planeje sua visita</CTAButton>
              </div>
            </div>
            <figure className="min-w-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] outline-1 -outline-offset-1 outline-black/10 lg:aspect-[6/5]">
                <Image
                  src="/images/stopshop-hero.png"
                  alt="Fachada do Stop Shop em Brusque, com o ninho da moda na entrada"
                  fill
                  priority
                  sizes="(min-width: 1280px) 640px, (min-width: 1024px) 55vw, calc(100vw - 40px)"
                  className="object-cover object-[45%_center]"
                />
              </div>
              <figcaption className="mt-3 text-sm text-text-secondary">Brusque, Santa Catarina</figcaption>
            </figure>
          </div>
          <dl aria-label="O Stop Shop em números" className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-border-subtle pt-8 lg:mt-12 lg:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.label} className="flex flex-col">
                <dt className="mt-2 text-sm text-text-secondary">{item.label}</dt>
                <dd className="-order-1 font-display text-4xl font-bold leading-none text-brand-navy sm:text-5xl">
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
              title="Uma história feita de encontros"
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
            title="Seu próximo passeio começa aqui"
            subtitle="Encontre o que precisa para aproveitar o Stop Shop do seu jeito."
            align="left"
            light
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {experiences.map((experience) => (
              <article key={experience.title} className="flex flex-col items-start rounded-[28px] border border-border-default bg-white p-7 sm:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-light">
                  <experience.icon className="h-6 w-6 text-brand-coral" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-brand-navy">{experience.title}</h3>
                <p className="mt-4 mb-6 leading-relaxed text-text-secondary">{experience.description}</p>
                <CTAButton href={experience.href} variant="ghost" className="mt-auto min-h-11 px-0 text-sm text-brand-coral">
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
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[28px] bg-brand-navy p-7 sm:p-10 lg:flex-row lg:items-center">
            <div>
              <h3 className="max-w-xl font-display text-2xl font-bold text-balance text-white">Sua marca no ninho da moda.</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-white/80">Conheça as oportunidades para abrir sua loja no Stop Shop.</p>
            </div>
            <CTAButton href="/abra-uma-loja" variant="secondary" className="shrink-0 rounded-full">
              Abra sua loja
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CTAButton>
          </div>
        </div>
      </section>

      <div id="visite" className="scroll-mt-24 sm:scroll-mt-28">
        <MapSection />
      </div>
    </>
  );
}
