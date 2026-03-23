import { Icon } from "@/components/ui";

const benefits = [
  "Atsakysime į visus techninius klausimus",
  "Aptarsime finansavimo galimybes",
  "Nurodysime realius gamybos terminus",
];

const weekDays = ["P", "A", "T", "K", "P", "Š", "S"];

const calendarDays = [
  { day: 14, available: false },
  { day: 15, available: false },
  { day: 16, available: true },
  { day: 17, available: true },
  { day: 18, available: true, selected: true },
  { day: 19, available: false },
  { day: 20, available: false },
];

export function ConsultationBooking() {
  return (
    <section className="py-32 bg-surface overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            <p className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
              Pavasario gamybos grafikas sparčiai pildosi.
            </p>
            <h2 className="font-headline text-4xl md:text-6xl mb-8 leading-tight">
              Rezervuokite nemokamą 15 minučių pokalbį.
            </h2>
            <p className="font-body text-lg text-on-surface-variant mb-12 max-w-lg">
              Parinksime tinkamiausią modelį jūsų sklypui, aptarsime techninius
              reikalavimus ir pateiksime preliminarų kainos pasiūlymą.
            </p>
            <div className="flex flex-col gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-4 py-4 border-b border-outline-variant/30"
                >
                  <Icon name="check_circle" className="text-primary" />
                  <span className="font-body text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Calendar */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="bg-surface-container-high p-8 md:p-12 shadow-sm relative">
              <div className="mb-8">
                <h4 className="font-headline text-xl mb-2">
                  Pasirinkite dieną ir laiką
                </h4>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                  Trukmė: 15 minučių
                </p>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-8">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-[10px] text-center font-bold text-on-surface-variant/50 uppercase"
                  >
                    {day}
                  </div>
                ))}
                {calendarDays.map((item) => (
                  <div
                    key={item.day}
                    className={`h-10 flex items-center justify-center ${
                      item.selected
                        ? "bg-primary-container text-white cursor-pointer font-bold"
                        : item.available
                          ? "bg-white border border-primary/20 cursor-pointer hover:bg-primary-container hover:text-white transition-colors"
                          : "text-on-surface-variant/20"
                    }`}
                  >
                    {item.day}
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              <div className="flex flex-col gap-3">
                {["09:00", "10:30", "14:00"].map((time) => (
                  <button
                    key={time}
                    className="w-full py-4 border border-primary/30 text-xs font-bold tracking-widest hover:bg-white transition-colors"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
