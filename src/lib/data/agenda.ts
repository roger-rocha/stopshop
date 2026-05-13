export interface AgendaEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  badge: string;
  image: string;
  cta?: { label: string; href: string };
}

export const agendaEvents: AgendaEvent[] = [
  {
    id: "1",
    title: "Mês das Mães no Stop Shop",
    description:
      "Promoções especiais nas marcas participantes, sorteios e estações de presentes prontos para levar.",
    date: "01 a 12 de Maio",
    badge: "Em cartaz",
    image:
      "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=1600&q=80",
    cta: { label: "Ver participantes", href: "/lojas" },
  },
  {
    id: "2",
    title: "Excursão dos Lojistas",
    description:
      "Recepção especial para lojistas e excursões com áreas de descanso, café e atendimento exclusivo.",
    date: "Toda quinta-feira",
    badge: "Recorrente",
    image:
      "https://images.unsplash.com/photo-1607082352121-fa243f3dde32?w=1600&q=80",
    cta: { label: "Saiba mais", href: "/atacado" },
  },
  {
    id: "3",
    title: "Festival de Inverno",
    description:
      "Lançamentos das coleções de inverno com descontos exclusivos, food trucks e música ao vivo no estacionamento.",
    date: "07 a 09 de Junho",
    badge: "Próximo",
    image:
      "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=1600&q=80",
    cta: { label: "Programação", href: "#" },
  },
];
