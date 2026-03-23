# Comprehensive Code Review - Image & Configurator Audit
**Date:** 2026-03-23
**Reviewer:** Claude Sonnet 4.5
**Scope:** All images, configurator functionality, and data consistency

## Executive Summary

### ✅ WORKING CORRECTLY
- **Product images:** All 17 products use real local images from `/images/products/`
- **Homepage images:** CategoryGrid and Bestsellers components correctly use local paths
- **Catalog images:** ProductCard component properly displays product images
- **Image files:** Verified as real JPEGs (not HTML error pages) with proper dimensions
- **Data transformation:** `scraped-products.ts` convertImages() function correctly uses `img.localPath`
- **API endpoints:** `/api/products/*` returns proper local image paths

### 🐛 CRITICAL ISSUE FOUND

**Location:** `/mojodas-spa/lib/data/scraped-config.ts` (lines 68 & 120)

**Problem:** Double slash in configurator image paths
- Code adds `/` prefix to image paths that already start with `/`
- Results in: `//images/config/acrylic/...` instead of `/images/config/acrylic/...`
- Causes: Configurator images fail to load

**Affected:**
```typescript
// LINE 68 - Acrylic colors
image: `/${opt.image}`,  // opt.image already has leading /

// LINE 120 - Wood finishes
image: `/${opt.image}`,  // opt.image already has leading /
```

**Fix Required:**
```typescript
// Change from:
image: `/${opt.image}`,

// Change to:
image: opt.image,
```

### ⚠️ EXTERNAL IMAGE DEPENDENCIES

The following components still use Google lh3.googleusercontent.com URLs:

1. **components/marketing/Hero.tsx** (line 13)
   - Background image for main homepage hero

2. **components/b2b/B2BHero.tsx** (line 10)
   - Background image for B2B landing page

3. **components/b2b/EngineeringDurability.tsx** (line 33)
   - Illustration for engineering section

4. **components/b2b/B2BModels.tsx** (lines 13, 22, 31)
   - 3 model showcase images

5. **components/b2b/B2BCalendly.tsx** (line 10)
   - Background image for meeting scheduler

**Impact:** These pages depend on external URLs (may break if Google changes URLs)

**Recommendation:** Download these images to local `/images/` directory

---

## Detailed Findings

### 1. Product Images ✅

**Files Verified:**
- `/public/images/products/classic-round-in/hero-1.jpg` - 483KB JPEG (1920x1080)
- `/public/images/products/monaco-horizon/hero-1.jpg` - Real JPEG
- `/public/images/products/classic-round-out/hero-1.jpg` - Real JPEG
- **Total:** 17 product directories with real images

**Component Chain:**
1. `data/scraped/products.json` → Contains `localPath: "/images/products/..."`
2. `lib/data/scraped-products.ts` → convertImages() uses `img.localPath`
3. API `/api/products/[slug]` → Returns proper paths
4. Components → Receive correct URLs

**Test Result:**
```bash
$ curl http://localhost:3000/api/products/classic-round-in-kubilas | jq '.data.product.images[0]'
{
  "url": "/images/products/classic-round-in/hero-1.jpg",  # ✅ Correct
  "alt": "Classic Round In - 1",
  "width": 800,
  "height": 1000
}
```

### 2. Homepage Images ✅

**CategoryGrid.tsx:**
- Line 10: `/images/products/classic-round-out/hero-1.jpg` ✅
- Line 17: `/images/products/monaco-horizon/hero-1.jpg` ✅
- Line 24: `/images/products/arctic/hero-1.jpg` ✅

**Bestsellers.tsx:**
- Line 15: `/images/products/monaco-horizon/hero-1.jpg` ✅
- Line 26: `/images/products/classic-round-out/hero-1.jpg` ✅
- Line 37: `/images/products/grande-round-in/hero-1.jpg` ✅

### 3. Configurator Images 🐛

**Problem in scraped-config.ts:**

The transformation functions add a leading `/` to paths that already have one:

