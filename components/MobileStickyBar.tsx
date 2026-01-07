"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { FiPhone, FiFileText } from "react-icons/fi";

export default function MobileStickyBar() {
  const handleCallClick = () => trackEvent("call_click", { location: "mobile_sticky_bar" });
  const handleQuoteClick = () => trackEvent("quote_click", { location: "mobile_sticky_bar" });

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex">
        <a
          href={SITE_CONFIG.phoneTel}
          onClick={handleCallClick}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-ba-navy text-white font-semibold"
        >
<FiPhone size={20} color="white" />
          Call Now
        </a>
        <Link
          href="/get-a-quote"
          onClick={handleQuoteClick}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-ba-gold text-ba-navy font-semibold"
        >
<FiFileText size={20} color="var(--ba-navy)" />
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
