// Whole Life Insurance Sample Rate Tables
// Based on industry averages from major carriers (Mutual of Omaha, Foresters, ANICO, etc.)
// These are illustrative rates for marketing estimates only

export type WholeLifeRow = {
  age: number;
  gender: 'female' | 'male';
  premium25k: number;
  premium50k: number;
  premium100k?: number;
  premium150k?: number;
  premium200k?: number;
  premium250k?: number;
};

export const sourceNote = "Sample rates shown are estimates for illustration and are not a binding quote. Actual premiums vary by carrier, state, and underwriting class.";

// Coverage limits by age - whole life typically has lower limits than term
export const wholeLifeCoverageLimitsByAge: Record<number, number> = {
  25: 250000, 30: 250000, 35: 250000, 40: 200000, 45: 200000, 
  50: 150000, 55: 150000, 60: 100000, 65: 100000, 70: 50000
};

// Whole Life - Preferred Non-Tobacco Rates (Permanent coverage, builds cash value)
export const wholeLifePreferredNonTobacco: WholeLifeRow[] = [
  { age: 25, gender: 'female', premium25k: 22, premium50k: 42, premium100k: 78, premium150k: 115, premium200k: 150, premium250k: 185 },
  { age: 25, gender: 'male', premium25k: 26, premium50k: 50, premium100k: 95, premium150k: 140, premium200k: 182, premium250k: 225 },
  { age: 30, gender: 'female', premium25k: 26, premium50k: 50, premium100k: 95, premium150k: 140, premium200k: 182, premium250k: 225 },
  { age: 30, gender: 'male', premium25k: 31, premium50k: 60, premium100k: 115, premium150k: 168, premium200k: 220, premium250k: 270 },
  { age: 35, gender: 'female', premium25k: 32, premium50k: 62, premium100k: 118, premium150k: 172, premium200k: 225, premium250k: 278 },
  { age: 35, gender: 'male', premium25k: 38, premium50k: 74, premium100k: 142, premium150k: 208, premium200k: 272, premium250k: 335 },
  { age: 40, gender: 'female', premium25k: 40, premium50k: 78, premium100k: 150, premium150k: 220, premium200k: 288 },
  { age: 40, gender: 'male', premium25k: 48, premium50k: 94, premium100k: 182, premium150k: 268, premium200k: 352 },
  { age: 45, gender: 'female', premium25k: 52, premium50k: 102, premium100k: 198, premium150k: 290, premium200k: 380 },
  { age: 45, gender: 'male', premium25k: 64, premium50k: 126, premium100k: 246, premium150k: 362, premium200k: 475 },
  { age: 50, gender: 'female', premium25k: 70, premium50k: 138, premium100k: 270, premium150k: 398 },
  { age: 50, gender: 'male', premium25k: 88, premium50k: 174, premium100k: 342, premium150k: 505 },
  { age: 55, gender: 'female', premium25k: 95, premium50k: 188, premium100k: 370, premium150k: 548 },
  { age: 55, gender: 'male', premium25k: 122, premium50k: 242, premium100k: 478, premium150k: 710 },
  { age: 60, gender: 'female', premium25k: 135, premium50k: 268, premium100k: 530 },
  { age: 60, gender: 'male', premium25k: 175, premium50k: 348, premium100k: 690 },
  { age: 65, gender: 'female', premium25k: 195, premium50k: 388, premium100k: 770 },
  { age: 65, gender: 'male', premium25k: 255, premium50k: 508, premium100k: 1010 },
  { age: 70, gender: 'female', premium25k: 295, premium50k: 588 },
  { age: 70, gender: 'male', premium25k: 385, premium50k: 768 },
];

// Whole Life - Standard Tobacco Rates
export const wholeLifeStandardTobacco: WholeLifeRow[] = [
  { age: 25, gender: 'female', premium25k: 35, premium50k: 68, premium100k: 130, premium150k: 192, premium200k: 252, premium250k: 310 },
  { age: 25, gender: 'male', premium25k: 42, premium50k: 82, premium100k: 158, premium150k: 232, premium200k: 305, premium250k: 375 },
  { age: 30, gender: 'female', premium25k: 42, premium50k: 82, premium100k: 158, premium150k: 232, premium200k: 305, premium250k: 375 },
  { age: 30, gender: 'male', premium25k: 52, premium50k: 102, premium100k: 198, premium150k: 290, premium200k: 380, premium250k: 468 },
  { age: 35, gender: 'female', premium25k: 54, premium50k: 106, premium100k: 205, premium150k: 302, premium200k: 395, premium250k: 488 },
  { age: 35, gender: 'male', premium25k: 68, premium50k: 134, premium100k: 262, premium150k: 385, premium200k: 505, premium250k: 622 },
  { age: 40, gender: 'female', premium25k: 72, premium50k: 142, premium100k: 278, premium150k: 410, premium200k: 538 },
  { age: 40, gender: 'male', premium25k: 92, premium50k: 182, premium100k: 358, premium150k: 528, premium200k: 695 },
  { age: 45, gender: 'female', premium25k: 98, premium50k: 194, premium100k: 382, premium150k: 565, premium200k: 745 },
  { age: 45, gender: 'male', premium25k: 128, premium50k: 254, premium100k: 502, premium150k: 745, premium200k: 985 },
  { age: 50, gender: 'female', premium25k: 138, premium50k: 274, premium100k: 542, premium150k: 805 },
  { age: 50, gender: 'male', premium25k: 182, premium50k: 362, premium100k: 718, premium150k: 1068 },
  { age: 55, gender: 'female', premium25k: 195, premium50k: 388, premium100k: 770, premium150k: 1148 },
  { age: 55, gender: 'male', premium25k: 262, premium50k: 522, premium100k: 1038, premium150k: 1550 },
  { age: 60, gender: 'female', premium25k: 285, premium50k: 568, premium100k: 1130 },
  { age: 60, gender: 'male', premium25k: 385, premium50k: 768, premium100k: 1530 },
  { age: 65, gender: 'female', premium25k: 425, premium50k: 848, premium100k: 1690 },
  { age: 65, gender: 'male', premium25k: 565, premium50k: 1128, premium100k: 2250 },
  { age: 70, gender: 'female', premium25k: 645, premium50k: 1288 },
  { age: 70, gender: 'male', premium25k: 855, premium50k: 1708 },
];

export const availableAges = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70];

// Check if coverage exceeds recommended limit for age
export function exceedsWholeLifeCoverageLimit(age: number, coverageAmount: number): boolean {
  const ageBand = availableAges.reduce((prev, curr) => 
    age >= curr ? curr : prev, availableAges[0]);
  const limit = wholeLifeCoverageLimitsByAge[ageBand] || 100000;
  return coverageAmount > limit;
}

// Get max coverage available for an age
export function getMaxWholeLifeCoverageForAge(age: number): number {
  const ageBand = availableAges.reduce((prev, curr) => 
    age >= curr ? curr : prev, availableAges[0]);
  return wholeLifeCoverageLimitsByAge[ageBand] || 100000;
}
