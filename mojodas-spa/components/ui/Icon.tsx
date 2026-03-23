import { cn } from "@/lib/utils/cn";

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export function Icon({ name, className, filled = false, size = "md" }: IconProps) {
  return (
    <span
      className={cn(
        "material-symbols-outlined",
        sizeClasses[size],
        className
      )}
      style={{
        fontVariationSettings: filled
          ? "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24"
          : "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
      }}
    >
      {name}
    </span>
  );
}
