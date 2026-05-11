"use client";

import { motion } from "framer-motion";
import { MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, type Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BestSellersSectionProps {
  products: Product[];
}

export function BestSellersSection({ products }: BestSellersSectionProps) {
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
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="py-20 md:py-24 bg-[var(--surface-soft)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-3">
            Customer Favorites
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-[var(--ink)] tracking-tight mb-4">
            Best Sellers
          </h2>
          <p className="text-base text-[var(--body)] max-w-2xl mx-auto">
            Our most loved pieces by parents who trust SamAira for their little ones.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
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
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs text-[var(--muted)] mb-1">
                  {CATEGORY_LABELS[product.category]}
                </p>
                <h3 className="text-base font-semibold text-[var(--ink)] mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < 4 ? "fill-[var(--brand-ochre)] text-[var(--brand-ochre)]" : "text-[var(--hairline)]"
                      )}
                    />
                  ))}
                  <span className="text-xs text-[var(--muted)] ml-1">(12)</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-semibold text-[var(--ink)]">
                      €{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-[var(--muted)] line-through">
                        €{product.originalPrice}
                      </span>
                    )}
                  </div>
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
      </div>
    </section>
  );
}
