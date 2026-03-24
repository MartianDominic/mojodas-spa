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
    <section className="py-12 md:py-16 lg:py-20 bg-surface">
      <div className="container mx-auto px-6">
        <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl text-center mb-10 md:mb-12 leading-snug tracking-tight">
          Nuo užsakymo iki pirmo maudymosi – be jokio streso.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:p-8 lg:p-12 relative">
          {steps.map((step) => (
            <div key={step.number} className="group">
              <div className="text-5xl md:text-6xl font-headline text-primary/20 leading-none mb-[-20px] select-none">
                {step.number}
              </div>
              <h3 className="font-headline text-xl md:text-2xl mb-4 relative z-10">
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
