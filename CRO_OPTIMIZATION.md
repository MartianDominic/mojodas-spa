# CRO Optimization Plan: User Journey Architecture

## Target Customer Profile (ICP)

### Demographics
- **Gender:** Male
- **Age:** 38-55 years
- **Income:** 3,000-7,000 EUR/month net
- **Location:** Lithuania (primarily urban/suburban homeowners)

### Psychographics
- Homeowner with garden, terrace, or suitable outdoor space
- Family man (children may be teens/young adults or grown)
- Successful professional who values quality over price
- Time-poor: doesn't want to spend hours researching
- Risk-averse on big purchases: needs confidence before committing
- Practical: needs to justify 2-5k EUR purchase to spouse/self
- Patriotic: "Made in Lithuania" resonates strongly

### Key Concerns & Objections
1. "Will this actually fit my space?"
2. "Is this worth 2,000-5,000 EUR?"
3. "What if I choose the wrong model?"
4. "How hard is installation? Do I need permits?"
5. "Will it last? What about warranty?"
6. "Can I afford this right now?" (financing from ~42 EUR/month)
7. "What do other customers think?"

---

## Actual Product Catalog Analysis

### Price Distribution (16 products)
| Range | Count | Products |
|-------|-------|----------|
| €1,490-2,000 | 4 | Arctic (€1,490), Ofuro (€1,890), Classic Round In (€1,990) |
| €2,000-3,000 | 5 | Classic Round Out (€2,490), Paris In (€2,690), Andorra (€2,890), Grande Round In (€2,890) |
| €3,000-4,000 | 4 | Classic Round Horizon (€3,490), Cuba Out (€3,590), Monaco In (€3,290), Grande Round Out (€3,190), Macau In (€3,190) |
| €4,000-5,000 | 2 | Grande Round Horizon (€4,290), Monaco Horizon (€4,890) |
| €5,000+ | 1 | Arctic Chiller (€5,990) |

### Shape Distribution
| Shape | Products | Price Range |
|-------|----------|-------------|
| Round (6) | Classic Round series, Grande Round series | €1,990-4,290 |
| Square (7) | Paris, Andorra, Cuba, Monaco series, Macau | €2,690-4,890 |
| Therapeutic (3) | Arctic, Arctic Chiller, Ofuro | €1,490-5,990 |

### Capacity Distribution
| Capacity | Products | Use Case |
|----------|----------|----------|
| 1-2 persons | Arctic, Arctic Chiller, Ofuro | Solo/couple, therapy |
| 4-6 persons | Classic Round series, Paris, Andorra | Small family, couple |
| 6-8 persons | Grande Round series, Cuba, Monaco In/Out, Macau | Large family, friends |
| 8-10 persons | Monaco Horizon | Entertaining, groups |

### Feature Availability
| Feature | Products With | Products Without |
|---------|---------------|------------------|
| Water Jets | 6 (Monaco series, Grande Round In, Cuba, Macau) | 10 |
| Air Jets | 6 (same as water jets) | 10 |
| LED Lighting | 8 | 8 |
| Filtration | 9 | 7 |
| Cold Therapy | 1 (Arctic Chiller) | 15 |

---

## Current State Analysis

### Existing User Journey
```
Homepage
├── Hero section
├── 3 Bestsellers ("Populiariausi")
├── 3 Categories (Round, Square, Therapeutic)
└── CTA to Catalog

         ↓

Catalog (/katalogas)
├── 16 products displayed
├── Basic filtering (shape, size, heater)
└── Product cards with price

         ↓

Product Page (/produktas/[slug])
├── Gallery
├── Specs
├── Price
└── Configure CTA

         ↓

Configurator (/konfiguratorius)
├── Many individual options
├── Price updates
└── Add to cart

         ↓

Cart → Checkout
```

### Problems Identified
1. **Catalog Cognitive Overload:** 16 products with complex specs overwhelms users
2. **No Guided Path:** User must become a "hot tub expert" to choose
3. **Weak Trust Signals:** Not enough social proof throughout journey
4. **Configurator Decision Fatigue:** Too many individual choices
5. **Missing Objection Handling:** FAQs and concerns not addressed proactively
6. **Financing Buried:** Monthly payment option not prominent enough

---

## Optimized User Journey Architecture

### Overview Flow
```
HOMEPAGE (Emotional Hook + Clear Paths)
├── Hero: Lifestyle imagery + primary CTA
├── Product Finder Quiz CTA (PRIMARY PATH)
├── 3 Bestsellers (social proof)
├── 3 Categories (secondary path for experts)
├── Trust Bar (warranty, made in LT, installation)
└── Testimonials

         ↓ Quiz OR Category Click

PERSONALIZED RESULTS (2-4 Products, Not 16)
├── "Jums rekomenduojame" header
├── 2-4 matched products with "why this fits"
├── Comparison tool
├── "Peržiūrėti visus" secondary link
└── Expert consultation CTA

         ↓ Product Selected

PRODUCT PAGE (Confidence Builder)
├── Hero: Gallery + Price + Monthly + Key Benefit
├── Quick Specs: 4-5 icons
├── "Kodėl šis modelis" positioning
├── Social Proof: Reviews + Installation Photos
├── Comparison: "vs similar models"
├── FAQ Section (addresses objections)
├── Financing Calculator
└── Sticky CTA Bar

         ↓ Configure/Order

SIMPLIFIED CONFIGURATOR
├── 3 Packages: Bazinis / Populiarus / Premium
├── "Populiarus" pre-selected
├── Single upgrades shown as +EUR
├── "Dauguma renkasi" badges
├── Live price + monthly payment
└── Clear "Į krepšelį" CTA

         ↓ Add to Cart

OPTIMIZED CHECKOUT
├── Guest checkout (no forced account)
├── Financing options prominent
├── Trust signals throughout
├── Delivery timeline
├── "Turite klausimų?" phone CTA
└── Progress indicator
```

---

## Component Specifications

### 1. Product Finder Quiz

**Purpose:** Reduce 16 products to 2-4 personalized recommendations

**Location:**
- Homepage hero section (primary CTA)
- Catalog page header (before product grid)
- Floating widget on all pages

**Quiz Flow (3 steps, ~20 seconds):**

Each question progressively filters products. Questions are designed to NOT conflict.

