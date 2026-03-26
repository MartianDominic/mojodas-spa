# MojoDas Spa: Implementation Gaps & Required Changes

**Document Version:** 1.0
**Date:** 2026-03-26
**Based on:** CRO Audit of all pages against CRO_OPTIMIZATION.md and BRANDBOOK.md

---

## Executive Summary

This document catalogs every gap between the current implementation and the CRO/Brand specifications, organized by page/component with specific file paths and code changes needed.

**Overall Completion Status:** ~45% of CRO requirements implemented

| Area | Current | Target | Gap |
|------|---------|--------|-----|
| Homepage | 70% | 100% | Quiz access, monthly payment prominence |
| Quiz | 60% | 100% | Full-screen pages, not popup |
| Catalog | 50% | 100% | Filter simplification, monthly prices |
| Product Page | 40% | 100% | Packages, FAQ, sticky CTA |
| Configurator | 30% | 100% | Step-by-step wizard |
| Cart | 60% | 100% | Upsells, financing prominence |
| Checkout | 55% | 100% | Financing first, guest messaging |

---

## Part 1: Homepage Gaps

### File: `mojodas-spa/app/page.tsx`

**Current:** Homepage renders correctly with Hero, Bestsellers, Categories, etc.

**Gaps:**

| # | Gap | Priority | Change Required |
|---|-----|----------|-----------------|
| H1 | Quiz opens as popup, not full-screen | P0 | Change CTA to link to `/raskite-savo-kubila` |
| H2 | No monthly payment in hero | P1 | Add "nuo 56 €/mėn" to hero subheadline |
| H3 | Trust strip not reused elsewhere | P2 | Import TrustStrip in layout/footer |

### File: `mojodas-spa/components/marketing/Hero.tsx`

**Line-by-Line Changes:**

```typescript
// CURRENT (line ~45):
onClick={() => setIsQuizOpen(true)}

// CHANGE TO:
href="/raskite-savo-kubila"
// Remove modal state, convert button to Link
```

```typescript
// CURRENT: No monthly payment in hero
// ADD to subheadline (line ~32):
<p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto">
  Gaminama Lietuvoje. <span className="text-primary">Nuo 56 €/mėn.</span>
</p>
```

### File: `mojodas-spa/components/marketing/Bestsellers.tsx`

**Gaps:**

| # | Gap | Priority | Change Required |
|---|-----|----------|-----------------|
| B1 | Price shows full amount first | P0 | Lead with monthly: "nuo 81 €/mėn" |
| B2 | No value stacking | P2 | Add "✓ Pristatymas įskaičiuotas" etc. |
| B3 | Hardcoded data | P3 | Use products from API/data file |

**Code Change (lines 84-90):**

```typescript
// CURRENT:
<span className="text-2xl font-headline">{product.price}</span>
<p className="text-xs text-gray-400">arba X €/mėn</p>

// CHANGE TO:
<span className="text-2xl font-headline">nuo {product.monthlyPayment} €/mėn</span>
<p className="text-xs text-gray-400">arba {product.price} vienkartinis</p>
```

---

## Part 2: Quiz Gaps (CRITICAL)

### DECISION: Convert from Popup to Full-Screen Pages

**Rationale:** A €2,000-5,000 purchase deserves an immersive experience, not a modal popup.

### NEW Files to Create:

| File | Purpose |
|------|---------|
| `app/raskite-savo-kubila/page.tsx` | Quiz Step 1: Purpose |
| `app/raskite-savo-kubila/talpa/page.tsx` | Quiz Step 2: Capacity |
| `app/raskite-savo-kubila/dizainas/page.tsx` | Quiz Step 3: Design |
| `app/raskite-savo-kubila/rezultatai/page.tsx` | Quiz Results |
| `components/quiz/QuizLayout.tsx` | Shared layout for all quiz pages |
| `components/quiz/QuizOption.tsx` | Reusable option card |
| `components/quiz/QuizProgress.tsx` | Progress indicator |
| `lib/quiz/quiz-logic.ts` | Product filtering based on selections |

