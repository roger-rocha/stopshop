import { getBrandLogos } from "@/lib/server/queries";
import { defaultBrandLogos } from "@/lib/brand-logos";
import { PageHeader } from "../_components/PageHeader";
import { BrandLogosForm } from "./BrandLogosForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Marcas" };

export default async function BrandLogosPage() {
  const brands = await getBrandLogos();

  return (
    <div>
      <PageHeader
        title="Marcas"
        description='Logos da faixa "Marcas que você encontra no Stop Shop", na home e em Abra sua loja. A ordem da lista é a ordem no site.'
      />
      <div className="rounded-[20px] border border-border-default bg-white p-5 shadow-card sm:p-8">
        <BrandLogosForm brands={brands} defaults={defaultBrandLogos} />
      </div>
    </div>
  );
}