```
STEP 1: PURPOSE (Eliminates product categories)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Question: "Kam naudosite kubilą?"

┌─────────────────┬─────────────────┬─────────────────┐
│ KARŠTAS         │ ŠALČIO TERAPIJA │ OFURO           │
│ MAUDYMASIS      │                 │                 │
│                 │                 │                 │
│ Atsipalaidavimui│ Recovery,       │ Japoniška       │
│ su šeima ar     │ kontrastinei    │ maudymosi       │
│ draugais        │ terapijai       │ tradicija       │
│                 │                 │                 │
│ → 13 products   │ → 2 products    │ → 1 product     │
│   (€1,990+)     │   (€1,490-5,990)│   (€1,890)      │
└─────────────────┴─────────────────┴─────────────────┘

If "Šalčio terapija" → Show Arctic (€1,490) vs Arctic Chiller (€5,990) comparison
If "Ofuro" → Show Ofuro product page directly


STEP 2: CAPACITY (Only if chose "Karštas maudymasis")
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Question: "Kiek žmonių dažniausiai maudysis kartu?"

┌─────────────────┬─────────────────┬─────────────────┐
│ 2-4 ASMENYS     │ 4-6 ASMENYS     │ 6+ ASMENYS      │
│                 │                 │                 │
│ Pora, maža      │ Šeima su        │ Draugų          │
│ šeima           │ vaikais         │ kompanija       │
│                 │                 │                 │
│ nuo €1,990      │ nuo €2,690      │ nuo €2,890      │
│ nuo 56 €/mėn    │ nuo 75 €/mėn    │ nuo 81 €/mėn    │
└─────────────────┴─────────────────┴─────────────────┘

Filters:
- 2-4: Classic Round (In/Out/Horizon) → 3 products
- 4-6: + Paris, Andorra, Grande Round → 6 products
- 6+:  + Monaco series, Cuba, Macau → 7 products


STEP 3: DESIGN PREFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Question: "Koks dizainas jums labiau patinka?"

┌─────────────────┬─────────────────┬─────────────────┐
│ APVALUS         │ KVADRATINIS     │ NESVARBU        │
│ [image]         │ [image]         │                 │
│                 │                 │ Parodyti        │
│ Klasikinis,     │ Modernus,       │ visus           │
│ tradicinis      │ elegantiškas    │ variantus       │
│                 │                 │                 │
│ nuo €1,990      │ nuo €2,690      │                 │
└─────────────────┴─────────────────┴─────────────────┘

Round: Classic Round, Grande Round
Square: Paris, Andorra, Cuba, Monaco, Macau
```

**Product Mapping by Quiz Path:**

| Purpose | Capacity | Shape | Recommended Products |
|---------|----------|-------|---------------------|
| Hot | 2-4 | Round | Classic Round In (€1,990), Classic Round Out (€2,490), Classic Round Horizon (€3,490) |
| Hot | 2-4 | Square | Paris In (€2,690), Andorra (€2,890) |
| Hot | 4-6 | Round | Grande Round In (€2,890), Grande Round Out (€3,190), Grande Round Horizon (€4,290) |
| Hot | 4-6 | Square | Paris In (€2,690), Andorra (€2,890), Monaco In (€3,290) |
| Hot | 6+ | Round | Grande Round series |
| Hot | 6+ | Square | Monaco series (€3,290-4,890), Cuba Out (€3,590), Macau In (€3,190) |
| Cold | - | - | Arctic (€1,490), Arctic Chiller (€5,990) |
| Ofuro | - | - | Ofuro (€1,890) |

**Rezultatų puslapis:**
- Antraštė: „Jums rekomenduojame" su pasirinkimų santrauka
- 2-4 produktai, surūšiuoti pagal populiarumą
- Kiekviena kortelė rodo: „Tinka jums, nes..." su personalizuotais punktais
- Apačioje: „Peržiūrėti visus →" nuoroda

---

