# MojoDas Spa: Complete Funnel Redesign

## The "Frank Kern / Ogilvy / Dan Kennedy" Conversion System

**Document Version:** 1.0
**Date:** 2026-03-26
**Status:** Design Specification

---

## Executive Summary

This document specifies a complete redesign of the MojoDas Spa user journey using direct response marketing principles from Frank Kern, David Ogilvy, Dan Kennedy, and behavioral psychology (Cialdini, Kahneman, Fogg).

**Key Insight:** A €2,000-5,000 hot tub is NOT e-commerce. It's a consultation that happens to end in a purchase.

**Core Philosophy:** Users are not "shopping" - they are being "consulted."

---

## Part 1: Psychological Framework

### The Masters' Principles Applied

| Principle | Source | Application |
|-----------|--------|-------------|
| Results in Advance | Frank Kern | Show the outcome first, configuration second |
| Survey Funnels | Frank Kern | Quiz qualifies AND segments in 3 questions |
| Headline Carries 80% | Ogilvy | "Jūsų namų SPA – per 2 savaites" |
| Specificity Builds Trust | Ogilvy | "per 2-4 savaites", "nuo 81 €/mėn" |
| Risk Reversal | Kennedy | "14 dienų grąžinimo garantija" |
| Takeaway Selling | Kennedy | "Pristatysime iki Velykų" (deadline) |
| Commitment/Consistency | Cialdini | Micro-yeses through quiz build to macro-yes |
| Social Proof | Cialdini | "★ 73% renkasi" on packages |
| Scarcity | Cialdini | Delivery timeline, not fake stock |
| System 1 Activation | Kahneman | Lifestyle imagery, emotion first |
| Behavior = MAT | Fogg | Reduce friction (Ability), increase Motivation |

### The "Micro-Yes" Ladder

Each step is a small commitment leading to the big commitment:

```
Step 1: "What experience do you want?"      → Identity commitment
Step 2: "How many people?"                  → Size commitment
Step 3: "Which design?"                     → Aesthetic commitment
Step 4: "This is your tub" (Results)        → Ownership visualization
Step 5: "Pick a package" (Product page)     → Price commitment
Step 6: "Add to cart"                       → Action commitment
Step 7: "How to pay?"                       → Financial commitment
Step 8: "Where to deliver?"                 → Completion
```

---

## Part 2: Critical Design Decision

### POPUP vs FULL-SCREEN PAGES

**Decision: Full-Screen Pages (NOT Popup)**

| Factor | Popup | Full-Screen | Winner |
|--------|-------|-------------|--------|
| Premium feel | Low | High | Full-Screen |
| Immersion | Interrupted | Complete | Full-Screen |
| Mobile UX | Scroll confusion | Native feel | Full-Screen |
| Share/Return | No URL | Bookmarkable | Full-Screen |
| Analytics | Limited | Full tracking | Full-Screen |
| Content space | Cramped | Unlimited | Full-Screen |
| €2,000+ purchase | Feels cheap | Feels premium | Full-Screen |

**Conclusion:** For a €2,000-5,000 purchase, users SHOULD feel like they're entering a dedicated experience. The quiz is the START of a sales conversation, not a quick filter.

**Popup reserved for:**
- Exit intent email capture
- Consultation booking confirmation
- Mini cart preview

---

## Part 3: Complete User Journey

### PHASE 0: Mental State on Arrival

User arrives thinking:
- "I want a hot tub but it's expensive"
- "There are too many options"
- "I don't know which one is right for me"
- "Can I even afford this?"
- "Will it fit my space?"

**Our job:** Answer all of these in the first 3 minutes.

---

### PHASE 1: HOMEPAGE (0-30 seconds)

**Goal:** Stop the scroll, create curiosity, segment intent

**Route:** `/`

#### Hero Section (Above Fold)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  [CINEMATIC LIFESTYLE VIDEO/IMAGE]                                     ┃
┃  Family in hot tub at twilight, steam rising, kids laughing            ┃
┃                                                                        ┃
┃  ═══════════════════════════════════════════════════════════════════   ┃
┃                                                                        ┃
┃           Jūsų namų SPA – per 2 savaites                               ┃
┃                                                                        ┃
┃           Gaminama Lietuvoje. Nuo 56 €/mėn.                            ┃
┃                                                                        ┃
┃  ┌────────────────────────────────┐  ┌────────────────────────────┐   ┃
┃  │                                │  │                            │   ┃
┃  │   RASKITE TOBULĄ KUBILĄ       │  │   PERŽIŪRĖTI MODELIUS      │   ┃
┃  │   (Atsakykite į 3 klausimus)  │  │                            │   ┃
┃  │                                │  │                            │   ┃
┃  └────────────────────────────────┘  └────────────────────────────┘   ┃
┃           PRIMARY CTA                      SECONDARY CTA               ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Psychological triggers in headline:**
- **SPECIFICITY:** "per 2 savaites" is concrete, not vague
- **AFFORDABILITY:** Monthly payment first (System 1 activation)
- **NATIONAL PRIDE:** "Gaminama Lietuvoje"
- **CURIOSITY GAP:** "Tobulą Kubilą" implies personalized match exists

