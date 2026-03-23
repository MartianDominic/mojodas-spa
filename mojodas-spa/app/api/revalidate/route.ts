import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import type { ApiResponse, RevalidateRequest, RevalidateResponseData } from "@/types/api";

/**
 * POST /api/revalidate
 * Triggers on-demand ISR revalidation for specified paths or tags
 *
 * Security:
 * - Requires REVALIDATE_SECRET environment variable
 * - Request must include matching secret in body
 *
 * Request body:
 * - secret: string (required) - Must match REVALIDATE_SECRET env var
 * - path: string (optional) - Path to revalidate (e.g., "/products", "/products/[slug]")
 * - tag: string (optional) - Cache tag to revalidate (e.g., "products", "catalog")
 *
 * Supported revalidation targets:
 * - "/products" - Products listing page
 * - "/catalog" - Full catalog page
 * - "/products/[slug]" - Specific product detail page
 * - tag: "products" - All product-related caches
 * - tag: "catalog" - All catalog-related caches
 *
 * @example
 * // Revalidate products listing
 * POST /api/revalidate
 * { "secret": "...", "path": "/products" }
 *
 * @example
 * // Revalidate all product caches
 * POST /api/revalidate
 * { "secret": "...", "tag": "products" }
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<RevalidateResponseData>>> {
  try {
    // Parse request body
    const body = (await request.json()) as RevalidateRequest;
    const { secret, path, tag } = body;

    // Validate secret is provided
    if (!secret) {
      const errorResponse: ApiResponse<RevalidateResponseData> = {
        success: false,
        data: null,
        error: {
          code: "MISSING_SECRET",
          message: "Revalidation secret is required",
          field: "secret",
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      };

      return NextResponse.json(errorResponse, { status: 401 });
    }

    // Validate secret matches environment variable
    const revalidateSecret = process.env.REVALIDATE_SECRET;

    if (!revalidateSecret) {
      console.error("REVALIDATE_SECRET environment variable is not configured");

      const errorResponse: ApiResponse<RevalidateResponseData> = {
        success: false,
        data: null,
        error: {
          code: "SERVER_MISCONFIGURED",
          message: "Revalidation is not configured on this server",
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      };

      return NextResponse.json(errorResponse, { status: 500 });
    }

    if (secret !== revalidateSecret) {
      const errorResponse: ApiResponse<RevalidateResponseData> = {
        success: false,
        data: null,
        error: {
          code: "INVALID_SECRET",
          message: "Invalid revalidation secret",
          field: "secret",
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      };

      return NextResponse.json(errorResponse, { status: 401 });
    }

    // Validate at least one revalidation target is provided
    if (!path && !tag) {
      const errorResponse: ApiResponse<RevalidateResponseData> = {
        success: false,
        data: null,
        error: {
          code: "MISSING_TARGET",
          message: "Either 'path' or 'tag' must be provided",
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Perform revalidation
    let didRevalidate = false;
    let revalidatedPath: string | undefined;
    let revalidatedTag: string | undefined;

    if (path) {
      try {
        revalidatePath(path, "page");
        didRevalidate = true;
        revalidatedPath = path;
        console.log(`Revalidated path: ${path}`);
      } catch (error) {
        console.error(`Error revalidating path: ${path}`, error);
        throw new Error(`Failed to revalidate path: ${path}`);
      }
    }

    if (tag) {
      try {
        revalidateTag(tag, "default");
        didRevalidate = true;
        revalidatedTag = tag;
        console.log(`Revalidated tag: ${tag}`);
      } catch (error) {
        console.error(`Error revalidating tag: ${tag}`, error);
        throw new Error(`Failed to revalidate tag: ${tag}`);
      }
    }

    const responseData: RevalidateResponseData = {
      revalidated: didRevalidate,
      path: revalidatedPath,
      tag: revalidatedTag,
    };

    const successResponse: ApiResponse<RevalidateResponseData> = {
      success: true,
      data: responseData,
      error: null,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    console.error("Error processing revalidation request:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to revalidate";

    const errorResponse: ApiResponse<RevalidateResponseData> = {
      success: false,
      data: null,
      error: {
        code: "REVALIDATION_FAILED",
        message: errorMessage,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * GET /api/revalidate
 * Returns information about the revalidation endpoint
 * Does not perform actual revalidation (use POST)
 */
export async function GET(): Promise<NextResponse<ApiResponse<{
  readonly message: string;
  readonly supportedPaths: readonly string[];
  readonly supportedTags: readonly string[];
}>>> {
  const response: ApiResponse<{
    readonly message: string;
    readonly supportedPaths: readonly string[];
    readonly supportedTags: readonly string[];
  }> = {
    success: true,
    data: {
      message: "Use POST method to trigger revalidation",
      supportedPaths: [
        "/products",
        "/catalog",
        "/products/[slug]",
      ],
      supportedTags: [
        "products",
        "catalog",
        "product-detail",
      ],
    },
    error: null,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(response, { status: 200 });
}
