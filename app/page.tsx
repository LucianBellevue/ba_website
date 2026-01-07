import Link from "next/link";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import CTASection from "@/components/CTASection";
import Testimonials from "@/components/Testimonials";
import FAQAccordion from "@/components/FAQAccordion";
import StateCard from "@/components/StateCard";
import { states } from "@/data/states";
import { HiShieldCheck } from "react-icons/hi";
import { FiPhone, FiCheckCircle, FiChevronRight, FiArrowRight } from "react-icons/fi";

const homeFaqs = [
  { question: "What is final expense insurance?", answer: "Final expense insurance is a type of whole life insurance designed to cover end-of-life costs such as funeral expenses, burial costs, and outstanding medical bills. It typically offers coverage amounts between $5,000 and $35,000." },
  { question: "How much does final expense insurance cost?", answer: "Premiums vary based on age, health, and coverage amount. Most people pay between $30-$100 per month for adequate coverage. We can provide you with a personalized quote based on your specific situation." },
  { question: "Do I need a medical exam?", answer: "Many final expense policies don't require a medical exam. Simplified issue policies ask a few health questions, while guaranteed issue policies accept all applicants regardless of health status." },
  { question: "How do I apply?", answer: "You can apply by calling our toll-free number or filling out our online quote form. A licensed agent will walk you through your options and help you apply—the entire process typically takes 15-30 minutes." },
];

export default function Home() {
  return (
    <>
      <Hero
        headline="Final Expense & Life Insurance — Fast Phone Quotes"
        subheadline="Protect your loved ones from the financial burden of funeral costs. Get affordable coverage with fixed premiums that never increase."
        bullets={[
          "Fixed premiums that never increase",
          "Coverage to help with funeral and burial expenses",
          "No medical exam options available",
          "Flexible coverage amounts from $5,000 to $35,000",
        ]}
      />
      <TrustBar />
      
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ba-navy mb-4">Why Choose Bellevue Assurance?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We make getting final expense insurance simple, affordable, and stress-free.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
<div className="text-center p-6">
              <div className="w-16 h-16 bg-ba-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiShieldCheck size={32} color="white" />
              </div>
              <h3 className="font-serif text-xl font-bold text-ba-navy mb-2">Licensed Agents</h3>
              <p className="text-gray-600">Speak with knowledgeable, licensed insurance professionals who understand your needs.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ba-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPhone size={32} color="white" />
              </div>
              <h3 className="font-serif text-xl font-bold text-ba-navy mb-2">Fast Phone Quotes</h3>
              <p className="text-gray-600">Get personalized quotes in minutes—no lengthy applications or confusing paperwork.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ba-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle size={32} color="white" />
              </div>
              <h3 className="font-serif text-xl font-bold text-ba-navy mb-2">No Obligation</h3>
              <p className="text-gray-600">Compare options at your own pace. We&apos;re here to help, not pressure you.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-ba-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ba-navy mb-4">Our Insurance Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Find the right coverage for your needs and budget.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Final Expense Insurance", href: "/final-expense-insurance", desc: "Affordable whole life coverage to help with end-of-life costs." },
              { title: "Burial Insurance", href: "/burial-insurance", desc: "Coverage specifically designed for funeral and burial expenses." },
              { title: "Life Insurance for Seniors", href: "/life-insurance-for-seniors", desc: "Options tailored for adults 50 and older." },
              { title: "Guaranteed Issue", href: "/guaranteed-issue-life-insurance", desc: "Coverage with no health questions—acceptance for all who qualify by age." },
            ].map((product, i) => (
              <Link key={i} href={product.href} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-ba-blue transition-all">
                <h3 className="font-serif text-lg font-bold text-ba-navy mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.desc}</p>
                <span className="text-ba-blue font-medium text-sm inline-flex items-center gap-1">Learn more <FiChevronRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ba-navy mb-4">Coverage in Your State</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We help families across the country find affordable final expense insurance.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {states.slice(0, 8).map((state) => (
              <StateCard key={state.slug} name={state.name} slug={state.slug} shortBlurb={state.shortBlurb} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/states" className="inline-flex items-center gap-2 text-ba-blue font-semibold hover:underline">
              View all coverage areas <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-ba-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ba-navy mb-4">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion faqs={homeFaqs} />
        </div>
      </section>

      <CTASection showForm headline="Get Your Free Quote Today" subheadline="Speak with a licensed agent and find the right coverage for your family." />
    </>
  );
}
