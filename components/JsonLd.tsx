import { SITE_CONFIG } from "@/lib/constants";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}/logo.png`,
      width: "280",
      height: "200"
    },
    description: "Bellevue Assurance provides simplified term life, whole life, and final expense insurance through licensed agents. Quick approval with no medical exam options from carriers like Ethos, Ameritas, and others.",
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: [
      "Simplified Term Life Insurance",
      "No Medical Exam Term Life Insurance",
      "Whole Life Insurance",
      "Final Expense Insurance",
      "Burial Insurance",
      "Guaranteed Issue Life Insurance"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Life Insurance Products",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Simplified Term Life Insurance",
            description: "Quick approval term life insurance with minimal health questions and no medical exam."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Whole Life Insurance",
            description: "Permanent life insurance with level premiums and cash value accumulation."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Final Expense Insurance",
            description: "Whole life insurance designed to cover funeral and burial costs."
          }
        }
      ]
    },
    sameAs: [
      SITE_CONFIG.url,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127"
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

interface BreadcrumbItem { name: string; href: string; }

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.href}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

interface FAQItem { question: string; answer: string; }

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

interface ArticleProps {
  headline: string;
  description: string;
  datePublished: string;
  author: string;
  image?: string;
}

export function ArticleSchema({ headline, description, datePublished, author, image }: ArticleProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    datePublished,
    dateModified: datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": SITE_CONFIG.url,
    },
    image: image || `${SITE_CONFIG.url}/logo.png`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "17:00"
      }
    ],
    areaServed: [
      { "@type": "State", name: "California" },
      { "@type": "State", name: "Texas" },
      { "@type": "State", name: "Florida" },
      { "@type": "State", name: "Pennsylvania" },
      { "@type": "State", name: "Ohio" },
      { "@type": "State", name: "North Carolina" },
      { "@type": "Country", name: "United States" }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Life Insurance Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Simplified Term Life Insurance",
            description: "Quick approval term life insurance with no medical exam"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Whole Life Insurance",
            description: "Permanent life insurance with guaranteed premiums and benefits"
          }
        }
      ]
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

interface SoftwareApplicationProps {
  name?: string;
  description?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
  };
}

export function SoftwareApplicationSchema({
  name = "Life Insurance Rate Calculator",
  description = "Free online life insurance rate calculator. Get instant estimates for term life, whole life, and final expense insurance premiums. No commitment required.",
  applicationCategory = "FinanceApplication",
  operatingSystem = "Web",
  offers,
}: SoftwareApplicationProps = {}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${SITE_CONFIG.url}/quotes`,
    applicationCategory,
    operatingSystem,
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "1.0",
    releaseNotes: "Free life insurance rate calculator with instant estimates",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1"
    },
    offers: offers || {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    },
    featureList: [
      "Term life insurance rate calculator",
      "Whole life insurance rate calculator",
      "Final expense insurance rate calculator",
      "Instant premium estimates",
      "No medical exam required",
      "Free to use",
      "No commitment required"
    ],
    screenshot: `${SITE_CONFIG.url}/og-image.png`,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime: totalTime || "PT5M",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: step.image
      })
    }))
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
