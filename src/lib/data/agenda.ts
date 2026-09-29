// Conteúdo inicial da Agenda — usado apenas pelo seed do banco.
// O conteúdo real é gerenciado pelo painel /admin/agenda.
export interface SeedEvent {
  title: string;
  description: string;
  image: string;
  dateLabel: string;
  startDate: string | null;
  endDate: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  position: number;
}

export const seedEvents: SeedEvent[] = [
  {
    title: "Mês das Mães no Stop Shop",
    description:
      "Promoções especiais nas marcas participantes, sorteios e estações de presentes prontos para levar.",
    image:
      "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=1600&q=80",
    dateLabel: "Maio inteiro",
    startDate: null,
    endDate: null,
    ctaLabel: "Ver participantes",
    ctaHref: "/lojas",
    position: 0,
  },
  {
    title: "Festival de Inverno",
    description:
      "Lançamentos das coleções de inverno com descontos exclusivos, food trucks e música ao vivo no estacionamento.",
    image:
      "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=1600&q=80",
    dateLabel: "Junho",
    startDate: null,
    endDate: null,
    ctaLabel: "Programação",
    ctaHref: "/contato",
    position: 2,
  },
];
