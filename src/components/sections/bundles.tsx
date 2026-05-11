"use client";

import { motion } from "framer-motion";
import { Gift, MessageCircle, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Bundle } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BundlesSectionProps {
  bundles: Bundle[];
}

export function BundlesSection({ bundles }: BundlesSectionProps) {
  const handleWhatsAppOrder = (bundleName: string) => {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const message = `Hello SamAira Creations, I'm interested in the ${bundleName}. Please share availability and next steps.`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="py-20 md:py-24 bg-[var(--surface-soft)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-3">
            Curated Sets
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-[var(--ink)] tracking-tight mb-4">
            Save with Our Bundles
          </h2>
          <p className="text-base text-[var(--body)] max-w-2xl mx-auto">
            Perfectly paired products at special prices. Shop our curated bundles
            and enjoy savings on everyday essentials.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative rounded-[24px] p-6 transition-all duration-300 hover:shadow-lg",
                bundle.isFeatured
                  ? "bg-[var(--brand-teal)] text-[var(--on-dark)]"
                  : "bg-[var(--canvas)] border border-[var(--hairline)]"
              )}
            >
              <div className="flex gap-2 mb-4">
                {bundle.isPerfectGift && (
                  <span className={cn(
                    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                    bundle.isFeatured ? "bg-white/20 text-white" : "bg-[var(--brand-pink)] text-white"
                  )}>
                    <Gift className="w-3 h-3" />
                    Perfect Gift
                  </span>
                )}
                {bundle.savings && (
                  <span className={cn(
                    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                    bundle.isFeatured ? "bg-white/20 text-white" : "bg-[var(--brand-ochre)] text-[var(--ink)]"
                  )}>
                    <Tag className="w-3 h-3" />
                    Save €{bundle.savings}
                  </span>
                )}
              </div>

              <h3 className={cn(
                "text-xl font-semibold mb-2",
                bundle.isFeatured ? "text-white" : "text-[var(--ink)]"
              )}>
                {bundle.name}
              </h3>
              <p className={cn(
                "text-sm mb-4",
                bundle.isFeatured ? "text-white/80" : "text-[var(--muted)]"
              )}>
                {bundle.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {bundle.products.map((product) => (
                  <span
                    key={product.id}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs",
                      bundle.isFeatured
                        ? "bg-white/20 text-white"
                        : "bg-[var(--surface-card)] text-[var(--body)]"
                    )}
                  >
                    {product.name.split(" - ")[0]}
                  </span>
                ))}
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <span className={cn(
                    "text-2xl font-semibold",
                    bundle.isFeatured ? "text-white" : "text-[var(--ink)]"
                  )}>
                    €{bundle.price}
                  </span>
                  {bundle.originalPrice > bundle.price && (
                    <span className={cn(
                      "ml-2 text-sm line-through",
                      bundle.isFeatured ? "text-white/60" : "text-[var(--muted)]"
                    )}>
                      €{bundle.originalPrice}
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  variant={bundle.isFeatured ? "onColor" : "primary"}
                  onClick={() => handleWhatsAppOrder(bundle.name)}
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
