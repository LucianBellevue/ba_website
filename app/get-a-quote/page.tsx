import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LeadForm from "@/components/LeadForm";
import TrustBar from "@/components/TrustBar";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Get your free final expense insurance quote. No obligation, no pressure. Licensed agents ready to help you find affordable coverage.",
};

export default function GetAQuotePage() {
  return (
    <>
      <PageHeader 
        title="Get Your Free Quote"
        subtitle="Fill out the form below and a licensed agent will contact you with personalized quotes."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Get a Quote", href: "/get-a-quote" }]}
      />
      <TrustBar />
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--ba-navy)] mb-6">Why Get a Quote?</h2>
              <ul className="space-y-4 mb-8">
                {["Compare rates from multiple top-rated carriers", "Get personalized coverage recommendations", "No obligation—take your time to decide", "Expert guidance from licensed agents", "Coverage can begin as soon as you're approved"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                    <svg className="w-6 h-6 text-[var(--ba-gold)] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-[var(--ba-bg)] rounded-lg p-6">
                <h3 className="font-serif text-xl font-bold text-[var(--ba-navy)] mb-4">Prefer to Call?</h3>
                <p className="text-gray-700 mb-4">Speak directly with a licensed agent who can answer your questions and provide quotes over the phone.</p>
                <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 text-2xl font-bold text-[var(--ba-blue)]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {SITE_CONFIG.phoneFormatted}
                </a>
              </div>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
