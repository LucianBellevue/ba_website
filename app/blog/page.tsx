import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { getAllBlogPosts } from "@/lib/blog";
import { FiClock, FiCalendar, FiTag } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Insurance Blog & Resources | Bellevue Assurance",
  description: "Expert insights on life insurance, final expense, burial insurance, and senior coverage. Stay informed with our comprehensive insurance guides and articles.",
  keywords: "life insurance blog, final expense tips, burial insurance guides, senior insurance resources",
  openGraph: {
    title: "Insurance Blog & Resources | Bellevue Assurance",
    description: "Expert insights on life insurance, final expense, burial insurance, and senior coverage.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <PageHeader 
        title="Insurance Blog & Resources"
        subtitle="Expert insights to help you make informed decisions about life insurance and final expense coverage"
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No blog posts available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {post.image && (
                    <div className="aspect-video bg-ba-navy relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-ba-blue to-ba-navy opacity-80" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-ba-blue bg-blue-50 px-2 py-1 rounded">
                        <FiTag size={12} />
                        {post.category}
                      </span>
                    </div>
                    <h2 className="font-serif text-xl font-bold text-ba-navy mb-3 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-ba-blue transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <FiCalendar size={14} />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-ba-blue font-semibold hover:text-ba-navy transition-colors"
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
