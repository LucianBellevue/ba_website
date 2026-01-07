"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { FiPhone, FiArrowRight, FiAlertCircle } from "react-icons/fi";

interface AgentReferralCardProps {
  productType: "final_expense" | "term_life";
  reason: "coverage_limit" | "income_limit" | "age_coverage" | "custom";
  customMessage?: string;
  inputs: {
    age: number;
    coverage: string;
    [key: string]: string | number | boolean;
  };
  maxAvailable?: string;
  onEditDetails: () => void;
}

export default function AgentReferralCard({
  productType,
  reason,
  customMessage,
  inputs,
  maxAvailable,
  onEditDetails,
}: AgentReferralCardProps) {
  const productName = productType === "final_expense" ? "Final Expense" : "Term Life";

  const getMessage = () => {
    switch (reason) {
      case "coverage_limit":
        return `Based on your age (${inputs.age}), coverage amounts above ${maxAvailable} typically require personalized underwriting. Our licensed agents can help find the best options for your specific situation.`;
      case "income_limit":
        return `The coverage amount you selected may exceed typical income-based guidelines. Our agents can discuss your specific financial situation to find the right coverage level.`;
      case "age_coverage":
        return `For applicants age ${inputs.age}, ${inputs.coverage} coverage requires additional review. An agent can help identify carriers that may offer this coverage or suggest alternatives.`;
      case "custom":
        return customMessage || "Your request requires personalized attention from a licensed agent.";
      default:
        return "For the coverage amount you've selected, we recommend speaking with a licensed agent who can provide personalized guidance.";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-amber-50 border-b border-amber-200 p-4">
        <div className="flex items-start gap-3">
          <FiAlertCircle className="text-amber-600 shrink-0 mt-0.5" size={24} />
          <div>
            <h3 className="font-serif text-lg font-bold text-ba-navy">
              Speak with an Agent for Personalized Guidance
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Your {productName} request needs expert attention
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-700 mb-6">{getMessage()}</p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-ba-navy text-sm mb-3">Your Details</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">Age:</div>
            <div className="text-gray-900">{inputs.age}</div>
            <div className="text-gray-500">Coverage Requested:</div>
            <div className="text-gray-900">{inputs.coverage}</div>
            {maxAvailable && (
              <>
                <div className="text-gray-500">Max Online Estimate:</div>
                <div className="text-amber-600 font-medium">{maxAvailable}</div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={SITE_CONFIG.phoneTel}
            className="w-full flex items-center justify-center gap-2 py-4 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors text-lg"
          >
            <FiPhone size={20} />
            Call {SITE_CONFIG.phoneFormatted}
          </a>

          <Link
            href="/get-a-quote"
            className="w-full flex items-center justify-center gap-2 py-3 bg-ba-navy text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
          >
            Request Agent Callback
            <FiArrowRight size={18} />
          </Link>

          <button
            type="button"
            onClick={onEditDetails}
            className="w-full py-3 text-ba-blue font-medium hover:underline"
          >
            Edit My Details
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-ba-navy text-sm mb-2">Why speak with an agent?</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-ba-gold">✓</span>
              Access to carriers not available online
            </li>
            <li className="flex items-start gap-2">
              <span className="text-ba-gold">✓</span>
              Personalized underwriting guidance
            </li>
            <li className="flex items-start gap-2">
              <span className="text-ba-gold">✓</span>
              Help finding the best rate for your situation
            </li>
            <li className="flex items-start gap-2">
              <span className="text-ba-gold">✓</span>
              No obligation consultation
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