### File: `mojodas-spa/components/marketing/ProductFinderQuiz.tsx`

**Current Issues:**

| # | Issue | Impact |
|---|-------|--------|
| Q1 | Opens as modal overlay | Not premium feel |
| Q2 | No escape key handler | UX friction |
| Q3 | No click-outside-to-close | UX friction |
| Q4 | Background color is bone (bg-surface-container) | Should be stark white or dark |
| Q5 | No back button on results | Can't change step 3 selection |
| Q6 | No italic headlines | Doesn't match brand spec |

**Action:** Deprecate this component. Replace with page-based quiz flow.

### File: `mojodas-spa/components/marketing/Hero.tsx`

**Remove Modal Logic:**

```typescript
// DELETE these lines:
const [isQuizOpen, setIsQuizOpen] = useState(false);

// DELETE the AnimatePresence modal section (lines ~60-80)

// CHANGE CTA from:
<Button onClick={() => setIsQuizOpen(true)}>

// TO:
<Link href="/raskite-savo-kubila">
  <Button>RASKITE TOBULĄ KUBILĄ</Button>
</Link>
```

---

## Part 3: Catalog Gaps

### File: `mojodas-spa/components/catalog/ProductCard.tsx`

**Gaps:**

| # | Gap | Priority | Line |
|---|-----|----------|------|
| C1 | Price shows full amount, not monthly | P0 | 84-87 |
| C2 | No "nuo X €/mėn" display | P0 | 84-87 |

**Code Change:**

```typescript
// CURRENT (lines 84-87):
<span className="text-white font-medium text-lg lg:text-xl">
  {formattedPrice}
</span>

// CHANGE TO:
<div className="text-left flex flex-col">
  <span className="text-white font-semibold text-xl lg:text-2xl leading-none">
    nuo {Math.ceil(product.basePrice / 36)} €/mėn
  </span>
  <span className="text-white/70 text-sm mt-1">
    arba {formattedPrice}
  </span>
</div>
```

### File: `mojodas-spa/components/catalog/FilterBar.tsx`

**Gaps:**

| # | Gap | Priority | Change |
|---|-----|----------|--------|
| F1 | Heater type filter is too technical | P1 | Remove entirely |
| F2 | Features filter is too granular | P1 | Remove entirely |
| F3 | Missing "Visi" (All) option | P2 | Add as first option |
| F4 | Missing "Šalčio terapija" in shape | P2 | Add as shape option |

**Code Changes:**

```typescript
// DELETE from FILTER_CONFIG (lines 46-63):
{
  id: "heaterType",
  label: "Krosnelė",
  options: [
    { value: "internal", label: "Integruota" },
    { value: "external", label: "Išorinė" },
  ],
},
{
  id: "features",
  label: "Savybės",
  options: [...]
},

// UPDATE FILTER_CONFIG to be:
const FILTER_CONFIG = [
  {
    id: "capacity",
    label: "Talpa",
    options: [
      { value: "all", label: "Visi" },
      { value: "small", label: "2-4 Asmenims" },
      { value: "large", label: "5+ Asmenims" },
    ],
  },
  {
    id: "shape",
    label: "Dizainas",
    options: [
      { value: "round", label: "Apvalūs" },
      { value: "square", label: "Kvadratiniai" },
      { value: "therapeutic", label: "Šalčio Terapija" },
    ],
  },
];
```

### File: `mojodas-spa/components/catalog/CatalogContent.tsx`

**Update filter logic (lines 58-96):**

Remove heaterType and features filter logic. Simplify to capacity + shape only.

### File: `mojodas-spa/components/catalog/QuizBanner.tsx`

**Current:** Exists but minimal design.

**Gap:** Should be more prominent per CRO spec.

**Changes:**
- Increase headline size to `text-3xl md:text-4xl`
- Add descriptive subtext
- Make CTA larger with icon

