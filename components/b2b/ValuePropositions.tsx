import { Icon } from "@/components/ui";

const propositions = [
  {
    icon: "trending_up",
    title: "Pajamų šuolis",
    description:
      "+30–50 € prie nakvynės. Atsiperka per ",
    highlight: "4–6 mėnesius.",
    tag: "ROI Maksimalizavimas",
  },
  {
    icon: "calendar_today",
    title: "Nesezono išgyvenimas",
    description: "Pilni savaitgaliai lapkritį dėl ",
    highlight: "38°C kubilo.",
    tagDescription: " Užtikrinkite užimtumą visus metus.",
    tag: "Sezoniškumo panaikinimas",
  },
  {
    icon: "cloudy_snowing",
    title: "Nepriklausomybė nuo oro",
    description:
      "Prastas oras tampa romantišku privalumu. Svečių atostogos nebesugadinamos lietaus ar šalčio.",
    tag: "Svečių pasitenkinimas",
  },
];

export function ValuePropositions() {
  return (
    <section className="py-32 px-8 max-w-screen-2xl mx-auto">
      <div className="max-w-3xl mb-20">
        <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
          Jūs parduodate ne nakvynę, o{" "}
          <span className="text-primary italic">patirtį.</span>
        </h2>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          Šiandienos Lietuvos kaimo turizmo rinka yra perpildyta. Išsiskirti
          vien gražia aplinka nebepakanka.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {propositions.map((prop) => (
          <div
            key={prop.title}
            className="p-12 bg-surface-container-low border-b-2 border-transparent hover:border-primary transition-all duration-500 group"
          >
            <div className="mb-8 text-primary opacity-60 group-hover:opacity-100 transition-opacity">
              <Icon name={prop.icon} className="text-5xl" />
            </div>
            <h3 className="font-headline text-2xl mb-6">{prop.title}</h3>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              {prop.description}
              {prop.highlight && (
                <span className="text-on-surface font-bold">
                  {prop.highlight}
                </span>
              )}
              {prop.tagDescription}
            </p>
            <div className="text-xs font-bold tracking-widest uppercase text-primary">
              {prop.tag}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
