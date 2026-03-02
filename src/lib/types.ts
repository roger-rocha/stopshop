export interface Segment {
  id: string;
  name: string;
  slug: string;
  color: string;
  storeCount: number;
  image?: string;
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  photo: string;
  categories: string[];
  segment: string;
  phone?: string;
  whatsapp?: string;
  location: string;
  floor: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
  };
}