#### Trust Strip (Below Hero)

```
┌────────────────────────────────────────────────────────────────────────┐
│  🇱🇹 Gaminama      🛡️ 5 metų         🚚 Montavimas      💳 Išsimokėtinai    │
│     Lietuvoje       garantija         įskaičiuotas      be pradinio   │
└────────────────────────────────────────────────────────────────────────┘
```

#### Homepage Flow (Below Fold)

1. **Bestsellers** (3 products with "nuo X €/mėn" pricing)
2. **Categories** (3 tiles: Round, Square, Cold Therapy)
3. **Process Steps** (How it works: Quiz → Choose → Configure → Enjoy)
4. **Trust/Authority** (Made in Lithuania, engineering facts)
5. **Final CTA** (Repeat quiz CTA)

---

### PHASE 2: QUALIFICATION QUIZ (1-3 minutes)

**Route:** `/raskite-savo-kubila`

**Design:** Full-screen, immersive, dark cinematic aesthetic

**UX Principles:**
- One question per screen (NO scrolling within steps)
- Large option cards with lifestyle imagery
- Progress indicator (subtle, not intimidating)
- Back button always visible
- Mobile: swipeable between steps
- Keyboard navigation (1, 2, 3 to select)

#### STEP 1: PURPOSE

**Route:** `/raskite-savo-kubila`

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  ●○○  1 / 3                                                           ┃
┃                                                                        ┃
┃  ═══════════════════════════════════════════════════════════════════   ┃
┃                                                                        ┃
┃                    *Kokio potyrio ieškote?*                            ┃
┃                                                                        ┃
┃  ┌──────────────────────┐┌──────────────────────┐┌──────────────────┐ ┃
┃  │                      ││                      ││                  │ ┃
┃  │  [Lifestyle image:   ││  [Ice bath image:    ││  [Ofuro image:   │ ┃
┃  │   family in tub]     ││   athlete recovery]  ││   Japanese bath] │ ┃
┃  │                      ││                      ││                  │ ┃
┃  │  ATSIPALAIDAVIMAS    ││  ŠALČIO TERAPIJA     ││  OFURO           │ ┃
┃  │  SU ŠEIMA            ││  IR RECOVERY         ││                  │ ┃
┃  │                      ││                      ││  Japoniška       │ ┃
┃  │  Šiltas vanduo,      ││  Sportininkams ir    ││  maudymosi       │ ┃
┃  │  burbulai, bendras   ││  sveikatai           ││  tradicija       │ ┃
┃  │  laikas              ││                      ││                  │ ┃
┃  │                      ││                      ││                  │ ┃
┃  │  13 modelių          ││  2 modeliai          ││  1 modelis       │ ┃
┃  │  nuo 56 €/mėn        ││  nuo 42 €/mėn        ││  53 €/mėn        │ ┃
┃  │                      ││                      ││                  │ ┃
┃  └──────────────────────┘└──────────────────────┘└──────────────────┘ ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Routing Logic:**
- "Atsipalaidavimas" → Step 2 (Capacity)
- "Šalčio terapija" → Cold Therapy Results (2 products: Arctic vs Arctic Chiller)
- "Ofuro" → Direct to Ofuro product page

**Psychological triggers:**
- **SELF-IDENTIFICATION:** User declares "I am the family person"
- **FIRST MICRO-YES:** Commitment made
- **SPECIFICITY:** Model count and price builds trust

#### STEP 2: CAPACITY (Only for "Hot Tub" path)

