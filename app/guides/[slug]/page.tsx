import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { SITE_CONFIG } from "@/lib/constants";
import { getGuideBySlug, getAllGuideSlugs, guides } from "@/lib/guides";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found" };
  return { title: guide.title, description: guide.description };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const otherGuides = guides.filter((g) => g.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHeader 
        title={guide.title}
        subtitle={guide.category}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }, { name: guide.title, href: `/guides/${guide.slug}` }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            {guide.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-lg text-gray-700 mb-6">{para}</p>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-[var(--ba-bg)] rounded-lg">
            <h3 className="font-serif text-xl font-bold text-[var(--ba-navy)] mb-4">Ready to Get Started?</h3>
            <p className="text-gray-700 mb-4">Our licensed agents can answer your questions and provide personalized quotes.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--ba-navy)] text-white font-semibold rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call {SITE_CONFIG.phoneFormatted}
              </a>
              <Link href="/get-a-quote" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--ba-gold)] text-[var(--ba-navy)] font-semibold rounded-lg">Get a Quote</Link>
            </div>
          </div>

          {otherGuides.length > 0 && (
            <div className="mt-12">
              <h3 className="font-serif text-2xl font-bold text-[var(--ba-navy)] mb-6">Related Guides</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {otherGuides.map((g) => (
                  <Link key={g.slug} href={`/guides/${g.slug}`} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[var(--ba-blue)] transition-colors">
                    <span className="text-xs text-[var(--ba-blue)] uppercase">{g.category}</span>
                    <h4 className="font-semibold text-[var(--ba-navy)] mt-1">{g.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <CTASection headline="Questions About Coverage?" subheadline="Our licensed agents are ready to help you find the right policy." />
    </>
  );
}
