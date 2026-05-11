"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[85vh] flex items-center bg-[var(--canvas)] overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[var(--brand-peach)] opacity-30 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-[var(--brand-lavender)] opacity-20 blur-3xl" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-6 py-12 grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 md:space-y-8 z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-card)] text-sm text-[var(--muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-peach)]" />
            Organic &amp; Safe for Baby
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[var(--ink)] leading-[1.1] tracking-[-0.02em]">
            Gentle Luxury for
            <br />
            <span className="text-[var(--brand-teal)]">Little Ones</span>
          </h1>

          <p className="text-base md:text-lg text-[var(--body)] max-w-[32rem] leading-relaxed">
            Discover our curated collection of premium organic cotton clothing,
            swaddles, and accessories — designed with love for your baby&apos;s
            delicate skin.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Button size="lg" asChild>
              <Link href="/products">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/bundles">
                View Bundles
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/products?age=newborn">
                Newborn Essentials
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 md:gap-6 pt-2 md:pt-4">
            <div className="flex items-center gap-2 text-xs md:text-sm text-[var(--muted)]">
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--surface-card)] flex items-center justify-center">
                <Leaf className="w-4 h-4 text-[var(--brand-teal)]" />
              </span>
              100% Organic Cotton
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-[var(--muted)]">
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--surface-card)] flex items-center justify-center">
                <Truck className="w-4 h-4 text-[var(--brand-teal)]" />
              </span>
              Free Shipping over €50
            </div>
          </div>
        </motion.div>

        {/* Right Content - Visual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10"
        >
          <div className="relative aspect-[4/3] rounded-[24px] bg-[var(--surface-soft)] overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=600&fit=crop"
              alt="Baby wrapped in soft organic cotton towel"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-dark)]/20 to-transparent" />
          </div>

          {/* Floating card — bottom left */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute -bottom-6 -left-6 p-4 rounded-[16px] bg-[var(--canvas)]/95 backdrop-blur-sm border border-[var(--hairline)] shadow-lg max-w-[200px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-mint)] flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-[var(--brand-teal)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--ink)]">Free Shipping</p>
                <p className="text-xs text-[var(--muted)]">On orders over €50</p>
              </div>
            </div>
          </motion.div>

          {/* Floating card — top right */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute -top-4 -right-4 p-4 rounded-[16px] bg-[var(--canvas)]/95 backdrop-blur-sm border border-[var(--hairline)] shadow-lg max-w-[180px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-lavender)] flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5 text-[var(--brand-teal)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--ink)]">Pure Organic</p>
                <p className="text-xs text-[var(--muted)]">Natural Materials</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
