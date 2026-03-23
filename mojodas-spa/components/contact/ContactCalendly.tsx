import Image from "next/image";
import { Icon } from "@/components/ui";

export function ContactCalendly() {
  return (
    <div className="bg-surface-container-high p-12 flex flex-col justify-center items-center text-center space-y-8 relative overflow-hidden h-full">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5 grayscale">
        <Image
          src="/images/b2b/calendly-bg.jpg"
          alt="Customer consultation"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Icon name="calendar_month" className="text-primary text-6xl mb-6" />
        <h3 className="font-display text-3xl mb-4">
          Užsiregistruokite konsultacijai
        </h3>
        <p className="text-on-surface-variant mb-8 leading-relaxed">
          Pasirinkite jums patogų laiką ir aptarkime jūsų poreikius bei
          galimybes tiesiogiai per video skambutį.
        </p>

        {/* Calendly Placeholder */}
        <div className="w-full bg-surface-container aspect-square border border-outline-variant/30 flex flex-col items-center justify-center p-8">
          <div className="w-full space-y-4 opacity-40">
            <div className="h-4 bg-outline-variant/20 rounded w-1/3 mx-auto" />
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-8 rounded ${
                    i === 3 ? "bg-primary/20" : "bg-outline-variant/10"
                  }`}
                />
              ))}
            </div>
            <div className="h-24 bg-outline-variant/5 rounded w-full" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase mt-6 opacity-60">
            [ CALENDLY / GHL CALENDAR EMBED ]
          </span>
        </div>

        <div className="mt-8 text-left space-y-3">
          <div className="flex items-start gap-3">
            <Icon name="check_circle" className="text-primary text-xl flex-shrink-0 mt-0.5" />
            <p className="text-sm text-on-surface-variant">
              Nemokama 30 min. konsultacija
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="check_circle" className="text-primary text-xl flex-shrink-0 mt-0.5" />
            <p className="text-sm text-on-surface-variant">
              Individuali kainodara pagal poreikius
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="check_circle" className="text-primary text-xl flex-shrink-0 mt-0.5" />
            <p className="text-sm text-on-surface-variant">
              Techniniai patarimai ir rekomendacijos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
