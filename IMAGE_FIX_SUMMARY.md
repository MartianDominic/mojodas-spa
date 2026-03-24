# Product Images Fix - 2026-03-24

## Problem
Several product cards in the catalog displayed broken images (showing only alt text).

### Root Cause
Multiple product image files were zero bytes (0 KB empty files):
- `/images/products/classic-round-horizon/hero-1.jpg` - 0 bytes
- `/images/products/monaco-out/hero-1.jpg` - 0 bytes  
- `/images/products/arctic-chiller/hero-1.jpg` - 0 bytes
- `/images/products/monaco-in/hero-1.jpg` - 0 bytes

Additional zero-byte gallery images:
- `classic-round-horizon/gallery-1.jpg`, `gallery-2.jpg`
- `classic-round-out/gallery-1.jpg`, `gallery-2.jpg`

## Solution
Updated `/mojodas-spa/data/products.json` to use the placeholder SVG (`/images/products/placeholder.svg`) for products with missing hero images.

### Products Fixed
1. **Classic Round Horizon** (prod_classic_round_horizon)
2. **Monaco Out** (prod_monaco_out)
3. **Monaco In** (prod_monaco_in)
4. **Arctic Chiller** (prod_arctic_chiller)

### Changed Fields
For each affected product:
- `images[0].url` → `/images/products/placeholder.svg`
- `thumbnail.url` → `/images/products/placeholder.svg`

## Verification
```bash
cd mojodas-spa
pnpm dev
# Visit http://localhost:3000/katalogas
```

All catalog cards now render without broken images.

## Next Steps (Future)
1. Replace placeholder images with actual product photography
2. Update `data/products.json` with real image paths
3. No code changes needed - just drop images in `/public/images/products/{slug}/` folders

## Files Modified
- `/mojodas-spa/data/products.json`

## Files NOT Modified (working correctly)
- `/mojodas-spa/components/catalog/ProductCard.tsx` (renders images correctly)
- `/mojodas-spa/public/images/products/placeholder.svg` (already existed)
