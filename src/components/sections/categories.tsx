"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

export function CategoriesSection() {
  return (
    <section className="py-20 md:py-24 bg-[var(--canvas)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-3">
            Shop by Age
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-[var(--ink)] tracking-tight">
            Find the Perfect Size
          </h2>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/products?age=${category.slug}`}
                className="group block relative aspect-[3/4] rounded-[16px] bg-[var(--surface-card)] overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-card)] to-[var(--surface-soft)]" />
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-[var(--brand-peach)] opacity-20 group-hover:scale-110 transition-transform duration-300" />
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 mb-4 rounded-full bg-[var(--canvas)] flex items-center justify-center">
                    <span className="text-3xl">
                      {category.id === "newborn" && "👶"}
                      {category.id === "infant" && "🍼"}
                      {category.id === "toddler" && "🧒"}
                      {category.id === "kids" && "👧"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--ink)] mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">
                    {category.productCount} Products
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[var(--canvas)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight className="w-4 h-4 text-[var(--ink)]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}