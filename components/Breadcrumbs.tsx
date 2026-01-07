import Link from "next/link";
import { BreadcrumbSchema } from "./JsonLd";

interface BreadcrumbItem { name: string; href: string; }

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
}

export default function Breadcrumbs({ items, variant = "dark" }: BreadcrumbsProps) {
  const isLight = variant === "light";
  
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center">
              {i > 0 && <span className={`mx-2 ${isLight ? 'text-gray-400' : 'text-gray-400'}`}>/</span>}
              {i === items.length - 1 ? (
                <span className={isLight ? 'text-gray-600' : 'text-gray-300'}>{item.name}</span>
              ) : (
                <Link href={item.href} className={`hover:underline ${isLight ? 'text-ba-blue' : 'text-ba-gold'}`}>{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
