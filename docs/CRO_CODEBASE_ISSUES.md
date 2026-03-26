# CRO Specification vs. Codebase: Critical Issues

**Analysis Date:** 2026-03-26
**Status:** 16 issues identified, 0 fixed

---

## Executive Summary

The current codebase has significant gaps compared to the CRO specification. The most critical issue is that **the primary conversion path (packages) doesn't exist** - users can ONLY configure, which is the 15% power-user path. The 85% "just sell me something" path is completely missing.

---

## P0: CRITICAL (Launch Blockers)

### Issue #1: "Lizingas" Terminology Still in Code

**Problem:** The user explicitly stated "lizingas" sounds expensive and like a GOTCHA. Must use "išsimokėtinai" instead.

**Files affected:**
- `components/product/ProductInfo.tsx` line 79: `Lizingas nuo`
- `components/checkout/PaymentMethods.tsx` line 39: `Lizingas (Mokėjimas dalimis)`

**Fix:**
```typescript
// ProductInfo.tsx line 79
- Lizingas nuo
+ Išsimokėtinai nuo

// PaymentMethods.tsx line 39
- title: "Lizingas (Mokėjimas dalimis)",
+ title: "Išsimokėtinai",
```

---

### Issue #2: Payment Methods Order Wrong

**Problem:** Checkout shows payment options in wrong order. Išsimokėtinai should be FIRST with recommendation badge.

**File:** `components/checkout/PaymentMethods.tsx` lines 24-44

**Current order:**
1. Banklink (first)
2. Card (second)
3. Leasing (third, but highlighted)

**Required order:**
1. Išsimokėtinai (★ REKOMENDUOJAMA badge)
2. Banklink
3. Card

**Fix:** Reorder `paymentOptions` array and add badge:
```typescript
const paymentOptions: PaymentOption[] = [
  {
    id: "leasing",
    title: "Išsimokėtinai",
    description: "Nuo X €/mėn – Be pradinio įnašo",
    icon: "payments",
    highlighted: true,
    badge: "★ REKOMENDUOJAMA",  // ADD THIS
  },
  {
    id: "banklink",
    title: "Bankinis pavedimas",
    description: "Mokėjimas per banką",
    icon: "account_balance",
  },
  {
    id: "card",
    title: "Mokėjimo kortelė",
    description: "Visa, Mastercard",
    icon: "credit_card",
  },
];
```

---

### Issue #3: Monthly Payment NOT Leading

**Problem:** Full price shown first everywhere. CRO spec requires monthly payment as PRIMARY display.

**Files affected:**
- `components/product/ProductInfo.tsx` lines 65-86
- `components/catalog/ProductCard.tsx` lines 83-88 (NO monthly at all!)
- `components/marketing/Bestsellers.tsx` lines 94-99

**Current (ProductInfo):**
```
Bazine kaina nuo         <- First, big
2 890 €                  <- Primary display
Lizingas nuo 80 €/mėn    <- Secondary, small
```

**Required:**
```
nuo 80 €/mėn             <- First, PRIMARY, big
arba 2 890 € viso        <- Secondary, small
```

**Current (ProductCard) - lines 83-88:**
```tsx
<span className="text-[10px] text-white/60">Investicija</span>
<span className="text-white font-medium text-lg">{formattedPrice}</span>
// NO MONTHLY PAYMENT SHOWN!
```

**Fix:** Add monthly payment and make it primary:
```tsx
<span className="text-white font-medium text-lg">
  nuo {formatMonthlyPayment(product.basePrice)}
</span>
<span className="text-[10px] text-white/60">
  arba {formattedPrice} viso
</span>
```

---

### Issue #4: Quiz is Modal, Not Full-Screen Pages

**Problem:** Quiz opens as a modal popup from Hero.tsx. CRO spec requires full-screen page-based flow.

**Current implementation:**
- `components/marketing/Hero.tsx` line 33-35: `onClick={() => setIsQuizOpen(true)}`
- `components/marketing/ProductFinderQuiz.tsx`: Modal component with internal state

