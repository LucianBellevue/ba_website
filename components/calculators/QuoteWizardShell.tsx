"use client";

import { ReactNode } from "react";

interface QuoteWizardShellProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  children: ReactNode;
  onBack?: () => void;
  showBack?: boolean;
}

export default function QuoteWizardShell({
  currentStep,
  totalSteps,
  stepLabels,
  children,
  onBack,
  showBack = true,
}: QuoteWizardShellProps) {
  const progress = ((currentStep) / totalSteps) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-ba-navy px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-sm font-medium">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-ba-gold text-sm font-medium">
            {stepLabels[currentStep - 1]}
          </span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-ba-gold transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="p-6">
        {showBack && currentStep > 1 && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-4 text-ba-blue hover:text-ba-navy font-medium text-sm flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
