"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const FinalExpenseWizard = dynamic(() => import("@/components/calculators/FinalExpenseWizard"), {
  loading: () => <div className="text-center py-12">Loading calculator...</div>,
  ssr: false,
});

const TermLifeWizard = dynamic(() => import("@/components/calculators/TermLifeWizard"), {
  loading: () => <div className="text-center py-12">Loading calculator...</div>,
  ssr: false,
});

interface QuotesPageClientProps {
  defaultProduct: "final-expense" | "term";
}

export default function QuotesPageClient({ defaultProduct }: QuotesPageClientProps) {
  const [activeTab, setActiveTab] = useState<"final-expense" | "term">(defaultProduct);

  return (
    <div>
      <div className="flex rounded-xl overflow-hidden mb-6 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab("final-expense")}
          className={`flex-1 py-4 px-4 font-semibold text-center transition-colors ${
            activeTab === "final-expense"
              ? "bg-ba-navy text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Final Expense
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("term")}
          className={`flex-1 py-4 px-4 font-semibold text-center transition-colors ${
            activeTab === "term"
              ? "bg-ba-navy text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Term Life
        </button>
      </div>

      {activeTab === "final-expense" ? <FinalExpenseWizard /> : <TermLifeWizard />}
    </div>
  );
}
