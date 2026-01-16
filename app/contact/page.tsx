import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LeadForm from "@/components/LeadForm";
import { SITE_CONFIG } from "@/lib/constants";
import { FiPhone, FiMail, FiCheckCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Bellevue Assurance for simplified issue term, fast issue term, and final expense insurance questions. Call our licensed agents or submit a form for a free quote.",
  keywords: ["contact life insurance agent", "simplified issue term quote", "fast issue term quote", "life insurance help"],
  alternates: {
    canonical: "/contact",
  },
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
                Our licensed agents are available to answer your questions about simplified issue term life, 
                fast issue term life, final expense insurance, and no medical exam coverage options. Call us directly or fill out the form 
                and we&apos;ll call you back.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ba-blue bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
                    <FiPhone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ba-navy text-lg">Call Us</h3>
                    <a href={SITE_CONFIG.phoneTel} className="text-ba-blue text-xl font-bold hover:underline">{SITE_CONFIG.phoneFormatted}</a>
                    <p className="text-gray-600 text-sm mt-1">Monday - Friday, 9am - 6pm EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ba-blue bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
                    <FiMail className="w-6 h-6 text-white" />
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
                      <FiCheckCircle className="w-5 h-5 text-ba-gold shrink-0 mt-0.5" />
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
