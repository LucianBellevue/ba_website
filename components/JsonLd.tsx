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
    description: "Bellevue Assurance provides simplified issue term life, fast issue term life, and final expense insurance through licensed agents. Quick approval with no medical exam options from carriers like Ethos.",
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: [
      "Simplified Issue Term Life Insurance",
      "Fast Issue Term Life Insurance",
      "No Medical Exam Life Insurance",
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
            name: "Simplified Issue Term Life Insurance",
            description: "Quick approval term life insurance with minimal health questions and no medical exam."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fast Issue Term Life Insurance",
            description: "Rapid approval life insurance using advanced underwriting technology."
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
            name: "Simplified Issue Term Life Insurance",
            description: "Fast approval term life insurance with no medical exam"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fast Issue Term Life Insurance",
            description: "Quick approval process using advanced technology"
          }
        }
      ]
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
