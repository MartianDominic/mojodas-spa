import Image from "next/image";
import { Icon } from "@/components/ui";

export function B2BHero() {
  return (
    <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/b2b/modern-cabin.jpg"
          alt="Modern architectural cabin with outdoor luxury spa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2">
        <div className="space-y-8 max-w-xl">
          <span className="inline-block tracking-[0.2em] text-xs font-semibold text-primary uppercase border-l-2 border-primary pl-4 py-1">
            KOMERCINIAI SPA SPRENDIMAI
          </span>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.1] text-on-surface">
            Paverskite sodybą pelninga{" "}
            <span className="italic font-normal">365 dienas</span> per metus.
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
            Padidinkite užimtumą ne sezono metu ir pakelkite bazinę nakvynės
            kainą. Ilgaamžiai, intensyviam naudojimui ir minimaliai priežiūrai
            pritaikyti kubilai tiesiai iš gamintojo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#contact"
              className="bg-primary hover:bg-primary-container text-white px-8 py-4 font-bold tracking-wider transition-all text-center uppercase text-sm"
            >
              GAUTI B2B PASIŪLYMĄ
            </a>
            <a
              href="#contact"
              className="border border-outline-variant hover:border-primary px-8 py-4 font-bold tracking-wider transition-all text-center uppercase text-sm"
            >
              15 MIN. KONSULTACIJA
            </a>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="absolute bottom-0 w-full bg-surface-container-low/80 backdrop-blur-sm border-t border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <Icon name="loyalty" className="text-primary text-3xl" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">
              Kiekybinės nuolaidos
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Icon name="location_on" className="text-primary text-3xl" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">
              Gamyba Telšiuose
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Icon name="verified_user" className="text-primary text-3xl" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">
              Komercinė garantija
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Icon name="account_balance" className="text-primary text-3xl" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">
              Išmanus ESTO finansavimas
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
