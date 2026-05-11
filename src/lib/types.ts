export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  subCategory?: string;
  designs?: string[];
  ageGroups: AgeGroup[];
  material: string;
  description: string;
  careInstructions?: string;
  images: string[];
  imageUrl?: string;
  isOrganic?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock?: boolean;
}

export type ProductCategory =
  | "hooded-towels"
  | "swaddles"
  | "burp-cloths"
  | "blankets"
  | "night-suits"
  | "shirts"
  | "kimono-sets"
  | "co-ord-sets";

export type AgeGroup =
  | "0-3-months"
  | "3-6-months"
  | "6-12-months"
  | "1-2-years"
  | "2-3-years"
  | "3-4-years";

export interface Bundle {
  id: string;
  name: string;
  description: string;
  products: Product[];
  price: number;
  originalPrice: number;
  savings?: number;
  isFeatured?: boolean;
  isPerfectGift?: boolean;
  whatsappTemplate: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  products: Product[];
}

export interface HomepageSection {
  id: string;
  type: "hero" | "categories" | "bundles" | "organic-story" | "best-sellers" | "gallery";
  title?: string;
  subtitle?: string;
  isVisible: boolean;
  order: number;
}

export interface CategoryCard {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export const CATEGORIES: CategoryCard[] = [
  { id: "newborn", name: "Newborn", slug: "newborn", image: "/images/categories/newborn.jpg", productCount: 24 },
  { id: "infant", name: "Infant", slug: "infant", image: "/images/categories/infant.jpg", productCount: 36 },
  { id: "toddler", name: "Toddler", slug: "toddler", image: "/images/categories/toddler.jpg", productCount: 28 },
  { id: "kids", name: "Kids", slug: "kids", image: "/images/categories/kids.jpg", productCount: 18 },
];

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  "0-3-months": "0-3 months",
  "3-6-months": "3-6 months",
  "6-12-months": "6-12 months",
  "1-2-years": "1-2 years",
  "2-3-years": "2-3 years",
  "3-4-years": "3-4 years",
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "hooded-towels": "Hooded Towels",
  "swaddles": "Swaddles",
  "burp-cloths": "Burp Cloths",
  "blankets": "Blankets",
  "night-suits": "Night Suits",
  "shirts": "Shirts",
  "kimono-sets": "Kimono Sets",
  "co-ord-sets": "Co-Ord Sets",
};

export const WHATSAPP_NUMBER = "+4917632333257";