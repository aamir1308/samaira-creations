"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ChevronLeft, ChevronRight, Check, Truck, RotateCcw, Shield } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { products, bundles } from "@/lib/data";
import { CATEGORY_LABELS, AGE_GROUP_LABELS, type AgeGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const [selectedAge, setSelectedAge] = useState<AgeGroup | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--canvas)]">
        <Header />
        <main className="pt-16">
          <section className="py-16 md:py-20">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
              <h1 className="text-2xl font-medium text-[var(--ink)] mb-4">
                Product Not Found
              </h1>
              <p className="text-[var(--muted)] mb-8">
                The product you&apos;re looking for doesn&apos;t exist.
              </p>
              <Button asChild>
                <Link href="/products">Browse All Products</Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const selectedAgeLabel = selectedAge ? AGE_GROUP_LABELS[selectedAge] : "Select Size";
  const selectedDesignLabel = selectedDesign || product.designs?.[0] || "Select Design";

  const handleWhatsAppOrder = () => {
    const message = `Hello SamAira Creations,

I would like to place an order.

Product Name: ${product.name}
SKU: ${product.sku}
Size: ${selectedAgeLabel}
Design: ${selectedDesignLabel}
Quantity: 1

Please share availability and next steps.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const recommendedBundles = bundles.filter((bundle) =>
    bundle.products.some((p) => p.category === product.category)
  ).slice(0, 2);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <Header />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-[var(--surface-soft)] py-4">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <Link href="/" className="hover:text-[var(--ink)]">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-[var(--ink)]">Products</Link>
              <span>/</span>
              <Link href={`/products?category=${product.category}`} className="hover:text-[var(--ink)]">
                {CATEGORY_LABELS[product.category]}
              </Link>
              <span>/</span>
              <span className="text-[var(--ink)]">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <section className="py-8 md:py-12">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-[24px] bg-[var(--surface-card)] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl">👶</span>
                  </div>
                  
                  {/* Image Navigation */}
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : 0))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--canvas)]/80 backdrop-blur-sm flex items-center justify-center hover:bg-[var(--canvas)] transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-[var(--ink)]" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev < (product.images.length || 1) - 1 ? prev + 1 : prev))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--canvas)]/80 backdrop-blur-sm flex items-center justify-center hover:bg-[var(--canvas)] transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-[var(--ink)]" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isOrganic && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--brand-mint)] text-[var(--brand-teal)]">
                        Organic
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--brand-ochre)] text-[var(--ink)]">
                        Best Seller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--brand-peach)] text-[var(--ink)]">
                        New
                      </span>
                    )}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="flex gap-3 justify-center">
                  {(product.images.length > 0 ? product.images : ["/placeholder"]).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "w-16 h-16 rounded-[12px] bg-[var(--surface-card)] overflow-hidden border-2 transition-colors",
                        currentImageIndex === index ? "border-[var(--ink)]" : "border-transparent"
                      )}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl">👶</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <p className="text-sm text-[var(--muted)] mb-2">
                    {CATEGORY_LABELS[product.category]}
                  </p>
                  <h1 className="text-3xl md:text-4xl font-medium text-[var(--ink)] mb-4">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-semibold text-[var(--ink)]">
                      €{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-[var(--muted)] line-through">
                        €{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--muted-soft)]">
                    SKU: {product.sku}
                  </p>
                </div>

                {/* Design Selection */}
                {product.designs && product.designs.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--ink)] mb-3">
                      Design: <span className="font-normal text-[var(--muted)]">{selectedDesignLabel}</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.designs.map((design) => (
                        <button
                          key={design}
                          onClick={() => setSelectedDesign(design)}
                          className={cn(
                            "px-4 py-2 rounded-[12px] text-sm font-medium transition-colors",
                            selectedDesign === design || (!selectedDesign && design === product.designs?.[0])
                              ? "bg-[var(--ink)] text-[var(--on-primary)]"
                              : "bg-[var(--surface-card)] text-[var(--body)] hover:bg-[var(--surface-strong)]"
                          )}
                        >
                          {design}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                <div>
                  <h3 className="text-sm font-semibold text-[var(--ink)] mb-3">
                    Size: <span className="font-normal text-[var(--muted)]">{selectedAgeLabel}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ageGroups.map((age) => (
                      <button
                        key={age}
                        onClick={() => setSelectedAge(age)}
                        className={cn(
                          "px-4 py-2 rounded-[12px] text-sm font-medium transition-colors",
                          selectedAge === age
                            ? "bg-[var(--ink)] text-[var(--on-primary)]"
                            : "bg-[var(--surface-card)] text-[var(--body)] hover:bg-[var(--surface-strong)]"
                        )}
                      >
                        {AGE_GROUP_LABELS[age]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material & Care */}
                <div className="p-6 rounded-[16px] bg-[var(--surface-card)] space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--muted)]">Material</span>
                    <span className="text-sm font-medium text-[var(--ink)]">{product.material}</span>
                  </div>
                  {product.careInstructions && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--muted)]">Care</span>
                      <span className="text-sm font-medium text-[var(--ink)]">{product.careInstructions}</span>
                    </div>
                  )}
                </div>

                {/* Order Button */}
                <Button size="lg" className="w-full" onClick={handleWhatsAppOrder}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Order via WhatsApp
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[var(--brand-mint)] flex items-center justify-center">
                      <Truck className="w-5 h-5 text-[var(--brand-teal)]" />
                    </div>
                    <p className="text-xs text-[var(--muted)]">Free Shipping</p>
                    <p className="text-xs text-[var(--ink)]">Orders over €50</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[var(--surface-card)] flex items-center justify-center">
                      <RotateCcw className="w-5 h-5 text-[var(--brand-teal)]" />
                    </div>
                    <p className="text-xs text-[var(--muted)]">Easy Returns</p>
                    <p className="text-xs text-[var(--ink)]">14-day policy</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[var(--surface-card)] flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[var(--brand-teal)]" />
                    </div>
                    <p className="text-xs text-[var(--muted)]">Safe & Organic</p>
                    <p className="text-xs text-[var(--ink)]">GOTS certified</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Description */}
        <section className="py-12 bg-[var(--surface-soft)]">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-[var(--ink)] mb-4">
                Product Details
              </h2>
              <p className="text-[var(--body)] leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </section>

        {/* Organic Benefits */}
        <section className="py-12 bg-[var(--canvas)]">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            <div className="p-8 rounded-[24px] bg-[var(--surface-card)]">
              <h3 className="text-xl font-semibold text-[var(--ink)] mb-6">
                Why Choose Organic?
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--brand-mint)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[var(--brand-teal)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--ink)]">Gentle on Skin</p>
                    <p className="text-sm text-[var(--muted)]">Perfect for sensitive skin and babies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--brand-mint)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[var(--brand-teal)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--ink)]">Breathable Fabric</p>
                    <p className="text-sm text-[var(--muted)]">Natural temperature regulation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--brand-mint)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[var(--brand-teal)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--ink)]">Eco-Friendly</p>
                    <p className="text-sm text-[var(--muted)]">GOTS certified organic production</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--brand-mint)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[var(--brand-teal)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--ink)]">Durable Quality</p>
                    <p className="text-sm text-[var(--muted)]">Built to last through countless washes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bundle Recommendations */}
        {recommendedBundles.length > 0 && (
          <section className="py-12 bg-[var(--surface-soft)]">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-medium text-[var(--ink)] mb-2">
                  Complete Your Bundle
                </h2>
                <p className="text-[var(--muted)]">
                  Save more with our curated bundle sets
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {recommendedBundles.map((bundle) => (
                  <motion.div
                    key={bundle.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="p-6 rounded-[24px] bg-[var(--brand-teal)] text-white"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">{bundle.name}</h3>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                        Save €{bundle.savings}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm mb-4">
                      {bundle.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {bundle.products.map((p) => (
                        <span key={p.id} className="px-3 py-1 rounded-full text-xs bg-white/20">
                          {p.name.split(" - ")[0]}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold">€{bundle.price}</span>
                      <Button
                        variant="onColor"
                        size="sm"
                        onClick={() => {
                          const msg = `Hello SamAira Creations, I'm interested in the ${bundle.name}.`;
                          window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Order Bundle
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-[var(--canvas)]">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-medium text-[var(--ink)]">
                  You May Also Like
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group block bg-[var(--canvas)] rounded-[16px] overflow-hidden border border-[var(--hairline)] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-square bg-[var(--surface-card)] relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">👶</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[var(--muted)] mb-1">
                        {CATEGORY_LABELS[relatedProduct.category]}
                      </p>
                      <h3 className="text-sm font-semibold text-[var(--ink)] line-clamp-2 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <span className="text-base font-semibold text-[var(--ink)]">
                        €{relatedProduct.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
