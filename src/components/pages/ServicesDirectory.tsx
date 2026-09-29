"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/db/schema";

export function ServicesDirectory({ services }: { services: Service[] }) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
      {services.length > 0 ? (
        <StaggerChildren
          amount={0.05}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5"
        >
          {services.map((service) => (
            <StaggerItem key={service.id} className="self-start">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      ) : (
        <div className="rounded-[28px] border border-dashed border-border-subtle bg-surface-soft px-6 py-16 text-center">
          <p className="font-medium text-text-primary">
            Em breve, mais informações sobre nossos serviços.
          </p>
        </div>
      )}
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `service-details-${service.id}`;
  const triggerId = `service-trigger-${service.id}`;
  const description = service.description.trim();

  if (!description) {
    return (
      <article className="flex min-h-44 flex-col items-center justify-center rounded-3xl border border-border-default bg-surface-soft px-4 py-6 text-center sm:min-h-48">
        <span aria-hidden="true" className="text-brand-navy/65 [&_svg]:stroke-[1.25]">
          <ServiceIcon name={service.icon} className="h-12 w-12 sm:h-14 sm:w-14" />
        </span>
        <h2 className="mt-4 font-body text-sm font-medium leading-snug text-text-primary">{service.name}</h2>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-border-default bg-surface-soft">
      <h2>
        <button
          type="button"
          id={triggerId}
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((value) => !value)}
          className="group flex min-h-44 scroll-mt-32 w-full flex-col items-center justify-center px-4 py-6 text-center transition-colors hover:bg-brand-navy/[0.03] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-coral sm:min-h-48"
        >
          <span aria-hidden="true" className="text-brand-navy/65 [&_svg]:stroke-[1.25]">
            <ServiceIcon name={service.icon} className="h-12 w-12 sm:h-14 sm:w-14" />
          </span>
          <span className="mt-4 font-body text-sm font-medium leading-snug text-text-primary">{service.name}</span>
          <span className="mt-3 inline-flex items-center gap-1 font-body text-xs text-brand-navy">
            {expanded ? "Menos detalhes" : "Saiba mais"}
            <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform duration-300 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} />
          </span>
        </button>
      </h2>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!expanded}
        inert={!expanded}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mx-4 border-t border-border-default py-5 sm:mx-6">
            <p className="whitespace-pre-line break-words text-left text-sm leading-relaxed text-text-secondary">
              {description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