---

## Part 4: Product Page Gaps (CRITICAL)

### File: `mojodas-spa/app/produktas/[slug]/page.tsx`

**Current Structure:**
1. ProductGallery
2. ProductInfo
3. "The Narrative" (long description)
4. TechSpecs
5. RelatedProducts

**Required Structure:**
1. ProductGallery ✅
2. ProductInfo (enhanced) ⚠️
3. **PackageSelector** ❌ NEW - CRITICAL
4. "Kodėl šis modelis" positioning ❌ NEW
5. "The Narrative" ✅
6. TechSpecs ✅
7. **ProductFAQ** ❌ NEW - CRITICAL
8. **ValueStacking** ❌ NEW
9. RelatedProducts ✅
10. **StickyMobileCTA** ❌ NEW - CRITICAL

### NEW Files to Create:

| File | Purpose | Priority |
|------|---------|----------|
| `components/product/PackageSelector.tsx` | 3-tier package selection | P0 |
| `components/product/ProductFAQ.tsx` | FAQ accordion | P0 |
| `components/product/StickyMobileCTA.tsx` | Mobile bottom bar | P0 |
| `components/product/ProductPositioning.tsx` | "Kodėl šis modelis" | P1 |
| `components/product/ValueStacking.tsx` | Price breakdown | P2 |

### File: `mojodas-spa/components/product/ProductInfo.tsx`

**Gaps:**

| # | Gap | Priority | Change |
|---|-----|----------|--------|
| P1 | Monthly payment is secondary | P0 | Lead with monthly |
| P2 | No trust timeline ("per 2-4 savaites") | P1 | Add delivery estimate |
| P3 | CTA says "Konfiguruoti" | P1 | Change to "Konfigūruoti ir užsakyti" |

**Code Changes:**

```typescript
// CURRENT price display:
<span className="text-4xl font-headline">{formatPrice(product.basePrice)}</span>
<span className="text-secondary">Išsimokėtinai nuo {monthly} €/mėn</span>

// CHANGE TO:
<span className="text-4xl font-headline">nuo {monthly} €/mėn</span>
<span className="text-secondary">arba {formatPrice(product.basePrice)} vienkartinis</span>
```

```typescript
// ADD delivery timeline after trust badges:
<p className="text-sm text-secondary mt-2">
  Pristatymas per 2-4 savaites • Montavimas įskaičiuotas
</p>
```

### Component: PackageSelector.tsx (NEW)

**Structure:**

```typescript
interface Package {
  id: 'bazinis' | 'populiarus' | 'premium';
  name: string;
  priceModifier: number;
  monthlyModifier: number;
  included: string[];
  badge?: string;
  isRecommended?: boolean;
}

const PACKAGES: Package[] = [
  {
    id: 'bazinis',
    name: 'Bazinis',
    priceModifier: 0,
    monthlyModifier: 0,
    included: ['Kubilas', 'Krosnelė', 'Eglės mediena', 'Standartinis dangtelis'],
  },
  {
    id: 'populiarus',
    name: 'Populiarus',
    priceModifier: 490,
    monthlyModifier: 14,
    included: ['Viskas iš Bazinio', 'Termo dangtelis', 'Mediniai laiptai', 'Priežiūros rinkinys'],
    badge: '★ 73% RENKASI',
    isRecommended: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    priceModifier: 1090,
    monthlyModifier: 30,
    included: ['Viskas iš Populiaraus', 'Termo mediena', 'LED apšvietimas', 'Masažiniai purkštukai'],
  },
];
```

### Component: ProductFAQ.tsx (NEW)

**Content (from CRO spec):**

