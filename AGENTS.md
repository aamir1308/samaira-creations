<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SamAira Creations - Project Instructions

## Design System (AUTHORITY)

The design system is defined in `DESIGN.md`. This file is the **SINGLE SOURCE OF TRUTH** for all UI decisions:

### Design Principles
- **Canvas**: Cream-tinted white (#fffaf0) - NEVER use cool gray
- **Primary CTA**: Near-black (#0a0a0a) with rounded corners (12px radius)
- **Accent Colors**: Saturated cards in pink, teal, lavender, peach, ochre
- **Typography**: Inter font family with display weights (500) and negative letter-spacing
- **Border Radius**: 12px for buttons, 16px for cards, 24px for feature cards
- **Spacing**: 4px base unit (4, 8, 12, 16, 24, 32, 48, 96px tokens)
- **Footer**: Cream-tinted (NOT dark)

### DO
- Use cream canvas (#fffaf0) as the base background
- Use design tokens from globals.css (CSS variables)
- Follow mobile-first approach
- Use rounded components (12px+ radius)
- Keep boutique-grade, editorial aesthetics

### DON'T
- Add flashy gradients
- Use neon colors
- Add gaming-style effects
- Use dark footer
- Use generic SaaS styling

## PRD Requirements

The PRD (`SamAira Creations.txt`) defines:

### Business Model
- Luxury organic children's clothing boutique
- WhatsApp-based ordering (NO checkout)
- Target: Germany/EU

### Product Categories
1. **Hooded Towels** (Muslin, Knitted) - €18-24
2. **Swaddles** - €14-20
3. **Burp Cloths** - €10-14
4. **Blankets** (2-layer, 6-layer) - €22-42
5. **Night Suits** - €20-28
6. **Shirts** - €18-24
7. **Kimono Sets** - €28-36
8. **Co-Ord Sets** - €26-34

### Bundle Strategy
- Everyday Outfit Set (€28-32)
- Playtime Set (€38-42)
- Gift Outfit Set (€42-48)
- Premium Baby Wardrobe Set (€65-75)
- Newborn Starter Set (€26-28)
- Bath Time Set (€30-32)
- Everyday Essentials Set (€45-49)
- Comfort Set (Premium) (€69-75)

### Required Pages
- Homepage (with Hero, Categories, Bundles, Organic Story, Best Sellers, Gallery)
- Products Listing Page (with filters, sorting)
- Bundles Page
- Legal Pages (Impressum, Privacy, Terms, Cookie, Shipping, Returns)

## Tech Stack
- Next.js 16 with App Router
- React 19
- TypeScript
- TailwindCSS v4
- Framer Motion
- shadcn/ui patterns (Button, etc.)

## Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Design tokens
│   ├── products/
│   │   └── page.tsx       # Products listing
│   └── bundles/
│       └── page.tsx       # Bundles page
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── categories.tsx
│   │   ├── bundles.tsx
│   │   ├── organic-story.tsx
│   │   ├── best-sellers.tsx
│   │   └── gallery.tsx
│   └── ui/
│       └── button.tsx
└── lib/
    ├── utils.ts           # cn() utility
    ├── types.ts           # TypeScript types
    └── data.ts            # Mock product data
```

## Implementation Notes

1. **WhatsApp Ordering**: All "Order via WhatsApp" buttons generate a pre-filled message template with product details
2. **No Checkout**: The platform intentionally avoids traditional checkout flow - all orders via WhatsApp
3. **Design Tokens**: Use CSS variables from globals.css (e.g., `var(--canvas)`, `var(--primary)`)
4. **Components**: Use Button component with variants (primary, secondary, onColor, ghost, link)
5. **Animation**: Use Framer Motion for smooth, boutique-grade animations (no aggressive transitions)

## Future Roadmap (Phase 2)
- Full checkout system
- Stripe/Klarna integration
- Customer accounts
- Wishlist
- Multi-language (German + English)
- Inventory management