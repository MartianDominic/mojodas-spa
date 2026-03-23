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
    <header className={cn("px-8 md:px-16 mb-16 w-full", className)}>
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="font-headline text-7xl md:text-9xl font-black tracking-tighter text-on-surface mb-8">
          Kolekcija.
        </h1>
        <p className="font-body text-xl md:text-2xl text-on-surface-variant leading-relaxed" style={{ maxWidth: '42rem' }}>
          Lietuvoje gaminami premium klases modeliai. Atraskite savo erdvei tobulai tinkanti dizaina ir talpa.
        </p>
      </div>
    </header>
  );
}
