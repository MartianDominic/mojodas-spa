"use client";

import { cn } from "@/lib/utils/cn";

interface CheckoutLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  className?: string;
}

export function CheckoutLayout({
  children,
  sidebar,
  className,
}: CheckoutLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-16 items-start",
        className
      )}
    >
      {/* Left Column: Checkout Process (wider) */}
      <div className="lg:col-span-7 space-y-20">{children}</div>

      {/* Right Column: Order Summary (sticky) */}
      <aside className="lg:col-span-5">
        <div className="sticky top-32 space-y-8">{sidebar}</div>
      </aside>
    </div>
  );
}
