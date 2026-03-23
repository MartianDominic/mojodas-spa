"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    return (
      <div className="relative group">
        <input
          type={type}
          id={id}
          className={cn(
            "peer block w-full px-0 py-2 bg-transparent",
            "border-0 border-b border-outline-variant/30",
            "focus:ring-0 focus:border-primary",
            "transition-colors duration-300",
            "placeholder-transparent",
            error && "border-error focus:border-error",
            className
          )}
          ref={ref}
          placeholder={label || " "}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "absolute text-sm text-on-surface-variant duration-300",
              "transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]",
              "peer-focus:left-0 peer-focus:text-primary",
              "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
              "peer-focus:scale-75 peer-focus:-translate-y-6",
              error && "text-error peer-focus:text-error"
            )}
          >
            {label}
          </label>
        )}
        {error && (
          <p className="mt-1 text-xs text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