```typescript
const FAQS = [
  {
    question: 'Ar reikia leidimo statybai?',
    answer: 'Daugeliu atvejų leidimo nereikia, nes kubilas laikomas kilnojamuoju daiktu...',
  },
  {
    question: 'Kaip vyksta pristatymas ir montavimas?',
    answer: 'Pristatome visoje Lietuvoje per 2-4 savaites. Montavimas įskaičiuotas...',
  },
  {
    question: 'Kokia garantija?',
    answer: '5 metų garantija kubilo konstrukcijai, 2 metai elektronikai...',
  },
  {
    question: 'Kiek kainuoja eksploatacija?',
    answer: 'Malkinis kūrenimas: ~5€ už vieną kūrenimą. Elektros sąnaudos: ~10-15€/mėn...',
  },
  {
    question: 'Ar galima išsimokėtinai?',
    answer: 'Taip! Siūlome lizingą be pradinio įnašo. Mėnesinės įmokos nuo 42€...',
  },
];
```

---

## Part 5: Configurator Gaps (CRITICAL)

### File: `mojodas-spa/app/produktas/[slug]/konfiguratorius/page.tsx`

**Current:** Single page with all options visible at once.

**Required:** Step-by-step wizard with 5 sequential steps.

### File: `mojodas-spa/components/configurator/ConfiguratorForm.tsx`

**Current Flow:**
- All 5 ConfigStep components render simultaneously
- User sees everything at once
- No progress indicator
- No package selection

**Required Flow:**
1. Step 1: Package Selection (Bazinis/Populiarus/Premium)
2. Step 2: Wood Type
3. Step 3: Shell Color
4. Step 4: Extras (upsells)
5. Step 5: Review & Confirm

**Changes Needed:**

| # | Change | Files Affected |
|---|--------|----------------|
| CF1 | Add `currentStep` state to Zustand store | `stores/configurator.ts` |
| CF2 | Conditional rendering based on step | `ConfiguratorForm.tsx` |
| CF3 | Add WizardProgress component | NEW: `WizardProgress.tsx` |
| CF4 | Add WizardNavigation component | NEW: `WizardNavigation.tsx` |
| CF5 | Add PackageStep as first step | NEW: `ConfigPackageStep.tsx` |
| CF6 | Update ConfigSummary for final review | `ConfigSummary.tsx` |

### File: `mojodas-spa/stores/configurator.ts`

**ADD:**

```typescript
interface ConfiguratorState {
  // ... existing fields
  currentStep: number;
  selectedPackage: 'bazinis' | 'populiarus' | 'premium' | null;
}

// ADD actions:
setCurrentStep: (step: number) => void;
setSelectedPackage: (pkg: 'bazinis' | 'populiarus' | 'premium') => void;
nextStep: () => void;
prevStep: () => void;
```

### NEW Files to Create:

| File | Purpose |
|------|---------|
| `components/configurator/WizardProgress.tsx` | Progress indicator (●━━○━━○) |
| `components/configurator/WizardNavigation.tsx` | Back/Next buttons |
| `components/configurator/ConfigPackageStep.tsx` | Package selection (Step 1) |

---

## Part 6: Cart Gaps

### File: `mojodas-spa/app/krepselis/page.tsx`

**Gaps:**

| # | Gap | Priority | Change |
|---|-----|----------|--------|
| CA1 | Financing not prominent enough | P0 | Add highlighted financing box |
| CA2 | Limited upsells (only 2 items) | P1 | Expand to 6+ relevant items |
| CA3 | No "★ Dauguma renkasi" badges | P1 | Add social proof to upsells |

**Code Changes (lines 128-137):**

```typescript
// CURRENT: Small financing hint
<div className="flex items-start gap-3 p-4 bg-[#F8F8F8] rounded-lg mb-6">

// CHANGE TO: Prominent financing box
<div className="p-6 bg-primary/5 border-2 border-primary/20 rounded-lg mb-6">
  <div className="flex items-center gap-4">
    <Icon name="payments" className="text-primary" size="lg" />
    <div>
      <p className="text-lg font-bold text-[#1A1A1A] mb-1">
        Išsimokėtinai nuo {Math.ceil(total / 36)} €/mėn
      </p>
      <p className="text-sm text-gray-600">
        Mokėkite per 12–48 mėnesius be pradinio įnašo. Sprendimas per 15 min.
      </p>
    </div>
  </div>
</div>
```

