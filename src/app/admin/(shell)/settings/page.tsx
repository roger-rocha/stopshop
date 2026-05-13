import {
  getContact,
  getHero,
  getHighlights,
  getStopCredBenefits,
  getWholesaleBenefits,
} from "@/lib/server/queries";
import { PageHeader } from "../_components/PageHeader";
import { HeroSettingsForm } from "./HeroSettingsForm";
import { ContactSettingsForm } from "./ContactSettingsForm";
import { ListSettingsForm } from "./ListSettingsForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Configurações" };

export default async function SettingsPage() {
  const [hero, contact, highlights, wholesale, stopCred] = await Promise.all([
    getHero(),
    getContact(),
    getHighlights(),
    getWholesaleBenefits(),
    getStopCredBenefits(),
  ]);

  return (
    <div>
      <PageHeader
        title="Configurações"
        description="Hero da home, dados de contato e listas exibidas no site."
      />

      <div className="space-y-8">
        <Section title="Hero da home">
          <HeroSettingsForm hero={hero} />
        </Section>

        <Section title="Contato">
          <ContactSettingsForm contact={contact} />
        </Section>

        <Section title="Destaques da home" description="Lista de bullets exibida no site.">
          <ListSettingsForm settingKey="highlights" items={[...highlights]} />
        </Section>

        <Section title="Benefícios de atacado" description="Lista usada na página de atacado.">
          <ListSettingsForm settingKey="wholesaleBenefits" items={[...wholesale]} />
        </Section>

        <Section title="Benefícios Stop Cred" description="Lista exibida na página do cartão.">
          <ListSettingsForm settingKey="stopCredBenefits" items={[...stopCred]} />
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