**Route:** `/raskite-savo-kubila?step=2&purpose=hot`

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  ← Grįžti                                            ○●○  2 / 3       ┃
┃                                                                        ┃
┃  ═══════════════════════════════════════════════════════════════════   ┃
┃                                                                        ┃
┃                *Kiek žmonių mėgaujasi kartu?*                          ┃
┃                                                                        ┃
┃  ┌──────────────────────┐┌──────────────────────┐┌──────────────────┐ ┃
┃  │                      ││                      ││                  │ ┃
┃  │        👫            ││       👨‍👩‍👧‍👦          ││       👥👥        │ ┃
┃  │                      ││                      ││                  │ ┃
┃  │    2-4 ASMENYS       ││    4-6 ASMENYS       ││    6+ ASMENYS    │ ┃
┃  │                      ││                      ││                  │ ┃
┃  │  Pora arba           ││  Šeima su            ││  Draugų          │ ┃
┃  │  maža šeima          ││  vaikais             ││  kompanija       │ ┃
┃  │                      ││                      ││                  │ ┃
┃  │  nuo 1 990 €         ││  nuo 2 690 €         ││  nuo 2 890 €     │ ┃
┃  │  nuo 56 €/mėn        ││  nuo 75 €/mėn        ││  nuo 81 €/mėn    │ ┃
┃  │                      ││                      ││                  │ ┃
┃  └──────────────────────┘└──────────────────────┘└──────────────────┘ ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Psychological triggers:**
- **SOCIAL IDENTITY:** "I'm the family person" or "I'm the entertainer"
- **PRICE ANCHORING:** Monthly payment makes €2,890 feel achievable
- **SECOND MICRO-YES:** Commitment deepens

#### STEP 3: DESIGN PREFERENCE

**Route:** `/raskite-savo-kubila?step=3&purpose=hot&capacity=4-6`

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  ← Grįžti                                            ○○●  3 / 3       ┃
┃                                                                        ┃
┃  ═══════════════════════════════════════════════════════════════════   ┃
┃                                                                        ┃
┃               *Koks dizainas jums artimesnis?*                         ┃
┃                                                                        ┃
┃  ┌──────────────────────┐┌──────────────────────┐┌──────────────────┐ ┃
┃  │                      ││                      ││                  │ ┃
┃  │  [Round tub photo]   ││  [Square tub photo]  ││       ?          │ ┃
┃  │                      ││                      ││                  │ ┃
┃  │      APVALUS         ││    KVADRATINIS       ││    NESVARBU      │ ┃
┃  │                      ││                      ││                  │ ┃
┃  │  Klasikinis,         ││  Modernus,           ││  Rodyti visus    │ ┃
┃  │  tradicinis          ││  elegantiškas        ││  variantus       │ ┃
┃  │                      ││                      ││                  │ ┃
┃  │  nuo 1 990 €         ││  nuo 2 690 €         ││                  │ ┃
┃  │                      ││                      ││                  │ ┃
┃  └──────────────────────┘└──────────────────────┘└──────────────────┘ ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Psychological triggers:**
- **THIRD MICRO-YES:** Strong commitment now
- **AESTHETIC IDENTITY:** "I'm the classic person" or "I'm modern"
- **OPTION ESCAPE:** "Nesvarbu" for undecided

---

### PHASE 3: PERSONALIZED RESULTS (The "Aha" Moment)

**Route:** `/raskite-savo-kubila/rezultatai?purpose=hot&capacity=4-6&shape=round`

**This is the CRITICAL conversion moment.**

The user must feel:
1. "They understand me"
2. "These are MY options, not all 16"
3. "I can see myself owning this"

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  *Jums rekomenduojame*                                                 ┃
┃                                                                        ┃
┃  Šeimai su vaikais • Apvalus dizainas                                  ┃
┃  ──────────────────────────────────────────────────────────────────    ┃
┃                                                                        ┃
┃  ┌──────────────────────────────────────────────────────────────────┐ ┃
┃  │                                                                  │ ┃
┃  │  [HERO IMAGE: Grande Round In - lifestyle shot, 60vh]            │ ┃
┃  │                                                                  │ ┃
┃  │  ★ REKOMENDUOJAME                                                │ ┃
┃  │                                                                  │ ┃
┃  │  Grande Round In                                                 │ ┃
┃  │  ━━━━━━━━━━━━━━━━━━                                             │ ┃
┃  │  nuo 81 €/mėn • 2 890 €                                         │ ┃
┃  │                                                                  │ ┃
┃  │  Tinka jums, nes:                                                │ ┃
┃  │  ✓ Telpa 6-8 asmenys – visai šeimai                             │ ┃
┃  │  ✓ Integruota krosnelė – kompaktiška erdvėje                    │ ┃
┃  │  ✓ Klasikinis apvalus dizainas                                   │ ┃
┃  │                                                                  │ ┃
┃  │  [       PASIRINKTI ŠĮ MODELĮ       ]                           │ ┃
┃  │                                                                  │ ┃
┃  └──────────────────────────────────────────────────────────────────┘ ┃
┃                                                                        ┃
┃  Kiti tinkami variantai:                                               ┃
┃                                                                        ┃
┃  ┌────────────────────────────┐  ┌────────────────────────────┐       ┃
┃  │ [Image]                    │  │ [Image]                    │       ┃
┃  │ Grande Round Out           │  │ Grande Round Horizon       │       ┃
┃  │ 89 €/mėn • 3 190 €         │  │ 120 €/mėn • 4 290 €        │       ┃
┃  │ Išorinė krosnelė           │  │ ★ Premium                  │       ┃
┃  │                            │  │                            │       ┃
┃  │ ✓ Daugiau vietos viduje    │  │ ✓ Panoraminis dizainas     │       ┃
┃  │                            │  │ ✓ Horizon krosnelė         │       ┃
┃  │                            │  │                            │       ┃
┃  │ [  PERŽIŪRĖTI  ]           │  │ [  PERŽIŪRĖTI  ]           │       ┃
┃  └────────────────────────────┘  └────────────────────────────┘       ┃
┃                                                                        ┃
┃  ──────────────────────────────────────────────────────────────────    ┃
┃                                                                        ┃
┃  Norite palyginti?  [ PALYGINTI 2 MODELIUS ]                          ┃
┃                                                                        ┃
┃  Vis dar nežinote?  [ UŽSISAKYTI KONSULTACIJĄ ]                       ┃
┃                                                                        ┃
┃  Peržiūrėti visus 16 modelių →                                        ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Psychological triggers:**
- **PERSONALIZATION:** "Jums rekomenduojame" (For you we recommend)
- **RECOMMENDATION:** ★ badge creates authority decision
- **REASON WHY:** "Tinka jums, nes..." addresses "why this one?"
- **COGNITIVE EASE:** 2-4 options, not 16
- **ESCAPE HATCHES:** Comparison, consultation, full catalog for different user needs