### File: `mojodas-spa/components/cart/UpsellEngine.tsx`

**Current:** 2 hardcoded items
**Required:** 6+ items with social proof badges

**Update UPSELL_ITEMS array:**

```typescript
const UPSELL_ITEMS: UpsellItem[] = [
  {
    id: 'upsell-thermo-cover',
    name: 'Termo dangtelis',
    description: 'Išlaiko šilumą 2x ilgiau',
    price: 290,
    icon: 'layers',
    badge: '★ 73% renkasi',
  },
  {
    id: 'upsell-led',
    name: 'LED apšvietimas',
    description: '7-24 žvaigždutės + lempos',
    price: 290,
    icon: 'lightbulb',
    badge: '★ 67% renkasi',
  },
  {
    id: 'upsell-jets',
    name: 'Masažiniai purkštukai',
    description: '6-24 vandens + oro purkštukų',
    price: 590,
    icon: 'water_drop',
  },
  {
    id: 'upsell-filtration',
    name: 'Filtracijos sistema',
    description: 'Smėlio filtras + UVC lempa',
    price: 430,
    icon: 'filter_alt',
  },
  {
    id: 'upsell-stairs',
    name: 'Mediniai laiptai',
    description: 'Termo mediena / WPC',
    price: 120,
    icon: 'stairs',
  },
  {
    id: 'upsell-care-kit',
    name: 'Priežiūros rinkinys',
    description: '6 mėnesiams',
    price: 120,
    icon: 'clean_hands',
  },
];
```

---

## Part 7: Checkout Gaps

### File: `mojodas-spa/app/(checkout)/atsiskaitymas/page.tsx`

**Gaps:**

| # | Gap | Priority | Change |
|---|-----|----------|--------|
| CH1 | No guest checkout messaging | P0 | Add "Užsakymas be registracijos" |
| CH2 | Išsimokėtinai is option #3 | P0 | Move išsimokėtinai to option #1 |
| CH3 | No phone support CTA | P1 | Add "Turite klausimų? +370..." |
| CH4 | No delivery timeline | P1 | Add "per 2-4 savaites" |

**Code Changes:**

```typescript
// ADD after line 60 (before DeliveryForm):
<div className="bg-surface-container-low p-6 rounded-lg border-l-4 border-primary mb-8">
  <div className="flex items-center gap-3">
    <Icon name="check_circle" className="text-primary" />
    <p className="text-sm font-medium">
      Užsakymas be registracijos – tik 2 žingsniai
    </p>
  </div>
</div>
```

### File: `mojodas-spa/components/checkout/PaymentMethods.tsx`

**Current order:** Banklink → Card → Išsimokėtinai
**Required order:** Išsimokėtinai (★ Rekomenduojama) → Banklink → Card

**Code Changes:**

```typescript
// REORDER paymentOptions array (line 24-44):
const paymentOptions = [
  {
    id: 'leasing',
    title: 'Išsimokėtinai',
    description: `Nuo ${Math.ceil(orderTotal / 36)} €/mėn – Be pradinio įnašo`,
    icon: 'payments',
    badge: '★ REKOMENDUOJAMA',
    highlighted: true,
  },
  {
    id: 'banklink',
    title: 'Bankinis pavedimas',
    description: 'Mokėjimas per banką',
    icon: 'account_balance',
  },
  {
    id: 'card',
    title: 'Mokėjimo kortelė',
    description: 'Visa, Mastercard',
    icon: 'credit_card',
  },
];
```

### File: `mojodas-spa/components/checkout/OrderSummary.tsx`

**ADD delivery timeline (after line 110):**

