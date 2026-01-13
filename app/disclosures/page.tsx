import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DisclaimerBlock from "@/components/DisclaimerBlock";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclosures",
  description: "Important disclosures about Bellevue Assurance insurance products and services.",
};

export default function DisclosuresPage() {
  return (
    <>
      <PageHeader 
        title="Important Disclosures"
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Disclosures", href: "/disclosures" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">About Bellevue Assurance</h2>
          <p className="text-gray-700 mb-6">Bellevue Assurance is a licensed insurance agency that works with multiple insurance carriers to provide final expense, burial insurance, and life insurance products. We are not an insurance company; we are an independent agency that helps consumers find and apply for insurance coverage.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Product Availability</h2>
          <p className="text-gray-700 mb-6">Insurance products and coverage options vary by state. Not all products are available in all states. Coverage amounts, premiums, and policy features are determined by the insurance carrier and may vary based on factors including age, health status, and state of residence.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">No Government Affiliation</h2>
          <p className="text-gray-700 mb-6">Bellevue Assurance is not affiliated with, endorsed by, or connected to any government agency, including Medicare, Medicaid, the Social Security Administration, or the Department of Health and Human Services. The products we offer are not government programs.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Underwriting and Approval</h2>
          <p className="text-gray-700 mb-6">All insurance applications are subject to underwriting approval by the insurance carrier. Submitting an application does not guarantee coverage. The insurance company reserves the right to decline coverage or modify terms based on underwriting review.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Quotes and Pricing</h2>
          <p className="text-gray-700 mb-6">Quotes provided are estimates based on the information provided and are subject to change. Final premiums are determined by the insurance carrier upon completion of the underwriting process. Quoted rates are not guaranteed until a policy is issued.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Compensation Disclosure</h2>
          <p className="text-gray-700 mb-6">Bellevue Assurance and its agents receive compensation from insurance carriers when policies are sold. This compensation does not increase the cost of your policy.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Consumer Communication Consent</h2>
          <p className="text-gray-700 mb-6">By submitting a form on our website or providing your contact information, you consent to be contacted by Bellevue Assurance and its partners via phone, text message, and email regarding insurance products. Standard message and data rates may apply. Consent is not required as a condition of purchase.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Licensing Information</h2>
          <p className="text-gray-700 mb-4">Bellevue Assurance maintains appropriate licenses in states where it conducts business. License information is available upon request.</p>
          <p className="text-gray-700 mb-6">
            <strong>National Producer Number (NPN):</strong> {SITE_CONFIG.npn}<br />
            For questions about licensing, please contact us at {SITE_CONFIG.email}.
          </p>

          <div className="mt-12"><DisclaimerBlock /></div>
        </div>
      </section>
    </>
  );
}
