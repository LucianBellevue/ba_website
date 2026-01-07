# Bellevue Assurance Website

A production-ready marketing website for Bellevue Assurance, a final expense and life insurance agency.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Inter (sans-serif), Libre Baskerville (serif)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/
├── page.tsx                    # Home page
├── about/                      # About page
├── faq/                        # FAQ page
├── contact/                    # Contact page
├── how-it-works/               # How It Works page
├── get-a-quote/                # Quote form page
├── final-expense-insurance/    # Product page
├── burial-insurance/           # Product page
├── life-insurance-for-seniors/ # Product page
├── guaranteed-issue-life-insurance/ # Product page
├── states/                     # State coverage pages
│   └── [state]/                # Dynamic state pages
├── guides/                     # Educational guides
│   └── [slug]/                 # Dynamic guide pages
├── privacy-policy/             # Privacy policy
├── terms/                      # Terms of service
├── disclosures/                # Legal disclosures
├── api/lead/                   # Lead submission API
├── sitemap.ts                  # Dynamic sitemap
└── robots.ts                   # Robots.txt

components/
├── Header.tsx                  # Site header with navigation
├── Footer.tsx                  # Site footer
├── MobileStickyBar.tsx         # Mobile CTA bar
├── Hero.tsx                    # Hero section
├── TrustBar.tsx                # Trust indicators
├── CTASection.tsx              # Call-to-action sections
├── FAQAccordion.tsx            # FAQ component
├── LeadForm.tsx                # Lead capture form
├── DisclaimerBlock.tsx         # Legal disclaimers
├── Testimonials.tsx            # Testimonial section
├── Breadcrumbs.tsx             # Breadcrumb navigation
├── StateCard.tsx               # State listing card
├── GuideCard.tsx               # Guide listing card
├── JsonLd.tsx                  # Schema.org JSON-LD
└── Logo.tsx                    # Brand logo

lib/
├── constants.ts                # Site configuration
├── analytics.ts                # Analytics tracking
└── guides.ts                   # Guide content data

data/
└── states.ts                   # State-specific content
```

## Configuration

### Site Settings

Edit `lib/constants.ts` to update:

- Company name and domain
- Phone number
- Email address
- Navigation links

### Design System

Edit `app/globals.css` to modify:

- Brand colors (--ba-navy, --ba-blue, --ba-gold, etc.)
- Typography settings
- Global styles

### Adding States

Edit `data/states.ts` to add new state coverage pages with:

- State name and slug
- SEO title and description
- FAQ content
- Phone enrollment notes

### Adding Guides

Edit `lib/guides.ts` to add new educational content.

## Lead API Integration

The `/api/lead` route logs submissions to console. To integrate with your CRM:

```typescript
// In app/api/lead/route.ts, add:

// Zapier webhook
await fetch('https://hooks.zapier.com/hooks/catch/...', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

// Or HubSpot
await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
  },
  body: JSON.stringify({ properties: { ... } }),
});
```

## SEO Features

- Dynamic sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- JSON-LD schemas (Organization, BreadcrumbList, FAQPage)
- Meta tags via Next.js Metadata API
- Semantic HTML structure

## Deployment

Deploy to Vercel, Netlify, or any platform supporting Next.js:

```bash
npm run build
```

## License

Proprietary - Bellevue Assurance
