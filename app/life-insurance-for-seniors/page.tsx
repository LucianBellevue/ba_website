import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Life Insurance for Seniors",
  description: "Find affordable life insurance options for seniors 50-85. No medical exam options, simplified applications, and coverage that fits your budget.",
  keywords: ["life insurance for seniors", "senior life insurance", "life insurance over 50", "life insurance over 60"],
};

const faqs = [
  { question: "Can seniors get life insurance?", answer: "Yes, many life insurance options are available for seniors ages 50-85. Final expense insurance, guaranteed issue policies, and simplified issue policies are all designed with seniors in mind." },
  { question: "What types of life insurance are available for seniors?", answer: "Seniors can choose from final expense insurance (whole life with smaller coverage amounts), guaranteed issue life insurance (no health questions), simplified issue policies (limited health questions), and some term life options." },
  { question: "Do I need a medical exam?", answer: "Many senior life insurance policies don't require a medical exam. Simplified issue policies ask a few health questions, while guaranteed issue policies have no health requirements at all." },
  { question: "How much coverage can I get?", answer: "Coverage amounts typically range from $5,000 to $35,000 for final expense policies. Some carriers offer higher amounts depending on age and health status." },
  { question: "Will my premiums increase as I age?", answer: "No. Once you're approved, your premiums are locked in and will never increase, regardless of how long you live or any health changes." },
];

export default function LifeInsuranceForSeniorsPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <PageHeader 
        title="Life Insurance for Seniors"
        subtitle="Affordable coverage options designed for adults 50 and older."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Life Insurance for Seniors", href: "/life-insurance-for-seniors" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--ba-navy)] mb-6">Life Insurance Options for Seniors</h2>
          <p className="text-lg text-gray-700 mb-6">Finding life insurance as a senior doesn&apos;t have to be complicated or expensive. Whether you&apos;re 50, 65, or 80, there are coverage options designed to fit your needs and budget.</p>
          <p className="text-lg text-gray-700 mb-8">Many seniors choose final expense insurance to cover funeral costs and leave a small legacy for their loved ones. These policies offer affordable premiums, no medical exams, and guaranteed acceptance options.</p>
          
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--ba-navy)] mb-6">Coverage Options</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { title: "Final Expense Insurance", desc: "Whole life coverage from $5,000-$35,000 to cover funeral costs and small debts." },
              { title: "Guaranteed Issue", desc: "Acceptance guaranteed with no health questions. Higher premiums but available to everyone." },
              { title: "Simplified Issue", desc: "Limited health questions, no medical exam. Good rates for those in reasonably good health." },
              { title: "Graded Benefit", desc: "Coverage with a waiting period. Full benefit after 2-3 years, partial benefit before." },
            ].map((item, i) => (
              <div key={i} className="bg-[var(--ba-bg)] p-6 rounded-lg">
                <h3 className="font-serif text-lg font-bold text-[var(--ba-navy)] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--ba-navy)] mb-6">Common Questions</h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
      <CTASection showForm headline="Get Your Senior Life Insurance Quote" subheadline="Speak with a licensed agent who understands coverage for seniors." />
    </>
  );
}
