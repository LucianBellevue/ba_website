import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { FAQSchema } from "@/components/JsonLd";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Term Life Insurance",
  description: "Get affordable term life insurance quotes. Protect your family with coverage for 10, 20, or 30 years. Licensed agents, competitive rates.",
  keywords: ["term life insurance", "life insurance", "term coverage", "affordable life insurance"],
};

const faqs = [
  { question: "What is term life insurance?", answer: "Term life insurance provides coverage for a specific period (term), typically 10, 20, or 30 years. If you pass away during the term, your beneficiaries receive the death benefit. It's often the most affordable type of life insurance." },
  { question: "How much term life insurance do I need?", answer: "A common guideline is 10-12 times your annual income, but consider factors like mortgage balance, children's education costs, outstanding debts, and your spouse's financial needs." },
  { question: "What happens when my term ends?", answer: "When your term ends, you can often renew at a higher rate, convert to a permanent policy, or let the coverage expire. Many people choose a term that covers their working years or until major debts are paid off." },
  { question: "Is a medical exam required?", answer: "Traditional term policies may require a medical exam for the best rates. However, we also offer no-exam term options for qualified applicants who want faster approval." },
  { question: "Can I get term life insurance as a senior?", answer: "Yes, term life insurance is available to seniors, though premiums increase with age. For seniors, we may also recommend final expense or guaranteed issue options depending on your needs." },
];

export default function TermLifeInsurancePage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <PageHeader 
        title="Term Life Insurance"
        subtitle="Affordable protection for your family when they need it most."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Term Life Insurance", href: "/term-life-insurance" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">What is Term Life Insurance?</h2>
          <p className="text-lg text-gray-700 mb-6">Term life insurance is a straightforward, affordable way to protect your family&apos;s financial future. Unlike permanent life insurance, term policies provide coverage for a specific period—typically 10, 20, or 30 years—at a fixed premium rate.</p>
          <p className="text-lg text-gray-700 mb-8">If you pass away during the term, your beneficiaries receive a tax-free death benefit that can be used to replace your income, pay off the mortgage, fund your children&apos;s education, or cover any other expenses they choose.</p>
          
          <div className="not-prose bg-ba-bg border border-gray-200 rounded-xl p-6 mb-8">
            <h3 className="font-serif text-xl font-bold text-ba-navy mb-2">See Your Estimated Premium</h3>
            <p className="text-gray-600 mb-4">Get a personalized estimate in minutes. No obligation, no pressure.</p>
            <Link
              href="/quotes?product=term"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors"
            >
              Get an Estimate <FiArrowRight size={18} />
            </Link>
          </div>
          
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Why Choose Term Life Insurance?</h2>
          <p className="text-lg text-gray-700 mb-4">Term life insurance may be right for you if:</p>
          <ul className="space-y-3 mb-8">
            {["You want maximum coverage at the lowest cost", "You need coverage for a specific period (until kids are grown, mortgage is paid, etc.)", "You're looking to replace your income if something happens to you", "You want predictable, level premiums that won't increase during your term", "You're young and healthy and can lock in low rates now"].map((item, i) => (
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
