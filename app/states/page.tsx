import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import StateCard from "@/components/StateCard";
import CTASection from "@/components/CTASection";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import { defaultOgImage } from "@/lib/metadata";
import { states } from "@/data/states";

export const metadata: Metadata = {
  title: "Coverage Areas | Life Insurance by State | Bellevue Assurance",
  description: "Bellevue Assurance offers final expense and burial insurance in multiple states. Find coverage information for your state. Licensed agents ready to help.",
  keywords: ["life insurance by state", "final expense insurance by state", "burial insurance coverage areas", "state insurance coverage"],
  alternates: {
    canonical: `${SITE_CONFIG.url}/states`,
  },
  openGraph: {
    title: "Coverage Areas | Life Insurance by State",
    description: "Bellevue Assurance offers final expense and burial insurance in multiple states. Find coverage information for your state.",
    url: `${SITE_CONFIG.url}/states`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coverage Areas | Life Insurance by State",
    description: "Find final expense and burial insurance coverage in your state.",
    images: [defaultOgImage.url],
  },
};

export default function StatesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Coverage Areas", href: "/states" }]} />
      <PageHeader
        title="Coverage Areas"
        subtitle="We help families across the country find affordable final expense insurance."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Coverage Areas", href: "/states" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {states.map((state) => (
              <StateCard key={state.slug} name={state.name} slug={state.slug} shortBlurb={state.shortBlurb} />
            ))}
          </div>
        </div>
      </section>
      <CTASection headline="Don't See Your State?" subheadline="Call us to check availability in your area. We're continuously expanding our coverage." />
    </>
  );
}
