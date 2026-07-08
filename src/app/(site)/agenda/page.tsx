import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { getActiveEvents } from "@/lib/server/queries";
import { withEventStatus, eventStatusLabel } from "@/lib/events";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Confira as ações, eventos e promoções que estão acontecendo e as próximas novidades do Stop Shop em Brusque, SC.",
};

export default async function AgendaPage() {
  const events = withEventStatus(await getActiveEvents());
  const active = events.filter((e) => e.status === "active" || e.status === "ongoing");
  const upcoming = events.filter((e) => e.status === "upcoming");

  return (
    <>
      <PageHero
        eyebrow="Agenda"
        title="O que está rolando no Stop Shop"
        description="Eventos, promoções e ações especiais que estão acontecendo agora — e o que vem por aí no shopping."
        actions={[
          { label: "Ver lojas", href: "/lojas", variant: "secondary" },
          { label: "Falar com a equipe", href: "/contato", variant: "ghost" },
        ]}
        stats={[
          { label: "Em cartaz", value: String(active.length) },
          { label: "Próximas ações", value: String(upcoming.length) },
        ]}
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        {events.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-border-subtle bg-surface-soft px-6 py-16 text-center">
            <CalendarDays className="mx-auto h-10 w-10 text-text-muted" aria-hidden="true" />
            <p className="mt-4 font-medium text-text-primary">
              Nenhuma ação programada no momento.
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Acompanhe nosso Instagram para ficar por dentro das novidades.
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {[
              { title: "Em cartaz", items: active },
              { title: "Próximas ações", items: upcoming },
            ]
              .filter((group) => group.items.length > 0)
              .map((group) => (
                <div key={group.title}>
                  <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
                    {group.title}
                  </h2>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {group.items.map((event) => {
                      const card = (
                        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-default bg-white shadow-card transition-shadow hover:shadow-card-hover">
                          <div className="relative aspect-[16/8] w-full overflow-hidden bg-brand-navy">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, 50vw"
                            />
                            <span
                              className={cn(
                                "absolute left-3 top-3 rounded-pill px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white",
                                event.status === "upcoming"
                                  ? "bg-brand-gold"
                                  : "bg-brand-coral"
                              )}
                            >
                              {eventStatusLabel[event.status]}
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col p-5">
                            <h3 className="font-display text-xl font-bold text-text-primary">
                              {event.title}
                            </h3>
                            <p className="mt-2 flex items-center gap-1.5 text-sm text-text-secondary">
                              <CalendarDays className="h-4 w-4 text-brand-coral" aria-hidden="true" />
                              {event.dateLabel}
                            </p>
                            {event.ctaHref && (
                              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-coral transition-transform group-hover:translate-x-0.5">
                                Saiba mais
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                              </span>
                            )}
                          </div>
                        </article>
                      );

                      return event.ctaHref ? (
                        <Link key={event.id} href={event.ctaHref} className="block h-full">
                          {card}
                        </Link>
                      ) : (
                        <div key={event.id} className="h-full">
                          {card}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </>
  );
}
