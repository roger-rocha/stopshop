import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const loginSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(1, "Informe a senha."),
});

const csvList = z
  .union([z.string(), z.array(z.string())])
  .transform((value) =>
    Array.isArray(value)
      ? value
      : value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
  );

const optionalString = z
  .string()
  .optional()
  .transform((v) => (v && v.trim().length > 0 ? v.trim() : null));

export const storeSchema = z.object({
  name: z.string().min(2, "Informe o nome."),
  slug: z
    .string()
    .min(2, "Informe o slug.")
    .regex(slugRegex, "Slug deve conter apenas letras minúsculas, números e hífens."),
  photo: z.string().default(""),
  storefront: optionalString,
  instagram: optionalString,
  categories: csvList.pipe(z.array(z.string())),
  segment: z.string().min(1, "Selecione um segmento."),
  phone: optionalString,
  whatsapp: optionalString,
  location: z.string().min(1, "Informe a localização."),
  floor: z.string().default("Térreo"),
  featured: z.preprocess((v) => v === "on" || v === true || v === "true", z.boolean()),
});

export type StoreInput = z.infer<typeof storeSchema>;

export const segmentSchema = z.object({
  name: z.string().min(2, "Informe o nome."),
  slug: z
    .string()
    .min(2, "Informe o slug.")
    .regex(slugRegex, "Slug deve conter apenas letras minúsculas, números e hífens."),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Cor deve estar em formato hex (#RRGGBB)."),
  image: z
    .string()
    .optional()
    .transform((v) => (v && v.trim().length > 0 ? v.trim() : null)),
  storeCount: z.coerce.number().int().min(0).default(0),
  position: z.coerce.number().int().min(0).default(0),
});

export type SegmentInput = z.infer<typeof segmentSchema>;

const paragraphList = z
  .union([z.string(), z.array(z.string())])
  .transform((value) =>
    Array.isArray(value)
      ? value
      : value
          .split(/\n\s*\n/)
          .map((s) => s.trim())
          .filter(Boolean)
  );

export const postSchema = z.object({
  title: z.string().min(2, "Informe o título."),
  slug: z
    .string()
    .min(2, "Informe o slug.")
    .regex(slugRegex, "Slug deve conter apenas letras minúsculas, números e hífens."),
  excerpt: z.string().min(1, "Informe um resumo."),
  image: z.string().min(1, "Informe a URL da imagem."),
  date: z.string().min(1, "Informe a data."),
  category: z.string().min(1, "Informe a categoria."),
  readingTime: z
    .string()
    .optional()
    .transform((v) => (v && v.trim().length > 0 ? v.trim() : null)),
  content: paragraphList.pipe(z.array(z.string())),
  published: z.preprocess(
    (v) => v === "on" || v === true || v === "true",
    z.boolean()
  ),
});

export type PostInput = z.infer<typeof postSchema>;

export const heroSettingsSchema = z.object({
  eyebrow: z.string().default(""),
  title: z.string().min(1, "Informe o título do hero."),
  titleHighlight: z.string().default(""),
  image: z.string().default(""),
  ctaLabel: z.string().default(""),
  ctaHref: z.string().default("/"),
});

export type HeroSettings = z.infer<typeof heroSettingsSchema>;

export const contactSettingsSchema = z.object({
  phone: z.string().default(""),
  whatsapp: z.string().default(""),
  email: z.string().default(""),
  addressLine1: z.string().default(""),
  addressLine2: z.string().default(""),
  neighborhood: z.string().default(""),
  city: z.string().default(""),
  state: z.string().default(""),
  zip: z.string().default(""),
  hours: z.string().default(""),
  sundayNote: z.string().default(""),
});

export type ContactSettings = z.infer<typeof contactSettingsSchema>;
