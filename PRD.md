# Product Requirements Document (PRD)
## MojoDas Spa - Next.js E-commerce Platform

**Version:** 1.1
**Date:** 2026-03-23
**Status:** In Progress (Phase 1 Complete)

---

## 1. Executive Summary

### 1.1 Project Overview
Recreate the MojoDas Spa luxury hot tub e-commerce website as a modern Next.js 14+ application with a headless architecture. The site targets premium customers in Lithuania seeking high-quality, custom-manufactured spa/hot tub solutions.

### 1.2 Business Context
- **Brand Position:** Premium Lithuanian spa manufacturer ("Engineering of Serenity")
- **Target Markets:** B2C (homeowners) and B2B (hospitality businesses, glamping operators)
- **Key Differentiators:** Made in Lithuania, AISI 316 medical-grade steel, 5-year warranty, custom configuration

### 1.3 Core Objectives
1. Pixel-perfect recreation of existing Stitch designs
2. Dynamic product data pulled from mojodasspa.com (or CMS)
3. Product configurator with real-time pricing
4. Calendly embed for consultation booking
5. World-class architecture enabling scalability and maintainability

---

## 2. Technical Architecture

### 2.1 Technology Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 14+ (App Router)                                       │
│  React 18+ with Server Components                               │
│  TypeScript (strict mode)                                       │
│  Tailwind CSS 3.4+ (design tokens from DESIGN.md)               │
│  Framer Motion (animations)                                     │
│  Zustand (cart/config state)                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      INTERNAL API LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│  Next.js Route Handlers (/app/api/*)                            │
│  - /api/products          (GET all products)                    │
│  - /api/products/[slug]   (GET single product)                  │
│  - /api/configurator      (POST calculate config price)         │
│  - /api/cart              (GET/POST/DELETE cart operations)     │
│  - /api/leads             (POST B2B lead form)                  │
│  - /api/checkout          (POST initiate checkout)              │
│  - /api/revalidate        (POST on-demand ISR trigger)          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA SOURCES                              │
├─────────────────────────────────────────────────────────────────┤
│  PRIMARY: Headless CMS (Sanity / Payload / Strapi)              │
│  - Products, configurations, pricing                            │
│  - Content blocks, SEO metadata                                 │
│  - Media assets (images, videos)                                │
│                                                                 │
│  FALLBACK: JSON data files (/data/*.json) for MVP               │
│  EXTERNAL: mojodasspa.com scraping (product sync job)           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     EXTERNAL SERVICES                           │
├─────────────────────────────────────────────────────────────────┤
│  Calendly     - Consultation booking embed                      │
│  ESTO/Montonio - Payment processing (leasing options)           │
│  SendGrid/Resend - Transactional emails                         │
│  Vercel Analytics - Performance monitoring                      │
│  Sentry       - Error tracking                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Project Structure

```
mojodas-spa/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    # Homepage
│   │   ├── verslui/
│   │   │   └── page.tsx                # B2B page
│   │   └── kontaktai/
│   │       └── page.tsx                # Contact page
│   ├── (shop)/
│   │   ├── katalogas/
│   │   │   ├── page.tsx                # Catalog listing
│   │   │   └── [category]/
│   │   │       └── page.tsx            # Category filter
│   │   └── produktas/
│   │       └── [slug]/
│   │           ├── page.tsx            # Product detail
│   │           └── konfiguratorius/
│   │               └── page.tsx        # Product configurator
│   ├── (checkout)/
│   │   ├── krepselis/
│   │   │   └── page.tsx                # Cart page
│   │   └── atsiskaitymas/
│   │       └── page.tsx                # Checkout page
│   ├── api/
│   │   ├── products/
│   │   │   ├── route.ts                # GET all products
│   │   │   └── [slug]/
│   │   │       └── route.ts            # GET single product
│   │   ├── configurator/
│   │   │   └── route.ts                # POST calculate price
│   │   ├── cart/
│   │   │   └── route.ts                # Cart operations
│   │   ├── leads/
│   │   │   └── route.ts                # B2B form submissions
│   │   └── checkout/
│   │       └── route.ts                # Checkout initiation
│   ├── layout.tsx                      # Root layout
│   └── globals.css                     # Global styles + Tailwind
├── components/
│   ├── layout/
│   │   ├── Header.tsx                  # Navigation (sticky, glassmorphic)
│   │   ├── Footer.tsx                  # Footer
│   │   └── MobileMenu.tsx              # Mobile navigation drawer
│   ├── marketing/
│   │   ├── Hero.tsx                    # Homepage hero
│   │   ├── TrustStrip.tsx              # Trust indicators
│   │   ├── ProcessSteps.tsx            # 3-step process
│   │   ├── CategoryGrid.tsx            # Category showcase
│   │   ├── Bestsellers.tsx             # Product highlights
│   │   ├── EngineeringFacts.tsx        # Features section
│   │   └── ConsultationBooking.tsx     # Calendly embed section
│   ├── catalog/
│   │   ├── FilterBar.tsx               # Sticky filter bar
│   │   ├── ProductGrid.tsx             # Product listing grid
│   │   └── ProductCard.tsx             # Individual product card
│   ├── product/
│   │   ├── ProductGallery.tsx          # Image gallery with thumbnails
│   │   ├── TechSpecs.tsx               # Technical specifications
│   │   ├── ConfiguratorForm.tsx        # Full configurator
│   │   ├── ConfigOption.tsx            # Single config option
│   │   └── StickyPriceBar.tsx          # Sticky bottom price/CTA
│   ├── cart/
│   │   ├── CartDrawer.tsx              # Slide-out cart
│   │   ├── CartItem.tsx                # Cart line item
│   │   └── UpsellEngine.tsx            # Upsell recommendations
│   ├── checkout/
│   │   ├── DeliveryForm.tsx            # Delivery information
│   │   ├── PaymentMethods.tsx          # Payment selection
│   │   └── OrderSummary.tsx            # Order summary sidebar
│   ├── b2b/
│   │   ├── B2BHero.tsx                 # B2B hero section
│   │   ├── ROICalculator.tsx           # Business value props
│   │   ├── B2BModels.tsx               # Recommended products
│   │   └── LeadForm.tsx                # B2B contact form
│   └── ui/
│       ├── Button.tsx                  # Button variants
│       ├── Input.tsx                   # Form inputs (underline style)
│       ├── Select.tsx                  # Dropdown selects
│       ├── Checkbox.tsx                # Custom checkboxes
│       ├── RadioGroup.tsx              # Radio button groups
│       ├── Card.tsx                    # Editorial card component
│       ├── Badge.tsx                   # Product badges
│       └── CalendlyEmbed.tsx           # Calendly widget wrapper
├── lib/
│   ├── api/
│   │   ├── products.ts                 # Product API client
│   │   ├── configurator.ts             # Configurator logic
│   │   └── checkout.ts                 # Checkout API client
│   ├── utils/
│   │   ├── formatPrice.ts              # Price formatting (EUR)
│   │   ├── calculateConfig.ts          # Configuration pricing
│   │   └── cn.ts                       # Tailwind class merge
│   └── constants/
│       ├── products.ts                 # Product type definitions
│       ├── config-options.ts           # Configuration options
│       └── routes.ts                   # Route constants
├── stores/
│   ├── cart.ts                         # Cart state (Zustand)
│   └── configurator.ts                 # Configurator state
├── data/
│   ├── products.json                   # Product catalog data
│   ├── config-options.json             # Configuration options
│   └── content.json                    # Static content blocks
├── types/
│   ├── product.ts                      # Product types
│   ├── config.ts                       # Configuration types
│   ├── cart.ts                         # Cart types
│   └── api.ts                          # API response types
├── styles/
│   └── design-tokens.ts                # Design system tokens
├── public/
│   ├── images/
│   │   ├── products/                   # Product images
│   │   ├── icons/                      # Custom icons
│   │   └── hero/                       # Hero backgrounds
│   └── fonts/                          # Self-hosted fonts
├── tailwind.config.ts                  # Tailwind configuration
├── next.config.ts                      # Next.js configuration
└── package.json
```

---

## 3. Data Models

### 3.1 Product Schema

```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  collection: 'monaco' | 'classic-round' | 'grande-round' | 'paris' | 'andorra' | 'cuba' | 'macau' | 'arctic' | 'ofuro';
  variant: 'horizon' | 'in' | 'out' | 'chiller' | 'standard';

  // Display
  tagline: string;
  description: string;
  badges: ProductBadge[];

  // Categorization
  shape: 'round' | 'square' | 'therapeutic';
  capacity: {
    min: number;
    max: number;
  };
  heaterType: 'internal' | 'external' | 'electric' | 'none';

  // Pricing
  basePrice: number;
  monthlyPayment: number;
  currency: 'EUR';

  // Technical
  specs: {
    externalDiameter?: number;
    internalDiameter?: number;
    height: number;
    weight: number;
    waterVolume: number;
  };

  // Media
  images: ProductImage[];
  gallery: ProductImage[];

  // Configuration
  configurableOptions: ConfigOptionGroup[];

  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  // Status
  isActive: boolean;
  isFeatured: boolean;
  stockStatus: 'in_stock' | 'made_to_order' | 'out_of_stock';

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

interface ProductBadge {
  text: string;
  variant: 'primary' | 'secondary' | 'accent';
}

interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface ConfigOptionGroup {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  required: boolean;
  options: ConfigOption[];
}

interface ConfigOption {
  id: string;
  name: string;
  description?: string;
  priceModifier: number;
  isDefault: boolean;
  badge?: string;
  colorSwatch?: string;
  image?: string;
}
```

### 3.2 Cart Schema

```typescript
interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  configuration: SelectedConfiguration;
  subtotal: number;
}

interface SelectedConfiguration {
  [optionGroupId: string]: string | string[]; // option IDs
}

interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}
```

### 3.3 Checkout Schema

```typescript
interface CheckoutData {
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
    method: 'banklink' | 'card' | 'leasing';
    leasingTerm?: 12 | 24 | 36 | 48;
  };
  cart: Cart;
}
```

---

## 4. Product Catalog

### 4.1 Products to Implement (16 products)

| Name | Collection | Variant | Base Price | Capacity | Shape |
|------|------------|---------|------------|----------|-------|
| Monaco Horizon | Monaco | Horizon | 4,890€ | 8-10 | Square |
| Monaco In | Monaco | In | 3,290€ | 6-8 | Square |
| Monaco Out | Monaco | Out | 3,890€ | 6-8 | Square |
| Classic Round Horizon | Classic Round | Horizon | 3,490€ | 4-6 | Round |
| Classic Round In | Classic Round | In | 1,990€ | 4-6 | Round |
| Classic Round Out | Classic Round | Out | 2,490€ | 4-6 | Round |
| Grande Round Horizon | Grande Round | Horizon | 4,290€ | 6-8 | Round |
| Grande Round In | Grande Round | In | 2,890€ | 6-8 | Round |
| Grande Round Out | Grande Round | Out | 3,190€ | 6-8 | Round |
| Paris In | Paris | In | 2,690€ | 4-6 | Square |
| Andorra In | Andorra | In | 2,890€ | 4-6 | Square |
| Cuba Out | Cuba | Out | 3,590€ | 6-8 | Square |
| Macau In | Macau | In | 3,190€ | 6-8 | Square |
| Arctic | Arctic | Standard | 1,490€ | 1-2 | Therapeutic |
| Arctic Chiller | Arctic | Chiller | 5,990€ | 1-2 | Therapeutic |
| Ofuro | Ofuro | Standard | 1,890€ | 1-2 | Therapeutic |

### 4.2 Configuration Options

```typescript
const configurationOptions = {
  acrylicColor: {
    name: "Akrilo Spalva",
    options: [
      { id: "solid", name: "Vientisa spalva", price: 0 },
      { id: "marble", name: "Marmuro raštas", price: 0 }
    ]
  },
  woodFinish: {
    name: "Kubilo Apdaila",
    options: [
      { id: "spruce", name: "Eglė", price: 0, badge: "Standartas" },
      { id: "burnt-spruce", name: "Deginta Eglė", price: 240 },
      { id: "thermo", name: "Termo Mediena", price: 480 },
      { id: "wpc", name: "WPC Lentos", price: 550, badge: "Nereikalauja priežiūros" }
    ]
  },
  heatingSystem: {
    name: "Šildymo Sistema",
    options: [
      { id: "external-304", name: "Išorinė malkinė krosnelė (AISI 304)", price: 0 },
      { id: "external-316", name: "Išorinė malkinė krosnelė (AISI 316)", price: 320, badge: "Atspariausia chlorui" },
      { id: "electric-3kw", name: "Elektrinis šildytuvas (3kW)", price: 650 }
    ]
  },
  massage: {
    name: "Masažas ir Apšvietimas",
    type: "multiple",
    options: [
      { id: "water-jets-8", name: "Vandens purkštukai (8 vnt.)", price: 450 },
      { id: "air-jets-12", name: "Oro purkštukai (12 vnt.)", price: 390 },
      { id: "led-stars-6", name: "LED Žvaigždės (6 vnt.)", price: 180 },
      { id: "multi-led", name: "Multi LED Lempų sistema", price: 250 }
    ]
  },
  accessories: {
    name: "Technologijos ir Priedai",
    type: "multiple",
    options: [
      { id: "touch-control", name: "Jutiminė Kontrolė '4 IN 1'", price: 580 },
      { id: "bluetooth-audio", name: "Audio (Bluetooth) sistema", price: 420 },
      { id: "premium-cover", name: "Premium Termo Dangtis", price: 350 },
      { id: "hidden-filter", name: "Filtravimo Dėžė (Paslėpta)", price: 190 }
    ]
  }
};
```

---

## 5. Pages & Routes

### 5.1 Route Map

| Route | Component | Data Requirements |
|-------|-----------|-------------------|
| `/` | Homepage | Featured products, content blocks |
| `/katalogas` | Catalog | All products with filters |
| `/katalogas/[category]` | Category | Filtered products |
| `/produktas/[slug]` | Product Detail | Single product, config options |
| `/produktas/[slug]/konfiguratorius` | Configurator | Product with full config |
| `/verslui` | B2B Page | B2B content, recommended products |
| `/kontaktai` | Contact | Contact info, Calendly embed |
| `/krepselis` | Cart | Cart state (client) |
| `/atsiskaitymas` | Checkout | Cart state, payment integration |

### 5.2 Page Requirements

#### Homepage (`/`)
- Hero section with video/image background
- Animated CTAs ("RINKTIS MODELĮ", "15 MIN. KONSULTACIJA")
- Trust strip (Made in Lithuania, AISI 316, 5yr warranty, smart payments)
- 3-step process animation (Gamyba → Pristatymas → Paleidimas)
- Category grid (asymmetric layout)
- Bestsellers carousel (Monaco Horizon featured)
- Engineering facts (water clarity, steel grade, winter-ready)
- Calendly booking section

#### Catalog (`/katalogas`)
- Sticky filter bar with capacity/shape filters
- 3-column product grid
- Editorial product cards (4:5 aspect ratio)
- Hover animations (scale + lift)
- Quick "KONFIGŪRUOTI" button on each card

#### Product Detail/Configurator
- Sticky left image gallery
- Breadcrumb navigation
- Step-by-step configurator:
  1. Acrylic color
  2. Wood finish
  3. Heating system
  4. Massage & lighting (multi-select)
  5. Accessories (multi-select)
- Real-time price calculation
- Sticky bottom price bar
- "Add to cart" CTA

#### B2B Page (`/verslui`)
- Business-focused hero
- ROI value propositions
- Engineering durability features
- Recommended models grid
- Partnership benefits
- Dual-path CTA (lead form + Calendly)

#### Checkout (`/atsiskaitymas`)
- Step indicator (1. Pristatymas, 2. Apmokėjimas)
- Floating label form inputs
- Payment method selection (Banklink, Card, Leasing)
- Order summary sidebar
- Trust badges

---

## 6. Design System Implementation

### 6.1 Tailwind Theme Extension

```typescript
// tailwind.config.ts
const config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Surface Hierarchy
        surface: "#fbf9f4",
        "surface-dim": "#dbdad5",
        "surface-bright": "#fbf9f4",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3ee",
        "surface-container": "#f0eee9",
        "surface-container-high": "#eae8e3",
        "surface-container-highest": "#e4e2dd",
        "surface-variant": "#e4e2dd",

        // Primary (Gold/Bronze)
        primary: "#755a26",
        "primary-container": "#af8f55",
        "primary-fixed": "#ffdea7",
        "primary-fixed-dim": "#e5c183",

        // On Colors
        "on-surface": "#1b1c19",
        "on-surface-variant": "#4d463a",
        "on-primary": "#ffffff",
        "on-primary-container": "#3c2900",

        // Outline
        outline: "#7f7668",
        "outline-variant": "#d1c5b5",

        // Secondary
        secondary: "#5f5e5e",
        "secondary-container": "#e2dfde",

        // Error
        error: "#ba1a1a",
        "error-container": "#ffdad6",

        // Dark Mode Overrides
        dark: {
          surface: "#0D0D0D",
          "on-surface": "#f2f1ec"
        }
      },
      fontFamily: {
        headline: ["Noto Serif", "serif"],
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem"
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
        "fade-up": "fadeUp 0.5s ease-out"
      }
    }
  }
};
```

### 6.2 Component Design Principles

1. **No-Line Rule:** No 1px borders. Use background color shifts between sections.
2. **Glassmorphism:** Navigation uses `backdrop-blur-xl` with semi-transparent backgrounds.
3. **Sharp Edges:** Maximum `border-radius: 0.5rem`. Brand is "engineering-focused."
4. **Tonal Layering:** Cards on `surface-container-low` over `surface` create natural lift.
5. **Ambient Shadows:** If needed, 40px blur at 6% opacity, tinted with `on-surface`.

---

## 7. External Integrations

### 7.1 Calendly Integration

```typescript
// components/ui/CalendlyEmbed.tsx
interface CalendlyEmbedProps {
  url: string;
  style?: 'inline' | 'popup';
  height?: number;
}

// Implementation uses @calendly/react-embed
// Configuration:
const CALENDLY_URL = "https://calendly.com/mojodasspa/15min-konsultacija";
```

### 7.2 Payment Integration

**Primary: ESTO/Montonio for Leasing**
- Installment calculator widget
- Redirect flow for leasing applications
- Terms: 12/24/36/48 months

**Secondary: Banklink + Card**
- Lithuanian banks integration (SEB, Swedbank, Luminor)
- Standard card processing

### 7.3 Product Data Sync

```typescript
// lib/sync/productSync.ts
// Scheduled job to fetch product data from mojodasspa.com
// Extracts: prices, images, availability
// Updates: local JSON or CMS
```

---

## 8. SEO & Performance

### 8.1 SEO Requirements

- Lithuanian locale (`lt-LT`)
- Proper quotation marks (`„ "`)
- Meta tags for all pages
- Open Graph images
- Structured data (Product, Organization)
- Sitemap generation
- robots.txt

### 8.2 Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Lighthouse | > 90 |

### 8.3 Implementation

- Next.js Image optimization
- ISR for product pages (1hr revalidation)
- Edge caching on Vercel
- Font optimization (self-hosted)
- Critical CSS extraction

---

## 9. MVP Scope

### Phase 1: Core Experience (2-3 weeks)
- [x] Project setup (Next.js 14, Tailwind, TypeScript)
- [x] Design system implementation
- [x] Layout components (Header, Footer, Mobile Menu)
- [x] Homepage with all sections
- [x] Catalog page with filters
- [x] Product detail page
- [x] Static product data (JSON)

### Phase 2: Interactivity (1-2 weeks)
- [x] Product configurator
- [x] Cart functionality (Zustand)
- [x] Cart drawer
- [x] Price calculator

### Phase 3: Checkout & Integrations (1-2 weeks)
- [x] Checkout flow
- [x] Calendly embed (CalendlyEmbed.tsx component)
- [x] B2B page
- [x] Contact form (/kontaktai page with form)
- [ ] Email notifications (integration pending)

### Phase 4: Polish & Launch (1 week)
- [ ] Animation refinements
- [ ] SEO optimization
- [ ] Performance audit
- [ ] Testing
- [ ] Deployment

---

## 10. Implementation Progress

### Phase 0: Project Initialization ✅ COMPLETED
- [x] Next.js 14+ with App Router initialized
- [x] TypeScript strict mode configured
- [x] Tailwind CSS v4 with `@theme inline` setup
- [x] Project structure created
- [x] `next.config.ts` with image remotePatterns (lh3.googleusercontent.com, mojodasspa.com, images.unsplash.com)

### Phase 1: Design System & Layout ✅ COMPLETED
- [x] `globals.css` with full design tokens (surface hierarchy, primary colors, Material Design 3 inspired)
- [x] Google Fonts loaded (Noto Serif, Playfair Display, Inter, Material Symbols)
- [x] Dark mode CSS variables
- [x] Tailwind theme extension via `@theme inline`
- [x] Animation keyframes (slide-in, slide-out, fade-up, fade-in)
- [x] Base styles (scrollbar, glass, editorial-shadow)
- [x] `lib/utils/cn.ts` - class name merge utility
- [x] `lib/utils/format.ts` - price formatting (EUR, Lithuanian locale)
- [x] `lib/constants/routes.ts` - route constants
- [x] UI Components: Button (7 variants), Badge, Input, Card
- [x] Layout Components: Header (glassmorphic, transparent variant), Footer, MobileMenu
- [x] Marketing Components: Hero, ProcessSteps, CategoryGrid, Bestsellers, EngineeringFacts, ConsultationBooking
- [x] Cart Store (Zustand with persistence)
- [x] Homepage (`app/page.tsx`) rendering all sections
- [x] Build passes with static page generation

### Phase 0.5: Antigravity Scraping ✅ COMPLETED
- [x] Scraped 16 products from mojodasspa.com
- [x] Output: `data/scraped/products.json`, `data/scraped/config-options.json`
- [x] Scraping task documented in `SCRAPING_TASK.md`

### Phase 2: Static Data Layer ✅ COMPLETED
- [x] Create `data/products.json` from scraped data
- [x] Create `data/config-options.json` from scraped data
- [x] Type definitions in `types/` (product.ts, config.ts, cart.ts, api.ts)
- [x] API route handlers (`/api/products`, `/api/products/[slug]`, `/api/configurator`, `/api/cart`, `/api/leads`)

### Phase 3: Catalog ✅ COMPLETED
- [x] `/katalogas` page with product grid
- [x] FilterBar.tsx with capacity/shape filters
- [x] ProductCard.tsx with editorial styling
- [x] ProductGrid.tsx with responsive layout
- [x] CatalogHeader.tsx and CatalogContent.tsx

### Phase 4: Product Detail & Configurator ✅ COMPLETED
- [x] `/produktas/[slug]` product detail page
- [x] ProductGallery.tsx with image display
- [x] TechSpecs.tsx for specifications
- [x] ProductInfo.tsx for product details
- [x] `/produktas/[slug]/konfiguratorius` configurator page
- [x] ConfiguratorForm.tsx with step-by-step config
- [x] ConfigOption.tsx for individual options
- [x] StickyPriceBar.tsx with real-time pricing
- [x] ConfigStep.tsx and ConfigSummary.tsx

### Phase 5: Cart ✅ COMPLETED
- [x] Cart store with Zustand persistence
- [x] CartDrawer.tsx slide-out drawer
- [x] CartItem.tsx line items
- [x] CartHeader.tsx, CartSummary.tsx, CartFooter.tsx
- [x] EmptyCart.tsx empty state
- [x] UpsellEngine.tsx recommendations
- [x] `/krepselis` dedicated cart page

### Phase 6: Checkout ✅ COMPLETED
- [x] `/atsiskaitymas` checkout page
- [x] DeliveryForm.tsx with validation
- [x] PaymentMethods.tsx selection
- [x] OrderSummary.tsx sidebar
- [x] CheckoutLayout.tsx and StepIndicator.tsx
- [x] CheckoutActions.tsx
- [x] Checkout store (Zustand)
- [x] `/api/checkout` route handler
- [x] `/api/revalidate` ISR trigger

### Phase 7: B2B ✅ COMPLETED
- [x] `/verslui` B2B page
- [x] B2BHero.tsx
- [x] ValuePropositions.tsx (ROI focus)
- [x] EngineeringDurability.tsx
- [x] B2BModels.tsx recommended products
- [x] PartnershipBenefits.tsx
- [x] LeadForm.tsx with `/api/leads`
- [x] B2BCalendly.tsx consultation booking

### Phase 8: Contact & Remaining ✅ COMPLETED
- [x] `/kontaktai` contact page
- [x] `/katalogas/[category]` category routes (apvalus, kvadratinis, terapinis)
- [x] TrustStrip.tsx marketing component
- [x] CalendlyEmbed.tsx reusable widget
- [x] UI primitives: Select.tsx, Checkbox.tsx, RadioGroup.tsx

### Phase 9: API Completion ✅ COMPLETED
- [x] `/api/checkout` route handler with validation
- [x] `/api/revalidate` ISR trigger with secret auth

---

## 11. Success Metrics

| Metric | Target |
|--------|--------|
| Page Load Time | < 3s |
| Conversion Rate | > 2% |
| Bounce Rate | < 40% |
| Consultation Bookings | +50% vs current |
| B2B Lead Quality | High intent submissions |

---

## 12. Appendix

### 11.1 Lithuanian Content Samples

**Hero Headline:** "Jūsų poilsio zona kieme."
**CTA Primary:** "RINKTIS MODELĮ"
**CTA Secondary:** "15 MIN. KONSULTACIJA"
**Trust Badges:**
- PAGAMINTA LIETUVOJE
- AISI 316 PLIENAS
- 5 METŲ GARANTIJA
- IŠMANUS MOKĖJIMAS DALIMIS

### 11.2 Reference Files

- Design System: `aura_matter/DESIGN.md`
- Homepage: `mojodas_spa_luxury_flagship_v9/code.html`
- Catalog: `katalogas_pilna_kolekcija_sulygiuota/code.html`
- Configurator: `classic_round_out_konfiguratorius/code.html`
- B2B: `b2b_sprendimai_mojodas_spa/code.html`
- Checkout: `atsiskaitymas_mojodas_spa/code.html`
- Cart Drawer: `slide_out_cart_drawer_mojodas_spa/code.html`

---

**Document Owner:** Engineering Team
**Last Updated:** 2026-03-23
