import { NextRequest, NextResponse } from "next/server";
import type { Product, ProductListItem, ProductShape } from "@/types/product";
import type { ApiResponse, ProductsResponse, ProductsQueryParams } from "@/types/api";
import { PRODUCTS } from "@/lib/data/products";

// Cache for 1 hour with ISR
export const revalidate = 3600;

/**
 * GET /api/products
 * Returns all products with optional filtering
 *
 * Query params:
 * - category: "round" | "square" | "therapeutic"
 * - capacity: "4-6" | "6-8" | "8-10" | "1-2"
 * - featured: "true" | "false"
 * - collection: product collection name
 * - limit: number of products to return
 * - page: page number for pagination
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ProductsResponse>>> {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const params: ProductsQueryParams = {
      category: searchParams.get("category") as ProductShape | undefined,
      capacity: searchParams.get("capacity") ?? undefined,
      featured: searchParams.get("featured") ?? undefined,
      collection: searchParams.get("collection") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      page: searchParams.get("page") ?? undefined,
    };

    // Get all products from data
    const allProducts = PRODUCTS;

    // Filter products
    let filteredProducts = allProducts.filter((product) => product.isActive);

    // Filter by category (shape)
    if (params.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.shape === params.category
      );
    }

    // Filter by capacity
    if (params.capacity) {
      const [minCapacity, maxCapacity] = params.capacity.split("-").map(Number);
      if (!isNaN(minCapacity) && !isNaN(maxCapacity)) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.capacity.min >= minCapacity &&
            product.capacity.max <= maxCapacity
        );
      }
    }

    // Filter by featured
    if (params.featured === "true") {
      filteredProducts = filteredProducts.filter((product) => product.isFeatured);
    }

    // Filter by collection
    if (params.collection) {
      filteredProducts = filteredProducts.filter(
        (product) => product.collection === params.collection
      );
    }

    // Calculate total before pagination
    const total = filteredProducts.length;

    // Pagination
    const page = Math.max(1, parseInt(params.page ?? "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(params.limit ?? "20", 10)));
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    filteredProducts = filteredProducts.slice(startIndex, endIndex);

    // Transform to list items (lighter payload)
    const productListItems: ProductListItem[] = filteredProducts.map(
      (product) => ({
        id: product.id,
        slug: product.slug,
        name: product.name,
        collection: product.collection,
        variant: product.variant,
        tagline: product.tagline,
        shape: product.shape,
        capacity: product.capacity,
        heaterType: product.heaterType,
        basePrice: product.basePrice,
        monthlyPayment: product.monthlyPayment,
        currency: product.currency,
        badges: product.badges,
        images: product.images,
        isFeatured: product.isFeatured,
        stockStatus: product.stockStatus,
      })
    );

    // Get available filter values
    const allActiveProducts = allProducts.filter((p) => p.isActive);
    const categories = [...new Set(allActiveProducts.map((p) => p.shape))];
    const capacities = [
      ...new Set(
        allActiveProducts.map((p) => `${p.capacity.min}-${p.capacity.max}`)
      ),
    ].sort();
    const collections = [...new Set(allActiveProducts.map((p) => p.collection))];

    const response: ApiResponse<ProductsResponse> = {
      success: true,
      data: {
        products: productListItems,
        total,
        filters: {
          categories,
          capacities,
          collections,
        },
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
    console.error("Error fetching products:", error);

    const errorResponse: ApiResponse<ProductsResponse> = {
      success: false,
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch products",
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
