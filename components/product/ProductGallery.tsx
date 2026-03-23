"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  badge?: string;
}

export function ProductGallery({
  images,
  productName,
  badge,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-[4/3] w-full bg-surface-container-low flex items-center justify-center">
        <span className="text-secondary">Nuotrauka neprieinama</span>
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div className="space-y-8">
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low group">
        <Image
          src={activeImage.url}
          alt={activeImage.alt || productName}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
          priority={activeIndex === 0}
        />
        {badge && (
          <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 text-xs tracking-widest uppercase text-white font-medium">
            {badge}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "aspect-square bg-surface-container-high overflow-hidden cursor-pointer transition-all",
                activeIndex === index
                  ? "ring-1 ring-primary opacity-100"
                  : "opacity-80 hover:opacity-100"
              )}
              aria-label={`Rodyti nuotrauka ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} - nuotrauka ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
