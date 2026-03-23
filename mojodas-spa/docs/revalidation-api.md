# ISR Revalidation API

## Overview

The revalidation API provides on-demand Incremental Static Regeneration (ISR) for Next.js cached pages and data.

**Endpoint**: `/api/revalidate`

## Setup

### Environment Variable

Add to `.env.local`:

```bash
REVALIDATE_SECRET=your-secret-token-here
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

## Usage

### POST /api/revalidate

Trigger on-demand revalidation of paths or cache tags.

#### Request

```json
{
  "secret": "your-secret-token",
  "path": "/products",
  "tag": "catalog"
}
```

**Parameters:**
- `secret` (required): Must match `REVALIDATE_SECRET` environment variable
- `path` (optional): Path to revalidate (e.g., `/products`, `/produktas/classic-round-in-kubilas`)
- `tag` (optional): Cache tag to revalidate (e.g., `products`, `catalog`)

**Note**: At least one of `path` or `tag` must be provided.

#### Response

**Success (200)**:
```json
{
  "success": true,
  "data": {
    "revalidated": true,
    "path": "/products",
    "tag": "catalog"
  },
  "error": null,
  "meta": {
    "timestamp": "2026-03-23T12:00:00.000Z"
  }
}
```

**Error (401 - Missing/Invalid Secret)**:
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_SECRET",
    "message": "Invalid revalidation secret",
    "field": "secret"
  },
  "meta": {
    "timestamp": "2026-03-23T12:00:00.000Z"
  }
}
```

**Error (400 - Missing Target)**:
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "MISSING_TARGET",
    "message": "Either 'path' or 'tag' must be provided"
  },
  "meta": {
    "timestamp": "2026-03-23T12:00:00.000Z"
  }
}
```

### GET /api/revalidate

Get information about supported revalidation targets.

#### Response

```json
{
  "success": true,
  "data": {
    "message": "Use POST method to trigger revalidation",
    "supportedPaths": [
      "/products",
      "/catalog",
      "/products/[slug]"
    ],
    "supportedTags": [
      "products",
      "catalog",
      "product-detail"
    ]
  },
  "error": null,
  "meta": {
    "timestamp": "2026-03-23T12:00:00.000Z"
  }
}
```

## Examples

### Using curl

Revalidate products listing:
```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your-secret-token",
    "path": "/products"
  }'
```

Revalidate specific product page:
```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your-secret-token",
    "path": "/produktas/classic-round-in-kubilas"
  }'
```

Revalidate all products via tag:
```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your-secret-token",
    "tag": "products"
  }'
```

Revalidate both path and tag:
```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your-secret-token",
    "path": "/katalogas",
    "tag": "catalog"
  }'
```

### Using Fetch API

```typescript
async function revalidateProducts() {
  const response = await fetch('/api/revalidate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      secret: process.env.REVALIDATE_SECRET,
      tag: 'products',
    }),
  });

  const data = await response.json();

  if (data.success) {
    console.log('Revalidated:', data.data);
  } else {
    console.error('Revalidation failed:', data.error);
  }
}
```

## Common Use Cases

### 1. After Product Update
Revalidate specific product page and products listing:
```json
{
  "secret": "...",
  "path": "/produktas/classic-round-in-kubilas"
}
```

### 2. After Inventory Change
Revalidate all product-related caches:
```json
{
  "secret": "...",
  "tag": "products"
}
```

### 3. After Price Update
Revalidate catalog and all product pages:
```json
{
  "secret": "...",
  "tag": "catalog"
}
```

### 4. Full Site Refresh
Revalidate multiple paths sequentially:
```bash
for path in "/products" "/katalogas" "/katalogas/apvalus"; do
  curl -X POST https://your-domain.com/api/revalidate \
    -H "Content-Type: application/json" \
    -d "{\"secret\":\"$REVALIDATE_SECRET\",\"path\":\"$path\"}"
done
```

## Security Best Practices

1. Keep `REVALIDATE_SECRET` secure and never commit it to version control
2. Use a strong, randomly generated secret (minimum 32 characters)
3. Rotate the secret periodically
4. Monitor revalidation API usage for suspicious activity
5. Consider rate limiting in production (via middleware or reverse proxy)

## Integration with CMS/Webhooks

Example webhook handler for Contentful/Sanity:

```typescript
// app/api/webhooks/cms/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Verify webhook signature here

  // Trigger revalidation
  const revalidateResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.REVALIDATE_SECRET,
      tag: 'products',
    }),
  });

  return NextResponse.json({ success: true });
}
```

## Monitoring

Log entries are created for all revalidation attempts:

- Successful revalidations: `Revalidated path: /products`
- Failed revalidations: `Error revalidating path: /products`
- Configuration errors: `REVALIDATE_SECRET environment variable is not configured`

Monitor these logs to track revalidation activity and troubleshoot issues.
