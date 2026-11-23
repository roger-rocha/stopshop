/**
 * Regras de upload de imagens do admin e a medida ideal de cada campo.
 *
 * As medidas saem do maior tamanho em que cada imagem aparece no site, dobrado
 * para telas retina (2x). O servidor (`/api/admin/upload`) usa os mesmos tipos e limite.
 */

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB

export const ACCEPTED_FORMATS_LABEL = "Formatos: JPG, PNG, WebP, AVIF ou GIF · até 8 MB.";
export const ACCEPTED_FORMATS_ERROR = "Use JPG, PNG, WebP, AVIF ou GIF de até 8 MB (SVG não é aceito).";

export interface ImageSpec {
  /** Ex.: "1600 × 1200 px (4:3)". */
  size: string;
  /** Como a imagem é recortada/exibida e o que evitar. */
  note?: string;
  /** Substitui a linha padrão de formatos, quando o campo pede algo específico. */
  formats?: string;
}

export const imageSpecs = {
  storeLogo: {
    size: "1200 × 900 px (4:3)",
    note: "O logo nunca é cortado; deixe uma margem ao redor.",
    formats: "Prefira PNG com fundo transparente. Também aceita JPG, WebP, AVIF ou GIF · até 8 MB.",
  },
  storefront: {
    size: "1600 × 1200 px (4:3), horizontal",
    note: "Nos cards é cortada para 4:3; mantenha a fachada e o letreiro no centro.",
  },
  storePhotos: {
    size: "1600 × 1200 px (4:3), horizontal",
    note: "Nas miniaturas a foto é cortada para 4:3; mantenha o produto no centro. Na ampliação ela aparece inteira.",
  },
  segment: {
    size: "1200 × 1600 px (3:4), vertical",
    note: "É cortada nas bordas e o rodapé fica escurecido com o nome do segmento; mantenha o assunto no centro e na parte de cima.",
  },
  eventBanner: {
    size: "2400 × 750 px (3,2:1)",
    note: "No celular as laterais são cortadas (cerca de 20% de cada lado); mantenha textos e logos na faixa central. No calendário a arte aparece inteira.",
  },
  gallery: {
    size: "2400 × 1600 px (3:2), horizontal",
    note: "É cortada como faixa larga na home e na vertical (4:5) na página Sobre; mantenha o assunto bem no centro.",
  },
  instagram: {
    size: "1080 × 1080 px (1:1), quadrada",
    note: "Hoje o feed da home vem direto do Instagram; estas imagens não aparecem no site.",
  },
  postCover: {
    size: "1600 × 1000 px (16:10)",
    note: "Pode ser levemente cortada nas bordas, e mais em cima e embaixo ao compartilhar nas redes; mantenha o conteúdo no centro.",
  },
  heroSlide: {
    size: "2400 × 1350 px (16:9), mínimo 1920 × 1080 px",
    note: "Ocupa a tela toda e é cortada nas bordas; no celular aparece só a faixa central. O texto fica à esquerda, então mantenha o assunto principal no centro.",
  },
  aboutHero: {
    size: "1800 × 1500 px (6:5)",
    note: "No computador aparece em 6:5 e no celular em 4:3, cortando as laterais; mantenha o assunto principal no centro.",
  },
  shareImage: {
    size: "1200 × 630 px",
    note: "Algumas redes cortam as laterais ou mostram só um quadrado central; mantenha logo e textos no centro, com margem.",
  },
  seoLogo: {
    size: "512 × 512 px, quadrada (mínimo 112 × 112 px)",
    note: "Logo centralizado com pouca margem; o Google usa essa imagem nos resultados de busca.",
    formats: "Prefira PNG com fundo transparente ou branco. Também aceita JPG, WebP, AVIF ou GIF · até 8 MB.",
  },
  brandLogo: {
    size: "96 px de altura × até 400 px de largura",
    note: "Recorte rente ao logo, sem margens, senão ele aparece menor. Use cores que contrastem com fundo branco.",
    formats: "Prefira PNG com fundo transparente. Também aceita WebP, JPG, AVIF ou GIF · até 8 MB.",
  },
} satisfies Record<string, ImageSpec>;
