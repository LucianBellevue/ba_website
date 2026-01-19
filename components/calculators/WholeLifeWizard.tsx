"use client";

import { useState, useMemo } from "react";
import QuoteWizardShell from "./QuoteWizardShell";
import LeadGateStep from "@/components/forms/LeadGateStep";
import EstimateResultCard from "./EstimateResultCard";
import AgentReferralCard from "./AgentReferralCard";
import CoverageSlider from "./CoverageSlider";
import HealthInputs from "./HealthInputs";
import { states } from "@/data/states";
import {
  wholeLifePreferredNonTobacco,
  wholeLifeStandardTobacco,
  availableAges as wlAges,
  sourceNote,
  exceedsWholeLifeCoverageLimit,
  getMaxWholeLifeCoverageForAge,
} from "@/data/rates/wholeLife";
import { nearestLowerBand, estimateRange, getRangePercentage, formatCurrency } from "@/lib/rateMath";
import { calculateBMI, determineHealthClass } from "@/lib/healthClass";

const stepLabels = ["Basic Info", "Health Details", "Coverage", "Contact Info", "Your Estimate"];

type Gender = "female" | "male";

interface FormData {
  state: string;
  age: number;
  gender: Gender;
  tobacco: boolean;
  heightFeet: number;
  heightInches: number;
  weightLbs: number;
  coverageAmount: number;
  hasChronicCondition: boolean;
  hasFamilyHistory: boolean;
  takingMedications: boolean;
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

const MIN_COVERAGE = 25000;
const MAX_COVERAGE = 250000;
const COVERAGE_STEP = 25000;

export default function WholeLifeWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    state: "",
    age: 40,
    gender: "female",
    tobacco: false,
    heightFeet: 5,
    heightInches: 6,
    weightLbs: 160,
    coverageAmount: 100000,
    hasChronicCondition: false,
    hasFamilyHistory: false,
    takingMedications: false,
  });
  const [, setContact] = useState<ContactInfo | null>(null);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [requiresAgent, setRequiresAgent] = useState(false);

  // Calculate max coverage based on age
  const maxCoverageForAge = useMemo(() => {
    return Math.min(MAX_COVERAGE, getMaxWholeLifeCoverageForAge(formData.age));
  }, [formData.age]);

  // Ensure coverage doesn't exceed max for age
  const effectiveCoverage = Math.min(formData.coverageAmount, maxCoverageForAge);

  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.state) newErrors.state = "Please select a state";
    if (formData.age < 25 || formData.age > 70) newErrors.age = "Age must be between 25 and 70";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (formData.heightFeet < 4 || formData.heightFeet > 7) {
      newErrors.heightFeet = "Height must be between 4 and 7 feet";
    }
    if (formData.heightInches < 0 || formData.heightInches > 11) {
      newErrors.heightInches = "Inches must be between 0 and 11";
    }
    if (formData.weightLbs < 80 || formData.weightLbs > 500) {
      newErrors.weightLbs = "Please enter a valid weight";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateEstimate = (): EstimateResult | null => {
    // Check if coverage exceeds limit for age
    if (exceedsWholeLifeCoverageLimit(formData.age, effectiveCoverage)) {
      return null;
    }

    const ageBand = nearestLowerBand(formData.age, wlAges);
    const table = formData.tobacco ? wholeLifeStandardTobacco : wholeLifePreferredNonTobacco;
    const row = table.find((r) => r.age === ageBand && r.gender === formData.gender);

    let baseValue = 0;
    if (row) {
      // Find closest premium tier
      const coverageKey = effectiveCoverage <= 25000 ? "premium25k"
        : effectiveCoverage <= 50000 ? "premium50k"
        : effectiveCoverage <= 100000 ? "premium100k"
        : effectiveCoverage <= 150000 ? "premium150k"
        : effectiveCoverage <= 200000 ? "premium200k"
        : "premium250k";

      const premium = row[coverageKey as keyof typeof row];
      if (typeof premium === "number") {
        const tierAmount = coverageKey === "premium25k" ? 25000
          : coverageKey === "premium50k" ? 50000
          : coverageKey === "premium100k" ? 100000
          : coverageKey === "premium150k" ? 150000
          : coverageKey === "premium200k" ? 200000
          : 250000;
        
        baseValue = premium * (effectiveCoverage / tierAmount);
      } else {
        // Fallback interpolation
        const basePremium = row.premium50k || row.premium25k * 2;
        baseValue = basePremium * (effectiveCoverage / 50000);
      }
    }

    // Apply health class multiplier based on BMI
    const healthClass = determineHealthClass({
      heightFeet: formData.heightFeet,
      heightInches: formData.heightInches,
      weightLbs: formData.weightLbs,
      age: formData.age,
      gender: formData.gender,
      tobacco: formData.tobacco,
    });

    baseValue *= healthClass.rateMultiplier;

    // Apply additional risk factors
    if (formData.hasChronicCondition) baseValue *= 1.15;
    if (formData.hasFamilyHistory) baseValue *= 1.05;
    if (formData.takingMedications) baseValue *= 1.08;

    const rangePct = getRangePercentage("whole_life", formData.tobacco);
    const range = estimateRange(baseValue, rangePct);

    return { ...range, baseValue };
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 5) {
      setStep(3);
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
      const needsAgent = exceedsWholeLifeCoverageLimit(formData.age, effectiveCoverage);
      const calculatedEstimate = calculateEstimate();
      
      // Calculate BMI for internal tracking
      const bmi = calculateBMI(formData.heightFeet, formData.heightInches, formData.weightLbs);
      const healthClass = determineHealthClass({
        heightFeet: formData.heightFeet,
        heightInches: formData.heightInches,
        weightLbs: formData.weightLbs,
        age: formData.age,
        gender: formData.gender,
        tobacco: formData.tobacco,
      });

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "whole_life",
          inputs: {
            state: formData.state,
            age: formData.age,
            gender: formData.gender,
            tobacco: formData.tobacco,
            coverage: formatCurrency(effectiveCoverage),
            heightFeet: formData.heightFeet,
            heightInches: formData.heightInches,
            weightLbs: formData.weightLbs,
            bmi: bmi,
            healthClass: healthClass.healthClass,
            healthClassMultiplier: healthClass.rateMultiplier,
            hasChronicCondition: formData.hasChronicCondition,
            hasFamilyHistory: formData.hasFamilyHistory,
            takingMedications: formData.takingMedications,
          },
          estimate: calculatedEstimate ? {
            low: calculatedEstimate.low,
            high: calculatedEstimate.high,
            coverageAmount: formatCurrency(effectiveCoverage),
          } : undefined,
          contact: contactInfo,
          source: "whole_life_calculator",
          createdAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      if (!data.ok) throw new Error(data.message || "Failed to submit");

      setContact(contactInfo);
      
      if (needsAgent) {
        setRequiresAgent(true);
        setStep(5);
      } else {
        const est = calculateEstimate();
        setEstimate(est);
        setRequiresAgent(est === null);
        setStep(5);
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
      age: 40,
      gender: "female",
      tobacco: false,
      heightFeet: 5,
      heightInches: 6,
      weightLbs: 160,
      coverageAmount: 100000,
      hasChronicCondition: false,
      hasFamilyHistory: false,
      takingMedications: false,
    });
    setContact(null);
    setEstimate(null);
    setRequiresAgent(false);
  };

  const showAgeWarning = formData.age > 55;

  return (
    <QuoteWizardShell
      currentStep={step}
      totalSteps={5}
      stepLabels={stepLabels}
      onBack={step > 1 && step < 5 ? handleBack : undefined}
      showBack={step > 1 && step < 5}
    >
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-ba-navy mb-4">Tell us about yourself</h3>

          <div>
            <label htmlFor="wl-state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              id="wl-state"
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
            <label htmlFor="wl-age" className="block text-sm font-medium text-gray-700 mb-1">
              Age (25-70)
            </label>
            <input
              type="number"
              id="wl-age"
              min={25}
              max={70}
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 25 })}
              className={`w-full px-4 py-3 rounded-lg border ${errors.age ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent`}
            />
            {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
            {showAgeWarning && !errors.age && (
              <p className="mt-1 text-sm text-amber-600">
                For applicants over 55, coverage options may be limited.
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
        <div className="space-y-6">
          <h3 className="font-serif text-xl font-bold text-ba-navy mb-4">Health Information</h3>
          
          <HealthInputs
            heightFeet={formData.heightFeet}
            heightInches={formData.heightInches}
            weightLbs={formData.weightLbs}
            onHeightFeetChange={(val) => setFormData({ ...formData, heightFeet: val })}
            onHeightInchesChange={(val) => setFormData({ ...formData, heightInches: val })}
            onWeightChange={(val) => setFormData({ ...formData, weightLbs: val })}
            errors={{
              heightFeet: errors.heightFeet,
              heightInches: errors.heightInches,
              weightLbs: errors.weightLbs,
            }}
          />

          <div className="space-y-3 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700">Health Screening Questions</p>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasChronicCondition}
                onChange={(e) => setFormData({ ...formData, hasChronicCondition: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-ba-blue focus:ring-ba-blue"
              />
              <span className="text-sm text-gray-600">
                Have you been diagnosed with any chronic conditions (diabetes, heart disease, cancer, etc.)?
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasFamilyHistory}
                onChange={(e) => setFormData({ ...formData, hasFamilyHistory: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-ba-blue focus:ring-ba-blue"
              />
              <span className="text-sm text-gray-600">
                Do you have a family history of heart disease or cancer before age 60?
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.takingMedications}
                onChange={(e) => setFormData({ ...formData, takingMedications: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-ba-blue focus:ring-ba-blue"
              />
              <span className="text-sm text-gray-600">
                Are you currently taking prescription medications for ongoing health conditions?
              </span>
            </label>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-full py-4 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors text-lg mt-4"
          >
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="font-serif text-xl font-bold text-ba-navy mb-4">Coverage Details</h3>

          <CoverageSlider
            value={effectiveCoverage}
            onChange={(val) => setFormData({ ...formData, coverageAmount: val })}
            min={MIN_COVERAGE}
            max={maxCoverageForAge}
            step={COVERAGE_STEP}
            label="Coverage Amount"
          />

          {maxCoverageForAge < MAX_COVERAGE && (
            <p className="text-xs text-amber-600">
              Higher coverage may be available — speak with an agent for options above {formatCurrency(maxCoverageForAge)}.
            </p>
          )}

          <div className="bg-ba-bg rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong className="text-ba-navy">Whole Life Insurance</strong>
            </p>
            <ul className="text-xs text-gray-500 mt-2 space-y-1 list-disc list-inside">
              <li>Permanent coverage that never expires</li>
              <li>Builds cash value over time</li>
              <li>Fixed premiums for life</li>
              <li>Tax-advantaged death benefit</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-full py-4 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors text-lg mt-4"
          >
            Continue
          </button>
        </div>
      )}

      {step === 4 && (
        <LeadGateStep onSubmit={handleLeadSubmit} isSubmitting={isSubmitting} error={submitError} />
      )}

      {step === 5 && requiresAgent && (
        <AgentReferralCard
          productType="whole_life"
          reason="coverage_limit"
          inputs={{
            age: formData.age,
            coverage: formatCurrency(effectiveCoverage),
            state: formData.state,
            gender: formData.gender,
          }}
          maxAvailable={formatCurrency(maxCoverageForAge)}
          onEditDetails={() => handleEditDetails(3)}
        />
      )}

      {step === 5 && !requiresAgent && estimate && (
        <EstimateResultCard
          productType="whole_life"
          estimate={estimate}
          inputs={{
            state: formData.state,
            age: formData.age,
            gender: formData.gender,
            tobacco: formData.tobacco,
            coverage: formatCurrency(effectiveCoverage),
          }}
          ageWarning={showAgeWarning}
          onStartOver={handleStartOver}
          onEditDetails={() => handleEditDetails(3)}
        />
      )}

      {step < 5 && (
        <p className="text-xs text-gray-500 text-center mt-4">{sourceNote}</p>
      )}
    </QuoteWizardShell>
  );
}
