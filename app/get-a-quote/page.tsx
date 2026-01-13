import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import LeadForm from "@/components/LeadForm";
import TrustBar from "@/components/TrustBar";
import { SITE_CONFIG } from "@/lib/constants";
import { FiArrowRight, FiCheckCircle, FiPhone } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Get your free life insurance quote. Compare final expense and term life options. No obligation, no pressure. Licensed agents ready to help.",
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
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Why Get a Quote?</h2>
              <ul className="space-y-4 mb-8">
                {["Compare rates from multiple top-rated carriers", "Get personalized coverage recommendations", "No obligation—take your time to decide", "Expert guidance from licensed agents", "Coverage can begin as soon as you're approved"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                    <FiCheckCircle className="w-6 h-6 text-ba-gold shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-ba-bg rounded-lg p-6 mb-6">
                <h3 className="font-serif text-xl font-bold text-ba-navy mb-4">Prefer to Call?</h3>
                <p className="text-gray-700 mb-4">Speak directly with a licensed agent who can answer your questions and provide quotes over the phone.</p>
                <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 text-2xl font-bold text-ba-blue">
                  <FiPhone className="w-6 h-6" />
                  {SITE_CONFIG.phoneFormatted}
                </a>
              </div>

              <div className="bg-white border-2 border-ba-gold rounded-lg p-6">
                <h3 className="font-serif text-xl font-bold text-ba-navy mb-3">Not Sure What Coverage You Need?</h3>
                <p className="text-gray-700 mb-4">Use our free quote calculator to explore coverage options and see estimated premiums instantly — no contact info required to start.</p>
                <Link 
                  href="/quotes" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors"
                >
                  Try the Quote Calculator
                  <FiArrowRight size={18} />
                </Link>
              </div>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
