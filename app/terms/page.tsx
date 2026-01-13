import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Bellevue Assurance terms of service. Read our terms and conditions for using our website and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader 
        title="Terms of Service"
        subtitle="Last updated: January 2024"
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Terms of Service", href: "/terms" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Agreement to Terms</h2>
          <p className="text-gray-700 mb-6">By accessing or using the Bellevue Assurance website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Use of Website</h2>
          <p className="text-gray-700 mb-6">This website is provided for informational purposes and to facilitate insurance inquiries. You agree to use the website only for lawful purposes and in accordance with these terms. You may not use the website in any way that could damage, disable, or impair its operation.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Insurance Services</h2>
          <p className="text-gray-700 mb-6">Bellevue Assurance is a licensed insurance agency. Insurance products are offered through various insurance carriers. Coverage availability, terms, and pricing vary by state and carrier. All insurance applications are subject to underwriting approval by the respective insurance company.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">No Guarantee of Coverage</h2>
          <p className="text-gray-700 mb-6">Information provided on this website is for general informational purposes only and does not constitute a guarantee of coverage or approval. Actual coverage terms, conditions, and premiums are determined by the insurance carrier upon application review.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Intellectual Property</h2>
          <p className="text-gray-700 mb-6">All content on this website, including text, graphics, logos, and images, is the property of Bellevue Assurance or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written consent.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">To the maximum extent permitted by law, Bellevue Assurance shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or services.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Changes to Terms</h2>
          <p className="text-gray-700 mb-6">We reserve the right to modify these terms at any time. Changes will be effective upon posting to the website. Your continued use of the website constitutes acceptance of the modified terms.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Contact</h2>
          <p className="text-gray-700 mb-2">Questions about these Terms of Service may be directed to:</p>
          <p className="text-gray-700">
            Email: {SITE_CONFIG.email}<br />
            Phone: {SITE_CONFIG.phoneFormatted}<br />
            NPN: {SITE_CONFIG.npn}
          </p>
        </div>
      </section>
    </>
  );
}
