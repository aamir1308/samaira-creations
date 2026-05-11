"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <Header />
      <main className="pt-16">
        <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--ink)] mb-4">
              My Wishlist
            </h1>
            <p className="text-lg text-[var(--body)] max-w-2xl mx-auto">
              Save your favorite items for later.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            {/* Empty State */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--surface-card)] flex items-center justify-center">
                <Heart className="w-10 h-10 text-[var(--brand-pink)]" />
              </div>
              <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-[var(--muted)] mb-8 max-w-[28rem] mx-auto">
                Save items you love by clicking the heart icon on any product. 
                Your wishlist will be saved for your next visit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/products">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Browse Products
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/bundles">
                    View Bundles
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Quick Order CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 p-8 rounded-[24px] bg-[var(--brand-teal)] text-white text-center"
            >
              <h3 className="text-xl font-semibold mb-2">
                Have questions about a product?
              </h3>
              <p className="text-white/80 mb-6">
                Send us a WhatsApp message and we&apos;ll help you find the perfect items.
              </p>
              <Button
                variant="onColor"
                onClick={() => {
                  const msg = `Hello SamAira Creations, I have a question about your products. Can you help me?`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat with Us
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
