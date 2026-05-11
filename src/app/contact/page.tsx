"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello SamAira Creations,

My name is ${formData.name}.
My email: ${formData.email}

Message:
${formData.message}

Please respond to my inquiry.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleWhatsApp = () => {
    const message = `Hello SamAira Creations,

I have a question and would like to get in touch.

Please help me with my inquiry.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <Header />
      <main className="pt-16">
        <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--ink)] mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-[var(--body)] max-w-2xl mx-auto">
              We&apos;d love to hear from you. Reach out via WhatsApp for the fastest response.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-8">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[12px] bg-[var(--brand-mint)] flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-[var(--brand-teal)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--ink)] mb-1">WhatsApp</h3>
                      <p className="text-[var(--muted)] mb-2">
                        The fastest way to reach us
                      </p>
                      <Button variant="secondary" size="sm" onClick={handleWhatsApp}>
                        Start Chat
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[12px] bg-[var(--surface-card)] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[var(--brand-teal)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--ink)] mb-1">Email</h3>
                      <a
                        href="mailto:hello@samaira-creations.de"
                        className="text-[var(--brand-teal)] hover:underline"
                      >
                        hello@samaira-creations.de
                      </a>
                      <p className="text-sm text-[var(--muted)] mt-1">
                        We respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[12px] bg-[var(--surface-card)] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[var(--brand-teal)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--ink)] mb-1">Location</h3>
                      <p className="text-[var(--body)]">Germany / EU</p>
                      <p className="text-sm text-[var(--muted)] mt-1">
                        Shipping from Germany
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[12px] bg-[var(--surface-card)] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[var(--brand-teal)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--ink)] mb-1">Business Hours</h3>
                      <p className="text-[var(--body)]">Mon - Fri: 9:00 - 18:00</p>
                      <p className="text-[var(--body)]">Sat: 10:00 - 14:00</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-12 p-6 rounded-[24px] bg-[var(--brand-teal)] text-white">
                  <h3 className="text-lg font-semibold mb-4">
                    Quick Order via WhatsApp
                  </h3>
                  <p className="text-white/80 mb-6 text-sm">
                    The easiest way to order is directly via WhatsApp. Share what you&apos;re looking 
                    for and we&apos;ll help you find the perfect items.
                  </p>
                  <Button
                    variant="onColor"
                    className="w-full"
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Open WhatsApp Chat
                  </Button>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[var(--surface-card)] p-8 rounded-[24px]"
              >
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-6">
                  Send us a Message
                </h2>
                <p className="text-[var(--muted)] mb-8">
                  Fill out the form below and we&apos;ll get back to you via WhatsApp or email.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--ink)] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-[12px] bg-[var(--canvas)] border border-[var(--hairline)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
                      placeholder="Maria Schmidt"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--ink)] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-[12px] bg-[var(--canvas)] border border-[var(--hairline)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
                      placeholder="maria@example.de"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[var(--ink)] mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-[12px] bg-[var(--canvas)] border border-[var(--hairline)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send via WhatsApp
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
