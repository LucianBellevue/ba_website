"use client";

import { useState, useMemo } from "react";
import QuoteWizardShell from "./QuoteWizardShell";
import LeadGateStep from "@/components/forms/LeadGateStep";
import EstimateResultCard from "./EstimateResultCard";
import AgentReferralCard from "./AgentReferralCard";
import { states } from "@/data/states";
import {
  term20PreferredNonSmoker,
  term20PreferredSmoker,
  availableAges as termAges,
  sourceNote,
  exceedsTermCoverageLimit,
  getMaxTermCoverageForAge,
} from "@/data/rates/termLife20";
import { nearestLowerBand, estimateRange, getRangePercentage, formatCurrency } from "@/lib/rateMath";

const stepLabels = ["Basic Info", "Coverage Details", "Contact Info", "Your Estimate"];

type Gender = "female" | "male";
type Coverage = "100k" | "250k" | "500k" | "750k" | "1m" | "1_5m" | "2m";

interface FormData {
  state: string;
  age: number;
  gender: Gender;
  tobacco: boolean;
  coverage: Coverage;
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
}

interface EstimateResult {
  low: number;
  high: number;
  baseValue: number;
}

const allCoverageOptions: { value: Coverage; amount: number; label: string }[] = [
  { value: "100k", amount: 100000, label: "$100,000" },
  { value: "250k", amount: 250000, label: "$250,000" },
  { value: "500k", amount: 500000, label: "$500,000" },
  { value: "750k", amount: 750000, label: "$750,000" },
  { value: "1m", amount: 1000000, label: "$1,000,000" },
  { value: "1_5m", amount: 1500000, label: "$1,500,000" },
  { value: "2m", amount: 2000000, label: "$2,000,000" },
];

