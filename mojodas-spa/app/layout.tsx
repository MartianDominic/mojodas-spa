import type { Metadata } from "next";
import { Noto_Serif, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/cart";

const notoSerif = Noto_Serif({
  subsets: ["latin", "latin-ext"],
  variable: "--font-headline",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MojoDas Spa | Ramybės Inžinerija",
    template: "%s | MojoDas Spa",
  },
  description:
    "Premium klasės masažiniai kubilai ir SPA sprendimai. Pagaminta Lietuvoje su 5 metų garantija. AISI 316 plienas, išmanus mokėjimas dalimis.",
  keywords: [
    "kubilai",
    "SPA",
    "masažiniai baseinai",
    "hot tub",
    "Lietuva",
    "MojoDas",
    "lauko kubilai",
    "malkiniai kubilai",
  ],
  authors: [{ name: "MojoDas Spa" }],
  creator: "MojoDas Spa",
  metadataBase: new URL("https://mojodasspa.com"),
  openGraph: {
    type: "website",
    locale: "lt_LT",
    siteName: "MojoDas Spa",
    title: "MojoDas Spa | Ramybės Inžinerija",
    description:
      "Premium klasės masažiniai kubilai ir SPA sprendimai. Pagaminta Lietuvoje.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MojoDas Spa | Ramybės Inžinerija",
    description:
      "Premium klasės masažiniai kubilai ir SPA sprendimai. Pagaminta Lietuvoje.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt" className={`h-full scroll-smooth ${notoSerif.variable} ${playfairDisplay.variable} ${inter.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-body antialiased">
        <div className="w-full flex-1">
          {children}
        </div>
        <CartDrawer />
      </body>
    </html>
  );
}
