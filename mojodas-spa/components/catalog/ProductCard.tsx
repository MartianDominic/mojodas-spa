"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
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
        "group relative aspect-[4/5] overflow-hidden rounded-sm",
        "bg-surface",
        "transition-transform duration-700 hover:-translate-y-1 hover:shadow-2xl",
        "w-full", // Fill grid cell width
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-50 pointer-events-none" />

      {/* Top Left Badge - Feature (variant or heater type) */}
      <div className="absolute top-6 left-6 z-10">
        <span className="text-white text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1.5 backdrop-blur-md bg-black/40 border border-white/10 rounded-sm">
          {featureLabel}
        </span>
      </div>

      {/* Top Right Badge - Shape */}
      <div className="absolute top-6 right-6 z-10">
        <span className="bg-on-surface text-surface text-[10px] sm:text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-sm">
          {shapeLabel}
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute inset-x-6 bottom-6 z-10 flex flex-col justify-end">
        {/* Product Name */}
        <h3 className="font-headline text-3xl sm:text-4xl text-white font-medium mb-1 tracking-tight drop-shadow-md">
          {product.name}
        </h3>

        {/* Capacity Info */}
        <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-widest font-medium mb-5">{capacityDisplay}</p>

        {/* Price and CTA Container */}
        <div className="flex items-center justify-between border-t border-white/20 pt-4">
          {/* Price */}
          <div className="text-left flex flex-col">
            <span className="text-[10px] text-white/60 uppercase tracking-widest font-semibold mb-0.5">Investicija</span>
            <span className="text-white font-medium text-lg lg:text-xl leading-none tracking-wide">
              {formattedPrice}
            </span>
          </div>

          {/* Configure Button */}
          <Link href={ROUTES.CONFIGURATOR(product.slug)}>
            <button className="bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/20 px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase transition-all rounded-sm flex items-center group/btn">
              Konfigūruoti
              <span className="material-symbols-outlined ml-2 text-sm group-hover/btn:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
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
