import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Bellevue Assurance privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader 
        title="Privacy Policy"
        subtitle="Last updated: January 2024"
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy-policy" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose">
          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Introduction</h2>
          <p className="text-gray-700 mb-6">Bellevue Assurance (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-4">We may collect personal information that you voluntarily provide, including:</p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Name, email address, phone number, and mailing address</li>
            <li>Date of birth and age</li>
            <li>State of residence</li>
            <li>Health information relevant to insurance applications</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use the information we collect to:</p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Provide insurance quotes and process applications</li>
            <li>Communicate with you about products and services</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Comply with legal and regulatory requirements</li>
            <li>Improve our website and services</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Information Sharing</h2>
          <p className="text-gray-700 mb-6">We may share your information with insurance carriers to obtain quotes and process applications, service providers who assist with our operations, and as required by law or to protect our rights. We do not sell your personal information to third parties.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-6">You may request access to, correction of, or deletion of your personal information by contacting us. You may also opt out of marketing communications at any time.</p>

          <h2 className="font-serif text-2xl font-bold text-ba-navy mb-4">Contact Us</h2>
          <p className="text-gray-700">If you have questions about this Privacy Policy, please contact us at info@bellevueassurance.com or call (470) 202-8817.</p>
        </div>
      </section>
    </>
  );
}
