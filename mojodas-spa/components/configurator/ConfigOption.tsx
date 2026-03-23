"use client";

import { cn } from "@/lib/utils/cn";
import { Icon } from "@/components/ui";
import type { ConfigOption as ConfigOptionType } from "@/types";

interface ConfigOptionProps {
  option: ConfigOptionType;
  isSelected: boolean;
  type: "single" | "multiple";
  variant?: "card" | "row" | "grid";
  onSelect: () => void;
}

export function ConfigOption({
  option,
  isSelected,
  type,
  variant = "row",
  onSelect,
}: ConfigOptionProps) {
  // Card variant (for acrylic colors - square cards)
  if (variant === "card") {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "p-4 text-left flex flex-col justify-between aspect-square group transition-all active:scale-95 border-2",
          isSelected
            ? "bg-white border-primary-container ring-4 ring-primary-container/5"
            : "bg-surface-container-high border-transparent hover:bg-surface-container-highest"
        )}
      >
        {/* Color swatch */}
        <div
          className={cn(
            "w-8 h-8 rounded-full border border-outline-variant shadow-inner bg-cover bg-center"
          )}
          style={{
            backgroundColor: option.colorHex,
            backgroundImage: option.colorSwatch
              ? `url('${option.colorSwatch}')`
              : undefined,
          }}
        />
        <span className="text-sm font-medium">{option.name}</span>
        {isSelected && (
          <Icon
            name="check_circle"
            filled
            className="absolute top-4 right-4 text-primary-container"
          />
        )}
      </button>
    );
  }

  // Grid variant (for accessories - smaller cards)
  if (variant === "grid") {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "p-5 flex flex-col justify-between aspect-video relative overflow-hidden group cursor-pointer transition-colors",
          isSelected
            ? "border-2 border-primary-container bg-white"
            : "border border-outline-variant bg-surface-container-low hover:bg-white"
        )}
      >
        <span className="text-xs font-bold leading-tight">{option.name}</span>
        <span className="text-[10px] text-primary font-bold mt-4">
          {option.priceModifier > 0 ? `+ ${option.priceModifier}€` : "Įskaičiuota"}
        </span>
        {isSelected && (
          <Icon
            name="check_circle"
            filled
            size="sm"
            className="absolute top-2 right-2 text-primary-container"
          />
        )}
      </button>
    );
  }

  // Row variant (for wood finishes and heating)
  if (type === "single") {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "w-full flex items-center justify-between p-5 transition-colors group relative",
          isSelected
            ? "bg-white ring-1 ring-primary-container shadow-sm"
            : "bg-surface-container-high hover:bg-surface-container-highest"
        )}
      >
        <div className="flex items-center space-x-4">
          {option.colorHex && (
            <div
              className="w-12 h-12"
              style={{ backgroundColor: option.colorHex }}
            />
          )}
          <div className="flex flex-col items-start">
            <span className="font-medium">{option.name}</span>
            {option.badge && (
              <span className="text-[9px] bg-primary text-white px-1.5 py-0.5 mt-1 tracking-tighter uppercase">
                {option.badge}
              </span>
            )}
          </div>
        </div>
        <span
          className={cn(
            "text-xs font-semibold",
            option.priceModifier > 0 ? "text-primary" : "text-secondary italic"
          )}
        >
          {option.priceModifier > 0
            ? `+ ${option.priceModifier}€`
            : option.badge || "Standartas"}
        </span>
      </button>
    );
  }

  // Checkbox row variant (for multi-select like massage)
  return (
    <label
      className={cn(
        "flex items-center p-5 cursor-pointer group transition-all",
        isSelected
          ? "bg-surface-container-highest"
          : "bg-surface-container-high hover:bg-surface-container-highest"
      )}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelect}
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
}
