import Link from "next/link";

interface GuideCardProps {
  title: string;
  slug: string;
  description: string;
  date?: string;
  category?: string;
}

export default function GuideCard({ title, slug, description, date, category }: GuideCardProps) {
  return (
    <Link href={`/guides/${slug}`} className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-[var(--ba-blue)] transition-all">
      {category && <span className="text-xs font-medium text-[var(--ba-blue)] uppercase tracking-wide mb-2 block">{category}</span>}
      <h3 className="font-serif text-xl font-bold text-[var(--ba-navy)] mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-[var(--ba-blue)] font-medium text-sm inline-flex items-center gap-1">
          Read guide
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </span>
        {date && <span className="text-xs text-gray-400">{date}</span>}
      </div>
    </Link>
  );
}
