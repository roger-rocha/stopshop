import { categoryPhotos } from "./category-photos";

type SeedSegment = {
  id: string;
  name: string;
  slug: string;
  color: string;
  storeCount: number;
  image?: string;
};

const seedSegments: SeedSegment[] = [
  { id: "1", name: "Moda Feminina", slug: "moda-feminina", color: "#EA5D7A", storeCount: 45, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" },
  { id: "2", name: "Moda Masculina", slug: "moda-masculina", color: "#1B2A4A", storeCount: 30, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" },
  { id: "3", name: "Moda Infantil", slug: "moda-infantil", color: "#3BAA84", storeCount: 25, image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80" },
  { id: "4", name: "Jeans", slug: "jeans", color: "#4678DD", storeCount: 20, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80" },
  { id: "5", name: "Moda Praia", slug: "moda-praia", color: "#17A7A0", storeCount: 15, image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&q=80" },
  { id: "6", name: "Moda Fitness", slug: "moda-fitness", color: "#D14EA6", storeCount: 12, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80" },
  { id: "7", name: "Calçados", slug: "calcados", color: "#C48A1B", storeCount: 18, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" },
  { id: "8", name: "Presentes e acessórios", slug: "acessorios", color: "#D4A853", storeCount: 14, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80" },
  { id: "9", name: "Cama, Mesa e Banho", slug: "cama-mesa-banho", color: "#8B77D8", storeCount: 10, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80" },
  { id: "10", name: "Malhas", slug: "malhas", color: "#F57676", storeCount: 8, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" },
  { id: "11", name: "Surfwear", slug: "surfwear", color: "#24BEB7", storeCount: 6, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" },
  { id: "12", name: "Gastronomia", slug: "alimentacao", color: "#E59547", storeCount: 8, image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80" },
  { id: "13", name: "Serviços", slug: "servicos", color: "#8393A6", storeCount: 5, image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80" },
  { id: "14", name: "Beleza e bem-estar", slug: "beleza-e-bem-estar", color: "#1B2A4A", storeCount: 0 },
  { id: "15", name: "Calçados femininos", slug: "calcados-femininos", color: "#1B2A4A", storeCount: 0 },
  { id: "16", name: "Casa e decoração", slug: "casa-e-decoracao", color: "#1B2A4A", storeCount: 0 },
  { id: "17", name: "Esportes", slug: "esportes", color: "#1B2A4A", storeCount: 0 },
  { id: "18", name: "Farmácia", slug: "farmacia", color: "#1B2A4A", storeCount: 0 },
  { id: "19", name: "Joalheria", slug: "joalheria", color: "#1B2A4A", storeCount: 0 },
  { id: "20", name: "Lazer", slug: "lazer", color: "#1B2A4A", storeCount: 0 },
  { id: "21", name: "Ótica", slug: "otica", color: "#1B2A4A", storeCount: 0 },
  { id: "22", name: "Salão de beleza/barbearia", slug: "salao-de-beleza-barbearia", color: "#1B2A4A", storeCount: 0 },
  { id: "23", name: "Laboratório", slug: "laboratorio", color: "#1B2A4A", storeCount: 0 },
];

export const segments: SeedSegment[] = seedSegments.map((segment) => ({
  ...segment,
  image: categoryPhotos[segment.slug] ?? segment.image,
}));
