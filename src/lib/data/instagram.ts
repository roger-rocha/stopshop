// Conteúdo inicial da grade do Instagram — usado apenas pelo seed do banco.
// O conteúdo real é gerenciado pelo painel /admin/instagram.
export interface SeedInstagramPost {
  image: string;
  alt: string;
  link: string | null;
  position: number;
}

export const seedInstagramPosts: SeedInstagramPost[] = [
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    alt: "Look da semana",
    link: null,
    position: 0,
  },
  {
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    alt: "Coleção de inverno",
    link: null,
    position: 1,
  },
  {
    image:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
    alt: "Vitrine de moda",
    link: null,
    position: 2,
  },
  {
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80",
    alt: "Detalhe de loja",
    link: null,
    position: 3,
  },
  {
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    alt: "Vibe do shopping",
    link: null,
    position: 4,
  },
  {
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
    alt: "Bastidores do Stop Shop",
    link: null,
    position: 5,
  },
];
