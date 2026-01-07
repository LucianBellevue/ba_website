"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { FiPhone, FiFileText, FiDollarSign } from "react-icons/fi";

export default function MobileStickyBar() {
  const handleCallClick = () => trackEvent("call_click", { location: "mobile_sticky_bar" });
  const handleQuoteClick = () => trackEvent("quote_click", { location: "mobile_sticky_bar" });
  const handleEstimateClick = () => trackEvent("estimate_click", { location: "mobile_sticky_bar" });

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex">
        <a
          href={SITE_CONFIG.phoneTel}
          onClick={handleCallClick}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-ba-navy text-white font-semibold text-sm"
        >
          <FiPhone size={18} />
          Call
        </a>
        <Link
          href="/quotes"
          onClick={handleEstimateClick}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-ba-blue text-white font-semibold text-sm"
        >
          <FiDollarSign size={18} />
          Estimate
        </Link>
        <Link
          href="/get-a-quote"
          onClick={handleQuoteClick}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-ba-gold text-ba-navy font-semibold text-sm"
        >
          <FiFileText size={18} />
          Quote
        </Link>
      </div>
    </div>
  );
}
