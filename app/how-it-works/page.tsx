import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { SITE_CONFIG } from "@/lib/constants";
import { defaultOgImage } from "@/lib/metadata";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { FiCheckCircle, FiPhone } from "react-icons/fi";

export const metadata: Metadata = {
  title: "How It Works | Simple Life Insurance Enrollment Process",
  description: "Learn how easy it is to get life insurance with Bellevue Assurance. Simplified term life, whole life, and final expense options. Simple phone enrollment, fast quotes in 4 easy steps.",
  keywords: ["simplified term life insurance", "whole life insurance", "no medical exam life insurance", "how to buy life insurance", "phone enrollment"],
  alternates: {
    canonical: `${SITE_CONFIG.url}/how-it-works`,
  },
  openGraph: {
    title: "How to Get Life Insurance - Simple Process",
    description: "Get simplified term life, whole life, or final expense insurance in 4 easy steps. Phone enrollment, quick approval.",
    url: `${SITE_CONFIG.url}/how-it-works`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Get Life Insurance - Simple Process",
    description: "Get life insurance in 4 easy steps. Phone enrollment, quick approval.",
    images: [defaultOgImage.url],
  },
};

const steps = [
  { num: 1, title: "Call or Request a Quote", desc: "Contact us by phone or fill out our online form. A licensed agent will reach out to discuss your needs." },
  { num: 2, title: "Review Your Options", desc: "We'll explain coverage options from multiple carriers, answer your questions, and help you find the right fit for your budget." },
  { num: 3, title: "Apply Over the Phone", desc: "Complete your application with your agent's help—typically in 15-30 minutes. No paperwork to mail." },
  { num: 4, title: "Get Approved & Covered", desc: "Many applications receive same-day approval. Your coverage can begin immediately upon approval." },
];

export default function HowItWorksPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "How It Works", href: "/how-it-works" }]} />
      <PageHeader
        title="How It Works"
        subtitle="Getting life insurance is simple. Whether you need simplified term life, whole life, or final expense coverage, here's what to expect."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "How It Works", href: "/how-it-works" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 md:gap-8">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-ba-gold text-ba-navy flex items-center justify-center font-serif text-2xl font-bold">{step.num}</div>
                </div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-3">{step.title}</h2>
                  <p className="text-lg text-gray-700">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-ba-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy text-center mb-8">What to Expect on the Call</h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-4">
              {[
                "A friendly, licensed agent will introduce themselves and ask about your coverage needs",
                "We'll discuss options including simplified term life, whole life, and final expense coverage",
                "You'll receive quotes from top carriers including Ethos, Ameritas, LFG, and Mutual of Omaha",
                "Learn about no medical exam options and quick approval processes",
                "If you're ready, we can complete the application together over the phone",
                "There's no obligation—take your time to decide what's right for you",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                  <FiCheckCircle className="w-6 h-6 text-ba-gold shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ba-navy text-white font-semibold rounded-lg hover:opacity-90 transition-colors text-lg">
                <FiPhone className="w-5 h-5" />
                Call Now: {SITE_CONFIG.phoneFormatted}
              </a>
            </div>
          </div>
        </div>
      </section>
      <CTASection showForm headline="Ready to Get Started?" subheadline="Speak with a licensed agent today and get your personalized quote." />
    </>
  );
}
