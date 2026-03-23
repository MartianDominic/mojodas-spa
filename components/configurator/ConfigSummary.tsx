"use client";

import { useConfiguratorStore } from "@/stores/configurator";
import { allConfigOptions, configSteps } from "@/lib/data/config-options";
import { formatPrice } from "@/lib/utils/format";
import type { Product } from "@/types";

interface ConfigSummaryProps {
  product: Product;
}

export function ConfigSummary({ product }: ConfigSummaryProps) {
  const { selections, priceModifiers, selectionNames, getTotalPrice } = useConfiguratorStore();
  const totalPrice = getTotalPrice();

  return (
    <div className="bg-surface-container-low p-8 space-y-6">
      <h3 className="font-headline text-xl font-medium mb-6">Konfigūracijos suvestinė</h3>

      <div className="space-y-4">
        {configSteps.map((step) => {
          const group = allConfigOptions[step.groupId];
          const selectedNames = selectionNames[step.groupId];
          const modifier = priceModifiers[step.groupId] || 0;

          if (!group || !selectedNames) return null;

          const displayNames = Array.isArray(selectedNames)
            ? selectedNames.join(", ")
            : selectedNames;

          if (!displayNames) return null;

          return (
            <div key={step.id} className="flex justify-between items-start py-3 border-b border-outline-variant/30">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-secondary mb-1">
                  {step.title}
                </p>
                <p className="text-sm font-medium">{displayNames}</p>
              </div>
              <span className="text-sm font-semibold text-primary">
                {modifier > 0 ? `+ ${formatPrice(modifier)}` : "Įskaičiuota"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-outline-variant">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-secondary mb-1">
              Bazinė kaina
            </p>
            <p className="text-sm">{product.name}</p>
          </div>
          <span className="text-sm font-medium">{formatPrice(product.basePrice)}</span>
        </div>
      </div>

      <div className="pt-4 border-t-2 border-primary-container">
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase tracking-widest font-bold">Iš viso</span>
          <span className="text-2xl font-headline font-light">{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}
