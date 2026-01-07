import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import DisclaimerBlock from "@/components/DisclaimerBlock";
import { FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Guaranteed Issue Life Insurance",
  description: "Guaranteed issue life insurance with no health questions. Coverage available for eligible applicants ages 50-85. Learn about benefits and limitations.",
  keywords: ["guaranteed issue life insurance", "no health questions life insurance", "guaranteed acceptance life insurance"],
};

const faqs = [
  { question: "What is guaranteed issue life insurance?", answer: "Guaranteed issue life insurance is a type of whole life policy that does not require health questions or a medical exam. Eligible applicants within the age range are accepted regardless of health conditions." },
  { question: "Who qualifies for guaranteed issue?", answer: "Most guaranteed issue policies are available to applicants ages 50-85. The only requirements are typically age and residency—no health questions are asked." },
  { question: "What is a graded benefit period?", answer: "Guaranteed issue policies typically have a 2-year graded benefit period. If death occurs from natural causes during this period, beneficiaries receive a return of premiums paid plus interest rather than the full death benefit. Accidental death is usually covered in full from day one." },
  { question: "Why are premiums higher for guaranteed issue?", answer: "Because the insurer accepts all applicants regardless of health, they take on more risk. Higher premiums offset this risk. However, for people with serious health conditions, guaranteed issue may be the most accessible option." },
  { question: "How much coverage is available?", answer: "Guaranteed issue policies typically offer coverage from $5,000 to $25,000, depending on the carrier and your age." },
];

export default function GuaranteedIssueLifeInsurancePage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <PageHeader 
        title="Guaranteed Issue Life Insurance"
        subtitle="Coverage with no health questions for eligible applicants."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guaranteed Issue Life Insurance", href: "/guaranteed-issue-life-insurance" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--ba-navy)] mb-6">What is Guaranteed Issue Life Insurance?</h2>
          <p className="text-lg text-gray-700 mb-6">Guaranteed issue life insurance is designed for people who may have difficulty qualifying for traditional life insurance due to health conditions. These policies do not ask health questions and do not require a medical exam.</p>
          <p className="text-lg text-gray-700 mb-8">If you&apos;re within the eligible age range (typically 50-85), you can be accepted for coverage regardless of your health status. This makes guaranteed issue an important option for people with serious health conditions.</p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h3 className="font-serif text-lg font-bold text-[var(--ba-navy)] mb-3">Important Considerations</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Graded benefit period:</strong> Most policies have a 2-year waiting period for full benefits on natural death</li>
              <li>• <strong>Higher premiums:</strong> Expect to pay more than simplified issue policies due to higher insurer risk</li>
              <li>• <strong>Coverage limits:</strong> Maximum coverage amounts are typically lower than other policy types</li>
              <li>• <strong>Consider alternatives first:</strong> If you can qualify for simplified issue, you&apos;ll likely get better rates</li>
            </ul>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--ba-navy)] mb-6">Who Should Consider Guaranteed Issue?</h2>
          <ul className="space-y-3 mb-8">
            {["People with serious health conditions who can't qualify for other coverage", "Those who have been declined for traditional life insurance", "Anyone who wants coverage without answering health questions", "Seniors who want guaranteed acceptance within age limits"].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-[var(--ba-gold)] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--ba-navy)] mb-6">Common Questions</h2>
          <FAQAccordion faqs={faqs} />
          
          <div className="mt-8"><DisclaimerBlock /></div>
        </div>
      </section>
      <CTASection showForm headline="Learn About Your Options" subheadline="Our agents can help you understand if guaranteed issue is right for you, or if other options may be a better fit." />
    </>
  );
}
