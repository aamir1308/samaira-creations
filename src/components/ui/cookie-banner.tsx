"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-[1280px] mx-auto bg-[var(--canvas)] rounded-[24px] shadow-2xl border border-[var(--hairline)] p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--ink)] mb-2">
                  We value your privacy
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, 
                  and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
                  {" "}
                  <Link href="/legal/cookies" className="text-[var(--brand-teal)] underline">
                    Learn more
                  </Link>
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" onClick={handleDecline}>
                  Decline
                </Button>
                <Button size="sm" onClick={handleAccept}>
                  Accept All
                </Button>
              </div>
              <button
                onClick={handleDecline}
                className="absolute top-4 right-4 md:static p-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                aria-label="Close cookie banner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
