"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Filter, X } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, AGE_GROUP_LABELS, type Product, type ProductCategory, type AgeGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

const allCategories = Object.keys(CATEGORY_LABELS) as ProductCategory[];
const allAgeGroups = Object.keys(AGE_GROUP_LABELS) as AgeGroup[];

interface ProductsClientProps {
  initialProducts: Product[];
}

export function ProductsClient({ initialProducts }: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [selectedAge, setSelectedAge] = useState<AgeGroup | "all">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "new">("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = initialProducts
    .filter((p) => selectedCategory === "all" || p.category === selectedCategory)
    .filter((p) => selectedAge === "all" || p.ageGroups.includes(selectedAge))
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "new":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      }
    });

  const handleWhatsAppOrder = (product: Product) => {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const message = `Hello SamAira Creations,

I would like to place an order.

Product Name: ${product.name}
SKU: ${product.sku}
Size:
Quantity:
Color/Design: ${product.designs?.[0] || "As available"}

Please share availability and next steps.`;
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <Header />
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--ink)] mb-4">
              Shop All Products
            </h1>
            <p className="text-lg text-[var(--body)] max-w-2xl mx-auto">
              Browse our complete collection of premium organic cotton clothing and accessories.
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-12 md:py-16">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-6">
              <Button
                variant="secondary"
                onClick={() => setMobileFiltersOpen(true)}
                className="w-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters & Sort
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters Sidebar - Desktop */}
              <aside className="hidden md:block w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-8">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--ink)] mb-4 uppercase tracking-wider">
                      Category
                    </h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className={cn(
                          "block w-full text-left px-3 py-2 rounded-[8px] text-sm transition-colors",
                          selectedCategory === "all"
                            ? "bg-[var(--surface-card)] text-[var(--ink)] font-medium"
                            : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]"
                        )}
                      >
                        All Products
                      </button>
                      {allCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={cn(
                            "block w-full text-left px-3 py-2 rounded-[8px] text-sm transition-colors",
                            selectedCategory === cat
                              ? "bg-[var(--surface-card)] text-[var(--ink)] font-medium"
                              : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]"
                          )}
                        >
                          {CATEGORY_LABELS[cat]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[var(--ink)] mb-4 uppercase tracking-wider">
                      Age Group
                    </h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedAge("all")}
                        className={cn(
                          "block w-full text-left px-3 py-2 rounded-[8px] text-sm transition-colors",
                          selectedAge === "all"
                            ? "bg-[var(--surface-card)] text-[var(--ink)] font-medium"
                            : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]"
                        )}
                      >
                        All Ages
                      </button>
                      {allAgeGroups.map((age) => (
                        <button
                          key={age}
                          onClick={() => setSelectedAge(age)}
                          className={cn(
                            "block w-full text-left px-3 py-2 rounded-[8px] text-sm transition-colors",
                            selectedAge === age
                              ? "bg-[var(--surface-card)] text-[var(--ink)] font-medium"
                              : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]"
                          )}
                        >
                          {AGE_GROUP_LABELS[age]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-[var(--muted)]">
                    {filteredProducts.length} products
                  </p>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="px-3 py-2 rounded-[8px] bg-[var(--canvas)] border border-[var(--hairline)] text-sm text-[var(--ink)]"
                  >
                    <option value="featured">Featured</option>
                    <option value="new">New Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group bg-[var(--canvas)] rounded-[16px] overflow-hidden border border-[var(--hairline)] hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-square bg-[var(--surface-card)] relative overflow-hidden">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl">👶</span>
                          </div>
                        )}

                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.isOrganic && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-[var(--brand-mint)] text-[var(--brand-teal)]">
                              Organic
                            </span>
                          )}
                          {product.isNew && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-[var(--brand-peach)] text-[var(--ink)]">
                              New
                            </span>
                          )}
                          {product.isBestSeller && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-[var(--brand-ochre)] text-[var(--ink)]">
                              Best Seller
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="text-xs text-[var(--muted)] mb-1">
                          {CATEGORY_LABELS[product.category]}
                        </p>
                        <h3 className="text-base font-semibold text-[var(--ink)] mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[var(--muted-soft)] mb-3">
                          {product.material}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-semibold text-[var(--ink)]">
                            €{product.price}
                          </span>
                        </div>

                        <Button
                          className="w-full"
                          variant="secondary"
                          size="sm"
                          onClick={() => handleWhatsAppOrder(product)}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Order via WhatsApp
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-lg text-[var(--muted)]">
                      No products found matching your filters.
                    </p>
                    <Button
                      variant="secondary"
                      className="mt-4"
                      onClick={() => {
                        setSelectedCategory("all");
                        setSelectedAge("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[var(--canvas)] rounded-t-[24px] p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-[var(--ink)]">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 text-[var(--muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-[var(--ink)] mb-3">Category</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition-colors",
                    selectedCategory === "all"
                      ? "bg-[var(--ink)] text-[var(--on-primary)]"
                      : "bg-[var(--surface-card)] text-[var(--body)]"
                  )}
                >
                  All
                </button>
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm transition-colors",
                      selectedCategory === cat
                        ? "bg-[var(--ink)] text-[var(--on-primary)]"
                        : "bg-[var(--surface-card)] text-[var(--body)]"
                    )}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-[var(--ink)] mb-3">Age Group</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedAge("all")}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition-colors",
                    selectedAge === "all"
                      ? "bg-[var(--ink)] text-[var(--on-primary)]"
                      : "bg-[var(--surface-card)] text-[var(--body)]"
                  )}
                >
                  All
                </button>
                {allAgeGroups.map((age) => (
                  <button
                    key={age}
                    onClick={() => setSelectedAge(age)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm transition-colors",
                      selectedAge === age
                        ? "bg-[var(--ink)] text-[var(--on-primary)]"
                        : "bg-[var(--surface-card)] text-[var(--body)]"
                    )}
                  >
                    {AGE_GROUP_LABELS[age]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-[var(--ink)] mb-3">Sort By</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full px-4 py-3 rounded-[12px] bg-[var(--surface-card)] border border-[var(--hairline)] text-[var(--ink)]"
              >
                <option value="featured">Featured</option>
                <option value="new">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <Button
              className="w-full"
              onClick={() => setMobileFiltersOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
