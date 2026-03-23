"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import {
  ConfiguratorForm,
  ProductImageGallery,
  StickyPriceBar,
} from "@/components/configurator";
import { getProductBySlug } from "@/lib/data/products";

interface ConfiguratorPageProps {
  params: Promise<{ slug: string }>;
}

export default function ConfiguratorPage({ params }: ConfiguratorPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <main className="pt-24 pb-32">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Column: Sticky Product Imagery */}
            <div className="lg:col-span-7 xl:col-span-8">
              <ProductImageGallery product={product} />
            </div>

            {/* Right Column: Interactive Configurator */}
            <div className="lg:col-span-5 xl:col-span-4">
              <ConfiguratorForm product={product} />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <StickyPriceBar product={product} />
    </>
  );
}
