# Lux Spa Nature - Implementation Plan

## Phase 0: Project Initialization (Day 1)

### 0.1 Create Next.js Project
```bash
npx create-next-app@latest mojodas-spa --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd mojodas-spa
```

### 0.2 Install Core Dependencies
```bash
# UI & Styling
pnpm add framer-motion clsx tailwind-merge class-variance-authority

# State Management
pnpm add zustand

# Forms & Validation
pnpm add react-hook-form zod @hookform/resolvers

# Icons
pnpm add lucide-react

# Calendly
pnpm add react-calendly

# Dev Dependencies
pnpm add -D @types/node prettier prettier-plugin-tailwindcss
```

### 0.3 Configure Tailwind with Design Tokens
- [ ] Update `tailwind.config.ts` with Lux Spa Nature color palette
- [ ] Add custom fonts (Noto Serif, Playfair Display, Inter)
- [ ] Configure border-radius, spacing, animations
- [ ] Set up dark mode support

### 0.4 Project Structure Setup
```bash
mkdir -p app/{(marketing),(shop),(checkout)}/
mkdir -p app/api/{products,configurator,cart,leads,checkout}
mkdir -p components/{layout,marketing,catalog,product,cart,checkout,b2b,ui}
mkdir -p lib/{api,utils,constants}
mkdir -p stores
mkdir -p data
mkdir -p types
mkdir -p public/{images/{products,icons,hero},fonts}
```

### 0.5 Base Configuration Files
- [ ] Create `lib/utils/cn.ts` (className merger)
- [ ] Create `types/product.ts` (Product interfaces)
- [ ] Create `types/cart.ts` (Cart interfaces)
- [ ] Create `types/config.ts` (Configuration interfaces)
- [ ] Create `lib/constants/routes.ts` (Route constants)

---

## Phase 0.5: Data Scraping (Day 1-2) ⚡ ANTIGRAVITY TASK

> **INVOKE:** Call Antigravity agent with `SCRAPING_TASK.md` to execute this phase.

### 0.5.1 Objective
Scrape the entire mojodasspa.com website to extract:
- All 16 product pages with complete details
- All product images (hero, gallery, thumbnails)
- All configuration options (acrylic, wood, cover, accessories)
- All specification data
- All text content in Lithuanian

### 0.5.2 Target URLs
```
https://mojodasspa.com/katalogas/grande-round-in/
https://mojodasspa.com/katalogas/grande-round-out/
https://mojodasspa.com/katalogas/grande-round-horizon/
https://mojodasspa.com/katalogas/classic-round-in/
https://mojodasspa.com/katalogas/classic-round-out/
https://mojodasspa.com/katalogas/classic-round-horizon/
https://mojodasspa.com/katalogas/monaco-in/
https://mojodasspa.com/katalogas/monaco-out/
https://mojodasspa.com/katalogas/monaco-horizon/
https://mojodasspa.com/katalogas/paris-in/
https://mojodasspa.com/katalogas/andorra-in/
https://mojodasspa.com/katalogas/cuba-out/
https://mojodasspa.com/katalogas/macau-in/
https://mojodasspa.com/katalogas/arctic/
https://mojodasspa.com/katalogas/arctic-chiller/
https://mojodasspa.com/katalogas/ofuro/
```

### 0.5.3 Data to Extract Per Product
- [ ] Product name, tagline, descriptions
- [ ] All specifications (capacity, weight, dimensions, heater, jets, LEDs, etc.)
- [ ] Hero images (3-4 per product, including rotating gallery)
- [ ] Acrylic color options with swatches
- [ ] Wood finish options with images
- [ ] Thermal cover options
- [ ] All accessories with images (jets, speakers, controls, LED, filters)
- [ ] Related products list

### 0.5.4 Output Structure
```
data/
├── scraped/
│   ├── products.json           # Complete product catalog
│   ├── config-options.json     # All configuration options
│   ├── content.json            # Static content
│   └── metadata.json           # Scrape stats
└── images/
    ├── products/               # Product images by slug
    ├── config/                 # Config option images
    ├── icons/                  # Spec icons
    └── misc/                   # Logo, backgrounds
```

### 0.5.5 Success Criteria
- [ ] All 16 products extracted
- [ ] 50-100+ images downloaded
- [ ] Valid JSON files generated
- [ ] Lithuanian characters preserved (ą, č, ę, ė, į, š, ų, ū, ž)

