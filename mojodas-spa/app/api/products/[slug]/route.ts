import { NextRequest, NextResponse } from "next/server";
import type { Product, ProductListItem } from "@/types/product";
import type { ApiResponse, ProductDetailResponse } from "@/types/api";
import { PRODUCTS } from "@/lib/data/products";

// Cache for 1 hour with ISR
export const revalidate = 3600;

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/products/[slug]
 * Returns a single product by slug with related products
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<ProductDetailResponse>>> {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "INVALID_SLUG",
            message: "Product slug is required",
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        },
        { status: 400 }
      );
    }

    const allProducts = PRODUCTS;

    // Find the product by slug
    const product = allProducts.find(
      (p) => p.slug === slug && p.isActive
    );

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "NOT_FOUND",
            message: `Product with slug "${slug}" not found`,
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        },
        { status: 404 }
      );
    }

    // Get related products - find products from same collection or shape
    // Cast through unknown since JSON data may have extra fields
    const productData = product as unknown as Record<string, unknown>;
    const relatedProductSlugs = (productData.relatedProducts ?? []) as string[];

    let relatedProducts: ProductListItem[] = [];

    if (relatedProductSlugs.length > 0) {
      // Use explicitly defined related products
      relatedProducts = relatedProductSlugs
        .map((relatedSlug) => {
          const related = allProducts.find(
            (p) => p.slug === relatedSlug && p.isActive
          );
          if (!related) return null;

          const relatedData = related as unknown as Record<string, unknown>;
          return {
            id: related.id,
            slug: related.slug,
            name: related.name,
            collection: related.collection,
            variant: related.variant,
            tagline: relatedData.tagline as string ?? '',
            shape: related.shape,
            capacity: related.capacity,
            heaterType: related.heaterType,
            basePrice: related.basePrice,
            monthlyPayment: relatedData.monthlyPayment as number ?? Math.ceil(related.basePrice / 36),
            currency: "EUR" as const,
            badges: related.badges,
            images: related.images,
            isFeatured: related.isFeatured,
            stockStatus: related.stockStatus,
          } as ProductListItem;
        })
        .filter((p): p is ProductListItem => p !== null)
        .slice(0, 4);
    } else {
      // Fallback: find products from same collection or shape
      relatedProducts = allProducts
        .filter(
          (p) =>
            p.isActive &&
            p.slug !== slug &&
            (p.collection === product.collection || p.shape === product.shape)
        )
        .slice(0, 4)
        .map((p) => {
          const pData = p as unknown as Record<string, unknown>;
          return {
            id: p.id,
            slug: p.slug,
            name: p.name,
            collection: p.collection,
            variant: p.variant,
            tagline: pData.tagline as string ?? '',
            shape: p.shape,
            capacity: p.capacity,
            heaterType: p.heaterType,
            basePrice: p.basePrice,
            monthlyPayment: pData.monthlyPayment as number ?? Math.ceil(p.basePrice / 36),
            currency: "EUR" as const,
            badges: p.badges,
            images: p.images,
            isFeatured: p.isFeatured,
            stockStatus: p.stockStatus,
          } as ProductListItem;
        });
    }

    const response: ApiResponse<ProductDetailResponse> = {
      success: true,
      data: {
        product,
        relatedProducts,
      },
      error: null,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching product:", error);

    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch product",
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}
