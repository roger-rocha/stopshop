// Conteúdo inicial da galeria "Sobre" — usado apenas pelo seed do banco.
// O conteúdo real é gerenciado pelo painel /admin/gallery.
export interface SeedGalleryImage {
  image: string;
  alt: string;
  position: number;
}

export const seedGalleryImages: SeedGalleryImage[] = [
  {
    image:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&q=80",
    alt: "Corredor principal do Stop Shop",
    position: 0,
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    alt: "Vitrines e lojas de moda",
    position: 1,
  },
  {
    image:
      "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80",
    alt: "Praça de alimentação",
    position: 2,
  },
  {
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    alt: "Vitrines de marcas",
    position: 3,
  },
  {
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    alt: "Ambiente interno",
    position: 4,
  },
  {
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
    alt: "Espaço de descanso",
    position: 5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&q=80",
    alt: "Detalhes da decoração",
    position: 6,
  },
  {
    image:
      "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=800&q=80",
    alt: "Iluminação do mall",
    position: 7,
  },
];
