# MojoDas Spa Workspace

## Structure
```
mojodasspa/
├── mojodas-spa/          # Next.js 16 application (main codebase)
├── PRD.md                # Product Requirements Document
├── IMPLEMENTATION_PLAN.md # Phased implementation plan
├── SCRAPING_TASK.md      # Product data scraping notes
├── data/                 # Raw scraped data
└── stitch_*/             # Stitch design references
```

## Quick Start
```bash
cd mojodas-spa
pnpm dev                  # http://localhost:3000
```

## Project Status: ~95% Complete

### Completed
- Full e-commerce platform (16 products)
- All pages: Homepage, Catalog, Product, Configurator, Cart, Checkout, B2B, Contact
- API routes: products, cart, checkout, leads, configurator, revalidate
- 50+ React components
- Zustand state management
- Lithuanian language throughout

### Remaining
- Email notifications (SendGrid/Resend integration)
- Real product images
- Production deployment
- Analytics setup

## GitHub
**Repo:** https://github.com/MartianDominic/mojodas-spa

## Key Files
| File | Purpose |
|------|---------|
| `PRD.md` | Full requirements, data models, design specs |
| `mojodas-spa/CLAUDE.md` | Detailed dev instructions for the Next.js app |
| `mojodas-spa/app/globals.css` | Design system tokens |
| `mojodas-spa/data/products.json` | Product catalog data |

## Deploy
```bash
cd mojodas-spa
vercel --prod
```

## Brand
- **Name:** MojoDas Spa
- **Tagline:** "Engineering of Serenity"
- **Market:** Lithuanian luxury hot tub manufacturer
- **Language:** Lithuanian (lt-LT)