```typescript
<div className="space-y-1">
  <div className="flex justify-between text-sm text-on-surface-variant">
    <span>Pristatymas ir montavimas</span>
    <span className="text-primary font-medium">NEMOKAMAI</span>
  </div>
  <p className="text-xs text-on-surface-variant text-right">
    per 2–4 savaites
  </p>
</div>
```

---

## Part 8: New Components Summary

### Critical (P0) - Must Have for Launch

| Component | File Path | Purpose |
|-----------|-----------|---------|
| PackageSelector | `components/product/PackageSelector.tsx` | 3-tier package selection on product page |
| ProductFAQ | `components/product/ProductFAQ.tsx` | FAQ accordion on product page |
| StickyMobileCTA | `components/product/StickyMobileCTA.tsx` | Mobile bottom bar with price + CTA |
| Quiz Pages | `app/raskite-savo-kubila/**` | Full-screen quiz flow (4 pages) |
| WizardProgress | `components/configurator/WizardProgress.tsx` | Configurator progress indicator |
| WizardNavigation | `components/configurator/WizardNavigation.tsx` | Configurator back/next buttons |

### High Priority (P1)

| Component | File Path | Purpose |
|-----------|-----------|---------|
| ProductPositioning | `components/product/ProductPositioning.tsx` | "Kodėl šis modelis" section |
| ExitIntentModal | `components/cart/ExitIntentModal.tsx` | Email capture on exit |
| ComparisonTool | `components/product/ProductComparison.tsx` | Side-by-side comparison |

### Medium Priority (P2)

| Component | File Path | Purpose |
|-----------|-----------|---------|
| ValueStacking | `components/product/ValueStacking.tsx` | Price breakdown with value |
| UrgencyBanner | `components/marketing/UrgencyBanner.tsx` | Seasonal/delivery urgency |

---

## Part 9: Data Structure Updates

### File: `mojodas-spa/types/product.ts`

**ADD interfaces:**

```typescript
interface ProductPackage {
  id: 'bazinis' | 'populiarus' | 'premium';
  name: string;
  priceModifier: number;
  included: string[];
  badge?: string;
  isRecommended?: boolean;
}

interface ProductFAQ {
  question: string;
  answer: string;
}

interface ProductPositioning {
  statement: string;
  suitedFor: string[];
}

// UPDATE Product interface:
interface Product {
  // ... existing fields
  packages?: ProductPackage[];
  faqs?: ProductFAQ[];
  positioning?: ProductPositioning;
}
```

### File: `mojodas-spa/data/products.json`

**ADD to each product:**

```json
{
  "packages": [
    {
      "id": "bazinis",
      "name": "Bazinis",
      "priceModifier": 0,
      "included": ["Kubilas", "Krosnelė", "Eglės mediena", "Std. dangtelis"]
    },
    {
      "id": "populiarus",
      "name": "Populiarus",
      "priceModifier": 490,
      "included": ["Viskas iš Bazinio", "Termo dangtelis", "Laiptai", "Priežiūros rinkinys"],
      "badge": "★ 73% RENKASI",
      "isRecommended": true
    },
    {
      "id": "premium",
      "name": "Premium",
      "priceModifier": 1090,
      "included": ["Viskas iš Populiaraus", "Termo mediena", "LED", "Masažiniai purkštukai"]
    }
  ],
  "positioning": {
    "statement": "Šis modelis sukurtas šeimoms, kurios vertina bendrą laiką...",
    "suitedFor": [
      "Turite šeimą su vaikais",
      "Jūsų erdvė nėra labai didelė",
      "Vertinate klasikinį dizainą"
    ]
  }
}
```

---

## Part 10: Implementation Order

### Week 1: Foundation

1. ✅ Create pricing CSV (DONE)
2. [ ] Create quiz page routes (`/raskite-savo-kubila/**`)
3. [ ] Remove popup quiz from Hero
4. [ ] Add monthly payment as primary price everywhere
5. [ ] Add PackageSelector to product pages
6. [ ] Add ProductFAQ to product pages

