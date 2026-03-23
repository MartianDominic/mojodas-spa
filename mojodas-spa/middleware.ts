import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Redirect patterns for URL normalization and legacy URL support
 */
const REDIRECT_PATTERNS: Array<{
  source: RegExp;
  destination: string | ((match: RegExpMatchArray) => string);
  permanent: boolean;
}> = [
  // Legacy product URLs
  {
    source: /^\/product\/(.+)$/,
    destination: (match) => `/produktas/${match[1]}`,
    permanent: true,
  },
  {
    source: /^\/products\/(.+)$/,
    destination: (match) => `/produktas/${match[1]}`,
    permanent: true,
  },

  // Legacy catalog URLs
  {
    source: /^\/catalog\/?$/,
    destination: "/katalogas",
    permanent: true,
  },
  {
    source: /^\/shop\/?$/,
    destination: "/katalogas",
    permanent: true,
  },

  // Legacy cart/checkout URLs
  {
    source: /^\/cart\/?$/,
    destination: "/krepselis",
    permanent: true,
  },
  {
    source: /^\/checkout\/?$/,
    destination: "/atsiskaitymas",
    permanent: true,
  },

  // Legacy contact URLs
  {
    source: /^\/contact\/?$/,
    destination: "/kontaktai",
    permanent: true,
  },

  // Legacy B2B URLs
  {
    source: /^\/business\/?$/,
    destination: "/verslui",
    permanent: true,
  },
  {
    source: /^\/b2b\/?$/,
    destination: "/verslui",
    permanent: true,
  },

  // Trailing slash normalization (remove trailing slashes)
  {
    source: /^(.+)\/$/,
    destination: (match) => match[1],
    permanent: true,
  },
];

/**
 * Protected routes that require authentication (future use)
 */
const PROTECTED_ROUTES: string[] = [
  // "/account",
  // "/orders",
];

/**
 * Routes that should not be accessible during maintenance mode
 */
const MAINTENANCE_EXCLUDED_ROUTES: string[] = [
  "/api",
  "/_next",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
];

/**
 * Check if the site is in maintenance mode
 */
function isMaintenanceMode(): boolean {
  return process.env.MAINTENANCE_MODE === "true";
}

/**
 * Middleware function
 *
 * Handles:
 * - URL redirects for legacy/alternate paths
 * - Locale detection (future i18n support)
 * - Maintenance mode
 * - Security headers
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // Static files
  ) {
    return NextResponse.next();
  }

  // Maintenance mode check
  if (isMaintenanceMode()) {
    const isExcluded = MAINTENANCE_EXCLUDED_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

    if (!isExcluded && pathname !== "/maintenance") {
      return NextResponse.redirect(new URL("/maintenance", request.url));
    }
  }

  // Check redirect patterns
  for (const pattern of REDIRECT_PATTERNS) {
    const match = pathname.match(pattern.source);

    if (match) {
      const destination =
        typeof pattern.destination === "function"
          ? pattern.destination(match)
          : pattern.destination;

      // Don't redirect if destination is same as source (prevents infinite loop)
      if (destination !== pathname) {
        return NextResponse.redirect(new URL(destination, request.url), {
          status: pattern.permanent ? 308 : 307,
        });
      }
    }
  }

  // Protected routes check (future implementation)
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    // Check for authentication token
    const token = request.cookies.get("auth-token");

    if (!token) {
      const loginUrl = new URL("/prisijungti", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Continue with request
  const response = NextResponse.next();

  // Add security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // Add locale hint for SSR
  const acceptLanguage = request.headers.get("accept-language");
  const preferredLocale = parseAcceptLanguage(acceptLanguage);
  response.headers.set("X-Preferred-Locale", preferredLocale);

  return response;
}

/**
 * Parse Accept-Language header to determine preferred locale
 */
function parseAcceptLanguage(header: string | null): string {
  if (!header) return "lt";

  // Parse quality values
  const languages = header.split(",").map((lang) => {
    const [code, quality] = lang.trim().split(";q=");
    return {
      code: code.split("-")[0].toLowerCase(), // Get primary language tag
      quality: quality ? parseFloat(quality) : 1.0,
    };
  });

  // Sort by quality
  languages.sort((a, b) => b.quality - a.quality);

  // Check if Lithuanian is preferred
  const ltIndex = languages.findIndex((l) => l.code === "lt");
  const enIndex = languages.findIndex((l) => l.code === "en");

  // Default to Lithuanian for this site
  if (ltIndex === -1 && enIndex === -1) {
    return "lt";
  }

  if (ltIndex !== -1 && (enIndex === -1 || ltIndex < enIndex)) {
    return "lt";
  }

  // If English is strongly preferred, still default to Lithuanian
  // (site is Lithuanian-first)
  return "lt";
}

/**
 * Configure which paths the middleware runs on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
