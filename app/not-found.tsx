import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="text-center px-4">
        <h1 className="font-serif text-6xl font-bold text-ba-navy mb-4">404</h1>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-ba-navy mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or no longer exists.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-ba-navy text-white font-semibold rounded-lg hover:opacity-90 transition-colors">
            Go to Homepage
          </Link>
          <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            Call Us
          </a>
        </div>
        <div className="mt-12">
          <p className="text-gray-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/final-expense-insurance" className="text-ba-blue hover:underline">Final Expense Insurance</Link>
            <Link href="/get-a-quote" className="text-ba-blue hover:underline">Get a Quote</Link>
            <Link href="/faq" className="text-ba-blue hover:underline">FAQ</Link>
            <Link href="/contact" className="text-ba-blue hover:underline">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
