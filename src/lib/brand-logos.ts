import { z } from "zod";
import { anchorBrands } from "@/lib/data/anchor-brands";

/** Chave em `settings` com a lista de logos da faixa "Marcas que você encontra no Stop Shop". */
export const BRAND_LOGOS_KEY = "brandLogos";
export const MAX_BRAND_LOGOS = 60;

export const brandLogoSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome de cada marca.").max(80, "Use até 80 caracteres no nome."),
  // Upload do admin (Vercel Blob, HTTPS) ou um dos logos padrão em /public/logos.
  logo: z
    .string()
    .trim()
    .refine((value) => value.startsWith("https://") || value.startsWith("/logos/"), "Envie a imagem de cada logo."),
});

export const brandLogosSchema = z
  .array(brandLogoSchema)
  .max(MAX_BRAND_LOGOS, `Use até ${MAX_BRAND_LOGOS} logos.`);

export type BrandLogo = z.infer<typeof brandLogoSchema>;

/** Logos exibidos enquanto o admin não salvar uma lista própria. */
export const defaultBrandLogos: BrandLogo[] = anchorBrands
  .filter((brand): brand is typeof brand & { logo: string } => Boolean(brand.logo))
  .map(({ name, logo }) => ({ name, logo }));