### 0.5.6 Execution
```bash
# Invoke Antigravity with the scraping task
antigravity run SCRAPING_TASK.md
```

**Full task specification:** See `SCRAPING_TASK.md`

---

## Phase 1: Design System & Layout (Days 3-4)

### 1.1 Global Styles
- [ ] `app/globals.css` - Base styles, font imports, CSS variables
- [ ] Material Symbols font integration
- [ ] Custom scrollbar styles
- [ ] Selection color styles

### 1.2 UI Primitives (components/ui/)

#### 1.2.1 Button Component
- [ ] `Button.tsx` - Variants: primary (gradient), secondary (underline), tertiary
- [ ] Sharp corners, uppercase tracking
- [ ] Hover/active states

#### 1.2.2 Form Components
- [ ] `Input.tsx` - Floating label, underline style
- [ ] `Select.tsx` - Custom dropdown
- [ ] `Checkbox.tsx` - Sharp corners, custom check
- [ ] `RadioGroup.tsx` - Radio button group

#### 1.2.3 Display Components
- [ ] `Card.tsx` - Editorial card with tonal layering
- [ ] `Badge.tsx` - Product badges (POPULIARIAUSIAS, etc.)
- [ ] `Skeleton.tsx` - Loading states

### 1.3 Layout Components (components/layout/)

#### 1.3.1 Header
- [ ] `Header.tsx` - Sticky glassmorphic navigation
- [ ] Logo (Lux Spa Nature text)
- [ ] Navigation links (Katalogas, Verslui, Kontaktai)
- [ ] Cart icon with badge
- [ ] Language switcher (LT/EN)
- [ ] Mobile hamburger menu

#### 1.3.2 Mobile Menu
- [ ] `MobileMenu.tsx` - Full-screen overlay drawer
- [ ] Animated slide-in
- [ ] Navigation links

#### 1.3.3 Footer
- [ ] `Footer.tsx` - 4-column grid
- [ ] Company info, links, legal, contact
- [ ] Social icons
- [ ] Copyright

### 1.4 Root Layout
- [ ] `app/layout.tsx` - HTML structure, fonts, metadata
- [ ] Header/Footer integration
- [ ] Cart drawer provider

---

## Phase 2: Static Data Layer (Day 4)

### 2.1 Product Data
- [ ] `data/products.json` - All 16 products with full details
```json
{
  "products": [
    {
      "id": "monaco-horizon",
      "slug": "monaco-horizon",
      "name": "Monaco Horizon",
      "collection": "monaco",
      "variant": "horizon",
      "basePrice": 4890,
      "capacity": { "min": 8, "max": 10 },
      "shape": "square",
      "heaterType": "internal",
      "images": [...],
      "specs": {...},
      "badges": [...]
    }
    // ... 15 more products
  ]
}
```

### 2.2 Configuration Options Data
- [ ] `data/config-options.json` - All configuration options with pricing
```json
{
  "acrylicColor": {...},
  "woodFinish": {...},
  "heatingSystem": {...},
  "massage": {...},
  "accessories": {...}
}
```

### 2.3 Content Data
- [ ] `data/content.json` - Static text content, trust badges, process steps

### 2.4 API Client Functions
- [ ] `lib/api/products.ts`
  - `getAllProducts()`
  - `getProductBySlug(slug)`
  - `getProductsByCategory(category)`
  - `getFeaturedProducts()`

- [ ] `lib/api/config.ts`
  - `getConfigOptions(productId)`
  - `calculatePrice(basePrice, selectedOptions)`

### 2.5 Type Definitions
- [ ] Complete `types/product.ts` with all interfaces
- [ ] Complete `types/config.ts` with configuration types

---

## Phase 3: Homepage (Days 5-7)

### 3.1 Marketing Components (components/marketing/)

#### 3.1.1 Hero Section
- [ ] `Hero.tsx`
- [ ] Full-screen background image
- [ ] Gradient overlay
- [ ] Headline: "Jūsų poilsio zona kieme."
- [ ] Two CTA buttons
- [ ] Scroll indicator

#### 3.1.2 Trust Strip
- [ ] `TrustStrip.tsx`
- [ ] 4 trust badges in horizontal bar
- [ ] Icons + text
- [ ] Responsive layout

#### 3.1.3 Process Steps
- [ ] `ProcessSteps.tsx`
- [ ] 3-column layout
- [ ] Large numbers (01, 02, 03)
- [ ] Headline + description

