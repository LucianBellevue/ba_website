import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn how easy it is to get final expense insurance with Bellevue Assurance. Simple phone enrollment, fast quotes, and coverage that starts quickly.",
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
      <PageHeader 
        title="How It Works"
        subtitle="Getting final expense insurance is simple. Here's what to expect."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "How It Works", href: "/how-it-works" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 md:gap-8">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[var(--ba-gold)] text-[var(--ba-navy)] flex items-center justify-center font-serif text-2xl font-bold">{step.num}</div>
                </div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--ba-navy)] mb-3">{step.title}</h2>
                  <p className="text-lg text-gray-700">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-[var(--ba-bg)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--ba-navy)] text-center mb-8">What to Expect on the Call</h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-4">
              {[
                "A friendly, licensed agent will introduce themselves and ask about your coverage needs",
                "We'll answer any questions you have about final expense insurance",
                "You'll receive quotes from multiple carriers based on your age, health, and budget",
                "If you're ready, we can complete the application together over the phone",
                "There's no obligation—take your time to decide what's right for you",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[var(--ba-gold)] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--ba-navy)] text-white font-semibold rounded-lg hover:opacity-90 transition-colors text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
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
