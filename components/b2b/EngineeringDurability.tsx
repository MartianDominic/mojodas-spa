import Image from "next/image";
import { Icon } from "@/components/ui";

export function EngineeringDurability() {
  return (
    <section className="bg-surface-container-low py-32 px-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Sukurta intensyviam svečių naudojimui.
          </h2>
          <p className="text-on-surface-variant text-lg">
            Mūsų inžinerija sukurta taip, kad atlaikytų dideles apkrovas ir
            reikalautų absoliutaus minimumo jūsų darbuotojų laiko.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-4 h-auto md:min-h-[700px]">
          {/* Item 1: 5-min maintenance */}
          <div className="md:col-span-8 md:row-span-1 bg-surface p-12 flex flex-col justify-end relative overflow-hidden">
            <div className="absolute top-12 right-12 text-6xl font-display text-primary/10">
              01
            </div>
            <div className="max-w-md relative z-10">
              <Icon name="cleaning_services" className="text-primary text-4xl mb-6" />
              <h4 className="font-headline text-2xl mb-4">5 minučių priežiūra</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Smėlio filtrai ir UVC sterilizacija. Nereikia keisti vandens po
                kiekvieno kliento – sutaupykite laiko ir vandens resursų.
              </p>
            </div>
            <Image
              src="/images/b2b/filtration-system.jpg"
              alt="Advanced filtration system"
              fill
              className="object-cover opacity-5 pointer-events-none"
            />
          </div>

          {/* Item 2: Vandal-proof */}
          <div className="md:col-span-4 md:row-span-1 bg-surface-container-highest p-12 flex flex-col justify-between border border-outline-variant/20">
            <Icon name="security" className="text-primary text-4xl" />
            <div>
              <h4 className="font-headline text-2xl mb-4">
                Atsparumas svečių klaidoms
              </h4>
              <p className="text-on-surface-variant leading-relaxed">
                Medicininis AISI 316 plienas. Ypatingai atsparus chlorui,
                druskoms ir mechaniniams pažeidimams.
              </p>
            </div>
          </div>

          {/* Item 3: Zero rot */}
          <div className="md:col-span-12 md:row-span-1 bg-primary text-white p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <Icon
                name="forest"
                className="text-surface-container-lowest text-4xl mb-6"
              />
              <h4 className="font-headline text-3xl mb-4">
                Jokių trūnijančių lentų
              </h4>
              <p className="text-white/80 text-xl leading-relaxed">
                Skandinaviška termo-mediena užtikrina stabilumą bet kokiomis
                oro sąlygomis. Investicija, kuri nepraranda prekinės išvaizdos
                dešimtmečius.
              </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10">
              <Icon name="nature_people" className="text-[300px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
