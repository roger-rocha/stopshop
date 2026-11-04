import type { Metadata } from "next";
import { z } from "zod";
import { siteSocialLinks } from "./site";

export const SEO_SETTINGS_KEY = "seo:global";
export const SEO_PAGE_PREFIX = "seo:page:";

function isWebUrl(value: string, relative = false) {
  if (/[\s\\]/.test(value) || value.startsWith("//")) return false;
  if (!relative && !/^https?:\/\//i.test(value)) return false;
  if (relative && !value.startsWith("/") && !/^https?:\/\//i.test(value)) return false;
  try {
    const url = new URL(value, "https://stopshop.com.br");
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password && !url.hash;
  } catch {
    return false;
  }
}

const optionalUrl = z.string().trim().max(2048, "Use uma URL com até 2048 caracteres.")
  .refine((value) => !value || isWebUrl(value, true), "Use uma URL HTTP/HTTPS ou um caminho iniciado por /, sem fragmentos.");
const verificationCode = z.string().trim().max(256, "Use apenas o código de verificação.")
  .regex(/^[a-zA-Z0-9_=-]*$/, "Cole apenas o código de verificação, sem a tag HTML.");

export const seoSettingsSchema = z.object({
  siteName: z.string().trim().min(1, "Informe o nome do site.").max(100),
  siteUrl: z.string().trim().max(2048).refine((value) => {
    if (!isWebUrl(value)) return false;
    const url = new URL(value);
    return url.pathname === "/" && !url.search;
  }, "Informe o domínio completo (https://exemplo.com.br), sem caminhos ou parâmetros.").transform((value) => new URL(value).origin),
  defaultTitle: z.string().trim().min(1, "Informe o título padrão.").max(200),
  titleTemplate: z.string().trim().max(200).refine((value) => value.split("%s").length === 2, "O modelo de título deve conter %s exatamente uma vez."),
  defaultDescription: z.string().trim().min(1, "Informe a descrição padrão.").max(500),
  defaultImage: optionalUrl,
  defaultImageAlt: z.string().trim().max(200),
  googleVerification: verificationCode,
  bingVerification: verificationCode,
  indexable: z.boolean(),
  structuredData: z.boolean(),
  logo: optionalUrl,
  socialLinks: z.array(z.string().trim().max(2048).refine((value) => isWebUrl(value), "Use URLs completas HTTP/HTTPS nos perfis sociais.")).max(15, "Informe até 15 perfis sociais."),
});

export const pageSeoSchema = z.object({
  title: z.string().trim().max(200, "Use até 200 caracteres no título."),
  description: z.string().trim().max(500, "Use até 500 caracteres na descrição."),
  image: optionalUrl,
  imageAlt: z.string().trim().max(200),
  canonical: optionalUrl,
  indexable: z.boolean(),
  includeInSitemap: z.boolean(),
});

export type SeoSettings = z.infer<typeof seoSettingsSchema>;
export type PageSeo = z.infer<typeof pageSeoSchema>;
export type SeoDefaults = { title: string; description: string; image?: string };
export type SeoEntry = {
  key: string;
  path: string;
  label: string;
  group: "Páginas" | "Blog" | "Segmentos";
  published: boolean;
  defaults: SeoDefaults;
  settings: PageSeo;
  updatedAt?: number;
};

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  siteName: "Stop Shop",
  siteUrl: "https://stopshop.com.br",
  defaultTitle: "Stop Shop — Shopping de Moda em Brusque, SC | 160+ Marcas",
  titleTemplate: "%s | Stop Shop",
  defaultDescription: "Mais de 160 marcas de moda em um só lugar. Moda e variedade para toda a família. Visite o Stop Shop em Brusque, SC.",
  defaultImage: "",
  defaultImageAlt: "Stop Shop — Shopping de Moda em Brusque, SC",
  googleVerification: "",
  bingVerification: "",
  indexable: true,
  structuredData: true,
  logo: "/logos/logo-new.png",
  socialLinks: siteSocialLinks.map((link) => link.href),
};

export const DEFAULT_PAGE_SEO: PageSeo = {
  title: "", description: "", image: "", imageAlt: "", canonical: "",
  indexable: true, includeInSitemap: true,
};

export const STATIC_SEO_PAGES: Array<{ path: string; label: string } & SeoDefaults> = [
  { path: "/", label: "Página inicial", title: "", description: "" },
  { path: "/sobre", label: "Sobre", title: "Sobre", description: "Conheça a história do Stop Shop, o ninho da moda de Brusque, com mais de 160 marcas de moda em um só lugar." },
  { path: "/lojas", label: "Lojas", title: "Lojas", description: "Explore as lojas do Stop Shop, filtre por segmento e encontre marcas de moda, acessórios, alimentação e muito mais em Brusque." },
  { path: "/servicos", label: "Serviços", title: "Serviços", description: "Estacionamento, acessibilidade, praça de alimentação e demais comodidades disponíveis para quem visita o Stop Shop em Brusque, SC." },
  { path: "/abra-uma-loja", label: "Abra sua loja", title: "Abra sua loja no Stop Shop", description: "Lojas, quiosques e espaços de mídia no maior shopping de moda de Brusque, SC. Mais de 160 marcas, 30 anos de história e público comprador de todo o Brasil." },
  { path: "/localizacao", label: "Localização", title: "Localização", description: "Veja como chegar ao Stop Shop em Brusque, consulte horários de funcionamento e conheça a estrutura de estacionamento." },
  { path: "/contato", label: "Contato", title: "Contato", description: "Entre em contato com a equipe do Stop Shop para informações sobre lojas, atendimento e visitas ao shopping." },
  { path: "/trabalhe-conosco", label: "Trabalhe Conosco", title: "Trabalhe Conosco", description: "Vagas na administração do Stop Shop e nas lojas do shopping em Brusque, SC." },
  { path: "/blog", label: "Blog", title: "Blog", description: "Acompanhe novidades, lançamentos e bastidores do Stop Shop em Brusque, SC." },
  { path: "/cadastro", label: "Cadastro", title: "Cadastro", description: "Faça seu cadastro e conheça as vantagens para clientes do Stop Shop, com atendimento prático e benefícios exclusivos." },
  { path: "/denuncia", label: "Portal de Denúncia", title: "Portal de Denúncia", description: "Canal seguro e confidencial do Stop Shop para registrar denúncias de conduta, assédio, fraude ou questões de segurança, de forma identificada ou anônima." },
  { path: "/politica-de-privacidade", label: "Política de Privacidade", title: "Política de Privacidade", description: "" },
  { path: "/politica-de-cookies", label: "Política de Cookies", title: "Política de Cookies", description: "" },
];

export function formatSeoTitle(title: string, settings: SeoSettings) {
  return title ? settings.titleTemplate.replace("%s", () => title) : settings.defaultTitle;
}

export function resolvePageSeo(settings: SeoSettings, page: PageSeo, defaults: SeoDefaults, path: string) {
  const rawTitle = page.title || (path === "/" ? settings.defaultTitle : defaults.title);
  // Content images predate SEO validation; a malformed legacy image must not
  // break page metadata, the editor, or the sitemap.
  const image = [page.image, defaults.image, settings.defaultImage].find((value) => value && isWebUrl(value, true));
  const canonical = new URL(page.canonical || path, settings.siteUrl).href;
  const indexable = settings.indexable && page.indexable;
  return {
    title: path === "/" ? rawTitle : formatSeoTitle(rawTitle, settings),
    description: page.description || (path === "/" ? settings.defaultDescription : defaults.description) || settings.defaultDescription,
    image: image ? new URL(image, settings.siteUrl).href : "",
    imageAlt: page.imageAlt || (image && (image === page.image || image === defaults.image) ? rawTitle : settings.defaultImageAlt) || rawTitle,
    canonical,
    indexable,
    includeInSitemap: indexable && page.includeInSitemap && canonical === new URL(path, settings.siteUrl).href,
  };
}

export function buildSeoMetadata(settings: SeoSettings, page: PageSeo, defaults: SeoDefaults, path: string, extra: Metadata = {}): Metadata {
  const resolved = resolvePageSeo(settings, page, defaults, path);
  const images = resolved.image ? [{ url: resolved.image, alt: resolved.imageAlt }] : [];
  return {
    ...extra,
    title: { absolute: resolved.title },
    description: resolved.description,
    alternates: { ...extra.alternates, canonical: resolved.canonical },
    robots: { index: resolved.indexable, follow: true },
    openGraph: {
      type: "website",
      ...extra.openGraph,
      locale: "pt_BR",
      siteName: settings.siteName,
      title: resolved.title,
      description: resolved.description,
      url: resolved.canonical,
      images,
    },
    twitter: {
      ...extra.twitter,
      card: resolved.image ? "summary_large_image" : "summary",
      title: resolved.title,
      description: resolved.description,
      images,
    },
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
