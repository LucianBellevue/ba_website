// Final Expense Insurance Sample Rate Tables
// Replace these values with the latest carrier-approved or index data used by Bellevue Assurance for marketing estimates.

export type FinalExpenseRow = {
  age: number;
  gender: 'female' | 'male';
  premium5k: number;
  premium10k: number;
  premium15k?: number;
  premium20k?: number;
  premium25k?: number;
  premium30k?: number;
  premium35k?: number;
  premium40k?: number;
  premium50k?: number;
};

export const sourceNote = "Sample rates shown are estimates for illustration and are not a binding quote. Actual premiums vary by state and underwriting.";

// Coverage limits by age - amounts above these typically require agent consultation
export const coverageLimitsByAge: Record<number, number> = {
  45: 50000, 50: 50000, 55: 40000, 60: 35000, 65: 30000, 70: 25000, 75: 20000, 80: 15000, 85: 10000
};

// Living Promise / Simplified Issue (Non-Tobacco)
// Immediate coverage with health questions
export const livingPromiseNonTobacco: FinalExpenseRow[] = [
  { age: 45, gender: 'female', premium5k: 12, premium10k: 23, premium15k: 32, premium20k: 42, premium25k: 52, premium30k: 62, premium35k: 72, premium40k: 82, premium50k: 102 },
  { age: 45, gender: 'male', premium5k: 14, premium10k: 27, premium15k: 39, premium20k: 51, premium25k: 63, premium30k: 75, premium35k: 87, premium40k: 99, premium50k: 123 },
  { age: 50, gender: 'female', premium5k: 13, premium10k: 24, premium15k: 35, premium20k: 45, premium25k: 56, premium30k: 66, premium35k: 77, premium40k: 88, premium50k: 109 },
  { age: 50, gender: 'male', premium5k: 16, premium10k: 31, premium15k: 44, premium20k: 58, premium25k: 72, premium30k: 85, premium35k: 99, premium40k: 113, premium50k: 140 },
  { age: 55, gender: 'female', premium5k: 15, premium10k: 28, premium15k: 40, premium20k: 52, premium25k: 65, premium30k: 77, premium35k: 90, premium40k: 102 },
  { age: 55, gender: 'male', premium5k: 19, premium10k: 36, premium15k: 52, premium20k: 69, premium25k: 85, premium30k: 102, premium35k: 118, premium40k: 135 },
  { age: 60, gender: 'female', premium5k: 17, premium10k: 33, premium15k: 48, premium20k: 63, premium25k: 78, premium30k: 93, premium35k: 108 },
  { age: 60, gender: 'male', premium5k: 22, premium10k: 43, premium15k: 64, premium20k: 84, premium25k: 104, premium30k: 125, premium35k: 145 },
  { age: 65, gender: 'female', premium5k: 21, premium10k: 41, premium15k: 60, premium20k: 79, premium25k: 98, premium30k: 117 },
  { age: 65, gender: 'male', premium5k: 28, premium10k: 54, premium15k: 83, premium20k: 110, premium25k: 137, premium30k: 165 },
  { age: 70, gender: 'female', premium5k: 27, premium10k: 53, premium15k: 78, premium20k: 103, premium25k: 128 },
  { age: 70, gender: 'male', premium5k: 36, premium10k: 70, premium15k: 110, premium20k: 146, premium25k: 181 },
  { age: 75, gender: 'female', premium5k: 36, premium10k: 71, premium15k: 107, premium20k: 142 },
  { age: 75, gender: 'male', premium5k: 49, premium10k: 97, premium15k: 148, premium20k: 197 },
  { age: 80, gender: 'female', premium5k: 50, premium10k: 98, premium15k: 146 },
  { age: 80, gender: 'male', premium5k: 68, premium10k: 135, premium15k: 208 },
  { age: 85, gender: 'female', premium5k: 69, premium10k: 136 },
  { age: 85, gender: 'male', premium5k: 90, premium10k: 178 },
];

// Guaranteed Acceptance (Non-Tobacco)
// No health questions, 2-year graded benefit period
export const guaranteedAcceptanceNonTobacco: FinalExpenseRow[] = [
  { age: 45, gender: 'female', premium5k: 15, premium10k: 28, premium15k: 42, premium20k: 55, premium25k: 68, premium30k: 82, premium35k: 95, premium40k: 108, premium50k: 135 },
  { age: 45, gender: 'male', premium5k: 19, premium10k: 36, premium15k: 54, premium20k: 72, premium25k: 90, premium30k: 108, premium35k: 126, premium40k: 144, premium50k: 180 },
  { age: 50, gender: 'female', premium5k: 16, premium10k: 30, premium15k: 45, premium20k: 60, premium25k: 75, premium30k: 90, premium35k: 105, premium40k: 120, premium50k: 150 },
  { age: 50, gender: 'male', premium5k: 21, premium10k: 40, premium15k: 59, premium20k: 79, premium25k: 99, premium30k: 118, premium35k: 138, premium40k: 158, premium50k: 197 },
  { age: 55, gender: 'female', premium5k: 20, premium10k: 38, premium15k: 56, premium20k: 74, premium25k: 92, premium30k: 111, premium35k: 129, premium40k: 148 },
  { age: 55, gender: 'male', premium5k: 24, premium10k: 45, premium15k: 68, premium20k: 90, premium25k: 112, premium30k: 135, premium35k: 157, premium40k: 180 },
  { age: 60, gender: 'female', premium5k: 22, premium10k: 43, premium15k: 64, premium20k: 84, premium25k: 105, premium30k: 126, premium35k: 147 },
  { age: 60, gender: 'male', premium5k: 29, premium10k: 57, premium15k: 85, premium20k: 113, premium25k: 141, premium30k: 170, premium35k: 198 },
  { age: 65, gender: 'female', premium5k: 26, premium10k: 50, premium15k: 75, premium20k: 99, premium25k: 124, premium30k: 149 },
  { age: 65, gender: 'male', premium5k: 35, premium10k: 69, premium15k: 103, premium20k: 136, premium25k: 170, premium30k: 204 },
  { age: 70, gender: 'female', premium5k: 33, premium10k: 64, premium15k: 96, premium20k: 127, premium25k: 158 },
  { age: 70, gender: 'male', premium5k: 44, premium10k: 87, premium15k: 130, premium20k: 172, premium25k: 215 },
  { age: 75, gender: 'female', premium5k: 45, premium10k: 89, premium15k: 133, premium20k: 176 },
  { age: 75, gender: 'male', premium5k: 57, premium10k: 113, premium15k: 170, premium20k: 226 },
  { age: 80, gender: 'female', premium5k: 64, premium10k: 127, premium15k: 190 },
  { age: 80, gender: 'male', premium5k: 79, premium10k: 157, premium15k: 235 },
  { age: 85, gender: 'female', premium5k: 80, premium10k: 158 },
  { age: 85, gender: 'male', premium5k: 97, premium10k: 193 },
];

export const availableAges = [45, 50, 55, 60, 65, 70, 75, 80, 85];

// Helper to check if coverage exceeds recommended limit for age
export function exceedsCoverageLimit(age: number, coverageAmount: number): boolean {
  const ageBand = availableAges.reduce((prev, curr) => 
    age >= curr ? curr : prev, availableAges[0]);
  const limit = coverageLimitsByAge[ageBand] || 25000;
  return coverageAmount > limit;
}

// Get max coverage available for an age
export function getMaxCoverageForAge(age: number): number {
  const ageBand = availableAges.reduce((prev, curr) => 
    age >= curr ? curr : prev, availableAges[0]);
  return coverageLimitsByAge[ageBand] || 25000;
}
