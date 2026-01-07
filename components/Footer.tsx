import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";
import DisclaimerBlock from "./DisclaimerBlock";
import { FiPhone } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--ba-navy)] text-white relative overflow-hidden">
      {/* Shield pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-shields" x="0" y="0" width="80" height="100" patternUnits="userSpaceOnUse">
              <path d="M40 5L20 12v14c0 11 8 21 20 24 12-3 20-13 20-24V12L40 5z" fill="white" fillOpacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-shields)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 relative">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="block mb-6">
              <Image
                src="/bellevue_footer_logo.svg"
                alt="Bellevue Assurance"
                width={220}
                height={70}
                className="h-14 md:h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 text-base mb-4">
              Helping families protect their loved ones with affordable final expense and life insurance coverage.
            </p>
            <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 text-[var(--ba-gold)] hover:text-white transition-colors font-semibold text-lg">
              <FiPhone size={20} color="var(--ba-gold)" />
              {SITE_CONFIG.phoneFormatted}
            </a>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4">Insurance Products</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.insurance.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-[var(--ba-gold)] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-[var(--ba-gold)] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-[var(--ba-gold)] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400"><strong className="text-gray-300">Licensed Agents</strong></p>
              <p className="text-sm text-gray-400 mt-1">NPN: #XXXXXXX<br />State Licenses: Available upon request</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700">
          <DisclaimerBlock variant="footer" />
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© {currentYear} Bellevue Assurance. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-[var(--ba-gold)] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-[var(--ba-gold)] transition-colors">Terms</Link>
            <Link href="/disclosures" className="text-sm text-gray-400 hover:text-[var(--ba-gold)] transition-colors">Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
