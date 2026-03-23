"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  disabled?: boolean;
  error?: string;
  legend?: string;
  layout?: "vertical" | "horizontal";
  className?: string;
}

const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onChange,
      name,
      disabled = false,
      error,
      legend,
      layout = "vertical",
      className,
    },
    ref
  ) => {
    const handleChange = (optionValue: string) => {
      if (!disabled && onChange) {
        onChange(optionValue);
      }
    };

    return (
      <fieldset
        ref={ref}
        className={cn("relative group", className)}
        disabled={disabled}
      >
        {legend && (
          <legend
            className={cn(
              "text-sm font-medium text-on-surface-variant mb-3",
              error && "text-error",
              disabled && "opacity-50"
            )}
          >
            {legend}
          </legend>
        )}
        <div
          className={cn(
            "flex gap-3",
            layout === "vertical" ? "flex-col" : "flex-row flex-wrap"
          )}
          role="radiogroup"
          aria-labelledby={legend ? `${name}-legend` : undefined}
          aria-invalid={error ? "true" : "false"}
        >
          {options.map((option) => {
            const isSelected = value === option.value;
            const isOptionDisabled = disabled || option.disabled;
            const radioId = `${name}-${option.value}`;

            return (
              <label
                key={option.value}
                htmlFor={radioId}
                className={cn(
                  "relative flex items-start gap-3 p-4 cursor-pointer",
                  "bg-surface-container-high transition-all duration-300",
                  "border-2 border-transparent",
                  "hover:bg-surface-container-highest",
                  isSelected &&
                    "bg-white border-primary-container ring-2 ring-primary-container/20",
                  isOptionDisabled && "opacity-50 cursor-not-allowed",
                  error && !isSelected && "border-error/30"
                )}
              >
                <div className="relative flex items-center justify-center flex-shrink-0 pt-0.5">
                  <input
                    type="radio"
                    id={radioId}
                    name={name}
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleChange(option.value)}
                    disabled={isOptionDisabled}
                    className="sr-only peer"
                    aria-describedby={
                      option.description ? `${radioId}-description` : undefined
                    }
                  />
                  {/* Custom radio button */}
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 transition-all duration-300",
                      "flex items-center justify-center",
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-outline-variant bg-surface-container-lowest",
                      !isOptionDisabled &&
                        !isSelected &&
                        "group-hover:border-primary/50",
                      error && !isSelected && "border-error"
                    )}
                  >
                    {/* Inner dot */}
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full bg-on-primary transition-all duration-300",
                        isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      )}
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={cn(
                      "text-sm font-medium text-on-surface transition-colors duration-300",
                      isSelected && "text-primary"
                    )}
                  >
                    {option.label}
                  </div>
                  {option.description && (
                    <div
                      id={`${radioId}-description`}
                      className="text-xs text-on-surface-variant mt-1"
                    >
                      {option.description}
                    </div>
                  )}
                </div>
              </label>
            );
          })}
        </div>
        {error && (
          <p className="mt-2 text-xs text-error" role="alert">
            {error}
          </p>
        )}
      </fieldset>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