---

### PHASE 4: PRODUCT PAGE (Desire Building)

**Route:** `/produktas/grande-round-in`

**Key insight:** The product page is NOT just specs. It's a **mini sales letter.**

#### Section 1: Hero (Above Fold)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  ← Grįžti į rezultatus                                                ┃
┃                                                                        ┃
┃  ┌────────────────────────────────────────────────────────────────┐   ┃
┃  │                                                                │   ┃
┃  │  [CINEMATIC GALLERY - 70vh]                                    │   ┃
┃  │  Lifestyle shots with steam, twilight, family enjoying         │   ┃
┃  │                                                                │   ┃
┃  │  [thumb] [thumb] [thumb] [thumb]                               │   ┃
┃  │                                                                │   ┃
┃  └────────────────────────────────────────────────────────────────┘   ┃
┃                                                                        ┃
┃  Grande Round In                                                       ┃
┃  ━━━━━━━━━━━━━━━━━━                                                   ┃
┃  6-8 asmenų • Apvalus • Integruota krosnelė                           ┃
┃                                                                        ┃
┃  nuo 81 €/mėn                                                         ┃
┃  arba 2 890 € vienkartinis                                            ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────┐                  ┃
┃  │                                                 │                  ┃
┃  │       KONFIGŪRUOTI IR UŽSAKYTI                  │  ← PRIMARY       ┃
┃  │       Pasirinkite medieną ir priedus per 2 min  │                  ┃
┃  │                                                 │                  ┃
┃  └─────────────────────────────────────────────────┘                  ┃
┃                                                                        ┃
┃  [ 15 MIN. KONSULTACIJA ]  ← SECONDARY                                ┃
┃                                                                        ┃
┃  ✓ 5 metų garantija  ✓ Pristatymas per 2-4 sav.  ✓ Montavimas įsk.   ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

#### Section 2: Quick Purchase Packages (THE KEY CONVERSION ELEMENT)

**Frank Kern "Results in Advance":** Show them they can have this TODAY without complex decisions.

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  ARBA UŽSAKYKITE GREITAI                                              ┃
┃  Pasirinkite komplektaciją ir iškart į krepšelį                       ┃
┃                                                                        ┃
┃  ┌─────────────────┬─────────────────┬─────────────────┐              ┃
┃  │    BAZINIS      │   POPULIARUS    │    PREMIUM      │              ┃
┃  │                 │  ★ 73% RENKASI  │                 │              ┃
┃  ├─────────────────┼─────────────────┼─────────────────┤              ┃
┃  │    2 890 €      │    3 380 €      │    3 980 €      │              ┃
┃  │    81 €/mėn     │    94 €/mėn     │    111 €/mėn    │              ┃
┃  ├─────────────────┼─────────────────┼─────────────────┤              ┃
┃  │ ✓ Kubilas       │ ✓ Bazinis +     │ ✓ Populiarus +  │              ┃
┃  │ ✓ Integr. krosn.│ ✓ Termo dangtelis│ ✓ Termo mediena│              ┃
┃  │ ✓ Eglės mediena │ ✓ Mediniai      │ ✓ LED apšvietimas│             ┃
┃  │ ✓ Std. dangtelis│   laiptai       │ ✓ Masažiniai   │              ┃
┃  │                 │ ✓ Priežiūros    │   purkštukai   │              ┃
┃  │                 │   rinkinys      │                 │              ┃
┃  │                 │                 │                 │              ┃
┃  │ [ Į KREPŠELĮ ]  │ [ Į KREPŠELĮ ]  │ [ Į KREPŠELĮ ]  │              ┃
┃  └─────────────────┴─────────────────┴─────────────────┘              ┃
┃                                                                        ┃
┃  Norite kitaip? → Konfigūruoti detaliau                               ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Psychological triggers:**
- **SOCIAL PROOF:** "73% renkasi" (73% choose this)
- **DECOY EFFECT:** Premium makes Populiarus feel like great value
- **ANCHORING:** See Premium price first, Populiarus feels cheap
- **DEFAULT:** Populiarus visually highlighted
- **COGNITIVE EASE:** Decision already made for them
- **ESCAPE HATCH:** "Konfigūruoti detaliau" for control-seekers