### 1b. Complete Quiz UI Specification (Lithuanian)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                     RASKITE SAVO KUBILĄ                         ┃
┃                        1 / 3 žingsnis                           ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃   Kokio tipo kubilą ieškote?                                   ┃
┃                                                                 ┃
┃   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐┃
┃   │   [hot tub      │  │   [ice bath     │  │   [ofuro        │┃
┃   │    image]       │  │    image]       │  │    image]       │┃
┃   │                 │  │                 │  │                 │┃
┃   │ KARŠTO VANDENS  │  │ ŠALČIO TERAPIJA │  │     OFURO       │┃
┃   │    KUBILAS      │  │                 │  │                 │┃
┃   │                 │  │                 │  │                 │┃
┃   │ Atsipalaidavimui│  │ Recovery ir     │  │ Japoniška       │┃
┃   │ su šeima ar     │  │ kontrastinei    │  │ maudymosi       │┃
┃   │ draugais        │  │ terapijai       │  │ tradicija       │┃
┃   │                 │  │                 │  │                 │┃
┃   │ nuo 1 990 €     │  │ nuo 1 490 €     │  │ 1 890 €         │┃
┃   │ 13 modelių      │  │ 2 modeliai      │  │                 │┃
┃   └─────────────────┘  └─────────────────┘  └─────────────────┘┃
┃                                                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                     RASKITE SAVO KUBILĄ                         ┃
┃                        2 / 3 žingsnis                           ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃   Kiek žmonių dažniausiai maudysis vienu metu?                 ┃
┃                                                                 ┃
┃   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐┃
┃   │   [2 people     │  │   [family       │  │   [group        │┃
┃   │    icon]        │  │    icon]        │  │    icon]        │┃
┃   │                 │  │                 │  │                 │┃
┃   │   2-4 ASMENYS   │  │   4-6 ASMENYS   │  │   6+ ASMENYS    │┃
┃   │                 │  │                 │  │                 │┃
┃   │ Pora arba       │  │ Šeima su        │  │ Draugų          │┃
┃   │ maža šeima      │  │ vaikais         │  │ kompanija       │┃
┃   │                 │  │                 │  │                 │┃
┃   │ nuo 1 990 €     │  │ nuo 2 690 €     │  │ nuo 2 890 €     │┃
┃   │ nuo 56 €/mėn    │  │ nuo 75 €/mėn    │  │ nuo 81 €/mėn    │┃
┃   └─────────────────┘  └─────────────────┘  └─────────────────┘┃
┃                                                                 ┃
┃   ← Grįžti                                                      ┃
┃                                                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                     RASKITE SAVO KUBILĄ                         ┃
┃                        3 / 3 žingsnis                           ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃   Koks dizainas jums labiau patinka?                           ┃
┃                                                                 ┃
┃   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐┃
┃   │   [round tub    │  │   [square tub   │  │                 │┃
┃   │    photo]       │  │    photo]       │  │       ?         │┃
┃   │                 │  │                 │  │                 │┃
┃   │    APVALUS      │  │  KVADRATINIS    │  │    NESVARBU     │┃
┃   │                 │  │                 │  │                 │┃
┃   │ Klasikinis,     │  │ Modernus,       │  │ Rodyti visus    │┃
┃   │ tradicinis      │  │ elegantiškas    │  │ variantus       │┃
┃   │                 │  │                 │  │                 │┃
┃   │ nuo 1 990 €     │  │ nuo 2 690 €     │  │                 │┃
┃   └─────────────────┘  └─────────────────┘  └─────────────────┘┃
┃                                                                 ┃
┃   ← Grįžti                                                      ┃
┃                                                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                      JUMS REKOMENDUOJAME                        ┃
┃            4-6 asmenims • Apvalus dizainas                      ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃  ┌──────────────────────────┐  ┌──────────────────────────┐    ┃
┃  │ [Grande Round In photo]  │  │ [Grande Round Out photo] │    ┃
┃  │                          │  │                          │    ┃
┃  │ Grande Round In          │  │ Grande Round Out         │    ┃
┃  │ 2 890 € · 81 €/mėn       │  │ 3 190 € · 89 €/mėn       │    ┃
┃  │                          │  │                          │    ┃
┃  │ Tinka jums, nes:         │  │ Tinka jums, nes:         │    ┃
┃  │ ✓ Telpa 6-8 asmenys      │  │ ✓ Telpa 6-8 asmenys      │    ┃
┃  │ ✓ Apvalus dizainas       │  │ ✓ Apvalus dizainas       │    ┃
┃  │ ✓ Integruota krosnelė    │  │ ✓ Daugiau vietos viduje  │    ┃
┃  │                          │  │                          │    ┃
┃  │ [    PLAČIAU    ]        │  │ [    PLAČIAU    ]        │    ┃
┃  └──────────────────────────┘  └──────────────────────────┘    ┃
┃                                                                 ┃
┃  ┌──────────────────────────┐                                  ┃
┃  │ [Grande Round Horizon]   │  ★ Premium variantas             ┃
┃  │                          │                                  ┃
┃  │ Grande Round Horizon     │                                  ┃
┃  │ 4 290 € · 120 €/mėn      │                                  ┃
┃  │                          │                                  ┃
┃  │ Tinka jums, nes:         │                                  ┃
┃  │ ✓ Telpa 6-8 asmenys      │                                  ┃
┃  │ ✓ Panoraminis dizainas   │                                  ┃
┃  │ ✓ Horizon krosnelė       │                                  ┃
┃  │                          │                                  ┃
┃  │ [    PLAČIAU    ]        │                                  ┃
┃  └──────────────────────────┘                                  ┃
┃                                                                 ┃
┃            Peržiūrėti visus produktus →                        ┃
┃                                                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Šalčio terapijos rezultatai (jei pasirinko Step 1 → Šalčio terapija):**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                      ŠALČIO TERAPIJA                            ┃
┃              Pasirinkite jums tinkamą variantą                  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃  ┌──────────────────────────┐  ┌──────────────────────────┐    ┃
┃  │ [Arctic photo]           │  │ [Arctic Chiller photo]   │    ┃
┃  │                          │  │                          │    ┃
┃  │ Arctic                   │  │ Arctic Chiller           │    ┃
┃  │ 1 490 €                  │  │ 5 990 €                  │    ┃
┃  │ 42 €/mėn                 │  │ 167 €/mėn                │    ┃
┃  │                          │  │ ★ Su aušinimo sistema    │    ┃
┃  │ Be aušinimo sistemos     │  │                          │    ┃
┃  │ Vanduo šąla natūraliai   │  │ Palaiko 3-8°C temperatūrą│    ┃
┃  │                          │  │ Profesionalams           │    ┃
┃  │                          │  │                          │    ┃
┃  │ [    PLAČIAU    ]        │  │ [    PLAČIAU    ]        │    ┃
┃  └──────────────────────────┘  └──────────────────────────┘    ┃
┃                                                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

### 2. Simplified Catalog View

**Default State (after quiz or category click):**
- Show only matched/category products (2-6 items)
- Clear header: "Apvalūs kubilai" or "Jums parinkti modeliai"
- Minimal filters visible

**"Browse All" State:**
- Available via link
- Smart defaults: sort by popularity
- Simplified filters:
  - Capacity: 2-4 / 4-6 / 6+
  - Shape: Round / Square / Therapeutic
  - Price: Slider or ranges
- Remove: Technical filters (jets, LED, etc.)

**Filter Bar Redesign:**
```typescript
const SIMPLIFIED_FILTERS = [
  { id: 'all', label: 'Visi' },
  { id: 'small', label: '2-4 Asmenims' },
  { id: 'large', label: '5+ Asmenims' },
  { id: 'round', label: 'Apvalūs' },
  { id: 'square', label: 'Kvadratiniai' },
  { id: 'therapeutic', label: 'Šalčio terapija' },
];
// Remove: internal/external/horizon heater filters (too technical)
```

---

### 3. Product Page — Gateway to Beautiful Configurator

**Key Insight:** Product page builds desire. Primary CTA is `[KONFIGŪRUOTI]` which leads to the beautiful step-by-step wizard. Quick-buy with preset packages available for users who don't want to configure.