#### 3.1.4 Category Grid
- [ ] `CategoryGrid.tsx`
- [ ] Asymmetric 8:4 column layout
- [ ] Image cards with overlays
- [ ] Hover zoom effect
- [ ] Category links

#### 3.1.5 Bestsellers Section
- [ ] `Bestsellers.tsx`
- [ ] Featured product card (Monaco Horizon - large)
- [ ] 2 smaller product cards
- [ ] Color swatches
- [ ] Price display
- [ ] "KONFIGŪRUOTI" buttons

#### 3.1.6 Engineering Facts
- [ ] `EngineeringFacts.tsx`
- [ ] 3-column icon grid
- [ ] Icon + headline + description
- [ ] Water clarity, AISI 316, winter-ready

#### 3.1.7 Consultation Booking
- [ ] `ConsultationBooking.tsx`
- [ ] Split layout (text + calendar)
- [ ] Benefit checklist
- [ ] Calendly embed placeholder

### 3.2 Homepage Route
- [ ] `app/(marketing)/page.tsx`
- [ ] Compose all marketing sections
- [ ] Metadata for SEO

---

## Phase 4: Catalog Page (Days 8-9)

### 4.1 Catalog Components (components/catalog/)

#### 4.1.1 Filter Bar
- [ ] `FilterBar.tsx`
- [ ] Sticky positioning below header
- [ ] Filter pills: Visi, 2-4 Asmenims, 6-8 Asmenims, Apvalūs, Kvadratiniai, Šalčio terapija
- [ ] Active state styling
- [ ] Horizontal scroll on mobile

#### 4.1.2 Product Card
- [ ] `ProductCard.tsx`
- [ ] 4:5 aspect ratio image
- [ ] Gradient overlay
- [ ] Collection badge (top-left)
- [ ] Shape badge (top-right)
- [ ] Product name
- [ ] Price with glassmorphic container
- [ ] "KONFIGŪRUOTI" button
- [ ] Hover effects (scale, lift)

#### 4.1.3 Product Grid
- [ ] `ProductGrid.tsx`
- [ ] 3-column responsive grid
- [ ] Gap spacing
- [ ] Empty state

### 4.2 Catalog Route
- [ ] `app/(shop)/katalogas/page.tsx`
- [ ] Header section with title + description
- [ ] FilterBar (sticky)
- [ ] ProductGrid
- [ ] Client-side filtering logic

### 4.3 Category Routes
- [ ] `app/(shop)/katalogas/[category]/page.tsx`
- [ ] Dynamic category pages
- [ ] Pre-filtered product list

---

## Phase 5: Product Detail Page (Days 10-12)

### 5.1 Product Components (components/product/)

#### 5.1.1 Product Gallery
- [ ] `ProductGallery.tsx`
- [ ] Main image (large)
- [ ] Thumbnail grid (4 images)
- [ ] Click to change main image
- [ ] Hover zoom effect
- [ ] Badge overlay

#### 5.1.2 Technical Specs
- [ ] `TechSpecs.tsx`
- [ ] 6-item grid
- [ ] Capacity, weight, dimensions, water volume
- [ ] Clean label + value layout

#### 5.1.3 Breadcrumbs
- [ ] `Breadcrumbs.tsx`
- [ ] Kolekcijos > Product Name
- [ ] Chevron separators

### 5.2 Product Detail Route
- [ ] `app/(shop)/produktas/[slug]/page.tsx`
- [ ] Two-column layout (gallery left, info right)
- [ ] Sticky gallery on desktop
- [ ] Product name, description
- [ ] Price display
- [ ] "KONFIGŪRUOTI" CTA button
- [ ] Tech specs section
- [ ] generateStaticParams for SSG
- [ ] generateMetadata for SEO

---

## Phase 6: Product Configurator (Days 13-16)

### 6.1 Configurator State
- [ ] `stores/configurator.ts` (Zustand store)
```typescript
interface ConfiguratorState {
  productId: string | null;
  basePrice: number;
  selections: Record<string, string | string[]>;
  totalPrice: number;
  setProduct: (id: string, basePrice: number) => void;
  setSelection: (groupId: string, value: string | string[]) => void;
  calculateTotal: () => void;
  reset: () => void;
}
```

### 6.2 Configurator Components

#### 6.2.1 Config Option (Single Select)
- [ ] `ConfigOptionSingle.tsx`
- [ ] Radio-style selection
- [ ] Image/color swatch support
- [ ] Price modifier display
- [ ] Active state with checkmark

