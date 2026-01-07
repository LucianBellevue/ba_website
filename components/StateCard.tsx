import Link from "next/link";

interface StateCardProps {
  name: string;
  slug: string;
  shortBlurb: string;
}

export default function StateCard({ name, slug, shortBlurb }: StateCardProps) {
  return (
    <Link href={`/states/${slug}`} className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-ba-blue transition-all">
      <h3 className="font-serif text-xl font-bold text-ba-navy mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{shortBlurb}</p>
      <span className="text-ba-blue font-medium text-sm inline-flex items-center gap-1">
        Learn more
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </span>
    </Link>
  );
}
