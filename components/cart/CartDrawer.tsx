"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/stores/cart";
import { CartHeader } from "./CartHeader";
import { CartItem } from "./CartItem";
import { CartFooter } from "./CartFooter";
import { EmptyCart } from "./EmptyCart";
import { UpsellEngine } from "./UpsellEngine";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getItemCount,
  } = useCartStore();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-[#FAFAFA] text-[#050505] shadow-2xl z-[90] flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Krepšelis"
          >
            {/* Header Section */}
            <CartHeader itemCount={itemCount} onClose={closeCart} />

            {/* Main Cart Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <EmptyCart onClose={closeCart} />
              ) : (
                <div className="px-8 py-8 space-y-8">
                  {/* Cart Items */}
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onRemove={removeItem}
                      onUpdateQuantity={updateQuantity}
                    />
                  ))}

                  {/* Upsell Recommendations */}
                  <UpsellEngine />
                </div>
              )}
            </div>

            {/* Checkout Footer - Sticky */}
            {items.length > 0 && (
              <CartFooter subtotal={subtotal} onClose={closeCart} />
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