**Full Product Page Layout (Lithuanian):**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ← Grįžti į katalogą                                             ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃  ┌─────────────────────────┐   MONACO HORIZON                   ┃
┃  │                         │   ━━━━━━━━━━━━━━━                  ┃
┃  │    [Main Product        │   8-10 asmenų · Kvadratinis        ┃
┃  │     Photo]              │   Panoraminis Horizon dizainas     ┃
┃  │                         │                                    ┃
┃  │                         │   ┌─────┬─────┬─────┬─────┐        ┃
┃  │                         │   │8-10 │2.2m │ LED │ 5m  │        ┃
┃  │                         │   │asm. │     │Jets │gar. │        ┃
┃  └─────────────────────────┘   └─────┴─────┴─────┴─────┘        ┃
┃  [thumb] [thumb] [thumb]                                        ┃
┃                                                                 ┃
┃                            nuo 4 890 €  ·  nuo 136 €/mėn        ┃
┃                                                                 ┃
┃               ┌─────────────────────────────────────┐           ┃
┃               │                                     │           ┃
┃               │    [ KONFIGŪRUOTI IR UŽSAKYTI ]     │ ← PRIMARY ┃
┃               │                                     │           ┃
┃               │    Pasirinkite medieną, spalvą      │           ┃
┃               │    ir priedus per 2 minutes         │           ┃
┃               │                                     │           ┃
┃               └─────────────────────────────────────┘           ┃
┃                                                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃   ARBA UŽSAKYKITE GREITAI (su standartine konfigūracija)        ┃
┃                                                                 ┃
┃   ┌─────────────────┬─────────────────┬─────────────────┐       ┃
┃   │    BAZINIS      │   POPULIARUS    │    PREMIUM      │       ┃
┃   │                 │   ★ Rekomenduoj.│                 │       ┃
┃   ├─────────────────┼─────────────────┼─────────────────┤       ┃
┃   │    4 890 €      │    5 380 €      │    5 880 €      │       ┃
┃   │    136 €/mėn    │    150 €/mėn    │    164 €/mėn    │       ┃
┃   ├─────────────────┼─────────────────┼─────────────────┤       ┃
┃   │ ✓ Kubilas       │ ✓ Viskas iš     │ ✓ Viskas iš     │       ┃
┃   │ ✓ Horizon krosn.│   Bazinio +     │   Populiaraus + │       ┃
┃   │ ✓ Eglės mediena │ ✓ Termo dangtelis│ ✓ Termo mediena│       ┃
┃   │ ✓ Std. dangtelis│ ✓ Laiptai       │ ✓ LED apšvietim.│       ┃
┃   │                 │ ✓ Priežiūros    │ ✓ Premium akrilas│      ┃
┃   │                 │   rinkinys      │                 │       ┃
┃   ├─────────────────┼─────────────────┼─────────────────┤       ┃
┃   │ [Į KREPŠELĮ]    │ [Į KREPŠELĮ]    │ [Į KREPŠELĮ]    │       ┃
┃   └─────────────────┴─────────────────┴─────────────────┘       ┃
┃                                                                 ┃
┃   ↑ Greitam užsakymui — iškart į krepšelį be konfigūravimo     ┃
┃                                                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃   KODĖL MONACO HORIZON?                                         ┃
┃                                                                 ┃
┃   Flagmaninis modelis tiems, kurie siekia aukščiausios          ┃
┃   prabangos. Panoraminis dizainas leidžia mėgautis aplinkos     ┃
┃   vaizdais be jokių trukdžių.                                   ┃
┃                                                                 ┃
┃   Tinka jums, jei:                                              ┃
┃   • Dažnai priimate svečius ir draugus                          ┃
┃   • Vertinate modernų, elegantišką dizainą                      ┃
┃   • Norite pilnos SPA patirties su LED ir masažu                ┃
┃                                                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃   DAŽNIAUSIAI UŽDUODAMI KLAUSIMAI                               ┃
┃                                                                 ┃
┃   ▸ Ar reikia leidimo statybai?                                 ┃
┃   ▸ Kaip vyksta pristatymas ir montavimas?                      ┃
┃   ▸ Kokia garantija?                                            ┃
┃   ▸ Kiek kainuoja eksploatacija?                                ┃
┃   ▸ Ar galima išsimokėtinai?                                    ┃
┃                                                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃   TECHNINĖS SPECIFIKACIJOS                                      ┃
┃   [Collapsible detailed specs]                                  ┃
┃                                                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Sticky Mobile CTA (Bottom Bar):**
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  5 380 € · 150 €/mėn    [ UŽSAKYTI ]       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**User Flow (5-6 clicks total):**
```
Homepage → Quiz (3 clicks) → Results → Product Page → Pick Package → UŽSAKYTI → Cart → Checkout
```

**For users who want customization:**
- "Norite pritaikyti detaliau?" link opens full configurator
- Estimated 10-15% of users will use this
- 85-90% will just pick a package and go

**FAQ Section Answers (Lithuanian):**
```typescript
const PRODUCT_FAQS = [
  {
    question: 'Ar reikia leidimo statybai?',
    answer: 'Daugeliu atvejų leidimo nereikia, nes kubilas laikomas kilnojamuoju daiktu, o ne statiniu. Jei abejojate – pasitarkite su savo savivaldybe.',
  },
  {
    question: 'Kaip vyksta pristatymas ir montavimas?',
    answer: 'Pristatome visoje Lietuvoje per 2-4 savaites. Montavimas įskaičiuotas į kainą – mūsų specialistai viską sumontuos ir parodys, kaip naudotis.',
  },
  {
    question: 'Kokia garantija?',
    answer: '5 metų garantija kubilo konstrukcijai, 2 metai elektronikai ir krosnelei. Garantinis aptarnavimas visoje Lietuvoje.',
  },
  {
    question: 'Kiek kainuoja eksploatacija per mėnesį?',
    answer: 'Malkinis kūrenimas: ~5€ už vieną kūrenimą. Elektros sąnaudos (siurblys, LED): ~10-15€/mėn. Vandens priežiūra: ~10€/mėn.',
  },
  {
    question: 'Ar galima išsimokėtinai?',
    answer: 'Taip! Siūlome lizingą be pradinio įnašo. Mėnesinės įmokos nuo 42€ (Arctic) iki 167€ (Arctic Chiller). Sprendimas per 15 min.',
  },
];
```

---

### 4. Konfigūratorius — Beautiful Step-by-Step Wizard

**Philosophy:** Konfigūratorius yra PAGRINDINIS kelias, ne paslėpta funkcija. Bet jis suprojektuotas taip, kad jaustųsi lengvas ir greitas — vienas sprendimas per žingsnį.

**Access:** Primary CTA on product page: `[ KONFIGŪRUOTI IR UŽSAKYTI ]`

