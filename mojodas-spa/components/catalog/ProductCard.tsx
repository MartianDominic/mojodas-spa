"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui";
import { ROUTES } from "@/lib/constants/routes";
import type { ProductListItem } from "@/types";

interface ProductCardProps {
  product: ProductListItem;
  className?: string;
}

/**
 * Editorial product card with 4:5 aspect ratio
 * Matches stitch design: rounded-[2rem], hover lift effect, gradient overlay
 */
export function ProductCard({ product, className }: ProductCardProps) {
  const primaryImage = product.images[0];

  // Get the feature badge label (variant or heater type)
  const featureLabel = getFeatureLabel(product);

  // Map shape to Lithuanian label
  const shapeLabel = getShapeLabel(product.shape);

  // Format price with Lithuanian spacing
  const formattedPrice = formatPrice(product.basePrice);

  // Format capacity display
  const capacityDisplay = getCapacityDisplay(product.capacity);

  return (
    <article
      className={cn(
        "group relative aspect-[4/5] rounded-[2rem] overflow-hidden",
        "bg-surface-container-low editorial-shadow",
        "transition-transform duration-700 hover:-translate-y-2",
        "max-w-md mx-auto w-full", // Prevent gigantic cards on large screens
        className
      )}
    >
      {/* Product Image */}
      {primaryImage && (
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt || product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute inset-0 object-cover transition-transform duration-1000 group-hover:scale-105"
          priority={false}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Top Left Badge - Feature (variant or heater type) */}
      <div className="absolute top-8 left-8">
        <span className="text-white text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 backdrop-blur-md bg-white/10 rounded-lg">
          {featureLabel}
        </span>
      </div>

      {/* Top Right Badge - Shape */}
      <div className="absolute top-8 right-8">
        <span className="bg-[#1A1A1A] text-white text-xs font-black tracking-widest uppercase px-5 py-2 rounded-full">
          {shapeLabel}
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute inset-x-8 bottom-8">
        {/* Product Name */}
        <h3 className="font-headline text-4xl text-white font-bold mb-2 tracking-tight">
          {product.name}
        </h3>

        {/* Capacity Info */}
        <p className="text-white/80 text-sm mb-6">{capacityDisplay}</p>

        {/* Price and CTA Container */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4 p-5 rounded-[1.5rem] bg-white/10 backdrop-blur-xl border border-white/10">
          {/* Price */}
          <div className="text-left">
            <p className="text-white font-black text-lg leading-none">
              Nuo {formattedPrice}
            </p>
          </div>

          {/* Configure Button */}
          <Link
            href={ROUTES.CONFIGURATOR(product.slug)}
            className="w-full xl:w-auto"
          >
            <Button
              variant="dark"
              size="sm"
              className="w-full xl:w-auto px-6 py-3 text-xs font-black tracking-[0.2em] rounded-xl"
            >
              KONFIGURUOTI
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * Get feature label - prioritize special variants over heater type
 * Matches stitch design where "HORIZON" is shown for horizon variants
 */
function getFeatureLabel(product: ProductListItem): string {
  // Special variants take precedence
  if (product.variant === "horizon") {
    return "HORIZON";
  }

  // For therapeutic products, show TERAPINIS
  if (product.shape === "therapeutic") {
    return "TERAPINIS";
  }

  // Otherwise show heater type
  const heaterLabels: Record<ProductListItem["heaterType"], string> = {
    internal: "INTEGRUOTA KROSNELĖ",
    external: "IŠORINĖ KROSNELĖ",
    electric: "ELEKTRINIS ŠILDYMAS",
    none: "TERAPINIS",
  };
  return heaterLabels[product.heaterType];
}

/**
 * Map shape to Lithuanian display label
 */
function getShapeLabel(shape: ProductListItem["shape"]): string {
  const labels: Record<ProductListItem["shape"], string> = {
    round: "APVALUS",
    square: "KVADRATINIS",
    therapeutic: "TERAPINIS",
  };
  return labels[shape];
}

/**
 * Format price with Lithuanian spacing (1 990 EUR format)
 */
function formatPrice(price: number): string {
  const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formatted} \u20AC`;
}

/**
 * Get capacity display string
 */
function getCapacityDisplay(capacity: {
  min: number;
  max: number;
}): string {
  if (capacity.min === capacity.max) {
    return `${capacity.min} asmenims`;
  }
  return `${capacity.min}-${capacity.max} asmenims`;
}