#### Section 3: The Narrative (Emotional Connection)

```
┃                                                                        ┃
┃  *Kodėl Grande Round In?*                                              ┃
┃                                                                        ┃
┃  Šis modelis sukurtas šeimoms, kurios vertina bendrą laiką.           ┃
┃  Integruota krosnelė reiškia, kad net mažoje erdvėje turėsite         ┃
┃  pilnavertę SPA patirtį. Apvalus dizainas – tai amžinas               ┃
┃  klasikos pasirinkimas, kuris niekada nepasensta.                     ┃
┃                                                                        ┃
┃  Tinka jums, jei:                                                      ┃
┃  • Turite šeimą su vaikais ir norite bendro laiko                     ┃
┃  • Jūsų kiemas ar terasa nėra labai didelė                            ┃
┃  • Vertinate klasikinį, tradicinį dizainą                             ┃
┃  • Norite paprasto sprendimo be sudėtingos priežiūros                 ┃
┃                                                                        ┃
```

#### Section 4: FAQ (Objection Handling)

**Dan Kennedy:** "Every objection not handled is a sale lost."

```
┃                                                                        ┃
┃  DAŽNIAUSIAI KLAUSIAMA                                                ┃
┃                                                                        ┃
┃  ▸ Ar reikia leidimo statybai?                                        ┃
┃    Daugeliu atvejų – ne. Kubilas laikomas kilnojamuoju daiktu.        ┃
┃                                                                        ┃
┃  ▸ Kaip vyksta pristatymas?                                           ┃
┃    Pristatome ir sumontuojame per 2-4 savaites visoje Lietuvoje.      ┃
┃    Montavimas įskaičiuotas į kainą.                                   ┃
┃                                                                        ┃
┃  ▸ Kiek kainuoja eksploatacija per mėnesį?                            ┃
┃    ~35 €/mėn: malkos (~15€), elektra (~10€), vanduo/chemija (~10€).   ┃
┃                                                                        ┃
┃  ▸ O jei nepatiks?                                                    ┃
┃    14 dienų grąžinimo garantija – 100% sumos, be klausimų.            ┃
┃                                                                        ┃
┃  ▸ Ar galima išsimokėtinai?                                           ┃
┃    Taip! Išsimokėtinai nuo 81 €/mėn be pradinio įnašo.                     ┃
┃    Sprendimas per 15 min.                                              ┃
┃                                                                        ┃
```

**Psychological triggers:**
- **OBJECTION HANDLING:** Every major concern addressed
- **RISK REVERSAL:** "14 dienų grąžinimo garantija"
- **SPECIFICITY:** "~35 €/mėn" – concrete number builds trust

#### Section 5: Value Stacking (Price Justification)

**Ogilvy:** "Tell them what they get for the price."

```
┃                                                                        ┃
┃  Ką gausite už 2 890 €:                                               ┃
┃                                                                        ┃
┃  ✓ Kubilas (6-8 asm.)              1 850 € vertės                     ┃
┃  ✓ Integruota krosnelė              500 € vertės                      ┃
┃  ✓ Eglės medienos apdaila           340 € vertės                      ┃
┃  ✓ Standartinis dangtelis           180 € vertės                      ┃
┃  ✓ Pristatymas Lietuvoje            300 € vertės                      ┃
┃  ✓ Profesionalus montavimas         500 € vertės                      ┃
┃  ✓ 5 metų garantija                 priceless                         ┃
┃  ─────────────────────────────────────────────────────                ┃
┃  Viso vertė:                       3 670 €                            ┃
┃  Jūsų kaina:                       2 890 €                            ┃
┃  Sutaupote:                          780 € (21%)                      ┃
┃                                                                        ┃
```

