"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
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

  // Acrylic Colors (Step 1)
  if (group.id === "acrylicColor") {
    return (
      <section className="mb-12">
        <h4 className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 gap-2">
          <span className="font-headline text-xl tracking-tight font-medium">{stepNumber}. {group.name}</span>
          {currentSelectionName && (
            <span className="text-secondary text-xs uppercase tracking-[0.15em] font-medium">
              {currentSelectionName}
            </span>
          )}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {group.options.map((option) => {
            const selected = isOptionSelected(option.id);
            return (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSingleSelect(option)}
                className={cn(
                  "p-3 flex flex-col items-start transition-colors duration-200 relative overflow-hidden group border rounded-sm",
                  selected
                    ? "bg-surface border-primary ring-1 ring-primary shadow-sm"
                    : "bg-surface-container-low border-outline-variant hover:border-outline"
                )}
              >
                <div className="w-full aspect-[4/3] mb-4 rounded bg-surface-container-high relative flex-shrink-0">
                  {option.image ? (
                    <img src={option.image} alt={option.name} className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="w-full h-full rounded" style={{ backgroundColor: option.colorHex || "#e5e5e5" }} />
                  )}
                </div>
                <div className="flex flex-col w-full text-left">
                  <span className="font-medium text-sm sm:text-base leading-tight mb-1">{option.name}</span>
                  <span className={cn("text-xs font-semibold", selected ? "text-primary" : "text-secondary")}>
                    {option.priceModifier > 0 ? `+ ${option.priceModifier} €` : "Standartas"}
                  </span>
                </div>
                {selected && (
                  <motion.div layoutId={`check-${group.id}`} className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white shadow-sm">
                    <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>
    );
  }

  // Wood Finishes (Step 2)
  if (group.id === "woodFinish") {
    return (
      <section className="mb-12">
        <h4 className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 gap-2">
          <span className="font-headline text-xl tracking-tight font-medium">{stepNumber}. {group.name}</span>
          {currentSelectionName && (
            <span className="text-secondary text-xs uppercase tracking-[0.15em] font-medium">
              {currentSelectionName}
            </span>
          )}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {group.options.map((option) => {
            const selected = isOptionSelected(option.id);
            return (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSingleSelect(option)}
                className={cn(
                  "w-full flex items-center justify-between p-4 transition-colors duration-200 group border rounded-sm text-left",
                  selected
                    ? "bg-surface border-primary ring-1 ring-primary shadow-sm"
                    : "bg-surface-container-low border-outline-variant hover:border-outline"
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded overflow-hidden flex-shrink-0 border border-outline-variant">
                    {option.image ? (
                      <img src={option.image} alt={option.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full" style={{ backgroundColor: option.colorHex || "#8B7355" }} />
                    )}
                  </div>
                  <div className="flex flex-col pr-2">
                    <span className="font-medium text-sm sm:text-base leading-tight mb-0.5">{option.name}</span>
                    <span className="text-xs uppercase tracking-widest text-secondary mb-1">
                      {option.priceModifier > 0 ? `+ ${option.priceModifier} €` : "Standartas"}
                    </span>
                    {option.description && (
                      <span className="text-xs text-secondary line-clamp-1">
                        {option.description}
                      </span>
                    )}
                  </div>
                </div>
                {selected && (
                  <motion.div layoutId={`check-${group.id}`} className="w-5 h-5 rounded-full bg-primary flex flex-shrink-0 items-center justify-center text-white ml-2">
                    <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>
    );
  }

  // Heating System (Step 3)
  if (group.id === "heatingSystem") {
    return (
      <section className="mb-12">
        <h4 className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 gap-2">
          <span className="font-headline text-xl tracking-tight font-medium">{stepNumber}. {group.name}</span>
          {currentSelectionName && (
            <span className="text-secondary text-xs uppercase tracking-[0.15em] font-medium">
              {currentSelectionName}
            </span>
          )}
        </h4>
        <div className="flex flex-col gap-3">
          {group.options.map((option) => {
            const selected = isOptionSelected(option.id);
            return (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSingleSelect(option)}
                className={cn(
                  "p-5 text-left border rounded-sm transition-colors duration-200 relative group",
                  selected
                    ? "bg-surface border-primary ring-1 ring-primary shadow-sm"
                    : "bg-surface-container-low border-outline-variant hover:border-outline"
                )}
              >
                <div className="flex justify-between items-start mb-2 relative z-10 pr-8">
                  <h5 className="font-medium text-base">{option.name}</h5>
                  <span className="text-xs uppercase tracking-widest font-semibold text-secondary ml-4 flex-shrink-0">
                    {option.priceModifier > 0 ? `+ ${option.priceModifier} €` : "Įskaičiuota"}
                  </span>
                </div>
                <p className={cn(
                  "text-xs leading-relaxed max-w-xl relative z-10 pr-8",
                  selected ? "text-on-surface" : "text-secondary"
                )}>
                  {option.description}
                </p>
                {selected && (
                  <motion.div layoutId={`check-${group.id}`} className="absolute top-5 right-5 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white z-20">
                    <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>
    );
  }

  // Massage & Lighting (Step 4)
  if (group.id === "massage") {
    return (
      <section className="mb-12">
        <h4 className="font-headline text-xl tracking-tight mb-6 font-medium text-on-surface">
          {stepNumber}. {group.name}
        </h4>
        <div className="flex flex-col gap-2">
          {group.options.map((option) => {
            const selected = isOptionSelected(option.id);
            return (
              <motion.label
                key={option.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  "flex items-center p-4 cursor-pointer group transition-colors duration-200 border rounded-sm",
                  selected
                    ? "bg-surface border-primary shadow-sm"
                    : "bg-surface-container-low border-outline-variant hover:border-outline"
                )}
              >
                <div className={cn(
                  "w-5 h-5 mr-4 border rounded-sm flex flex-shrink-0 items-center justify-center transition-colors",
                  selected ? "bg-primary border-primary" : "border-outline-variant bg-white"
                )}>
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => handleMultiSelect(option)}
                    className="sr-only"
                  />
                  {selected && <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>}
                </div>
                <div className="flex flex-col pr-4">
                  <span className="font-medium text-sm sm:text-base">{option.name}</span>
                  {option.description && (
                    <span className="text-xs text-secondary mt-0.5">{option.description}</span>
                  )}
                </div>
                <span className="ml-auto text-xs font-semibold tracking-widest uppercase text-primary whitespace-nowrap">
                  + {option.priceModifier} €
                </span>
              </motion.label>
            );
          })}
        </div>
      </section>
    );
  }

  // Accessories (Step 5)
  if (group.id === "accessories") {
    return (
      <section className="mb-12">
        <h4 className="font-headline text-xl tracking-tight mb-6 font-medium text-on-surface">
          {stepNumber}. {group.name}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {group.options.map((option) => {
            const selected = isOptionSelected(option.id);
            return (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMultiSelect(option)}
                className={cn(
                  "p-4 flex flex-col justify-between aspect-video sm:aspect-auto sm:h-32 relative overflow-hidden cursor-pointer transition-colors duration-200 border rounded-sm",
                  selected
                    ? "bg-surface border-primary ring-1 ring-primary shadow-sm"
                    : "bg-surface-container-low border-outline-variant hover:border-outline"
                )}
              >
                <span className="font-medium text-sm sm:text-base max-w-[85%] leading-tight">
                  {option.name}
                </span>
                <span className="text-xs font-semibold tracking-widest uppercase text-primary mt-3 sm:mt-auto">
                  + {option.priceModifier} €
                </span>
                {selected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                  </div>
                )}
              </motion.div>
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
