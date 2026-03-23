import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@/types/product";
import type { ConfigOptionGroup } from "@/types/config";
import type {
  ApiResponse,
  CartValidationRequest,
  CartValidationResponse,
  AddToCartRequest,
  AddToCartResponseData,
} from "@/types/api";
import { PRODUCTS } from "@/lib/data/products";
import { allConfigOptions } from "@/lib/data/config-options";

type ConfigOptionsMap = Record<string, ConfigOptionGroup>;

/**
 * Helper function to calculate item price
 */
function calculateItemPrice(
  product: Product,
  configuration: Record<string, string | readonly string[]>,
  configOptions: ConfigOptionsMap
): number {
  let total = product.basePrice;

  for (const [groupId, selectedValue] of Object.entries(configuration)) {
    const group = configOptions[groupId];
    if (!group) continue;

    if (group.type === "multiple") {
      const selectedIds = Array.isArray(selectedValue)
        ? selectedValue
        : [selectedValue];

      for (const optionId of selectedIds) {
        const option = group.options.find((o) => o.id === optionId);
        if (option) {
          total += option.priceModifier;
        }
      }
    } else {
      const optionId = Array.isArray(selectedValue)
        ? selectedValue[0]
        : selectedValue;
      const option = group.options.find((o) => o.id === optionId);
      if (option) {
        total += option.priceModifier;
      }
    }
  }

  return total;
}

/**
 * Helper function to generate configuration summary
 */
function generateConfigSummary(
  configuration: Record<string, string | readonly string[]>,
  configOptions: ConfigOptionsMap
): string {
  const parts: string[] = [];

  for (const [groupId, selectedValue] of Object.entries(configuration)) {
    const group = configOptions[groupId];
    if (!group) continue;

    if (group.type === "multiple") {
      const selectedIds = Array.isArray(selectedValue)
        ? selectedValue
        : [selectedValue];
      const names = selectedIds
        .map((id) => group.options.find((o) => o.id === id)?.name)
        .filter(Boolean);
      if (names.length > 0) {
        parts.push(names.join(", "));
      }
    } else {
      const optionId = Array.isArray(selectedValue)
        ? selectedValue[0]
        : selectedValue;
      const option = group.options.find((o) => o.id === optionId);
      if (option) {
        parts.push(option.name);
      }
    }
  }

  return parts.join(" | ");
}

/**
 * GET /api/cart
 * Validates cart items - checks if products still exist and prices are current
 *
 * Query params (JSON encoded):
 * - items: array of cart items to validate
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<CartValidationResponse>>> {
  try {
    const { searchParams } = new URL(request.url);
    const itemsParam = searchParams.get("items");

    if (!itemsParam) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "INVALID_REQUEST",
            message: "Items parameter is required",
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        },
        { status: 400 }
      );
    }

    let items: CartValidationRequest["items"];
    try {
      items = JSON.parse(itemsParam);
    } catch {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "INVALID_JSON",
            message: "Invalid JSON in items parameter",
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        },
        { status: 400 }
      );
    }

    const allProducts = PRODUCTS;
    const configOptions = allConfigOptions as ConfigOptionsMap;

    const validItems: Array<{
      productSlug: string;
      isValid: boolean;
      currentPrice: number;
      priceChanged: boolean;
      previousPrice?: number;
    }> = [];
    let hasInvalidItems = false;
    let hasPriceChanges = false;

    for (const item of items) {
      const product = allProducts.find(
        (p) => p.slug === item.productSlug && p.isActive
      );

      if (!product) {
        validItems.push({
          productSlug: item.productSlug,
          isValid: false,
          currentPrice: 0,
          priceChanged: false,
        });
        hasInvalidItems = true;
        continue;
      }

      // Calculate current price
      const currentPrice = calculateItemPrice(
        product,
        item.configuration as Record<string, string | readonly string[]>,
        configOptions
      );

      validItems.push({
        productSlug: item.productSlug,
        isValid: true,
        currentPrice,
        priceChanged: false, // Would compare with stored price if we had it
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          validItems,
          hasInvalidItems,
          hasPriceChanges,
        },
        error: null,
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error validating cart:", error);

    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to validate cart",
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cart
 * Add item with configuration - validates and returns calculated price
 *
 * Request body:
 * - productSlug: string
 * - configuration: Record<string, string | string[]>
 * - quantity: number
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<AddToCartResponseData>>> {
  try {
    const body = (await request.json()) as AddToCartRequest;

    // Validate request
    if (!body.productSlug) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "INVALID_REQUEST",
            message: "Product slug is required",
            field: "productSlug",
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        },
        { status: 400 }
      );
    }

    if (!body.quantity || body.quantity < 1) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "INVALID_REQUEST",
            message: "Quantity must be at least 1",
            field: "quantity",
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        },
        { status: 400 }
      );
    }

    // Find the product
    const product = PRODUCTS.find(
      (p) => p.slug === body.productSlug && p.isActive
    );

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "NOT_FOUND",
            message: `Product with slug "${body.productSlug}" not found`,
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        },
        { status: 404 }
      );
    }

    const configOptions = allConfigOptions as ConfigOptionsMap;

    // Calculate price
    const unitPrice = calculateItemPrice(
      product,
      body.configuration as Record<string, string | readonly string[]>,
      configOptions
    );

    // Generate summary
    const configurationSummary = generateConfigSummary(
      body.configuration as Record<string, string | readonly string[]>,
      configOptions
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          success: true,
          item: {
            productSlug: product.slug,
            productName: product.name,
            unitPrice,
            quantity: body.quantity,
            configurationSummary,
          },
        },
        error: null,
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding to cart:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "INVALID_JSON",
            message: "Invalid JSON in request body",
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to add item to cart",
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cart
 * This endpoint could be used for server-side cart operations if needed.
 * Currently, cart state is managed client-side with Zustand.
 */
export async function DELETE(
  request: NextRequest
): Promise<NextResponse<ApiResponse<{ cleared: boolean }>>> {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");

    // If itemId is provided, this would remove a specific item
    // If not, clear all items
    // Currently, cart is client-side, so this just validates the request

    return NextResponse.json(
      {
        success: true,
        data: {
          cleared: true,
        },
        error: null,
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error clearing cart:", error);

    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to clear cart",
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}
