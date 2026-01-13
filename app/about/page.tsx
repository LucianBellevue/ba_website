import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import TrustBar from "@/components/TrustBar";
import { FiCheckCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Bellevue Assurance and our mission to help families find affordable final expense and life insurance coverage.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader 
        title="About Bellevue Assurance"
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "About Us", href: "/about" }]}
      />
      <TrustBar />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              At Bellevue Assurance, we believe every family deserves access to affordable final expense and life insurance coverage. 
              Our mission is to simplify the process of protecting your loved ones by providing clear information, personalized guidance, 
              and compassionate service.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              We understand that discussing end-of-life planning can be difficult. That&apos;s why our licensed agents are trained to listen, 
              answer your questions, and help you find coverage that fits your needs—without any pressure or obligation.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Who We Are</h2>
            <p className="text-lg text-gray-700 mb-6">
              Bellevue Assurance is a telesales insurance agency specializing in final expense, burial insurance, and life insurance 
              for seniors. We work with multiple top-rated insurance carriers to offer our clients a range of coverage options at 
              competitive prices.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Our team of licensed agents serves families across multiple states, providing personalized quotes and enrollment 
              assistance entirely by phone. We&apos;re committed to making the insurance process as simple and stress-free as possible.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                { title: "Transparency", desc: "We provide clear, honest information about coverage options, costs, and policy terms." },
                { title: "Compassion", desc: "We treat every caller with respect and understanding, recognizing the importance of their decision." },
                { title: "Expertise", desc: "Our licensed agents stay current on products and regulations to give you the best guidance." },
                { title: "No Pressure", desc: "We're here to help you make an informed decision—not to push you into anything." },
              ].map((value, i) => (
                <div key={i} className="bg-ba-bg p-6 rounded-lg">
                  <h3 className="font-serif text-xl font-bold text-ba-navy mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">Why Choose Us?</h2>
            <ul className="space-y-4 mb-8">
              {[
                "Licensed agents available to answer your questions",
                "Quotes from multiple top-rated insurance carriers",
                "No-obligation consultations—take your time to decide",
                "Phone-based enrollment from the comfort of your home",
                "Coverage options for various health conditions and budgets",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                  <FiCheckCircle className="w-6 h-6 text-ba-gold shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CTASection headline="Ready to Learn More?" subheadline="Our licensed agents are here to answer your questions and help you find the right coverage." />
    </>
  );
}
