import type { Metadata } from "next";
import { getSeoMetadata } from "@/lib/server/seo";
import { Lock, ListChecks } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ReportingChannelsCard } from "@/components/pages/ReportingChannelsCard";
import { getReportingChannel } from "@/lib/server/reporting-channel";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getReportingChannel();
  return getSeoMetadata("/denuncia", "/denuncia", {
    title: config.eyebrow,
    description: config.metaDescription,
  });
}

export default async function DenunciaPage() {
  const config = await getReportingChannel();
  return (
    <div className="[overflow-wrap:anywhere]">
      <PageHero
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.subtitle}
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="max-w-3xl whitespace-pre-line text-base leading-8 text-text-secondary">
          {config.introduction}
        </p>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="space-y-5">
            <article className="rounded-[28px] border border-border-default bg-white p-7 shadow-card">
              <ListChecks className="h-6 w-6 text-brand-coral" aria-hidden="true" />
              <h2 className="mt-5 font-display text-2xl font-bold text-text-primary">
                {config.situationsTitle}
              </h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-text-secondary marker:text-brand-coral">
                {config.situations.map((situation, index) => <li key={index}>{situation}</li>)}
              </ul>
            </article>
            <article className="rounded-[28px] border border-border-default bg-white p-7 shadow-card">
              <Lock className="h-6 w-6 text-brand-coral" aria-hidden="true" />
              <h2 className="mt-5 font-display text-2xl font-bold text-text-primary">
                {config.protectionTitle}
              </h2>
              <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-text-secondary">
                {config.protectionText}
              </p>
            </article>
          </div>

          <ReportingChannelsCard config={config} />
        </div>
        <div className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-text-primary">{config.complianceTitle}</h2>
          <p className="mt-4 whitespace-pre-line text-base leading-8 text-text-secondary">{config.complianceText}</p>
        </div>
      </section>
    </div>
  );
}