#### 6.2.2 Config Option (Multi Select)
- [ ] `ConfigOptionMulti.tsx`
- [ ] Checkbox-style selection
- [ ] Multiple selections allowed
- [ ] Price per option

#### 6.2.3 Configurator Form
- [ ] `ConfiguratorForm.tsx`
- [ ] Step sections (1-5)
- [ ] Section headers with selection preview
- [ ] All option groups rendered
- [ ] Real-time total calculation

#### 6.2.4 Sticky Price Bar
- [ ] `StickyPriceBar.tsx`
- [ ] Fixed bottom position
- [ ] Current price display
- [ ] Leasing option (€/mėn)
- [ ] "Pridėti į krepšelį" button
- [ ] Glassmorphic background

### 6.3 Configurator Route
- [ ] `app/(shop)/produktas/[slug]/konfiguratorius/page.tsx`
- [ ] Two-column layout
- [ ] Left: Sticky product gallery + specs
- [ ] Right: ConfiguratorForm
- [ ] StickyPriceBar at bottom
- [ ] Integration with configurator store

### 6.4 Price Calculation Logic
- [ ] `lib/utils/calculatePrice.ts`
- [ ] Sum base price + all selected option modifiers
- [ ] Calculate monthly payment (basePrice / 36)

---

## Phase 7: Cart Functionality (Days 17-19)

### 7.1 Cart State
- [ ] `stores/cart.ts` (Zustand store with persistence)
```typescript
interface CartState {
  items: CartItem[];
  addItem: (product: Product, config: SelectedConfig) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}
```

### 7.2 Cart Components (components/cart/)

#### 7.2.1 Cart Drawer
- [ ] `CartDrawer.tsx`
- [ ] Right-side slide-out panel
- [ ] Backdrop overlay
- [ ] Header with close button
- [ ] Cart items list
- [ ] Upsell section
- [ ] Sticky checkout footer
- [ ] Framer Motion animations

#### 7.2.2 Cart Item
- [ ] `CartItem.tsx`
- [ ] Product thumbnail
- [ ] Product name
- [ ] Configuration summary
- [ ] Price
- [ ] Remove button

#### 7.2.3 Upsell Engine
- [ ] `UpsellEngine.tsx`
- [ ] Recommended accessories
- [ ] Smart water tester, thermal cover
- [ ] "+ PRIDĖTI" buttons

#### 7.2.4 Cart Summary
- [ ] `CartSummary.tsx`
- [ ] Subtotal
- [ ] Leasing option callout
- [ ] "SAUGUS ATSISKAITYMAS" button
- [ ] Trust badges

### 7.3 Cart Provider
- [ ] `components/providers/CartProvider.tsx`
- [ ] Wrap app with cart context
- [ ] Hydration handling for SSR

### 7.4 Cart Page (Optional)
- [ ] `app/(checkout)/krepselis/page.tsx`
- [ ] Full-page cart view
- [ ] For users who prefer page-based cart

---

## Phase 8: Checkout Flow (Days 20-22)

### 8.1 Checkout Components (components/checkout/)

#### 8.1.1 Step Indicator
- [ ] `StepIndicator.tsx`
- [ ] Numbered steps (1, 2)
- [ ] Active/completed states

#### 8.1.2 Delivery Form
- [ ] `DeliveryForm.tsx`
- [ ] Floating label inputs
- [ ] Name, email, address, city, postal code
- [ ] Special delivery option (Vilnius/Kaunas)
- [ ] Form validation with Zod

#### 8.1.3 Payment Methods
- [ ] `PaymentMethods.tsx`
- [ ] Radio selection cards
- [ ] Banklink (Lithuanian banks)
- [ ] Credit card
- [ ] Leasing (highlighted)
- [ ] Icons for each method

#### 8.1.4 Order Summary
- [ ] `OrderSummary.tsx`
- [ ] Sticky sidebar
- [ ] Product image + config summary
- [ ] Line items (subtotal, VAT, delivery)
- [ ] Total
- [ ] Trust badges

### 8.2 Checkout Route
- [ ] `app/(checkout)/atsiskaitymas/page.tsx`
- [ ] Two-column layout
- [ ] Left: Form sections
- [ ] Right: Sticky order summary
- [ ] Form submission handling
- [ ] Redirect to payment provider

