"use client";

import { useState, useMemo } from "react";
import QuoteWizardShell from "./QuoteWizardShell";
import LeadGateStep from "@/components/forms/LeadGateStep";
import EstimateResultCard from "./EstimateResultCard";
import AgentReferralCard from "./AgentReferralCard";
import { states } from "@/data/states";
import {
  livingPromiseNonTobacco,
  guaranteedAcceptanceNonTobacco,
  availableAges as feAges,
  sourceNote,
  exceedsCoverageLimit,
  getMaxCoverageForAge,
} from "@/data/rates/finalExpense";
import { nearestLowerBand, estimateRange, getRangePercentage, formatCurrency } from "@/lib/rateMath";

const stepLabels = ["Basic Info", "Coverage Details", "Contact Info", "Your Estimate"];

type Gender = "female" | "male";
type PolicyStyle = "immediate" | "guaranteed";
type Coverage = "5k" | "10k" | "15k" | "20k" | "25k" | "30k" | "35k" | "40k" | "50k";

interface FormData {
  state: string;
  age: number;
  gender: Gender;
  tobacco: boolean;
  coverage: Coverage;
  policyStyle: PolicyStyle;
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
  { value: "5k", amount: 5000, label: "$5,000" },
  { value: "10k", amount: 10000, label: "$10,000" },
  { value: "15k", amount: 15000, label: "$15,000" },
  { value: "20k", amount: 20000, label: "$20,000" },
  { value: "25k", amount: 25000, label: "$25,000" },
  { value: "30k", amount: 30000, label: "$30,000" },
  { value: "35k", amount: 35000, label: "$35,000" },
  { value: "40k", amount: 40000, label: "$40,000" },
  { value: "50k", amount: 50000, label: "$50,000" },
];

const policyLabels: Record<PolicyStyle, string> = {
  immediate: "Immediate (health questions)",
  guaranteed: "Guaranteed acceptance (waiting period)",
};

export default function FinalExpenseWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    state: "",
    age: 65,
    gender: "female",
    tobacco: false,
    coverage: "15k",
    policyStyle: "immediate",
  });
  const [, setContact] = useState<ContactInfo | null>(null);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [requiresAgent, setRequiresAgent] = useState(false);

  // Get available coverage options based on age
  const availableCoverageOptions = useMemo(() => {
    const maxCoverage = getMaxCoverageForAge(formData.age);
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
    if (formData.age < 45 || formData.age > 85) newErrors.age = "Age must be between 45 and 85";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateEstimate = (): EstimateResult | null => {
    const coverageAmount = getCoverageAmount(formData.coverage);
    
    // Check if coverage exceeds limit for age
    if (exceedsCoverageLimit(formData.age, coverageAmount)) {
      return null; // Will trigger agent referral
    }

    const ageBand = nearestLowerBand(formData.age, feAges);
    const table = formData.policyStyle === "immediate" ? livingPromiseNonTobacco : guaranteedAcceptanceNonTobacco;
    const row = table.find((r) => r.age === ageBand && r.gender === formData.gender);

    let baseValue = 0;
    if (row) {
      const premiumKey = `premium${formData.coverage}` as keyof typeof row;
      const premium = row[premiumKey];
      if (typeof premium === "number") {
        baseValue = premium;
      } else {
        // Interpolate if exact coverage not available
        baseValue = row.premium10k * (coverageAmount / 10000);
      }
    }

    const rangePct = getRangePercentage("final_expense", formData.tobacco, true);
    const range = estimateRange(baseValue, rangePct);

    return { ...range, baseValue };
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 4) {
      // From results, go back to step 2 to edit coverage
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
      const needsAgent = exceedsCoverageLimit(formData.age, coverageAmount);

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "final_expense",
          inputs: {
            state: formData.state,
            age: formData.age,
            gender: formData.gender,
            tobacco: formData.tobacco,
            coverage: getCoverageLabel(formData.coverage),
            policyStyle: policyLabels[formData.policyStyle],
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
      age: 65,
      gender: "female",
      tobacco: false,
      coverage: "15k",
      policyStyle: "immediate",
    });
    setContact(null);
    setEstimate(null);
    setRequiresAgent(false);
  };

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
            <label htmlFor="fe-state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              id="fe-state"
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
            <label htmlFor="fe-age" className="block text-sm font-medium text-gray-700 mb-1">
              Age (45-85)
            </label>
            <input
              type="number"
              id="fe-age"
              min={45}
              max={85}
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 45 })}
              className={`w-full px-4 py-3 rounded-lg border ${errors.age ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent`}
            />
            {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
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
                (max {formatCurrency(getMaxCoverageForAge(formData.age))} for age {formData.age})
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {availableCoverageOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, coverage: opt.value })}
                  className={`py-3 px-2 rounded-lg border-2 font-medium transition-colors text-sm ${
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
                Higher coverage amounts may be available — speak with an agent for options above {formatCurrency(getMaxCoverageForAge(formData.age))}.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Policy Type</label>
            <div className="space-y-3">
              {(["immediate", "guaranteed"] as PolicyStyle[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({ ...formData, policyStyle: p })}
                  className={`w-full py-4 px-4 rounded-lg border-2 text-left transition-colors ${
                    formData.policyStyle === p
                      ? "border-ba-blue bg-ba-blue/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className={`font-medium ${formData.policyStyle === p ? "text-ba-navy" : "text-gray-700"}`}>
                    {p === "immediate" ? "Immediate Coverage" : "Guaranteed Acceptance"}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {p === "immediate"
                      ? "Answer a few health questions for immediate coverage."
                      : "No health questions. 2-year graded benefit period."}
                  </p>
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

      {step === 3 && (
        <LeadGateStep onSubmit={handleLeadSubmit} isSubmitting={isSubmitting} error={submitError} />
      )}

      {step === 4 && requiresAgent && (
        <AgentReferralCard
          productType="final_expense"
          reason="coverage_limit"
          inputs={{
            age: formData.age,
            coverage: getCoverageLabel(formData.coverage),
            state: formData.state,
            gender: formData.gender,
          }}
          maxAvailable={formatCurrency(getMaxCoverageForAge(formData.age))}
          onEditDetails={() => handleEditDetails(2)}
        />
      )}

      {step === 4 && !requiresAgent && estimate && (
        <EstimateResultCard
          productType="final_expense"
          estimate={estimate}
          inputs={{
            state: formData.state,
            age: formData.age,
            gender: formData.gender,
            tobacco: formData.tobacco,
            coverage: getCoverageLabel(formData.coverage),
            policyStyle: policyLabels[formData.policyStyle],
          }}
          tobaccoWarning={formData.tobacco}
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
