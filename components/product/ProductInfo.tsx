import Link from "next/link";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { Icon } from "@/components/ui";
import { formatPrice, formatMonthlyPayment } from "@/lib/utils/format";
import { ROUTES } from "@/lib/constants/routes";
import type { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const collectionLabel = getCollectionLabel(product.collection);

  // Format capacity display
  const capacityDisplay = product.capacity.min === product.capacity.max
    ? `${product.capacity.min} zmones`
    : `${product.capacity.min}-${product.capacity.max} zmones`;

  // Format heater display from specs if available
  const heaterDisplay = product.specs.heater
    ? `${product.specs.heater.type} (${product.specs.heater.power})`
    : getHeaterLabel(product.heaterType);

  return (
    <div className="space-y-16">
      {/* Header */}
      <header>
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest text-secondary mb-4">
          <Link
            href={ROUTES.CATALOG}
            className="hover:text-primary transition-colors"
          >
            Katalogas
          </Link>
          <Icon name="chevron_right" size="sm" />
          <span className="text-primary font-semibold">{product.name}</span>
        </nav>

        {/* Product Name */}
        <h1 className="font-headline text-5xl font-light tracking-tight leading-none mb-4 italic">
          {product.name}
        </h1>

        {/* Tagline - use shortDescription for more detail */}
        <p className="text-secondary leading-relaxed">
          {product.shortDescription || product.tagline}
        </p>

        {/* Badges */}
        {product.badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {product.badges.map((badge, index) => (
              <Badge key={index} variant={badge.variant}>
                {badge.text}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* Price Section */}
      <section className="space-y-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-secondary font-semibold block mb-1">
            Bazine kaina nuo
          </span>
          <span className="text-4xl font-light font-headline tracking-tight text-on-surface">
            {formatPrice(product.basePrice)}
          </span>
        </div>

        {product.monthlyPayment && (
          <div className="flex items-center space-x-2 text-sm text-secondary">
            <Icon name="payments" size="sm" />
            <span>
              Lizingas nuo{" "}
              <span className="font-semibold text-on-surface">
                {formatMonthlyPayment(product.basePrice)}
              </span>
            </span>
          </div>
        )}
      </section>

      {/* Quick Specs */}
      <section className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-surface-container-low">
          <span className="text-xs uppercase tracking-widest text-secondary block mb-1">
            Talpa
          </span>
          <span className="font-medium">{capacityDisplay}</span>
        </div>
        <div className="p-4 bg-surface-container-low">
          <span className="text-xs uppercase tracking-widest text-secondary block mb-1">
            Forma
          </span>
          <span className="font-medium">{getShapeLabel(product.shape)}</span>
        </div>
        <div className="p-4 bg-surface-container-low">
          <span className="text-xs uppercase tracking-widest text-secondary block mb-1">
            Kolekcija
          </span>
          <span className="font-medium">{collectionLabel}</span>
        </div>
        <div className="p-4 bg-surface-container-low">
          <span className="text-xs uppercase tracking-widest text-secondary block mb-1">
            Krosnele
          </span>
          <span className="font-medium">{heaterDisplay}</span>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="space-y-4">
        <Link href={ROUTES.CONFIGURATOR(product.slug)} className="block">
          <Button size="lg" className="w-full group">
            Konfiguruoti
            <Icon
              name="double_arrow"
              size="sm"
              className="ml-4 group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </Link>

        <Button variant="outline" size="lg" className="w-full">
          <Icon name="calendar_month" size="sm" className="mr-2" />
          Uzsisakyti konsultacija
        </Button>
      </section>

      {/* Trust Badges */}
      <section className="flex items-center justify-center gap-8 pt-8 border-t border-outline-variant/20">
        <div className="flex items-center gap-2 text-xs text-secondary">
          <Icon name="verified_user" size="sm" className="text-primary" />
          <span>5 metu garantija</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-secondary">
          <Icon name="local_shipping" size="sm" className="text-primary" />
          <span>Pristatymas visoje Lietuvoje</span>
        </div>
      </section>
    </div>
  );
}

function getCollectionLabel(collection: string): string {
  const labels: Record<string, string> = {
    monaco: "Monaco",
    "classic-round": "Classic Round",
    "grande-round": "Grande Round",
    paris: "Paris",
    andorra: "Andorra",
    cuba: "Cuba",
    macau: "Macau",
    arctic: "Arctic",
    ofuro: "Ofuro",
  };
  return labels[collection] || collection;
}

function getShapeLabel(shape: string): string {
  const labels: Record<string, string> = {
    round: "Apvalus",
    square: "Kvadratinis",
    therapeutic: "Terapinis",
  };
  return labels[shape] || shape;
}

function getHeaterLabel(heaterType: string): string {
  const labels: Record<string, string> = {
    internal: "Vidine krosnele",
    external: "Isorine krosnele",
    electric: "Elektrinis sildytuvas",
    none: "Be sildytuvo",
  };
  return labels[heaterType] || heaterType;
}
