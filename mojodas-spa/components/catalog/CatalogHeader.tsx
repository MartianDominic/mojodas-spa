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
    <header className={cn("px-8 md:px-16 mb-16 max-w-screen-2xl mx-auto", className)}>
      <h1 className="font-headline text-7xl md:text-9xl font-black tracking-tighter text-on-surface mb-8">
        Kolekcija.
      </h1>
      <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed">
        Lietuvoje gaminami premium klases modeliai. Atraskite savo erdvei tobulai tinkanti dizaina ir talpa.
      </p>
    </header>
  );
}
