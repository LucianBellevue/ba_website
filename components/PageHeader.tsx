import Breadcrumbs from "./Breadcrumbs";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-[var(--ba-navy)] via-[var(--ba-navy)] to-[#1a3a5c] text-white py-12 md:py-16 relative overflow-hidden">
      {/* Shield pattern background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="page-header-shields" x="0" y="0" width="80" height="100" patternUnits="userSpaceOnUse">
              <path d="M40 8L20 16v16c0 12 8 22 20 26 12-4 20-14 20-26V16L40 8z" fill="white" fillOpacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#page-header-shields)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Breadcrumbs items={breadcrumbs} />
        <h1 
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
          style={{ 
            color: '#FFFFFF', 
            textShadow: '0 2px 4px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)' 
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-xl text-gray-200 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
