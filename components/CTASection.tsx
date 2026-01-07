import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import LeadForm from "./LeadForm";
import { FiPhone, FiArrowRight, FiCheckCircle } from "react-icons/fi";

interface CTASectionProps {
  headline?: string;
  subheadline?: string;
  showForm?: boolean;
  variant?: "default" | "dark" | "light";
  className?: string;
}

export default function CTASection({ headline = "Ready to Get Started?", subheadline = "Speak with a licensed agent today. No obligation, no pressure.", showForm = false, variant = "default", className = "" }: CTASectionProps) {
  const bg = { default: "bg-[var(--ba-blue)]", dark: "bg-[var(--ba-navy)]", light: "bg-gray-100" };
  const isLight = variant === "light";

  return (
    <section className={`${bg[variant]} py-16 md:py-20 relative overflow-hidden ${className}`}>
      {/* Shield pattern background for blue/navy variants */}
      {!isLight && (
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none text-white" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-shields" x="0" y="0" width="80" height="100" patternUnits="userSpaceOnUse">
                <path d="M40 8L20 16v16c0 12 8 22 20 26 12-4 20-14 20-26V16L40 8z" fill="currentColor" fillOpacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-shields)" />
          </svg>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {showForm ? (
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className={isLight ? "text-[var(--ba-navy)]" : "text-white"}>
              <h2 className={`font-serif text-3xl md:text-4xl font-bold mb-4 ${isLight ? "text-[var(--ba-navy)]" : "text-white"}`}>{headline}</h2>
              <p className={`text-xl mb-8 ${isLight ? "text-gray-700" : "text-gray-200"}`}>{subheadline}</p>
              <div className="space-y-4">
                <h3 className={`font-semibold text-lg ${isLight ? "text-[var(--ba-navy)]" : "text-white"}`}>What to expect on the call:</h3>
                <ul className="space-y-3">
                  {["A friendly, licensed agent will answer your questions", "We'll review your coverage needs and budget", "You'll receive personalized quotes from top-rated carriers", "No pressure — take your time to decide"].map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 ${isLight ? "text-gray-700" : "text-gray-200"}`}>
                      <span className="shrink-0 mt-0.5"><FiCheckCircle size={20} color="var(--ba-gold)" /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <p className={`text-lg font-semibold ${isLight ? "text-[var(--ba-navy)]" : "text-white"}`}>Or call us directly:</p>
                  <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 text-2xl font-bold text-[var(--ba-gold)] hover:opacity-90 transition-colors mt-2">
                    <FiPhone size={24} color="var(--ba-gold)" />
                    {SITE_CONFIG.phoneFormatted}
                  </a>
                </div>
              </div>
            </div>
            <LeadForm />
          </div>
        ) : (
          <div className={`text-center ${isLight ? "text-[var(--ba-navy)]" : "text-white"}`}>
            <h2 className={`font-serif text-3xl md:text-4xl font-bold mb-4 ${isLight ? "text-[var(--ba-navy)]" : "text-white"}`}>{headline}</h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isLight ? "text-gray-700" : "text-gray-200"}`}>{subheadline}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={SITE_CONFIG.phoneTel} className={`inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg text-lg shadow-lg transition-colors ${isLight ? "bg-[var(--ba-navy)] text-white hover:opacity-90" : "bg-white text-[var(--ba-navy)] hover:bg-gray-100"}`}>
                <FiPhone size={20} color={isLight ? "white" : "var(--ba-navy)"} />
                Call {SITE_CONFIG.phoneFormatted}
              </a>
              <Link href="/get-a-quote" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--ba-gold)] text-[var(--ba-navy)] font-semibold rounded-lg hover:opacity-90 transition-colors text-lg shadow-lg">
                Get a Free Quote
                <FiArrowRight size={20} color="var(--ba-navy)" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
