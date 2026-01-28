import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { FAQSchema, BreadcrumbSchema } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import { defaultOgImage } from "@/lib/metadata";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Burial Insurance | Affordable Funeral Coverage | Bellevue Assurance",
  description: "Get affordable burial insurance to cover funeral costs. No medical exam options available. Compare quotes from licensed agents. Coverage from $5,000-$25,000.",
  keywords: ["burial insurance", "funeral insurance", "burial coverage", "funeral coverage", "burial insurance quotes"],
  alternates: {
    canonical: `${SITE_CONFIG.url}/burial-insurance`,
  },
  openGraph: {
    title: "Burial Insurance | Affordable Funeral Coverage",
    description: "Get affordable burial insurance to cover funeral costs. No medical exam options available. Compare quotes from licensed agents.",
    url: `${SITE_CONFIG.url}/burial-insurance`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Burial Insurance | Affordable Funeral Coverage",
    description: "Get affordable burial insurance to cover funeral costs. No medical exam options available.",
    images: [defaultOgImage.url],
  },
};

const faqs = [
  { question: "What is burial insurance?", answer: "Burial insurance is a type of whole life insurance specifically designed to cover funeral and burial expenses. It's often used interchangeably with final expense insurance and typically offers coverage from $5,000 to $25,000." },
  { question: "How much does burial insurance cost?", answer: "Costs vary by age, health, and coverage amount. Most people pay between $30-$80 per month for adequate burial insurance coverage." },
  { question: "What does burial insurance cover?", answer: "The death benefit can cover funeral services, casket or urn, burial plot, headstone, outstanding medical bills, and any other expenses your beneficiaries choose." },
  { question: "Can I get burial insurance without a medical exam?", answer: "Yes, most burial insurance policies don't require a medical exam. Simplified issue policies ask health questions, while guaranteed issue policies accept all applicants." },
  { question: "How is burial insurance different from pre-paid funeral plans?", answer: "Burial insurance pays a cash benefit to your beneficiary who can use it for any purpose. Pre-paid funeral plans lock you into specific funeral home services. Insurance offers more flexibility." },
];

export default function BurialInsurancePage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Burial Insurance", href: "/burial-insurance" }]} />
      <PageHeader
        title="Burial Insurance"
        subtitle="Coverage specifically designed to help with funeral and burial expenses."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Burial Insurance", href: "/burial-insurance" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">What is Burial Insurance?</h2>
          <p className="text-lg text-gray-700 mb-6">Burial insurance is a type of whole life insurance designed to cover the costs associated with your funeral and burial. With average funeral costs ranging from $7,000 to $12,000, burial insurance ensures your family won&apos;t face unexpected expenses during an already difficult time.</p>
          <p className="text-lg text-gray-700 mb-8">Unlike pre-paid funeral plans that lock you into specific services at a particular funeral home, burial insurance provides your beneficiary with a flexible cash benefit they can use as needed.</p>

          <div className="bg-ba-bg border border-gray-200 rounded-xl p-6 mb-8">
            <h3 className="font-serif text-xl font-bold text-ba-navy mb-2">See Your Estimated Premium</h3>
            <p className="text-gray-600 mb-4">Burial insurance rates are similar to final expense. Get an estimate in minutes.</p>
            <Link
              href="/quotes?product=final-expense"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors"
            >
              Get an Estimate <FiArrowRight size={18} />
            </Link>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Benefits of Burial Insurance</h2>
          <ul className="space-y-3 mb-8">
            {["Fixed premiums that never increase", "Coverage that lasts your entire life", "No medical exam required for most policies", "Cash benefit your family can use flexibly", "Builds cash value over time", "Quick approval process"].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-ba-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Common Questions</h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
      <CTASection showForm headline="Get Your Burial Insurance Quote" subheadline="Compare rates from top carriers with no obligation." />
    </>
  );
}