### Week 2: Configurator & Checkout

7. [ ] Convert configurator to step-by-step wizard
8. [ ] Add WizardProgress and WizardNavigation
9. [ ] Move išsimokėtinai to first payment option
10. [ ] Add guest checkout messaging
11. [ ] Add phone support CTA to checkout

### Week 3: Polish & Recovery

12. [ ] Add StickyMobileCTA
13. [ ] Simplify catalog filters
14. [ ] Expand upsell items with badges
15. [ ] Create ExitIntentModal
16. [ ] Add value stacking to product pages

### Week 4: Testing & Launch

17. [ ] Mobile responsiveness testing
18. [ ] Quiz flow testing
19. [ ] Package selection flow testing
20. [ ] Checkout flow testing
21. [ ] Analytics setup

---

## Appendix A: File Change Summary

### Files to Modify

| File | Changes | Priority |
|------|---------|----------|
| `app/page.tsx` | None needed | - |
| `components/marketing/Hero.tsx` | Remove popup, add Link, add monthly | P0 |
| `components/marketing/Bestsellers.tsx` | Lead with monthly payment | P0 |
| `components/catalog/ProductCard.tsx` | Lead with monthly payment | P0 |
| `components/catalog/FilterBar.tsx` | Remove technical filters | P1 |
| `components/catalog/CatalogContent.tsx` | Simplify filter logic | P1 |
| `components/product/ProductInfo.tsx` | Lead with monthly, add timeline | P0 |
| `app/produktas/[slug]/page.tsx` | Add PackageSelector, FAQ sections | P0 |
| `components/configurator/ConfiguratorForm.tsx` | Add step logic | P0 |
| `stores/configurator.ts` | Add currentStep, package state | P0 |
| `app/krepselis/page.tsx` | Prominent financing box | P0 |
| `components/cart/UpsellEngine.tsx` | Expand items, add badges | P1 |
| `app/(checkout)/atsiskaitymas/page.tsx` | Guest checkout messaging | P0 |
| `components/checkout/PaymentMethods.tsx` | Išsimokėtinai first | P0 |
| `components/checkout/OrderSummary.tsx` | Delivery timeline | P1 |

### Files to Create

| File | Purpose | Priority |
|------|---------|----------|
| `app/raskite-savo-kubila/page.tsx` | Quiz Step 1 | P0 |
| `app/raskite-savo-kubila/talpa/page.tsx` | Quiz Step 2 | P0 |
| `app/raskite-savo-kubila/dizainas/page.tsx` | Quiz Step 3 | P0 |
| `app/raskite-savo-kubila/rezultatai/page.tsx` | Quiz Results | P0 |
| `components/quiz/QuizLayout.tsx` | Shared quiz layout | P0 |
| `components/quiz/QuizOption.tsx` | Option card component | P0 |
| `components/quiz/QuizProgress.tsx` | Progress indicator | P0 |
| `components/product/PackageSelector.tsx` | Package selection | P0 |
| `components/product/ProductFAQ.tsx` | FAQ accordion | P0 |
| `components/product/StickyMobileCTA.tsx` | Mobile CTA bar | P0 |
| `components/configurator/WizardProgress.tsx` | Configurator progress | P0 |
| `components/configurator/WizardNavigation.tsx` | Back/Next buttons | P0 |
| `components/configurator/ConfigPackageStep.tsx` | Package step | P0 |
| `components/product/ProductPositioning.tsx` | "Kodėl šis modelis" | P1 |
| `components/product/ValueStacking.tsx` | Value breakdown | P2 |
| `components/cart/ExitIntentModal.tsx` | Email capture | P1 |
| `lib/quiz/quiz-logic.ts` | Quiz filtering logic | P0 |

### Files to Delete/Deprecate

| File | Reason |
|------|--------|
| `components/marketing/ProductFinderQuiz.tsx` | Replace with page-based quiz |

---

*Document End*
