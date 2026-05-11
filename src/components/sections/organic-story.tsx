"use client";

import { motion } from "framer-motion";
import { Leaf, Shield, Wind, Heart } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Organic Cotton",
    description: "GOTS-certified organic cotton that's gentle on the environment and your baby's skin.",
  },
  {
    icon: Shield,
    title: "Child-Safe Materials",
    description: "Free from harmful chemicals, pesticides, and synthetic dyes. Safe for sensitive skin.",
  },
  {
    icon: Wind,
    title: "Breathable & Comfortable",
    description: "Natural fibers allow air circulation, helping regulate body temperature and prevent overheating.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Crafted with care in EU-certified facilities, ensuring premium quality and ethical production.",
  },
];

export function OrganicStorySection() {
  return (
    <section className="py-20 md:py-24 bg-[var(--canvas)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-3">
            Our Promise
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-[var(--ink)] tracking-tight mb-4">
            The Organic Cotton Difference
          </h2>
          <p className="text-base text-[var(--body)] max-w-2xl mx-auto">
            We believe every piece of clothing should feel like a gentle hug.{' '}
            That&apos;s why we choose only the finest organic materials for your little one.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-[24px] bg-[var(--surface-card)] hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--brand-mint)] flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-[var(--brand-teal)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--ink)] mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 md:p-12 rounded-[24px] bg-[var(--surface-soft)] text-center"
        >
          <h3 className="text-2xl font-medium text-[var(--ink)] mb-4">
            GOTS-Certified Quality
          </h3>
          <p className="text-base text-[var(--body)] max-w-3xl mx-auto mb-6">
            Our products meet the Global Organic Textile Standard (GOTS), the worldwide{' '}
            leading textile processing standard for organic fibers. This certification{' '}
            ensures ethical manufacturing, fair wages, and environmental responsibility{' '}
            from farm to finished product.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <span className="block text-3xl font-semibold text-[var(--brand-teal)]">GOTS</span>
              <span className="text-xs text-[var(--muted)]">Certified</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-semibold text-[var(--brand-teal)]">OEKO-TEX</span>
              <span className="text-xs text-[var(--muted)]">Standard 100</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-semibold text-[var(--brand-teal)]">EU</span>
              <span className="text-xs text-[var(--muted)]">Made</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}