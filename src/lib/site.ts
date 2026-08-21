export const siteNavigation = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Lojas", href: "/lojas" },
  { label: "Serviços", href: "/servicos" },
  { label: "Contato", href: "/contato" },
] as const;

/** Botão contornado exibido ao final do menu (desktop e mobile). */
export const siteNavCta = {
  label: "Abra uma loja",
  href: "/abra-uma-loja",
} as const;

export const siteSocialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/stopshopbrusque" },
  { label: "Facebook", href: "https://www.facebook.com/stopshopbrusque" },
  { label: "YouTube", href: "https://www.youtube.com/user/NINHODAMODA" },
  { label: "TikTok", href: "https://www.tiktok.com/@oninhodamodastop" },
] as const;

/** Coluna "Institucional" do rodapé. */
export const siteInstitutionalLinks = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Política de Cookies", href: "/politica-de-cookies" },
  { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
] as const;

/** Horário das lojas — exibido no rodapé e na página de Lojas. */
export const storeOpeningHours = {
  title: "Lojas e Quiosques",
  weekdays: "Seg às Sáb — 9h às 19h",
  sunday: "Domingo — horário especial, consultar",
} as const;

export const siteContact = {
  phone: "4732557000",
  whatsapp: "554732557000",
  email: "comercial@stopshop.com.br",
  addressLine1: "Rodovia Antônio Heil, 635",
  addressLine2: "Bairro Santa Terezinha",
  cityLine: "Brusque/SC - CEP 88352-288",
  neighborhood: "Santa Terezinha",
  city: "Brusque",
  state: "SC",
  zip: "88352-288",
  hours: "Segunda a sábado das 09h às 19h",
  sundayNote: "Domingos e datas especiais com horário divulgado antecipadamente.",
  temperature: "24,3º",
} as const;

/** Texto padrão do hero — usado pelos defaults do CMS e pelo seed/scripts. */
export const defaultHeroContent = {
  eyebrow: "O Ninho da Moda · Brusque, SC",
  title: "30 anos de tradição.\nMais de 160 marcas.\nO ninho da moda de Brusque.",
  titleHighlight: "Mais de 160 marcas.",
  ctaLabel: "",
  ctaHref: "/lojas",
} as const;

export const siteHighlights = [
  "Mais de 160 marcas de moda",
  "Quatro pavimentos estruturados",
  "Praça de alimentação completa",
  "Dois estacionamentos externos gratuitos",
] as const;

export const wholesaleBenefits = [
  "Atendimento pensado para excursões e compradores multimarcas",
  "Área de descanso para guias e motoristas",
  "Mix de moda feminina, masculina, infantil e segmentos complementares",
  "Estrutura com estacionamento para ônibus, vans e carros",
] as const;