### 8.3 Checkout API
- [ ] `app/api/checkout/route.ts`
- [ ] Validate checkout data
- [ ] Create order record
- [ ] Return payment redirect URL

---

## Phase 9: B2B Page (Days 23-24)

### 9.1 B2B Components (components/b2b/)

#### 9.1.1 B2B Hero
- [ ] `B2BHero.tsx`
- [ ] Business-focused headline
- [ ] Value proposition
- [ ] Two CTAs (B2B quote, consultation)
- [ ] Trust bar (volume discounts, warranty, financing)

#### 9.1.2 ROI Section
- [ ] `ROISection.tsx`
- [ ] 3-column value cards
- [ ] Revenue boost, off-season survival, weather independence
- [ ] Icons + descriptions

#### 9.1.3 Engineering Features
- [ ] `B2BEngineering.tsx`
- [ ] Bento grid layout
- [ ] 5-min maintenance, vandal-proof, no rot
- [ ] Large feature highlight

#### 9.1.4 B2B Models
- [ ] `B2BModels.tsx`
- [ ] 3 recommended products
- [ ] Grayscale hover effect
- [ ] Business-specific badges

#### 9.1.5 Partnership Benefits
- [ ] `PartnershipBenefits.tsx`
- [ ] 4-item grid
- [ ] On-site consultation, delivery, training, volume discounts

#### 9.1.6 Lead Form
- [ ] `LeadForm.tsx`
- [ ] Business contact form
- [ ] Name, company, email, phone, quantity
- [ ] Form validation
- [ ] Submit to API

### 9.2 B2B Route
- [ ] `app/(marketing)/verslui/page.tsx`
- [ ] Compose all B2B sections
- [ ] Dual-path CTA (form + Calendly)

### 9.3 Lead API
- [ ] `app/api/leads/route.ts`
- [ ] Validate lead data
- [ ] Store/send lead notification
- [ ] Return success response

---

## Phase 10: Calendly Integration (Day 25)

### 10.1 Calendly Component
- [ ] `components/ui/CalendlyEmbed.tsx`
- [ ] Wrapper for react-calendly
- [ ] Inline embed variant
- [ ] Popup button variant
- [ ] Styling to match design

### 10.2 Integration Points
- [ ] Homepage consultation section
- [ ] B2B page calendar section
- [ ] Contact page

### 10.3 Contact Page
- [ ] `app/(marketing)/kontaktai/page.tsx`
- [ ] Contact information
- [ ] Calendly inline embed
- [ ] Contact form (optional)

---

## Phase 11: API Routes (Day 26)

### 11.1 Products API
- [ ] `app/api/products/route.ts`
  - GET: Return all products
  - Query params: category, shape, capacity

- [ ] `app/api/products/[slug]/route.ts`
  - GET: Return single product by slug

### 11.2 Configurator API
- [ ] `app/api/configurator/route.ts`
  - POST: Calculate configuration price
  - Body: { productId, selections }
  - Return: { totalPrice, breakdown }

### 11.3 Cart API (Optional - for server state)
- [ ] `app/api/cart/route.ts`
  - GET: Get cart
  - POST: Add item
  - DELETE: Remove item

---

## Phase 12: Animations & Polish (Days 27-28)

### 12.1 Page Transitions
- [ ] Framer Motion page transitions
- [ ] Fade + slide effects

### 12.2 Scroll Animations
- [ ] Intersection Observer for reveal animations
- [ ] Staggered card animations
- [ ] Counter animations for stats

### 12.3 Micro-interactions
- [ ] Button hover effects
- [ ] Card lift on hover
- [ ] Image zoom on hover
- [ ] Filter bar transitions
- [ ] Cart drawer animation
- [ ] Price update animation

### 12.4 Loading States
- [ ] Skeleton loaders for products
- [ ] Button loading states
- [ ] Page loading indicator

---

## Phase 13: SEO & Metadata (Day 29)

### 13.1 Metadata Configuration
- [ ] `app/layout.tsx` - Default metadata
- [ ] Per-page metadata using generateMetadata
- [ ] Open Graph images
- [ ] Twitter cards

### 13.2 Structured Data
- [ ] Product schema (JSON-LD)
- [ ] Organization schema
- [ ] BreadcrumbList schema

### 13.3 Technical SEO
- [ ] `app/sitemap.ts` - Dynamic sitemap
- [ ] `app/robots.ts` - Robots configuration
- [ ] Canonical URLs
- [ ] Hreflang (if multi-language)