**Konfigūratoriaus Step-by-Step Wizard:**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                 ┃
┃  MONACO HORIZON                                                 ┃
┃  Konfigūruokite savo kubilą                                    ┃
┃                                                                 ┃
┃  ●━━━━━━━○━━━━━━━○━━━━━━━○━━━━━━━○                              ┃
┃  Paketas   Mediena  Spalva  Priedai  Peržiūra                  ┃
┃                                                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃  1. PASIRINKITE KOMPLEKTACIJĄ                                   ┃
┃                                                                 ┃
┃  ┌───────────────────────────────────────────────────────────┐ ┃
┃  │                                                           │ ┃
┃  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │ ┃
┃  │  │             │  │ ★ DAUGUMA   │  │             │       │ ┃
┃  │  │   BAZINIS   │  │   RENKASI   │  │   PREMIUM   │       │ ┃
┃  │  │             │  │             │  │             │       │ ┃
┃  │  │   4 890 €   │  │   5 380 €   │  │   5 880 €   │       │ ┃
┃  │  │   136 €/mėn │  │   150 €/mėn │  │   164 €/mėn │       │ ┃
┃  │  │             │  │             │  │             │       │ ┃
┃  │  │ ✓ Kubilas   │  │ ✓ Bazinis + │  │ ✓ Populiar +│       │ ┃
┃  │  │ ✓ Krosnelė  │  │ ✓ Termo     │  │ ✓ Termo     │       │ ┃
┃  │  │ ✓ Eglės med.│  │   dangtelis │  │   mediena   │       │ ┃
┃  │  │ ✓ Standart. │  │ ✓ Laiptai   │  │ ✓ LED       │       │ ┃
┃  │  │   dangtelis │  │ ✓ Priežiūros│  │ ✓ Premium   │       │ ┃
┃  │  │             │  │   rinkinys  │  │   akrilas   │       │ ┃
┃  │  │             │  │             │  │             │       │ ┃
┃  │  │  [RINKTIS]  │  │[✓ PASIRINKTA]│ │  [RINKTIS]  │       │ ┃
┃  │  └─────────────┘  └─────────────┘  └─────────────┘       │ ┃
┃  │                                                           │ ┃
┃  └───────────────────────────────────────────────────────────┘ ┃
┃                                                                 ┃
┃                                       [ TOLIAU → ]              ┃
┃                                                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                 ┃
┃  MONACO HORIZON · Populiarus                     5 380 €        ┃
┃                                                                 ┃
┃  ○━━━━━━━●━━━━━━━○━━━━━━━○━━━━━━━○                              ┃
┃  Paketas   Mediena  Spalva  Priedai  Peržiūra                  ┃
┃                                                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃  2. PASIRINKITE MEDIENĄ                                         ┃
┃                                                                 ┃
┃     Išorinė kubilo apdaila                                      ┃
┃                                                                 ┃
┃  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐       ┃
┃  │ [photo]   │ │ [photo]   │ │ [photo]   │ │ [photo]   │       ┃
┃  │           │ │     ★     │ │           │ │           │       ┃
┃  │   EGLĖ    │ │   TERMO   │ │  KEDRAS   │ │  ĄŽUOLAS  │       ┃
┃  │           │ │           │ │           │ │           │       ┃
┃  │   +0 €    │ │  +290 €   │ │  +390 €   │ │  +590 €   │       ┃
┃  │           │ │Rekomenduoj│ │           │ │           │       ┃
┃  │  [    ]   │ │  [ ✓ ]    │ │  [    ]   │ │  [    ]   │       ┃
┃  └───────────┘ └───────────┘ └───────────┘ └───────────┘       ┃
┃                                                                 ┃
┃  ℹ️ Termo mediena atspari drėgmei ir tarnaus ilgiau             ┃
┃                                                                 ┃
┃                                                                 ┃
┃  [ ← ATGAL ]                              [ TOLIAU → ]          ┃
┃                                                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                 ┃
┃  MONACO HORIZON · Populiarus + Termo             5 670 €        ┃
┃                                                                 ┃
┃  ○━━━━━━━○━━━━━━━●━━━━━━━○━━━━━━━○                              ┃
┃  Paketas   Mediena  Spalva  Priedai  Peržiūra                  ┃
┃                                                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃  3. PASIRINKITE SPALVĄ                                          ┃
┃                                                                 ┃
┃     Vidinis akrilo paviršius                                    ┃
┃                                                                 ┃
┃  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   ┃
┃  │ [○    ] │ │ [○    ] │ │ [○    ] │ │ [○    ] │ │ [○    ] │   ┃
┃  │  BALTA  │ │  PILKA  │ │ SMĖLIO  │ │ MĖLYNA  │ │  JUODA  │   ┃
┃  │   +0 €  │ │   +0 €  │ │   +0 €  │ │  +90 €  │ │ +190 €  │   ┃
┃  │  [ ✓ ]  │ │  [   ]  │ │  [   ]  │ │  [   ]  │ │  [   ]  │   ┃
┃  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘   ┃
┃                                                                 ┃
┃                                                                 ┃
┃  [ ← ATGAL ]                              [ TOLIAU → ]          ┃
┃                                                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                 ┃
┃  MONACO HORIZON · Populiarus + Termo + Balta     5 670 €        ┃
┃                                                                 ┃
┃  ○━━━━━━━○━━━━━━━○━━━━━━━●━━━━━━━○                              ┃
┃  Paketas   Mediena  Spalva  Priedai  Peržiūra                  ┃
┃                                                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃  4. PAPILDOMI PRIEDAI                                           ┃
┃                                                                 ┃
┃     Pasirinkite, ko dar norite (nebūtina)                      ┃
┃                                                                 ┃
┃  ┌─────────────────────────────────────────────────────────┐   ┃
┃  │  ☑  LED apšvietimas                           +290 €    │   ┃
┃  │      7-24 žvaigždutės + 1-2 lempos                      │   ┃
┃  ├─────────────────────────────────────────────────────────┤   ┃
┃  │  ☐  Masažiniai purkštukai                     +590 €    │   ┃
┃  │      6-24 vandens + 12-24 oro purkštukų                 │   ┃
┃  ├─────────────────────────────────────────────────────────┤   ┃
┃  │  ☐  Filtracijos sistema                       +390 €    │   ┃
┃  │      Smėlio filtras arba UVC                            │   ┃
┃  ├─────────────────────────────────────────────────────────┤   ┃
┃  │  ☐  Elektrinis šildytuvas                     +490 €    │   ┃
┃  │      Papildomas šildymas be malkų                       │   ┃
┃  └─────────────────────────────────────────────────────────┘   ┃
┃                                                                 ┃
┃                                                                 ┃
┃  [ ← ATGAL ]                              [ TOLIAU → ]          ┃
┃                                                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                 ┃
┃  MONACO HORIZON                                                 ┃
┃  Jūsų konfigūracija                                            ┃
┃                                                                 ┃
┃  ○━━━━━━━○━━━━━━━○━━━━━━━○━━━━━━━●                              ┃
┃  Paketas   Mediena  Spalva  Priedai  Peržiūra                  ┃
┃                                                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                 ┃
┃  ┌─────────────────┐                                           ┃
┃  │                 │   Monaco Horizon                          ┃
┃  │  [Product       │   ─────────────────────────────────────   ┃
┃  │   Preview       │                                           ┃
┃  │   Image]        │   ✓ Populiarus paketas                    ┃
┃  │                 │   ✓ Termo medienos apdaila                ┃
┃  │                 │   ✓ Baltas akrilas                        ┃
┃  │                 │   ✓ Termo dangtelis                       ┃
┃  └─────────────────┘   ✓ Mediniai laiptai                      ┃
┃                        ✓ Priežiūros rinkinys                   ┃
┃                        ✓ LED apšvietimas                       ┃
┃                                                                 ┃
┃  ┌─────────────────────────────────────────────────────────┐   ┃
┃  │                                                         │   ┃
┃  │   Bazinė kaina                              4 890 €     │   ┃
┃  │   Populiarus paketas                         +490 €     │   ┃
┃  │   Termo mediena                              +290 €     │   ┃
┃  │   LED apšvietimas                            +290 €     │   ┃
┃  │   ─────────────────────────────────────────────────     │   ┃
┃  │   VISO                                      5 960 €     │   ┃
┃  │                                                         │   ┃
┃  │   arba lizingu    166 €/mėn × 36 mėn                   │   ┃
┃  │                                                         │   ┃
┃  └─────────────────────────────────────────────────────────┘   ┃
┃                                                                 ┃
┃  ┌─────────────────────────────────────────────────────────┐   ┃
┃  │                                                         │   ┃
┃  │   Pristatymas per 2-4 savaites · Montavimas įskaičiuotas│   ┃
┃  │   5 metų garantija · Gaminama Lietuvoje                 │   ┃
┃  │                                                         │   ┃
┃  └─────────────────────────────────────────────────────────┘   ┃
┃                                                                 ┃
┃                                                                 ┃
┃  [ ← ATGAL ]           [      Į KREPŠELĮ      ]                ┃
┃                                                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Wizard UX Principles:**

