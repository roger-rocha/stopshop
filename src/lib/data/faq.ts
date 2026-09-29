export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "horario",
    question: "Qual o horário de funcionamento do Stop Shop?",
    answer:
      "Funcionamos de segunda a sábado das 09h às 19h. Domingos e feriados estamos fechados, exceto em datas especiais previamente anunciadas.",
  },
  {
    id: "estacionamento",
    question: "O estacionamento é gratuito?",
    answer:
      "Sim, oferecemos estacionamento totalmente gratuito com mais de 310 vagas para carros e espaço dedicado para ônibus de excursão.",
  },
  {
    id: "como-chegar",
    question: "Como chego ao Stop Shop saindo de outras cidades?",
    answer:
      "Estamos localizados na Rod. Antônio Heil, 635, em Brusque/SC. O acesso é fácil pela BR-101. Recebemos excursões de todo o Brasil — entre em contato para informações sobre estacionamento de ônibus.",
  },
  {
    id: "pagamento",
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Cada loja tem sua própria política de pagamento, mas a maioria aceita cartões de crédito e débito, Pix e dinheiro. Algumas lojas também oferecem parcelamento.",
  },
  {
    id: "excursoes",
    question: "O Stop Shop aceita excursões de compras?",
    answer:
      "Sim! Temos estrutura completa para receber excursões, com estacionamento para ônibus, praça de alimentação e ambiente climatizado. Entre em contato conosco para agendar a visita do seu grupo.",
  },
];
