/**
 * Serviços iniciais da página /servicos.
 *
 * São apenas os que já estavam publicados no site (recuperados da antiga seção
 * "Planeje sua visita"), para não inventar comodidade que o shopping talvez não
 * tenha. O restante — wi-fi, caixa eletrônico, fraldário, achados e perdidos… —
 * deve ser cadastrado pelo cliente em /admin/servicos.
 */
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
];
