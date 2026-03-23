import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import {
  ProductGallery,
  TechSpecs,
  ProductInfo,
  RelatedProducts,
} from "@/components/product";
import {
  getAllScrapedProductSlugs,
  getScrapedProductBySlug,
  getScrapedRelatedProducts,
} from "@/lib/data/scraped-products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all products from scraped data
 */
export async function generateStaticParams() {
  const slugs = getAllScrapedProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getScrapedProductBySlug(slug);

  if (!product) {
    return {
      title: "Produktas nerastas",
    };
  }

  const seo = product.seo;

  return {
    title: seo?.title || `${product.name} | MojoDas SPA`,
    description: seo?.description || product.shortDescription || product.longDescription,
    keywords: seo?.keywords ? [...seo.keywords] : [],
    openGraph: {
      title: seo?.title || product.name,
      description: seo?.description || product.shortDescription,
      type: "website",
      locale: "lt_LT",
      images: product.images[0]
        ? [
            {
              url: product.images[0].url,
              alt: product.images[0].alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.title || product.name,
      description: seo?.description || product.shortDescription,
      images: product.images[0] ? [product.images[0].url] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getScrapedProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getScrapedRelatedProducts(product, 4);

  return (
    <>
      <Header />
      <main className="pt-24 pb-32">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Column: Product Imagery */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="lg:sticky lg:top-32 space-y-8">
                <ProductGallery
                  images={product.images}
                  productName={product.name}
                  badge={product.tagline}
                />
                <TechSpecs
                  specs={product.specs}
                  capacity={product.capacity}
                />
              </div>
            </div>

            {/* Right Column: Product Info */}
            <div className="lg:col-span-5 xl:col-span-4">
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Product Description */}
          <section className="mt-24 max-w-3xl">
            <h2 className="font-headline text-2xl mb-6">Apie produkta</h2>
            <p className="text-secondary leading-relaxed">
              {product.longDescription || product.shortDescription}
            </p>
          </section>

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
