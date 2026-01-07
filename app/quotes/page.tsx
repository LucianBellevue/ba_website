import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import QuotesPageClient from "./QuotesPageClient";

export const metadata: Metadata = {
  title: "Free Life Insurance Quote Calculator | Bellevue Assurance",
  description: "Get a free life insurance estimate in minutes. Calculate final expense and term life insurance premiums online. No obligation, instant results from licensed agents.",
  keywords: [
    "life insurance quote",
    "final expense quote",
    "term life quote",
    "insurance estimate",
    "burial insurance calculator",
    "life insurance calculator",
    "free insurance quote",
    "online insurance quote",
  ],
  openGraph: {
    title: "Free Life Insurance Quote Calculator | Bellevue Assurance",
    description: "Get a free life insurance estimate in minutes. Calculate final expense and term life insurance premiums online.",
    url: `${SITE_CONFIG.url}/quotes`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Life Insurance Quote Calculator",
    description: "Get a free life insurance estimate in minutes. No obligation, instant results.",
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/quotes`,
  },
};

interface QuotesPageProps {
  searchParams: Promise<{ product?: string }>;
}

export default async function QuotesPage({ searchParams }: QuotesPageProps) {
  const params = await searchParams;
  const defaultProduct = params.product === "term" ? "term" : "final-expense";

  return (
    <div className="min-h-screen bg-ba-bg">
      <div className="bg-ba-navy text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
            Get Your Free Estimate
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Answer a few questions to see estimated monthly premiums. No commitment required.
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
        <QuotesPageClient defaultProduct={defaultProduct} />
      </div>
    </div>
  );
}
