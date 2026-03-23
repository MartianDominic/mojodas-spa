import { NextRequest, NextResponse } from "next/server";
import type {
  ApiResponse,
  CreateCheckoutRequest,
} from "@/types/api";
import type { Order, CheckoutData } from "@/types/cart";

/**
 * Validates email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates Lithuanian phone number format
 * Accepts: +370XXXXXXXX, 8XXXXXXXX, 370XXXXXXXX
 */
function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s\-()]/g, "");
  const phoneRegex = /^(\+?370|8)\d{8}$/;
  return phoneRegex.test(cleanPhone);
}

/**
 * Validates Lithuanian postal code format
 * Format: LT-XXXXX or XXXXX
 */
function isValidPostalCode(postalCode: string): boolean {
  const postalRegex = /^(LT-?)?\d{5}$/;
  return postalRegex.test(postalCode);
}

/**
 * Validates VAT number format
 * Lithuanian VAT: LT followed by 9 or 12 digits
 */
function isValidVatNumber(vatNumber: string): boolean {
  const vatRegex = /^LT\d{9}(\d{3})?$/;
  return vatRegex.test(vatNumber.replace(/\s/g, ""));
}

/**
 * Generates a unique order ID
 */
function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${randomPart}`;
}

/**
 * Generates a human-readable order number
 */
function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `MJ${year}${month}${day}-${random}`;
}

/**
 * Calculates estimated delivery date
 * For custom spa orders: 8-12 weeks from order date
 */
function calculateEstimatedDelivery(): string {
  const date = new Date();
  // Add 10 weeks (70 days) as average
  date.setDate(date.getDate() + 70);
  return date.toISOString();
}

/**
 * Validates checkout data
 */
function validateCheckoutData(
  data: CheckoutData
): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate customer information
  if (!data.customer.firstName || data.customer.firstName.trim().length < 2) {
    errors.push({
      field: "customer.firstName",
      message: "Vardas turi būti bent 2 simbolių ilgio",
    });
  }

  if (!data.customer.lastName || data.customer.lastName.trim().length < 2) {
    errors.push({
      field: "customer.lastName",
      message: "Pavardė turi būti bent 2 simbolių ilgio",
    });
  }

  if (!data.customer.email) {
    errors.push({
      field: "customer.email",
      message: "El. pašto adresas yra privalomas",
    });
  } else if (!isValidEmail(data.customer.email)) {
    errors.push({
      field: "customer.email",
      message: "Neteisingas el. pašto adresas",
    });
  }

  if (!data.customer.phone) {
    errors.push({
      field: "customer.phone",
      message: "Telefono numeris yra privalomas",
    });
  } else if (!isValidPhone(data.customer.phone)) {
    errors.push({
      field: "customer.phone",
      message: "Neteisingas telefono numeris (pvz.: +37060012345)",
    });
  }

  // Validate VAT number if company is provided
  if (data.customer.company && data.customer.vatNumber) {
    if (!isValidVatNumber(data.customer.vatNumber)) {
      errors.push({
        field: "customer.vatNumber",
        message: "Neteisingas PVM mokėtojo kodas (pvz.: LT123456789)",
      });
    }
  }

  // Validate delivery information
  if (!data.delivery.address || data.delivery.address.trim().length < 5) {
    errors.push({
      field: "delivery.address",
      message: "Adresas turi būti bent 5 simbolių ilgio",
    });
  }

  if (!data.delivery.city || data.delivery.city.trim().length < 2) {
    errors.push({
      field: "delivery.city",
      message: "Miestas yra privalomas",
    });
  }

  if (!data.delivery.postalCode) {
    errors.push({
      field: "delivery.postalCode",
      message: "Pašto kodas yra privalomas",
    });
  } else if (!isValidPostalCode(data.delivery.postalCode)) {
    errors.push({
      field: "delivery.postalCode",
      message: "Neteisingas pašto kodas (pvz.: LT-12345 arba 12345)",
    });
  }

  if (data.delivery.country !== "LT") {
    errors.push({
      field: "delivery.country",
      message: "Šiuo metu pristatome tik Lietuvoje",
    });
  }

  // Validate payment information
  const validPaymentMethods = ["banklink", "card", "leasing"];
  if (!validPaymentMethods.includes(data.payment.method)) {
    errors.push({
      field: "payment.method",
      message: "Neteisingas mokėjimo būdas",
    });
  }

  if (data.payment.method === "leasing" && data.payment.leasingTerm) {
    const validTerms = [12, 24, 36, 48];
    if (!validTerms.includes(data.payment.leasingTerm)) {
      errors.push({
        field: "payment.leasingTerm",
        message: "Neteisingas lizingo terminas",
      });
    }
  }

  // Validate cart
  if (!data.cart.items || data.cart.items.length === 0) {
    errors.push({
      field: "cart.items",
      message: "Krepšelis negali būti tuščias",
    });
  }

  if (data.cart.total <= 0) {
    errors.push({
      field: "cart.total",
      message: "Užsakymo suma turi būti didesnė už 0",
    });
  }

  // Validate terms acceptance
  if (!data.agreedToTerms) {
    errors.push({
      field: "agreedToTerms",
      message: "Privalote sutikti su pardavimo sąlygomis",
    });
  }

  return errors;
}

/**
 * POST /api/checkout
 * Create a new order from checkout data
 *
 * Request body:
 * - checkoutData: CheckoutData (customer, delivery, payment, cart)
 *
 * Returns:
 * - Order confirmation with order ID and number
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<Order>>> {
  try {
    const body = (await request.json()) as CreateCheckoutRequest;

    // Validate request structure
    if (!body.checkoutData) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "INVALID_REQUEST",
            message: "Užsakymo duomenys yra privalomi",
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        },
        { status: 400 }
      );
    }

    // Validate checkout data
    const validationErrors = validateCheckoutData(body.checkoutData);

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "VALIDATION_ERROR",
            message: "Patikrinkite įvestus duomenis",
            details: validationErrors.reduce(
              (acc, err) => ({
                ...acc,
                [err.field]: err.message,
              }),
              {} as Record<string, string>
            ),
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        },
        { status: 400 }
      );
    }

    // Sanitize input data
    const sanitizedCustomer = {
      firstName: body.checkoutData.customer.firstName.trim(),
      lastName: body.checkoutData.customer.lastName.trim(),
      email: body.checkoutData.customer.email.trim().toLowerCase(),
      phone: body.checkoutData.customer.phone.replace(/[\s\-()]/g, ""),
      company: body.checkoutData.customer.company?.trim() || undefined,
      vatNumber: body.checkoutData.customer.vatNumber?.trim() || undefined,
    };

    const sanitizedDelivery = {
      address: body.checkoutData.delivery.address.trim(),
      city: body.checkoutData.delivery.city.trim(),
      postalCode: body.checkoutData.delivery.postalCode.trim(),
      country: "LT" as const,
      notes: body.checkoutData.delivery.notes?.trim() || undefined,
    };

    // Generate order IDs
    const orderId = generateOrderId();
    const orderNumber = generateOrderNumber();
    const timestamp = new Date().toISOString();

    // Create order object
    const order: Order = {
      id: orderId,
      orderNumber,
      status: "pending",
      customer: sanitizedCustomer,
      delivery: sanitizedDelivery,
      payment: body.checkoutData.payment,
      items: body.checkoutData.cart.items,
      subtotal: body.checkoutData.cart.subtotal,
      tax: body.checkoutData.cart.tax,
      shipping: body.checkoutData.cart.shipping,
      total: body.checkoutData.cart.total,
      createdAt: timestamp,
      updatedAt: timestamp,
      estimatedDelivery: calculateEstimatedDelivery(),
    };

    // TODO: In production, this would:
    // 1. Store the order in a database
    // 2. Process payment based on payment method
    // 3. Send confirmation email to customer
    // 4. Send notification to sales/manufacturing team
    // 5. Integrate with ERP system
    // 6. Update inventory/production queue
    // 7. Generate invoice

    // Log the order for now (would be database insert in production)
    console.log("New Order Created:", {
      orderId: order.id,
      orderNumber: order.orderNumber,
      customer: `${sanitizedCustomer.firstName} ${sanitizedCustomer.lastName}`,
      email: sanitizedCustomer.email,
      total: order.total,
      itemCount: order.items.length,
      paymentMethod: order.payment.method,
      timestamp,
    });

    // Success response
    return NextResponse.json(
      {
        success: true,
        data: order,
        error: null,
        meta: {
          timestamp,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "INVALID_JSON",
            message: "Neteisinga užklausos forma",
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
          message: "Nepavyko sukurti užsakymo. Bandykite vėliau.",
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
 * GET /api/checkout
 * Method not allowed for security
 */
export async function GET(): Promise<NextResponse<ApiResponse<never>>> {
  return NextResponse.json(
    {
      success: false,
      data: null,
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: "GET method is not allowed for this endpoint",
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status: 405 }
  );
}
