import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Final Expense Insurance",
  description: "Learn about final expense insurance coverage to help protect your loved ones from funeral costs. Get quotes from licensed agents.",
  keywords: ["final expense insurance", "funeral insurance", "end of life insurance", "burial coverage"],
};

const faqs = [
  { question: "What is final expense insurance?", answer: "Final expense insurance is a type of whole life insurance designed to cover end-of-life costs including funeral expenses, burial costs, outstanding medical bills, and other debts. Coverage typically ranges from $5,000 to $35,000." },
  { question: "Who should consider final expense insurance?", answer: "Final expense insurance is ideal for seniors who want to ensure their funeral costs don't burden their family, people without existing life insurance, those who may not qualify for traditional life insurance, and anyone who wants affordable, permanent coverage." },
  { question: "How much final expense insurance do I need?", answer: "Consider the average funeral cost ($7,000-$12,000), plus any outstanding medical bills or debts you want covered. Most people choose $10,000-$25,000 in coverage." },
  { question: "Are premiums fixed?", answer: "Yes, final expense insurance premiums are level, meaning they never increase. The rate you lock in at application stays the same for life." },
  { question: "Is there a medical exam required?", answer: "Most final expense policies don't require a medical exam. Simplified issue policies ask health questions, while guaranteed issue policies accept all applicants." },
];

export default function FinalExpenseInsurancePage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <PageHeader 
        title="Final Expense Insurance"
        subtitle="Affordable coverage to protect your loved ones from funeral and burial costs."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Final Expense Insurance", href: "/final-expense-insurance" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">What is Final Expense Insurance?</h2>
          <p className="text-lg text-gray-700 mb-6">Final expense insurance, also known as burial insurance or funeral insurance, is a type of whole life insurance designed to cover end-of-life expenses. Unlike traditional life insurance with large coverage amounts, final expense policies typically offer $5,000 to $35,000 in coverage at affordable premiums.</p>
          <p className="text-lg text-gray-700 mb-8">The death benefit can be used for funeral and burial costs, outstanding medical bills, credit card debt, or any other expenses your beneficiaries choose. This helps ensure your family isn&apos;t left with a financial burden during an already difficult time.</p>
          
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Who Is Final Expense Insurance For?</h2>
          <p className="text-lg text-gray-700 mb-4">Final expense insurance may be right for you if:</p>
          <ul className="space-y-3 mb-8">
            {["You want to ensure your funeral costs are covered", "You're a senior looking for affordable life insurance", "You have health conditions that make traditional life insurance difficult to obtain", "You want coverage that builds cash value over time", "You prefer level premiums that never increase"].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-ba-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">How Does It Work?</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[{ step: "1", title: "Apply", desc: "Complete a simple application by phone with a licensed agent." }, { step: "2", title: "Get Approved", desc: "Many applications receive same-day approval." }, { step: "3", title: "Coverage Begins", desc: "Your policy is active and your family is protected." }].map((item, i) => (
              <div key={i} className="bg-ba-bg p-6 rounded-lg text-center">
                <div className="w-10 h-10 bg-ba-gold text-ba-navy rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">{item.step}</div>
                <h3 className="font-serif text-lg font-bold text-ba-navy mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Common Questions</h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
      <CTASection showForm headline="Get Your Final Expense Quote" subheadline="Speak with a licensed agent and find affordable coverage for your family." />
    </>
  );
}
