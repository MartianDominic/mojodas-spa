"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium uppercase tracking-[0.15em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "btn-gradient text-on-primary hover:brightness-110",
        secondary:
          "bg-transparent text-on-surface border-b border-on-surface hover:border-primary hover:text-primary",
        tertiary:
          "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
        outline:
          "border border-outline-variant text-on-surface hover:border-primary hover:text-primary",
        ghost:
          "bg-transparent text-on-surface hover:bg-surface-container-low",
        dark:
          "bg-[#1A1A1A] text-white hover:bg-black",
        white:
          "bg-white text-[#1A1A1A] hover:scale-105",
      },
      size: {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-xs",
        lg: "px-10 py-5 text-xs",
        xl: "px-12 py-6 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
