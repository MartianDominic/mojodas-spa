"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart";
import { ROUTES } from "@/lib/constants/routes";
import { Icon } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  variant?: "default" | "transparent";
}

export function Header({ variant = "default" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  const isTransparent = variant === "transparent";

  return (
    <>
      <nav
        className={cn(
          "absolute top-0 w-full z-50 transition-all duration-300",
          isTransparent
            ? "bg-transparent text-white border-b border-white/10"
            : "bg-surface/80 backdrop-blur-xl text-on-surface"
        )}
      >
        <div className="flex justify-between items-center px-8 py-8 w-full max-w-[1920px] mx-auto">
          {/* Logo */}
          <Link
            href={ROUTES.HOME}
            className={cn(
              "text-xl md:text-2xl font-bold uppercase tracking-widest font-headline leading-tight",
              isTransparent ? "text-white" : "text-on-surface"
            )}
          >
            MojoDas Spa
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href={ROUTES.CATALOG}
              className={cn(
                "flex items-center gap-1 text-xs font-semibold tracking-[0.15em] uppercase transition-opacity hover:opacity-80",
                isTransparent ? "text-white" : "text-on-surface"
              )}
            >
              Katalogas
              <Icon name="expand_more" size="sm" />
            </Link>
            <Link
              href={ROUTES.B2B}
              className={cn(
                "text-xs font-semibold tracking-[0.15em] uppercase transition-opacity hover:opacity-80",
                isTransparent ? "text-white" : "text-on-surface"
              )}
            >
              Verslui
            </Link>
            <Link
              href={ROUTES.CONTACT}
              className={cn(
                "text-xs font-semibold tracking-[0.15em] uppercase transition-opacity hover:opacity-80",
                isTransparent ? "text-white" : "text-on-surface"
              )}
            >
              Kontaktai
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-8">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className={cn(
                "relative hover:opacity-70 transition-opacity duration-300 active:opacity-50",
                isTransparent ? "text-white" : "text-on-surface"
              )}
              aria-label="Atidaryti krepšelį"
            >
              <Icon name="shopping_bag" size="md" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Language Switcher - Desktop */}
            <div
              className={cn(
                "hidden md:flex items-center gap-2 text-xs font-bold tracking-widest",
                isTransparent ? "text-white" : "text-on-surface"
              )}
            >
              <span className="cursor-pointer hover:opacity-70">LT</span>
              <span className="opacity-30">/</span>
              <span className="cursor-pointer hover:opacity-70">EN</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "md:hidden hover:opacity-70 transition-opacity duration-300 active:opacity-50",
                isTransparent ? "text-white" : "text-on-surface"
              )}
              aria-label="Atidaryti meniu"
            >
              <Icon name="menu" size="md" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
