import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { FiPhone, FiArrowRight } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

interface HeroProps {
  headline: string;
  subheadline?: string;
  bullets?: string[];
  showCTAs?: boolean;
  showShield?: boolean;
  className?: string;
}

export default function Hero({ headline, subheadline, bullets, showCTAs = true, showShield = true, className = "" }: HeroProps) {
  return (
    <section className={`bg-linear-to-br from-ba-navy via-ba-navy to-ba-blue text-white py-16 md:py-24 relative overflow-hidden ${className}`}>
      {/* Shield pattern background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-shields" x="0" y="0" width="100" height="120" patternUnits="userSpaceOnUse">
              <path d="M50 10L25 20v20c0 15 10 28 25 32 15-4 25-17 25-32V20L50 10z" fill="white" fillOpacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-shields)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{headline}</h1>
            {subheadline && <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">{subheadline}</p>}
            {bullets && bullets.length > 0 && (
              <ul className="space-y-3 mb-8">
                {bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-lg text-gray-200">
                    <span className="shrink-0 mt-0.5"><FiCheckCircle size={24} color="var(--ba-gold)" /></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
            {showCTAs && (
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-ba-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg shadow-lg">
                  <FiPhone size={20} color="var(--ba-navy)" />
                  Call Now: {SITE_CONFIG.phoneFormatted}
                </a>
                <Link href="/get-a-quote" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors text-lg shadow-lg">
                  Get a Free Quote
                  <FiArrowRight size={20} color="var(--ba-navy)" />
                </Link>
              </div>
            )}
          </div>
          {showShield && (
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-ba-gold opacity-20 blur-3xl rounded-full"></div>
                <Image
                  src="/bellevue_shield_logo.svg"
                  alt="Bellevue Assurance Shield"
                  width={400}
                  height={400}
                  className="relative w-64 xl:w-80 h-auto drop-shadow-2xl brightness-0 invert"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
