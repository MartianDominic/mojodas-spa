"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, ROUTES } from "@/lib/constants/routes";
import { Icon } from "@/components/ui";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scroll when menu is open
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-surface z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-outline-variant/10">
              <Link
                href={ROUTES.HOME}
                onClick={onClose}
                className="text-xl font-bold uppercase tracking-widest font-headline"
              >
                MojoDas Spa
              </Link>
              <button
                onClick={onClose}
                className="hover:opacity-70 transition-opacity"
                aria-label="Uždaryti meniu"
              >
                <Icon name="close" size="md" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-8 py-12">
              <ul className="space-y-8">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="text-2xl font-headline hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="px-8 py-8 border-t border-outline-variant/10">
              {/* Language Switcher */}
              <div className="flex items-center gap-4 text-sm font-medium mb-6">
                <button className="text-primary">LT</button>
                <span className="text-outline-variant">/</span>
                <button className="text-on-surface-variant hover:text-on-surface">EN</button>
              </div>

              {/* Contact Info */}
              <div className="text-sm text-on-surface-variant space-y-1">
                <p>+370 646 83 947</p>
                <p>sales@mojodas.com</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
