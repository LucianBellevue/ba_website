"use client";

import { useState } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { formatCurrency } from "@/lib/rateMath";
import { FiPhone, FiChevronDown, FiChevronUp } from "react-icons/fi";

interface EstimateResult {
  low: number;
  high: number;
  baseValue: number;
}

interface InputSummary {
  state: string;
  age: number;
  gender: string;
  tobacco: boolean;
  coverage: string;
  policyStyle?: string;
  termLength?: string;
}

interface EstimateResultCardProps {
  productType: "final_expense" | "term_life" | "whole_life";
  estimate: EstimateResult;
  inputs: InputSummary;
  tobaccoWarning?: boolean;
  ageWarning?: boolean;
  onStartOver: () => void;
  onEditDetails?: () => void;
}

const disclaimers = [
  "This is an estimate and not a binding quote.",
  "Actual premiums vary by state, underwriting, and eligibility.",
  "Availability varies by state. Not available in all states.",
  "Not affiliated with the U.S. government, Medicare, or Social Security.",
  "Submitting info authorizes contact by phone/text/email. Msg/data rates may apply.",
];

const factorsFinalExpense = [
  { factor: "Age", description: "Premiums increase with age. Locking in coverage earlier can mean lower rates." },
  { factor: "Health Status", description: "Simplified issue policies ask health questions. Guaranteed acceptance policies have higher premiums but no health questions." },
  { factor: "Tobacco Use", description: "Tobacco users typically pay higher premiums than non-tobacco users." },
  { factor: "Coverage Amount", description: "Higher coverage amounts result in higher monthly premiums." },
  { factor: "Gender", description: "Premiums may vary between male and female applicants." },
  { factor: "State", description: "Insurance regulations and rates can vary by state." },
];

const factorsTermLife = [
  { factor: "Age", description: "Younger applicants typically qualify for lower premiums." },
  { factor: "Health Classification", description: "Preferred, standard, and substandard ratings affect your rate." },
  { factor: "Tobacco Use", description: "Smokers pay significantly higher premiums than non-smokers." },
  { factor: "Coverage Amount", description: "Higher face amounts result in higher monthly premiums." },
  { factor: "Term Length", description: "Longer terms generally have higher premiums than shorter terms." },
  { factor: "Gender", description: "Premiums may vary between male and female applicants." },
];

const factorsWholeLife = [
  { factor: "Age", description: "Younger applicants lock in lower rates for life." },
  { factor: "Health Classification", description: "Preferred, standard, and substandard ratings affect your rate." },
  { factor: "Tobacco Use", description: "Smokers pay significantly higher premiums than non-smokers." },
  { factor: "Coverage Amount", description: "Higher face amounts result in higher monthly premiums." },
  { factor: "Cash Value", description: "Whole life builds cash value over time, which affects pricing." },
  { factor: "Gender", description: "Premiums may vary between male and female applicants." },
];

export default function EstimateResultCard({
  productType,
  estimate,
  inputs,
  tobaccoWarning,
  ageWarning,
  onStartOver,
  onEditDetails,
}: EstimateResultCardProps) {
  const [factorsOpen, setFactorsOpen] = useState(false);

  const factors = productType === "final_expense" 
    ? factorsFinalExpense 
    : productType === "whole_life" 
      ? factorsWholeLife 
      : factorsTermLife;
  const productLabel = productType === "final_expense" 
    ? "Final Expense" 
    : productType === "whole_life" 
      ? "Whole Life" 
      : "Term Life";

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-br from-ba-navy to-[#1a3a5c] text-white rounded-xl p-6 md:p-8 text-center">
        <p className="text-ba-gold font-medium mb-2">Your Estimated Monthly Premium</p>
        <div className="text-4xl md:text-5xl font-bold mb-2">
          {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
        </div>
        <p className="text-gray-300 text-sm">per month for {inputs.coverage} {productLabel} coverage</p>
      </div>

      {tobaccoWarning && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 text-sm">
            <strong>Note:</strong> Tobacco use may increase premiums. Call for a more accurate estimate based on your specific situation.
          </p>
        </div>
      )}

      {ageWarning && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> For applicants over 60, we recommend speaking with an agent to explore all available options and get the most accurate quote.
          </p>
        </div>
      )}

      <div className="bg-ba-bg rounded-xl p-6">
        <h4 className="font-semibold text-ba-navy mb-4">Your Selections</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">State:</span>
            <span className="ml-2 font-medium text-gray-900">{inputs.state}</span>
          </div>
          <div>
            <span className="text-gray-500">Age:</span>
            <span className="ml-2 font-medium text-gray-900">{inputs.age}</span>
          </div>
          <div>
            <span className="text-gray-500">Gender:</span>
            <span className="ml-2 font-medium text-gray-900 capitalize">{inputs.gender}</span>
          </div>
          <div>
            <span className="text-gray-500">Tobacco:</span>
            <span className="ml-2 font-medium text-gray-900">{inputs.tobacco ? "Yes" : "No"}</span>
          </div>
          <div>
            <span className="text-gray-500">Coverage:</span>
            <span className="ml-2 font-medium text-gray-900">{inputs.coverage}</span>
          </div>
          {inputs.policyStyle && (
            <div>
              <span className="text-gray-500">Policy Type:</span>
              <span className="ml-2 font-medium text-gray-900">{inputs.policyStyle}</span>
            </div>
          )}
          {inputs.termLength && (
            <div>
              <span className="text-gray-500">Term:</span>
              <span className="ml-2 font-medium text-gray-900">{inputs.termLength}</span>
            </div>
          )}
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setFactorsOpen(!factorsOpen)}
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold text-ba-navy">What affects this estimate?</span>
          {factorsOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </button>
        {factorsOpen && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <ul className="space-y-3">
              {factors.map((item, i) => (
                <li key={i} className="text-sm">
                  <span className="font-medium text-ba-navy">{item.factor}:</span>{" "}
                  <span className="text-gray-600">{item.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <a
          href={SITE_CONFIG.phoneTel}
          className="flex items-center justify-center gap-2 w-full py-4 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors text-lg"
        >
          <FiPhone size={20} />
          Call Now: {SITE_CONFIG.phoneFormatted}
        </a>
        {onEditDetails && (
          <button
            type="button"
            onClick={onEditDetails}
            className="w-full py-3 bg-ba-blue text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
          >
            Change My Details
          </button>
        )}
        <button
          type="button"
          onClick={onStartOver}
          className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Start Over
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="font-semibold text-gray-700 text-sm mb-2">Important Disclosures</h5>
        <ul className="space-y-1">
          {disclaimers.map((d, i) => (
            <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
              <span className="text-gray-400">•</span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
