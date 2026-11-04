import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getSeoEntries, getSeoSettings } from "@/lib/server/seo";
import { PageHeader } from "../../_components/PageHeader";
import { SeoPageForm } from "../SeoPageForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Editar SEO" };

export default async function EditPageSeo({ searchParams }: { searchParams: Promise<{ key?: string | string[] }> }) {
  const { key } = await searchParams;
  if (typeof key !== "string") notFound();
  const [entries, settings] = await Promise.all([getSeoEntries(), getSeoSettings()]);
  const entry = entries.find((item) => item.key === key);
  if (!entry) notFound();
  return (
    <div>
      <PageHeader title={`SEO · ${entry.label}`} description={entry.path} backHref="/admin/seo#paginas" action={entry.published ? <Link href={entry.path} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-button border border-border-default bg-white px-4 text-xs font-medium text-brand-navy transition-colors hover:bg-surface-soft">Ver página<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link> : undefined} />
      <div className="rounded-[20px] border border-border-default bg-white p-5 shadow-card sm:p-7"><SeoPageForm entry={entry} settings={settings} /></div>
    </div>
  );
}
