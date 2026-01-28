import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GuideCard from "@/components/GuideCard";
import CTASection from "@/components/CTASection";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import { defaultOgImage } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Insurance Guides | Educational Resources | Bellevue Assurance",
  description: "Learn about final expense insurance, burial insurance, and coverage options. Educational guides to help you make informed decisions about life insurance.",
  keywords: ["insurance guides", "final expense guides", "burial insurance guides", "life insurance education", "insurance resources"],
  alternates: {
    canonical: `${SITE_CONFIG.url}/guides`,
  },
  openGraph: {
    title: "Insurance Guides | Educational Resources",
    description: "Learn about final expense insurance, burial insurance, and coverage options. Educational guides to help you make informed decisions.",
    url: `${SITE_CONFIG.url}/guides`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insurance Guides | Educational Resources",
    description: "Educational guides to help you make informed decisions about life insurance.",
    images: [defaultOgImage.url],
  },
};

const guides = [
  { slug: "what-is-final-expense-insurance", title: "What Is Final Expense Insurance?", description: "A complete guide to understanding final expense insurance, how it works, and who it's designed for.", category: "Basics", date: "2024" },
  { slug: "burial-insurance-cost-by-age", title: "Burial Insurance Cost by Age", description: "See how age affects burial insurance premiums and what you can expect to pay at different ages.", category: "Costs", date: "2024" },
  { slug: "final-expense-vs-term-life", title: "Final Expense vs. Term Life Insurance", description: "Compare final expense and term life insurance to understand which type of coverage may be right for you.", category: "Comparisons", date: "2024" },
  { slug: "graded-benefit-vs-level-benefit", title: "Graded Benefit vs. Level Benefit Policies", description: "Learn the difference between graded and level benefit policies and when each type makes sense.", category: "Policy Types", date: "2024" },
  { slug: "can-i-get-burial-insurance-with-diabetes", title: "Can I Get Burial Insurance With Diabetes?", description: "Coverage options for people with diabetes and tips for finding affordable rates.", category: "Health Conditions", date: "2024" },
  { slug: "how-much-final-expense-coverage-do-i-need", title: "How Much Final Expense Coverage Do I Need?", description: "Calculate how much coverage you need based on funeral costs and other expenses.", category: "Planning", date: "2024" },
];

export default function GuidesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }]} />
      <PageHeader
        title="Insurance Guides"
        subtitle="Educational resources to help you understand your insurance options."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} {...guide} />
            ))}
          </div>
        </div>
      </section>
      <CTASection headline="Have Questions?" subheadline="Our licensed agents are happy to answer your questions about final expense insurance." />
    </>
  );
}
