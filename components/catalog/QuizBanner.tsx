"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Icon } from "@/components/ui";
import { ProductFinderQuiz } from "@/components/marketing/ProductFinderQuiz";

export function QuizBanner() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 mb-8">
        <div className="bg-surface-container-low border border-outline-variant/30 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-headline text-2xl font-light mb-2">Nežinote, kurį modelį pasirinkti?</h2>
            <p className="text-secondary text-sm">Atsakykite į 3 paprastus klausimus ir rasime tobulą kubilą jūsų poreikiams.</p>
          </div>
          <Button onClick={() => setIsQuizOpen(true)} className="w-full md:w-auto shrink-0 group">
            <Icon name="lightbulb" size="sm" className="mr-2 opacity-70" />
            RASTI SAVO KUBILĄ
            <Icon name="arrow_forward" size="sm" className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isQuizOpen && (
          <div className="fixed inset-0 z-50 flex py-12 px-4 items-start md:items-center justify-center bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="w-full max-w-5xl relative z-50 m-auto shadow-2xl shadow-black/50"
            >
              <ProductFinderQuiz onClose={() => setIsQuizOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