export default function TermLifeWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    state: "",
    age: 35,
    gender: "female",
    tobacco: false,
    coverage: "500k",
  });
  const [, setContact] = useState<ContactInfo | null>(null);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [requiresAgent, setRequiresAgent] = useState(false);

  // Get available coverage options based on age
  const availableCoverageOptions = useMemo(() => {
    const maxCoverage = getMaxTermCoverageForAge(formData.age);
    return allCoverageOptions.filter((opt) => opt.amount <= maxCoverage);
  }, [formData.age]);

  // Get current coverage label
  const getCoverageLabel = (coverage: Coverage): string => {
    return allCoverageOptions.find((opt) => opt.value === coverage)?.label || coverage;
  };

  // Get coverage amount from key
  const getCoverageAmount = (coverage: Coverage): number => {
    return allCoverageOptions.find((opt) => opt.value === coverage)?.amount || 0;
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.state) newErrors.state = "Please select a state";
    if (formData.age < 18 || formData.age > 75) newErrors.age = "Age must be between 18 and 75";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateEstimate = (): EstimateResult | null => {
    const coverageAmount = getCoverageAmount(formData.coverage);
    
    // Check if coverage exceeds limit for age
    if (exceedsTermCoverageLimit(formData.age, coverageAmount)) {
      return null; // Will trigger agent referral
    }

    const ageBand = nearestLowerBand(formData.age, termAges);
    const table = formData.tobacco ? term20PreferredSmoker : term20PreferredNonSmoker;
    const row = table.find((r) => r.age === ageBand && r.gender === formData.gender);

    let baseValue = 0;
    if (row) {
      const premiumKey = `premium${formData.coverage}` as keyof typeof row;
      const premium = row[premiumKey];
      if (typeof premium === "number") {
        baseValue = premium;
      } else {
        // Interpolate if exact coverage not available
        baseValue = row.premium250k * (coverageAmount / 250000);
      }
    }

    const rangePct = getRangePercentage("term_life", formData.tobacco);
    const range = estimateRange(baseValue, rangePct);

    return { ...range, baseValue };
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 4) {
      setStep(2);
      setRequiresAgent(false);
    } else {
      setStep(step - 1);
    }
  };

  const handleEditDetails = (targetStep: number = 1) => {
    setStep(targetStep);
    setRequiresAgent(false);
    setEstimate(null);
  };

  const handleLeadSubmit = async (contactInfo: ContactInfo) => {
    setIsSubmitting(true);
    setSubmitError(undefined);

    try {
      const coverageAmount = getCoverageAmount(formData.coverage);
      const needsAgent = exceedsTermCoverageLimit(formData.age, coverageAmount);

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "term_life",
          inputs: {
            state: formData.state,
            age: formData.age,
            gender: formData.gender,
            tobacco: formData.tobacco,
            coverage: getCoverageLabel(formData.coverage),
            termLength: "20 years",
          },
          contact: contactInfo,
          source: needsAgent ? "calculator_agent_referral" : "calculator",
          createdAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      if (!data.ok) throw new Error(data.message || "Failed to submit");

      setContact(contactInfo);
      
      if (needsAgent) {
        setRequiresAgent(true);
        setStep(4);
      } else {
        const est = calculateEstimate();
        setEstimate(est);
        setRequiresAgent(est === null);
        setStep(4);
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartOver = () => {
    setStep(1);
    setFormData({
      state: "",
      age: 35,
      gender: "female",
      tobacco: false,
      coverage: "500k",
    });
    setContact(null);
    setEstimate(null);
    setRequiresAgent(false);
  };

  const showAgeWarning = formData.age > 55;

  return (
    <QuoteWizardShell
      currentStep={step}
      totalSteps={4}
      stepLabels={stepLabels}
      onBack={step > 1 && step < 4 ? handleBack : undefined}
      showBack={step > 1 && step < 4}
    >
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-ba-navy mb-4">Tell us about yourself</h3>

          <div>
            <label htmlFor="term-state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              id="term-state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border ${errors.state ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent`}
            >
              <option value="">Select your state</option>
              {states.map((s) => (
                <option key={s.slug} value={s.name}>{s.name}</option>
              ))}
            </select>
            {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
          </div>

          <div>
            <label htmlFor="term-age" className="block text-sm font-medium text-gray-700 mb-1">
              Age (18-75)
            </label>
            <input
              type="number"
              id="term-age"
              min={18}
              max={75}
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 18 })}
              className={`w-full px-4 py-3 rounded-lg border ${errors.age ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent`}
            />
            {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
            {showAgeWarning && !errors.age && (
              <p className="mt-1 text-sm text-amber-600">
                For applicants over 60, call for personalized options.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="grid grid-cols-2 gap-3">
              {(["female", "male"] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: g })}
                  className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                    formData.gender === g
                      ? "border-ba-blue bg-ba-blue/10 text-ba-navy"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tobacco Use</label>
            <div className="grid grid-cols-2 gap-3">
              {[false, true].map((val) => (
                <button
                  key={val.toString()}
                  type="button"
                  onClick={() => setFormData({ ...formData, tobacco: val })}
                  className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                    formData.tobacco === val
                      ? "border-ba-blue bg-ba-blue/10 text-ba-navy"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {val ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-full py-4 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors text-lg mt-6"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-ba-navy mb-4">Coverage Details</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coverage Amount
              <span className="text-gray-400 font-normal ml-1">
                (max {formatCurrency(getMaxTermCoverageForAge(formData.age))} for age {formData.age})
              </span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableCoverageOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, coverage: opt.value })}
                  className={`py-3 px-3 rounded-lg border-2 font-medium transition-colors text-sm ${
                    formData.coverage === opt.value
                      ? "border-ba-blue bg-ba-blue/10 text-ba-navy"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {availableCoverageOptions.length < allCoverageOptions.length && (
              <p className="text-xs text-amber-600 mt-2">
                Higher coverage amounts may be available — speak with an agent for options above {formatCurrency(getMaxTermCoverageForAge(formData.age))}.
              </p>
            )}
          </div>

          <div className="bg-ba-bg rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong className="text-ba-navy">Term Length:</strong> 20 years
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Call for 10-year or 30-year term options.
            </p>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-full py-4 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors text-lg mt-6"
          >
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <LeadGateStep onSubmit={handleLeadSubmit} isSubmitting={isSubmitting} error={submitError} />
      )}

      {step === 4 && requiresAgent && (
        <AgentReferralCard
          productType="term_life"
          reason="coverage_limit"
          inputs={{
            age: formData.age,
            coverage: getCoverageLabel(formData.coverage),
            state: formData.state,
            gender: formData.gender,
          }}
          maxAvailable={formatCurrency(getMaxTermCoverageForAge(formData.age))}
          onEditDetails={() => handleEditDetails(2)}
        />
      )}

      {step === 4 && !requiresAgent && estimate && (
        <EstimateResultCard
          productType="term_life"
          estimate={estimate}
          inputs={{
            state: formData.state,
            age: formData.age,
            gender: formData.gender,
            tobacco: formData.tobacco,
            coverage: getCoverageLabel(formData.coverage),
            termLength: "20 years",
          }}
          ageWarning={showAgeWarning}
          onStartOver={handleStartOver}
          onEditDetails={() => handleEditDetails(2)}
        />
      )}

      {step < 4 && (
        <p className="text-xs text-gray-500 text-center mt-4">{sourceNote}</p>
      )}
    </QuoteWizardShell>
  );
}
