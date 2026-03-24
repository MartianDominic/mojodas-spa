const facts = [
  {
    icon: "water_drop",
    title: "Skaidrus vanduo",
    description:
      "Integruota smėlio filtracijos sistema užtikrina krištolinį švarumą su minimalia priežiūra.",
  },
  {
    icon: "construction",
    title: "Medicininis AISI 316 plienas",
    description:
      "Naudojame tik atspariausią korozijai plieną, tinkamą sūriam vandeniui ir chlorui.",
  },
  {
    icon: "ac_unit",
    title: "Pritaikyta Lietuvos žiemoms",
    description:
      "Mūsų kubilai nebijo -30°C šalčio dėka unikalios daugiasluoksnės termoizoliacijos.",
  },
];

export function EngineeringFacts() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-surface-container-low">
      <div className="container mx-auto px-6">
        <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl mb-12 md:mb-16 text-center">
          Kodėl šis sprendimas tarnaus ilgai?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {facts.map((fact) => (
            <div key={fact.title} className="text-center px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-8 text-primary shadow-sm">
                <span className="material-symbols-outlined text-3xl">{fact.icon}</span>
              </div>
              <h3 className="font-headline text-xl mb-4">{fact.title}</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                {fact.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
