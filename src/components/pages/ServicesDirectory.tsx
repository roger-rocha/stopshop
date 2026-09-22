"use client";

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
            <StaggerItem key={service.id} className="h-full">
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
  return (
    <article className="flex h-full min-h-44 flex-col items-center justify-center rounded-3xl border border-border-default bg-surface-soft px-4 py-8 text-center sm:min-h-48">
      <span aria-hidden="true" className="text-brand-navy/65 [&_svg]:stroke-[1.25]">
        <ServiceIcon name={service.icon} className="h-14 w-14 sm:h-16 sm:w-16" />
      </span>
      <h2 className="mt-4 text-sm font-medium leading-snug text-text-primary">
        {service.name}
      </h2>
    </article>
  );
}
