import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@/types/product";
import type { ConfigOptionGroup, ConfigOption } from "@/types/config";
import type {
  ApiResponse,
  ConfiguratorRequest,
  ConfiguratorResponse,
  ConfigBreakdownItem,
} from "@/types/api";
import { PRODUCTS } from "@/lib/data/products";
import { allConfigOptions } from "@/lib/data/config-options";

// Types for config data
type ConfigOptionsMap = Record<string, ConfigOptionGroup>;

/**
 * POST /api/configurator
 * Calculates the configuration price for a product
 *
 * Request body:
 * - productSlug: string
 * - selectedOptions: Record<string, string | string[]>
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ConfiguratorResponse>>> {
  try {
    const body = (await request.json()) as ConfiguratorRequest;

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

    if (!body.selectedOptions || typeof body.selectedOptions !== "object") {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "INVALID_REQUEST",
            message: "Selected options must be an object",
            field: "selectedOptions",
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

    // Get config options
    const configOptions = allConfigOptions as ConfigOptionsMap;

    // Validate and calculate prices
    const breakdown: ConfigBreakdownItem[] = [];
    let optionsTotal = 0;
    const summaryParts: string[] = [];

    // Get the available config groups for this product
    const availableGroups = product.configurableOptions || [];

    for (const [groupId, selectedValue] of Object.entries(body.selectedOptions)) {
      // Check if the group is available for this product
      if (!availableGroups.includes(groupId)) {
        return NextResponse.json(
          {
            success: false,
            data: null,
            error: {
              code: "INVALID_OPTION",
              message: `Configuration group "${groupId}" is not available for this product`,
              field: `selectedOptions.${groupId}`,
            },
            meta: {
              timestamp: new Date().toISOString(),
            },
          },
          { status: 400 }
        );
      }

      const group = configOptions[groupId];
      if (!group) {
        return NextResponse.json(
          {
            success: false,
            data: null,
            error: {
              code: "INVALID_OPTION",
              message: `Unknown configuration group "${groupId}"`,
              field: `selectedOptions.${groupId}`,
            },
            meta: {
              timestamp: new Date().toISOString(),
            },
          },
          { status: 400 }
        );
      }

      // Handle single vs multiple selection types
      if (group.type === "multiple") {
        // Multiple selection - value should be array
        const selectedIds = Array.isArray(selectedValue)
          ? selectedValue
          : [selectedValue];

        let groupTotal = 0;
        const selectedNames: string[] = [];

        for (const optionId of selectedIds) {
          const option = group.options.find((o) => o.id === optionId);
          if (!option) {
            return NextResponse.json(
              {
                success: false,
                data: null,
                error: {
                  code: "INVALID_OPTION",
                  message: `Unknown option "${optionId}" in group "${groupId}"`,
                  field: `selectedOptions.${groupId}`,
                },
                meta: {
                  timestamp: new Date().toISOString(),
                },
              },
              { status: 400 }
            );
          }

          groupTotal += option.priceModifier;
          selectedNames.push(option.name);
        }

        if (selectedIds.length > 0) {
          breakdown.push({
            groupId,
            groupName: group.name,
            optionId: selectedIds,
            optionName: selectedNames.join(", "),
            price: groupTotal,
          });
          optionsTotal += groupTotal;
          summaryParts.push(selectedNames.join(", "));
        }
      } else {
        // Single selection
        const optionId = Array.isArray(selectedValue)
          ? selectedValue[0]
          : selectedValue;

        const option = group.options.find((o) => o.id === optionId);
        if (!option) {
          return NextResponse.json(
            {
              success: false,
              data: null,
              error: {
                code: "INVALID_OPTION",
                message: `Unknown option "${optionId}" in group "${groupId}"`,
                field: `selectedOptions.${groupId}`,
              },
              meta: {
                timestamp: new Date().toISOString(),
              },
            },
            { status: 400 }
          );
        }

        breakdown.push({
          groupId,
          groupName: group.name,
          optionId: option.id,
          optionName: option.name,
          price: option.priceModifier,
        });
        optionsTotal += option.priceModifier;
        summaryParts.push(option.name);
      }
    }

    // Check for required options that are missing
    for (const groupId of availableGroups) {
      const group = configOptions[groupId];
      if (group?.required && !body.selectedOptions[groupId]) {
        // Add default option if required and missing
        const defaultOption = group.options.find((o) => o.isDefault);
        if (defaultOption) {
          breakdown.push({
            groupId,
            groupName: group.name,
            optionId: defaultOption.id,
            optionName: defaultOption.name,
            price: defaultOption.priceModifier,
          });
          optionsTotal += defaultOption.priceModifier;
          summaryParts.push(defaultOption.name);
        }
      }
    }

    const basePrice = product.basePrice;
    const totalPrice = basePrice + optionsTotal;
    const monthlyPayment = Math.ceil(totalPrice / 36); // 36 month leasing

    const response: ApiResponse<ConfiguratorResponse> = {
      success: true,
      data: {
        basePrice,
        optionsTotal,
        totalPrice,
        monthlyPayment,
        breakdown,
        configurationSummary: summaryParts.join(" | "),
      },
      error: null,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error calculating configuration:", error);

    // Handle JSON parse errors
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
          message: "Failed to calculate configuration price",
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
 * GET /api/configurator
 * Returns all available configuration options
 */
export async function GET(): Promise<
  NextResponse<ApiResponse<Record<string, ConfigOptionGroup>>>
> {
  try {
    const configOptions = allConfigOptions as ConfigOptionsMap;

    return NextResponse.json(
      {
        success: true,
        data: configOptions,
        error: null,
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching config options:", error);

    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch configuration options",
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}
