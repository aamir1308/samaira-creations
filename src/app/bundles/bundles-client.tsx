"use client";

import { motion } from "framer-motion";
import { Gift, MessageCircle, Tag, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import type { Bundle } from "@/lib/types";

interface BundlesClientProps {
  bundles: Bundle[];
}

export function BundlesClient({ bundles }: BundlesClientProps) {
  const handleWhatsAppOrder = (bundleName: string) => {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const message = `Hello SamAira Creations, I'm interested in the ${bundleName}. Please share availability and next steps.`;
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const featuredBundles = bundles.filter((b) => b.isFeatured);
  const giftBundles = bundles.filter((b) => b.isPerfectGift);

  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <Header />
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--ink)] mb-4">
              Curated Bundle Sets
            </h1>
            <p className="text-lg text-[var(--body)] max-w-2xl mx-auto">
              Shop our specially curated bundles and save on everyday essentials.
              Perfect for your little one or as a thoughtful gift.
            </p>
          </div>
        </section>

        {/* Featured Bundles */}
        {featuredBundles.length > 0 && (
          <section className="py-16 md:py-20">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="text-center mb-12">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-3">
                  Popular Choices
                </p>
                <h2 className="text-3xl md:text-4xl font-medium text-[var(--ink)]">
                  Featured Bundles
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredBundles.map((bundle, index) => (
                  <motion.div
                    key={bundle.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative rounded-[24px] p-6 bg-[var(--brand-teal)] text-[var(--on-dark)]"
                  >
                    <div className="flex gap-2 mb-4">
                      {bundle.isPerfectGift && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                          <Gift className="w-3 h-3" />
                          Perfect Gift
                        </span>
                      )}
                      {bundle.savings && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                          <Tag className="w-3 h-3" />
                          Save €{bundle.savings}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2">
                      {bundle.name}
                    </h3>
                    <p className="text-sm text-white/80 mb-4">
                      {bundle.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {bundle.products.map((product) => (
                        <span
                          key={product.id}
                          className="px-3 py-1 rounded-full text-xs bg-white/20 text-white"
                        >
                          {product.name.split(" - ")[0]}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-2xl font-semibold text-white">
                          €{bundle.price}
                        </span>
                        {bundle.originalPrice > bundle.price && (
                          <span className="ml-2 text-sm text-white/60 line-through">
                            €{bundle.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="onColor"
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
        )}

        {/* Gift Bundles */}
        {giftBundles.length > 0 && (
          <section className="py-16 md:py-20 bg-[var(--surface-card)]">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="text-center mb-12">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-3">
                  Ideal for Gifting
                </p>
                <h2 className="text-3xl md:text-4xl font-medium text-[var(--ink)]">
                  Gift Sets
                </h2>
                <p className="text-base text-[var(--body)] mt-4 max-w-[36rem] mx-auto">
                  Beautifully curated sets perfect for baby showers, newborns,
                  and special occasions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {giftBundles.map((bundle, index) => (
                  <motion.div
                    key={bundle.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row rounded-[24px] bg-[var(--canvas)] border border-[var(--hairline)] overflow-hidden"
                  >
                    <div className="md:w-1/3 bg-[var(--surface-soft)] flex items-center justify-center p-8">
                      <div className="text-6xl">🎁</div>
                    </div>

                    <div className="md:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Gift className="w-4 h-4 text-[var(--brand-pink)]" />
                          <span className="text-xs font-medium text-[var(--brand-pink)]">
                            Perfect Gift
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-[var(--ink)] mb-2">
                          {bundle.name}
                        </h3>
                        <p className="text-sm text-[var(--muted)] mb-4">
                          {bundle.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {bundle.products.map((product) => (
                            <span
                              key={product.id}
                              className="px-3 py-1 rounded-full text-xs bg-[var(--surface-card)] text-[var(--body)]"
                            >
                              {product.name.split(" - ")[0]}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <span className="text-xl font-semibold text-[var(--ink)]">
                            €{bundle.price}
                          </span>
                          {bundle.originalPrice > bundle.price && (
                            <span className="ml-2 text-sm text-[var(--muted)] line-through">
                              €{bundle.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleWhatsAppOrder(bundle.name)}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Order via WhatsApp
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Bundles */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium text-[var(--ink)]">
                All Bundle Sets
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bundles.map((bundle, index) => (
                <motion.div
                  key={bundle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-[var(--canvas)] rounded-[16px] border border-[var(--hairline)] p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[var(--ink)]">
                      {bundle.name}
                    </h3>
                    {bundle.savings && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-[var(--brand-ochre)] text-[var(--ink)]">
                        Save €{bundle.savings}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[var(--muted)] mb-4">
                    {bundle.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {bundle.products.slice(0, 3).map((product) => (
                      <span
                        key={product.id}
                        className="text-xs text-[var(--muted-soft)]"
                      >
                        {product.name.split(" - ")[0]}
                      </span>
                    ))}
                    {bundle.products.length > 3 && (
                      <span className="text-xs text-[var(--muted-soft)]">
                        +{bundle.products.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--hairline)]">
                    <div>
                      <span className="text-lg font-semibold text-[var(--ink)]">
                        €{bundle.price}
                      </span>
                      {bundle.originalPrice > bundle.price && (
                        <span className="ml-2 text-sm text-[var(--muted)] line-through">
                          €{bundle.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleWhatsAppOrder(bundle.name)}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bundle Info */}
        <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--brand-mint)] flex items-center justify-center">
                  <Tag className="w-8 h-8 text-[var(--brand-teal)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--ink)] mb-2">
                  Special Savings
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Save up to €13 when you buy our curated bundles instead of individual items.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--brand-lavender)] flex items-center justify-center">
                  <Gift className="w-8 h-8 text-[var(--ink)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--ink)] mb-2">
                  Perfect for Gifting
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Beautifully packaged sets ideal for baby showers and special occasions.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--brand-peach)] flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-[var(--ink)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--ink)] mb-2">
                  Easy Ordering
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Simply tap &quot;Order via WhatsApp&quot; and we&apos;ll help you complete your purchase.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
