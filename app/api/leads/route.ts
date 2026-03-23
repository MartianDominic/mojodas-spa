import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse, LeadFormRequest, LeadFormResponse } from "@/types/api";

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
 * Generates a unique lead ID
 */
function generateLeadId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `LEAD-${timestamp}-${randomPart}`.toUpperCase();
}

/**
 * POST /api/leads
 * Submit B2B lead form
 *
 * Request body:
 * - companyName: string (required)
 * - contactName: string (required)
 * - email: string (required, valid email)
 * - phone: string (required, valid Lithuanian phone)
 * - message: string (required, min 10 chars)
 * - interestedProducts?: string[]
 * - estimatedQuantity?: string
 * - timeline?: string
 * - businessType?: "hotel" | "glamping" | "wellness" | "other"
 * - preferredContact?: "email" | "phone"
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<LeadFormResponse>>> {
  try {
    const body = (await request.json()) as LeadFormRequest;

    // Validation errors array
    const validationErrors: Array<{ field: string; message: string }> = [];

    // Required field validation
    if (!body.companyName || body.companyName.trim().length < 2) {
      validationErrors.push({
        field: "companyName",
        message: "Imonės pavadinimas turi būti bent 2 simbolių ilgio",
      });
    }

    if (!body.contactName || body.contactName.trim().length < 2) {
      validationErrors.push({
        field: "contactName",
        message: "Kontaktinio asmens vardas turi būti bent 2 simbolių ilgio",
      });
    }

    if (!body.email) {
      validationErrors.push({
        field: "email",
        message: "El. pašto adresas yra privalomas",
      });
    } else if (!isValidEmail(body.email)) {
      validationErrors.push({
        field: "email",
        message: "Neteisingas el. pašto adresas",
      });
    }

    if (!body.phone) {
      validationErrors.push({
        field: "phone",
        message: "Telefono numeris yra privalomas",
      });
    } else if (!isValidPhone(body.phone)) {
      validationErrors.push({
        field: "phone",
        message: "Neteisingas telefono numeris (pvz.: +37060012345)",
      });
    }

    if (!body.message || body.message.trim().length < 10) {
      validationErrors.push({
        field: "message",
        message: "Žinutė turi būti bent 10 simbolių ilgio",
      });
    }

    // Return validation errors if any
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

    // Sanitize input
    const sanitizedData = {
      companyName: body.companyName.trim(),
      contactName: body.contactName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.replace(/[\s\-()]/g, ""),
      message: body.message.trim(),
      interestedProducts: body.interestedProducts || [],
      estimatedQuantity: body.estimatedQuantity?.trim() || null,
      timeline: body.timeline?.trim() || null,
      businessType: body.businessType || null,
      preferredContact: body.preferredContact || "email",
    };

    // Generate lead ID
    const leadId = generateLeadId();

    // TODO: In production, this would:
    // 1. Store the lead in a database
    // 2. Send notification email to sales team
    // 3. Send confirmation email to the customer
    // 4. Integrate with CRM (e.g., HubSpot, Salesforce)

    // Log the lead for now (would be database insert in production)
    console.log("New B2B Lead Received:", {
      leadId,
      ...sanitizedData,
      submittedAt: new Date().toISOString(),
    });

    // Success response
    return NextResponse.json(
      {
        success: true,
        data: {
          success: true,
          leadId,
          message:
            "Ačiū už jūsų užklausą! Mūsų komanda susisieks su jumis artimiausiu metu.",
        },
        error: null,
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting lead:", error);

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
          message: "Nepavyko išsiųsti užklausos. Bandykite vėliau.",
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
 * GET /api/leads
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
