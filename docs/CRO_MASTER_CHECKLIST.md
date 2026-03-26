# MojoDas Spa: CRO Implementation Master Checklist

**Last Updated:** 2026-03-26

---

## Quick Links to Documentation

| Document | Purpose |
|----------|---------|
| `CRO_OPTIMIZATION.md` | Original CRO requirements and mockups |
| `BRANDBOOK.md` | Brand guidelines and design system |
| `CRO_FUNNEL_DESIGN.md` | Full funnel redesign specification |
| `IMPLEMENTATION_GAPS.md` | Detailed file-by-file changes needed |
| `data/pricing-configurations.csv` | All product/addon pricing data |

---

## Implementation Status Overview

### Phase Status

| Phase | Status | Progress |
|-------|--------|----------|
| Quiz (Full-Screen Pages) | 🔴 Not Started | 0% |
| Homepage Updates | 🟡 Partial | 60% |
| Catalog Simplification | 🟡 Partial | 50% |
| Product Page Packages | 🔴 Not Started | 10% |
| Configurator Wizard | 🔴 Not Started | 30% |
| Cart Upsells | 🟡 Partial | 50% |
| Checkout Optimization | 🟡 Partial | 55% |

---

## Priority 0 (Launch Blockers)

### P0-1: Monthly Payment as Primary Price
- [ ] `ProductCard.tsx` - Lead with "nuo X €/mėn"
- [ ] `Bestsellers.tsx` - Lead with "nuo X €/mėn"
- [ ] `ProductInfo.tsx` - Lead with "nuo X €/mėn"
- [ ] `Hero.tsx` - Add monthly to subheadline

### P0-2: Quiz Full-Screen Pages
- [ ] Create `app/raskite-savo-kubila/page.tsx` (Step 1: Purpose)
- [ ] Create `app/raskite-savo-kubila/talpa/page.tsx` (Step 2: Capacity)
- [ ] Create `app/raskite-savo-kubila/dizainas/page.tsx` (Step 3: Design)
- [ ] Create `app/raskite-savo-kubila/rezultatai/page.tsx` (Results)
- [ ] Create `components/quiz/QuizLayout.tsx`
- [ ] Create `components/quiz/QuizOption.tsx`
- [ ] Create `components/quiz/QuizProgress.tsx`
- [ ] Create `lib/quiz/quiz-logic.ts`
- [ ] Remove modal from `Hero.tsx`, change to Link

### P0-3: Product Page Packages
- [ ] Create `components/product/PackageSelector.tsx`
- [ ] Add to `app/produktas/[slug]/page.tsx` after hero
- [ ] Define package data in `data/packages.json` or types

### P0-4: Product Page FAQ
- [ ] Create `components/product/ProductFAQ.tsx`
- [ ] Add 5 standard FAQs from CRO spec
- [ ] Add to product page layout

### P0-5: Mobile Sticky CTA
- [ ] Create `components/product/StickyMobileCTA.tsx`
- [ ] Add to product page (lg:hidden)
- [ ] Show price + monthly + CTA button

### P0-6: Checkout - Išsimokėtinai First
- [ ] Update `PaymentMethods.tsx` - Move išsimokėtinai to option #1
- [ ] Add "★ REKOMENDUOJAMA" badge to išsimokėtinai
- [ ] Add payment term selector (24/36/48 mėn)

### P0-7: Checkout - Guest Messaging
- [ ] Add "Užsakymas be registracijos" banner
- [ ] Add phone support CTA at bottom

---

## Priority 1 (High Impact)

### P1-1: Configurator Step-by-Step Wizard
- [ ] Add `currentStep` and `selectedPackage` to `stores/configurator.ts`
- [ ] Create `components/configurator/WizardProgress.tsx`
- [ ] Create `components/configurator/WizardNavigation.tsx`
- [ ] Create `components/configurator/ConfigPackageStep.tsx`
- [ ] Update `ConfiguratorForm.tsx` with conditional rendering
- [ ] Update `ConfigSummary.tsx` for final review step

### P1-2: Catalog Filter Simplification
- [ ] Remove "Krosnelė" (heater type) filter
- [ ] Remove "Savybės" (features) filter
- [ ] Add "Visi" as first capacity option
- [ ] Add "Šalčio Terapija" to shape options
- [ ] Update grid from 4 cols to 2 cols

### P1-3: Cart Upsells Enhancement
- [ ] Expand `UpsellEngine.tsx` to 6+ items
- [ ] Add "★ X% renkasi" badges
- [ ] Add value propositions to each item

### P1-4: Product Positioning Section
- [ ] Create `components/product/ProductPositioning.tsx`
- [ ] Add "Kodėl šis modelis?" content
- [ ] Add "Tinka jums, jei:" bullet points

### P1-5: Delivery Timeline Messaging
- [ ] Add "per 2-4 savaites" to product page
- [ ] Add to checkout `OrderSummary.tsx`
- [ ] Add to cart page

---

## Priority 2 (Medium Impact)

### P2-1: Value Stacking
- [ ] Create `components/product/ValueStacking.tsx`
- [ ] Show included value breakdown
- [ ] Display "Sutaupote: X €" savings

