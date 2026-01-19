// Health Class Calculation Utilities
// BMI-based underwriting class determination for internal use only

export interface HealthMetrics {
  heightFeet: number;
  heightInches: number;
  weightLbs: number;
  age: number;
  gender: 'male' | 'female';
  tobacco: boolean;
}

export interface HealthClassResult {
  bmi: number;
  bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese_1' | 'obese_2' | 'obese_3';
  healthClass: 'preferred_plus' | 'preferred' | 'standard_plus' | 'standard' | 'substandard';
  rateMultiplier: number;
}

// Calculate BMI from height (feet/inches) and weight (lbs)
export function calculateBMI(heightFeet: number, heightInches: number, weightLbs: number): number {
  const totalInches = (heightFeet * 12) + heightInches;
  if (totalInches <= 0) return 0;
  // BMI = (weight in lbs × 703) / (height in inches)²
  const bmi = (weightLbs * 703) / (totalInches * totalInches);
  return Math.round(bmi * 10) / 10;
}

// Get BMI category
export function getBMICategory(bmi: number): HealthClassResult['bmiCategory'] {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  if (bmi < 35) return 'obese_1';
  if (bmi < 40) return 'obese_2';
  return 'obese_3';
}

// Determine health class based on BMI, age, gender, and tobacco use
// Based on typical insurance underwriting guidelines
export function determineHealthClass(metrics: HealthMetrics): HealthClassResult {
  const bmi = calculateBMI(metrics.heightFeet, metrics.heightInches, metrics.weightLbs);
  const bmiCategory = getBMICategory(bmi);
  
  let healthClass: HealthClassResult['healthClass'] = 'standard';
  let rateMultiplier = 1.0;

  // Tobacco users start at Standard minimum
  if (metrics.tobacco) {
    if (bmi >= 18.5 && bmi < 30) {
      healthClass = 'standard';
      rateMultiplier = 1.5;
    } else if (bmi >= 30 && bmi < 35) {
      healthClass = 'substandard';
      rateMultiplier = 2.0;
    } else {
      healthClass = 'substandard';
      rateMultiplier = 2.5;
    }
    return { bmi, bmiCategory, healthClass, rateMultiplier };
  }

  // Non-tobacco health class determination
  // Preferred Plus: BMI 18.5-27, age under 50
  if (bmi >= 18.5 && bmi <= 27 && metrics.age < 50) {
    healthClass = 'preferred_plus';
    rateMultiplier = 0.85;
  }
  // Preferred: BMI 18.5-29, or 27-29 for under 50
  else if (bmi >= 18.5 && bmi < 29) {
    healthClass = 'preferred';
    rateMultiplier = 0.95;
  }
  // Standard Plus: BMI 29-32
  else if (bmi >= 29 && bmi < 32) {
    healthClass = 'standard_plus';
    rateMultiplier = 1.0;
  }
  // Standard: BMI 32-35 or underweight
  else if ((bmi >= 32 && bmi < 35) || bmi < 18.5) {
    healthClass = 'standard';
    rateMultiplier = 1.15;
  }
  // Substandard: BMI 35+
  else {
    healthClass = 'substandard';
    rateMultiplier = 1.5;
  }

  // Age adjustments (older applicants may have stricter BMI requirements)
  if (metrics.age >= 60 && bmi > 30) {
    if (healthClass === 'preferred') healthClass = 'standard_plus';
    if (healthClass === 'standard_plus') healthClass = 'standard';
    rateMultiplier *= 1.1;
  }

  return { bmi, bmiCategory, healthClass, rateMultiplier };
}

// Health class display names
export const healthClassLabels: Record<HealthClassResult['healthClass'], string> = {
  preferred_plus: 'Preferred Plus',
  preferred: 'Preferred',
  standard_plus: 'Standard Plus',
  standard: 'Standard',
  substandard: 'Substandard',
};

// BMI category display
export const bmiCategoryLabels: Record<HealthClassResult['bmiCategory'], string> = {
  underweight: 'Underweight',
  normal: 'Normal',
  overweight: 'Overweight',
  obese_1: 'Obese Class I',
  obese_2: 'Obese Class II',
  obese_3: 'Obese Class III',
};
