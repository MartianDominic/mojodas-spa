"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-surface group flex flex-col justify-end">
      {/* Cinematic Noise & Overlay */}
      <div className="absolute inset-0 z-20 bg-noise mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 z-10 mask-gradient-bottom" />
      <div className="absolute inset-0 z-10 bg-black/10 transition-opacity duration-700" />
      
      {/* Background Hero Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activeImage.url}
            alt={activeImage.alt || productName}
            fill
            className="object-cover"
            sizes="100vw"
            priority={activeIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Hero Typography & Badges */}
      <div className="relative z-30 max-w-screen-2xl mx-auto px-8 w-full pb-12 md:pb-16 flex items-end justify-between">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-white drop-shadow-lg"
        >
          {badge && (
            <span className="text-[10px] md:text-xs tracking-[0.2em] font-body uppercase text-white/90 block mb-3 font-semibold shadow-sm">
              {badge}
            </span>
          )}
          <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight !leading-none drop-shadow-xl text-white">
            {productName}
          </h1>
        </motion.div>

        {/* Floating Thumbnails */}
        {images.length > 1 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex gap-2 bg-black/30 backdrop-blur-md p-2 rounded-sm"
          >
            {images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative w-16 h-16 md:w-20 md:h-20 overflow-hidden cursor-pointer transition-all duration-300 ease-out rounded-sm",
                  activeIndex === index
                    ? "opacity-100 ring-2 ring-white scale-100"
                    : "opacity-60 hover:opacity-100 scale-95"
                )}
                aria-label={`Rodyti nuotrauka ${index + 1}`}
              >
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className={cn(
                  "absolute inset-0 border border-white/50 transition-opacity duration-500",
                  activeIndex === index ? "opacity-100" : "opacity-0"
                )} />
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Mobile Thumbnail Strip */}
      {images.length > 1 && (
        <div className="lg:hidden absolute bottom-6 z-30 w-full px-8 flex gap-2">
          {images.slice(0, 4).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "flex-1 h-1 transition-all duration-300",
                activeIndex === index ? "bg-white" : "bg-white/30"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