### P2-2: Exit Intent Email Capture
- [ ] Create `components/cart/ExitIntentModal.tsx`
- [ ] Add exit intent listener
- [ ] Create API endpoint for email capture

### P2-3: Quiz Banner Enhancement
- [ ] Update `QuizBanner.tsx` with larger typography
- [ ] Add descriptive subtext
- [ ] Make CTA more prominent

### P2-4: Trust Strip Reuse
- [ ] Import `TrustStrip.tsx` in layout or footer
- [ ] Display on all pages above footer

---

## Priority 3 (Nice to Have)

### P3-1: Product Comparison Tool
- [ ] Create `components/product/ProductComparison.tsx`
- [ ] Add "Palyginti" button to product cards
- [ ] Side-by-side comparison modal/page

### P3-2: Urgency/Scarcity Messaging
- [ ] Create `components/marketing/UrgencyBanner.tsx`
- [ ] Implement seasonal campaigns
- [ ] Add delivery-based urgency

### P3-3: Social Proof Badges
- [ ] Add "★ Dauguma renkasi" throughout
- [ ] Add "73% renkasi" to Populiarus package
- [ ] Add to popular configurator options

---

## Data Updates Needed

### Product Data
- [ ] Add `packages` array to each product
- [ ] Add `positioning` object to each product
- [ ] Verify `monthlyPayment` calculated correctly (price/36)

### Package Definitions
- [ ] Define Bazinis contents per product
- [ ] Define Populiarus contents per product (+€490)
- [ ] Define Premium contents per product (+€1090)

### FAQ Content
- [ ] Write product-specific FAQ overrides (if needed)
- [ ] Verify standard FAQ answers are accurate

---

## Testing Checklist

### Quiz Flow
- [ ] Step 1 → Step 2 navigation
- [ ] Step 2 → Step 3 navigation
- [ ] Step 3 → Results navigation
- [ ] Back button functionality
- [ ] Mobile swipe (if implemented)
- [ ] Results show correct filtered products
- [ ] "Šalčio terapija" path shows Arctic products
- [ ] "Ofuro" path goes to product page

### Package Selection
- [ ] Bazinis adds to cart correctly
- [ ] Populiarus adds to cart correctly
- [ ] Premium adds to cart correctly
- [ ] Prices calculate correctly
- [ ] Monthly payments calculate correctly

### Configurator Wizard
- [ ] Step 1 (Package) works
- [ ] Step 2 (Wood) works
- [ ] Step 3 (Color) works
- [ ] Step 4 (Extras) works
- [ ] Step 5 (Review) works
- [ ] Navigation between steps
- [ ] Price updates live
- [ ] Final add to cart works

### Checkout Flow
- [ ] Išsimokėtinai selection works
- [ ] Term selector calculates correctly
- [ ] Bank payment works
- [ ] Card payment works
- [ ] Guest checkout (no account required)
- [ ] Order submission works

### Mobile
- [ ] Quiz responsive on mobile
- [ ] Sticky CTA visible and works
- [ ] Package cards stack vertically
- [ ] Configurator steps work on mobile
- [ ] Checkout form mobile-friendly

---

## Analytics Events to Track

### Quiz
- [ ] quiz_started
- [ ] quiz_step_completed (with step number)
- [ ] quiz_completed
- [ ] quiz_result_clicked

### Product Page
- [ ] package_selected (with package ID)
- [ ] package_added_to_cart
- [ ] configure_clicked

### Configurator
- [ ] configurator_started
- [ ] configurator_step_completed (with step)
- [ ] configurator_completed
- [ ] configurator_abandoned (with step)

### Checkout
- [ ] checkout_started
- [ ] payment_method_selected (with method)
- [ ] payment_term_selected (with term)
- [ ] checkout_completed
- [ ] checkout_abandoned (with step)

---

## Success Metrics Targets

| Metric | Current (Est.) | Target |
|--------|----------------|--------|
| Quiz completion | N/A | 70%+ |
| Results → Product | N/A | 60%+ |
| Product → Cart | 5% | 15%+ |
| Cart → Checkout | 40% | 70%+ |
| Checkout completion | 30% | 60%+ |
| **Overall conversion** | 0.5% | 3%+ |
| Išsimokėtinai selection | Unknown | 60%+ |
| Package (vs configure) | N/A | 85%+ |

---

## Notes

### Key Psychological Triggers (Apply Throughout)

1. **Lead with monthly payment** - Always show "nuo X €/mėn" first
2. **Social proof** - "★ 73% renkasi", "★ Dauguma renkasi"
3. **Risk reversal** - "14 dienų grąžinimo garantija"
4. **Specificity** - Concrete numbers: "per 2-4 savaites", "~35 €/mėn"
5. **Value stacking** - Show what's included with € values
6. **Authority** - "Gaminama Lietuvoje", "5 metų garantija"
7. **Scarcity** - Delivery timeline, not fake stock

### Brand Aesthetic Reminders

- Use `font-headline` for product names, section headers
- Use `italic` for narrative/positioning text
- Use `bg-surface-container-low` for cards
- Use `border-primary` for selected states
- Sharp corners (`rounded-sm` or `rounded-none`)
- Subtle borders (`border-outline-variant/30`)
- Framer Motion for transitions (0.3-0.5s duration)

---

*Checklist End*
