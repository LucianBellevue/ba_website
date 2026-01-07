"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";
import { SITE_CONFIG } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { mainNavigation, mobileNavSections } from "@/lib/navigation";
import { FiPhone, FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const handleCallClick = () => {
    trackEvent("call_click", { location: "header" });
  };

  const toggleMobileSection = (title: string) => {
    setMobileAccordion(mobileAccordion === title ? null : title);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] md:h-[88px]">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {mainNavigation.map((item) => {
              if (item.type === "dropdown" && item.dropdown) {
                return (
                  <NavDropdown key={item.dropdown.id} dropdown={item.dropdown} />
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="text-ba-text hover:text-ba-blue transition-colors font-medium text-base px-4 py-2"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
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

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-72px)] overflow-y-auto">
          <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {mobileNavSections.map((section) => (
              <div key={section.title} className="border-b border-gray-100 pb-2 mb-2">
                <button
                  type="button"
                  onClick={() => toggleMobileSection(section.title)}
                  className="w-full flex items-center justify-between py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {section.title}
                  <span className={`transition-transform ${mobileAccordion === section.title ? "rotate-180" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                {mobileAccordion === section.title && (
                  <div className="pb-2">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block py-2.5 pl-2 text-ba-text hover:text-ba-blue font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Quick Links */}
            <Link
              href="/quotes"
              className="block py-2.5 text-ba-text hover:text-ba-blue font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Estimate
            </Link>

            {/* Mobile CTAs */}
            <div className="pt-4 border-t border-gray-200 space-y-3 mt-2">
              <a
                href={SITE_CONFIG.phoneTel}
                onClick={handleCallClick}
                className="flex items-center justify-center gap-2 py-3 bg-ba-navy text-white font-semibold rounded-lg"
              >
                <FiPhone size={20} />
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
