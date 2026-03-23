"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, disabled, indeterminate, checked, onChange, ...props }, ref) => {
    return (
      <div className="relative group">
        <div className="flex items-start gap-3">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              id={id}
              className="sr-only peer"
              ref={ref}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              {...props}
            />
            <div
              className={cn(
                "relative w-5 h-5 rounded-sm border-2 cursor-pointer",
                "transition-all duration-300 ease-in-out",
                "border-outline-variant",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20 peer-focus-visible:ring-offset-2",
                "peer-checked:bg-primary peer-checked:border-primary",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                error && "border-error peer-checked:bg-error peer-checked:border-error",
                className
              )}
              onClick={() => {
                if (!disabled) {
                  const input = document.getElementById(id || "") as HTMLInputElement;
                  if (input) {
                    input.click();
                  }
                }
              }}
            >
              {/* Checkmark icon */}
              <svg
                className={cn(
                  "absolute inset-0 w-full h-full text-on-primary",
                  "transition-all duration-300 ease-in-out",
                  "scale-0 opacity-0",
                  checked && !indeterminate && "scale-100 opacity-100",
                  indeterminate && "scale-100 opacity-100"
                )}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {indeterminate ? (
                  <rect x="4" y="9" width="12" height="2" rx="1" fill="currentColor" />
                ) : (
                  <path
                    d="M14.5 6.5L8.5 12.5L5.5 9.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </div>
          </div>

          {label && (
            <label
              htmlFor={id}
              className={cn(
                "text-sm text-on-surface cursor-pointer select-none",
                "transition-colors duration-300",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                error && "text-error"
              )}
              onClick={(e) => {
                if (disabled) {
                  e.preventDefault();
                }
              }}
            >
              {label}
            </label>
          )}
        </div>

        {error && (
          <p className="mt-1 text-xs text-error ml-8">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