1. **Progress bar** - User always sees where they are (●━━○━━○━━○)
2. **One decision per step** - No cognitive overload
3. **Live price in header** - Always visible, updates instantly
4. **Smart defaults** - "Populiarus" and "★ Rekomenduojama" pre-selected
5. **Back/Forward navigation** - Easy to change previous choices
6. **Visual options** - Photos for wood, color swatches for acrylic
7. **Helpful hints** - "ℹ️ Termo mediena atspari drėgmei..."
8. **Final review** - See everything before adding to cart
9. **Trust signals** - Warranty, delivery, made in LT on final step

**Mobile Experience:**
- Same steps, vertically stacked
- Sticky bottom bar with price + "TOLIAU" button
- Swipe gestures between steps (optional enhancement)

---

### 5. Trust Elements (Site-Wide)

**Trust Bar Component:**
```typescript
const TRUST_BADGES = [
  { icon: 'flag-lt', text: 'Gaminama Lietuvoje' },
  { icon: 'shield', text: '5 metų garantija' },
  { icon: 'truck', text: 'Montavimas įskaičiuotas' },
  { icon: 'phone', text: 'Nemokama konsultacija' },
];
```

**Placement:**
- Below homepage hero
- Above footer on all pages
- In checkout flow

**Customer Proof Points:**
- "Parduota 500+ kubilų"
- "4.9/5 klientų įvertinimas"
- Real installation photos in gallery

---

### 6. Checkout Optimization

**Key Principles:**
- Guest checkout default (no forced account)
- Clear progress indicator
- Financing prominent (not hidden)
- Trust signals throughout
- Phone support visible

**Flow:**
```
Step 1: Kontaktai
- Name, email, phone
- "Užsakymas be registracijos"

Step 2: Pristatymas
- Address
- Delivery timeline shown
- Installation scheduling

Step 3: Mokėjimas
- Financing option first
- Bank transfer
- Invoice for B2B

Step 4: Patvirtinimas
- Order summary
- Next steps clear
- Support contact
```

---

## Implementation Priority

### Phase 1: High Impact, Quick Wins
1. **Product Finder Quiz** - New component
2. **Quiz Results Page** - Personalized catalog view
3. **Trust Bar** - Reusable component
4. **Product Page FAQ** - Addresses objections
5. **Monthly Payment Display** - Show "nuo X €/mėn" everywhere

### Phase 2: Conversion Optimization
6. **Configurator Step-by-Step Wizard** - Beautiful, one decision per step
7. **Product Comparison Widget** - Side-by-side comparison
8. **Sticky Mobile CTA** - Price + monthly + button
9. **Exit Intent Email Capture** - Save configuration

### Phase 3: Retention & Growth
10. **Abandoned Cart Email Sequence** - 4-email recovery flow
11. **Post-Purchase Email Flow** - Confirmation → Installation → Review request
12. **Video on Product Pages** - Product in action (can use stock/rendered)

### Phase 4: Social Proof (After First Sales)
13. **Review Collection System** - Email customers post-installation
14. **Customer Photo Gallery** - Real installation photos
15. **Trust Numbers** - "X+ kubilų" when we have data

---

## Monthly Payment Calculation

**Formula:** `Math.ceil(totalPrice / 36)` €/mėn

**Display:** Always show "nuo X €/mėn" alongside or instead of full price.

**Product Base Prices → Monthly:**
| Product | Base Price | Monthly (36 mėn) |
|---------|------------|------------------|
| Arctic | 1,490 € | 42 €/mėn |
| Ofuro | 1,890 € | 53 €/mėn |
| Classic Round In | 1,990 € | 56 €/mėn |
| Classic Round Out | 2,490 € | 70 €/mėn |
| Paris In | 2,690 € | 75 €/mėn |
| Andorra | 2,890 € | 81 €/mėn |
| Grande Round In | 2,890 € | 81 €/mėn |
| Macau In | 3,190 € | 89 €/mėn |
| Grande Round Out | 3,190 € | 89 €/mėn |
| Monaco In | 3,290 € | 92 €/mėn |
| Classic Round Horizon | 3,490 € | 97 €/mėn |
| Cuba Out | 3,590 € | 100 €/mėn |
| Monaco Out | 3,890 € | 108 €/mėn |
| Grande Round Horizon | 4,290 € | 120 €/mėn |
| Monaco Horizon | 4,890 € | 136 €/mėn |
| Arctic Chiller | 5,990 € | 167 €/mėn |

**Where to Display:**
```
1. Product cards in catalog:
   ┌─────────────────┐
   │ Monaco Horizon  │
   │ nuo 136 €/mėn   │ ← Lead with monthly
   │ arba 4 890 €    │ ← Secondary
   └─────────────────┘

2. Product page hero:
   "nuo 136 €/mėn · arba 4 890 € vienkartinis mokėjimas"

3. Configurator (live update):
   "Viso: 5 670 € · 158 €/mėn"

4. Cart:
   "Jūsų užsakymas: 5 670 € arba 158 €/mėn su lizingu"

5. Quiz results:
   Each product card shows monthly payment
```

**Configurator Live Calculation:**
```typescript
function calculateMonthlyPayment(totalPrice: number, months: number = 36): number {
  return Math.ceil(totalPrice / months);
}

// In configurator state:
const totalPrice = basePrice + packagePrice + addons;
const monthlyPayment = calculateMonthlyPayment(totalPrice);

// Display:
// "5 670 € · 158 €/mėn"
```

---

## Contact Approach (Premium, Not Cheap)

**Philosophy:** Available but not aggressive. Elegant, not desperate.

**Header (subtle):**
```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]     Katalogas   Apie mus   Kontaktai      [Konsultacija]│
│                                                    ↑ Subtle link │
└─────────────────────────────────────────────────────────────────┘
```

**Product Page (contextual help):**
```
┌─────────────────────────────────────────────────────────────────┐
│  Turite klausimų apie šį modelį?                                │
│  [Užsisakyti konsultaciją] ← Links to Calendly                  │
└─────────────────────────────────────────────────────────────────┘
```

**Configurator (if user pauses 30+ seconds):**
```
┌─────────────────────────────────────────────────────────────────┐
│  Nežinote ką pasirinkti?                                        │
│  Mūsų ekspertas padės per 15 min pokalbį.                      │
│  [Rezervuoti laiką] ← Calendly                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Footer:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Kontaktai                                                       │
│  info@mojodasspa.lt                                             │
│  +370 XXX XXXXX                                                 │
│  [Užsisakyti konsultaciją]                                      │
└─────────────────────────────────────────────────────────────────┘
```

