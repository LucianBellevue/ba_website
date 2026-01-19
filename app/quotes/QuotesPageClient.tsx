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

const WholeLifeWizard = dynamic(() => import("@/components/calculators/WholeLifeWizard"), {
  loading: () => <div className="text-center py-12">Loading calculator...</div>,
  ssr: false,
});

type ProductTab = "final-expense" | "term" | "whole-life";

interface QuotesPageClientProps {
  defaultProduct: "final-expense" | "term";
}

export default function QuotesPageClient({ defaultProduct }: QuotesPageClientProps) {
  const [activeTab, setActiveTab] = useState<ProductTab>(defaultProduct);

  return (
    <div>
      <div className="flex rounded-xl overflow-hidden mb-6 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab("final-expense")}
          className={`flex-1 py-3 px-3 font-semibold text-center transition-colors text-sm md:text-base ${
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
          className={`flex-1 py-3 px-3 font-semibold text-center transition-colors text-sm md:text-base ${
            activeTab === "term"
              ? "bg-ba-navy text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Term Life
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("whole-life")}
          className={`flex-1 py-3 px-3 font-semibold text-center transition-colors text-sm md:text-base ${
            activeTab === "whole-life"
              ? "bg-ba-navy text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Whole Life
        </button>
      </div>

      {activeTab === "final-expense" && <FinalExpenseWizard />}
      {activeTab === "term" && <TermLifeWizard />}
      {activeTab === "whole-life" && <WholeLifeWizard />}
    </div>
  );
}
