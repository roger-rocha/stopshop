/** Serviços iniciais, editáveis em /admin/servicos. O seed insere apenas os ausentes. */
export const seedServices = [
  {
    name: "Estacionamento gratuito",
    category: "Conveniência",
    icon: "estacionamento",
    description:
      "Dois estacionamentos externos gratuitos e um coberto pago, com mais de 310 vagas.",
    position: 0,
    published: true,
  },
  {
    name: "Praça de alimentação",
    category: "Conveniência",
    icon: "alimentacao",
    description:
      "Restaurantes, lanchonetes e cafeterias com opções rápidas e variadas para todos os públicos.",
    position: 1,
    published: true,
  },
  {
    name: "Acessibilidade",
    category: "Acessibilidade",
    icon: "acessibilidade",
    description:
      "Espaço acessível com rampas, elevadores, vagas reservadas e banheiros adaptados para todos.",
    position: 2,
    published: true,
  },
  {
    name: "Excursões e grupos",
    category: "Atendimento",
    icon: "excursoes",
    description:
      "Estrutura preparada para receber ônibus, vans e grupos com atendimento dedicado.",
    position: 3,
    published: true,
  },
  {
    name: "Caixa eletrônico",
    category: "Conveniência",
    icon: "caixa",
    description:
      "Caixa eletrônico dentro do shopping para saques e consultas durante o horário de funcionamento.",
    position: 4,
    published: true,
  },
  {
    name: "Banheiros adaptados",
    category: "Acessibilidade",
    icon: "banheiro",
    description: "Banheiros adaptados para uma visita mais acessível e confortável.",
    position: 5,
    published: true,
  },
  {
    name: "Concierge / Achados e perdidos",
    category: "Atendimento",
    icon: "concierge",
    description: "",
    position: 6,
    published: true,
  },
  {
    name: "Espaço Família",
    category: "Conveniência",
    icon: "fraldario",
    description: "",
    position: 7,
    published: true,
  },
  {
    name: "Pet friendly",
    category: "Conveniência",
    icon: "pet",
    description: "",
    position: 8,
    published: true,
  },
  {
    name: "Wi-Fi",
    category: "Conveniência",
    icon: "wifi",
    description: "",
    position: 9,
    published: true,
  },
];
