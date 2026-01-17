import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Get answers to common questions about simplified term life, whole life, final expense insurance, and no medical exam coverage options.",
  keywords: ["simplified term life faq", "whole life insurance faq", "no medical exam life insurance questions", "final expense insurance faq"],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Life Insurance FAQ - Common Questions Answered",
    description: "Get answers about simplified term life, whole life, and final expense insurance. No medical exam options explained.",
    url: "/faq",
  },
};

const faqs = [
  { question: "What is simplified term life insurance?", answer: "Simplified term life insurance is a type of term life policy that streamlines the application process with minimal health questions and no medical exam required. This approach provides faster approvals, often within days. Coverage is available for 10, 20, or 30 years with level premiums." },
  { question: "What is whole life insurance?", answer: "Whole life insurance is permanent life insurance that provides coverage for your entire lifetime. It features level premiums that never increase, guaranteed death benefits, and cash value that accumulates over time. It's ideal for long-term financial planning and leaving a legacy." },
  { question: "What is final expense insurance?", answer: "Final expense insurance is a type of whole life insurance designed to cover end-of-life costs such as funeral expenses, burial costs, outstanding medical bills, and other debts. Coverage amounts typically range from $5,000 to $35,000." },
  { question: "What is the difference between final expense and burial insurance?", answer: "The terms are often used interchangeably. Both refer to small whole life insurance policies designed to cover funeral and burial costs. Some people use 'burial insurance' specifically for policies intended to cover funeral expenses only." },
  { question: "How much does term life insurance cost?", answer: "Term life insurance costs vary by age, health, coverage amount, and term length. Simplified term life policies can start as low as $20-50 per month for younger, healthy applicants. We work with top carriers to find you competitive rates." },
  { question: "How much does final expense insurance cost?", answer: "Premiums vary based on age, health, coverage amount, and policy type. Most people pay between $30-$100 per month. We can provide a personalized quote based on your specific situation." },
  { question: "Do I need a medical exam to get coverage?", answer: "Many of our policies don't require a medical exam. Simplified term life insurance asks minimal health questions but no exam for qualified applicants. Whole life, final expense, and guaranteed issue policies also offer no-exam options." },
  { question: "What ages can apply for final expense insurance?", answer: "Most carriers offer coverage to applicants ages 50-85. Some products are available to younger or older applicants depending on the carrier." },
  { question: "Can I get coverage if I have health problems?", answer: "Yes. Many carriers offer coverage to people with health conditions like diabetes, heart disease, or cancer history. Guaranteed issue policies accept all applicants regardless of health status." },
  { question: "How do I apply?", answer: "You can apply by calling our toll-free number or submitting our online quote form. A licensed agent will review your options and help you complete the application—typically in 15-30 minutes." },
  { question: "How quickly can I get coverage?", answer: "Many applications receive same-day approval. Coverage can begin immediately upon approval, though some policies have a graded benefit waiting period." },
  { question: "What is a graded benefit policy?", answer: "Graded benefit policies have a waiting period (usually 2 years) during which the full death benefit isn't paid if death occurs from natural causes. They're often used for guaranteed issue policies." },
  { question: "Can I cancel my policy?", answer: "Yes, most policies have a free-look period (typically 10-30 days) during which you can cancel for a full refund. After that, you can cancel anytime, though you may not receive a refund of premiums paid." },
  { question: "Will my premiums increase?", answer: "No. Final expense insurance is whole life insurance with level premiums that never increase. Your rate is locked in when you apply." },
  { question: "Who receives the death benefit?", answer: "The beneficiary you name on your policy receives the death benefit. This can be a family member, friend, or anyone you choose. You can change your beneficiary at any time." },
  { question: "Is the death benefit taxable?", answer: "In most cases, life insurance death benefits are not subject to federal income tax. However, consult a tax professional for advice on your specific situation." },
  { question: "What states do you serve?", answer: "We serve families in multiple states across the country. Contact us to confirm coverage availability in your state." },
];

export default function FAQPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <PageHeader 
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about final expense and burial insurance."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
      <CTASection headline="Still Have Questions?" subheadline="Our licensed agents are ready to answer your questions and help you find the right coverage." />
    </>
  );
}
