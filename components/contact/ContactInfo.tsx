import { Icon } from "@/components/ui";

const contactCards = [
  {
    icon: "phone",
    title: "Telefonas",
    details: ["+370 XXX XXXXX"],
    description: "Pirmadienį - Penktadienį, 9:00 - 18:00",
  },
  {
    icon: "email",
    title: "El. paštas",
    details: ["info@mojodas.lt", "support@mojodas.lt"],
    description: "Atsakysime per 24 val.",
  },
  {
    icon: "location_on",
    title: "Adresas",
    details: ["MojoDas Spa", "Lietuva"],
    description: "Apsilankymas tik susitarus",
  },
  {
    icon: "schedule",
    title: "Darbo laikas",
    details: ["Pr - Pn: 9:00 - 18:00", "Š - S: Susitarus"],
    description: "Laukiame jūsų apsilankymo",
  },
];

export function ContactInfo() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactCards.map((card) => (
          <div
            key={card.icon}
            className="bg-surface-container-low p-8 hover:bg-surface-container transition-colors group"
          >
            <Icon
              name={card.icon}
              className="text-primary text-4xl mb-6 group-hover:scale-110 transition-transform"
            />
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4">
              {card.title}
            </h3>
            <div className="space-y-2 mb-4">
              {card.details.map((detail, idx) => (
                <p key={idx} className="text-on-surface font-medium">
                  {detail}
                </p>
              ))}
            </div>
            <p className="text-on-surface-variant text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