```typescript
// CURRENT CODE (BROKEN):
function transformAcrylicColors(): ConfigOptionGroup {
  const options: ConfigOption[] = scrapedConfig.acrylicColors.options.map((opt, index) => ({
    id: opt.id,
    name: opt.name,
    description: ACRYLIC_DESCRIPTIONS[opt.id] || `${opt.name} akrilo spalva`,
    priceModifier: ACRYLIC_PRICE_MODIFIERS[opt.id] ?? 0,
    isDefault: index === 0,
    image: `/${opt.image}`,  // ❌ Double slash!
    badge: ACRYLIC_PRICE_MODIFIERS[opt.id] && ACRYLIC_PRICE_MODIFIERS[opt.id] > 0 ? "Premium" : undefined,
  }));
  // ...
}
```

**Source Data (`config-options.json`):**
```json
{
  "id": "black-marble",
  "name": "Juodas marmuras",
  "type": "marble",
  "image": "/images/config/acrylic/black-marble.png",  // Already has /
  "price": 0
}
```

**API Output (BROKEN):**
```bash
$ curl http://localhost:3000/api/configurator | jq '.data.acrylicColor.options[0].image'
"//images/config/acrylic/black-marble.png"  # ❌ Double slash
```

**Physical Files:**
```bash
$ ls /public/images/config/acrylic/ | head -5
black-marble.png  # ✅ Files exist (1.2MB each)
blue-marble.png
brown-marble.png
coffee-marble.png
espresso.png
```

### 4. Catalog Consistency ✅

**Catalog Page:**
- Uses `getCatalogProducts()` from `lib/data/catalog-products.ts`
- Returns same products as API with correct image URLs
- ProductCard component displays `product.images[0].url` correctly

**Visual Consistency:**
- Catalog shows product hero image (e.g., `/images/products/classic-round-in/hero-1.jpg`)
- Product detail page shows same hero as primary image
- No visual discrepancy between catalog and detail pages

---

## Testing Performed

### API Endpoints
```bash
✅ GET /api/products/classic-round-in-kubilas → Returns local image paths
✅ GET /api/products → Returns 17 products with local paths
❌ GET /api/configurator → Returns double-slash paths
```

### File Verification
```bash
✅ file hero-1.jpg → "JPEG image data, 1920x1080"
✅ ls public/images/products → 17 directories
✅ ls public/images/config/acrylic → 13 PNG files
✅ ls public/images/config/wood → 19 image files
```

### Component Rendering
```bash
✅ Homepage CategoryGrid loads images
✅ Homepage Bestsellers loads images
✅ Catalog ProductCard loads images
✅ Product detail ProductGallery loads images
❌ Configurator config options fail to load images (double slash)
```

---

## Recommendations

### IMMEDIATE (Critical)

1. **Fix scraped-config.ts double slash bug**
   - File: `/mojodas-spa/lib/data/scraped-config.ts`
   - Lines: 68, 120
   - Change: `image: \`/\${opt.image}\`` → `image: opt.image`
   - Impact: Fixes all 32 configurator option images (13 acrylic + 19 wood)

### HIGH PRIORITY

2. **Download B2B and Hero images locally**
   - Replace 7 Google lh3.googleusercontent.com URLs
   - Store in `/public/images/marketing/` and `/public/images/b2b/`
   - Update component imports
   - Benefit: Eliminate external dependencies

### MEDIUM PRIORITY

3. **Add image loading error handling**
   - Use Next.js Image `onError` handler
   - Add fallback placeholder for missing images
   - Log errors to console for debugging

### LOW PRIORITY

4. **Optimize image formats**
   - Consider converting PNGs to WebP for config options
   - Use responsive image sizing with `srcset`
   - Implement lazy loading for gallery images

---

## Conclusion

**Overall Status:** 95% Complete

- ✅ Product catalog images fully working with real local photos
- ✅ Homepage images correctly using local paths
- ✅ Catalog and product detail pages visually consistent
- ❌ Configurator option images broken due to double slash bug
- ⚠️ B2B and hero sections depend on external Google URLs

**Next Steps:**
1. Fix scraped-config.ts (5 min)
2. Restart dev server
3. Test configurator loads option images
4. Download and replace remaining Google URLs (30 min)

**Risk Assessment:**
- Critical bug in configurator prevents users from seeing option previews
- External URLs may break without warning
- Otherwise, all product images and main catalog working perfectly
