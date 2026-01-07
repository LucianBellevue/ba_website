import Link from "next/link";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import CTASection from "@/components/CTASection";
import Testimonials from "@/components/Testimonials";
import FAQAccordion from "@/components/FAQAccordion";
import StateCard from "@/components/StateCard";
import { states } from "@/data/states";

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
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--ba-navy)] mb-4">Why Choose Bellevue Assurance?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We make getting final expense insurance simple, affordable, and stress-free.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Licensed Agents", desc: "Speak with knowledgeable, licensed insurance professionals who understand your needs.", icon: "shield" },
              { title: "Fast Phone Quotes", desc: "Get personalized quotes in minutes—no lengthy applications or confusing paperwork.", icon: "phone" },
              { title: "No Obligation", desc: "Compare options at your own pace. We're here to help, not pressure you.", icon: "check" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-[var(--ba-blue)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[var(--ba-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon === "shield" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                    {item.icon === "phone" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                    {item.icon === "check" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-[var(--ba-navy)] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[var(--ba-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--ba-navy)] mb-4">Our Insurance Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Find the right coverage for your needs and budget.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Final Expense Insurance", href: "/final-expense-insurance", desc: "Affordable whole life coverage to help with end-of-life costs." },
              { title: "Burial Insurance", href: "/burial-insurance", desc: "Coverage specifically designed for funeral and burial expenses." },
              { title: "Life Insurance for Seniors", href: "/life-insurance-for-seniors", desc: "Options tailored for adults 50 and older." },
              { title: "Guaranteed Issue", href: "/guaranteed-issue-life-insurance", desc: "Coverage with no health questions—acceptance for all who qualify by age." },
            ].map((product, i) => (
              <Link key={i} href={product.href} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-[var(--ba-blue)] transition-all">
                <h3 className="font-serif text-lg font-bold text-[var(--ba-navy)] mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.desc}</p>
                <span className="text-[var(--ba-blue)] font-medium text-sm inline-flex items-center gap-1">Learn more <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--ba-navy)] mb-4">Coverage in Your State</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We help families across the country find affordable final expense insurance.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {states.slice(0, 8).map((state) => (
              <StateCard key={state.slug} name={state.name} slug={state.slug} shortBlurb={state.shortBlurb} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/states" className="inline-flex items-center gap-2 text-[var(--ba-blue)] font-semibold hover:underline">
              View all coverage areas <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[var(--ba-bg)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--ba-navy)] mb-4">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion faqs={homeFaqs} />
        </div>
      </section>

      <CTASection showForm headline="Get Your Free Quote Today" subheadline="Speak with a licensed agent and find the right coverage for your family." />
    </>
  );
}
