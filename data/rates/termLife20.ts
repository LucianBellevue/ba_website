// Term Life Insurance Sample Rate Tables (20-Year Term)
// Replace these values with the latest carrier-approved or index data used by Bellevue Assurance for marketing estimates.

export type TermRow = {
  age: number;
  gender: 'female' | 'male';
  premium100k: number;
  premium250k: number;
  premium500k?: number;
  premium750k?: number;
  premium1m?: number;
  premium1_5m?: number;
  premium2m?: number;
};

export const sourceNote = "Sample rates shown are estimates for illustration and are not a binding quote. Actual premiums vary by state and underwriting.";

// Coverage limits by age - amounts above these typically require detailed underwriting
// Based on typical insurance guidelines: younger = more coverage available
export const termCoverageLimitsByAge: Record<number, number> = {
  25: 2000000, 30: 2000000, 35: 2000000, 40: 1500000, 45: 1000000, 50: 1000000, 55: 750000, 60: 500000
};

// Income multiplier guidelines - coverage shouldn't exceed 15-20x annual income
// This is used in conjunction with age limits
export const maxIncomeMultiplier = 15;

// 20-Year Term - Preferred Non-Smoker Rates
export const term20PreferredNonSmoker: TermRow[] = [
  { age: 25, gender: 'female', premium100k: 9, premium250k: 14, premium500k: 21, premium750k: 28, premium1m: 35, premium1_5m: 48, premium2m: 62 },
  { age: 25, gender: 'male', premium100k: 10, premium250k: 16, premium500k: 24, premium750k: 32, premium1m: 40, premium1_5m: 55, premium2m: 72 },
  { age: 30, gender: 'female', premium100k: 10, premium250k: 15, premium500k: 23, premium750k: 30, premium1m: 38, premium1_5m: 52, premium2m: 68 },
  { age: 30, gender: 'male', premium100k: 11, premium250k: 17, premium500k: 27, premium750k: 36, premium1m: 45, premium1_5m: 62, premium2m: 82 },
  { age: 35, gender: 'female', premium100k: 11, premium250k: 17, premium500k: 27, premium750k: 36, premium1m: 45, premium1_5m: 62, premium2m: 82 },
  { age: 35, gender: 'male', premium100k: 13, premium250k: 20, premium500k: 32, premium750k: 43, premium1m: 55, premium1_5m: 78, premium2m: 102 },
  { age: 40, gender: 'female', premium100k: 14, premium250k: 22, premium500k: 36, premium750k: 49, premium1m: 62, premium1_5m: 88 },
  { age: 40, gender: 'male', premium100k: 17, premium250k: 27, premium500k: 45, premium750k: 62, premium1m: 78, premium1_5m: 112 },
  { age: 45, gender: 'female', premium100k: 20, premium250k: 32, premium500k: 55, premium750k: 76, premium1m: 98 },
  { age: 45, gender: 'male', premium100k: 26, premium250k: 42, premium500k: 72, premium750k: 100, premium1m: 130 },
  { age: 50, gender: 'female', premium100k: 32, premium250k: 52, premium500k: 92, premium750k: 130, premium1m: 168 },
  { age: 50, gender: 'male', premium100k: 45, premium250k: 72, premium500k: 130, premium750k: 185, premium1m: 242 },
  { age: 55, gender: 'female', premium100k: 52, premium250k: 85, premium500k: 155, premium750k: 222, premium1m: 290 },
  { age: 55, gender: 'male', premium100k: 75, premium250k: 120, premium500k: 225, premium750k: 325 },
  { age: 60, gender: 'female', premium100k: 90, premium250k: 145, premium500k: 270 },
  { age: 60, gender: 'male', premium100k: 130, premium250k: 210, premium500k: 395 },
];

// 20-Year Term - Preferred Smoker Rates (higher premiums)
export const term20PreferredSmoker: TermRow[] = [
  { age: 25, gender: 'female', premium100k: 18, premium250k: 28, premium500k: 48, premium750k: 66, premium1m: 85, premium1_5m: 120, premium2m: 158 },
  { age: 25, gender: 'male', premium100k: 22, premium250k: 35, premium500k: 60, premium750k: 84, premium1m: 108, premium1_5m: 155, premium2m: 205 },
  { age: 30, gender: 'female', premium100k: 20, premium250k: 32, premium500k: 55, premium750k: 76, premium1m: 98, premium1_5m: 140, premium2m: 185 },
  { age: 30, gender: 'male', premium100k: 26, premium250k: 42, premium500k: 72, premium750k: 102, premium1m: 132, premium1_5m: 190, premium2m: 252 },
  { age: 35, gender: 'female', premium100k: 26, premium250k: 42, premium500k: 72, premium750k: 100, premium1m: 130, premium1_5m: 188, premium2m: 248 },
  { age: 35, gender: 'male', premium100k: 34, premium250k: 55, premium500k: 98, premium750k: 138, premium1m: 180, premium1_5m: 262, premium2m: 348 },
  { age: 40, gender: 'female', premium100k: 38, premium250k: 62, premium500k: 110, premium750k: 155, premium1m: 200, premium1_5m: 290 },
  { age: 40, gender: 'male', premium100k: 52, premium250k: 85, premium500k: 155, premium750k: 222, premium1m: 290, premium1_5m: 420 },
  { age: 45, gender: 'female', premium100k: 58, premium250k: 95, premium500k: 175, premium750k: 250, premium1m: 325 },
  { age: 45, gender: 'male', premium100k: 82, premium250k: 135, premium500k: 250, premium750k: 362, premium1m: 475 },
  { age: 50, gender: 'female', premium100k: 95, premium250k: 155, premium500k: 290, premium750k: 422, premium1m: 555 },
  { age: 50, gender: 'male', premium100k: 138, premium250k: 225, premium500k: 425, premium750k: 622, premium1m: 820 },
  { age: 55, gender: 'female', premium100k: 156, premium250k: 255, premium500k: 485, premium750k: 712 },
  { age: 55, gender: 'male', premium100k: 230, premium250k: 375, premium500k: 720 },
  { age: 60, gender: 'female', premium100k: 258, premium250k: 420, premium500k: 810 },
  { age: 60, gender: 'male', premium100k: 380, premium250k: 620 },
];

export const availableAges = [25, 30, 35, 40, 45, 50, 55, 60];

// Check if coverage exceeds recommended limit for age
export function exceedsTermCoverageLimit(age: number, coverageAmount: number): boolean {
  const ageBand = availableAges.reduce((prev, curr) => 
    age >= curr ? curr : prev, availableAges[0]);
  const limit = termCoverageLimitsByAge[ageBand] || 500000;
  return coverageAmount > limit;
}

// Get max coverage available for an age
export function getMaxTermCoverageForAge(age: number): number {
  const ageBand = availableAges.reduce((prev, curr) => 
    age >= curr ? curr : prev, availableAges[0]);
  return termCoverageLimitsByAge[ageBand] || 500000;
}

// Check if coverage exceeds income-based limit (assumes annual income provided)
export function exceedsIncomeBasedLimit(annualIncome: number, coverageAmount: number): boolean {
  return coverageAmount > annualIncome * maxIncomeMultiplier;
}
