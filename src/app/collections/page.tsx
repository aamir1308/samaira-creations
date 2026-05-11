"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type ProductCategory } from "@/lib/types";

const collections: { id: ProductCategory; name: string; description: string; image: string }[] = [
  {
    id: "hooded-towels",
    name: "Hooded Towels",
    description: "Soft, cozy hooded towels perfect for bath time. Made from organic cotton muslin and knitted fabrics.",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=800&fit=crop",
  },
  {
    id: "swaddles",
    name: "Swaddles",
    description: "GOTS-certified organic muslin swaddles. Lightweight, breathable, and gentle for newborns.",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=800&fit=crop",
  },
  {
    id: "burp-cloths",
    name: "Burp Cloths",
    description: "Soft, absorbent burp cloths for quick clean-ups. Gentle on delicate baby skin.",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=800&fit=crop",
  },
  {
    id: "blankets",
    name: "Blankets",
    description: "Muslin blankets in 2-layer and 6-layer options. Perfect for swaddling, cuddling, and travel.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=800&fit=crop",
  },
  {
    id: "night-suits",
    name: "Night Suits",
    description: "Comfortable sleepwear for day and night. Soft breathable fabric for peaceful sleep.",
    image: "https://images.unsplash.com/photo-1522771930-22448d3c2f8a?w=600&h=800&fit=crop",
  },
  {
    id: "shirts",
    name: "Shirts",
    description: "Classic style with everyday comfort. Premium cotton for all-day wear.",
    image: "https://images.unsplash.com/photo-1438902919162-3f517001418f?w=600&h=800&fit=crop",
  },
  {
    id: "kimono-sets",
    name: "Kimono Sets",
    description: "Kimono-style tops with easy dressing. Soft and breathable for sensitive skin.",
    image: "https://images.unsplash.com/photo-1519457431-44bfd5eaa33f?w=600&h=800&fit=crop",
  },
  {
    id: "co-ord-sets",
    name: "Co-Ord Sets",
    description: "Lightweight crinkle cotton sets for summer. Relaxed style with breathable comfort.",
    image: "https://images.unsplash.com/photo-1515364389169-1b9e3d16e7ba?w=600&h=800&fit=crop",
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      {/* Header */}
      <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-medium text-[var(--ink)] mb-4">
            Our Collections
          </h1>
          <p className="text-lg text-[var(--body)] max-w-2xl mx-auto">
            Explore our curated collections of premium organic cotton clothing, 
            designed for comfort, safety, and style.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/products?category=${collection.id}`}
                  className="group block rounded-[24px] overflow-hidden bg-[var(--canvas)] border border-[var(--hairline)] hover:shadow-xl transition-all duration-300"
                >
                  {/* Collection Image */}
                  <div className="aspect-[3/4] relative overflow-hidden bg-[var(--surface-card)]">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface-card)]">
                      <span className="text-4xl">👶</span>
                    </div>
                  </div>

                  {/* Collection Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-[var(--ink)]">
                        {collection.name}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-[var(--muted)] line-clamp-2">
                      {collection.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
        <div className="max-w-[800px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-medium text-[var(--ink)] mb-4">
            Looking for Something Special?
          </h2>
          <p className="text-lg text-[var(--body)] mb-8">
            Check out our bundle sets — curated combinations at special prices.
          </p>
          <Button size="lg" asChild>
            <Link href="/bundles">
              View All Bundles
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
