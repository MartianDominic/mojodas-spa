"use client";

import { useEffect } from "react";
import { ConfigStep } from "./ConfigStep";
import { useConfiguratorStore } from "@/stores/configurator";
import { allConfigOptions, configSteps, getDefaultSelections } from "@/lib/data/config-options";
import type { Product } from "@/types";

interface ConfiguratorFormProps {
  product: Product;
}

export function ConfiguratorForm({ product }: ConfiguratorFormProps) {
  const {
    setProduct,
    selections,
    priceModifiers,
    selectionNames,
  } = useConfiguratorStore();

  // Initialize configurator with product and default selections
  useEffect(() => {
    const defaults = getDefaultSelections();

    // Set the product first
    useConfiguratorStore.setState({
      productId: product.id,
      productName: product.name,
      basePrice: product.basePrice,
      currentStep: 1,
      selections: defaults.selections,
      priceModifiers: defaults.priceModifiers,
      selectionNames: defaults.selectionNames,
    });
  }, [product.id, product.name, product.basePrice]);

  return (
    <div className="space-y-16">
      {/* Product Header */}
      <header>
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-secondary mb-4">
          <span>Kolekcijos</span>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-primary font-semibold">{product.name}</span>
        </nav>
        <h1 className="font-headline text-5xl font-light tracking-tight leading-none mb-4 italic">
          {product.name}
        </h1>
        <p className="text-secondary leading-relaxed">
          {product.shortDescription}
        </p>
      </header>

      {/* Configuration Steps */}
      {configSteps.map((step) => {
        const group = allConfigOptions[step.groupId];
        if (!group) return null;

        return (
          <ConfigStep
            key={step.id}
            stepNumber={step.id}
            group={group}
            selectedValue={selections[step.groupId]}
          />
        );
      })}
    </div>
  );
}