### 13.4 Lithuanian Locale
- [ ] Proper quotation marks („ ")
- [ ] Date formatting
- [ ] Number formatting (spaces for thousands)

---

## Phase 14: Performance Optimization (Day 30)

### 14.1 Images
- [ ] Next.js Image component everywhere
- [ ] Proper sizes and srcset
- [ ] Blur placeholders
- [ ] WebP/AVIF formats

### 14.2 Fonts
- [ ] next/font for optimization
- [ ] Subset fonts for Lithuanian characters
- [ ] Font display: swap

### 14.3 Code Splitting
- [ ] Dynamic imports for heavy components
- [ ] Route-based code splitting (automatic)

### 14.4 Caching
- [ ] ISR for product pages
- [ ] Static generation for marketing pages
- [ ] API route caching headers

### 14.5 Bundle Analysis
- [ ] Analyze bundle size
- [ ] Remove unused dependencies
- [ ] Tree-shaking verification

---

## Phase 15: Testing & QA (Days 31-32)

### 15.1 Manual Testing
- [ ] All pages render correctly
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Cart functionality
- [ ] Configurator calculations
- [ ] Form validation
- [ ] Navigation

### 15.2 Cross-browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### 15.3 Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader testing
- [ ] Color contrast
- [ ] Focus states

### 15.4 Performance Testing
- [ ] Lighthouse audit
- [ ] Core Web Vitals
- [ ] Load testing

---

## Phase 16: Deployment (Day 33)

### 16.1 Environment Setup
- [ ] Vercel project creation
- [ ] Environment variables
- [ ] Domain configuration

### 16.2 Deployment
- [ ] Production build
- [ ] Deploy to Vercel
- [ ] SSL verification
- [ ] DNS configuration

### 16.3 Monitoring
- [ ] Vercel Analytics
- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring

---

## Summary Timeline

| Phase | Description | Duration |
|-------|-------------|----------|
| 0 | Project Initialization | 1 day |
| **0.5** | **Data Scraping (Antigravity)** | **1-2 days** |
| 1 | Design System & Layout | 2 days |
| 2 | Static Data Layer (uses scraped data) | 1 day |
| 3 | Homepage | 3 days |
| 4 | Catalog Page | 2 days |
| 5 | Product Detail Page | 3 days |
| 6 | Product Configurator | 4 days |
| 7 | Cart Functionality | 3 days |
| 8 | Checkout Flow | 3 days |
| 9 | B2B Page | 2 days |
| 10 | Calendly Integration | 1 day |
| 11 | API Routes | 1 day |
| 12 | Animations & Polish | 2 days |
| 13 | SEO & Metadata | 1 day |
| 14 | Performance Optimization | 1 day |
| 15 | Testing & QA | 2 days |
| 16 | Deployment | 1 day |
| **Total** | | **~35 days** |

---

## Dependency Graph

```
Phase 0 (Init)
    │
    ├──────────────────────────┐
    ▼                          ▼
Phase 0.5 ⚡                Phase 1
(Scraping - Antigravity)    (Design System)
    │                          │
    └───────────┬──────────────┘
                ▼
           Phase 2
        (Data Layer)
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
Phase 3     Phase 4     Phase 9
(Homepage)  (Catalog)   (B2B)
    │           │           │
    │           ▼           │
    │       Phase 5         │
    │       (Product)       │
    │           │           │
    │           ▼           │
    │       Phase 6         │
    │       (Configurator)  │
    │           │           │
    └───────────┼───────────┘
                │
                ▼
           Phase 7
           (Cart)
                   │
                   ▼
              Phase 8
              (Checkout)
                   │
    ┌──────────────┼──────────────┐
    ▼              ▼              ▼
Phase 10      Phase 11       Phase 12
(Calendly)    (APIs)         (Animations)
    │              │              │
    └──────────────┴──────────────┘
                   │
                   ▼
              Phase 13
              (SEO)
                   │
                   ▼
              Phase 14
              (Performance)
                   │
                   ▼
              Phase 15
              (Testing)
                   │
                   ▼
              Phase 16
              (Deploy)
```

---

## Quick Start Commands

```bash
# After Phase 0 completion, run dev server:
pnpm dev

# Build for production:
pnpm build

# Run production build locally:
pnpm start

# Type checking:
pnpm type-check

# Lint:
pnpm lint
```
