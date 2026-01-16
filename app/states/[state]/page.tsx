import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import DisclaimerBlock from "@/components/DisclaimerBlock";
import { FAQSchema } from "@/components/JsonLd";
import { getStateBySlug, getAllStateSlugs } from "@/data/states";
import { SITE_CONFIG } from "@/lib/constants";

interface Props { params: Promise<{ state: string }> }

export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return { title: "State Not Found" };
  return { title: state.seoTitle.replace(" | Bellevue Assurance", ""), description: state.seoDescription };
}

export default async function StatePage({ params }: Props) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const faqs = state.faq.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <>
      <FAQSchema faqs={faqs} />
      <PageHeader 
        title={`Final Expense Insurance in ${state.name}`}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Coverage Areas", href: "/states" }, { name: state.name, href: `/states/${state.slug}` }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 mb-8">{state.shortBlurb}</p>
          
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">How Phone Enrollment Works in {state.name}</h2>
          <p className="text-lg text-gray-700 mb-8">{state.phoneEnrollmentNote}</p>
          
          <div className="bg-ba-bg rounded-lg p-6 mb-8">
            <h3 className="font-serif text-xl font-bold text-ba-navy mb-4">Getting Started is Easy</h3>
            <ol className="space-y-3">
              {["Call our toll-free number or request a quote online", "Speak with a licensed agent about your coverage needs", "Compare quotes from multiple carriers", "Complete your application over the phone", "Get approved and start coverage"].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="w-6 h-6 bg-ba-gold text-ba-navy rounded-full flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-6">{state.name} Final Expense Insurance FAQ</h2>
          <FAQAccordion faqs={faqs} />
          
          {state.slug === "california" && (
            <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <h3 className="font-serif text-lg font-bold text-ba-navy mb-2">California Residents — Important Notice</h3>
              <p className="text-gray-700 mb-3">
                In California, we do business as <strong>Bellevue Insurance Center</strong>. All services, products, and licensed agents remain the same. This name is used to comply with California state regulations.
              </p>
              <p className="text-gray-700 text-sm">
                Our agents are properly licensed to serve California residents. National Producer Number (NPN): <strong>{SITE_CONFIG.npn}</strong>
              </p>
            </div>
          )}
          
          <div className="mt-8"><DisclaimerBlock /></div>
        </div>
      </section>
      <CTASection showForm headline={`Get Your ${state.name} Quote`} subheadline={`Speak with a licensed agent about final expense coverage in ${state.name}.`} />
    </>
  );
}
