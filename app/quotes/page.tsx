import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import QuotesPageClient from "./QuotesPageClient";
import { SoftwareApplicationSchema, BreadcrumbSchema, FAQSchema, HowToSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Free Life Insurance Rate Calculator 2026 | Instant Quotes Online",
  description: "Calculate life insurance rates instantly with our free online calculator. Get accurate estimates for term life, whole life, and final expense insurance. No medical exam required. Compare rates from top carriers in minutes.",
  keywords: [
    "life insurance rate calculator",
    "life insurance calculator",
    "term life insurance calculator",
    "whole life insurance calculator",
    "final expense insurance calculator",
    "burial insurance calculator",
    "life insurance quote calculator",
    "free life insurance calculator",
    "online life insurance calculator",
    "life insurance rate estimator",
    "calculate life insurance premium",
    "life insurance cost calculator",
    "instant life insurance quote",
    "life insurance rates by age",
    "life insurance premium calculator",
  ],
  openGraph: {
    title: "Free Life Insurance Rate Calculator | Instant Quotes Online",
    description: "Calculate life insurance rates instantly. Get accurate estimates for term life, whole life, and final expense insurance. No medical exam required.",
    url: `${SITE_CONFIG.url}/quotes`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Life Insurance Rate Calculator - Bellevue Assurance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Life Insurance Rate Calculator | Instant Quotes",
    description: "Calculate life insurance rates instantly. Get accurate estimates for term life, whole life, and final expense insurance.",
    images: [`${SITE_CONFIG.url}/og-image.png`],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/quotes`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": 320,
    },
  },
};

interface QuotesPageProps {
  searchParams: Promise<{ product?: string }>;
}

const calculatorFAQs = [
  {
    question: "How accurate is the life insurance rate calculator?",
    answer: "Our calculator provides estimates based on current rates from top-rated carriers. Actual premiums may vary based on your complete health profile, medical exam results (if required), and final underwriting decisions. The calculator gives you a good starting point to understand potential costs.",
  },
  {
    question: "Is the life insurance calculator free to use?",
    answer: "Yes, our life insurance rate calculator is completely free to use. There's no cost, no obligation, and no credit card required. You can calculate estimates as many times as you'd like to compare different coverage amounts and scenarios.",
  },
  {
    question: "What information do I need to use the calculator?",
    answer: "You'll need basic information including your age, gender, state of residence, height, weight, tobacco use, desired coverage amount, and some health-related questions. The calculator takes just a few minutes to complete.",
  },
  {
    question: "Can I calculate rates for different types of life insurance?",
    answer: "Yes! Our calculator supports three types of life insurance: term life insurance (coverage for a specific period), whole life insurance (permanent coverage), and final expense insurance (designed for end-of-life costs). You can switch between calculators using the tabs.",
  },
  {
    question: "Do I need a medical exam to get a quote from the calculator?",
    answer: "No medical exam is required to use the calculator. The estimates are based on simplified issue policies that typically only require answering health questions. However, some policies may require a medical exam during the actual application process.",
  },
  {
    question: "How long does it take to get results from the calculator?",
    answer: "You'll receive instant estimates after completing the calculator questions, which typically takes 2-3 minutes. The calculator provides a monthly premium range based on your inputs, helping you understand potential costs before speaking with an agent.",
  },
];

const calculatorSteps = [
  {
    name: "Select Insurance Type",
    text: "Choose between term life, whole life, or final expense insurance using the tabs at the top of the calculator.",
  },
  {
    name: "Enter Basic Information",
    text: "Provide your state, age, and gender. These factors significantly impact your life insurance rates.",
  },
  {
    name: "Answer Health Questions",
    text: "Enter your height, weight, tobacco use status, and answer questions about chronic conditions, family history, and medications.",
  },
  {
    name: "Select Coverage Amount",
    text: "Choose your desired coverage amount using the slider. The calculator will show you the maximum coverage available for your age.",
  },
  {
    name: "Review Your Estimate",
    text: "View your estimated monthly premium range. This gives you a good idea of what to expect before speaking with a licensed agent.",
  },
];

export default async function QuotesPage({ searchParams }: QuotesPageProps) {
  const params = await searchParams;
  const defaultProduct = params.product === "term" ? "term" : "final-expense";

  return (
    <>
      <SoftwareApplicationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Life Insurance Rate Calculator", href: "/quotes" },
        ]}
      />
      <FAQSchema faqs={calculatorFAQs} />
      <HowToSchema
        name="How to Use Our Life Insurance Rate Calculator"
        description="Learn how to calculate your life insurance rates in minutes using our free online calculator."
        steps={calculatorSteps}
        totalTime="PT3M"
      />
      <div className="min-h-screen bg-ba-bg">
        <header className="bg-ba-navy text-white py-8 md:py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Free Life Insurance Rate Calculator
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-4">
              Calculate your life insurance rates instantly. Get accurate estimates for term life, whole life, and final expense insurance. No commitment required.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm" role="list">
              <span className="flex items-center gap-2" role="listitem">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free & Instant
              </span>
              <span className="flex items-center gap-2" role="listitem">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No Medical Exam Required
              </span>
              <span className="flex items-center gap-2" role="listitem">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Compare Multiple Types
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-xl mx-auto px-4 py-8 md:py-12">
          <QuotesPageClient defaultProduct={defaultProduct} />
        </main>

        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16" aria-labelledby="calculator-info">
          <article className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 id="calculator-info" className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-4">
              About Our Life Insurance Rate Calculator
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                Our free life insurance rate calculator helps you estimate monthly premiums for term life, whole life, and final expense insurance policies. Whether you&apos;re looking for temporary coverage or permanent protection, our calculator provides instant estimates based on your age, health profile, and desired coverage amount.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Why use our calculator?</strong> Get instant estimates without speaking to an agent first. Compare rates across different insurance types. Understand how factors like age, health, and coverage amount affect your premiums. All estimates are based on current rates from top-rated carriers.
              </p>
              <p className="text-gray-700">
                <strong>Important note:</strong> Calculator results are estimates only. Final premiums may vary based on complete underwriting, medical exam results (if required), and carrier-specific guidelines. For personalized quotes and to apply for coverage, speak with one of our licensed agents.
              </p>
            </div>
          </article>
        </section>
      </div>
    </>
  );
}
