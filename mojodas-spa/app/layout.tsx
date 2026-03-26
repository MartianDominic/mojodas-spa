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
    default: "Lux Spa Nature | Ramybės Inžinerija",
    template: "%s | Lux Spa Nature",
  },
  description:
    "Premium klasės masažiniai kubilai ir SPA sprendimai. Pagaminta Lietuvoje su 5 metų garantija. AISI 316 plienas, išmanus mokėjimas dalimis.",
  keywords: [
    "kubilai",
    "SPA",
    "masažiniai baseinai",
    "hot tub",
    "Lietuva",
    "Lux Spa Nature",
    "lauko kubilai",
    "malkiniai kubilai",
  ],
  authors: [{ name: "Lux Spa Nature" }],
  creator: "Lux Spa Nature",
  metadataBase: new URL("https://mojodasspa.com"),
  openGraph: {
    type: "website",
    locale: "lt_LT",
    siteName: "Lux Spa Nature",
    title: "Lux Spa Nature | Ramybės Inžinerija",
    description:
      "Premium klasės masažiniai kubilai ir SPA sprendimai. Pagaminta Lietuvoje.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lux Spa Nature | Ramybės Inžinerija",
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
      <body className="min-h-screen bg-surface text-on-surface font-body antialiased">
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
