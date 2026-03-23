const steps = [
  {
    number: "01",
    title: "Gamyba",
    description:
      "Individuali gamyba pagal jūsų poreikius naudojant tik aukščiausios klasės sertifikuotas medžiagas.",
  },
  {
    number: "02",
    title: "Pristatymas",
    description:
      "Saugus transportavimas iki pat jūsų kiemo bet kuriame Lietuvos kampelyje.",
  },
  {
    number: "03",
    title: "Paleidimas",
    description:
      "Suteikiame pilną instruktažą ir atliekame pirmąjį paleidimą, kad viskas veiktų idealiai.",
  },
];

export function ProcessSteps() {
  return (
    <section className="py-32 bg-surface">
      <div className="container mx-auto px-6">
        <h2 className="font-headline text-4xl md:text-6xl text-center mb-24 leading-tight tracking-tight max-w-3xl mx-auto">
          Nuo užsakymo iki pirmo maudymosi – be jokio streso.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step) => (
            <div key={step.number} className="group">
              <div className="text-8xl font-headline text-primary/10 leading-none mb-[-40px] select-none">
                {step.number}
              </div>
              <h3 className="font-headline text-2xl mb-4 relative z-10">
                {step.title}
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
