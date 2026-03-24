import { cn } from "@/lib/utils/cn";

interface CatalogHeaderProps {
  className?: string;
}

/**
 * Catalog page header matching stitch design
 * Large headline with descriptive subtitle
 */
export function CatalogHeader({ className }: CatalogHeaderProps) {
  return (
    <header className={cn("px-6 md:px-8 mb-8 md:mb-12 w-full min-w-0", className)}>
      <div className="w-full min-w-0 max-w-screen-2xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-on-surface mb-4 md:mb-6 break-words">
          Kolekcija.
        </h1>
        <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed max-w-xl break-words">
          Lietuvoje gaminami premium klases modeliai. Atraskite savo erdvei tobulai tinkanti dizaina ir talpa.
        </p>
      </div>
    </header>
  );
}
