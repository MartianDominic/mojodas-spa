import { Header, Footer } from "@/components/layout";
import {
  B2BHero,
  ValuePropositions,
  EngineeringDurability,
  B2BModels,
  PartnershipBenefits,
  LeadForm,
  B2BCalendly,
} from "@/components/b2b";

export const metadata = {
  title: "Lux Spa Nature | Komerciniai SPA Sprendimai Verslui",
  description:
    "Padidinkite užimtumą ne sezono metu ir pakelkite bazinę nakvynės kainą. Ilgaamžiai, intensyviam naudojimui ir minimaliai priežiūrai pritaikyti kubilai tiesiai iš gamintojo.",
};

export default function B2BPage() {
  return (
    <>
      <Header variant="default" />
      <main>
        <B2BHero />
        <ValuePropositions />
        <EngineeringDurability />
        <B2BModels />
        <PartnershipBenefits />

        {/* Contact Section */}
        <section
          className="max-w-screen-2xl mx-auto px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20"
          id="contact"
        >
          <LeadForm />
          <B2BCalendly />
        </section>
      </main>
      <Footer />
    </>
  );
}