#### Section 6: Sticky Mobile CTA

```
┌────────────────────────────────────────────────────────────────────────┐
│  81 €/mėn • 2 890 €                        [ UŽSAKYTI ]               │
└────────────────────────────────────────────────────────────────────────┘
```

---

### PHASE 5: CONFIGURATION (For Control-Seekers)

**Route:** `/produktas/grande-round-in/konfiguratorius`

**Key insight:** Only ~15% of users should reach this. Most buy packages.

**Design:** Step-by-step wizard (NOT all-at-once form)

#### Wizard Structure

```
STEP 1: Package Selection (Start here, not at zero)
        ●━━━━━━━○━━━━━━━○━━━━━━━○━━━━━━━○
        Paketas  Mediena  Spalva  Priedai  Peržiūra

STEP 2: Wood Type Selection
        ○━━━━━━━●━━━━━━━○━━━━━━━○━━━━━━━○
        Visual cards with wood samples
        Prices shown as "+€XX" from base

STEP 3: Shell Color Selection
        ○━━━━━━━○━━━━━━━●━━━━━━━○━━━━━━━○
        Color swatches, simple selection

STEP 4: Extras (Upsells)
        ○━━━━━━━○━━━━━━━○━━━━━━━●━━━━━━━○
        Checkbox list with "★ Dauguma renkasi" badges

STEP 5: Review & Confirm
        ○━━━━━━━○━━━━━━━○━━━━━━━○━━━━━━━●
        Summary, total, trust badges, CTA
```

#### Step 4 Example (Extras/Upsells)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  Grande Round In • Populiarus + Termo               3 670 €           ┃
┃                                                                        ┃
┃  ○━━━━━━━○━━━━━━━○━━━━━━━●━━━━━━━○                                    ┃
┃  Paketas  Mediena  Spalva  Priedai  Peržiūra                          ┃
┃                                                                        ┃
┃  ═══════════════════════════════════════════════════════════════════   ┃
┃                                                                        ┃
┃  PAPILDOMI PRIEDAI                                                     ┃
┃  Pasirinkite, ko dar norite (nebūtina)                                ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  ☑  LED apšvietimas                                    +290 €   │  ┃
┃  │      7-24 žvaigždutės + 1-2 lempos                              │  ┃
┃  │      ★ 67% renkasi                                              │  ┃
┃  ├─────────────────────────────────────────────────────────────────┤  ┃
┃  │  ☐  Masažiniai purkštukai                              +590 €   │  ┃
┃  │      6-24 vandens + 12-24 oro purkštukų                         │  ┃
┃  ├─────────────────────────────────────────────────────────────────┤  ┃
┃  │  ☐  Filtracijos sistema                                +390 €   │  ┃
┃  │      Smėlio filtras + UVC lempa                                 │  ┃
┃  │      Rekomenduojama jei naudosite dažnai                        │  ┃
┃  ├─────────────────────────────────────────────────────────────────┤  ┃
┃  │  ☐  Elektrinis šildytuvas                              +490 €   │  ┃
┃  │      Papildomas šildymas be malkų (3kW/6kW/9kW)                 │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  [ ← ATGAL ]                                      [ TOLIAU → ]        ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

### PHASE 6: CART & UPSELLS

**Route:** `/krepselis`

**Key insight:** This is NOT just a cart. It's the last chance for order bumps.

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  JŪSŲ UŽSAKYMAS                                                       ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │ [Image]  Grande Round In – Populiarus                           │  ┃
┃  │          Termo mediena • Pilkas akrilas • LED                   │  ┃
┃  │                                                        3 960 €  │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ═══════════════════════════════════════════════════════════════════   ┃
┃                                                                        ┃
┃  IŠBAIKITE PATIRTĮ                                                     ┃
┃                                                                        ┃
┃  ☐ Termo dangtelis (★ 73% renkasi)                           +290 €  ┃
┃    Išlaiko šilumą 2x ilgiau. Sutaupysite ~15 €/mėn malkų.             ┃
┃                                                                        ┃
┃  ☐ Priežiūros rinkinys                                       +120 €  ┃
┃    Viskas, ko reikia pirmiesiems 6 mėnesiams.                         ┃
┃                                                                        ┃
┃  ═══════════════════════════════════════════════════════════════════   ┃
┃                                                                        ┃
┃  Tarpinė suma:                                               3 960 €  ┃
┃  PVM (21%):                                     (jau įskaičiuotas)    ┃
┃  Pristatymas ir montavimas:                               NEMOKAMAI   ┃
┃  ────────────────────────────────────────────────────────────────     ┃
┃  VISO:                                                       3 960 €  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  💳 IŠSIMOKĖTINAI: nuo 110 €/mėn (36 mėn.)                           │  ┃
┃  │     Be pradinio įnašo • Sprendimas per 15 min.                  │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  [            PEREITI PRIE MOKĖJIMO            ]                      ┃
┃                                                                        ┃
┃  ✓ 5 metų garantija                                                   ┃
┃  ✓ 14 dienų grąžinimo garantija                                      ┃
┃  ✓ Saugus mokėjimas (SSL)                                             ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

