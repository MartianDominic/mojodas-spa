# Lux Spa Nature - Project Instructions

## Project Overview
Lithuanian luxury hot tub e-commerce platform. Premium brand positioning ("Engineering of Serenity").

## Tech Stack
- **Framework:** Next.js 16.2.1 (App Router, React 19)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with `@theme inline` in globals.css
- **State:** Zustand (cart, configurator, checkout stores)
- **Data:** Static JSON files in `/data/`, served via API routes

## Key Conventions

### Language
- All UI text is **Lithuanian** (lt-LT locale)
- Use proper Lithuanian quotes: „text"
- Route names in Lithuanian: `/katalogas`, `/produktas`, `/krepselis`, `/atsiskaitymas`, `/verslui`, `/kontaktai`

### Component Patterns
- Server Components by default
- `"use client"` only when needed (stores, interactivity)
- Barrel exports via `index.ts` in each component folder
- Use `cn()` from `@/lib/utils/cn` for class merging

### Design System
- Colors defined in `app/globals.css` as CSS variables
- Material Design 3 inspired surface hierarchy
- No 1px borders - use background color shifts
- Max border-radius: 0.5rem (sharp, engineering aesthetic)
- Font stack: Noto Serif (headlines), Playfair Display (display), Inter (body)

### File Structure
```
app/
  (checkout)/     # Checkout flow group
  (marketing)/    # Marketing pages (if grouped)
  api/            # Route handlers
  katalogas/      # Catalog with [category] dynamic route
  produktas/      # Product with [slug] and /konfiguratorius
components/
  ui/             # Primitives (Button, Input, Select, etc.)
  layout/         # Header, Footer, MobileMenu
  marketing/      # Hero, TrustStrip, CategoryGrid, etc.
  catalog/        # ProductCard, ProductGrid, FilterBar
  product/        # ProductGallery, TechSpecs, ProductInfo
  configurator/   # ConfiguratorForm, ConfigOption, StickyPriceBar
  cart/           # CartDrawer, CartItem, UpsellEngine
  checkout/       # DeliveryForm, PaymentMethods, OrderSummary
  b2b/            # B2BHero, LeadForm, ValuePropositions
  contact/        # ContactForm, ContactInfo, ContactCalendly
lib/
  data/           # Product and config data loaders
  hooks/          # Custom React hooks
  utils/          # cn, format, price, validation
  constants/      # Routes, config
stores/           # Zustand stores (cart, configurator, checkout)
types/            # TypeScript interfaces
data/             # Static JSON (products, config-options)
```

## API Routes
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/products` | GET | List all products |
| `/api/products/[slug]` | GET | Single product |
| `/api/configurator` | POST | Calculate config price |
| `/api/cart` | GET/POST/DELETE | Cart operations |
| `/api/checkout` | POST | Create order |
| `/api/leads` | POST | B2B lead form |
| `/api/revalidate` | POST | ISR trigger (requires secret) |

## Environment Variables
```env
REVALIDATE_SECRET=your-secret-here  # Required for /api/revalidate
```

## Common Tasks

### Add a new product
1. Add to `data/products.json`
2. Add images to `public/images/products/`
3. Run `pnpm build` to generate static page

### Add a new UI component
1. Create in `components/ui/ComponentName.tsx`
2. Export from `components/ui/index.ts`
3. Use `cn()` for conditional classes
4. Follow existing patterns (forwardRef, variants via props)

### Add a new page
1. Create `app/route-name/page.tsx`
2. Use Server Component unless interactivity needed
3. Add metadata export for SEO
4. Import layout components from `@/components/layout`

## Build & Deploy
```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm start        # Start production server
vercel --prod     # Deploy to Vercel
```

## Product Data Schema
Products have: `id`, `slug`, `name`, `collection`, `variant`, `basePrice`, `specs`, `images`, `configurableOptions`

Collections: monaco, classic-round, grande-round, paris, andorra, cuba, macau, arctic, ofuro

Shapes: round, square, therapeutic

## Important Notes
- Next.js 16 has breaking changes from 14/15 - check `node_modules/next/dist/docs/` if unsure
- `revalidateTag(tag, profile)` requires 2 arguments in this version
- Images use `lh3.googleusercontent.com` and `mojodasspa.com` domains (configured in next.config.ts)