**What NOT to do:**
- ❌ Floating chat bubble
- ❌ Pop-ups on every page
- ❌ "SKAMBINKITE DABAR!"
- ❌ Flashing elements
- ❌ Multiple contact CTAs competing

---

## Exit Intent & Email Capture

**Trigger:** User moves mouse toward browser close/back (desktop) or attempts to navigate away.

**Design (elegant, not desperate):**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                  ┃
┃                     [Monaco Horizon preview]                     ┃
┃                                                                  ┃
┃        Išsaugokite savo konfigūraciją                           ┃
┃                                                                  ┃
┃        Atsiųsime nuorodą, kad galėtumėte                        ┃
┃        tęsti bet kada.                                          ┃
┃                                                                  ┃
┃        ┌────────────────────────────────┐                       ┃
┃        │  jusu@email.lt                 │                       ┃
┃        └────────────────────────────────┘                       ┃
┃                                                                  ┃
┃              [ IŠSAUGOTI KONFIGŪRACIJĄ ]                        ┃
┃                                                                  ┃
┃                    Ne, ačiū                                     ┃
┃                                                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Rules:**
- Show only ONCE per session
- Only on product page or configurator (not homepage)
- Include product/config they were viewing
- Clean, minimal design matching site aesthetic
- Easy dismiss ("Ne, ačiū" or click outside)

---

## Abandoned Cart Email Sequence

**Trigger:** User added to cart but didn't complete checkout within 1 hour.

```
EMAIL 1 (1 hour after abandon):
─────────────────────────────────────────────────────────────────
Subject: Jūsų Monaco Horizon laukia

Sveiki [Vardas],

Pastebėjome, kad nebaigėte užsakymo.

[Product Image]
Monaco Horizon - Populiarus paketas
5 380 € · 150 €/mėn

[TĘSTI UŽSAKYMĄ]

Turite klausimų? Atsakysime per 24h.

---

EMAIL 2 (24 hours):
─────────────────────────────────────────────────────────────────
Subject: Ar galime padėti?

Gal turite klausimų apie Monaco Horizon?

Dažniausiai klausia:
• Kaip vyksta pristatymas?
• Ar reikia leidimo?
• Kiek kainuoja eksploatacija?

[PERŽIŪRĖTI DUK]

Arba užsisakykite nemokamą konsultaciją:
[REZERVUOTI LAIKĄ]

---

EMAIL 3 (72 hours):
─────────────────────────────────────────────────────────────────
Subject: Jūsų konfigūracija vis dar išsaugota

Jūsų Monaco Horizon konfigūracija:
• Populiarus paketas
• Termo mediena
• Baltas akrilas

Viso: 5 670 € · 158 €/mėn

[UŽBAIGTI UŽSAKYMĄ]

---

EMAIL 4 (7 days):
─────────────────────────────────────────────────────────────────
Subject: Paskutinis priminimas

Jūsų išsaugota konfigūracija bus ištrinta po 7 dienų.

[PERŽIŪRĖTI KONFIGŪRACIJĄ]
```

---

## Trust Elements (What We Have Now)

**Trust Bar (homepage + all pages):**
```
┌─────────────────────────────────────────────────────────────────┐
│  🇱🇹 Gaminama Lietuvoje  ·  🛡 5 metų garantija  ·  🚚 Montavimas įskaičiuotas  │
└─────────────────────────────────────────────────────────────────┘
```

**Product Page Trust Signals:**
```
┌─────────────────────────────────────────────────────────────────┐
│  ✓ 5 metų garantija konstrukcijai                              │
│  ✓ 2 metų garantija elektronikai                               │
│  ✓ Pristatymas ir montavimas įskaičiuotas                      │
│  ✓ Gaminama Lietuvoje iš vietinių medžiagų                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Social Proof (FUTURE - When Available)

**Phase 1: Collect reviews after first sales**
- Email customers 2 weeks after installation
- Offer €50 priedų kuponas for photo + review
- Build gallery organically

**Phase 2: When we have 10+ reviews**
- Add reviews section to product pages
- Add "X klientų įvertinimas" to trust bar

**Phase 3: When we have 50+ sales**
- Add "50+ kubilų Lietuvoje" to trust bar
- Customer photo gallery

**For now: Don't fake it. Trust comes from guarantees and quality.**

---

## Price Psychology

**Current:** "4,890 €" — scary number upfront.

**Better approach:**

```
CURRENT:                          BETTER:
─────────────────────────────────────────────────────────
4,890 €                           nuo 136 €/mėn
                                  arba 4,890 € vienkartinis

─────────────────────────────────────────────────────────
"Monaco Horizon"                  "Monaco Horizon"
                                  ✓ Pristatymas (€300 vertės)
                                  ✓ Montavimas (€500 vertės)
                                  ✓ Priežiūros rinkinys (€120)
                                  ✓ 5 metų garantija
                                  ─────────────────────────
                                  Viso vertė: €5,810
                                  Jūsų kaina: 4,890 €

─────────────────────────────────────────────────────────
                                  "Per 10 metų - tik €1.34/dieną
                                   už SPA namuose"
```

**Implementation:**
- Lead with monthly payment everywhere
- Show value stacking on product page
- Daily cost calculator (optional)

---

## Video Content

**This is MASSIVE for hot tubs.** People want to see:
- Water bubbling
- Steam rising
- Happy family enjoying
- Night with LED lights
- Installation process

**Product Page:**
```
┌────────────────────────────────────────┐
│  [▶ WATCH VIDEO]                       │  ← Hero area
│                                        │
│  "Pažiūrėkite Monaco Horizon veikime"  │
└────────────────────────────────────────┘
```

**Types needed:**
- Product demo (30-60 sec)
- Customer testimonial (when available)
- Installation timelapse
- "Day in the life" lifestyle

---

## Configurator Visual Preview

**Currently missing:** User doesn't SEE their choices.

```
CURRENT:                          BETTER:
─────────────────────────────────────────────────────────
Select wood: [Termo]              [LIVE PREVIEW IMAGE]
Select color: [Pilka]             that updates as user
                                  selects options

                                  ┌─────────────────┐
                                  │                 │
                                  │  [3D Preview    │
                                  │   with Termo    │
                                  │   wood + Gray   │
                                  │   acrylic]      │
                                  │                 │
                                  └─────────────────┘
```

**Implementation options:**
1. Pre-rendered images for each combination (simplest)
2. CSS overlay system (medium complexity)
3. WebGL 3D viewer (most complex, best UX)

**Minimum viable:** Show product image that swaps based on wood selection.

---

## Urgency / Scarcity

**Currently:** Zero urgency.

**Tasteful urgency options:**

```
Delivery-based:
"Užsakykite iki kovo 28d. — pristatysime iki Velykų"

