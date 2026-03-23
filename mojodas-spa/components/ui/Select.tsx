"use client";

import { forwardRef, useState, useRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const selectVariants = cva(
  "block w-full cursor-pointer transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "px-4 py-2 bg-surface-container-low border border-outline-variant rounded-md focus:ring-2 focus:ring-primary focus:border-primary hover:border-outline",
        underline:
          "px-0 py-2 bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-primary hover:border-outline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange">,
    VariantProps<typeof selectVariants> {
  label?: string;
  error?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  placeholder?: string;
  renderOption?: (option: SelectOption) => React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      label,
      error,
      options,
      onChange,
      placeholder,
      disabled,
      value,
      id,
      renderOption,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>(
      value?.toString() || ""
    );
    const containerRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    // Update selected value when value prop changes
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value.toString());
      }
    }, [value]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const handleChange = (newValue: string) => {
      setSelectedValue(newValue);
      setIsOpen(false);
      onChange?.(newValue);
    };

    const selectedOption = options.find((opt) => opt.value === selectedValue);
    const displayValue = selectedOption?.label || placeholder || "";
    const hasValue = selectedValue !== "";

    return (
      <div className="relative group" ref={containerRef}>
        {/* Hidden native select for accessibility and form compatibility */}
        <select
          ref={ref || selectRef}
          id={id}
          value={selectedValue}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          className="sr-only"
          aria-label={label}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom select trigger */}
        <div
          className={cn(
            selectVariants({ variant }),
            "relative flex items-center justify-between",
            error && "border-error focus:border-error",
            variant === "underline" && "peer",
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              !disabled && setIsOpen(!isOpen);
            }
            if (e.key === "Escape") {
              setIsOpen(false);
            }
          }}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-disabled={disabled}
        >
          <span
            className={cn(
              "block truncate",
              !hasValue && "text-on-surface-variant/50",
              variant === "underline" && !hasValue && "placeholder-transparent"
            )}
          >
            {displayValue}
          </span>
          <span
            className={cn(
              "material-symbols-outlined text-on-surface-variant transition-transform duration-300 ml-2",
              isOpen && "rotate-180"
            )}
            aria-hidden="true"
          >
            expand_more
          </span>
        </div>

        {/* Floating label for underline variant */}
        {label && variant === "underline" && (
          <label
            id={`${id}-label`}
            htmlFor={id}
            className={cn(
              "absolute text-sm text-on-surface-variant duration-300",
              "transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]",
              "peer-focus-within:left-0 peer-focus-within:text-primary",
              !hasValue && "scale-100 translate-y-0",
              hasValue && "scale-75 -translate-y-6",
              error && "text-error peer-focus-within:text-error",
              "pointer-events-none"
            )}
          >
            {label}
          </label>
        )}

        {/* Static label for default variant */}
        {label && variant === "default" && (
          <label
            id={`${id}-label`}
            htmlFor={id}
            className={cn(
              "block text-sm font-medium text-on-surface-variant mb-1",
              error && "text-error"
            )}
          >
            {label}
          </label>
        )}

        {/* Custom dropdown menu */}
        {isOpen && (
          <div
            className={cn(
              "absolute z-50 w-full mt-1",
              "bg-surface-container-low border border-outline-variant rounded-md shadow-lg",
              "max-h-60 overflow-auto",
              "animate-in fade-in-0 zoom-in-95"
            )}
            role="listbox"
            aria-label={label}
          >
            {placeholder && (
              <div
                className={cn(
                  "px-4 py-2 cursor-pointer hover:bg-surface-container text-on-surface-variant/50",
                  selectedValue === "" && "bg-surface-container"
                )}
                onClick={() => handleChange("")}
                role="option"
                aria-selected={selectedValue === ""}
              >
                {placeholder}
              </div>
            )}
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "px-4 py-2 cursor-pointer transition-colors",
                  "hover:bg-surface-container focus:bg-surface-container",
                  "text-on-surface",
                  selectedValue === option.value &&
                    "bg-surface-container-high font-medium",
                  option.disabled &&
                    "opacity-50 cursor-not-allowed pointer-events-none"
                )}
                onClick={() => !option.disabled && handleChange(option.value)}
                role="option"
                aria-selected={selectedValue === option.value}
                aria-disabled={option.disabled}
              >
                {renderOption ? renderOption(option) : option.label}
              </div>
            ))}
          </div>
        )}

        {/* Error message */}
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select, selectVariants };
