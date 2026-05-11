import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CookieBanner } from "@/components/ui/cookie-banner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SamAira Creations | Luxury Organic Children's Clothing",
  description: "Premium organic cotton children's clothing, swaddles, and accessories for newborns, infants, toddlers, and kids. German/EU boutique.",
  keywords: ["organic baby clothes", "children's clothing", "baby essentials", "swaddles", "burp cloths", "hooded towels", "German boutique"],
  openGraph: {
    title: "SamAira Creations | Luxury Organic Children's Clothing",
    description: "Premium organic cotton children's clothing designed for modern European families.",
    siteName: "SamAira Creations",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--canvas)]">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}