Seasonal:
"Pasiruoškite vasarai — užsakymai priimami iki balandžio 15d."

Stock-based:
"Šis modelis: 3 vnt. sandėlyje, kiti - gamyba 3-4 sav."

Bonus-based:
"Kovo mėnesį — nemokamas priežiūros rinkinys (€120 vertės)"
```

**Rules:**
- Only use TRUE statements
- Tasteful, not aggressive
- One urgency element per page max
- Seasonal campaigns work well for hot tubs

---

## Comparison Tool

**User thinking:** "Monaco vs Grande Round?" — no easy way to compare.

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  PALYGINKITE MODELIUS                                 ┃
┣━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━┫
┃                ┃ Monaco Horizon ┃ Grande Round Horiz.┃
┣━━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━┫
┃ Kaina          ┃ 4,890 €        ┃ 4,290 €            ┃
┃ Mėnesinis      ┃ 136 €/mėn      ┃ 120 €/mėn          ┃
┃ Talpa          ┃ 8-10 asm.      ┃ 6-8 asm.           ┃
┃ Forma          ┃ Kvadratinis    ┃ Apvalus            ┃
┃ Matmenys       ┃ 2.2 x 2.2m     ┃ ⌀ 2.25m            ┃
┃ LED            ┃ ✓              ┃ ✓                  ┃
┃ Jets           ┃ ✓ 6-24         ┃ ○                  ┃
┣━━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━┫
┃                ┃ [KONFIGŪRUOTI] ┃ [KONFIGŪRUOTI]     ┃
┗━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━┛
```

**Implementation:**
- "Palyginti" button on product cards
- Compare up to 3 products
- Sticky comparison bar at bottom
- Clear differences highlighted

---

## Post-Purchase Flow

**Currently:** Not implemented.

**Order Confirmation Page:**
```
┌─────────────────────────────────────────────────────┐
│  ✓ Užsakymas priimtas! (#MJ-2024-0342)             │
│                                                     │
│  KAS TOLIAU?                                        │
│  1. Gausite patvirtinimą el. paštu                 │
│  2. Susisieksime dėl montavimo datos (per 24h)     │
│  3. Pristatysime per 2-4 savaites                  │
│                                                     │
│  [Atsisiųsti paruošimo instrukciją PDF]            │
│                                                     │
│  Turite klausimų? +370 XXX XXXXX                   │
└─────────────────────────────────────────────────────┘
```

**Post-Purchase Email Sequence:**
```
Day 0:  Order confirmation + What to expect
Day 1:  "Paruoškite vietą" checklist PDF
Day 3:  Montavimo datos patvirtinimas
Day -1: "Rytoj atvežame!" reminder
Day +1: "Kaip sekasi? Ar viskas gerai?"
Day +14: "Prašome palikti atsiliepimą" (+ €50 kuponas už nuotrauką)
Day +30: "Rekomenduokite draugui, gaukite €200"
```

---

## Mobile Experience

**60%+ traffic is mobile — must be flawless.**

**Mobile-specific needs:**
```
• Sticky bottom CTA bar (price + monthly + button)
• Touch-friendly configurator options (large tap targets)
• Swipeable product gallery
• Click-to-call phone number
• WhatsApp one-tap button
• Simplified checkout (fewer fields)
• Fast loading (< 3 seconds)
• Quiz works perfectly on mobile
```

**Sticky Mobile CTA Bar:**
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  136 €/mėn · 4 890 €   [KONFIGŪRUOTI]   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## Priority Matrix

| Priority | Element | Impact | Effort |
|----------|---------|--------|--------|
| 🔴 P0 | Lead with monthly payment | Very High | Low |
| 🔴 P0 | Trust badges (guarantees) | High | Low |
| 🔴 P0 | Sticky mobile CTA | High | Low |
| 🟠 P1 | Exit intent + email capture | Very High | Medium |
| 🟠 P1 | Video on product pages | Very High | Medium |
| 🟠 P1 | Abandoned cart emails | High | Medium |
| 🟠 P1 | Value stacking on product page | High | Low |
| 🟡 P2 | Visual configurator preview | High | High |
| 🟡 P2 | Comparison tool | Medium | Medium |
| 🟡 P2 | Post-purchase email flow | Medium | Medium |
| 🟡 P2 | Urgency/scarcity messaging | Medium | Low |
| 🟢 P3 | Referral program | Medium | High |
| 🟢 P3 | Customer reviews (after sales) | High | Medium |
| 🟢 P3 | Installation gallery (after sales) | Medium | Low |

---

## File Structure for Implementation

```
components/
├── quiz/
│   ├── ProductFinderQuiz.tsx      # Main quiz component
│   ├── QuizStep.tsx               # Individual question
│   ├── QuizOption.tsx             # Option card
│   ├── QuizResults.tsx            # Results display
│   └── quizLogic.ts               # Scoring algorithm
├── catalog/
│   ├── PersonalizedResults.tsx    # Quiz-driven view
│   ├── CatalogContent.tsx         # Updated
│   └── FilterBar.tsx              # Simplified
├── product/
│   ├── ProductComparison.tsx      # Comparison widget
│   ├── ProductFAQ.tsx             # FAQ accordion
│   ├── FinancingCalculator.tsx    # Monthly payment calc
│   └── StickyMobileCTA.tsx        # Mobile conversion
├── configurator/
│   ├── PackageSelector.tsx        # 3-tier packages
│   └── ConfiguratorSimplified.tsx # Streamlined flow
└── shared/
    └── TrustBar.tsx               # Trust badges
```

---

## Success Metrics

### Primary KPIs
- **Conversion Rate:** Homepage → Checkout completion
- **Add-to-Cart Rate:** Product page → Cart
- **Quiz Completion Rate:** Quiz start → Results view
- **Average Order Value:** Track package upgrades

### Secondary KPIs
- Time on site
- Pages per session
- Bounce rate reduction
- Mobile conversion rate
- Financing application rate

---

## Technical Notes

### Data Requirements
All products already have `filterableSpecs` in `products.json`:
```json
{
  "filterableSpecs": {
    "hasWaterJets": boolean,
    "hasAirJets": boolean,
    "hasLED": boolean,
    "hasFiltration": boolean,
    "hasElectricHeater": boolean,
    "isColdTherapy": boolean,
    "weightKg": number | null,
    "externalSizeMm": number | null
  }
}
```

### State Management
- Quiz state: Local state with URL params for sharing
- Catalog filters: URL params for bookmarking
- Configurator: Zustand store (existing)

### SEO Considerations
- Quiz results page should be indexable with canonical URL
- Product pages remain primary landing pages
- Implement proper schema.org Product markup
