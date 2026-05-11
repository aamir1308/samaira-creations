"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Shield, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const values = [
  {
    icon: Leaf,
    title: "Organic & Sustainable",
    description: "Every piece is crafted from GOTS-certified organic cotton, kinder to the planet and safe for your baby's delicate skin.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Designed with care and sewn with precision, each garment carries our passion for quality and comfort.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Free from harmful chemicals and synthetic dyes, our products meet the highest safety standards for children's clothing.",
  },
  {
    icon: Sparkles,
    title: "European Craftsmanship",
    description: "Proudly designed and produced in Europe, supporting ethical manufacturing and sustainable practices.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-[var(--surface-soft)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-4">
                  Our Story
                </p>
                <h1 className="text-4xl md:text-5xl font-medium text-[var(--ink)] mb-6 leading-tight">
                  Gentle Luxury for{' '}
                  <span className="text-[var(--brand-teal)]">Little Ones</span>
                </h1>
                <p className="text-lg text-[var(--body)] leading-relaxed mb-8">
                  SamAira Creations was born from a simple belief: every baby deserves to be wrapped 
                  in the softest, safest, most beautiful fabrics. We create premium organic cotton 
                  clothing that parents can trust and babies love to wear.
                </p>
                <p className="text-base text-[var(--body)] leading-relaxed">
                  Our name, SamAira, combines two cherished names with a vision of creating clothing 
                  that embodies purity, comfort, and timeless style. Each piece in our collection is 
                  designed to be gentle on sensitive skin while maintaining the elegant aesthetic 
                  modern European families desire.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square rounded-[24px] bg-[var(--surface-card)] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-[var(--canvas)] flex items-center justify-center">
                        <span className="text-6xl">👶</span>
                      </div>
                      <p className="text-sm text-[var(--muted)]">
                        Crafted with love since 2024
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-20 bg-[var(--canvas)]">
          <div className="max-w-[800px] mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-4">
                Our Mission
              </p>
              <h2 className="text-3xl md:text-4xl font-medium text-[var(--ink)] mb-6">
                Why Organic Cotton Matters
              </h2>
              <p className="text-lg text-[var(--body)] leading-relaxed mb-8">
                Conventional cotton farming uses up to 16% of the world&apos;s pesticides, affecting 
                soil health, water systems, and the farmers who work the fields. We choose organic 
                cotton because it&apos;s better for the earth, better for the people who grow it, 
                and better for your baby&apos;s skin.
              </p>
              <p className="text-base text-[var(--body)] leading-relaxed">
                Our GOTS-certified organic cotton is grown without toxic pesticides or synthetic 
                fertilizers. The result is a fabric that naturally breathes, absorbs moisture, 
                and feels impossibly soft against delicate skin.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-3">
                What We Stand For
              </p>
              <h2 className="text-3xl md:text-4xl font-medium text-[var(--ink)]">
                Our Values
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-[24px] bg-[var(--canvas)] border border-[var(--hairline)]"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--brand-mint)] flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-[var(--brand-teal)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--ink)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Section */}
        <section className="py-16 md:py-20 bg-[var(--canvas)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="order-2 md:order-1"
              >
                <div className="aspect-[4/3] rounded-[24px] bg-[var(--surface-card)] overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="flex justify-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-[var(--brand-teal)] flex items-center justify-center">
                          <span className="text-white font-bold text-sm">GOTS</span>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-[var(--brand-peach)] flex items-center justify-center">
                          <span className="font-bold text-sm">OEKO</span>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-[var(--brand-lavender)] flex items-center justify-center">
                          <span className="font-bold text-sm">EU</span>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--muted)]">
                        Certified Quality Standards
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="order-1 md:order-2"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-4">
                  Quality Promise
                </p>
                <h2 className="text-3xl md:text-4xl font-medium text-[var(--ink)] mb-6">
                  Certified Excellence
                </h2>
                <p className="text-base text-[var(--body)] leading-relaxed mb-6">
                  Every SamAira creation meets rigorous international standards for organic textiles 
                  and child safety. We believe certification isn&apos;t just paperwork—it&apos;s a promise 
                  we make to you and your little one.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[var(--body)]">
                    <span className="w-6 h-6 rounded-full bg-[var(--brand-mint)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    GOTS (Global Organic Textile Standard) Certified
                  </li>
                  <li className="flex items-center gap-3 text-[var(--body)]">
                    <span className="w-6 h-6 rounded-full bg-[var(--brand-mint)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    OEKO-TEX Standard 100 Tested
                  </li>
                  <li className="flex items-center gap-3 text-[var(--body)]">
                    <span className="w-6 h-6 rounded-full bg-[var(--brand-mint)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    EU Made in Certified Facilities
                  </li>
                  <li className="flex items-center gap-3 text-[var(--body)]">
                    <span className="w-6 h-6 rounded-full bg-[var(--brand-mint)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Free from Harmful Chemicals
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
          <div className="max-w-[800px] mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-[var(--ink)] mb-4">
                Discover Our Collection
              </h2>
              <p className="text-lg text-[var(--body)] mb-8">
                Browse our curated selection of organic baby and children&apos;s clothing, 
                designed with love for your little one.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Shop All Products
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/bundles">
                    View Bundles
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
