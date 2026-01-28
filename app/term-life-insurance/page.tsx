import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { FAQSchema, BreadcrumbSchema } from "@/components/JsonLd";
import { FiArrowRight } from "react-icons/fi";
import { defaultOgImage } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Simplified Term Life Insurance - No Medical Exam",
  description: "Get simplified term life insurance with no medical exam required. Quick approval, affordable rates, and coverage from top carriers. Licensed agents ready to help.",
  keywords: ["simplified term life insurance", "no medical exam term life", "term life no exam", "affordable term life", "quick approval term life"],
  alternates: {
    canonical: "https://bellevueassurance.com/term-life-insurance",
  },
  openGraph: {
    title: "Simplified Term Life Insurance - No Medical Exam Required",
    description: "No medical exam term life insurance with quick approval. Get quotes from top carriers with competitive rates.",
    url: "https://bellevueassurance.com/term-life-insurance",
    siteName: "Bellevue Assurance",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simplified Term Life Insurance - No Medical Exam Required",
    description: "No medical exam term life insurance with quick approval. Get quotes from top carriers.",
    images: [defaultOgImage.url],
  },
};

const faqs = [
  { question: "What is simplified term life insurance?", answer: "Simplified term life insurance streamlines the application process by asking only a few health questions instead of requiring a full medical exam. This makes approval faster—often within days—while still providing the same level of coverage as traditional term life insurance for 10, 20, or 30 years." },
  { question: "Do I need a medical exam for simplified term life?", answer: "No, simplified term life insurance does not require a medical exam for qualified applicants. You'll answer some basic health questions, but there's no need for blood work, physical exams, or waiting for medical records." },
  { question: "Do I still need to answer health questions?", answer: "Yes, but simplified term life policies ask far fewer health questions than traditional policies. The process is streamlined to make it easier and faster while still ensuring you get the right coverage for your situation." },
  { question: "How much term life insurance do I need?", answer: "A common guideline is 10-12 times your annual income, but consider factors like mortgage balance, children's education costs, outstanding debts, and your spouse's financial needs. Our agents can help you determine the right amount." },
  { question: "What carriers do you work with for simplified term life?", answer: "We partner with top-rated carriers including Ethos, Ameritas, LFG, Mutual of Omaha, and others who specialize in simplified term life insurance. This allows us to find you the best rates and quickest approval times." },
  { question: "Can I get term life insurance as a senior?", answer: "Yes, term life insurance is available to seniors, though premiums increase with age. Simplified term life options are particularly helpful for seniors who want to avoid medical exams. We may also recommend whole life or guaranteed issue options depending on your needs." },
];

export default function TermLifeInsurancePage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Term Life Insurance", href: "/term-life-insurance" }]} />
      <PageHeader
        title="Simplified Term Life Insurance - No Medical Exam"
        subtitle="Get approved faster with minimal health questions. Affordable protection from trusted carriers."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Term Life Insurance", href: "/term-life-insurance" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Simplified Term Life Insurance</h2>
          <p className="text-lg text-gray-700 mb-6">Get the protection your family needs without the hassle. Our simplified term life insurance provides straightforward, affordable coverage with minimal health questions and no medical exam required for qualified applicants—approval often within days.</p>
          <p className="text-lg text-gray-700 mb-8">Working with top-rated carriers, we offer term coverage for 10, 20, or 30 years at a fixed premium rate. If you pass away during the term, your beneficiaries receive a tax-free death benefit to replace your income, pay off debts, and secure their financial future.</p>

          <div className="not-prose bg-blue-50 border-l-4 border-ba-blue rounded-lg p-6 mb-8">
            <h3 className="font-serif text-lg font-bold text-ba-navy mb-2">What Makes Simplified Term Life Different?</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-ba-blue shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span><strong>No Medical Exam:</strong> Qualified applicants don&apos;t need blood work, physicals, or medical records</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-ba-blue shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span><strong>Quick Approval:</strong> Fast approval process, often within days instead of weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-ba-blue shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span><strong>Trusted Carriers:</strong> Coverage from top-rated providers including Ethos, Ameritas, LFG, and Mutual of Omaha</span>
              </li>
            </ul>
          </div>

          <div className="not-prose bg-ba-bg border border-gray-200 rounded-xl p-6 mb-8">
            <h3 className="font-serif text-xl font-bold text-ba-navy mb-2">Calculate Your Term Life Insurance Rates</h3>
            <p className="text-gray-600 mb-4">Use our free <Link href="/quotes?product=term" className="text-ba-blue font-medium hover:underline">term life insurance rate calculator</Link> to get a personalized estimate in minutes. No obligation, no pressure.</p>
            <Link
              href="/quotes?product=term"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors"
              aria-label="Calculate term life insurance rates"
            >
              Try the Calculator <FiArrowRight size={18} />
            </Link>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Why Choose Simplified Term Life?</h2>
          <p className="text-lg text-gray-700 mb-4">This option may be perfect for you if:</p>
          <ul className="space-y-3 mb-8">
            {["You want maximum coverage at the lowest cost with faster approval", "You need coverage quickly without the hassle of medical exams", "You're looking to replace your income if something happens to you", "You want predictable, level premiums that won't increase during your term", "You prefer a streamlined application process with minimal paperwork", "You have minor health conditions that might complicate traditional underwriting"].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-ba-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Term Length Options</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { term: "10-Year Term", desc: "Ideal for short-term needs like covering a loan or bridge to retirement.", best: "Best for: Short-term obligations" },
              { term: "20-Year Term", desc: "Popular choice for parents wanting coverage until children are independent.", best: "Best for: Growing families" },
              { term: "30-Year Term", desc: "Maximum protection period for long-term planning and mortgage coverage.", best: "Best for: New homeowners" }
            ].map((item, i) => (
              <div key={i} className="bg-ba-bg p-6 rounded-lg">
                <h3 className="font-serif text-lg font-bold text-ba-navy mb-2">{item.term}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                <p className="text-ba-blue font-medium text-sm">{item.best}</p>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">How Much Coverage Do You Need?</h2>
          <p className="text-lg text-gray-700 mb-4">Consider these factors when determining your coverage amount:</p>
          <ul className="space-y-3 mb-8">
            {[
              "Income replacement: 10-12x your annual salary",
              "Outstanding debts: Mortgage, car loans, credit cards",
              "Future expenses: Children's education, spouse's retirement",
              "Final expenses: Funeral costs and medical bills",
              "Existing coverage: Subtract any employer-provided life insurance"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-ba-blue shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Common Questions</h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
      <CTASection showForm headline="Get Your Term Life Quote" subheadline="Speak with a licensed agent and find affordable coverage to protect your family." />
    </>
  );
}
