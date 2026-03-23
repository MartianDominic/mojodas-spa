"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types";

interface ProductImageGalleryProps {
  product: Product;
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = product.images || [];
  const selectedImage = images[selectedImageIndex];

  return (
    <div className="lg:sticky lg:top-32 space-y-8">
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low group">
        {selectedImage && (
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        )}
        <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 text-xs tracking-widest uppercase text-white font-medium">
          {`${product.name} Edition`}
        </div>
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={cn(
                "aspect-square bg-surface-container-high overflow-hidden cursor-pointer transition-all",
                selectedImageIndex === index
                  ? "ring-1 ring-primary"
                  : "opacity-80 hover:opacity-100"
              )}
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Technical Specs */}
      <div className="bg-surface-container-low p-12 mt-12">
        <h3 className="font-headline text-2xl mb-8">Techninė Specifikacija</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-secondary mb-1">Talpa</p>
            <p className="font-medium text-on-surface">
              {product.specs.capacity.min}-{product.specs.capacity.max} Žmonės
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-secondary mb-1">Svoris</p>
            <p className="font-medium text-on-surface">{product.specs.weight}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-secondary mb-1">
              Diametras (Išorinis)
            </p>
            <p className="font-medium text-on-surface">
              {product.specs.dimensions.external} {product.specs.dimensions.unit}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-secondary mb-1">
              Diametras (Vidinis)
            </p>
            <p className="font-medium text-on-surface">
              {product.specs.dimensions.internal} {product.specs.dimensions.unit}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-secondary mb-1">Aukštis</p>
            <p className="font-medium text-on-surface">
              {product.specs.dimensions.height} {product.specs.dimensions.unit}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-secondary mb-1">
              Vandens tūris
            </p>
            <p className="font-medium text-on-surface">{product.specs.waterCapacity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
