const badges = [
  {
    icon: "flag",
    label: "PAGAMINTA LIETUVOJE",
  },
  {
    icon: "shield",
    label: "AISI 316 PLIENAS",
  },
  {
    icon: "verified",
    label: "5 METŲ GARANTIJA",
  },
  {
    icon: "payments",
    label: "IŠMANUS MOKĖJIMAS DALIMIS",
  },
];

export function TrustStrip() {
  return (
    <div className="w-full bg-black py-8 md:py-10 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Desktop: Horizontal Layout */}
        <div className="hidden md:flex justify-between items-center gap-8">
          {badges.map((badge, index) => (
            <div key={badge.label} className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl text-white/80">
                  {badge.icon}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/90 whitespace-nowrap">
                  {badge.label}
                </span>
              </div>
              {index < badges.length - 1 && (
                <div className="w-px h-4 bg-white/20" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: 2x2 Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:hidden">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl text-white/80 shrink-0">
                {badge.icon}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/90 leading-tight">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
