"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { SITE_CONFIG } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { FiPhone, FiChevronDown, FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { HiShieldCheck } from "react-icons/hi";

const serviceLinks = [
  { href: "/term-life-insurance", label: "Term Life Insurance", desc: "Affordable coverage for a set period" },
  { href: "/final-expense-insurance", label: "Final Expense Insurance", desc: "Coverage for end-of-life costs" },
  { href: "/burial-insurance", label: "Burial Insurance", desc: "Funeral and burial coverage" },
  { href: "/guaranteed-issue-life-insurance", label: "Guaranteed Issue", desc: "No health questions asked" },
  { href: "/quotes", label: "Free Quote Calculator", desc: "Get an instant estimate online" },
];

const mainLinks = [
  { href: "/quotes", label: "Get Estimate" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/states", label: "Coverage Areas" },
  { href: "/guides", label: "Guides" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleCallClick = () => {
    trackEvent("call_click", { location: "header" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] md:h-[88px]">
          <Logo />
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-ba-text hover:text-ba-blue transition-colors font-medium text-base"
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
              >
                Services
                <span className={`inline-block transition-transform ${servicesOpen ? 'rotate-180' : ''}`}><FiChevronDown size={16} /></span>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[400px]">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-2">
                      {serviceLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-ba-bg transition-colors group"
                          onClick={() => setServicesOpen(false)}
                        >
                          <div className="w-10 h-10 rounded-lg bg-ba-blue bg-opacity-10 flex items-center justify-center shrink-0 group-hover:bg-opacity-20 transition-colors">
                            <HiShieldCheck size={20} color="white" />
                          </div>
                          <div>
                            <div className="font-semibold text-ba-navy group-hover:text-ba-blue transition-colors">{link.label}</div>
                            <div className="text-sm text-gray-500">{link.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="bg-ba-bg p-4 border-t border-gray-100">
                      <Link href="/get-a-quote" className="flex items-center justify-between text-ba-navy font-semibold hover:text-ba-blue transition-colors" onClick={() => setServicesOpen(false)}>
                        <span>Get a Free Quote</span>
                        <FiArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Other nav links */}
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ba-text hover:text-ba-blue transition-colors font-medium text-base"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <a
              href={SITE_CONFIG.phoneTel}
              onClick={handleCallClick}
              className="flex items-center gap-2 text-ba-navy font-semibold hover:text-ba-blue transition-colors"
            >
<FiPhone size={20} />
              <span className="hidden xl:inline">Call Now:</span> {SITE_CONFIG.phoneFormatted}
            </a>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center px-5 py-2.5 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-all shadow-sm"
            >
              Get a Quote
            </Link>
          </div>
          <button
            type="button"
            className="lg:hidden p-2 text-ba-navy"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
{mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 space-y-2" aria-label="Mobile navigation">
            {/* Mobile Services Section */}
            <div className="pb-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Insurance Products</div>
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-ba-text hover:text-ba-blue font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-2">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-ba-text hover:text-ba-blue font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <a
                href={SITE_CONFIG.phoneTel}
                onClick={handleCallClick}
                className="flex items-center justify-center gap-2 py-3 bg-ba-navy text-white font-semibold rounded-lg"
              >
<FiPhone size={20} color="white" />
                Call {SITE_CONFIG.phoneFormatted}
              </a>
              <Link
                href="/get-a-quote"
                className="block text-center py-3 bg-ba-gold text-ba-navy font-semibold rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