### PHASE 7: CHECKOUT (Frictionless)

**Route:** `/atsiskaitymas`

**Key insight:** Lead with financing. It's the most important decision.

#### Step 1: Payment Method (THE KEY MOMENT)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  ●━━━━━━━○━━━━━━━○                                                    ┃
┃  Mokėjimas  Pristatymas  Patvirtinimas                                ┃
┃                                                                        ┃
┃  ═══════════════════════════════════════════════════════════════════   ┃
┃                                                                        ┃
┃  KAIP NORITE MOKĖTI?                                                  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  ★ IŠSIMOKĖTINAI – REKOMENDUOJAMA                                    │  ┃
┃  │                                                                 │  ┃
┃  │  nuo 110 €/mėn (36 mėn.) • Be pradinio įnašo                   │  ┃
┃  │  Sprendimas per 15 min. • Galite grąžinti anksčiau             │  ┃
┃  │                                                                 │  ┃
┃  │  Pasirinkite terminą:                                           │  ┃
┃  │  ○ 24 mėn. – 165 €/mėn                                         │  ┃
┃  │  ● 36 mėn. – 110 €/mėn  ★ Populiariausias                      │  ┃
┃  │  ○ 48 mėn. – 83 €/mėn                                          │  ┃
┃  │                                                                 │  ┃
┃  │  [✓ PASIRINKTI LIZINGĄ]                                        │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  VIENKARTINIS MOKĖJIMAS                                         │  ┃
┃  │                                                                 │  ┃
┃  │  3 960 € • Bankinis pavedimas arba kortele                     │  ┃
┃  │                                                                 │  ┃
┃  │  [  PASIRINKTI  ]                                              │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

#### Step 2: Contact & Delivery

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃  ○━━━━━━━●━━━━━━━○                                                    ┃
┃  Mokėjimas  Pristatymas  Patvirtinimas                                ┃
┃                                                                        ┃
┃  ═══════════════════════════════════════════════════════════════════   ┃
┃                                                                        ┃
┃  KUR PRISTATYTI?                                                      ┃
┃  Užsakymas be registracijos – užtruksite ~2 minutes                   ┃
┃                                                                        ┃
┃  Vardas Pavardė:  [_______________________________________]           ┃
┃                                                                        ┃
┃  El. paštas:      [_______________________________________]           ┃
┃                                                                        ┃
┃  Telefonas:       [_______________________________________]           ┃
┃                                                                        ┃
┃  Adresas:         [_______________________________________]           ┃
┃                                                                        ┃
┃  Miestas:         [_______________________________________]           ┃
┃                                                                        ┃
┃  ┌─────────────────────────────────────────────────────────────────┐  ┃
┃  │  📦 Pristatysime per 2-4 savaites.                              │  ┃
┃  │     Paskambinsime prieš 2 dienas suderinti tikslų laiką.        │  ┃
┃  └─────────────────────────────────────────────────────────────────┘  ┃
┃                                                                        ┃
┃  [            PATVIRTINTI UŽSAKYMĄ            ]                       ┃
┃                                                                        ┃
┃  Turite klausimų? +370 XXX XXXXX                                      ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

### PHASE 8: POST-PURCHASE

**Confirmation page elements:**
- Clear "what happens next" timeline
- Order number prominently displayed
- Download PDF preparation guide
- Support contact always visible

**Email sequence:**
| Day | Email | Purpose |
|-----|-------|---------|
| 0 | Order confirmation | Reassurance, receipt |
| 1 | "Paruoškite vietą" | Preparation checklist PDF |
| 3 | Montavimo datos patvirtinimas | Schedule confirmation |
| -1 | "Rytoj atvežame!" | Pre-delivery reminder |
| +1 | "Kaip sekasi?" | Early satisfaction check |
| +14 | Review request | Photo + review (€50 kuponas) |
| +30 | Referral program | "Rekomenduokite, gaukite €200" |

---

## Part 4: Exit Intent & Recovery

### Exit Intent Modal (Cart/Product Pages Only)

