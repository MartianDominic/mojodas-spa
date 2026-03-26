# Lux Spa Nature: Complete CRO Specification

## The Definitive Implementation Guide

**Version:** 4.0 (Complete with Page-Specific Analysis)
**Date:** 2026-03-26
**Goal:** Make purchasing feel like an impulse buy. Only friction = financing approval.

---

# TABLE OF CONTENTS

## Parts 1-20: Core Specification

1. [Philosophy & Psychology](#part-1-philosophy--psychology)
2. [User Personas & Objections](#part-2-user-personas--objections)
3. [Complete User Journey Map](#part-3-complete-user-journey-map)
4. [Homepage Specification](#part-4-homepage-specification)
5. [Quiz Flow Specification](#part-5-quiz-flow-specification)
6. [Results Page Specification](#part-6-results-page-specification)
7. [Product Page Specification](#part-7-product-page-specification)
8. [Configurator Specification](#part-8-configurator-specification)
9. [Cart Specification](#part-9-cart-specification)
10. [Checkout Specification](#part-10-checkout-specification)
11. [Post-Purchase Specification](#part-11-post-purchase-specification)
12. [Email Sequences](#part-12-email-sequences)
13. [Exit Intent & Recovery](#part-13-exit-intent--recovery)
14. [Component Library](#part-14-component-library)
15. [Data Models](#part-15-data-models)
16. [API Endpoints](#part-16-api-endpoints)
17. [Analytics & Tracking](#part-17-analytics--tracking)
18. [Copy & Microcopy](#part-18-copy--microcopy)
19. [Animations & Transitions](#part-19-animations--transitions)
20. [Mobile-Specific Behaviors](#part-20-mobile-specific-behaviors)

## Appendices: Implementation Details

- [Appendix A: Quiz Data & Filtering Logic](#appendix-a-quiz-data--filtering-logic)
- [Appendix B: Package System Data](#appendix-b-package-system-data)
- [Appendix C: Analytics Event Schema](#appendix-c-analytics-event-schema)
- [Appendix D: Gap Analysis vs Current Codebase](#appendix-d-gap-analysis-vs-current-codebase)
- [Appendix E: File-by-File Changes](#appendix-e-file-by-file-changes)
- [Appendix F: Page-Specific CRO Analysis](#appendix-f-page-specific-cro-analysis)
  - F.1 Homepage Components (Hero, ProcessSteps, CategoryGrid, Bestsellers, etc.)
  - F.2 Catalog Page (Layout, Sidebar, ProductCard)
  - F.3 B2B Page (Form Bug, Social Proof)
  - F.4 Cart & Checkout (Payment Order, Monthly Visibility)
  - F.5 Contact Page (Phone Prominence, Form Fix)
  - F.6 Conversion Impact Estimates
  - F.7 Implementation Priority
- [Appendix G: Realistic Sections (No Fake Social Proof)](#appendix-g-realistic-section-structure-be-fake-social-proof)
  - G.1 What We Have (Real)
  - G.2 What We Don't Have (Yet)
  - G.3 Homepage: Real Sections (9 sections)
  - G.4 B2B Page: Real Sections (8 sections)
  - G.5 Guarantee Placement Strategy
  - G.6 Future Plan: When We Have Social Proof
  - G.7 Contact Placeholders
  - G.8 Product Page CRO: Package Selector (CRITICAL!)
  - G.9 Implementation Phase Plan

---

# PART 1: PHILOSOPHY & PSYCHOLOGY

## 1.1 The Core Insight

**This is NOT e-commerce. This is a consultation that ends in a purchase.**

A €2,000-5,000 hot tub cannot be an impulse buy in the traditional sense. But we can make it FEEL like one by:

1. **Eliminating decision fatigue** - Quiz reduces 16 products to 2-3
2. **Pre-making decisions** - Packages eliminate configuration paralysis
3. **Normalizing the price** - Monthly payments make it feel affordable
4. **Building trust instantly** - Guarantees remove risk perception
5. **Creating momentum** - Micro-commitments lead to macro-commitment

## 1.2 The Masters We're Channeling

### Frank Kern: Survey Funnel Methodology
- **Segment first, sell second** - Quiz identifies who they are before showing products
- **Results in Advance** - Show them the outcome (relaxation, family time) not the product
- **Micro-commitments** - Each quiz step is a small "yes" leading to the big "yes"

### David Ogilvy: Advertising Principles
- **Headlines carry 80% of the weight** - Every headline must stop the scroll
- **Specificity builds credibility** - "per 2-4 savaites" not "greitai"
- **Long copy sells** - For high-ticket items, more information = more trust
- **Promise a benefit** - "Jūsų namų SPA" not "Mediniai kubilai"

### Dan Kennedy: Direct Response
- **Every element must generate a response** - No passive content
- **Risk reversal** - "14 dienų grąžinimo garantija" removes fear
- **Reason why** - Explain WHY the price, WHY the guarantee, WHY now
- **Urgency without fakery** - Delivery timelines, not fake stock counters

### Robert Cialdini: Influence Principles

| Principle | Application |
|-----------|-------------|
| **Reciprocity** | Free quiz gives value before asking for purchase |
| **Commitment/Consistency** | Quiz answers create identity ("I'm a family person") |
| **Social Proof** | "★ 73% renkasi" on packages |
| **Authority** | "Gaminama Lietuvoje", "5 metų garantija" |
| **Liking** | Lifestyle imagery shows people like them |
| **Scarcity** | Delivery timeline creates genuine urgency |

### Daniel Kahneman: System 1/System 2

| System | Trigger | Application |
|--------|---------|-------------|
| **System 1** (Fast, emotional) | Imagery, social proof, monthly price | Drive initial desire |
| **System 2** (Slow, rational) | Specs, FAQ, guarantees | Support the decision |

The key: **System 1 decides, System 2 justifies.** Lead with emotion, support with logic.

### BJ Fogg: Behavior Model

**Behavior = Motivation × Ability × Prompt**

| Factor | Strategy |
|--------|----------|
| **Motivation** | Lifestyle imagery, pain points addressed, social proof |
| **Ability** | Reduce steps, pre-select options, monthly payments |
| **Prompt** | Clear CTAs, sticky bars, timely nudges |

## 1.3 The Psychological Journey

```
STAGE 1: UNAWARE
"I want to relax but don't know how"
↓ (Trigger: Ad, search, referral)

STAGE 2: PROBLEM-AWARE
"A hot tub might be nice"
↓ (Homepage hero: emotional hook)

STAGE 3: SOLUTION-AWARE
"Lux Spa Nature makes hot tubs in Lithuania"
↓ (Quiz: segment and qualify)

STAGE 4: PRODUCT-AWARE
"The Grande Round In fits my family"
↓ (Results + Product page: build desire)

STAGE 5: MOST-AWARE
"I want THIS tub with THIS package"
↓ (Package selection: reduce friction)

STAGE 6: PURCHASE
"I can afford 94 €/month"
↓ (Checkout: only friction = financing approval)

STAGE 7: POST-PURCHASE
"I made the right choice"
(Confirmation + emails: reinforce decision)
```

## 1.4 The "Impulse Buy" Framework

For a €3,000+ purchase to feel like an impulse buy:

1. **Price must feel small** → "94 €/mėn" not "3,380 €"
2. **Decision must feel obvious** → "★ 73% renkasi" tells them what to choose
3. **Risk must feel zero** → "14 dienų grąžinimo garantija"
4. **Process must feel fast** → 3 quiz questions, 1 package selection, checkout
5. **Doubt must be pre-answered** → FAQ handles every objection
6. **Support must feel available** → Phone number visible everywhere

---

# PART 2: USER PERSONAS & OBJECTIONS

## 2.1 Primary Persona: "Jonas" (The Family Man)

**Demographics:**
- Male, 42 years old
- Income: €4,500/month net
- Location: Vilnius suburb, owns house with garden
- Family: Married, 2 kids (8 and 12)

**Psychographics:**
- Works hard, values quality time with family
- Successful but time-poor
- Risk-averse on big purchases
- Needs to justify expense to wife
- "Made in Lithuania" matters to him

**Journey to Purchase:**
1. Sees Facebook ad showing family in hot tub
2. Thinks "that looks nice" → clicks
3. Overwhelmed by 16 products → leaves
4. Retargeting ad brings him back
5. Takes quiz → sees 3 relevant options
6. "Grande Round In fits us perfectly"
7. Picks "Populiarus" package (what most people choose)
8. "94 €/mėn? That's less than we spend on restaurants"
9. Discusses with wife → she agrees
10. Applies for financing → approved
11. Orders → delivered in 3 weeks
12. Family enjoys → tells friends

**His Objections:**

| Objection | Where Addressed | How |
|-----------|-----------------|-----|
| "It's too expensive" | Everywhere | Lead with monthly: "nuo 81 €/mėn" |
| "Which one is right for us?" | Quiz + Results | "Jums rekomenduojame" with reasons |
| "Will it fit our garden?" | Product page + FAQ | Dimensions, "leidimo nereikia" |
| "Is it worth the money?" | Value stacking | Show €3,670 value for €2,890 |
| "What if we don't like it?" | Trust badges + FAQ | "14 dienų grąžinimo garantija" |
| "Can we afford it?" | Financing prominent | "Be pradinio įnašo, 94 €/mėn" |
| "Is it good quality?" | Trust + specs | "Gaminama Lietuvoje, 5m garantija" |
| "How hard is maintenance?" | FAQ | "~35 €/mėn eksploatacija" |

## 2.2 Secondary Persona: "Tomas" (The Athlete)

**Demographics:**
- Male, 35 years old
- Income: €6,000/month
- Location: Kaunas apartment with terrace
- Single, serious about fitness/recovery

**Psychographics:**
- Knows about cold therapy benefits
- Has done research on ice baths
- Willing to pay for quality
- Values performance and recovery
- Tech-savvy, reads specs

**Journey:**
- Searches "šalčio terapija Lietuva"
- Takes quiz → selects "Šalčio terapija"
- Sees Arctic vs Arctic Chiller comparison
- Chooses Arctic Chiller (wants active cooling)
- Pays full price (doesn't need financing)

**His Objections:**

| Objection | Where Addressed | How |
|-----------|-----------------|-----|
| "Does it actually cool?" | Product specs | "Palaiko 3-8°C temperatūrą" |
| "Arctic vs Arctic Chiller?" | Results page | Side-by-side comparison |
| "Is it professional grade?" | Specs + positioning | "Profesionalams ir sportininkams" |

## 2.3 Tertiary Persona: "Rūta" (The Spouse)

**Who she is:** Jonas's wife. She's not the primary searcher but has veto power.

**What she needs to see:**
- It's not frivolous ("šeimos laikas kartu")
- It's affordable ("94 €/mėn = vienas restoranas")
- It's safe ("5 metų garantija")
- It's practical ("montavimas įskaičiuotas")
- Others do it ("★ 73% renkasi")

**Where she appears:**
- Jonas shares the product page link with her
- She needs to quickly see: price, what's included, guarantee
- PackageSelector shows her it's a complete solution

## 2.4 Complete Objection Matrix

| Objection | Severity | Where Handled | Copy/Element |
|-----------|----------|---------------|--------------|
| "Too expensive" | CRITICAL | Everywhere | Monthly payment first |
| "Which product?" | CRITICAL | Quiz + Results | Personalized recommendations |
| "Can I afford it?" | CRITICAL | Checkout | Išsimokėtinai first, "Be pradinio" |
| "What if wrong choice?" | HIGH | Product + Checkout | "14 dienų grąžinimas" |
| "Will it last?" | HIGH | Trust badges | "5 metų garantija" |
| "Installation?" | HIGH | Trust badges + FAQ | "Montavimas įskaičiuotas" |
| "Permits needed?" | MEDIUM | FAQ | "Daugeliu atvejų nereikia" |
| "Operating costs?" | MEDIUM | FAQ | "~35 €/mėn" breakdown |
| "Delivery time?" | MEDIUM | Product + Checkout | "per 2-4 savaites" |
| "Quality?" | MEDIUM | Trust badges | "Gaminama Lietuvoje" |
| "Space requirements?" | LOW | Specs | Exact dimensions |
| "Maintenance?" | LOW | FAQ | "Paprasta priežiūra" |

---

# PART 3: COMPLETE USER JOURNEY MAP

## 3.1 The Optimal Path (Target: 70% of conversions)

```
HOMEPAGE (5 seconds)
│
│ User sees: Lifestyle imagery, "nuo 56 €/mėn", quiz CTA
│ User thinks: "This looks nice and affordable"
│ User does: Clicks "RASKITE TOBULĄ KUBILĄ"
│
▼
QUIZ STEP 1: PURPOSE (10 seconds)
│
│ User sees: 3 lifestyle options with clear labels
│ User thinks: "I want relaxation with family"
│ User does: Clicks "Atsipalaidavimas su šeima"
│
▼
QUIZ STEP 2: CAPACITY (10 seconds)
│
│ User sees: 3 capacity options with pricing
│ User thinks: "We're 4-6 people with the kids"
│ User does: Clicks "4-6 asmenys"
│
▼
QUIZ STEP 3: DESIGN (10 seconds)
│
│ User sees: Round vs Square with images
│ User thinks: "Round is classic, I like it"
│ User does: Clicks "Apvalus"
│
▼
RESULTS PAGE (30 seconds)
│
│ User sees: "Jums rekomenduojame: Grande Round In"
│ User thinks: "They understand what I need"
│ User does: Clicks "PASIRINKTI ŠĮ MODELĮ"
│
▼
PRODUCT PAGE (60 seconds)
│
│ User sees: Gallery, packages, "81 €/mėn"
│ User thinks: "Populiarus has everything we need"
│ User does: Clicks "Į KREPŠELĮ" on Populiarus
│
▼
CART PAGE (30 seconds)
│
│ User sees: Order summary, upsells, financing
│ User thinks: "Maybe add the cover for heat retention"
│ User does: Adds termo dangtelis, clicks checkout
│
▼
CHECKOUT STEP 1: PAYMENT (30 seconds)
│
│ User sees: Išsimokėtinai as first option, "94 €/mėn"
│ User thinks: "That's very manageable monthly"
│ User does: Selects 36 month išsimokėtinai
│
▼
CHECKOUT STEP 2: DELIVERY (60 seconds)
│
│ User sees: Simple form, "be registracijos"
│ User thinks: "Easy, no account needed"
│ User does: Fills form, submits
│
▼
CONFIRMATION (10 seconds)
│
│ User sees: Order confirmed, next steps clear
│ User thinks: "Done! Excited for delivery"
│ User does: Checks email, downloads prep guide
│
▼
TOTAL TIME: ~4 minutes from homepage to purchase
```

## 3.2 Alternative Paths

### Path B: Cold Therapy Seeker
```
Homepage → Quiz Step 1 → "Šalčio terapija" →
Arctic vs Chiller Results → Product Page → Checkout
(Skips steps 2 and 3)
```

### Path C: Ofuro Seeker
```
Homepage → Quiz Step 1 → "Ofuro" →
Direct to Ofuro Product Page → Checkout
(Skips quiz entirely after step 1)
```

### Path D: Browser/Expert
```
Homepage → "Peržiūrėti modelius" → Catalog →
Filter by preference → Product Page → Configure in detail → Checkout
(Full control path, ~15% of users)
```

### Path E: Return Visitor
```
Email link / Direct URL → Product Page or Cart →
Continue where left off → Checkout
(Recovery path)
```

## 3.3 Friction Points & Mitigations

| Point | Friction | Mitigation |
|-------|----------|------------|
| Quiz start | "Is this worth my time?" | "3 klausimai • 20 sekundžių" |
| Quiz step 2 | "What if I'm not sure about capacity?" | Default middle option highlighted |
| Results | "Why this one?" | "Tinka jums, nes:" with reasons |
| Product page | "Too many options" | Packages reduce to 3 choices |
| Package choice | "Which package?" | "★ 73% renkasi" on Populiarus |
| Add to cart | "Am I ready?" | "Galite pakeisti vėliau" |
| Cart | "Is this final?" | "Dar ne užsakymas" messaging |
| Checkout | "Can I afford?" | Išsimokėtinai first with monthly |
| Financing | "Will I be approved?" | "Sprendimas per 15 min" |
| Final submit | "What if wrong?" | "14 dienų grąžinimas" visible |

---

# PART 4: HOMEPAGE SPECIFICATION

## 4.1 Page Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HEADER (Sticky on scroll)                                               │
├─────────────────────────────────────────────────────────────────────────┤
│ HERO SECTION (100vh)                                                    │
│ - Full-screen lifestyle video/image                                     │
│ - Headline + Subheadline                                                │
│ - Primary CTA (Quiz) + Secondary CTA (Catalog)                          │
│ - Trust Strip                                                           │
├─────────────────────────────────────────────────────────────────────────┤
│ SOCIAL PROOF BAR                                                        │
│ - "500+ kubilų Lietuvoje" (when we have data)                          │
├─────────────────────────────────────────────────────────────────────────┤
│ BESTSELLERS SECTION                                                     │
│ - 3 featured products with monthly pricing                              │
│ - "Populiariausi modeliai"                                              │
├─────────────────────────────────────────────────────────────────────────┤
│ CATEGORY GRID                                                           │
│ - 3 categories: Round, Square, Cold Therapy                            │
│ - Lifestyle imagery                                                     │
├─────────────────────────────────────────────────────────────────────────┤
│ PROCESS STEPS                                                           │
│ - How it works: Quiz → Choose → Configure → Enjoy                       │
├─────────────────────────────────────────────────────────────────────────┤
│ TRUST/AUTHORITY SECTION                                                 │
│ - Made in Lithuania story                                               │
│ - Engineering facts                                                     │
├─────────────────────────────────────────────────────────────────────────┤
│ FINAL CTA                                                               │
│ - Repeat quiz CTA                                                       │
│ - Consultation booking option                                           │
├─────────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

## 4.2 Hero Section Detail

### Visual
- **Background:** Full-screen lifestyle video or high-quality image
  - Scene: Family enjoying hot tub at twilight
  - Steam rising, warm lighting, kids splashing
  - Should evoke: warmth, togetherness, relaxation
- **Overlay:** Subtle dark gradient from bottom (for text legibility)
- **Aspect:** 16:9 video or hero image, object-fit: cover

### Copy

```
[Lithuanian - Primary]
Headline: "Jūsų namų SPA – per 2 savaites"
Subheadline: "Gaminama Lietuvoje. Nuo 56 €/mėn."

[Alternative Headlines for A/B Testing]
A: "Atsipalaiduokite namuose – su visa šeima"
B: "Lietuviškas kubilas jūsų kieme"
C: "SPA patirtis namuose. Nuo 56 €/mėn."
```

### CTAs

```
PRIMARY BUTTON:
Text: "RASKITE TOBULĄ KUBILĄ"
Subtext (below button): "3 klausimai • 20 sekundžių"
Link: /raskite-savo-kubila
Style: Large, white background, black text, uppercase tracking

SECONDARY BUTTON:
Text: "PERŽIŪRĖTI MODELIUS"
Link: /katalogas
Style: Outline, white border, white text
```

### Trust Strip

```
┌────────────────────────────────────────────────────────────────────────┐
│  🇱🇹 Gaminama      🛡️ 5 metų         🚚 Montavimas      💳 Išsimokėtinai    │
│     Lietuvoje       garantija         įskaičiuotas      nuo 56 €/mėn  │
└────────────────────────────────────────────────────────────────────────┘

Position: Bottom of hero section
Style: Semi-transparent dark bar, white icons and text
Mobile: 2x2 grid instead of horizontal
```

## 4.3 Bestsellers Section Detail

### Layout
```
Desktop: 1 large card (hero product) + 2 smaller cards
Mobile: Stacked vertically, all equal size
```

### Card Content

```
FEATURED PRODUCT (Large Card):
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  [Lifestyle image - Monaco Horizon in garden setting]                   │
│                                                                         │
│  ★ BESTSELERIS                                                         │
│                                                                         │
│  Monaco Horizon                                                         │
│  Flagmaninis modelis 8-10 asmenų                                       │
│                                                                         │
│  nuo 136 €/mėn                                                         │
│  arba 4 890 € vienkartinis                                             │
│                                                                         │
│  ✓ Pristatymas ir montavimas įskaičiuotas                              │
│  ✓ 5 metų garantija                                                    │
│                                                                         │
│  [      KONFIGŪRUOTI      ]                                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

SECONDARY PRODUCTS (Smaller Cards):
- Grande Round In: "Šeimoms" badge, 81 €/mėn
- Classic Round In: "Ekonomiškas" badge, 56 €/mėn
```

### Data Source
- Pull from products.json where `isFeatured: true`
- Sort by popularity/sales (when data available)

## 4.4 Category Grid Detail

### Layout
```
Desktop: 1 large tile (8 cols) + 2 small tiles (4 cols each)
Mobile: Stacked vertically
```

### Tiles

```
LARGE TILE: Apvalūs Kubilai (Round)
- Image: Aerial view of round hot tub
- Overlay: Dark gradient
- Text: "Apvalūs kubilai" + "Klasikinis dizainas"
- CTA: "Peržiūrėti →"
- Link: /katalogas?shape=round

SMALL TILE 1: Kvadratiniai (Square)
- Image: Modern square hot tub on terrace
- Text: "Kvadratiniai" + "Modernus stilius"
- Link: /katalogas?shape=square

SMALL TILE 2: Šalčio Terapija (Cold Therapy)
- Image: Person in ice bath, athlete aesthetic
- Text: "Šalčio terapija" + "Recovery ir sveikata"
- Link: /raskite-savo-kubila?purpose=cold
```

## 4.5 Process Steps Section

### Content

```
Section Title: "Kaip tai veikia?"

STEP 1:
Icon: [Quiz icon]
Title: "Atsakykite į 3 klausimus"
Description: "Padėsime rasti tobulą kubilą jūsų poreikiams."

STEP 2:
Icon: [Product icon]
Title: "Pasirinkite modelį"
Description: "Pamatykite rekomenduojamus variantus su kainomis."

STEP 3:
Icon: [Config icon]
Title: "Konfigūruokite"
Description: "Pasirinkite spalvą, medieną ir priedus."

STEP 4:
Icon: [Delivery icon]
Title: "Mėgaukitės"
Description: "Pristatome ir sumontuojame per 2-4 savaites."
```

### Design
- Horizontal on desktop, vertical on mobile
- Numbers or icons for each step
- Subtle connecting lines between steps
- Final CTA: "Pradėti →" links to quiz

## 4.6 Header Specification

### Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo]     Katalogas   Apie mus   Kontaktai   [Phone]   [Cart]   [CTA]│
└─────────────────────────────────────────────────────────────────────────┘

Logo: Lux Spa Nature wordmark, links to homepage
Nav Items:
- Katalogas → /katalogas
- Apie mus → /apie-mus (if exists) or anchor to trust section
- Kontaktai → /kontaktai

Phone: +370 XXX XXXXX (click-to-call on mobile)
Cart: Mini cart icon with item count badge
CTA: "Rasti Kubilą" small button → /raskite-savo-kubila
```

### Behavior
- **Transparent** on homepage hero (white text/icons)
- **Solid background** on scroll (dark or white based on page)
- **Sticky** on scroll down
- **Hidden on scroll down, visible on scroll up** (mobile optimization)

---

# PART 5: QUIZ FLOW SPECIFICATION

## 5.1 Architecture Decision

**FULL-SCREEN PAGES, NOT MODAL**

Rationale:
- Premium feel for €2,000+ purchase
- Better mobile experience
- Shareable/bookmarkable URLs
- Full analytics tracking
- Complete brand immersion

## 5.2 Route Structure

```
/raskite-savo-kubila                    → Step 1: Purpose
/raskite-savo-kubila?step=2&purpose=hot → Step 2: Capacity (dynamic)
/raskite-savo-kubila?step=3&...         → Step 3: Design (dynamic)
/raskite-savo-kubila/rezultatai?...     → Results (dynamic)
```

## 5.3 Shared Quiz Layout

### File: `components/quiz/QuizLayout.tsx`

```typescript
interface QuizLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  canGoBack: boolean;
  onBack?: () => void;
  title: string;
  subtitle?: string;
}
```

### Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [← Grįžti]                                            [X Close]         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                      ●━━━━━━━○━━━━━━━○                                  │
│                      1 / 3 žingsnis                                     │
│                                                                         │
│                                                                         │
│                 *{title}*                                               │
│                 {subtitle}                                              │
│                                                                         │
│                                                                         │
│                      {children - option cards}                          │
│                                                                         │
│                                                                         │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ Trust strip: 🇱🇹 Gaminama Lietuvoje • 🛡️ 5 metų garantija              │
└─────────────────────────────────────────────────────────────────────────┘

Background: Dark (obsidian) or light (bone) - consistent with brand
Min-height: 100vh
Content: Centered, max-width constrained
```

### Progress Indicator

```typescript
// Visual: ●━━━━━━━○━━━━━━━○
// Below: "1 / 3 žingsnis"

interface ProgressProps {
  current: number;
  total: number;
}

// Filled dot = completed or current
// Empty dot = future
// Line between dots animates on transition
```

## 5.4 Step 1: Purpose Selection

### Route: `/raskite-savo-kubila`

### Content

```
Title: "*Kokio potyrio ieškote?*"
Subtitle: "Pasirinkite, kas jums svarbiausia"

OPTIONS (3 cards):

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  OPTION 1: ATSIPALAIDAVIMAS SU ŠEIMA                                   │
│                                                                         │
│  [Lifestyle image: family in hot tub, warm lighting, smiles]           │
│                                                                         │
│  Šiltas vanduo, burbulai, bendras laikas su artimaisiais.              │
│                                                                         │
│  13 modelių • nuo 56 €/mėn                                             │
│                                                                         │
│  → Continues to Step 2                                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  OPTION 2: ŠALČIO TERAPIJA IR RECOVERY                                 │
│                                                                         │
│  [Image: athlete in ice bath, focused, recovery context]               │
│                                                                         │
│  Sporto atsigavimui, imuninei sistemai, psichinei sveikatai.           │
│                                                                         │
│  2 modeliai • nuo 42 €/mėn                                             │
│                                                                         │
│  → Skips to Cold Therapy Results                                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  OPTION 3: OFURO                                                        │
│                                                                         │
│  [Image: Japanese-style wooden tub, zen aesthetic]                     │
│                                                                         │
│  Japoniška maudymosi tradicija. Meditacija ir ramybė.                  │
│                                                                         │
│  1 modelis • 53 €/mėn                                                  │
│                                                                         │
│  → Skips directly to Ofuro product page                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Logic

```typescript
function handlePurposeSelect(purpose: 'hot' | 'cold' | 'ofuro') {
  switch (purpose) {
    case 'hot':
      // Continue to step 2
      router.push('/raskite-savo-kubila?step=2&purpose=hot');
      break;
    case 'cold':
      // Skip to cold therapy results
      router.push('/raskite-savo-kubila/rezultatai?purpose=cold');
      break;
    case 'ofuro':
      // Go directly to Ofuro product page
      router.push('/produktas/ofuro');
      break;
  }
}
```

## 5.5 Step 2: Capacity Selection

### Route: `/raskite-savo-kubila?step=2&purpose=hot`

### Content

```
Title: "*Kiek žmonių mėgaujasi kartu?*"
Subtitle: "Pasirinkite įprastą naudotojų skaičių"

OPTIONS (3 cards):

┌───────────────────────┐┌───────────────────────┐┌───────────────────────┐
│                       ││                       ││                       │
│        👫             ││       👨‍👩‍👧‍👦            ││        👥👥           │
│                       ││                       ││                       │
│    2-4 ASMENYS        ││    4-6 ASMENYS        ││     6+ ASMENYS        │
│                       ││                       ││                       │
│  Pora arba            ││  Šeima su             ││  Draugų kompanija,    │
│  maža šeima           ││  vaikais              ││  vakarėliai           │
│                       ││                       ││                       │
│  nuo 1 990 €          ││  nuo 2 690 €          ││  nuo 2 890 €          │
│  nuo 56 €/mėn         ││  nuo 75 €/mėn         ││  nuo 81 €/mėn         │
│                       ││                       ││                       │
│  5 modeliai           ││  6 modeliai           ││  7 modeliai           │
│                       ││                       ││                       │
└───────────────────────┘└───────────────────────┘└───────────────────────┘
```

### Product Mapping

```typescript
const CAPACITY_PRODUCTS = {
  'small': [
    'classic-round-in',    // 4-6 capacity
    'classic-round-out',   // 4-6 capacity
    'classic-round-horizon' // 4-6 capacity
  ],
  'medium': [
    'classic-round-in',
    'classic-round-out',
    'classic-round-horizon',
    'grande-round-in',     // 6-8 capacity
    'grande-round-out',
    'paris-in',
    'andorra'
  ],
  'large': [
    'grande-round-in',
    'grande-round-out',
    'grande-round-horizon',
    'monaco-in',
    'monaco-out',
    'monaco-horizon',
    'cuba-out',
    'macau-in'
  ]
};
```

## 5.6 Step 3: Design Preference

### Route: `/raskite-savo-kubila?step=3&purpose=hot&capacity=medium`

### Content

```
Title: "*Koks dizainas jums artimesnis?*"
Subtitle: "Pasirinkite formą, kuri patinka"

OPTIONS (3 cards):

┌───────────────────────┐┌───────────────────────┐┌───────────────────────┐
│                       ││                       ││                       │
│ [Round tub photo]     ││ [Square tub photo]    ││        ?              │
│                       ││                       ││                       │
│      APVALUS          ││    KVADRATINIS        ││     NESVARBU          │
│                       ││                       ││                       │
│  Klasikinis,          ││  Modernus,            ││  Rodyti visus         │
│  tradicinis           ││  elegantiškas         ││  variantus            │
│                       ││                       ││                       │
│  nuo 1 990 €          ││  nuo 2 690 €          ││                       │
│                       ││                       ││                       │
└───────────────────────┘└───────────────────────┘└───────────────────────┘
```

### Shape Mapping

```typescript
const SHAPE_PRODUCTS = {
  'round': ['classic-round-*', 'grande-round-*'],
  'square': ['paris-*', 'andorra', 'cuba-*', 'monaco-*', 'macau-*']
};
```

## 5.7 Quiz Option Card Component

### File: `components/quiz/QuizOption.tsx`

```typescript
interface QuizOptionProps {
  image?: string;
  icon?: string;  // For capacity step (emoji or icon)
  title: string;
  description: string;
  priceFrom?: number;
  monthlyFrom?: number;
  modelCount?: number;
  badge?: string;  // e.g., "★ Populiariausias"
  onClick: () => void;
  isSelected?: boolean;
}
```

### Design Specs

```
Size:
  - Desktop: min-width 280px, max-width 320px
  - Mobile: full width, max-width 100%

Image:
  - Aspect ratio: 4:3
  - Object-fit: cover
  - Border-radius: 0 (sharp corners per brand)

States:
  - Default: border-outline-variant/30
  - Hover: border-primary/50, slight lift (translateY -2px)
  - Selected: border-primary, ring-2 ring-primary/20

Typography:
  - Title: font-headline text-xl font-medium
  - Description: font-body text-sm text-secondary
  - Price: font-headline text-lg

Animation:
  - Hover: 0.2s ease-out
  - Selection: 0.3s with checkmark fade-in
```

## 5.8 Quiz Logic Module

### File: `lib/quiz/quiz-logic.ts`

```typescript
interface QuizSelections {
  purpose: 'hot' | 'cold' | 'ofuro' | null;
  capacity: 'small' | 'medium' | 'large' | null;
  shape: 'round' | 'square' | 'any' | null;
}

interface QuizResult {
  products: Product[];
  headline: string;
  subheadline: string;
  reasons: Record<string, string[]>;  // productId -> reasons why it fits
}

function getQuizResults(selections: QuizSelections): QuizResult {
  // 1. Filter products by selections
  let products = getAllProducts();

  if (selections.purpose === 'cold') {
    products = products.filter(p => p.filterableSpecs.isColdTherapy);
  } else if (selections.purpose === 'hot') {
    // Filter by capacity
    if (selections.capacity === 'small') {
      products = products.filter(p => p.capacity.max <= 6);
    } else if (selections.capacity === 'large') {
      products = products.filter(p => p.capacity.min >= 6);
    }

    // Filter by shape
    if (selections.shape === 'round') {
      products = products.filter(p => p.shape === 'round');
    } else if (selections.shape === 'square') {
      products = products.filter(p => p.shape === 'square');
    }
  }

  // 2. Sort by recommendation score
  products = sortByRecommendation(products, selections);

  // 3. Limit to top 3-4
  products = products.slice(0, 4);

  // 4. Generate reasons for each product
  const reasons = generateReasons(products, selections);

  // 5. Generate headlines
  const headline = generateHeadline(selections);
  const subheadline = generateSubheadline(selections);

  return { products, headline, subheadline, reasons };
}

function generateReasons(products: Product[], selections: QuizSelections): Record<string, string[]> {
  const reasons: Record<string, string[]> = {};

  for (const product of products) {
    reasons[product.id] = [];

    // Capacity reason
    if (selections.capacity) {
      reasons[product.id].push(`Telpa ${product.capacity.min}-${product.capacity.max} asmenys`);
    }

    // Shape reason
    if (product.shape === 'round') {
      reasons[product.id].push('Klasikinis apvalus dizainas');
    } else if (product.shape === 'square') {
      reasons[product.id].push('Modernus kvadratinis dizainas');
    }

    // Heater reason
    if (product.heaterType === 'internal') {
      reasons[product.id].push('Integruota krosnelė – kompaktiška erdvėje');
    } else if (product.heaterType === 'external') {
      reasons[product.id].push('Išorinė krosnelė – daugiau vietos viduje');
    }

    // Feature reasons
    if (product.filterableSpecs.hasWaterJets) {
      reasons[product.id].push('Su masažiniais purkštukais');
    }
    if (product.filterableSpecs.hasLED) {
      reasons[product.id].push('LED apšvietimas įtrauktas');
    }
  }

  return reasons;
}

function generateHeadline(selections: QuizSelections): string {
  if (selections.purpose === 'cold') {
    return 'Šalčio terapija';
  }

  const parts = [];

  if (selections.capacity === 'small') parts.push('Porai ar mažai šeimai');
  else if (selections.capacity === 'medium') parts.push('Šeimai su vaikais');
  else if (selections.capacity === 'large') parts.push('Draugų kompanijai');

  if (selections.shape === 'round') parts.push('Apvalus dizainas');
  else if (selections.shape === 'square') parts.push('Kvadratinis dizainas');

  return parts.join(' • ');
}
```

## 5.9 Animations & Transitions

### Page Transitions

```typescript
// Between quiz steps
const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

const pageTransition = {
  type: 'tween',
  ease: [0.16, 1, 0.3, 1],  // Smooth ease-out
  duration: 0.4
};
```

### Option Card Selection

```typescript
const cardVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02, y: -4 },
  tap: { scale: 0.98 },
  selected: {
    scale: 1,
    borderColor: 'var(--color-primary)',
    transition: { duration: 0.2 }
  }
};
```

### Progress Bar

```typescript
// Animate width on step change
const progressVariants = {
  initial: { width: '0%' },
  animate: {
    width: `${(currentStep / totalSteps) * 100}%`,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};
```

---

# PART 6: RESULTS PAGE SPECIFICATION

## 6.1 Route

`/raskite-savo-kubila/rezultatai?purpose=hot&capacity=medium&shape=round`

## 6.2 Page Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HEADER (Simplified - just logo + close)                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  *Jums rekomenduojame*                                                  │
│                                                                         │
│  {Dynamic subheadline based on selections}                              │
│  Šeimai su vaikais • Apvalus dizainas                                   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  HERO RECOMMENDATION (Featured/Best Match)                              │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                                                                   │ │
│  │  [LARGE LIFESTYLE IMAGE - 50vh]                                   │ │
│  │                                                                   │ │
│  │  ★ REKOMENDUOJAME                                                 │ │
│  │                                                                   │ │
│  │  Grande Round In                                                  │ │
│  │  ━━━━━━━━━━━━━━━━━━                                              │ │
│  │  nuo 81 €/mėn • 2 890 €                                          │ │
│  │                                                                   │ │
│  │  Tinka jums, nes:                                                 │ │
│  │  ✓ Telpa 6-8 asmenys – visai šeimai                              │ │
│  │  ✓ Integruota krosnelė – kompaktiška erdvėje                     │ │
│  │  ✓ Klasikinis apvalus dizainas                                    │ │
│  │                                                                   │ │
│  │  [         PASIRINKTI ŠĮ MODELĮ         ]                        │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Kiti tinkami variantai:                                                │
│                                                                         │
│  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────┐   │
│  │ [Image]             │ │ [Image]             │ │ [Image]         │   │
│  │ Grande Round Out    │ │ Grande Round Horiz. │ │ Classic Round   │   │
│  │ 89 €/mėn • 3 190 €  │ │ 120 €/mėn • 4 290 € │ │ 56 €/mėn       │   │
│  │                     │ │ ★ Premium           │ │ Ekonomiškas     │   │
│  │ ✓ Daugiau vietos    │ │ ✓ Panoraminis       │ │ ✓ Kompaktiškas  │   │
│  │ [PERŽIŪRĖTI]        │ │ [PERŽIŪRĖTI]        │ │ [PERŽIŪRĖTI]    │   │
│  └─────────────────────┘ └─────────────────────┘ └─────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ALTERNATIVE ACTIONS                                                    │
│                                                                         │
│  Norite palyginti? [ PALYGINTI 2 MODELIUS ]                            │
│                                                                         │
│  Vis dar nežinote? [ UŽSISAKYTI NEMOKAMĄ KONSULTACIJĄ ]                │
│                                                                         │
│  Peržiūrėti visus 16 modelių →                                         │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ TRUST STRIP                                                             │
│ 🇱🇹 Gaminama Lietuvoje • 🛡️ 5 metų garantija • 🚚 Montavimas įsk.      │
└─────────────────────────────────────────────────────────────────────────┘
```

## 6.3 Cold Therapy Results (Special Case)

When `purpose=cold`, show comparison view:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  *Šalčio terapija*                                                      │
│  Pasirinkite jums tinkamą variantą                                      │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐      │
│  │                             │  │                             │      │
│  │  [Arctic photo]             │  │  [Arctic Chiller photo]     │      │
│  │                             │  │                             │      │
│  │  Arctic                     │  │  Arctic Chiller             │      │
│  │  ──────────────────────     │  │  ──────────────────────     │      │
│  │  1 490 € • 42 €/mėn         │  │  5 990 € • 167 €/mėn        │      │
│  │                             │  │                             │      │
│  │  Be aušinimo sistemos       │  │  ★ Su aušinimo sistema      │      │
│  │                             │  │                             │      │
│  │  ✓ Vanduo šąla natūraliai   │  │  ✓ Palaiko 3-8°C           │      │
│  │  ✓ Tinka namų naudojimui    │  │  ✓ Profesionalams          │      │
│  │  ✓ Ekonomiškas variantas    │  │  ✓ Tikslus kontrolė        │      │
│  │                             │  │                             │      │
│  │  Tinka jums, jei:           │  │  Tinka jums, jei:           │      │
│  │  • Norite pradėti šalčio    │  │  • Esate rimtas atletas     │      │
│  │    terapiją ekonomiškai     │  │  • Norite tikslios temp.    │      │
│  │  • Naudosite sezoniškai     │  │  • Naudosite kasdien        │      │
│  │                             │  │                             │      │
│  │  [     PASIRINKTI     ]     │  │  [     PASIRINKTI     ]     │      │
│  │                             │  │                             │      │
│  └─────────────────────────────┘  └─────────────────────────────┘      │
│                                                                         │
│  Nežinote, kuris? [ UŽSISAKYTI KONSULTACIJĄ ]                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 6.4 Result Card Component

### File: `components/quiz/ResultCard.tsx`

```typescript
interface ResultCardProps {
  product: Product;
  reasons: string[];
  isHero?: boolean;  // Large featured card
  badge?: string;    // "★ REKOMENDUOJAME", "Premium", "Ekonomiškas"
  onSelect: () => void;
}
```

### Hero Card Design

```
Width: 100% (max-width 800px centered)
Image: 50vh height, object-fit cover
Badge: Top-left corner, absolute positioned
Title: font-headline text-4xl font-light
Price: font-headline text-2xl
Reasons: Bulleted list with checkmarks
CTA: Full-width button, primary style
```

### Secondary Card Design

```
Width: 280px (flex, 3 per row on desktop)
Image: aspect-[4/3]
Badge: Top-left if applicable
Title: font-headline text-xl
Price: font-body text-lg
Reasons: 1-2 bullet points
CTA: "PERŽIŪRĖTI" outline button
```

---

# PART 7: PRODUCT PAGE SPECIFICATION

## 7.1 Page Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HEADER (Standard)                                                       │
├─────────────────────────────────────────────────────────────────────────┤
│ BREADCRUMB + BACK LINK                                                  │
│ ← Grįžti į rezultatus | Katalogas > Apvalūs > Grande Round In          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ SECTION 1: HERO (Above Fold)                                            │
│ ┌───────────────────────────────────────┬─────────────────────────────┐│
│ │                                       │                             ││
│ │  GALLERY (70vh)                       │  PRODUCT INFO               ││
│ │  - Main image                         │  - Name                     ││
│ │  - Thumbnails below                   │  - Quick specs (icons)      ││
│ │                                       │  - Price (monthly first)    ││
│ │                                       │  - Primary CTA              ││
│ │                                       │  - Trust badges             ││
│ │                                       │                             ││
│ └───────────────────────────────────────┴─────────────────────────────┘│
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ SECTION 2: PACKAGE SELECTOR (Critical conversion element)               │
│ ┌───────────────────────────────────────────────────────────────────┐  │
│ │                                                                   │  │
│ │  UŽSAKYKITE GREITAI                                               │  │
│ │  Pasirinkite komplektaciją ir iškart į krepšelį                  │  │
│ │                                                                   │  │
│ │  ┌─────────────┬─────────────┬─────────────┐                     │  │
│ │  │   BAZINIS   │  POPULIARUS │   PREMIUM   │                     │  │
│ │  │             │ ★ 73% renk. │             │                     │  │
│ │  │   2 890 €   │   3 380 €   │   3 980 €   │                     │  │
│ │  │  81 €/mėn   │  94 €/mėn   │  111 €/mėn  │                     │  │
│ │  │             │             │             │                     │  │
│ │  │  ✓ Kubilas  │ ✓ Bazinis + │ ✓ Popul. +  │                     │  │
│ │  │  ✓ Krosnelė │ ✓ Termo dang│ ✓ Termo med │                     │  │
│ │  │  ✓ Eglės med│ ✓ Laiptai   │ ✓ LED       │                     │  │
│ │  │  ✓ Std dang │ ✓ Priež.rink│ ✓ Masažas   │                     │  │
│ │  │             │             │             │                     │  │
│ │  │[Į KREPŠELĮ] │[Į KREPŠELĮ] │[Į KREPŠELĮ] │                     │  │
│ │  └─────────────┴─────────────┴─────────────┘                     │  │
│ │                                                                   │  │
│ │  Norite kitaip? → Konfigūruoti detaliau                          │  │
│ │                                                                   │  │
│ └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ SECTION 3: POSITIONING ("Kodėl šis modelis?")                          │
│ ┌───────────────────────────────────────────────────────────────────┐  │
│ │                                                                   │  │
│ │  *Kodėl Grande Round In?*                                         │  │
│ │                                                                   │  │
│ │  [Narrative paragraph about this product's positioning]           │  │
│ │                                                                   │  │
│ │  Tinka jums, jei:                                                 │  │
│ │  • Turite šeimą su vaikais                                        │  │
│ │  • Jūsų erdvė nėra labai didelė                                   │  │
│ │  • Vertinate klasikinį dizainą                                    │  │
│ │  • Norite paprasto sprendimo                                      │  │
│ │                                                                   │  │
│ └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ SECTION 4: THE NARRATIVE (Long description / story)                     │
│ - Existing "The Narrative" section                                      │
│ - Emotional, benefit-focused copy                                       │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ SECTION 5: FAQ (Objection handling)                                     │
│ ┌───────────────────────────────────────────────────────────────────┐  │
│ │                                                                   │  │
│ │  DAŽNIAUSIAI KLAUSIAMA                                            │  │
│ │                                                                   │  │
│ │  ▸ Ar reikia leidimo statybai?                                    │  │
│ │    [Expandable answer]                                            │  │
│ │                                                                   │  │
│ │  ▸ Kaip vyksta pristatymas ir montavimas?                         │  │
│ │    [Expandable answer]                                            │  │
│ │                                                                   │  │
│ │  ▸ Kokia garantija?                                               │  │
│ │    [Expandable answer]                                            │  │
│ │                                                                   │  │
│ │  ▸ Kiek kainuoja eksploatacija per mėnesį?                        │  │
│ │    [Expandable answer]                                            │  │
│ │                                                                   │  │
│ │  ▸ Ar galima išsimokėtinai?                                       │  │
│ │    [Expandable answer]                                            │  │
│ │                                                                   │  │
│ └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ SECTION 6: VALUE STACKING (Price justification)                         │
│ ┌───────────────────────────────────────────────────────────────────┐  │
│ │                                                                   │  │
│ │  Ką gausite už 2 890 €:                                           │  │
│ │                                                                   │  │
│ │  ✓ Kubilas (6-8 asm.)                         1 850 € vertės     │  │
│ │  ✓ Integruota krosnelė                          500 € vertės     │  │
│ │  ✓ Eglės medienos apdaila                       340 € vertės     │  │
│ │  ✓ Standartinis dangtelis                       180 € vertės     │  │
│ │  ✓ Pristatymas Lietuvoje                        300 € vertės     │  │
│ │  ✓ Profesionalus montavimas                     500 € vertės     │  │
│ │  ✓ 5 metų garantija                             priceless        │  │
│ │  ─────────────────────────────────────────────────────────────   │  │
│ │  Viso vertė:                                         3 670 €     │  │
│ │  Jūsų kaina:                                         2 890 €     │  │
│ │  Sutaupote:                                   780 € (21%)        │  │
│ │                                                                   │  │
│ └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ SECTION 7: TECH SPECS ("The Ledger")                                    │
│ - Existing TechSpecs component                                          │
│ - Collapsible for mobile                                                │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ SECTION 8: RELATED PRODUCTS                                             │
│ - Similar products                                                      │
│ - "Palyginti" functionality                                             │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│ STICKY MOBILE CTA (lg:hidden)                                           │
│ ┌───────────────────────────────────────────────────────────────────┐  │
│ │  81 €/mėn • 2 890 €                        [ UŽSAKYTI ]           │  │
│ └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

## 7.2 Gallery Component Updates

### Current: Good foundation
### Updates needed:

- Add video support (if available)
- Add "360° View" button (future)
- Ensure images show product in context (lifestyle, not just product)

## 7.3 Product Info Component Updates

### Current (ProductInfo.tsx)

```typescript
// Line ~45: Price display
<span>{formatPrice(basePrice)}</span>
<span>Išsimokėtinai nuo {monthly} €/mėn</span>
```

### Required

```typescript
// Lead with monthly:
<div className="mb-6">
  <span className="font-headline text-4xl">
    nuo {monthly} €/mėn
  </span>
  <span className="text-secondary text-lg ml-2">
    arba {formatPrice(basePrice)} vienkartinis
  </span>
</div>

// Add delivery timeline:
<div className="text-sm text-secondary mt-4">
  <Icon name="local_shipping" size="sm" className="mr-2" />
  Pristatymas per 2-4 savaites
</div>
```

## 7.4 Package Selector Component

### File: `components/product/PackageSelector.tsx`

```typescript
interface PackageSelectorProps {
  product: Product;
  packages: ProductPackage[];
  onAddToCart: (packageId: string) => void;
}

interface ProductPackage {
  id: 'bazinis' | 'populiarus' | 'premium';
  name: string;
  displayName: string;  // For UI: "BAZINIS", "POPULIARUS", "PREMIUM"
  priceModifier: number;
  monthlyModifier: number;
  included: PackageItem[];
  badge?: string;
  isRecommended?: boolean;
}

interface PackageItem {
  name: string;
  value?: string;  // e.g., "Termo" for wood type
}
```

### Package Definitions Per Product

```typescript
// Default packages (can be overridden per product)
const DEFAULT_PACKAGES: ProductPackage[] = [
  {
    id: 'bazinis',
    name: 'bazinis',
    displayName: 'BAZINIS',
    priceModifier: 0,
    monthlyModifier: 0,
    included: [
      { name: 'Kubilas' },
      { name: 'Krosnelė', value: 'Standartinė' },
      { name: 'Mediena', value: 'Eglė' },
      { name: 'Dangtelis', value: 'Standartinis' },
    ],
  },
  {
    id: 'populiarus',
    name: 'populiarus',
    displayName: 'POPULIARUS',
    priceModifier: 490,
    monthlyModifier: 14,  // ceil(490/36)
    included: [
      { name: 'Viskas iš Bazinio' },
      { name: 'Dangtelis', value: 'Termo' },
      { name: 'Laiptai', value: 'Mediniai' },
      { name: 'Priežiūros rinkinys' },
    ],
    badge: '★ 73% RENKASI',
    isRecommended: true,
  },
  {
    id: 'premium',
    name: 'premium',
    displayName: 'PREMIUM',
    priceModifier: 1090,
    monthlyModifier: 31,  // ceil(1090/36)
    included: [
      { name: 'Viskas iš Populiaraus' },
      { name: 'Mediena', value: 'Termo' },
      { name: 'LED apšvietimas' },
      { name: 'Masažiniai purkštukai' },
    ],
  },
];
```

### Visual Design

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  UŽSAKYKITE GREITAI                                                     │
│  Pasirinkite komplektaciją ir iškart į krepšelį                        │
│                                                                         │
│  ┌─────────────────┬─────────────────┬─────────────────┐               │
│  │                 │   ★ 73% RENK.   │                 │               │
│  │     BAZINIS     │   POPULIARUS    │     PREMIUM     │               │
│  │                 │   ═══════════   │                 │               │
│  ├─────────────────┼─────────────────┼─────────────────┤               │
│  │                 │                 │                 │               │
│  │    2 890 €      │    3 380 €      │    3 980 €      │               │
│  │   81 €/mėn      │   94 €/mėn      │   111 €/mėn     │               │
│  │                 │                 │                 │               │
│  ├─────────────────┼─────────────────┼─────────────────┤               │
│  │                 │                 │                 │               │
│  │ ✓ Kubilas       │ ✓ Bazinis +     │ ✓ Populiarus +  │               │
│  │ ✓ Krosnelė      │ ✓ Termo dangt.  │ ✓ Termo mediena │               │
│  │ ✓ Eglės mediena │ ✓ Laiptai       │ ✓ LED apšviet.  │               │
│  │ ✓ Std. dangtelis│ ✓ Priež. rink.  │ ✓ Masažas       │               │
│  │                 │                 │                 │               │
│  ├─────────────────┼─────────────────┼─────────────────┤               │
│  │                 │                 │                 │               │
│  │ [ Į KREPŠELĮ ]  │ [ Į KREPŠELĮ ]  │ [ Į KREPŠELĮ ]  │               │
│  │                 │  (highlighted)  │                 │               │
│  │                 │                 │                 │               │
│  └─────────────────┴─────────────────┴─────────────────┘               │
│                                                                         │
│  Norite kitaip? → Konfigūruoti detaliau                                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Card width: Equal thirds (flex-1)
Populiarus: border-primary, recommended badge, button highlighted
Others: border-outline-variant/30
Background: bg-surface-container-low
```

### Interaction

1. Clicking "Į KREPŠELĮ" on any package:
   - Creates cart item with package configuration
   - Opens cart drawer showing added item
   - Shows success toast: "Grande Round In – Populiarus pridėtas į krepšelį"

2. Clicking "Konfigūruoti detaliau":
   - Navigates to `/produktas/[slug]/konfiguratorius`
   - Pre-selects Populiarus package as starting point

## 7.5 FAQ Component

### File: `components/product/ProductFAQ.tsx`

```typescript
interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  faqs?: FAQItem[];  // Product-specific overrides
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: 'Ar reikia leidimo statybai?',
    answer: 'Daugeliu atvejų leidimo nereikia, nes kubilas laikomas kilnojamuoju daiktu, o ne statiniu. Jei jūsų sklypas yra saugomoje teritorijoje arba abejojate – pasitarkite su savo savivaldybe. Paprastai užtenka paprasto pranešimo.'
  },
  {
    question: 'Kaip vyksta pristatymas ir montavimas?',
    answer: 'Pristatome visoje Lietuvoje per 2-4 savaites nuo užsakymo. Montavimas įskaičiuotas į kainą – mūsų specialistai viską sumontuos, užpildys vandeniu ir parodys, kaip naudotis. Jums tereikia paruošti lygią, tvirtą paviršių (betoną, trinkelės, medinis denio).'
  },
  {
    question: 'Kokia garantija?',
    answer: '5 metų garantija kubilo konstrukcijai (korpusui, akrilui), 2 metai elektronikai ir krosnelei. Garantinis aptarnavimas visoje Lietuvoje – atvažiuojame pas jus.'
  },
  {
    question: 'Kiek kainuoja eksploatacija per mėnesį?',
    answer: 'Malkinis kūrenimas: ~5€ už vieną kūrenimą (2-3 val.). Jei naudojate 2x per savaitę, tai ~40€/mėn. Elektros sąnaudos (siurblys, LED): ~10-15€/mėn. Vandens priežiūra (chemija, filtrai): ~10€/mėn. Viso: ~50-65€/mėn aktyviai naudojant.'
  },
  {
    question: 'Ar galima išsimokėtinai?',
    answer: 'Taip! Siūlome lizingą be pradinio įnašo per mūsų partnerius. Mėnesinės įmokos prasideda nuo 42€ (Arctic) iki 167€ (Arctic Chiller). Sprendimas per 15 minučių, reikia tik asmens dokumento.'
  }
];
```

### Visual Design

```
DAŽNIAUSIAI KLAUSIAMA
━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────────┐
│ ▸ Ar reikia leidimo statybai?                                          │
├─────────────────────────────────────────────────────────────────────────┤
│ ▸ Kaip vyksta pristatymas ir montavimas?                               │
├─────────────────────────────────────────────────────────────────────────┤
│ ▾ Kokia garantija?                                    (expanded)        │
│                                                                         │
│   5 metų garantija kubilo konstrukcijai (korpusui, akrilui), 2 metai   │
│   elektronikai ir krosnelei. Garantinis aptarnavimas visoje            │
│   Lietuvoje – atvažiuojame pas jus.                                    │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ ▸ Kiek kainuoja eksploatacija per mėnesį?                              │
├─────────────────────────────────────────────────────────────────────────┤
│ ▸ Ar galima išsimokėtinai?                                             │
└─────────────────────────────────────────────────────────────────────────┘

Animation: Smooth expand/collapse (0.3s ease-out)
Icon: Rotates 90° on expand
Border: Subtle dividers between items
```

## 7.6 Sticky Mobile CTA

### File: `components/product/StickyMobileCTA.tsx`

```typescript
interface StickyMobileCTAProps {
  price: number;
  monthlyPayment: number;
  onCTAClick: () => void;
  ctaText?: string;
}
```

### Visual Design

```
┌─────────────────────────────────────────────────────────────────────────┐
│  81 €/mėn • 2 890 €                           [ UŽSAKYTI ]             │
└─────────────────────────────────────────────────────────────────────────┘

Position: fixed bottom-0 left-0 right-0
Height: 64px
Background: bg-surface with shadow-lg shadow-black/20
Z-index: 50

Content:
- Left: Price (monthly first, full price secondary)
- Right: CTA button (primary style)

Behavior:
- Hidden initially
- Appears when user scrolls past hero section (IntersectionObserver)
- Smoothly slides up (translateY animation)
- Tapping CTA scrolls to PackageSelector and highlights it
```

### Implementation

```typescript
function StickyMobileCTA({ price, monthlyPayment, onCTAClick, ctaText = 'UŽSAKYTI' }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show when hero is NOT visible (scrolled past)
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 bg-surface shadow-lg shadow-black/20 z-50 lg:hidden"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <span className="font-headline text-lg font-medium">
                {monthlyPayment} €/mėn
              </span>
              <span className="text-secondary text-sm ml-2">
                • {formatPrice(price)}
              </span>
            </div>
            <Button onClick={onCTAClick} size="sm">
              {ctaText}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

# PART 8: CONFIGURATOR SPECIFICATION

## 8.1 Philosophy

The configurator should feel like a **guided consultation**, not a form.

**Key principles:**
- One decision per screen
- Smart defaults (Populiarus pre-selected)
- Live price always visible
- Social proof on options ("★ Dauguma renkasi")
- Easy to go back and change

## 8.2 Step Structure

```
STEP 1: PACKAGE SELECTION
"Nuo ko norite pradėti?"
- Bazinis / Populiarus / Premium cards
- Populiarus pre-selected with badge
- Shows what each includes
- "Toliau" advances to Step 2

STEP 2: WOOD TYPE
"Pasirinkite medieną"
- Visual cards with wood photos
- Eglė (included) / Termo (+€150-250) / Deginta (+€180-250) / WPC (+€150-250)
- "★ Rekomenduojama" on Termo
- Shows price difference from base

STEP 3: SHELL COLOR
"Pasirinkite spalvą"
- Color swatches (Balta, Pilka, Smėlio, Mėlyna, Juoda)
- First 3 included, premium colors +€90-190
- **NOTE:** No live color preview - show color swatch selection + main product image remains static

STEP 4: EXTRAS
"Papildomi priedai"
- Checkbox list with prices
- "★ Dauguma renkasi" on popular items
- Categories: Lighting, Massage, Filtration, Heating, Accessories

STEP 5: REVIEW & CONFIRM
"Jūsų konfigūracija"
- Main product image (no per-configuration previews available)
- Thumbnails of selected addons next to their line items
- Full list of selections
- Price breakdown
- Monthly payment
- Trust badges
- "Į Krepšelį" CTA
```

## 8.3 Step 1: Package Selection

### Component: `ConfigPackageStep.tsx`

```typescript
interface ConfigPackageStepProps {
  product: Product;
  packages: ProductPackage[];
  selectedPackage: string | null;
  onSelect: (packageId: string) => void;
  onNext: () => void;
}
```

### Visual

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  Grande Round In                                       3 380 €         ┃
┃  Konfigūruokite savo kubilą                                           ┃
┃                                                                        ┃
┃  ●━━━━━━━○━━━━━━━○━━━━━━━○━━━━━━━○                                    ┃
┃  Paketas   Mediena   Spalva   Priedai   Peržiūra                      ┃
┃                                                                        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                        ┃
┃  1. NUO KO NORITE PRADĖTI?                                            ┃
┃                                                                        ┃
┃  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐        ┃
┃  │                 │  │  ★ DAUGUMA      │  │                 │        ┃
┃  │     BAZINIS     │  │    RENKASI      │  │     PREMIUM     │        ┃
┃  │                 │  │   POPULIARUS    │  │                 │        ┃
┃  │     2 890 €     │  │     3 380 €     │  │     3 980 €     │        ┃
┃  │    81 €/mėn     │  │    94 €/mėn     │  │   111 €/mėn     │        ┃
┃  │                 │  │                 │  │                 │        ┃
┃  │  ✓ Kubilas      │  │  ✓ Bazinis +    │  │  ✓ Populiarus + │        ┃
┃  │  ✓ Krosnelė     │  │  ✓ Termo dangt. │  │  ✓ Termo mediena│        ┃
┃  │  ✓ Eglės med.   │  │  ✓ Laiptai      │  │  ✓ LED          │        ┃
┃  │  ✓ Std. dangt.  │  │  ✓ Priež. rink. │  │  ✓ Masažas      │        ┃
┃  │                 │  │                 │  │                 │        ┃
┃  │   [  RINKTIS ]  │  │ [✓ PASIRINKTA]  │  │   [  RINKTIS ]  │        ┃
┃  └─────────────────┘  └─────────────────┘  └─────────────────┘        ┃
┃                                                                        ┃
┃                                                    [ TOLIAU → ]        ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 8.4 Step 2: Wood Type Selection

### Visual

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  Grande Round In • Populiarus                          3 380 €         ┃
┃                                                                        ┃
┃  ○━━━━━━━●━━━━━━━○━━━━━━━○━━━━━━━○                                    ┃
┃  Paketas   Mediena   Spalva   Priedai   Peržiūra                      ┃
┃                                                                        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                        ┃
┃  2. PASIRINKITE MEDIENĄ                                               ┃
┃                                                                        ┃
┃     Išorinė kubilo apdaila                                            ┃
┃                                                                        ┃
┃  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      ┃
┃  │ [wood photo]│ │ [wood photo]│ │ [wood photo]│ │ [wood photo]│      ┃
┃  │             │ │      ★      │ │             │ │             │      ┃
┃  │    EGLĖ     │ │    TERMO    │ │   DEGINTA   │ │     WPC     │      ┃
┃  │             │ │ Rekomenduoj.│ │             │ │             │      ┃
┃  │   +0 €      │ │   +180 €    │ │   +200 €    │ │   +200 €    │      ┃
┃  │             │ │             │ │             │ │             │      ┃
┃  │  [  ✓  ]    │ │  [     ]    │ │  [     ]    │ │  [     ]    │      ┃
┃  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      ┃
┃                                                                        ┃
┃  ℹ️ Termo mediena atspari drėgmei ir tarnaus ilgiau                   ┃
┃                                                                        ┃
┃  [ ← ATGAL ]                                       [ TOLIAU → ]        ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Wood Options Data

```typescript
const WOOD_OPTIONS = [
  {
    id: 'spruce',
    name: 'Eglė',
    nameLT: 'EGLĖ',
    price: 0,
    image: '/images/wood/spruce.jpg',
    description: 'Klasikinė, ekonomiška',
  },
  {
    id: 'thermo',
    name: 'Termo',
    nameLT: 'TERMO',
    price: 180,  // Varies by product size
    image: '/images/wood/thermo.jpg',
    description: 'Atspari drėgmei, ilgaamžė',
    badge: '★ Rekomenduojama',
  },
  {
    id: 'burned',
    name: 'Deginta',
    nameLT: 'DEGINTA',
    price: 200,
    image: '/images/wood/burned.jpg',
    description: 'Unikali, tamsi tekstūra',
  },
  {
    id: 'wpc',
    name: 'WPC',
    nameLT: 'WPC',
    price: 200,
    image: '/images/wood/wpc.jpg',
    description: 'Kompozitas, minimalus priežiūra',
  },
];
```

## 8.5 Step 3: Shell Color Selection

### Visual

```
┃  3. PASIRINKITE SPALVĄ                                                ┃
┃                                                                        ┃
┃     Vidinis akrilo paviršius                                          ┃
┃                                                                        ┃
┃  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          ┃
┃  │ [○    ] │ │ [○    ] │ │ [○    ] │ │ [○    ] │ │ [○    ] │          ┃
┃  │  BALTA  │ │  PILKA  │ │ SMĖLIO  │ │ MĖLYNA  │ │  JUODA  │          ┃
┃  │  +0 €   │ │  +0 €   │ │  +0 €   │ │ +90 €   │ │ +190 €  │          ┃
┃  │  [ ✓ ]  │ │  [   ]  │ │  [   ]  │ │  [   ]  │ │  [   ]  │          ┃
┃  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘          ┃
```

### Color Options Data

```typescript
const COLOR_OPTIONS = [
  { id: 'white', name: 'Balta', hex: '#FFFFFF', price: 0 },
  { id: 'grey', name: 'Pilka', hex: '#808080', price: 0 },
  { id: 'sand', name: 'Smėlio', hex: '#C2B280', price: 0 },
  { id: 'blue', name: 'Mėlyna', hex: '#4169E1', price: 90, premium: true },
  { id: 'black', name: 'Juoda', hex: '#1A1A1A', price: 190, premium: true },
];
```

## 8.6 Step 4: Extras Selection

### Visual

```
┃  4. PAPILDOMI PRIEDAI                                                 ┃
┃                                                                        ┃
┃     Pasirinkite, ko dar norite (nebūtina)                             ┃
┃                                                                        ┃
┃  APŠVIETIMAS                                                          ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  ☑  LED apšvietimas                                    +290 €   │  ┃
┃  │      7-24 žvaigždutės + 1-2 lempos                              │  ┃
┃  │      ★ 67% renkasi                                              │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  ☐  LED juosta                                         +180 €   │  ┃
┃  │      Apšviečia kubilo išorę                                     │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  MASAŽAS                                                              ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  ☐  Hidro purkštukai (6 vnt.)                          +320 €   │  ┃
┃  │      Vandens masažas                                            │  ┃
┃  ├─────────────────────────────────────────────────────────────────┤  ┃
┃  │  ☐  Hidro purkštukai (12 vnt.)                         +410 €   │  ┃
┃  │      Intensyvesnis masažas                                      │  ┃
┃  │      ★ Populiariausias                                          │  ┃
┃  ├─────────────────────────────────────────────────────────────────┤  ┃
┃  │  ☐  Oro purkštukai (12 vnt.)                           +250 €   │  ┃
┃  │      Burbulinis masažas                                         │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  FILTRAVIMAS                                                          ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  ☐  Smėlio filtravimo sistema                          +370 €   │  ┃
┃  │      Automatinis vandens filtravimas                            │  ┃
┃  ├─────────────────────────────────────────────────────────────────┤  ┃
┃  │  ☐  Smėlio filtravimas + UVC lempa                     +550 €   │  ┃
┃  │      Filtravimas + dezinfekcija                                 │  ┃
┃  │      ★ Rekomenduojama aktyviam naudojimui                       │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ŠILDYMAS                                                             ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  ☐  Elektrinis šildytuvas 3kW                          +450 €   │  ┃
┃  │      Papildomas šildymas be malkų                               │  ┃
┃  ├─────────────────────────────────────────────────────────────────┤  ┃
┃  │  ☐  Elektrinis šildytuvas 6kW                          +500 €   │  ┃
┃  │      Greitesnis šildymas                                        │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  PRIEDAI                                                              ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  ☐  Laiptai (termo mediena)                            +120 €   │  ┃
┃  ├─────────────────────────────────────────────────────────────────┤  ┃
┃  │  ☐  Puodelių laikiklis                                  +60 €   │  ┃
┃  ├─────────────────────────────────────────────────────────────────┤  ┃
┃  │  ☐  Pagalvėlė                                           +11 €   │  ┃
┃  ├─────────────────────────────────────────────────────────────────┤  ┃
┃  │  ☐  Garso sistema (2 garsiakalbiai)                    +160 €   │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
```

### Extra Options Data Structure

```typescript
interface ConfigExtra {
  id: string;
  category: 'lighting' | 'massage' | 'filtration' | 'heating' | 'accessories';
  name: string;
  description: string;
  price: number;
  badge?: string;  // "★ 67% renkasi", "★ Rekomenduojama"
  mutuallyExclusive?: string[];  // IDs of options that can't be selected together
  requires?: string[];  // IDs of options that must be selected first
  applicableProducts?: string[];  // Product IDs this applies to (empty = all)
}

const EXTRA_OPTIONS: ConfigExtra[] = [
  // LIGHTING
  {
    id: 'led-stars',
    category: 'lighting',
    name: 'LED apšvietimas',
    description: '7-24 žvaigždutės + 1-2 lempos',
    price: 290,
    badge: '★ 67% renkasi',
  },
  {
    id: 'led-strip',
    category: 'lighting',
    name: 'LED juosta',
    description: 'Apšviečia kubilo išorę',
    price: 180,
  },

  // MASSAGE
  {
    id: 'hydro-6',
    category: 'massage',
    name: 'Hidro purkštukai (6 vnt.)',
    description: 'Vandens masažas',
    price: 320,
    mutuallyExclusive: ['hydro-12', 'hydro-18', 'hydro-24'],
  },
  {
    id: 'hydro-12',
    category: 'massage',
    name: 'Hidro purkštukai (12 vnt.)',
    description: 'Intensyvesnis masažas',
    price: 410,
    badge: '★ Populiariausias',
    mutuallyExclusive: ['hydro-6', 'hydro-18', 'hydro-24'],
  },
  {
    id: 'air-12',
    category: 'massage',
    name: 'Oro purkštukai (12 vnt.)',
    description: 'Burbulinis masažas',
    price: 250,
    mutuallyExclusive: ['air-18', 'air-24'],
  },

  // FILTRATION
  {
    id: 'sand-filter',
    category: 'filtration',
    name: 'Smėlio filtravimo sistema',
    description: 'Automatinis vandens filtravimas',
    price: 370,
    mutuallyExclusive: ['sand-filter-uvc'],
  },
  {
    id: 'sand-filter-uvc',
    category: 'filtration',
    name: 'Smėlio filtravimas + UVC lempa',
    description: 'Filtravimas + dezinfekcija',
    price: 550,
    badge: '★ Rekomenduojama aktyviam naudojimui',
    mutuallyExclusive: ['sand-filter'],
  },

  // HEATING
  {
    id: 'electric-3kw',
    category: 'heating',
    name: 'Elektrinis šildytuvas 3kW',
    description: 'Papildomas šildymas be malkų',
    price: 450,
    mutuallyExclusive: ['electric-6kw', 'electric-9kw'],
  },
  {
    id: 'electric-6kw',
    category: 'heating',
    name: 'Elektrinis šildytuvas 6kW',
    description: 'Greitesnis šildymas',
    price: 500,
    mutuallyExclusive: ['electric-3kw', 'electric-9kw'],
  },

  // ACCESSORIES
  {
    id: 'stairs-thermo',
    category: 'accessories',
    name: 'Laiptai (termo mediena)',
    description: 'Patogus įlipimas',
    price: 120,
  },
  {
    id: 'cup-holder',
    category: 'accessories',
    name: 'Puodelių laikiklis',
    description: 'Termo mediena',
    price: 60,
  },
  {
    id: 'pillow',
    category: 'accessories',
    name: 'Pagalvėlė',
    description: 'Komfortui',
    price: 11,
  },
  {
    id: 'sound-system',
    category: 'accessories',
    name: 'Garso sistema (2 garsiakalbiai)',
    description: 'Bluetooth muzikai',
    price: 160,
  },
];
```

## 8.7 Step 5: Review & Confirm

### Visual

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  Grande Round In                                                       ┃
┃  Jūsų konfigūracija                                                   ┃
┃                                                                        ┃
┃  ○━━━━━━━○━━━━━━━○━━━━━━━○━━━━━━━●                                    ┃
┃  Paketas   Mediena   Spalva   Priedai   Peržiūra                      ┃
┃                                                                        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                        ┃
┃  ┌─────────────────┐                                                  ┃
┃  │                 │   Grande Round In                                ┃
┃  │  [Main Product  │   ─────────────────────────────────────          ┃
┃  │   Image - NOT   │                                                  ┃
┃  │   per-config]   │   ✓ Populiarus paketas                           ┃
┃  │                 │   ✓ Termo medienos apdaila      [addon img]      ┃
┃  │                 │   ✓ Pilkas akrilas              [color swatch]   ┃
┃  └─────────────────┘   ✓ Termo dangtelis             [addon img]      ┃
┃                        ✓ Mediniai laiptai                             ┃
┃                        ✓ Priežiūros rinkinys                          ┃
┃                        ✓ LED apšvietimas                              ┃
┃                        ✓ Hidro purkštukai (12 vnt.)                   ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │                                                                 │  ┃
┃  │   Bazinė kaina                                     2 890 €      │  ┃
┃  │   Populiarus paketas                                +490 €      │  ┃
┃  │   Termo mediena                                     +180 €      │  ┃
┃  │   LED apšvietimas                                   +290 €      │  ┃
┃  │   Hidro purkštukai (12 vnt.)                        +410 €      │  ┃
┃  │   ─────────────────────────────────────────────────────────     │  ┃
┃  │   VISO                                             4 260 €      │  ┃
┃  │                                                                 │  ┃
┃  │   arba išsimokėtinai    119 €/mėn × 36 mėn                           │  ┃
┃  │                                                                 │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │                                                                 │  ┃
┃  │   ✓ Pristatymas per 2-4 savaites                               │  ┃
┃  │   ✓ Montavimas įskaičiuotas                                    │  ┃
┃  │   ✓ 5 metų garantija                                           │  ┃
┃  │   ✓ Gaminama Lietuvoje                                         │  ┃
┃  │                                                                 │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃                                                                        ┃
┃  [ ← ATGAL ]                     [      Į KREPŠELĮ      ]             ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 8.8 Wizard State Management

### File: `stores/configurator.ts`

```typescript
interface ConfiguratorState {
  // Product
  productId: string | null;
  product: Product | null;

  // Wizard state
  currentStep: number;  // 1-5

  // Selections
  selectedPackage: 'bazinis' | 'populiarus' | 'premium' | null;
  selectedWood: string | null;
  selectedColor: string | null;
  selectedExtras: string[];  // Array of extra IDs

  // Computed
  totalPrice: number;
  monthlyPayment: number;

  // Actions
  setProduct: (product: Product) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  selectPackage: (packageId: string) => void;
  selectWood: (woodId: string) => void;
  selectColor: (colorId: string) => void;
  toggleExtra: (extraId: string) => void;
  calculateTotal: () => void;
  reset: () => void;

  // Cart integration
  addToCart: () => void;
}
```

---

---

# PART 9: CART SPECIFICATION

## 9.1 Psychology

The cart is a **commitment reinforcement zone**. User has said "yes" - now we:
1. Confirm they made the right choice (reduce buyer's remorse)
2. Increase average order value (strategic upsells)
3. Create urgency to complete (but not fake scarcity)
4. Remove reasons to abandon

## 9.2 Cart Page Layout

### Route: `/krepselis`

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  ← Tęsti apsipirkimą                                                   ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  JŪSŲ KREPŠELIS                                                │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ┌───────────────────────────────────────────┬────────────────────┐   ┃
┃  │                                           │                    │   ┃
┃  │   PRODUKTAI                               │   UŽSAKYMO        │   ┃
┃  │                                           │   SANTRAUKA       │   ┃
┃  │   ┌────────────────────────────────────┐  │                    │   ┃
┃  │   │  [Img]  Grande Round In            │  │   Tarpinė suma:   │   ┃
┃  │   │         Populiarus paketas         │  │   4 260 €         │   ┃
┃  │   │         Termo mediena              │  │                    │   ┃
┃  │   │                                    │  │   Pristatymas:    │   ┃
┃  │   │         4 260 €                    │  │   Įskaičiuotas    │   ┃
┃  │   │         arba 119 €/mėn             │  │                    │   ┃
┃  │   │                        [Šalinti]   │  │   Montavimas:     │   ┃
┃  │   └────────────────────────────────────┘  │   Įskaičiuotas    │   ┃
┃  │                                           │                    │   ┃
┃  │                                           │   ──────────────  │   ┃
┃  │                                           │                    │   ┃
┃  │                                           │   VISO:           │   ┃
┃  │                                           │   4 260 €         │   ┃
┃  │                                           │                    │   ┃
┃  │                                           │   arba išsimokėtinai    │   ┃
┃  │                                           │   119 €/mėn       │   ┃
┃  │                                           │   × 36 mėn        │   ┃
┃  │                                           │                    │   ┃
┃  │                                           │  ┌──────────────┐ │   ┃
┃  │                                           │  │   TĘSTI      │ │   ┃
┃  │                                           │  │   UŽSAKYMĄ   │ │   ┃
┃  │                                           │  └──────────────┘ │   ┃
┃  │                                           │                    │   ┃
┃  │                                           │   ✓ Saugus        │   ┃
┃  │                                           │     mokėjimas     │   ┃
┃  │                                           │   ✓ 14 d.         │   ┃
┃  │                                           │     grąžinimas    │   ┃
┃  │                                           │   ✓ 5 m.          │   ┃
┃  │                                           │     garantija     │   ┃
┃  │                                           │                    │   ┃
┃  └───────────────────────────────────────────┴────────────────────┘   ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 9.3 Strategic Upsells Section

Below cart items, show curated upsells based on cart contents.

### Upsell Rules Engine

```typescript
interface UpsellRule {
  triggerProductCategory: string[];
  excludeIfInCart: string[];
  upsells: UpsellItem[];
}

const upsellRules: UpsellRule[] = [
  {
    triggerProductCategory: ['hot-tub'],
    excludeIfInCart: ['cover-thermal'],
    upsells: [
      {
        id: 'cover-thermal',
        name: 'Termo dangtelis',
        price: 290,
        badge: '★ 87% renkasi',
        value: 'Išlaiko šilumą 2× ilgiau',
        image: '/images/extras/cover.jpg'
      }
    ]
  },
  {
    triggerProductCategory: ['hot-tub'],
    excludeIfInCart: ['stairs-wooden'],
    upsells: [
      {
        id: 'stairs-wooden',
        name: 'Mediniai laiptai',
        price: 190,
        badge: '★ 73% renkasi',
        value: 'Patogus įlipimas',
        image: '/images/extras/stairs.jpg'
      }
    ]
  },
  {
    triggerProductCategory: ['hot-tub'],
    excludeIfInCart: ['led-lighting'],
    upsells: [
      {
        id: 'led-lighting',
        name: 'LED apšvietimas',
        price: 290,
        badge: '★ Atmosferai',
        value: '7 spalvų nuotaikai',
        image: '/images/extras/led.jpg'
      }
    ]
  },
  {
    triggerProductCategory: ['hot-tub'],
    excludeIfInCart: ['maintenance-kit'],
    upsells: [
      {
        id: 'maintenance-kit',
        name: 'Priežiūros rinkinys',
        price: 89,
        badge: '★ Būtinas',
        value: 'Viskas vandens priežiūrai',
        image: '/images/extras/maintenance.jpg'
      }
    ]
  }
];
```

### Upsell Card Design

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  KLIENTAI TAIP PAT RENKASI                                            ┃
┃                                                                        ┃
┃  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐          ┃
┃  │                 │ │                 │ │                 │          ┃
┃  │   [Image]       │ │   [Image]       │ │   [Image]       │          ┃
┃  │                 │ │                 │ │                 │          ┃
┃  │  Termo          │ │  Mediniai       │ │  LED            │          ┃
┃  │  dangtelis      │ │  laiptai        │ │  apšvietimas    │          ┃
┃  │                 │ │                 │ │                 │          ┃
┃  │  ★ 87% renkasi  │ │  ★ 73% renkasi  │ │  ★ Atmosferai   │          ┃
┃  │                 │ │                 │ │                 │          ┃
┃  │  Išlaiko šilumą │ │  Patogus        │ │  7 spalvų       │          ┃
┃  │  2× ilgiau      │ │  įlipimas       │ │  nuotaikai      │          ┃
┃  │                 │ │                 │ │                 │          ┃
┃  │  290 €          │ │  190 €          │ │  290 €          │          ┃
┃  │  +8 €/mėn       │ │  +5 €/mėn       │ │  +8 €/mėn       │          ┃
┃  │                 │ │                 │ │                 │          ┃
┃  │  [ + Pridėti ]  │ │  [ + Pridėti ]  │ │  [ + Pridėti ]  │          ┃
┃  │                 │ │                 │ │                 │          ┃
┃  └─────────────────┘ └─────────────────┘ └─────────────────┘          ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 9.4 Trust Reinforcement Strip

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   🛡️ Saugus mokėjimas  •  📦 Pristatymas per 2-4 sav.  •              │
│   ↩️ 14 d. grąžinimas  •  🏭 Gaminama Lietuvoje                        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

## 9.5 Empty Cart State

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃                      Jūsų krepšelis tuščias                           ┃
┃                                                                        ┃
┃                      [Image: empty cart icon]                          ┃
┃                                                                        ┃
┃                      Raskite tobulą kubilą                            ┃
┃                      savo namams                                       ┃
┃                                                                        ┃
┃                      [  PRADĖTI PAIEŠKĄ  ]                            ┃
┃                      (links to /raskite-savo-kubila)                  ┃
┃                                                                        ┃
┃                      arba                                              ┃
┃                                                                        ┃
┃                      [  PERŽIŪRĖTI KATALOGĄ  ]                        ┃
┃                      (links to /katalogas)                             ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 9.6 Cart Item Component

### File: `components/cart/CartItem.tsx`

```typescript
interface CartItemProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onQuantityChange?: (id: string, qty: number) => void;
}

interface CartItem {
  id: string;
  productId: string;
  productName: string;
  packageName: string;
  image: string;
  basePrice: number;
  packagePrice: number;
  extras: CartExtra[];
  totalPrice: number;
  monthlyPayment: number;
}

interface CartExtra {
  id: string;
  name: string;
  price: number;
}
```

### Display Format

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ┌──────────┐   Grande Round In                          [✕]      │
│   │          │   ─────────────────────────────────────            │
│   │  [Image] │   Populiarus paketas                               │
│   │          │   • Termo medienos apdaila                         │
│   └──────────┘   • Pilkas akrilas                                 │
│                  • Termo dangtelis                                 │
│                  • LED apšvietimas (+290 €)                        │
│                  • Hidro purkštukai (+410 €)                       │
│                                                                     │
│                  Bazinė kaina:           2 890 €                   │
│                  Populiarus paketas:       +490 €                   │
│                  Papildomi priedai:        +700 €                   │
│                  ────────────────────────────────                   │
│                  Viso:                   4 080 €                   │
│                  arba                    113 €/mėn × 36 mėn       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# PART 10: CHECKOUT SPECIFICATION

## 10.1 Psychology

Checkout is **the danger zone**. This is where most purchases die. Our strategy:

1. **Guest checkout first** - No registration required
2. **Išsimokėtinai prominent** - Makes total seem smaller
3. **Progress visibility** - Show how close they are to finishing
4. **Trust everywhere** - Guarantees, security badges, contact info
5. **One-page flow** - No separate shipping/payment pages

## 10.2 Checkout Page Layout

### Route: `/apmokejimas`

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  ← Grįžti į krepšelį                                                  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │                    UŽSAKYMAS BE REGISTRACIJOS                   │  ┃
┃  │         Nereikia kurti paskyros – užsakykite per 3 minutes     │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ━━━━ 1. Kontaktai ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ┃
┃                                                                        ┃
┃  ┌───────────────────────────────────────┬────────────────────────┐   ┃
┃  │                                       │                        │   ┃
┃  │   Vardas *                            │   JŪSŲ UŽSAKYMAS      │   ┃
┃  │   ┌─────────────────────────────┐     │                        │   ┃
┃  │   │                             │     │   Grande Round In      │   ┃
┃  │   └─────────────────────────────┘     │   Populiarus paketas   │   ┃
┃  │                                       │                        │   ┃
┃  │   Pavardė *                           │   4 080 €             │   ┃
┃  │   ┌─────────────────────────────┐     │   arba 113 €/mėn      │   ┃
┃  │   │                             │     │                        │   ┃
┃  │   └─────────────────────────────┘     │   ────────────────────│   ┃
┃  │                                       │                        │   ┃
┃  │   El. paštas *                        │   ✓ Pristatymas       │   ┃
┃  │   ┌─────────────────────────────┐     │     įskaičiuotas      │   ┃
┃  │   │                             │     │   ✓ Montavimas        │   ┃
┃  │   └─────────────────────────────┘     │     įskaičiuotas      │   ┃
┃  │                                       │   ✓ 5 m. garantija    │   ┃
┃  │   Telefonas *                         │   ✓ 14 d. grąžinimas  │   ┃
┃  │   ┌─────────────────────────────┐     │                        │   ┃
┃  │   │  +370                       │     │                        │   ┃
┃  │   └─────────────────────────────┘     │   Turite klausimų?    │   ┃
┃  │                                       │   Skambinkite:        │   ┃
┃  │                                       │   +370 600 00000      │   ┃
┃  │                                       │                        │   ┃
┃  └───────────────────────────────────────┴────────────────────────┘   ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 10.3 Delivery Section

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  ━━━━ 2. Pristatymas ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ┃
┃                                                                        ┃
┃  Pristatymo adresas                                                   ┃
┃                                                                        ┃
┃  Adresas *                                                             ┃
┃  ┌───────────────────────────────────────────────────────────────┐    ┃
┃  │                                                               │    ┃
┃  └───────────────────────────────────────────────────────────────┘    ┃
┃                                                                        ┃
┃  ┌─────────────────────┐   ┌─────────────────────┐                    ┃
┃  │ Miestas *           │   │ Pašto kodas *       │                    ┃
┃  │                     │   │                     │                    ┃
┃  └─────────────────────┘   └─────────────────────┘                    ┃
┃                                                                        ┃
┃  Papildoma informacija (neprivaloma)                                  ┃
┃  ┌───────────────────────────────────────────────────────────────┐    ┃
┃  │ Pvz: skambinti prieš atvykstant, įvažiavimas iš kitos pusės  │    ┃
┃  └───────────────────────────────────────────────────────────────┘    ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  📦 Pristatymas per 2-4 savaites                               │  ┃
┃  │     Pristatymas visoje Lietuvoje – NEMOKAMAS                   │  ┃
┃  │     Montavimas įskaičiuotas į kainą                            │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 10.4 Payment Section - CRITICAL

**Key requirement:** Išsimokėtinai must be the FIRST option, not the last.

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  ━━━━ 3. Mokėjimas ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ┃
┃                                                                        ┃
┃  Pasirinkite mokėjimo būdą:                                           ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  ⦿ IŠSIMOKĖTINAI                                   ★ REKOMENDUOJAMA │  ┃
┃  │     ─────────────────────────────────────────────────────────   │  ┃
┃  │                                                                 │  ┃
┃  │     Mokėkite dalimis nuo 113 €/mėn                             │  ┃
┃  │                                                                 │  ┃
┃  │     Pasirinkite terminą:                                        │  ┃
┃  │                                                                 │  ┃
┃  │     ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │  ┃
┃  │     │ 24 mėn      │ │ 36 mėn ★    │ │ 48 mėn      │            │  ┃
┃  │     │ 170 €/mėn   │ │ 113 €/mėn   │ │ 85 €/mėn    │            │  ┃
┃  │     └─────────────┘ └─────────────┘ └─────────────┘            │  ┃
┃  │                                                                 │  ┃
┃  │     💡 36 mėn - optimaliausias santykis tarp įmokos ir         │  ┃
┃  │        bendros sumos                                            │  ┃
┃  │                                                                 │  ┃
┃  │     • Sprendimas per 15 min.                                   │  ┃
┃  │     • Pirminė įmoka: 0 €                                       │  ┃
┃  │     • Bendra suma: 4 080 € + palūkanos                         │  ┃
┃  │                                                                 │  ┃
┃  │     Partneriai: [Bigbank logo] [Inbank logo] [SB išsimokėtinai]     │  ┃
┃  │                                                                 │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  ○ BANKO PAVEDIMAS                                              │  ┃
┃  │     ─────────────────────────────────────────────────────────   │  ┃
┃  │     Apmokėkite pavedimu per 3 darbo dienas                     │  ┃
┃  │     Suma: 4 080 €                                               │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  ○ MOKĖJIMO KORTELE                                             │  ┃
┃  │     ─────────────────────────────────────────────────────────   │  ┃
┃  │     Visa, MasterCard, Maestro                                   │  ┃
┃  │     Suma: 4 080 €                                               │  ┃
┃  │     [Visa logo] [MC logo] [Maestro logo]                        │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 10.5 Order Confirmation Section

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  ━━━━ 4. Patvirtinimas ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │                                                                 │  ┃
┃  │  □ Sutinku su pirkimo-pardavimo taisyklėmis ir                 │  ┃
┃  │    privatumo politika                                           │  ┃
┃  │                                                                 │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │                                                                 │  ┃
┃  │                  [    UŽSAKYTI DABAR    ]                      │  ┃
┃  │                                                                 │  ┃
┃  │               Arba skambinkite: +370 600 00000                 │  ┃
┃  │               Padėsime užbaigti užsakymą                        │  ┃
┃  │                                                                 │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │                                                                 │  ┃
┃  │   🔒 256-bit SSL šifravimas                                    │  ┃
┃  │   Jūsų duomenys saugiai perduodami                             │  ┃
┃  │                                                                 │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 10.6 Checkout Form Validation

```typescript
interface CheckoutFormData {
  // Contact
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Delivery
  address: string;
  city: string;
  postalCode: string;
  deliveryNotes?: string;

  // Payment
  paymentMethod: 'leasing' | 'bank-transfer' | 'card';
  leasingTerm?: 24 | 36 | 48;  // Required if paymentMethod === 'leasing'

  // Consent
  termsAccepted: boolean;
}

const validationRules = {
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { required: true, pattern: /^\+?370\d{8}$/ },
  address: { required: true, minLength: 5 },
  city: { required: true },
  postalCode: { required: true, pattern: /^LT-\d{5}$|^\d{5}$/ },
  termsAccepted: { required: true, value: true }
};
```

## 10.7 Error States

```
┌─────────────────────────────────────────────────────────────────────┐
│  ⚠️ Prašome patikrinti šiuos laukus:                              │
│                                                                     │
│  • El. paštas – neteisingas formatas                              │
│  • Telefonas – įveskite +370 formato numerį                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# PART 11: POST-PURCHASE SPECIFICATION

## 11.1 Order Success Page

### Route: `/uzsakymas/patvirtintas/[orderId]`

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃                           ✓                                           ┃
┃                                                                        ┃
┃              AČIŪ, [VARDAS]!                                          ┃
┃              Jūsų užsakymas priimtas                                  ┃
┃                                                                        ┃
┃              Užsakymo nr.: #MJS-2024-00123                           ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │                                                                 │  ┃
┃  │   Išsiuntėme patvirtinimą į:                                   │  ┃
┃  │   jonas@email.com                                               │  ┃
┃  │                                                                 │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ━━━━ KAS TOLIAU? ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  1️⃣ PER 24 VAL.                                                │  ┃
┃  │     Susisieksime dėl montavimo datos ir techninių detalių      │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  2️⃣ PER 2-4 SAVAITES                                          │  ┃
┃  │     Jūsų kubilas bus pagamintas ir pristatytas                 │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  3️⃣ MONTAVIMO DIENĄ                                           │  ┃
┃  │     Mūsų komanda sumontuos ir supažindins su naudojimu         │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ━━━━ JŪSŲ UŽSAKYMAS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │                                                                 │  ┃
┃  │   [Image]  Grande Round In                                     │  ┃
┃  │            Populiarus paketas                                   │  ┃
┃  │            • Termo medienos apdaila                             │  ┃
┃  │            • LED apšvietimas                                    │  ┃
┃  │                                                                 │  ┃
┃  │   Suma: 4 080 €                                                │  ┃
┃  │   Mokėjimas: Išsimokėtinai × 36 mėn (113 €/mėn)                     │  ┃
┃  │                                                                 │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ━━━━ PRISTATYMO ADRESAS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ┃
┃                                                                        ┃
┃  Jonas Jonaitis                                                       ┃
┃  Gedimino pr. 1                                                       ┃
┃  Vilnius, LT-01103                                                    ┃
┃                                                                        ┃
┃  ━━━━ TURITE KLAUSIMŲ? ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ┃
┃                                                                        ┃
┃  📞 +370 600 00000                                                    ┃
┃  📧 info@luxspanaturespa.lt                                                ┃
┃                                                                        ┃
┃                      [  GRĮŽTI Į PRADŽIĄ  ]                           ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 11.2 Order Confirmation Email

```
Subject: ✓ Užsakymas priimtas – Lux Spa Nature #MJS-2024-00123

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    [Lux Spa Nature Logo]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sveiki, Jonas!

Dėkojame už užsakymą! Jūsų kelionė link poilsio namie prasideda.

UŽSAKYMO NUMERIS: #MJS-2024-00123

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JŪSŲ UŽSAKYMAS

Grande Round In – Populiarus paketas
• Termo medienos apdaila
• LED apšvietimas

Suma: 4 080 €
Mokėjimas: Išsimokėtinai × 36 mėn (113 €/mėn)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KAS TOLIAU?

1️⃣ Per 24 val. susisieksime dėl montavimo datos
2️⃣ Per 2-4 savaites jūsų kubilas bus pagamintas
3️⃣ Pristatysime ir sumontuosime jūsų nurodytą dieną

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRISTATYMO ADRESAS

Jonas Jonaitis
Gedimino pr. 1
Vilnius, LT-01103

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Turite klausimų?
📞 +370 600 00000
📧 info@luxspanaturespa.lt

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    © 2024 Lux Spa Nature
                    Gaminama Lietuvoje
```

---

# PART 12: EMAIL SEQUENCES

## 12.1 Transactional Emails

| Email | Trigger | Timing |
|-------|---------|--------|
| Order Confirmation | Order placed | Immediate |
| Payment Received | Payment confirmed | Immediate |
| Production Started | Manufacturing begins | ~3-5 days |
| Ready for Delivery | Production complete | ~2-3 weeks |
| Delivery Scheduled | Date confirmed | ~3 days before |
| Post-Delivery Follow-up | After installation | 7 days after |

## 12.2 Abandoned Cart Sequence

### Email 1: Soft Reminder (2 hours after abandonment)

```
Subject: Pamiršote savo kubilą? 🛁

Sveiki,

Pastebėjome, kad palikote [Produkto pavadinimas] savo krepšelyje.

Geras pasirinkimas! Tai vienas populiariausių mūsų modelių.

[CTA: Užbaigti užsakymą]

Turite klausimų prieš perkant?
Skambinkite: +370 600 00000

---
Lux Spa Nature
```

### Email 2: Value Reminder (24 hours)

```
Subject: Primename, kas jūsų laukia

Sveiki,

Jūsų išrinktas [Produkto pavadinimas] vis dar laukia.

Štai kas įeina į jūsų pasirinktą paketą:
✓ [Paketo elementas 1]
✓ [Paketo elementas 2]
✓ [Paketo elementas 3]

Visa tai – nuo [X] €/mėn.

[CTA: Grįžti į krepšelį]

---
Lux Spa Nature
```

### Email 3: Urgency + Help Offer (48 hours)

```
Subject: Ar galime padėti?

Sveiki,

Suprantame – tai didelis sprendimas.

Gal turite klausimų, kurie trukdo apsispręsti?

• Finansavimas – padėsime išsirinkti geriausią variantą
• Montavimas – viską padarysime už jus
• Vieta – konsultuosime, kur geriausia statyti

Pasikalbėkime:
📞 +370 600 00000
📧 info@luxspanaturespa.lt

Arba [tiesiog užbaikite užsakymą].

---
Lux Spa Nature
```

## 12.3 Post-Purchase Sequence

### Day 7: Care Guide

```
Subject: Jūsų kubilo priežiūros gidas

Sveiki, [Vardas]!

Tikimės, kad jau spėjote mėgautis savo nauju [Produktas]! 🛁

Paruošėme jums priežiūros gidą:

📖 [Parsisiųsti PDF gidą]

Pagrindiniai patarimai:
1. Vandens chemija – tikrinkite kas savaitę
2. Filtro valymas – kas 2 savaites
3. Vandens keitimas – kas 3-4 mėnesius

Reikia priežiūros priemonių?
[Apsilankyti parduotuvėje]

---
Lux Spa Nature
```

### Day 30: Review Request

```
Subject: Kaip sekasi su nauju kubilu?

Sveiki, [Vardas]!

Praėjo mėnuo nuo [Produktas] įrengimo.

Norėtume sužinoti jūsų nuomonę:
• Ar viskas veikia puikiai?
• Ar esate patenkinti pasirinkimu?

[CTA: Palikti atsiliepimą]

Jūsų atsiliepimas padeda kitiems priimti sprendimą.

---
Lux Spa Nature
```

### Day 90: Referral Program

```
Subject: Pasidalinkite poilsiu su draugais

Sveiki, [Vardas]!

Džiaugiamės, kad esate Lux Spa Nature šeimos narys.

Pasiūlymas jums ir jūsų draugams:

👤 Jūsų draugas gauna: 200 € nuolaidą
🎁 Jūs gaunate: 100 € dovanų kortelę

[CTA: Gauti rekomendacijos nuorodą]

---
Lux Spa Nature
```

---

# PART 13: EXIT INTENT & RECOVERY

## 13.1 Exit Intent Modal (Product/Cart Pages)

Triggers when mouse moves toward browser close/tab area.

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                  [✕]  ┃
┃                                                                        ┃
┃                        PALAUKITE!                                     ┃
┃                                                                        ┃
┃         Prieš išeidami – gausite nemokamą                            ┃
┃         kubilo priežiūros gidą el. paštu                             ┃
┃                                                                        ┃
┃         ┌─────────────────────────────────────────┐                   ┃
┃         │  jusu@email.com                         │                   ┃
┃         └─────────────────────────────────────────┘                   ┃
┃                                                                        ┃
┃                  [    SIŲSTI GIDĄ    ]                                ┃
┃                                                                        ┃
┃         ✓ Be šlamšto. Tik naudinga informacija.                      ┃
┃                                                                        ┃
┃                   [ Ne, ačiū ]                                        ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 13.2 Exit Intent Rules

```typescript
interface ExitIntentConfig {
  enabled: boolean;
  delay: number;  // ms before showing (avoid immediate popup)
  showOnce: boolean;  // Only show once per session
  excludePages: string[];  // Don't show on checkout success, etc.
  triggerSensitivity: number;  // Mouse movement threshold
}

const exitIntentConfig: ExitIntentConfig = {
  enabled: true,
  delay: 5000,  // Wait 5 seconds before enabling
  showOnce: true,
  excludePages: [
    '/uzsakymas/patvirtintas/*',
    '/dekojame',
    '/kontaktai'
  ],
  triggerSensitivity: 50  // pixels from top
};
```

## 13.3 Lead Capture Follow-Up

After email capture from exit intent:

### Immediate: Download Link + Soft Sell

```
Subject: Jūsų kubilo priežiūros gidas 📖

Sveiki!

Štai jūsų kubilo priežiūros gidas:
[Parsisiųsti PDF]

---

Dar nepasirinkote kubilo?

Mūsų bestseleriai:
• Monaco In – nuo 55 €/mėn
• Grande Round – nuo 66 €/mėn
• Classic Round – nuo 72 €/mėn

[Rasti savo kubilą] (quiz link)

---
Lux Spa Nature
```

### Day 3: Educational Content

```
Subject: 5 klausimai, kuriuos užduoti prieš perkant kubilą

[Educational content about choosing hot tub]

[CTA: Pradėti paiešką]
```

### Day 7: Social Proof

```
Subject: Štai ką sako mūsų klientai

[Testimonials]

[CTA: Peržiūrėti katalogą]
```

---

# PART 13B: PRODUCT IMAGERY CONSTRAINT

## Important Design Limitation

**We do NOT have per-configuration product preview images.**

Available imagery:
- Main product photos (each hot tub model)
- Individual addon photos (covers, stairs, LED, etc.)
- Color swatches (shell colors)
- Wood texture photos (eglė, termo, kedras)

NOT available:
- Combined renders showing "Grande Round with termo wood + pilka shell + LED"
- Real-time product preview that updates as selections change

### Design Approach

1. **Configurator steps:** Show main product image as hero, display addon/material thumbnails next to each selection
2. **Review step:** Main product image + thumbnails of selected addons next to line items
3. **Color selection:** Show color swatches only (no shell preview)
4. **Wood selection:** Show wood texture swatches (no exterior preview)
5. **Cart/Checkout:** Main product image + text description of customizations

This is a UX constraint, not a bug. Most premium hot tub configurators work this way because:
- Generating renders for every combination is expensive
- Customers buying €2,000+ items expect some imagination
- Text descriptions + addon images provide sufficient clarity

---

# PART 14: COMPONENT LIBRARY

## 14.1 New Components Required

| Component | Location | Purpose |
|-----------|----------|---------|
| `QuizLayout.tsx` | `components/quiz/` | Full-screen quiz wrapper |
| `QuizProgress.tsx` | `components/quiz/` | Step progress bar |
| `QuizOption.tsx` | `components/quiz/` | Selectable option card |
| `QuizResults.tsx` | `components/quiz/` | Results page layout |
| `PackageSelector.tsx` | `components/product/` | Package selection cards |
| `PackageCard.tsx` | `components/product/` | Individual package card |
| `ProductPositioning.tsx` | `components/product/` | "Why this model" section |
| `ProductFAQ.tsx` | `components/product/` | Accordion FAQ |
| `ValueStacking.tsx` | `components/product/` | Included value breakdown |
| `StickyMobileCTA.tsx` | `components/product/` | Mobile bottom bar |
| `WizardProgress.tsx` | `components/configurator/` | Step wizard progress |
| `WizardNavigation.tsx` | `components/configurator/` | Back/Next buttons |
| `ConfigPackageStep.tsx` | `components/configurator/` | Step 1 content |
| `ConfigWoodStep.tsx` | `components/configurator/` | Step 2 content |
| `ConfigColorStep.tsx` | `components/configurator/` | Step 3 content |
| `ConfigExtrasStep.tsx` | `components/configurator/` | Step 4 content |
| `ConfigReviewStep.tsx` | `components/configurator/` | Step 5 content |
| `CartItem.tsx` | `components/cart/` | Cart item display |
| `CartUpsell.tsx` | `components/cart/` | Upsell card |
| `ExitIntentModal.tsx` | `components/marketing/` | Exit intent popup |
| `PaymentMethodCard.tsx` | `components/checkout/` | Payment option card |
| `PaymentTermSelector.tsx` | `components/checkout/` | Išsimokėtinai term selector (24/36/48 mėn) |

## 14.2 Component Specifications

### QuizOption.tsx

```typescript
interface QuizOptionProps {
  title: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  badge?: string;
  selected?: boolean;
  onClick: () => void;
  variant?: 'default' | 'large' | 'with-image';
}

// Styling
const styles = {
  base: 'bg-surface-container-low border border-outline-variant/30 rounded-sm p-6 cursor-pointer transition-all duration-300',
  selected: 'border-primary border-2 bg-primary/5',
  hover: 'hover:border-primary/50 hover:shadow-md'
};
```

### PackageCard.tsx

```typescript
interface PackageCardProps {
  package: ProductPackage;
  basePrice: number;
  selected: boolean;
  onSelect: () => void;
}

interface ProductPackage {
  id: 'bazinis' | 'populiarus' | 'premium';
  name: string;
  priceModifier: number;
  included: PackageItem[];
  badge?: string;
  isRecommended?: boolean;
}

interface PackageItem {
  name: string;
  value?: string;
  icon?: string;
}
```

### StickyMobileCTA.tsx

```typescript
interface StickyMobileCTAProps {
  price: number;
  monthlyPayment: number;
  ctaText: string;
  onCTAClick: () => void;
}

// Only visible on mobile (lg:hidden)
// Fixed to bottom of screen
// Contains price, monthly payment, and CTA button
```

---

# PART 15: DATA MODELS

## 15.1 Product Extended Schema

```typescript
interface Product {
  // Existing fields
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: 'hot-tub' | 'sauna' | 'cold-therapy';
  images: string[];
  price: number;
  capacity: string;
  dimensions: Dimensions;
  features: string[];
  specifications: Specification[];

  // NEW: CRO fields
  monthlyPayment: number;  // price / 36
  packages: ProductPackage[];
  positioning: ProductPositioning;
  targetPersonas: string[];  // ['family', 'athlete', 'luxury']

  // Quiz matching
  quizFilters: {
    purpose: ('hot' | 'cold' | 'ofuro')[];
    capacity: ('small' | 'medium' | 'large')[];
    design: ('round' | 'square')[];
  };
}

interface ProductPackage {
  id: 'bazinis' | 'populiarus' | 'premium';
  name: string;
  priceModifier: number;
  monthlyModifier: number;  // priceModifier / 36
  included: PackageItem[];
  badge?: string;
  badgeType?: 'popular' | 'value' | 'premium';
  isRecommended: boolean;
  selectionPercentage?: number;  // For social proof
}

interface PackageItem {
  id: string;
  name: string;
  value?: string;  // e.g., "Termo mediena" → "180 € vertė"
  included: boolean;
}

interface ProductPositioning {
  headline: string;  // "Kodėl Grande Round In?"
  subheadline: string;  // Italic positioning text
  suitableFor: string[];  // "Tinka jums, jei:" bullets
  keyBenefit: string;  // One-liner benefit
}
```

## 15.2 Quiz State Schema

```typescript
interface QuizState {
  // Selections
  purpose: 'hot' | 'cold' | 'ofuro' | null;
  capacity: 'small' | 'medium' | 'large' | null;
  design: 'round' | 'square' | null;

  // Progress
  currentStep: number;  // 1, 2, or 3
  completedSteps: number[];

  // Results
  matchedProducts: Product[];
  recommendedProduct: Product | null;

  // Actions
  selectPurpose: (purpose: string) => void;
  selectCapacity: (capacity: string) => void;
  selectDesign: (design: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  calculateResults: () => void;
}
```

## 15.3 Cart Item Schema

```typescript
interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  productImage: string;

  // Package
  packageId: 'bazinis' | 'populiarus' | 'premium';
  packageName: string;
  packagePrice: number;

  // Customizations
  wood?: {
    id: string;
    name: string;
    price: number;
  };
  color?: {
    id: string;
    name: string;
    price: number;
  };
  extras: CartExtra[];

  // Totals
  basePrice: number;
  totalPrice: number;
  monthlyPayment: number;

  // Timestamps
  addedAt: Date;
}

interface CartExtra {
  id: string;
  name: string;
  price: number;
  category: string;
}
```

## 15.4 Order Schema

```typescript
interface Order {
  id: string;
  orderNumber: string;  // Format: MJS-YYYY-NNNNN

  // Customer
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  // Delivery
  delivery: {
    address: string;
    city: string;
    postalCode: string;
    notes?: string;
  };

  // Payment
  payment: {
    method: 'leasing' | 'bank-transfer' | 'card';
    leasingTerm?: 24 | 36 | 48;
    monthlyPayment?: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
  };

  // Items
  items: CartItem[];

  // Totals
  subtotal: number;
  shipping: number;  // Always 0 (included)
  total: number;

  // Status
  status: 'pending' | 'confirmed' | 'production' | 'ready' | 'delivered';

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date;
  deliveredAt?: Date;
}
```

---

# PART 16: API ENDPOINTS

## 16.1 Quiz API

### GET `/api/quiz/results`

```typescript
// Query params
interface QuizResultsQuery {
  purpose: 'hot' | 'cold' | 'ofuro';
  capacity?: 'small' | 'medium' | 'large';
  design?: 'round' | 'square';
}

// Response
interface QuizResultsResponse {
  recommended: Product;  // Top match
  alternatives: Product[];  // Other matches (max 3)
  totalMatches: number;
  filters: {
    purpose: string;
    capacity: string;
    design: string;
  };
}
```

## 16.2 Product API Extensions

### GET `/api/products/[slug]`

Extended response includes packages and positioning:

```typescript
interface ProductResponse extends Product {
  packages: ProductPackage[];
  positioning: ProductPositioning;
  faqs: FAQ[];
  upsells: UpsellItem[];
}
```

## 16.3 Cart API

### POST `/api/cart/add`

```typescript
interface AddToCartRequest {
  productId: string;
  packageId: 'bazinis' | 'populiarus' | 'premium';
  wood?: string;
  color?: string;
  extras?: string[];
}

interface AddToCartResponse {
  success: boolean;
  cartItem: CartItem;
  cart: Cart;
}
```

### POST `/api/cart/upsell`

```typescript
interface AddUpsellRequest {
  cartItemId: string;
  upsellId: string;
}
```

## 16.4 Checkout API

### POST `/api/checkout`

```typescript
interface CheckoutRequest {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  delivery: {
    address: string;
    city: string;
    postalCode: string;
    notes?: string;
  };
  payment: {
    method: 'leasing' | 'bank-transfer' | 'card';
    leasingTerm?: 24 | 36 | 48;
  };
  cart: Cart;
  termsAccepted: boolean;
}

interface CheckoutResponse {
  success: boolean;
  orderId: string;
  orderNumber: string;
  redirectUrl?: string;  // For card payments
}
```

## 16.5 Lead Capture API

### POST `/api/leads/exit-intent`

```typescript
interface ExitIntentLeadRequest {
  email: string;
  source: 'exit-intent';
  page: string;  // URL where captured
  cartContents?: CartItem[];  // If captured from cart
}
```

---

# PART 17: ANALYTICS & TRACKING

## 17.1 Required Events

### Quiz Events

```typescript
// Quiz started
gtag('event', 'quiz_started', {
  event_category: 'quiz',
  source: 'hero' | 'banner' | 'nav'
});

// Quiz step completed
gtag('event', 'quiz_step_completed', {
  event_category: 'quiz',
  step_number: 1 | 2 | 3,
  step_name: 'purpose' | 'capacity' | 'design',
  selection: string
});

// Quiz completed
gtag('event', 'quiz_completed', {
  event_category: 'quiz',
  purpose: string,
  capacity: string,
  design: string,
  results_count: number
});

// Quiz result clicked
gtag('event', 'quiz_result_clicked', {
  event_category: 'quiz',
  product_id: string,
  product_name: string,
  position: 'recommended' | 'alternative'
});
```

### Product Page Events

```typescript
// Package viewed
gtag('event', 'package_viewed', {
  event_category: 'product',
  product_id: string,
  package_id: string
});

// Package selected
gtag('event', 'package_selected', {
  event_category: 'product',
  product_id: string,
  package_id: string,
  package_name: string,
  price: number
});

// Configure clicked
gtag('event', 'configure_clicked', {
  event_category: 'product',
  product_id: string,
  starting_package: string
});

// Add to cart
gtag('event', 'add_to_cart', {
  event_category: 'ecommerce',
  product_id: string,
  package_id: string,
  value: number,
  currency: 'EUR'
});
```

### Configurator Events

```typescript
// Configurator started
gtag('event', 'configurator_started', {
  event_category: 'configurator',
  product_id: string,
  starting_package: string
});

// Configurator step completed
gtag('event', 'configurator_step_completed', {
  event_category: 'configurator',
  step_number: 1 | 2 | 3 | 4 | 5,
  step_name: string,
  selection: string
});

// Configurator completed
gtag('event', 'configurator_completed', {
  event_category: 'configurator',
  product_id: string,
  final_price: number,
  extras_count: number
});
```

### Checkout Events

```typescript
// Checkout started
gtag('event', 'begin_checkout', {
  event_category: 'ecommerce',
  value: number,
  currency: 'EUR',
  items: CartItem[]
});

// Payment method selected
gtag('event', 'payment_method_selected', {
  event_category: 'checkout',
  method: 'leasing' | 'bank-transfer' | 'card',
  leasing_term?: number
});

// Purchase completed
gtag('event', 'purchase', {
  event_category: 'ecommerce',
  transaction_id: string,
  value: number,
  currency: 'EUR',
  payment_method: string,
  items: CartItem[]
});
```

## 17.2 Conversion Funnels

### Primary Funnel: Quiz → Purchase

```
Step 1: quiz_started
Step 2: quiz_step_completed (step 1)
Step 3: quiz_step_completed (step 2)
Step 4: quiz_step_completed (step 3)
Step 5: quiz_result_clicked
Step 6: package_selected
Step 7: add_to_cart
Step 8: begin_checkout
Step 9: purchase
```

### Secondary Funnel: Catalog → Purchase

```
Step 1: catalog_viewed
Step 2: product_viewed
Step 3: package_selected
Step 4: add_to_cart
Step 5: begin_checkout
Step 6: purchase
```

### Configuration Funnel

```
Step 1: configurator_started
Step 2: configurator_step_completed (step 1)
Step 3: configurator_step_completed (step 2)
Step 4: configurator_step_completed (step 3)
Step 5: configurator_step_completed (step 4)
Step 6: configurator_step_completed (step 5)
Step 7: add_to_cart
```

## 17.3 Key Metrics to Track

| Metric | Target | Description |
|--------|--------|-------------|
| Quiz Completion Rate | 70%+ | % who complete all 3 steps |
| Results → Product CTR | 60%+ | % who click a result |
| Package Selection Rate | 85%+ | % who choose package vs configure |
| Add to Cart Rate | 15%+ | % of product page visitors |
| Cart → Checkout Rate | 70%+ | % who proceed to checkout |
| Checkout Completion Rate | 60%+ | % who complete purchase |
| Išsimokėtinai Selection Rate | 60%+ | % who choose išsimokėtinai |
| AOV (Average Order Value) | €3,500+ | Including packages/extras |

---

# PART 18: COPY & MICROCOPY

## 18.1 Headlines

| Location | Current | New |
|----------|---------|-----|
| Hero | "Mediniai kubilai" | "Jūsų namų SPA – nuo 55 €/mėn" |
| Quiz CTA | "Padėk išsirinkti" | "Rasti tobulą kubilą per 60 sek." |
| Results | "Rezultatai" | "Jūsų tobulas kubilas" |
| Package Default | "Pasirinkite paketą" | "Pasirinkite savo paketą" |
| Add to Cart | "Į krepšelį" | "Noriu šį kubilą" |

## 18.2 Button Text

| Context | Text |
|---------|------|
| Quiz Start | "PRADĖTI PAIEŠKĄ" |
| Quiz Next | "TĘSTI" |
| Quiz Back | "← ATGAL" |
| Results Primary | "PERŽIŪRĖTI" |
| Package Select | "PASIRINKTI" |
| Configure | "KONFIGŪRUOTI DETALIAU" |
| Add to Cart | "Į KREPŠELĮ" |
| Checkout | "TĘSTI UŽSAKYMĄ" |
| Complete Order | "UŽSAKYTI DABAR" |

## 18.3 Trust Microcopy

| Context | Text |
|---------|------|
| Price | "nuo X €/mėn" |
| Delivery | "Pristatymas per 2-4 savaites" |
| Guarantee | "5 metų garantija" |
| Returns | "14 dienų grąžinimo garantija" |
| Made in | "Gaminama Lietuvoje" |
| Secure | "Saugus mokėjimas" |
| Installation | "Montavimas įskaičiuotas" |

## 18.4 Social Proof Badges

| Context | Text |
|---------|------|
| Popular Package | "★ 73% RENKASI" |
| Bestseller | "★ DAUGUMA RENKASI" |
| Upsell | "★ 87% prideda" |
| Recommended | "★ REKOMENDUOJAMA" |

## 18.5 Error Messages

| Error | Message |
|-------|---------|
| Required field | "Šis laukas privalomas" |
| Invalid email | "Įveskite teisingą el. pašto adresą" |
| Invalid phone | "Įveskite +370 formato numerį" |
| Invalid postal | "Įveskite LT-XXXXX formato kodą" |
| Terms required | "Prašome patvirtinti sąlygas" |
| Generic | "Kažkas nutiko. Bandykite dar kartą." |

## 18.6 Confirmation Messages

| Action | Message |
|--------|---------|
| Added to cart | "Pridėta į krepšelį ✓" |
| Removed from cart | "Pašalinta iš krepšelio" |
| Email subscribed | "Puiku! Patikrinkite savo el. paštą." |
| Order placed | "Ačiū! Jūsų užsakymas priimtas." |

---

# PART 19: ANIMATIONS & TRANSITIONS

## 19.1 Page Transitions

All page transitions use Framer Motion:

```typescript
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3
};
```

## 19.2 Quiz Transitions

```typescript
// Step transition
const quizStepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

const quizStepTransition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],  // Smooth cubic
  duration: 0.4
};

// Option card selection
const optionSelectVariants = {
  tap: { scale: 0.98 },
  selected: {
    scale: 1,
    borderColor: 'var(--color-primary)',
    transition: { duration: 0.2 }
  }
};
```

## 19.3 Package Card Animations

```typescript
// Package card hover/select
const packageCardVariants = {
  initial: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4 },
  selected: {
    scale: 1.02,
    borderWidth: 2,
    borderColor: 'var(--color-primary)'
  }
};

// Badge animation (on select)
const badgeVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 }
  }
};
```

## 19.4 Configurator Step Animations

```typescript
// Progress bar
const progressVariants = {
  initial: { width: '0%' },
  animate: (step: number) => ({
    width: `${(step / 5) * 100}%`,
    transition: { duration: 0.5, ease: 'easeOut' }
  })
};

// Price update animation
const priceUpdateVariants = {
  update: {
    scale: [1, 1.05, 1],
    transition: { duration: 0.3 }
  }
};
```

## 19.5 Cart/Checkout Animations

```typescript
// Cart item add
const cartItemAddVariants = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2 }
  }
};

// Upsell slide-in
const upsellSlideVariants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { staggerChildren: 0.1 }
  }
};

// Success checkmark
const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};
```

## 19.6 Modal Animations

```typescript
// Exit intent modal
const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', damping: 25 }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

// Backdrop
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};
```

---

# PART 20: MOBILE-SPECIFIC BEHAVIORS

## 20.1 Mobile Navigation

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  [≡]  Lux Spa Nature  [🛒] ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

Mobile menu (hamburger):
┌─────────────────────────┐
│  Pradžia                │
│  Rasti savo kubilą ★    │
│  Katalogas              │
│  Kubilai                │
│  Saunos                 │
│  Kontaktai              │
│                         │
│  ☎ +370 600 00000      │
└─────────────────────────┘
```

## 20.2 Mobile Quiz Layout

On mobile, quiz options stack vertically:

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ← ATGAL        1/3     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                         ┃
┃   Koks jūsų tikslas?   ┃
┃                         ┃
┃   ┌─────────────────┐  ┃
┃   │    [Icon]       │  ┃
┃   │  Karšto vandens │  ┃
┃   │  maudynės       │  ┃
┃   │                 │  ┃
┃   │  Šeimai,        │  ┃
┃   │  draugams,      │  ┃
┃   │  poilsiui       │  ┃
┃   └─────────────────┘  ┃
┃                         ┃
┃   ┌─────────────────┐  ┃
┃   │    [Icon]       │  ┃
┃   │  Šalčio         │  ┃
┃   │  terapija       │  ┃
┃   │                 │  ┃
┃   │  Sportui,       │  ┃
┃   │  atsigavimui    │  ┃
┃   └─────────────────┘  ┃
┃                         ┃
┃   ┌─────────────────┐  ┃
┃   │    [Icon]       │  ┃
┃   │  Ofuro          │  ┃
┃   │                 │  ┃
┃   │  Japoniškas     │  ┃
┃   │  minimalizmas   │  ┃
┃   └─────────────────┘  ┃
┃                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 20.3 Sticky Mobile CTA

Always visible on product pages (mobile only):

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  2 890 €              [Į KREPŠELĮ]┃
┃  arba 80 €/mėn                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 20.4 Mobile Package Cards

Stack vertically on mobile:

```
┌─────────────────────────┐
│  BAZINIS                │
│  ─────────────────────  │
│  ✓ Kubilo montavimas    │
│  ✓ Krosnelė            │
│  ✓ Pristatymas         │
│                         │
│  2 890 €               │
│  nuo 80 €/mėn          │
│                         │
│  [    PASIRINKTI    ]   │
└─────────────────────────┘

┌─────────────────────────┐
│  ★ POPULIARUS          │
│  ★ 73% RENKASI         │
│  ─────────────────────  │
│  Viskas iš Bazinis, +   │
│  ✓ Termo dangtelis     │
│  ✓ Mediniai laiptai    │
│  ...                    │
└─────────────────────────┘
```

## 20.5 Mobile Configurator

Simplified one-screen-per-step approach:

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ← ATGAL     2/5  KAINA: ┃
┃                 3 380 € ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                         ┃
┃   Pasirinkite medieną   ┃
┃                         ┃
┃   ┌─────────────────┐  ┃
┃   │  [●] Eglė       │  ┃
┃   │      +0 €       │  ┃
┃   └─────────────────┘  ┃
┃                         ┃
┃   ┌─────────────────┐  ┃
┃   │  [ ] Termo      │  ┃
┃   │      +180 €     │  ┃
┃   │      ★ Ilgaamž. │  ┃
┃   └─────────────────┘  ┃
┃                         ┃
┃   ┌─────────────────┐  ┃
┃   │  [ ] Kedras     │  ┃
┃   │      +350 €     │  ┃
┃   │      ★ Premium  │  ┃
┃   └─────────────────┘  ┃
┃                         ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  [    TĘSTI →    ]     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 20.6 Touch Interactions

```typescript
// Swipe support for quiz
const swipeHandlers = useSwipeable({
  onSwipedLeft: () => {
    if (canGoNext) nextStep();
  },
  onSwipedRight: () => {
    if (canGoBack) prevStep();
  },
  preventScrollOnSwipe: true,
  trackMouse: false
});

// Pull to refresh disabled on quiz
// Double-tap zoom disabled on interactive elements
```

## 20.7 Mobile Checkout Optimizations

- Auto-focus first field on section expand
- Phone number input uses `type="tel"` for numeric keyboard
- Postal code uses `inputMode="numeric"`
- Address fields use autocomplete attributes
- Payment options are full-width tappable areas

```html
<input type="tel" inputMode="numeric" pattern="[0-9+]*"
       autoComplete="tel" placeholder="+370 600 00000" />
```

---

# APPENDIX A: IMPLEMENTATION PRIORITY MATRIX

## Critical Path (Launch Blockers)

| Priority | Item | Files | Est. Hours |
|----------|------|-------|------------|
| P0-1 | Monthly payment everywhere | ProductCard, Bestsellers, ProductInfo | 2h |
| P0-2 | Full-screen quiz pages | 4 new routes + 3 components | 8h |
| P0-3 | Package selector | PackageSelector + PackageCard | 4h |
| P0-4 | Product FAQ | ProductFAQ component | 2h |
| P0-5 | Sticky mobile CTA | StickyMobileCTA component | 2h |
| P0-6 | Checkout išsimokėtinai first | PaymentMethods refactor | 3h |
| P0-7 | Guest checkout messaging | Checkout page updates | 1h |

**Total P0: ~22 hours**

## High Impact (Week 2)

| Priority | Item | Est. Hours |
|----------|------|------------|
| P1-1 | Configurator wizard | 6h |
| P1-2 | Catalog filter simplification | 2h |
| P1-3 | Cart upsells enhancement | 3h |
| P1-4 | Product positioning section | 2h |
| P1-5 | Delivery timeline messaging | 1h |

**Total P1: ~14 hours**

## Medium Impact (Week 3+)

| Priority | Item | Est. Hours |
|----------|------|------------|
| P2-1 | Value stacking component | 3h |
| P2-2 | Exit intent modal | 4h |
| P2-3 | Quiz banner enhancement | 1h |
| P2-4 | Trust strip reuse | 1h |

**Total P2: ~9 hours**

---

# APPENDIX B: SUCCESS METRICS

## Funnel Targets

| Metric | Current (Est.) | Target | Measurement |
|--------|----------------|--------|-------------|
| Quiz Start Rate | N/A | 30% of homepage visitors | GA4 |
| Quiz Completion | N/A | 70% | GA4 |
| Results → Product | N/A | 60% | GA4 |
| Product → Cart | 5% | 15% | GA4 |
| Cart → Checkout | 40% | 70% | GA4 |
| Checkout Completion | 30% | 60% | GA4 |
| **Overall Conversion** | **0.5%** | **3%+** | GA4 |

## Revenue Targets

| Metric | Current | Target |
|--------|---------|--------|
| Average Order Value | €2,500 | €3,500+ |
| Išsimokėtinai Selection | Unknown | 60%+ |
| Package Selection | N/A | 85%+ |
| Upsell Attachment | Unknown | 40%+ |

---

# APPENDIX C: TESTING CHECKLIST

## Quiz Flow

- [ ] Step 1 → Step 2 navigation works
- [ ] Step 2 → Step 3 navigation works
- [ ] Step 3 → Results navigation works
- [ ] Back button works on all steps
- [ ] Mobile swipe navigation works
- [ ] Results show correct filtered products
- [ ] "Šalčio terapija" path shows Arctic products
- [ ] "Ofuro" path redirects correctly
- [ ] Progress bar updates correctly
- [ ] Animations are smooth (60fps)

## Package Selection

- [ ] All 3 packages display correctly
- [ ] Price calculations are accurate
- [ ] Monthly payment displays correctly
- [ ] Package items list is complete
- [ ] Social proof badge shows on Populiarus
- [ ] Selection state is visually clear
- [ ] Add to cart works for each package

## Configurator Wizard

- [ ] All 5 steps accessible
- [ ] Progress indicator updates
- [ ] Live price updates work
- [ ] Back/Next navigation works
- [ ] Selections persist between steps
- [ ] Final review shows all selections
- [ ] Add to cart from review works

## Checkout

- [ ] Guest checkout works (no account needed)
- [ ] Išsimokėtinai is first payment option
- [ ] Term selector calculates correctly
- [ ] All payment methods selectable
- [ ] Form validation works
- [ ] Order submission succeeds
- [ ] Confirmation email sends
- [ ] Success page displays correctly

## Mobile

- [ ] Quiz works on mobile
- [ ] Sticky CTA is visible and works
- [ ] Package cards stack correctly
- [ ] Configurator is usable on mobile
- [ ] Checkout form is mobile-friendly
- [ ] Touch targets are 44px+ minimum

---

# APPENDIX D: CODEBASE GAP ANALYSIS

## D.1 Executive Summary

The current codebase has significant gaps compared to this specification. **The most critical issue is that the primary conversion path (packages) doesn't exist** - users can ONLY configure, which is the 15% power-user path. The 85% "just sell me something" path is completely missing.

**Status:** 16 issues identified

## D.2 P0: CRITICAL (Launch Blockers)

### Issue #1: "Lizingas" Terminology Still in Code

**Problem:** "Lizingas" sounds expensive and like a GOTCHA. Must use "išsimokėtinai" instead.

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

### Issue #2: Payment Methods Order Wrong

**Problem:** Checkout shows payment options in wrong order. Išsimokėtinai should be FIRST.

**File:** `components/checkout/PaymentMethods.tsx` lines 24-44

**Current order:**
1. Banklink (first)
2. Card (second)
3. Leasing (third, but highlighted)

**Required order:**
1. Išsimokėtinai (★ REKOMENDUOJAMA badge)
2. Banklink
3. Card

**Fix:** Reorder `paymentOptions` array:
```typescript
const paymentOptions: PaymentOption[] = [
  {
    id: "leasing",
    title: "Išsimokėtinai",
    description: "Nuo X €/mėn – Be pradinio įnašo",
    icon: "payments",
    highlighted: true,
    badge: "★ REKOMENDUOJAMA",
  },
  { id: "banklink", title: "Bankinis pavedimas", ... },
  { id: "card", title: "Mokėjimo kortelė", ... },
];
```

### Issue #3: Monthly Payment NOT Leading

**Problem:** Full price shown first everywhere. Monthly payment should be PRIMARY.

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

**ProductCard has NO monthly payment at all** - critical fix needed.

### Issue #4: Quiz is Modal, Not Full-Screen Pages

**Problem:** Quiz opens as modal popup from Hero.tsx. Should be full-screen pages.

**Current:**
- `components/marketing/Hero.tsx` line 33-35: `onClick={() => setIsQuizOpen(true)}`
- `components/marketing/ProductFinderQuiz.tsx`: Modal component

**Required:**
- `app/raskite-savo-kubila/page.tsx` - Step 1
- `app/raskite-savo-kubila/rezultatai/page.tsx` - Results
- Change Hero.tsx CTA from `onClick` to `<Link href="/raskite-savo-kubila">`

### Issue #5: Product Page Missing Package Selector (CRITICAL!)

**Problem:** Product page only has "Konfiguruoti" CTA. NO package selector.

**This is the BIGGEST conversion killer:**
- 85% of users who want a quick decision → no path exists
- Everyone forced through 15% power-user configurator path

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

**Missing components:**
- `components/product/PackageSelector.tsx`
- `components/product/PackageCard.tsx`

### Issue #6: Bestsellers Component Price Order

**Problem:** Full price first, monthly as afterthought.

**File:** `components/marketing/Bestsellers.tsx` lines 94-99

**Fix:** Swap to show monthly first, full price secondary.

## D.3 P1: HIGH IMPACT

### Issue #7: Product Page Missing FAQ

**File:** `app/produktas/[slug]/page.tsx`
**Missing:** `components/product/ProductFAQ.tsx`

### Issue #8: Product Page Missing Positioning Section

**Missing:** `components/product/ProductPositioning.tsx`
- "Kodėl šis modelis?" headline
- "Tinka jums, jei:" bullet list

### Issue #9: Product Page Missing Sticky Mobile CTA

**Missing:** `components/product/StickyMobileCTA.tsx` (lg:hidden)

### Issue #10: Cart Missing Monthly Payment Display

**File:** `app/krepselis/page.tsx` lines 117-125
**Fix:** Add monthly equivalent below total.

### Issue #11: Cart Missing Delivery Timeline

**File:** `app/krepselis/page.tsx`
**Fix:** Add "Pristatymas per 2-4 savaites" to trust badges.

### Issue #12: Configurator Missing Package as Step 1

**File:** `stores/configurator.ts`
**Current:** wood → color → extras → review
**Required:** package → wood → color → extras → review

## D.4 P2: MEDIUM IMPACT

### Issue #13: No Exit Intent Modal

`ExitIntentModal.tsx` doesn't exist.

### Issue #14: Cart Upsells Missing Social Proof

`UpsellEngine.tsx` needs "★ 87% renkasi" badges.

### Issue #15: Guest Checkout Messaging Missing

Add "Užsakymas be registracijos" banner to checkout.

### Issue #16: Products Missing Package Data

Product JSON needs `packages` array:
```json
{
  "packages": [
    { "id": "bazinis", "priceModifier": 0, "included": [...] },
    { "id": "populiarus", "priceModifier": 490, "badge": "★ 73% RENKASI", "isRecommended": true, ... },
    { "id": "premium", "priceModifier": 1090, ... }
  ]
}
```

## D.5 Implementation Priority

| Priority | Issues | Est. Hours |
|----------|--------|------------|
| P0 (Week 1) | #1, #2, #3, #4, #5, #6 | 20h |
| P1 (Week 2) | #7, #8, #9, #10, #11, #12 | 14h |
| P2 (Week 3) | #13, #14, #15, #16 | 10h |

**Total: ~44 hours of development work**

## D.6 Quick Wins (< 30 min each)

1. Issue #1: Find/replace "Lizingas" → "Išsimokėtinai" in 2 files
2. Issue #2: Reorder array in PaymentMethods.tsx
3. Issue #6: Swap price order in Bestsellers.tsx
4. Issue #10: Add monthly payment line in cart summary
5. Issue #11: Add delivery timeline badge in cart

---

# APPENDIX E: FILE-BY-FILE CHANGES

## E.1 Files to Modify

| File | Changes | Priority |
|------|---------|----------|
| `components/marketing/Hero.tsx` | Remove modal onClick, add Link to quiz route | P0 |
| `components/product/ProductInfo.tsx` | "Lizingas"→"Išsimokėtinai", monthly first | P0 |
| `components/catalog/ProductCard.tsx` | Add monthly payment display | P0 |
| `components/marketing/Bestsellers.tsx` | Swap price order (monthly first) | P0 |
| `components/checkout/PaymentMethods.tsx` | Reorder options, fix terminology | P0 |
| `app/produktas/[slug]/page.tsx` | Add PackageSelector, FAQ, Positioning | P0 |
| `stores/configurator.ts` | Add selectedPackage, package as step 1 | P1 |
| `app/krepselis/page.tsx` | Add monthly display, delivery timeline | P1 |
| `components/cart/UpsellEngine.tsx` | Add social proof badges | P2 |
| `app/(checkout)/atsiskaitymas/page.tsx` | Add guest checkout banner | P2 |

## E.2 Files to Create

| File | Purpose | Priority |
|------|---------|----------|
| `app/raskite-savo-kubila/page.tsx` | Quiz Step 1 | P0 |
| `app/raskite-savo-kubila/rezultatai/page.tsx` | Quiz Results | P0 |
| `components/quiz/QuizLayout.tsx` | Shared quiz layout | P0 |
| `components/quiz/QuizOption.tsx` | Option card component | P0 |
| `components/quiz/QuizProgress.tsx` | Progress indicator | P0 |
| `components/product/PackageSelector.tsx` | Package selection UI | P0 |
| `components/product/PackageCard.tsx` | Individual package card | P0 |
| `components/product/ProductFAQ.tsx` | FAQ accordion | P1 |
| `components/product/ProductPositioning.tsx` | "Why this model" section | P1 |
| `components/product/StickyMobileCTA.tsx` | Mobile bottom bar | P1 |
| `components/marketing/ExitIntentModal.tsx` | Exit intent popup | P2 |

## E.3 Data Changes

### Product Data Schema Extension

Each product needs:
```typescript
interface Product {
  // ... existing fields ...

  // NEW REQUIRED FIELDS
  monthlyPayment: number;  // basePrice / 36
  packages: ProductPackage[];
  positioning: {
    headline: string;
    narrative: string;
    suitableFor: string[];
  };
}
```

### Package Definition per Product

```typescript
const STANDARD_PACKAGES: ProductPackage[] = [
  {
    id: 'bazinis',
    name: 'Bazinis',
    priceModifier: 0,
    included: [
      { name: 'Kubilas', included: true },
      { name: 'Krosnelė', included: true },
      { name: 'Standartinis dangtis', included: true },
      { name: 'Pristatymas', included: true },
      { name: 'Montavimas', included: true },
    ]
  },
  {
    id: 'populiarus',
    name: 'Populiarus',
    priceModifier: 490,
    badge: '★ 73% RENKASI',
    isRecommended: true,
    included: [
      // ...all from Bazinis, plus:
      { name: 'Termo dangtelis', included: true, value: '290 €' },
      { name: 'Mediniai laiptai', included: true, value: '190 €' },
      { name: 'Priežiūros rinkinys', included: true, value: '89 €' },
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    priceModifier: 1090,
    included: [
      // ...all from Populiarus, plus:
      { name: 'Termo medienos apdaila', included: true, value: '180 €' },
      { name: 'LED apšvietimas', included: true, value: '290 €' },
      { name: 'Hidro masažas (6 vnt.)', included: true, value: '320 €' },
    ]
  }
];
```

---

---

# APPENDIX F: PAGE-SPECIFIC CRO ANALYSIS

Detailed component-level analysis for each page in the user journey.

## F.1 HOMEPAGE COMPONENTS

### F.1.1 Hero Component

**File:** `components/marketing/Hero.tsx`

**Current Issues:**
1. Quiz CTA opens modal instead of navigating to dedicated `/raskite-savo-kubila` page
2. No monthly payment messaging in hero headline
3. Generic headline doesn't communicate affordability
4. Trust strip has "IŠMANUS MOKĖJIMAS DALIMIS" but not emphasized
5. Two equal-weight CTAs create choice paralysis

**Required Changes:**

```tsx
// BEFORE (line 34):
onClick={() => setIsQuizOpen(true)}

// AFTER:
<Link href="/raskite-savo-kubila">
```

Add monthly payment subheadline:
```tsx
<h1>Jūsų poilsio zona kieme.</h1>
<p className="text-xl md:text-2xl mb-6 text-white/90">
  Nuo 75 €/mėn. su 0% finansavimu.
</p>
```

Add urgency messaging:
```tsx
<p className="text-sm uppercase tracking-wide mb-4 text-white/80">
  🔥 Pavasario gamybos grafikas sparčiai pildosi
</p>
```

### F.1.2 ProcessSteps Component

**File:** `components/marketing/ProcessSteps.tsx`

**Current Issues:**
1. No CTA at bottom - dead end
2. No monthly payment mention
3. Generic delivery messaging

**Required Changes:**

Add CTA at bottom:
```tsx
<div className="text-center mt-12">
  <Link href="/raskite-savo-kubila">
    <button className="bg-primary text-white px-8 py-4 text-sm uppercase tracking-wide">
      PRADĖTI KONFIGŪRACIJĄ
    </button>
  </Link>
  <p className="text-sm text-gray-500 mt-3">
    Nuo 75 €/mėn. • 0% palūkanų • Pristatymas per 4-6 savaites
  </p>
</div>
```

Update delivery timeline to specific: "per 4-6 savaites visoje Lietuvoje"

Add guarantee to step 3: "5 metų garantija visoms gamybos detalėms"

### F.1.3 CategoryGrid Component

**File:** `components/marketing/CategoryGrid.tsx`

**Current Issues:**
1. No pricing information on category cards
2. Weak CTA copy "PERŽIŪRĖTI" is passive
3. No monthly payment per category
4. No guidance on most popular choice

**Required Changes:**

Add price ranges to each category:
```tsx
<p className="text-white/90 text-lg font-bold mb-1">
  Nuo 2,490 € (75 €/mėn.)
</p>
```

Change CTA: "PERŽIŪRĖTI" → "RASKITE SAVO MODELĮ"

Add popularity badge to round category:
```tsx
<span className="absolute top-6 right-6 bg-primary text-white text-xs px-3 py-1 uppercase tracking-wide">
  POPULIARIAUSIAS
</span>
```

Add product count: "6 modeliai"

### F.1.4 Bestsellers Component

**File:** `components/marketing/Bestsellers.tsx`

**Current Issues:**
1. Monthly payment is secondary (small gray text below full price)
2. CTA goes directly to configurator (may overwhelm users)
3. No urgency messaging or stock levels
4. Price format inconsistent with monthly-first strategy

**Required Changes:**

Flip price hierarchy (monthly first):
```tsx
<div className="mb-6">
  <span className="text-3xl font-headline">
    {product.monthlyPayment} €/mėn.
  </span>
  <p className="text-xs text-gray-400 mt-1">
    Visa kaina: {product.price} € arba 0% finansavimas
  </p>
</div>
```

Add urgency for popular products:
```tsx
{product.badge === "POPULIARIAUSIAS" && (
  <p className="text-xs text-error mb-3">
    ⚠️ Liko tik 3 gamybos vietos gegužės-birželio periodui
  </p>
)}
```

Add comparison link at bottom:
```tsx
<div className="text-center mt-12">
  <Link href="/katalogas" className="text-sm underline">
    Palyginkite visus 16 modelių →
  </Link>
</div>
```

### F.1.5 EngineeringFacts Component

**File:** `components/marketing/EngineeringFacts.tsx`

**Current Issues:**
1. No CTA at end of section
2. Technical jargon: "AISI 316" may not resonate
3. No monthly payment mention connecting quality to affordability

**Required Changes:**

Add CTA:
```tsx
<div className="text-center mt-12">
  <Link href="/raskite-savo-kubila">
    <button className="bg-primary text-white px-8 py-4 text-sm uppercase tracking-wide">
      PAMATYTI, KĄ GALITE GAUTI UŽ 75 €/MĖN.
    </button>
  </Link>
</div>
```

Simplify: "Medicininis AISI 316 plienas" → "Aukščiausios kokybės nerūdijantis plienas"

Add 4th fact: "5 metų garantija + amžinas palaikymas"

### F.1.6 ConsultationBooking Component

**File:** `components/marketing/ConsultationBooking.tsx`

**Current Issues:**
1. Calendar widget is non-functional placeholder
2. Competes with quiz CTA (3 paths: catalog, quiz, consultation)
3. No monthly payment mention
4. Generic urgency messaging

**Required Changes:**

Either integrate real Calendly or simplify to CTA button.

Update benefits:
```tsx
const benefits = [
  "Pamatysime, kaip telpa jūsų kieme (AR vizualizacija)",
  "Sužinosite tikslią mėnesinę įmoką už pasirinktą modelį",
  "Gausime preliminarų patvirtinimą už 24 val.",
];
```

Specific urgency:
```tsx
<p className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-6">
  🔥 Liko tik 12 gamybos vietų 2026 Q2 periodui
</p>
```

Add alternative quiz CTA:
```tsx
<p className="text-center mt-6 text-sm text-gray-500">
  Dar nepasiruošę kalbėtis?{" "}
  <Link href="/raskite-savo-kubila" className="text-primary underline">
    Pirmiausia raskite savo modelį
  </Link>
</p>
```

---

## F.2 CATALOG PAGE

### F.2.1 Layout Restructure

**Current State:**
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` → only 3-6 products visible
- No left sidebar for filters (Amazon-style)
- Cards are too tall: `aspect-[4/5]`

**Required Layout:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Breadcrumb: Pradžia > Katalogas]                                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ [H1: Kubilų Katalogas]                                                  │
│ [Subtitle: 16 modelių • Nuo 1,990 € (58 €/mėn.)]                       │
│                                                                         │
├────────────┬────────────────────────────────────────────────────────────┤
│            │                                                            │
│  FILTRAI   │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  ────────  │  │ Prod │ │ Prod │ │ Prod │ │ Prod │ │ Prod │ │ Prod │  │
│            │  │  1   │ │  2   │ │  3   │ │  4   │ │  5   │ │  6   │  │
│  □ Apvalūs │  │75€/mė│ │81€/mė│ │89€/mė│ │79€/mė│ │75€/mė│ │94€/mė│  │
│  □ Kvad... │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │
│  □ Šalčio  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  □ Ofuro   │  │ Prod │ │ Prod │ │ Prod │ │ Prod │ │ Prod │ │ Prod │  │
│            │  │  7   │ │  8   │ │  9   │ │ 10   │ │ 11   │ │ 12   │  │
│  TALPA     │  │...   │ │...   │ │...   │ │...   │ │...   │ │...   │  │
│  ────────  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │
│  □ 2-4 asm │                                                            │
│  □ 4-6 asm │  [Load More / Pagination]                                  │
│  □ 6+ asm  │                                                            │
│            │                                                            │
│  KAINA     │                                                            │
│  ────────  │                                                            │
│  [slider]  │                                                            │
│            │                                                            │
│  [VALYTI]  │                                                            │
│            │                                                            │
└────────────┴────────────────────────────────────────────────────────────┘
```

### F.2.2 Grid Changes

**Current:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
**Proposed:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`

**Card aspect ratio:**
- Current: `aspect-[4/5]` (portrait)
- Proposed: `aspect-[5/4]` (landscape)

This increases products above fold from 3-6 to 12-18.

### F.2.3 Sidebar Filters

**New Component:** `components/catalog/FilterSidebar.tsx`

```tsx
export function FilterSidebar({
  filters,
  onChange,
  onClear,
}: FilterSidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 sticky top-24 h-fit hidden lg:block">
      {/* Shape Filter */}
      <FilterGroup title="FORMA" options={shapeOptions} />

      {/* Capacity Filter */}
      <FilterGroup title="TALPA" options={capacityOptions} />

      {/* Price Range */}
      <PriceRangeSlider min={1990} max={5890} />

      {/* Clear Button */}
      <button onClick={onClear}>VALYTI FILTRUS</button>
    </aside>
  );
}
```

### F.2.4 ProductCard Changes

**File:** `components/catalog/ProductCard.tsx`

**Critical Issue:** NO monthly payment shown at all!

**Current (lines 83-88):**
```tsx
<p className="text-base-small text-on-surface-variant/80 font-light uppercase tracking-widest mb-1">
  Investicija
</p>
<p className="text-base font-semibold text-on-surface tracking-wide">
  nuo {formatPrice(price)} €
</p>
```

**Required:**
```tsx
<div className="mb-4">
  <p className="text-2xl font-headline text-primary">
    nuo {Math.round(price / 36)} €/mėn.
  </p>
  <p className="text-xs text-on-surface-variant">
    arba {formatPrice(price)} € | 0% palūkanos
  </p>
</div>
```

---

## F.3 B2B (VERSLAS) PAGE

### F.3.1 Critical Bug: Form-API Field Mismatch

**CRITICAL: Form will fail validation!**

**Form sends (LeadForm.tsx):**
```typescript
{ name: "...", company: "...", email: "...", phone: "...", type: "..." }
```

**API expects (api/leads/route.ts):**
```typescript
{ contactName: "...", companyName: "...", message: "...", ... }
```

**Fix Required:**
```tsx
// LeadForm.tsx - Update field names:
name="contactName"    // was: name="name"
name="companyName"    // was: name="company"
// Add message field (API requires it)
```

### F.3.2 Missing B2B Conversion Elements

**Social Proof:**
- No client logos
- No case studies
- No testimonials from businesses

**Trust Signals:**
- No certifications (ISO, CE)
- No business registration number
- No physical address

**Pricing Transparency:**
- No volume discount information
- No B2B financing terms
- No ROI calculator

### F.3.3 B2B-Specific Additions Needed

1. **Client Logo Bar:** 6-8 business clients
2. **Case Study Section:** "Kaip [Hotel X] padidino užimtumą 23%"
3. **ROI Calculator:** Simple tool showing payback period
4. **Volume Pricing Table:** 2-4 unit, 5-9 unit, 10+ unit tiers
5. **B2B FAQ:** "Ar teikiate nuomos galimybę?", "Kokie mokėjimo terminai?"
6. **Partnership CTA:** "Tapkite partneriu" button

**Estimated work:** 85-109 hours

---

## F.4 CART & CHECKOUT

### F.4.1 Payment Method Order (CRITICAL)

**File:** `components/checkout/PaymentMethods.tsx` (lines 24-44)

**Current order:**
1. "Lietuvos Bankai" (banklink)
2. "Kreditinė Kortelė" (card)
3. "Lizingas (Mokėjimas dalimis)" ← LAST but highlighted

**Required order:**
1. "Išsimokėtinai (Mokėjimas dalimis)" ← FIRST, highlighted
2. "Kreditinė Kortelė"
3. "Lietuvos Bankai"

**Terminology fix:** "Lizingas" → "Išsimokėtinai"

### F.4.2 Monthly Payment Visibility in Cart (HIGH IMPACT)

**File:** `app/krepselis/page.tsx` (lines 127-138)

**Current:** Small info box with generic text "iki 36 mėnesių"
**Problem:** No actual monthly price shown!

**Required UI:**
```
┌─────────────────────────────────────────┐
│ Užsakymo suvestinė                      │
├─────────────────────────────────────────┤
│ Tarpinė suma          10 247,93 €       │
│ PVM (21%)              2 152,07 €       │
│ Pristatymas            NEMOKAMAI        │
├═════════════════════════════════════════┤
│ ╔═══════════════════════════════════╗   │
│ ║ 💳 Išsimokėtinai                  ║   │
│ ║         nuo 258 €                 ║   │ ← BIG NUMBER
│ ║         per mėnesį (48 mėn.)      ║   │
│ ║ 0% palūkanų, be pradinio įnašo    ║   │
│ ╚═══════════════════════════════════╝   │
├─────────────────────────────────────────┤
│ Viso mokėti                             │
│ arba visa suma       12 400,00 €        │ ← Secondary
├─────────────────────────────────────────┤
│ [PIRKTI DABAR]                          │
└─────────────────────────────────────────┘
```

**Impact:** Studies show 40-60% conversion lift when monthly payment is prominent.

### F.4.3 Guest Checkout Messaging

**File:** `components/checkout/DeliveryForm.tsx` (lines 16-99)

**Missing:** No messaging about whether account is required.

**Add above form:**
```tsx
<div className="bg-surface-container-low p-6 border-l-4 border-primary/40">
  <div className="flex items-start gap-3">
    <Icon name="check_circle" className="text-primary mt-0.5" />
    <div>
      <p className="text-sm font-medium text-on-surface mb-1">
        Pirkite kaip svečias – paskyros kurti nereikia
      </p>
      <p className="text-xs text-on-surface-variant font-light">
        Jūsų duomenys bus naudojami tik šiam užsakymui (GDPR).
      </p>
    </div>
  </div>
</div>
```

### F.4.4 Delivery Timeline Missing

**Files:** `app/krepselis/page.tsx`, `components/checkout/OrderSummary.tsx`

**Current:** Shows "Pristatymas: NEMOKAMAI" but NO timeline.

**Add:**
```tsx
<span className="text-xs text-primary">
  2-4 savaites | Tikėtina data: Bal 9 - Bal 23
</span>
```

### F.4.5 Trust Badges Inconsistency

Different badges in Cart vs Checkout. Create shared component:

**New file:** `components/shared/TrustBadges.tsx`

```tsx
const TRUST_BADGES = [
  { icon: "verified", title: "5 metų garantija", description: "Korpusui ir 2 metų elektronikai" },
  { icon: "security", title: "Saugus mokėjimas", description: "SSL šifravimas ir PCI-DSS" },
  { icon: "local_shipping", title: "Nemokamas pristatymas", description: "Visoje Lietuvoje" },
];

export function TrustBadges({ variant = "compact" }) { /* ... */ }
```

---

## F.5 CONTACT PAGE

### F.5.1 Critical: Non-Functional Form

**Issue:** Form submits to `/api/contacts` which DOES NOT EXIST!

**Fix:** Create `/app/api/contacts/route.ts` or update form to use `/api/leads`.

### F.5.2 Phone Not Prominent or Clickable

**Current:**
- Phone in grid (1/4 cards) - not prominent
- Placeholder: "+370 XXX XXXXX" - non-functional
- Not clickable (no `tel:` link)
- No mobile tap-to-call

**Required:**

Add phone CTA to hero:
```tsx
<div className="flex flex-col sm:flex-row gap-6 mt-8">
  <a
    href="tel:+37060012345"
    className="bg-primary text-white px-8 py-5 font-bold tracking-widest uppercase"
  >
    <Icon name="phone" />
    Skambinkite dabar
  </a>
  <a href="#contact-form" className="border-2 border-primary text-primary px-8 py-5">
    Rašykite mums
  </a>
</div>

<div className="mt-6 flex items-center gap-4 text-sm">
  <a href="tel:+37060012345" className="font-bold hover:underline">
    +370 600 12345
  </a>
  <span>| Pr-Pn 9:00-18:00</span>
  <span className="text-primary">● Dabar dirbame</span>
</div>
```

Make phone card primary (larger, different styling):
```tsx
<div className="bg-primary text-white p-8">
  <h3>Greičiausias būdas</h3>
  <a href="tel:+37060012345" className="text-2xl font-bold">
    +370 600 12345
  </a>
  <p>⚡ Atsakysime iš karto</p>
</div>
```

### F.5.3 Email Addresses Not Clickable

**Current:** Static text "info@luxspanature.com"
**Fix:** `<a href="mailto:info@luxspanature.com">`

### F.5.4 Inconsistent Response Time Messaging

| Location | Current Message |
|----------|-----------------|
| Email card | "Atsakysime per 24 val." |
| Form description | "Atsakysime per 24 valandas darbo dienomis" |
| Success message | "Susisieksime su jumis artimiausiu metu" (vague) |

**Standardize:**
- Phone: "Atsakome iš karto"
- Email/Form: "Atsakome per 24 val. darbo dienomis"
- Success: "Atsakysime į {email} per 24 val. darbo dienomis"

### F.5.5 Missing Trust Elements

- No testimonials
- No certifications
- Vague address: "Lux Spa Nature, Lietuva"
- Map is placeholder (no real location)

**Add:**
```tsx
<div className="mb-12 grid md:grid-cols-3 gap-8">
  <TrustBadge icon="verified" text="15+ metų patirtis" />
  <TrustBadge icon="star" text="4.9/5 klientų įvertinimas" />
  <TrustBadge icon="support_agent" text="Lietuviškas palaikymas" />
</div>
```

### F.5.6 Form Validation Missing

**Current:** No Lithuanian phone format validation, no field-level errors.

**Add:**
```tsx
const validatePhone = (value: string) => {
  const cleanPhone = value.replace(/[\s\-()]/g, "");
  return /^(\+?370|8)\d{8}$/.test(cleanPhone);
};
```

---

## F.6 ESTIMATED CONVERSION IMPACT

### F.6.1 By Page

| Page | Current Issues | Est. Lift After Fix |
|------|----------------|---------------------|
| Homepage | Modal quiz, weak CTAs, no monthly in hero | +15-25% |
| Catalog | Too few products visible, no filters, no monthly | +20-30% |
| B2B | Form broken, no social proof | +40-60% |
| Cart | Monthly hidden, no delivery timeline | +15-25% |
| Checkout | Payment order wrong, no guest messaging | +10-15% |
| Contact | Form broken, phone buried | +200-300% (calls) |

### F.6.2 By Issue Type

| Issue Type | Count | Total Est. Impact |
|------------|-------|-------------------|
| Monthly payment visibility | 6 instances | +25-40% overall |
| Non-functional elements | 3 (B2B form, contact form, calendar) | Blocking conversion |
| Terminology ("Lizingas") | 5+ instances | Trust perception |
| Missing CTAs | 4 sections | Lost opportunities |
| Layout/UX | 2 (catalog grid, sidebar) | +15-20% browsing engagement |

---

## F.7 IMPLEMENTATION PRIORITY

### Week 1: Critical Blockers
1. ✅ Create `/api/contacts/route.ts` endpoint
2. ✅ Fix B2B form field names (contactName, companyName, message)
3. ✅ "Lizingas" → "Išsimokėtinai" across all files
4. ✅ Payment method order (leasing first)
5. ✅ Monthly payment in cart summary
6. ✅ Hero quiz CTA → page link (not modal)

### Week 2: High Impact
7. ✅ Catalog sidebar filters
8. ✅ Catalog grid (4-6 columns, smaller cards)
9. ✅ ProductCard monthly payment display
10. ✅ Contact page phone prominence + clickable
11. ✅ Bestsellers price flip (monthly first)

### Week 3: Enhancement
12. ✅ EngineeringFacts + ProcessSteps CTAs
13. ✅ CategoryGrid pricing + badges
14. ✅ Guest checkout messaging
15. ✅ Delivery timeline in cart/checkout
16. ✅ Trust badges consistency

### Week 4: Polish
17. ✅ B2B social proof (logos, case studies)
18. ✅ Contact page trust elements
19. ✅ Mobile tap-to-call optimization
20. ✅ ConsultationBooking real Calendly or simplify

**Total estimated work:** 80-100 hours

---

# APPENDIX G: REALISTIC SECTION STRUCTURE (BE FAKE SOCIAL PROOF)

**SVARBU:** Šis appendixas apibrėžia realias sekcijas BE:
- Fake testimonialų
- Fake case studies
- Fake statistikų ("500+ klientų", "4.9/5 reitingas")
- Fake klientų logotipų
- Fake urgency ("Liko tik 3!")

---

## G.1 KĄ TURIME (Tikra)

| Kategorija | Turimas turinys |
|------------|-----------------|
| Produktai | 16 modelių su kainomis, specifikacijomis |
| Finansavimas | 0% išsimokėtinai, mėnesinės įmokos |
| Gamyba | Lietuvoje (jei tikra) |
| Garantijos | 14d grąžinimas, 5m korpusui, 2m elektronikai |
| Medžiagos | AISI 316 plienas, termo mediena |
| Procesas | Gamyba → Pristatymas → Montavimas |
| Kontaktai | Telefonas, el. paštas (kai turėsite) |

## G.2 KO NETURIME (Dar)

| Kategorija | Trūksta |
|------------|---------|
| Social Proof | Testimonialai, reviews, reitingai |
| Case Studies | Verslo klientų istorijos su skaičiais |
| Statistika | "X klientų", "Y metų patirtis" |
| Media | "Kaip matyta..." logotipai |
| Klientų logotipai | Viešbučiai, glampingai |

---

## G.3 HOMEPAGE: REALIOS SEKCIJOS

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. HERO                                                         │
│    ├── H1: "Jūsų poilsio zona kieme"                            │
│    ├── Subhead: "Nuo 75 €/mėn. su 0% finansavimu"               │
│    ├── CTA Primary: "Rasti savo kubilą" → /raskite-savo-kubila  │
│    ├── CTA Secondary: "Skambinti" (kai turėsime numerį)         │
│    └── Trust Strip (TIK FAKTAI):                                │
│        [Gaminama Lietuvoje] [5m Garantija] [0% Išsimokėtinai]   │
│        [Nemokamas Pristatymas]                                  │
│                                                                 │
│    ❌ NE: "500+ šeimų", "4.9★", klientų skaičius                │
├─────────────────────────────────────────────────────────────────┤
│ 2. LIFESTYLE TRANSFORMATION                                     │
│    ├── H2: "Įsivaizduokite..."                                  │
│    ├── Aprašymas (NE citatos):                                  │
│    │   • "Vakarus su šeima po žvaigždėmis"                      │
│    │   • "Raumenų atpalaidavimą po treniruotės"                 │
│    │   • "Šilumą net -25°C žiemą"                               │
│    ├── Lifestyle nuotrauka (stock OK, bet ne fake testimonial)  │
│    └── CTA: "Pamatyti modelius"                                 │
│                                                                 │
│    Psichologija: Aprašome PATIRTĮ, ne cituojame klientus        │
├─────────────────────────────────────────────────────────────────┤
│ 3. BESTSELLERS (3 produktai)                                    │
│    ├── H2: "Populiariausi modeliai"                             │
│    ├── 3 produktai:                                             │
│    │   ┌─────────────────────────────────────────┐              │
│    │   │ [Nuotrauka]                             │              │
│    │   │ Grande Round In                         │              │
│    │   │ 4-6 asmenims                            │              │
│    │   │                                         │              │
│    │   │ 81 €/mėn.              ← PIRMA          │              │
│    │   │ arba 2,890 €           ← antra          │              │
│    │   │                                         │              │
│    │   │ [SUŽINOTI DAUGIAU]                      │              │
│    │   └─────────────────────────────────────────┘              │
│    │                                                            │
│    │   ❌ NE: "★ 73% renkasi" (neturime duomenų)                │
│    │   ❌ NE: "Populiariausias" badge (neįrodyta)               │
│    │   ✅ GALIMA: "Tinka šeimoms" (aprašymas)                   │
│    │                                                            │
│    └── Link: "Visi 16 modelių →"                                │
├─────────────────────────────────────────────────────────────────┤
│ 4. KODĖL LUX SPA NATURE (Authority)                             │
│    ├── H2: "Kodėl mes?"                                         │
│    ├── 4 faktai (TIK TIKRI):                                    │
│    │   • "Gaminama Lietuvoje" (+ gamyklos nuotrauka)            │
│    │   • "AISI 316 medicininis plienas"                         │
│    │   • "Termo medienos apdaila"                               │
│    │   • "5 metų garantija" (jei tikrai siūlote)                │
│    │                                                            │
│    │   ❌ NE: "15 metų patirtis" (jei netiesa)                  │
│    │   ❌ NE: "1000+ pagamintų" (jei nežinote tiksliai)         │
│    │                                                            │
│    ├── Galima: Gamyklos/dirbtuvių nuotraukos                    │
│    └── CTA: "Sužinoti daugiau apie gamybą"                      │
├─────────────────────────────────────────────────────────────────┤
│ 5. PROCESAS (3 žingsniai)                                       │
│    ├── H2: "Kaip tai veikia"                                    │
│    ├── 3 žingsniai:                                             │
│    │   1. "Pasirinkite" - Quiz arba konsultacija                │
│    │   2. "Gaminame" - 2-4 savaitės individualiai               │
│    │   3. "Pristatome" - Nemokamas montavimas                   │
│    └── CTA: "Pradėti" + "Nuo 75 €/mėn."                         │
│                                                                 │
│    Faktai - nereikia social proof                               │
├─────────────────────────────────────────────────────────────────┤
│ 6. PRIEINAMUMAS (Finansavimas)                                  │
│    ├── H2: "Prieinamiau nei manote"                             │
│    ├── Pavyzdys:                                                │
│    │   "Classic Round Out"                                      │
│    │   69 €/mėn. = 2.30 €/dieną                                 │
│    │   "Mažiau nei kava kasdien"                                │
│    ├── Finansavimo detalės:                                     │
│    │   • 0% palūkanos                                           │
│    │   • Be pradinio įnašo                                      │
│    │   • Iki 48 mėnesių                                         │
│    └── CTA: "Skaičiuoti savo įmoką"                             │
│                                                                 │
│    Faktai apie finansavimą - social proof nereikalingas         │
├─────────────────────────────────────────────────────────────────┤
│ 7. GARANTIJOS (Risk Reversal)                                   │
│    ├── H2: "Jūsų ramybei"                                       │
│    ├── Garantijos:                                              │
│    │   ✓ 14 dienų grąžinimo garantija                           │
│    │   ✓ 5 metų garantija korpusui                              │
│    │   ✓ 2 metų garantija elektronikai                          │
│    │   ✓ Nemokamas pristatymas ir montavimas                    │
│    │                                                            │
│    └── Sąlygos → T&C dokumentas (ne marketinge)                 │
├─────────────────────────────────────────────────────────────────┤
│ 8. FAQ (5 klausimai)                                            │
│    ├── H2: "Dažniausi klausimai"                                │
│    ├── Accordion:                                               │
│    │   Q: "Kiek kainuoja eksploatacija?"                        │
│    │   A: "~35 €/mėn. (elektra, chemija, vanduo)"               │
│    │                                                            │
│    │   Q: "Ar reikia statybos leidimo?"                         │
│    │   A: "Ne, kubilai iki 10m² leidimo nereikalauja"           │
│    │                                                            │
│    │   Q: "Ar galima naudoti žiemą?"                            │
│    │   A: "Taip, veikia iki -25°C"                              │
│    │                                                            │
│    │   Q: "Kiek trunka pristatymas?"                            │
│    │   A: "2-4 savaitės nuo užsakymo"                           │
│    │                                                            │
│    │   Q: "Kaip prižiūrėti vandenį?"                            │
│    │   A: "Paprasta - duosime instrukciją ir priežiūros rinkinį"│
│    │                                                            │
│    └── Link: "Visi klausimai →"                                 │
├─────────────────────────────────────────────────────────────────┤
│ 9. FINAL CTA                                                    │
│    ├── H2: "Pasiruošę pradėti?"                                 │
│    ├── CTA Primary: "Rasti savo kubilą"                         │
│    ├── CTA Secondary: "Skambinti: +370 XXX XXXXX"               │
│    ├── Darbo laikas: "Pr-Pn 9:00-18:00"                         │
│    └── Info: "Pristatymas per 2-4 savaites"                     │
│                                                                 │
│    ❌ NE: "Liko tik 8 vietos!" (jei netiesa)                    │
│    ✅ GALIMA: "Užsakymai priimami birželio gamybai" (jei tikra) │
└─────────────────────────────────────────────────────────────────┘
```

### Homepage Santrauka

**9 sekcijos:**
1. Hero (su trust strip)
2. Lifestyle Transformation
3. Bestsellers (3 produktai)
4. Kodėl Lux Spa Nature (authority)
5. Procesas (3 žingsniai)
6. Prieinamumas (finansavimas)
7. Garantijos (STIPRINTI!)
8. FAQ (5 klausimai)
9. Final CTA

**Pašalinta (neturime duomenų):**
- Social proof bar su statistika
- Testimonialų sekcija
- "X klientų pasirinko"
- Fake urgency messaging

---

## G.4 B2B PAGE: REALIOS SEKCIJOS

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. B2B HERO                                                     │
│    ├── H1: "Kubilai jūsų verslui"                               │
│    ├── Subhead: "Viešbučiams, glampingams, poilsio centrams"    │
│    ├── Value props (BE STATISTIKŲ):                             │
│    │   ✅ "Komercinės nuolaidos nuo 2 vnt."                     │
│    │   ✅ "Profesionalus montavimas"                            │
│    │   ✅ "Priežiūros sutartys"                                 │
│    │                                                            │
│    │   ❌ NE: "+23% užimtumas" (neturime duomenų)               │
│    │   ❌ NE: "50+ verslo klientų" (jei netiesa)                │
│    │                                                            │
│    ├── CTA Primary: "Gauti komercinį pasiūlymą"                 │
│    └── CTA Secondary: "Skambinti verslo skyriui"                │
│                                                                 │
│    ❌ JOKIŲ KLIENTŲ LOGOTIPŲ (kol neturėsime tikrų)             │
├─────────────────────────────────────────────────────────────────┤
│ 2. VERSLO NAUDA (Logika, ne statistika)                         │
│    ├── H2: "Kodėl kubilai jūsų verslui?"                        │
│    ├── 4 naudos (be skaičių):                                   │
│    │                                                            │
│    │   🎯 IŠSKIRTINUMAS                                         │
│    │   "Nedaug konkurentų siūlo kubilus - išsiskirsite"         │
│    │                                                            │
│    │   ❄️ ŽIEMOS SEZONO PATRAUKLUMAS                            │
│    │   "Veikia iki -25°C - pritraukia klientus visus metus"     │
│    │                                                            │
│    │   💰 PAPILDOMA PASLAUGA                                    │
│    │   "Galimybė imti papildomą mokestį už SPA patirtį"         │
│    │                                                            │
│    │   🔧 MAŽA PRIEŽIŪRA                                        │
│    │   "5m garantija, priežiūros sutartys - minimalios rūpesčiai"│
│    │                                                            │
│    │   ❌ NE: "ROI per 8 mėnesius" (neįrodyta)                  │
│    │   ❌ NE: "+34% bookings" (neturime case study)             │
│    │                                                            │
│    └── Psichologija: Logiškai pagrįskite, nemeluokite           │
├─────────────────────────────────────────────────────────────────┤
│ 3. PRODUKTAI VERSLUI                                            │
│    ├── H2: "Rekomenduojami modeliai"                            │
│    ├── 3-4 kategorijos (aprašymas, NE case study):              │
│    │                                                            │
│    │   ┌─────────────────────────────────────────┐              │
│    │   │ VIEŠBUČIAMS                             │              │
│    │   │ Grande Round In, Monaco Horizon         │              │
│    │   │ "Premium išvaizda svečių zonoms"        │              │
│    │   │ Nuo 2,890 € (81 €/mėn.)                │              │
│    │   │ [SUŽINOTI DAUGIAU]                      │              │
│    │   └─────────────────────────────────────────┘              │
│    │                                                            │
│    │   ┌─────────────────────────────────────────┐              │
│    │   │ GLAMPINGAMS                             │              │
│    │   │ Classic Round Out, Cuba                 │              │
│    │   │ "Atsparus lauko sąlygoms"               │              │
│    │   │ Nuo 2,490 € (69 €/mėn.)                │              │
│    │   │ [SUŽINOTI DAUGIAU]                      │              │
│    │   └─────────────────────────────────────────┘              │
│    │                                                            │
│    │   ❌ NE: "Hotel X pasirinko šį modelį"                     │
│    │   ✅ GALIMA: "Tinka viešbučio svečių zonai"                │
│    │                                                            │
│    └── CTA: "Peržiūrėti visus modelius"                         │
├─────────────────────────────────────────────────────────────────┤
│ 4. KOMERCINĖS KAINOS (Transparency)                             │
│    ├── H2: "Verslo klientų nuolaidos"                           │
│    ├── Lentelė:                                                 │
│    │   ┌─────────────────────────────────────────┐              │
│    │   │ Kiekis    │ Nuolaida │ Pavyzdys        │              │
│    │   ├───────────┼──────────┼─────────────────┤              │
│    │   │ 1 vnt.    │ -        │ 2,890 €         │              │
│    │   │ 2-4 vnt.  │ -10%     │ 2,601 € / vnt.  │              │
│    │   │ 5-9 vnt.  │ -15%     │ 2,457 € / vnt.  │              │
│    │   │ 10+ vnt.  │ Derybos  │ Kreipkitės      │              │
│    │   └─────────────────────────────────────────┘              │
│    │                                                            │
│    ├── "Verslo išsimokėtinai: iki 60 mėn."                      │
│    └── "Kainos be PVM. Pristatymas įskaičiuotas."               │
│                                                                 │
│    FAKTAS - social proof nereikalingas                          │
├─────────────────────────────────────────────────────────────────┤
│ 5. VERSLO PASLAUGOS                                             │
│    ├── H2: "Ką gausite kaip verslo klientas"                    │
│    ├── Paslaugų sąrašas:                                        │
│    │   ✓ Profesionalus montavimas (mūsų komanda)                │
│    │   ✓ Priežiūros sutartys (nuo 50 €/mėn.)                    │
│    │   ✓ Prioritetinis palaikymas                               │
│    │   ✓ PVM sąskaita                                           │
│    │   ✓ Mokėjimo terminai (30/60 dienų)                        │
│    │   ✓ Customizacija (logotipas, spalvos)                     │
│    │                                                            │
│    └── Tai JŪSŲ PASIŪLYMAS - nereikia įrodyti statistika        │
├─────────────────────────────────────────────────────────────────┤
│ 6. B2B FAQ                                                      │
│    ├── H2: "Klausimai apie verslo užsakymus"                    │
│    ├── 5 klausimai:                                             │
│    │   Q: "Kokie mokėjimo terminai?"                            │
│    │   A: "30 arba 60 dienų nuo sąskaitos išrašymo"             │
│    │                                                            │
│    │   Q: "Ar išrašote PVM sąskaitą?"                           │
│    │   A: "Taip, visos kainos nurodytos be PVM"                 │
│    │                                                            │
│    │   Q: "Kiek trunka didelis užsakymas?"                      │
│    │   A: "4-8 savaitės priklausomai nuo kiekio"                │
│    │                                                            │
│    │   Q: "Ar yra priežiūros sutartys?"                         │
│    │   A: "Taip, nuo 50 €/mėn. už reguliarią priežiūrą"         │
│    │                                                            │
│    │   Q: "Ar galima su mūsų logotipu?"                         │
│    │   A: "Taip, siūlome customizaciją verslo klientams"        │
│    │                                                            │
│    └── Faktai - case studies nereikalingi                       │
├─────────────────────────────────────────────────────────────────┤
│ 7. LEAD FORMA (PATAISYTA!)                                      │
│    ├── H2: "Gaukite individualų pasiūlymą"                      │
│    ├── Subhead: "Atsakysime per 24 val. darbo dienomis"         │
│    │                                                            │
│    │   ⚠️ KRITINIS FIX - Laukų pavadinimai:                     │
│    │                                                            │
│    ├── Laukai:                                                  │
│    │   • Vardas, Pavardė     → name="contactName"               │
│    │   • Įmonės pavadinimas  → name="companyName"               │
│    │   • El. paštas          → name="email"                     │
│    │   • Telefonas           → name="phone"                     │
│    │   • Verslo tipas        → [dropdown]                       │
│    │   • Planuojamas kiekis  → [1/2-4/5-9/10+]                  │
│    │   • Žinutė              → name="message" ← API REIKALAUJA! │
│    │                                                            │
│    └── CTA: "Siųsti užklausą"                                   │
├─────────────────────────────────────────────────────────────────┤
│ 8. KONTAKTAI                                                    │
│    ├── H2: "Arba susisiekite tiesiogiai"                        │
│    ├── Tel: +370 XXX XXXXX (click-to-call) ← KAI TURĖSITE       │
│    ├── El. paštas: verslas@luxspanature.com                     │
│    └── "Atsakome per 24 val. darbo dienomis"                    │
└─────────────────────────────────────────────────────────────────┘
```

### B2B Santrauka

**8 sekcijos:**
1. Hero (be statistikų)
2. Verslo nauda (logika, ne skaičiai)
3. Produktai pagal verslo tipą
4. Komercinės kainos (lentelė)
5. Verslo paslaugos
6. B2B FAQ
7. Lead forma (PATAISYTA!)
8. Kontaktai

**Pašalinta (neturime duomenų):**
- Client logo bar
- ROI calculator (nėra duomenų pagrįsti)
- Case studies
- "50+ verslo klientų"
- Testimonialai

---

## G.5 GARANTIJOS PLACEMENT STRATEGIJA (Behavioral Psychology)

### Friction Map: Kur nerimas didžiausias?

```
Hero ─────────────► "Ar galiu pasitikėti?"        [LOW]
Product Page ─────► "Ar tinkamas pasirinkimas?"   [MEDIUM]
Price Reveal ─────► "Brangu..."                   [HIGH] ⚠️
Add to Cart ──────► "Ar tikrai noriu?"            [MEDIUM]
Cart Page ────────► "Gal pagalvosiu..."           [HIGH] ⚠️
Checkout Form ────► "Jau rimta..."                [HIGH] ⚠️
Payment ──────────► "Dabar tikrai"                [VERY HIGH] 🔴
Submit ───────────► "Point of no return"          [MAXIMUM] 🔴
```

### Psichologijos principai:

| Principas | Kaip garantija padeda |
|-----------|----------------------|
| **Loss Aversion** | Pašalina baimę "o jei suklystu?" |
| **Risk Reversal** | Rizika → pardavėjui, ne pirkėjui |
| **Status Quo Bias** | Neutralizuoja "geriau nieko nedaryti" |

### Konkretūs placements:

#### 1. Hero Trust Strip (Low friction - awareness)
```
[14d Grąžinimas] [5m Garantija] [0% Išsimokėtinai] [Pristatymas 0€]
```
- Formatas: Maži badges eilutėje
- Tikslas: Iškart sukurti pasitikėjimą

#### 2. Product Page - ŠALIA KAINOS (High friction!) ⚠️
```tsx
<div className="price-section">
  <span className="text-3xl">81 €/mėn.</span>
  <span className="text-sm">arba 2,890 €</span>

  <div className="trust-badges mt-4">
    <span>✓ 14 dienų grąžinimo garantija</span>
    <span>✓ Nemokamas pristatymas</span>
  </div>
</div>
```
- Tikslas: Neutralizuoti "sticker shock"
- Pozicija: Iškart po kainos

#### 3. Cart Summary - PO TOTAL (High friction!) ⚠️
```
Tarpinė suma         2,388 €
PVM                    502 €
Pristatymas       NEMOKAMAI
─────────────────────────────
VISO               2,890 €

┌─────────────────────────────┐
│ ✓ 14 dienų grąžinimo garantija │
│ ✓ 5 metų garantija korpusui │
└─────────────────────────────┘
```
- Tikslas: Sumažinti cart abandonment
- Pozicija: Po total, prieš CTA

#### 4. Checkout - VIRŠ BUTTON (Maximum friction!) 🔴
```
┌─────────────────────────────────────┐
│ Jūsų užsakymas apsaugotas:          │
│                                     │
│ ✓ 14 dienų grąžinimo garantija      │
│ ✓ 5 metų garantija korpusui         │
│ ✓ Saugus mokėjimas (SSL)            │
└─────────────────────────────────────┘

[      PATVIRTINTI UŽSAKYMĄ      ]
```
- Tikslas: Paskutinis reassurance
- Pozicija: Tiesiai virš submit button

#### 5. Mobile Sticky CTA (Always visible)
```
┌───────────────────────────────────────────┐
│ 81 €/mėn. • 14d grąžinimas    [PIRKTI]   │
└───────────────────────────────────────────┘
```
- Tikslas: Nuolatinis mobile reassurance
- Pozicija: Fixed bottom

### Placement prioritetai:

| Vieta | Svarba | Friction Level |
|-------|--------|----------------|
| Hero trust strip | ★★☆ | Low |
| **Product page (prie kainos)** | ★★★ | High |
| **Cart summary (po total)** | ★★★ | High |
| **Checkout (virš button)** | ★★★ | Maximum |
| Mobile sticky | ★★☆ | Ongoing |
| Footer | ★☆☆ | Low |

### Implementacijos checklist:

- [ ] Hero.tsx - pridėti į trust strip
- [ ] ProductInfo.tsx - pridėti po kaina
- [ ] CartSummary / krepselis page - pridėti po total
- [ ] Checkout OrderSummary - pridėti virš CTA
- [ ] StickyMobileCTA.tsx - pridėti trumpą tekstą

2. **KONTAKTAI MATOMI**
   - Telefonas hero sekcijoje
   - Žmonės nori kalbėti prieš brangų pirkinį

3. **PRODUKTŲ INFO DETALI**
   - Daugiau specs = kompensuoja testimonialų trūkumą
   - Nuotraukų galerija, matmenys, medžiagos

4. **KAINA AIŠKI**
   - Mėnesinė įmoka PIRMA visur
   - 0% finansavimas - jūsų stiprybė

---

## G.6 ATEITIES PLANAS: KAI TURĖSIME SOCIAL PROOF

### Kai gausite pirmus klientus:

**Etapas 1: Pirmi 5 klientai**
- Paprašykite trumpo atsiliepimo (2-3 sakiniai)
- Paprašykite nuotraukos su kubilu
- Pridėkite į homepage: "Ką sako mūsų klientai" sekcija

**Etapas 2: Pirmas verslo klientas**
- Paprašykite case study (su skaičiais jei įmanoma)
- Pridėkite logotipą į B2B puslapį
- Sukurkite "Sėkmės istorija" puslapį

**Etapas 3: 20+ klientų**
- Galite rašyti: "20+ šeimų jau mėgaujasi"
- Galite pridėti reitingą (jei renkate Google reviews)

**Etapas 4: 50+ klientų**
- Full testimonial carousel
- Video testimonials
- Case study library

---

## G.7 KONTAKTŲ PLACEHOLDERIAI

Kol neturite tikrų kontaktų, naudokite:

```
Telefonas: +370 600 00000 (PAKEISTI kai turėsite)
El. paštas: info@luxspanature.com
Verslo: verslas@luxspanature.com
Adresas: Lietuva (PRIDĖTI tikslų kai turėsite)
```

**Svarbu:** Nepalikite placeholder'ių gamyboje - geriau visai nerodyti nei rodyti netikrą numerį.

---

## G.8 PRODUCT PAGE CRO: PACKAGE SELECTOR (CRITICAL!)

### Problema

Dabartinis flow:
```
Product Page → [KONFIGŪRUOTI] → Configurator (daug pasirinkimų) → Cart
```

**Friction:** Visi vartotojai priversti eiti per konfigūratorių, net jei nori tiesiog "duok man populiariausią variantą".

### Sprendimas: 3 Paketai + Konfigūratoriaus Opcija

```
Product Page → [BAZINIS/POPULIARUS/PREMIUM] → Cart (tiesiogiai!)
            → [Konfigūruoti detaliau] → Configurator → Cart
```

**85% users** tiesiog pasirenka paketą ir perka.
**15% users** nori detalios konfigūracijos.

### Package Selector UI

```
┌─────────────────────────────────────────────────────────────────┐
│ Pasirinkite komplektaciją:                                      │
│                                                                 │
│ ┌───────────────┐ ┌───────────────────┐ ┌───────────────┐      │
│ │    BAZINIS    │ │    POPULIARUS     │ │    PREMIUM    │      │
│ │               │ │  ★ Rekomenduojama │ │               │      │
│ │   2,490 €     │ │     2,980 €       │ │    3,580 €    │      │
│ │   69 €/mėn.   │ │    83 €/mėn.      │ │   99 €/mėn.   │      │
│ │               │ │                   │ │               │      │
│ │ ✓ Kubilas     │ │ Viskas iš Bazinis │ │Viskas iš Popul│      │
│ │ ✓ Krosnelė    │ │        +          │ │       +       │      │
│ │ ✓ Dangtis     │ │ ✓ Termo dangtis   │ │ ✓ LED apšviet.│      │
│ │ ✓ Pristatymas │ │ ✓ Mediniai laiptai│ │ ✓ Hidromasažas│      │
│ │ ✓ Montavimas  │ │ ✓ Priežiūros rink.│ │ ✓ Termo medien│      │
│ │               │ │                   │ │               │      │
│ │  [PASIRINKTI] │ │   [PASIRINKTI]    │ │  [PASIRINKTI] │      │
│ └───────────────┘ └───────────────────┘ └───────────────┘      │
│                                                                 │
│ ✓ 14 dienų grąžinimo garantija                                  │
│ ✓ 5 metų garantija korpusui                                     │
│                                                                 │
│      Norite kitokią konfigūraciją? Konfigūruoti detaliau →     │
└─────────────────────────────────────────────────────────────────┘
```

### Psichologijos Principai

| Principas | Taikymas |
|-----------|----------|
| **Paradox of Choice** | 3 paketai vs 50+ kombinacijų |
| **Default Effect** | POPULIARUS paryškintas, "Rekomenduojama" |
| **Anchoring** | PREMIUM kaina daro POPULIARUS "reasonable" |
| **Social Proof** | "★ Rekomenduojama" (ne "73% renkasi" - neturime duomenų) |
| **Loss Aversion** | Kiekvienas paketas rodo ką GAUNI, ne ką prarasite |

### Paketo Duomenų Struktūra

```typescript
interface ProductPackage {
  id: 'bazinis' | 'populiarus' | 'premium';
  name: string;
  priceModifier: number; // +0, +490, +1090
  isRecommended?: boolean;
  features: {
    name: string;
    included: boolean;
    value?: string; // "290 €" jei norime rodyti vertę
  }[];
}

const STANDARD_PACKAGES: ProductPackage[] = [
  {
    id: 'bazinis',
    name: 'Bazinis',
    priceModifier: 0,
    features: [
      { name: 'Kubilas', included: true },
      { name: 'Krosnelė', included: true },
      { name: 'Standartinis dangtis', included: true },
      { name: 'Pristatymas', included: true },
      { name: 'Montavimas', included: true },
    ]
  },
  {
    id: 'populiarus',
    name: 'Populiarus',
    priceModifier: 490,
    isRecommended: true,
    features: [
      { name: 'Viskas iš Bazinis', included: true },
      { name: 'Termo dangtis', included: true, value: '290 €' },
      { name: 'Mediniai laiptai', included: true, value: '190 €' },
      { name: 'Priežiūros rinkinys', included: true, value: '89 €' },
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    priceModifier: 1090,
    features: [
      { name: 'Viskas iš Populiarus', included: true },
      { name: 'Termo medienos apdaila', included: true, value: '180 €' },
      { name: 'LED apšvietimas', included: true, value: '290 €' },
      { name: 'Hidromasažas (6 antgaliai)', included: true, value: '320 €' },
    ]
  }
];
```

### User Flow

```
┌──────────────────┐
│   Product Page   │
│                  │
│  [Package Select]│───────────────────────────┐
│   ↓              │                           │
│  Bazinis         │                           │
│  Populiarus ←────│── Default selected        │
│  Premium         │                           │
│                  │                           │
│  [PASIRINKTI]────│──→ Add to Cart ──→ Cart   │
│                  │                           │
│  "Konfigūruoti   │                           │
│   detaliau →"────│──→ Configurator           │
└──────────────────┘          │                │
                              ↓                │
                    ┌──────────────────┐       │
                    │   Configurator   │       │
                    │ (Quiz-like flow) │       │
                    │                  │       │
                    │ Step 1: Package  │       │
                    │ Step 2: Mediena  │       │
                    │ Step 3: Spalva   │       │
                    │ Step 4: Priedai  │       │
                    │ Step 5: Peržiūra │       │
                    │                  │       │
                    │ [PRIDĖTI]────────│───────┘
                    └──────────────────┘
```

### Configurator as Quiz-Like Flow

Jei vartotojas pasirenka "Konfigūruoti detaliau", configurator turėtų būti:

```
┌─────────────────────────────────────────────────────────────────┐
│ Konfigūratorius                            [1/5] ████░░░░░░░░░░ │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Pasirinkite medienos tipą:                                      │
│                                                                 │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                │
│ │   [foto]    │ │   [foto]    │ │   [foto]    │                │
│ │             │ │             │ │             │                │
│ │   Eglė      │ │   Termo     │ │   Kedras    │                │
│ │  +0 €       │ │  +180 €     │ │  +350 €     │                │
│ │             │ │ Rekomenduoj.│ │             │                │
│ └─────────────┘ └─────────────┘ └─────────────┘                │
│                                                                 │
│ Jūsų konfigūracija:              Kaina: 2,670 € (74 €/mėn.)    │
│                                                                 │
│ [← ATGAL]                                          [TOLIAU →]   │
└─────────────────────────────────────────────────────────────────┘
```

**Key UX principles:**
- Vienas klausimas per žingsnį
- Progress bar viršuje
- Kaina atnaujinama realiu laiku
- Galima grįžti atgal
- Galima bet kada išeiti ir pasirinkti paketą

### Failai Implementacijai

| Failas | Veiksmas | Prioritetas |
|--------|----------|-------------|
| `components/product/PackageSelector.tsx` | Create | P0 |
| `components/product/PackageCard.tsx` | Create | P0 |
| `app/produktas/[slug]/page.tsx` | Modify - add PackageSelector | P0 |
| `stores/configurator.ts` | Modify - add package step | P1 |
| `data/products.json` | Modify - add packages array | P0 |
| `components/configurator/ConfiguratorWizard.tsx` | Modify - quiz-like flow | P1 |

### Definition of Done

- [ ] PackageSelector komponentas sukurtas
- [ ] 3 paketai rodomi produkto puslapyje
- [ ] "Pasirinkti" → tiesiogiai į krepšelį
- [ ] "Konfigūruoti detaliau" → configurator
- [ ] Kaina su mėnesine įmoka
- [ ] Garantijos po paketais
- [ ] Mobile responsive
- [ ] Populiarus paketas default selected

---

## G.9 IMPLEMENTACIJOS FAZIŲ PLANAS

```
docs/cro/
├── 00-README.md              # Overview, dependencies, kaip naudoti
├── 01-critical-fixes.md      # API bugs, terminology (2-3h)
├── 02-guarantee-placement.md # 14d garantija visur (2-3h)
├── 03-monthly-first.md       # Mėnesinė kaina pirma (3-4h)
├── 04-homepage.md            # 9 sekcijos (6-8h)
├── 05-catalog.md             # Sidebar, grid (4-6h)
├── 06-product-page.md        # Package Selector! (4-6h)
├── 07-cart-checkout.md       # Payment, trust (3-4h)
├── 08-b2b.md                 # 8 sekcijos (6-8h)
├── 09-contact.md             # Phone, form (2-3h)
└── 10-quiz-flow.md           # Quiz pages (8-10h)
```

### Dependency Graph

```
01-CRITICAL ──→ 02-GUARANTEE ──→ 03-MONTHLY ──→ 04-HOMEPAGE
                                      │              │
                                      ├──→ 08-B2B    │
                                      └──→ 09-CONTACT│
                                                     │
                          ┌──────────────────────────┘
                          │
                          ├──→ 05-CATALOG
                          ├──→ 06-PRODUCT-PAGE (Package Selector!)
                          ├──→ 07-CART-CHECKOUT
                          │
                          └──→ 10-QUIZ-FLOW
```

### Estimated Timeline

| Fazė | Valandos | Gali būti parallel |
|------|----------|-------------------|
| 01-03 | 8-10h | Sequential |
| 04 Homepage | 6-8h | - |
| 05-07 | 11-16h | Yes, parallel |
| 08-09 | 8-11h | Yes, parallel |
| 10 Quiz | 8-10h | After 04 |

**Total: ~40-55h** (su paralelizacija: ~30-40h)

---

*End of Complete CRO Specification*

**Version:** 6.0 (Added Package Selector & Phase Plan)
**Parts:** 1-20 + Appendices A-G (9 sections)
**Total Sections:** 135
**Brand:** Lux Spa Nature
**Domain:** luxspanature.com
**Last Updated:** 2026-03-26

