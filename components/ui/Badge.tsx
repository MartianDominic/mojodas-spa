import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary",
        secondary: "bg-[#1A1A1A] text-white",
        accent: "bg-primary-container text-on-primary-container",
        outline: "border border-outline-variant text-on-surface",
        glass: "bg-white/10 backdrop-blur-md text-white",
      },
      size: {
        sm: "px-2 py-0.5 text-[9px]",
        md: "px-3 py-1 text-[10px]",
        lg: "px-4 py-1.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
