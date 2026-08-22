import {
  BadgePercent,
  Bus,
  Building2,
  Handshake,
  LayoutGrid,
  Megaphone,
  ParkingCircle,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

export type InquirySubject =
  | "apresentacao"
  | "loja"
  | "quiosque"
  | "anunciar";

export interface InquiryOption {
  value: InquirySubject;
  label: string;
  hint: string;
}

/** Assuntos do formulário — mesmos do fluxo comercial. */
export const inquiryOptions: InquiryOption[] = [
  {
    value: "loja",
    label: "Quero abrir uma loja",
    hint: "Espaços de 30 m² a 300 m² em quatro pavimentos.",
  },
  {
    value: "quiosque",
    label: "Quero abrir um quiosque",
    hint: "Pontos de alto fluxo nos corredores e praça de alimentação.",
  },
  {
    value: "anunciar",
    label: "Quero anunciar",
    hint: "Mídia indoor, ações promocionais e eventos no shopping.",
  },
  {
    value: "apresentacao",
    label: "Apresentação comercial",
    hint: "Receba o material completo com números e plantas.",
  },
];

export interface OpportunityFormat {
  subject: InquirySubject;
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
}

export const opportunityFormats: OpportunityFormat[] = [
  {
    subject: "loja",
    icon: Store,
    title: "Loja",
    description:
      "Espaços prontos para receber marcas de moda, calçados e acessórios, com vitrine para o corredor e fachada personalizável.",
    bullets: ["Metragens de 30 a 300 m²", "Quatro pavimentos", "Projeto de fachada flexível"],
  },
  {
    subject: "quiosque",
    icon: LayoutGrid,
    title: "Quiosque",
    description:
      "Operação compacta nos pontos de maior circulação. Ideal para acessórios, cosméticos, alimentação rápida e serviços.",
    bullets: ["Pontos nos corredores centrais", "Contrato enxuto", "Implantação rápida"],
  },
  {
    subject: "anunciar",
    icon: Megaphone,
    title: "Mídia e eventos",
    description:
      "Coloque sua marca diante de milhares de compradores por dia com mídia indoor, ativações e espaços para eventos.",
    bullets: ["Painéis e mídia indoor", "Ações promocionais", "Espaços para ativações"],
  },
];

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const partnershipBenefits: Benefit[] = [
  {
    icon: Users,
    title: "Público comprador",
    description:
      "Fluxo diário de consumidores finais e lojistas multimarcas vindos de todo o Brasil em excursões organizadas.",
  },
  {
    icon: Bus,
    title: "Rota do atacado",
    description:
      "Brusque é destino consolidado de compras de moda. O Stop Shop está na principal rota de ônibus e vans.",
  },
  {
    icon: TrendingUp,
    title: "Marketing ativo",
    description:
      "Calendário de campanhas, eventos e presença digital que geram tráfego para todas as operações do shopping.",
  },
  {
    icon: Handshake,
    title: "Time comercial dedicado",
    description:
      "Apoio desde a escolha do ponto até a inauguração, com acompanhamento de projeto e operação.",
  },
  {
    icon: ParkingCircle,
    title: "Estrutura completa",
    description:
      "Dois estacionamentos gratuitos, praça de alimentação, segurança e manutenção 24 horas.",
  },
  {
    icon: BadgePercent,
    title: "Condições competitivas",
    description:
      "Modelos contratuais ajustados ao porte da operação, com custos de ocupação transparentes.",
  },
];

export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Conversa inicial",
    description:
      "Você envia o formulário e nosso time comercial entra em contato em até dois dias úteis para entender sua marca.",
  },
  {
    title: "Apresentação e visita",
    description:
      "Mostramos os espaços disponíveis, números de fluxo e o mix de cada pavimento. Visita guiada ao shopping.",
  },
  {
    title: "Proposta comercial",
    description:
      "Proposta com ponto, metragem, condições e cronograma de implantação adequados à sua operação.",
  },
  {
    title: "Projeto e inauguração",
    description:
      "Aprovação do projeto da loja, obras acompanhadas pela equipe técnica e inauguração com apoio do marketing.",
  },
];

export interface KeyFigure {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: LucideIcon;
}

export const keyFigures: KeyFigure[] = [
  { value: 160, suffix: "+", label: "marcas em operação", icon: Sparkles },
  { value: 30, label: "anos de história", icon: Building2 },
  { value: 4, label: "pavimentos de moda", icon: LayoutGrid },
  { value: 2, label: "estacionamentos gratuitos", icon: ParkingCircle },
];

export interface OpenStoreFAQ {
  id: string;
  question: string;
  answer: string;
}

export const openStoreFaq: OpenStoreFAQ[] = [
  {
    id: "tempo-retorno",
    question: "Em quanto tempo recebo retorno após enviar o formulário?",
    answer:
      "O time comercial responde em até dois dias úteis com os próximos passos e, se fizer sentido, já agenda uma visita ao shopping.",
  },
  {
    id: "segmentos",
    question: "Quais segmentos o Stop Shop está buscando?",
    answer:
      "Moda feminina, masculina, infantil, calçados, acessórios, cosméticos e gastronomia. Marcas com apelo para atacado e varejo têm prioridade.",
  },
  {
    id: "quiosque",
    question: "Qual a diferença entre loja e quiosque?",
    answer:
      "Lojas são espaços fechados com fachada própria, a partir de 30 m². Quiosques são operações compactas em pontos de alto fluxo nos corredores, com contrato mais enxuto e implantação mais rápida.",
  },
  {
    id: "custos",
    question: "Quais são os custos de ocupação?",
    answer:
      "Os valores variam conforme ponto, metragem e formato. Na apresentação comercial detalhamos aluguel, condomínio e fundo de promoção de forma transparente.",
  },
  {
    id: "projeto",
    question: "Preciso de projeto arquitetônico aprovado?",
    answer:
      "Sim. Após a assinatura, o projeto da loja passa por aprovação técnica do shopping. Nossa equipe acompanha todo o processo até a inauguração.",
  },
];