**Required implementation:**
- `app/raskite-savo-kubila/page.tsx` - Step 1: Purpose
- `app/raskite-savo-kubila/talpa/page.tsx` OR query params - Step 2: Capacity
- `app/raskite-savo-kubila/dizainas/page.tsx` OR query params - Step 3: Design
- `app/raskite-savo-kubila/rezultatai/page.tsx` - Results

**Why this matters:**
- Full-screen pages have better conversion (no modal dismissal)
- URL-based state enables sharing, back button, analytics
- Feels like a "journey" not a "popup"

**Fix:**
1. Change Hero.tsx CTA from `onClick` to `<Link href="/raskite-savo-kubila">`
2. Create new page components at `/app/raskite-savo-kubila/`
3. Optionally keep modal version for secondary entry points

---

### Issue #5: Product Page Missing Package Selector (CRITICAL!)

**Problem:** Product page only has "Konfiguruoti" CTA. There's NO package selector (Bazinis/Populiarus/Premium).

**This is the BIGGEST conversion killer.** The CRO spec says:
- 85% of users should buy via packages (quick decision)
- 15% should use detailed configurator (power users)

**Current flow:**
```
Product Page → [KONFIGURUOTI] → Configurator → Cart
             ↑
             Only option!
```

**Required flow:**
```
Product Page → [BAZINIS]    → Cart (direct!)
             → [POPULIARUS] → Cart (direct!)  ← 73% choose this
             → [PREMIUM]    → Cart (direct!)
             → [Konfigūruoti detaliau] → Configurator → Cart
```

**File:** `app/produktas/[slug]/page.tsx`

**Missing components:**
- `components/product/PackageSelector.tsx`
- `components/product/PackageCard.tsx`

**Fix:** Add PackageSelector between ProductGallery and ProductInfo with 3 package options that add directly to cart.

---

### Issue #6: Bestsellers Component Price Order

**Problem:** Bestsellers shows full price first, monthly as afterthought.

**File:** `components/marketing/Bestsellers.tsx` lines 94-99

**Current:**
```tsx
<span className="text-3xl font-headline">
  Nuo {featured.price} €       // FULL PRICE FIRST
</span>
<p className="text-xs text-gray-400 mt-1">
  arba {featured.monthlyPayment} €/mėn. skaidant mokėjimą  // Monthly secondary
</p>
```

**Required:**
```tsx
<span className="text-3xl font-headline">
  nuo {featured.monthlyPayment} €/mėn    // MONTHLY FIRST
</span>
<p className="text-xs text-gray-400 mt-1">
  arba {featured.price} € viso           // Full price secondary
</p>
```

---

## P1: HIGH IMPACT

### Issue #7: Product Page Missing FAQ

**Problem:** No FAQ accordion on product pages.

**File:** `app/produktas/[slug]/page.tsx`

**Missing:** `components/product/ProductFAQ.tsx`

**Required FAQs (from CRO spec):**
1. "Ar reikia leidimų?"
2. "Kiek kainuoja eksploatacija?"
3. "Kaip vyksta pristatymas?"
4. "Ar galima išsimokėtinai?"
5. "Kokia garantija?"

---

### Issue #8: Product Page Missing Positioning Section

**Problem:** No "Kodėl šis modelis?" or "Tinka jums, jei:" section.

**File:** `app/produktas/[slug]/page.tsx`

**Missing:** `components/product/ProductPositioning.tsx`

**Required content per product:**
- Headline: "Kodėl [Product Name]?"
- Narrative paragraph (italic)
- "Tinka jums, jei:" bullet list

---

### Issue #9: Product Page Missing Sticky Mobile CTA

**Problem:** No fixed bottom bar with price + CTA on mobile.

**File:** `app/produktas/[slug]/page.tsx`

**Missing:** `components/product/StickyMobileCTA.tsx`

**Required (lg:hidden):**
```
┌─────────────────────────────────────────┐
│  80 €/mėn              [  Į KREPŠELĮ  ] │
│  arba 2 890 € viso                      │
└─────────────────────────────────────────┘
```

---

### Issue #10: Cart Missing Monthly Payment Display

