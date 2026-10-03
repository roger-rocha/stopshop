import {
  getContact,
  getHero,
  getHighlights,
  getOpeningSchedule,
} from "@/lib/server/queries";
import { PageHeader } from "../_components/PageHeader";
import { HeroSettingsForm } from "./HeroSettingsForm";
import { ContactSettingsForm } from "./ContactSettingsForm";
import { ListSettingsForm } from "./ListSettingsForm";
import { OpeningScheduleForm } from "./OpeningScheduleForm";
import { SiteVisibilityForm } from "./SiteVisibilityForm";
import { getSitePublished } from "@/lib/server/site-visibility";

export const dynamic = "force-dynamic";
export const metadata = { title: "Configurações" };

export default async function SettingsPage() {
  const [hero, contact, highlights, openingSchedule, published] = await Promise.all([
    getHero(),
    getContact(),
    getHighlights(),
    getOpeningSchedule(),
    getSitePublished(),
  ]);

  return (
    <div>
      <PageHeader
        title="Configurações"
        description="Disponibilidade do site, hero da home, dados de contato e listas."
      />

      <div className="space-y-8">
        <Section title="Disponibilidade do site">
          <SiteVisibilityForm published={published} />
        </Section>

        <Section title="Hero da home">
          <HeroSettingsForm hero={hero} />
        </Section>

        <Section title="Contato">
          <ContactSettingsForm contact={contact} />
        </Section>

        <Section title="Agenda de funcionamento" description="Cadastre aberturas e fechamentos em domingos, feriados e datas especiais. Os meses aparecem automaticamente na home. Edite o horário habitual em Contato.">
          <OpeningScheduleForm schedule={openingSchedule} />
        </Section>

        <Section title="Destaques da home" description="Lista de bullets exibida no site.">
          <ListSettingsForm settingKey="highlights" items={[...highlights]} />
        </Section>


      </div>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
      <header className="mb-5">
        <h2 className="font-display text-lg font-bold text-text-primary">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        )}
      </header>
      {children}
    </section>
  );
}
