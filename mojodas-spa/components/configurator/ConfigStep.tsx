"use client";

import { cn } from "@/lib/utils/cn";
import { useConfiguratorStore } from "@/stores/configurator";
import type { ConfigOptionGroup, ConfigOption } from "@/types";

interface ConfigStepProps {
  stepNumber: number;
  group: ConfigOptionGroup;
  selectedValue: string | string[] | undefined;
}

export function ConfigStep({ stepNumber, group, selectedValue }: ConfigStepProps) {
  const { setSelection, toggleMultiSelection, selectionNames } = useConfiguratorStore();

  const handleSingleSelect = (option: ConfigOption) => {
    setSelection(group.id, option.id, option.priceModifier, option.name);
  };

  const handleMultiSelect = (option: ConfigOption) => {
    toggleMultiSelection(group.id, option.id, option.priceModifier, option.name);
  };

  const isOptionSelected = (optionId: string): boolean => {
    if (group.type === "single") {
      return selectedValue === optionId;
    }
    return Array.isArray(selectedValue) && selectedValue.includes(optionId);
  };

  // Get current selection display name for single-select groups
  const currentSelectionName = group.type === "single" && selectionNames[group.id]
    ? selectionNames[group.id] as string
    : null;

  // Acrylic Colors (Step 1) - Grid cards with product images
  if (group.id === "acrylicColor") {
    return (
      <section>
        <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-on-surface flex items-center justify-between">
          <span>{stepNumber}. {group.name}</span>
          {currentSelectionName && (
            <span className="text-primary-container normal-case font-normal text-sm">
              Pasirinkta: {currentSelectionName}
            </span>
          )}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {group.options.map((option) => {
            const selected = isOptionSelected(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSingleSelect(option)}
                className={cn(
                  "p-3 text-left flex flex-col group transition-all active:scale-95 border-2 relative overflow-hidden",
                  selected
                    ? "bg-white border-primary-container ring-4 ring-primary-container/5"
                    : "bg-surface-container-high border-transparent hover:border-outline-variant"
                )}
              >
                {/* Product image */}
                <div className="w-full aspect-square mb-3 bg-surface-container rounded overflow-hidden">
                  {option.image ? (
                    <img
                      src={option.image}
                      alt={option.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: option.colorHex || "#e5e5e5" }}
                    />
                  )}
                </div>
                <span className="text-sm font-medium">{option.name}</span>
                {option.priceModifier > 0 && (
                  <span className="text-xs text-primary font-semibold mt-1">+ {option.priceModifier}€</span>
                )}
                {selected && (
                  <span
                    className="material-symbols-outlined absolute top-2 right-2 text-primary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  // Wood Finishes (Step 2) - Row buttons with wood texture images
  if (group.id === "woodFinish") {
    return (
      <section>
        <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-on-surface">
          {stepNumber}. {group.name}
        </h4>
        <div className="space-y-3">
          {group.options.map((option) => {
            const selected = isOptionSelected(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSingleSelect(option)}
                className={cn(
                  "w-full flex items-center justify-between p-4 transition-colors group border-2",
                  selected
                    ? "bg-white border-primary-container ring-2 ring-primary-container/10 shadow-sm"
                    : "bg-surface-container-high border-transparent hover:border-outline-variant"
                )}
              >
                <div className="flex items-center space-x-4">
                  {/* Wood texture image */}
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    {option.image ? (
                      <img
                        src={option.image}
                        alt={option.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: option.colorHex || "#8B7355" }}
                      />
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{option.name}</span>
                    {option.description && (
                      <span className="text-[10px] text-secondary mt-0.5">{option.description}</span>
                    )}
                    {option.badge && (
                      <span className="text-[9px] bg-primary text-white px-1.5 py-0.5 mt-1 tracking-tighter uppercase">
                        {option.badge}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {option.priceModifier > 0 ? (
                    <span className="text-xs text-primary font-semibold">+ {option.priceModifier}€</span>
                  ) : (
                    <span className="text-xs text-secondary italic">Standartas</span>
                  )}
                  {selected && (
                    <span
                      className="material-symbols-outlined text-primary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  // Heating System (Step 3) - Cards with descriptions
  if (group.id === "heatingSystem") {
    return (
      <section>
        <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-on-surface">
          {stepNumber}. {group.name}
        </h4>
        <div className="space-y-4">
          {group.options.map((option) => {
            const selected = isOptionSelected(option.id);
            return (
              <div
                key={option.id}
                onClick={() => handleSingleSelect(option)}
                className={cn(
                  "p-6 cursor-pointer border-2 transition-all relative",
                  selected
                    ? "bg-white border-primary-container"
                    : "bg-surface-container-high border-transparent hover:border-outline-variant"
                )}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-bold">{option.name}</h5>
                    {option.badge && (
                      <span className="inline-block text-[9px] bg-secondary-container text-on-secondary-container px-2 py-0.5 mt-1 tracking-tighter uppercase font-bold">
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {option.priceModifier > 0 ? `+ ${option.priceModifier}€` : "Įskaičiuota"}
                  </span>
                </div>
                <p className={cn(
                  "text-xs leading-relaxed",
                  selected ? "text-on-surface" : "text-secondary"
                )}>
                  {option.description}
                </p>
                {selected && (
                  <span
                    className="material-symbols-outlined absolute top-4 right-4 text-primary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Massage & Lighting (Step 4) - Checkbox rows
  if (group.id === "massage") {
    return (
      <section>
        <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-on-surface">
          {stepNumber}. {group.name}
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {group.options.map((option) => {
            const selected = isOptionSelected(option.id);
            return (
              <label
                key={option.id}
                className="flex items-center p-5 bg-surface-container-high cursor-pointer group hover:bg-surface-container-highest transition-all"
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => handleMultiSelect(option)}
                  className="w-5 h-5 rounded-none border-outline-variant text-primary focus:ring-primary-container mr-4"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{option.name}</span>
                  {option.description && (
                    <span className="text-[10px] text-secondary">{option.description}</span>
                  )}
                </div>
                <span className="ml-auto text-xs font-bold">+ {option.priceModifier}€</span>
              </label>
            );
          })}
        </div>
      </section>
    );
  }

  // Accessories (Step 5) - Grid cards
  if (group.id === "accessories") {
    return (
      <section>
        <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-on-surface">
          {stepNumber}. {group.name}
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {group.options.map((option) => {
            const selected = isOptionSelected(option.id);
            return (
              <div
                key={option.id}
                onClick={() => handleMultiSelect(option)}
                className={cn(
                  "p-5 flex flex-col justify-between aspect-video relative overflow-hidden cursor-pointer transition-colors",
                  selected
                    ? "border-2 border-primary-container bg-white"
                    : "border border-outline-variant bg-surface-container-low group hover:bg-white"
                )}
              >
                <span className="text-xs font-bold leading-tight">{option.name}</span>
                <span className="text-[10px] text-primary font-bold mt-4">+ {option.priceModifier}€</span>
                {selected && (
                  <span
                    className="material-symbols-outlined absolute top-2 right-2 text-primary-container text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Default fallback
  return (
    <section>
      <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-on-surface">
        {stepNumber}. {group.name}
      </h4>
      <p className="text-secondary">No configuration options available.</p>
    </section>
  );
}
