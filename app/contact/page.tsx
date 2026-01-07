import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LeadForm from "@/components/LeadForm";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Bellevue Assurance for final expense and life insurance questions. Call our licensed agents or submit a form for a free quote.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader 
        title="Contact Us"
        subtitle="We're here to help. Reach out by phone or fill out the form below."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-700 mb-8">
                Our licensed agents are available to answer your questions about final expense insurance, 
                burial insurance, and life insurance for seniors. Call us directly or fill out the form 
                and we&apos;ll call you back.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ba-blue bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-ba-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ba-navy text-lg">Call Us</h3>
                    <a href={SITE_CONFIG.phoneTel} className="text-ba-blue text-xl font-bold hover:underline">{SITE_CONFIG.phoneFormatted}</a>
                    <p className="text-gray-600 text-sm mt-1">Monday - Friday, 9am - 6pm EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ba-blue bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-ba-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ba-navy text-lg">Email</h3>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-ba-blue hover:underline">{SITE_CONFIG.email}</a>
                  </div>
                </div>
              </div>
              <div className="mt-10 p-6 bg-ba-bg rounded-lg">
                <h3 className="font-serif text-xl font-bold text-ba-navy mb-4">What to Expect</h3>
                <ul className="space-y-3">
                  {["A friendly, licensed agent will call you", "We'll answer your questions about coverage options", "You'll receive personalized quotes—no obligation", "Take your time to decide—no pressure"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-ba-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div><LeadForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}
