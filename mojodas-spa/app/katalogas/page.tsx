import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CatalogHeader, CatalogContent, QuizBanner } from "@/components/catalog";
import { getCatalogProducts } from "@/lib/data/catalog-products";

export const metadata: Metadata = {
  title: "Katalogas | Pilna Kolekcija",
  description:
    "Lietuvoje gaminami premium klases masaziniai kubilai ir SPA sprendimai. Atraskite savo erdvei tobulai tinkanti dizaina ir talpa.",
  keywords: [
    "kubilai katalogas",
    "SPA kolekcija",
    "masaziniai baseinai",
    "hot tub",
    "Lietuva",
    "Lux Spa Nature",
    "lauko kubilai",
    "malkiniai kubilai",
    "apvalus kubilas",
    "kvadratinis kubilas",
  ],
  openGraph: {
    title: "Lux Spa Nature | Katalogas",
    description:
      "Lietuvoje gaminami premium klases masaziniai kubilai ir SPA sprendimai.",
    type: "website",
    locale: "lt_LT",
  },
};

/**
 * Catalog page - Server Component
 * Fetches products server-side and passes to client components
 */
export default function KatalogasPage() {
  // Fetch products server-side
  const products = getCatalogProducts();

  return (
    <>
      <Header />

      <main className="pt-24 md:pt-28 pb-16 bg-[#FAFAFA]">
        {/* Header Section */}
        <CatalogHeader />

        {/* Quiz Banner */}
        <QuizBanner />

        {/* Filter Bar + Product Grid */}
        <CatalogContent products={products} />
      </main>

      <Footer />
    </>
  );
}
