import { cn } from "@/lib/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
}

function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface-container-low",
        variant === "elevated" && "editorial-shadow",
        variant === "outlined" && "border border-outline-variant/20",
        className
      )}
      {...props}
    />
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("p-6", className)} {...props} />;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div className={cn("p-6 pt-0 flex items-center", className)} {...props} />
  );
}

export { Card, CardHeader, CardContent, CardFooter };