**Problem:** Cart order summary shows only total, no monthly equivalent.

**File:** `app/krepselis/page.tsx` lines 117-125

**Current:**
```tsx
<span className="text-3xl font-headline">{formatPrice(total)}</span>
// No monthly!
```

**Required:**
```tsx
<span className="text-3xl font-headline">{formatPrice(total)}</span>
<p className="text-sm text-gray-500">
  arba {formatMonthlyPayment(total)} × 36 mėn
</p>
```

---

### Issue #11: Cart Missing Delivery Timeline

**Problem:** No "per 2-4 savaites" messaging in cart.

**File:** `app/krepselis/page.tsx`

**Required addition to trust badges:**
```tsx
<div className="flex items-center gap-2 text-xs text-gray-500">
  <Icon name="schedule" size="sm" className="text-primary" />
  <span>Pristatymas per 2-4 savaites</span>
</div>
```

---

### Issue #12: Configurator Missing Package as Step 1

**Problem:** Configurator jumps to wood/color selection. Should start with package selection.

**File:** `stores/configurator.ts`

**Current state:**
- Has `currentStep` but no `selectedPackage`
- Steps are: wood → color → extras → review

**Required:**
- Add `selectedPackage: 'bazinis' | 'populiarus' | 'premium' | null`
- Step 1: Package selection
- Step 2: Wood
- Step 3: Color
- Step 4: Extras
- Step 5: Review

---

## P2: MEDIUM IMPACT

### Issue #13: No Exit Intent Modal

**Problem:** `ExitIntentModal.tsx` doesn't exist. No email capture on cart abandonment.

**Files needed:**
- `components/marketing/ExitIntentModal.tsx`
- Exit intent listener hook

---

### Issue #14: Cart Upsells Missing Social Proof

**Problem:** Upsell items don't have "★ 87% renkasi" badges.

**File:** `components/cart/UpsellEngine.tsx`

**Required:** Add badge prop to upsell items with popularity data.

---

### Issue #15: Guest Checkout Messaging Missing

**Problem:** Checkout doesn't prominently show "Užsakymas be registracijos".

**File:** `app/(checkout)/atsiskaitymas/page.tsx`

**Required addition:**
```tsx
<div className="bg-surface-container-low p-6 mb-8 border-l-4 border-primary">
  <p className="font-medium">
    Užsakymas be registracijos – tik 2 žingsniai
  </p>
</div>
```

---

### Issue #16: Products Missing Package Data

**Problem:** Product JSON doesn't have `packages` array.

**File:** `data/products.json` (or scraped products)

**Required per product:**
```json
{
  "packages": [
    {
      "id": "bazinis",
      "name": "Bazinis",
      "priceModifier": 0,
      "included": ["Kubilas", "Krosnelė", "Standartinis dangtis"]
    },
    {
      "id": "populiarus",
      "name": "Populiarus",
      "priceModifier": 490,
      "included": ["...Bazinis", "Termo dangtis", "Laiptai", "Priežiūros rinkinys"],
      "badge": "★ 73% RENKASI",
      "isRecommended": true
    },
    {
      "id": "premium",
      "name": "Premium",
      "priceModifier": 1090,
      "included": ["...Populiarus", "Termo mediena", "LED apšvietimas", "Masažas"]
    }
  ]
}
```

---

## Implementation Priority

| Priority | Issues | Est. Hours |
|----------|--------|------------|
| P0 (Week 1) | #1, #2, #3, #4, #5, #6 | 20h |
| P1 (Week 2) | #7, #8, #9, #10, #11, #12 | 14h |
| P2 (Week 3) | #13, #14, #15, #16 | 10h |

**Total: ~44 hours of development work**

---

## Quick Wins (< 30 min each)

1. Issue #1: Find/replace "Lizingas" → "Išsimokėtinai" in 2 files
2. Issue #2: Reorder array in PaymentMethods.tsx
3. Issue #6: Swap price order in Bestsellers.tsx
4. Issue #10: Add monthly payment line in cart summary
5. Issue #11: Add delivery timeline badge in cart

---

*Document End*
