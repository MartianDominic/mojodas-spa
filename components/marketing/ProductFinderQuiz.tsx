"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Icon } from "@/components/ui";
import { getAllScrapedProducts } from "@/lib/data/scraped-products";
import { formatPrice, formatMonthlyPayment } from "@/lib/utils/format";
import { ROUTES } from "@/lib/constants/routes";
import type { Product } from "@/types";

type Purpose = "hot" | "cold" | "ofuro" | null;
type Capacity = "small" | "medium" | "large" | null;
type Shape = "round" | "square" | "any" | null;

interface QuizState {
  purpose: Purpose;
  capacity: Capacity;
  shape: Shape;
}

export function ProductFinderQuiz({
  onClose,
}: {
  onClose?: () => void;
}) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizState>({
    purpose: null,
    capacity: null,
    shape: null,
  });

  const allProducts = getAllScrapedProducts();

  const handlePurposeSelect = (purpose: Purpose) => {
    setAnswers({ ...answers, purpose });
    if (purpose === "cold" || purpose === "ofuro") {
      setStep(4);
    } else {
      setStep(2);
    }
  };

  const handleCapacitySelect = (capacity: Capacity) => {
    setAnswers({ ...answers, capacity });
    setStep(3);
  };

  const handleShapeSelect = (shape: Shape) => {
    setAnswers({ ...answers, shape });
    setStep(4);
  };

  const resetQuiz = () => {
    setAnswers({ purpose: null, capacity: null, shape: null });
    setStep(1);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
    if (step === 4 && (answers.purpose === "cold" || answers.purpose === "ofuro")) setStep(1);
    else if (step === 4) setStep(3);
  };

  const getFilteredProducts = (): Product[] => {
    if (answers.purpose === "cold") {
      return allProducts.filter((p) => p.collection === "arctic").sort((a, b) => a.basePrice - b.basePrice);
    }
    if (answers.purpose === "ofuro") {
      return allProducts.filter((p) => p.collection === "ofuro");
    }

    let filtered = allProducts.filter((p) => p.collection !== "arctic" && p.collection !== "ofuro");

    if (answers.capacity === "small") {
      filtered = filtered.filter((p) => p.capacity.max <= 4);
    } else if (answers.capacity === "medium") {
      filtered = filtered.filter((p) => p.capacity.max >= 4 && p.capacity.max <= 6);
    } else if (answers.capacity === "large") {
      filtered = filtered.filter((p) => p.capacity.max >= 6);
    }

    if (answers.shape === "round") {
      filtered = filtered.filter((p) => p.shape === "round");
    } else if (answers.shape === "square") {
      filtered = filtered.filter((p) => p.shape === "square");
    }

    return filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)).slice(0, 4);
  };

  const results = step === 4 ? getFilteredProducts() : [];

  const slideVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-surface-container shadow-2xl overflow-hidden relative border border-outline-variant/30 flex flex-col min-h-[600px] text-on-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
        <div className="font-headline text-xl tracking-wide uppercase text-secondary">
          {step < 4 ? `Raskite savo kubilą` : `Rekomendacijos`}
        </div>
        <div className="flex items-center gap-4">
          {step < 4 && (
            <div className="text-sm font-body tracking-widest text-secondary/70">
              {step} / 3 ŽINGSNIS
            </div>
          )}
          {onClose && (
            <button onClick={onClose} className="p-2 hover:bg-surface-container-high transition-colors text-secondary hover:text-on-surface">
              <Icon name="close" size="sm" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {step < 4 && (
        <div className="w-full h-1 bg-surface-container-highest">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 relative p-6 md:p-12 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
              <h2 className="font-headline text-3xl md:text-5xl font-light tracking-tight text-center">
                Kokio tipo kubilą ieškote?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <OptionCard
                  title="Karšto Vandens Kubilas"
                  description="Atsipalaidavimui su šeima ar draugais"
                  price="nuo 1 990 €"
                  icon="hot_tub"
                  onClick={() => handlePurposeSelect("hot")}
                />
                <OptionCard
                  title="Šalčio Terapija"
                  description="Recovery ir kontrastinei terapijai"
                  price="nuo 1 490 €"
                  icon="ac_unit"
                  onClick={() => handlePurposeSelect("cold")}
                />
                <OptionCard
                  title="Ofuro"
                  description="Japoniška maudymosi tradicija"
                  price="1 890 €"
                  icon="water_drop"
                  onClick={() => handlePurposeSelect("ofuro")}
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
              <h2 className="font-headline text-3xl md:text-5xl font-light tracking-tight text-center">
                Kiek žmonių dažniausiai maudysis vienu metu?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <OptionCard
                  title="2-4 Asmenys"
                  description="Pora arba maža šeima"
                  price="nuo 1 990 €"
                  icon="group"
                  onClick={() => handleCapacitySelect("small")}
                />
                <OptionCard
                  title="4-6 Asmenys"
                  description="Šeima su vaikais"
                  price="nuo 2 690 €"
                  icon="groups"
                  onClick={() => handleCapacitySelect("medium")}
                  badge="Rekomenduojame"
                />
                <OptionCard
                  title="6+ Asmenys"
                  description="Draugų kompanija"
                  price="nuo 2 890 €"
                  icon="diversity_3"
                  onClick={() => handleCapacitySelect("large")}
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
              <h2 className="font-headline text-3xl md:text-5xl font-light tracking-tight text-center">
                Koks dizainas jums labiau patinka?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <OptionCard
                  title="Apvalus"
                  description="Klasikinis, tradicinis"
                  price="nuo 1 990 €"
                  icon="radio_button_unchecked"
                  onClick={() => handleShapeSelect("round")}
                />
                <OptionCard
                  title="Kvadratinis"
                  description="Modernus, elegantiškas"
                  price="nuo 2 690 €"
                  icon="crop_square"
                  onClick={() => handleShapeSelect("square")}
                />
                <OptionCard
                  title="Nesvarbu"
                  description="Parodyti visus variantus"
                  icon="check_box_outline_blank"
                  onClick={() => handleShapeSelect("any")}
                />
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="font-headline text-4xl md:text-6xl font-light tracking-tight">Jums rekomenduojame</h2>
                <p className="text-secondary text-lg">Atrinkome modelius, kurie geriausiai atitinka jūsų poreikius.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {results.map((product, idx) => (
                  <ResultCard key={product.id} product={product} isPremium={idx === 0 && results.length > 1} answers={answers} />
                ))}
              </div>

              {results.length === 0 && (
                <div className="text-center text-secondary py-12">
                  Atsiprašome, bet šiuo metu neturime tokių modelių.
                </div>
              )}

              <div className="flex justify-center pt-8 border-t border-outline-variant/20">
                <Link href={ROUTES.CATALOG} onClick={onClose} className="group flex items-center gap-2 text-secondary hover:text-primary transition-colors">
                  <span>Peržiūrėti visus produktus</span>
                  <Icon name="arrow_forward" size="sm" className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Navigation */}
      {step > 1 && step < 4 && (
        <div className="p-6 border-t border-outline-variant/20 flex justify-start">
          <Button variant="outline" onClick={handleBack} className="gap-2">
            <Icon name="arrow_back" size="sm" /> Grįžti
          </Button>
        </div>
      )}
      {step === 4 && answers.purpose !== null && (
        <div className="p-6 border-t border-outline-variant/20 flex justify-start">
          <Button variant="outline" onClick={resetQuiz} className="gap-2">
            <Icon name="refresh" size="sm" /> Pradėti iš naujo
          </Button>
        </div>
      )}
    </div>
  );
}

function OptionCard({
  title,
  description,
  price,
  icon,
  badge,
  onClick,
}: {
  title: string;
  description: string;
  price?: string;
  icon: string;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center p-8 bg-surface-container-low border border-outline-variant/30 hover:border-primary transition-all duration-300 text-center space-y-4 w-full h-full hover:-translate-y-1 hover:shadow-xl"
    >
      {badge && (
        <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 bg-primary text-on-primary text-xs tracking-widest uppercase font-bold px-3 py-1 shadow-md z-10">
          {badge}
        </div>
      )}
      <div className="text-secondary group-hover:text-primary transition-colors">
        <Icon name={icon} size="lg" className="scale-150 mb-2 opacity-80" />
      </div>
      <h3 className="font-headline text-2xl tracking-tight">{title}</h3>
      <p className="text-secondary text-sm leading-relaxed">{description}</p>
      {price && (
        <p className="text-primary font-bold tracking-widest text-xs uppercase pt-4 w-full border-t border-outline-variant/20">
          {price}
        </p>
      )}
    </button>
  );
}

function ResultCard({ product, isPremium, answers }: { product: Product; isPremium: boolean; answers: QuizState }) {
  const capacityDesc = product.capacity.min === product.capacity.max ? `${product.capacity.min} asmenims` : `${product.capacity.min}-${product.capacity.max} asmenims`;
  
  return (
    <div className={`flex flex-col bg-surface-container-low border ${isPremium ? 'border-primary shadow-lg shadow-primary/5' : 'border-outline-variant/20'} overflow-hidden relative`}>
      {isPremium && (
        <div className="absolute top-4 left-4 z-10 bg-primary text-on-primary text-xs uppercase tracking-widest font-bold px-3 py-1 flex items-center gap-1 shadow-md">
          <Icon name="star" size="sm" /> Geriausias atitikmuo
        </div>
      )}
      <div className="relative aspect-[4/3] w-full bg-black">
        {product.images[0] && (
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            className="object-cover opacity-80"
          />
        )}
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="font-headline text-3xl italic mb-2 tracking-tight">{product.name}</h3>
        <div className="text-primary font-medium flex items-center gap-3 text-lg mb-6 tracking-wide">
          <span>{formatPrice(product.basePrice)}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
          <span>{formatMonthlyPayment(product.basePrice)}</span>
        </div>

        <div className="space-y-3 mb-8 flex-1">
          <p className="text-xs uppercase tracking-widest text-secondary font-bold mb-4">Tinka jums, nes:</p>
          <ul className="space-y-3 text-secondary text-sm">
            {answers.capacity && (
              <li className="flex items-center gap-3">
                <Icon name="check" size="sm" className="text-primary" /> Telpa {capacityDesc}
              </li>
            )}
            {answers.shape && answers.shape !== "any" && (
              <li className="flex items-center gap-3">
                <Icon name="check" size="sm" className="text-primary" /> {product.shape === "round" ? "Apvalus" : "Kvadratinis"} dizainas
              </li>
            )}
            <li className="flex items-center gap-3">
              <Icon name="check" size="sm" className="text-primary" /> {product.heaterType === "internal" ? "Integruota krosnelė" : product.heaterType === "external" ? "Išorinė krosnelė" : "Elektrinis pakaitinimas"}
            </li>
          </ul>
        </div>

        <Link href={ROUTES.PRODUCT(product.slug)} className="mt-auto">
          <Button className="w-full group">
            PLAČIAU APIE MODELĮ
            <Icon name="arrow_forward" size="sm" className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
