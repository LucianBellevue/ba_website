import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import ComparisonTable, { TableHead, TableBody, TableRow, TableHeader, TableCell } from "@/components/ComparisonTable";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blog";
import { FiClock, FiCalendar, FiTag, FiUser } from "react-icons/fi";
import { ArticleSchema } from "@/components/JsonLd";

interface Props { 
  params: Promise<{ slug: string }> 
}

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Bellevue Assurance Blog`,
    description: post.description,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="font-serif text-3xl md:text-4xl font-bold text-ba-navy mb-6 mt-8" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-4 mt-8" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="font-serif text-xl md:text-2xl font-bold text-ba-navy mb-3 mt-6" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-lg text-gray-700 mb-6 leading-relaxed" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-inside text-lg text-gray-700 mb-6 space-y-2" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="ml-4" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-ba-blue hover:text-ba-navy underline font-semibold" {...props} />,
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-ba-gold pl-6 py-2 italic text-gray-600 my-6 bg-gray-50" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6" {...props} />,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => <ComparisonTable {...props} />,
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <TableHead {...props} />,
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <TableBody {...props} />,
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => <TableRow {...props} />,
  th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => <TableHeader {...props} />,
  td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => <TableCell {...props} />,
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ArticleSchema 
        headline={post.title}
        description={post.description}
        datePublished={post.date}
        author={post.author}
        image={post.image}
      />
      <PageHeader 
        title={post.title}
        breadcrumbs={[
          { name: "Home", href: "/" }, 
          { name: "Blog", href: "/blog" }, 
          { name: post.title, href: `/blog/${post.slug}` }
        ]}
      />
      <article className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-ba-bg rounded-lg p-6 mb-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <FiUser size={16} />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <FiCalendar size={16} />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <FiClock size={16} />
                {post.readTime}
              </span>
              <span className="flex items-center gap-2">
                <FiTag size={16} />
                {post.category}
              </span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-white px-3 py-1 rounded-full text-gray-600 border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-ba-blue hover:text-ba-navy font-semibold transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </article>
      <CTASection headline="Need Help Choosing Coverage?" subheadline="Our licensed agents are here to answer your questions and provide personalized guidance." />
    </>
  );
}
