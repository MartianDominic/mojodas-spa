import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui";
import { formatPrice } from "@/lib/utils/format";
import { ROUTES } from "@/lib/constants/routes";
import type { ProductListItem } from "@/types";

interface RelatedProductsProps {
  products: ProductListItem[];
  title?: string;
}

export function RelatedProducts({
  products,
  title = "Panasus produktai",
}: RelatedProductsProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="mt-24">
      <h2 className="font-headline text-2xl mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

interface RelatedProductCardProps {
  product: ProductListItem;
}

function RelatedProductCard({ product }: RelatedProductCardProps) {
  const thumbnail = product.thumbnail || product.images[0];

  // Format capacity display
  const capacityDisplay = product.capacity.min === product.capacity.max
    ? `${product.capacity.min} zmones`
    : `${product.capacity.min}-${product.capacity.max} zmones`;

  return (
    <Link
      href={ROUTES.PRODUCT(product.slug)}
      className="group block bg-surface-container-low hover:bg-surface-container transition-colors"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt || product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
            <span className="text-secondary text-sm">
              Nuotrauka neprieinama
            </span>
          </div>
        )}

        {/* Badges */}
        {product.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.badges.slice(0, 1).map((badge, index) => (
              <Badge key={index} variant={badge.variant} size="sm">
                {badge.text}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-headline text-lg font-medium mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-secondary mb-2">{capacityDisplay}</p>
        <p className="text-sm font-medium">Nuo {formatPrice(product.basePrice)}</p>
      </div>
    </Link>
  );
}
