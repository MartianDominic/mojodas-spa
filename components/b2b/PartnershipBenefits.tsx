import { Icon } from "@/components/ui";

const benefits = [
  {
    icon: "home_work",
    title: "Konsultacija vietoje",
    description:
      "Atvykstame, įvertiname jūsų vietovę ir paruošiame optimaliausią instaliacijos planą.",
  },
  {
    icon: "local_shipping",
    title: "Pristatymas ir pajungimas",
    description:
      "Nuosavas transportas ir profesionalų komanda užtikrina saugų montavimą bet kurioje Lietuvos vietoje.",
  },
  {
    icon: "school",
    title: "Personalo apmokymas",
    description:
      "Apmokome jūsų darbuotojus efektyvios priežiūros ir higienos normų laikymosi subtilybių.",
  },
  {
    icon: "payments",
    title: "Kiekybinės nuolaidos",
    description:
      "Specialios sąlygos glampingų tinklams, poilsio bazėms ir kotedžų kompleksams perkant >3 vnt.",
  },
];

export function PartnershipBenefits() {
  return (
    <section className="bg-surface-container-low py-16 md:py-24 lg:py-32 px-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="max-w-3xl mb-24">
          <h2 className="font-display text-4xl md:text-5xl mb-8">
            Daugiau nei produktas. Ilgalaikė partnerystė.
          </h2>
          <p className="text-on-surface-variant text-lg">
            Mes netiekiame tik kubilų. Mes tiekiame veikiantį verslo modelį su
            visapusišku palaikymu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-outline-variant/30">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-surface p-6 md:p-8 lg:p-12 space-y-6">
              <Icon name={benefit.icon} className="text-primary text-4xl" />
              <h4 className="font-headline text-xl">{benefit.title}</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
