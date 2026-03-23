import Image from "next/image";
import { Icon } from "@/components/ui";

export function B2BCalendly() {
  return (
    <div className="bg-surface-container-high p-6 md:p-8 lg:p-12 flex flex-col justify-center items-center text-center space-y-8 relative overflow-hidden h-full">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5 grayscale">
        <Image
          src="/images/b2b/calendly-bg.jpg"
          alt="Engineering planning"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Icon name="calendar_month" className="text-primary text-4xl md:text-5xl lg:text-6xl mb-6" />
        <h3 className="font-display text-3xl mb-4">
          Techninė konsultacija su inžinieriumi
        </h3>
        <p className="text-on-surface-variant mb-8 leading-relaxed">
          Aptarkime techninius niuansus, pamatus ir pajungimo galimybes jūsų
          sklype video skambučio metu.
        </p>

        {/* Calendar Placeholder */}
        <div className="w-full bg-surface-container aspect-square border border-outline-variant/30 flex flex-col items-center justify-center p-8">
          <div className="w-full space-y-4 opacity-40">
            <div className="h-4 bg-outline-variant/20 rounded w-1/3 mx-auto" />
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-8 rounded ${
                    i === 4 ? "bg-primary/20" : "bg-outline-variant/10"
                  }`}
                />
              ))}
            </div>
            <div className="h-24 bg-outline-variant/5 rounded w-full" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase mt-6 opacity-60">
            [ GHL CALENDAR EMBED ]
          </span>
        </div>
      </div>
    </div>
  );
}