**Trigger:** Mouse leaves viewport toward close/back button

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                        ┃
┃                    [Product preview image]                             ┃
┃                                                                        ┃
┃           Išsaugokite savo konfigūraciją                               ┃
┃                                                                        ┃
┃           Atsiųsime nuorodą, kad galėtumėte                            ┃
┃           tęsti bet kada.                                              ┃
┃                                                                        ┃
┃           ┌────────────────────────────────────────┐                   ┃
┃           │  jusu@email.lt                         │                   ┃
┃           └────────────────────────────────────────┘                   ┃
┃                                                                        ┃
┃           [     IŠSAUGOTI KONFIGŪRACIJĄ     ]                         ┃
┃                                                                        ┃
┃                       Ne, ačiū                                         ┃
┃                                                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Rules:**
- Show only ONCE per session
- Only on product page or configurator (not homepage)
- Include product/config they were viewing
- Clean, minimal design
- Easy dismiss

### Abandoned Cart Email Sequence

| Time | Subject | Content |
|------|---------|---------|
| 1h | "Jūsų Monaco Horizon laukia" | Product image, price, CTA to continue |
| 24h | "Ar galime padėti?" | FAQ highlights, consultation CTA |
| 72h | "Jūsų konfigūracija vis dar išsaugota" | Config summary, urgency hint |
| 7d | "Paskutinis priminimas" | "Bus ištrinta po 7 dienų" |

---

## Part 5: Implementation Checklist

### Phase 1: Foundation (Week 1)

- [ ] Create `/raskite-savo-kubila` route (full-screen quiz)
- [ ] Create `/raskite-savo-kubila/rezultatai` route (personalized results)
- [ ] Add PackageSelector component to product pages
- [ ] Add monthly payment as PRIMARY price display everywhere
- [ ] Add "★ X% renkasi" badges to packages

### Phase 2: Configurator Wizard (Week 2)

- [ ] Convert configurator to step-by-step wizard
- [ ] Add progress indicator component
- [ ] Implement package-first flow
- [ ] Add "★ Dauguma renkasi" to extras

### Phase 3: Checkout Optimization (Week 2)

- [ ] Move išsimokėtinai to PRIMARY payment option
- [ ] Add payment term selector (24/36/48 mėn)
- [ ] Add "Užsakymas be registracijos" messaging
- [ ] Add phone support CTA

### Phase 4: Trust & Urgency (Week 3)

- [ ] Add FAQ accordion to product pages
- [ ] Add value stacking section
- [ ] Add delivery timeline messaging
- [ ] Add seasonal urgency banner (optional)

### Phase 5: Recovery (Week 3)

- [ ] Implement exit intent modal
- [ ] Create email capture API
- [ ] Set up abandoned cart email sequence

---

## Part 6: Success Metrics

### Primary KPIs

| Metric | Current (Est.) | Target | Measurement |
|--------|----------------|--------|-------------|
| Quiz completion rate | N/A | 70%+ | Start → Results |
| Results → Product page | N/A | 60%+ | Click-through |
| Product → Add to cart | Est. 5% | 15%+ | Package selection |
| Cart → Checkout | Est. 40% | 70%+ | Completion |
| Checkout completion | Est. 30% | 60%+ | Orders |
| **Overall conversion** | Est. 0.5% | 3%+ | Visitor → Order |

### Secondary KPIs

- Average order value (package upsells working?)
- Išsimokėtinai vs. one-time payment ratio (target: 60%+ išsimokėtinai)
- Quiz path distribution (understand customer segments)
- Exit intent email capture rate
- Abandoned cart recovery rate

---

## Appendix A: Product-to-Quiz Mapping

| Purpose | Capacity | Shape | Recommended Products |
|---------|----------|-------|---------------------|
| Hot | 2-4 | Round | Classic Round In, Out, Horizon |
| Hot | 2-4 | Square | Paris In, Andorra |
| Hot | 4-6 | Round | Grande Round In, Out, Horizon |
| Hot | 4-6 | Square | Paris In, Andorra, Monaco In |
| Hot | 6+ | Round | Grande Round series |
| Hot | 6+ | Square | Monaco series, Cuba, Macau |
| Cold | - | - | Arctic, Arctic Chiller |
| Ofuro | - | - | Ofuro (direct to product) |

---

## Appendix B: Package Definitions

### Standard Package Structure (All Products)

| Package | Contents | Price Modifier |
|---------|----------|----------------|
| **Bazinis** | Kubilas + Krosnelė + Eglės mediena + Std. dangtelis | Base price |
| **Populiarus** | Bazinis + Termo dangtelis + Laiptai + Priežiūros rinkinys | +€490 |
| **Premium** | Populiarus + Termo mediena + LED + Masažiniai purkštukai | +€1,090 |

### Psychological Pricing

- Always show monthly payment FIRST
- Always show "★ 73% renkasi" on Populiarus
- Premium creates anchoring effect
- Bazinis feels "incomplete" by comparison

---

*Document End*
