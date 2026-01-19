// Rate calculation utilities for quote estimators

/**
 * Find the nearest lower age band from available ages
 * E.g., if user is 68 and bands are [45,50,55,60,65,70], returns 65
 */
export function nearestLowerBand(age: number, availableAges: number[]): number {
  const sorted = [...availableAges].sort((a, b) => a - b);
  let result = sorted[0];
  for (const bandAge of sorted) {
    if (bandAge <= age) {
      result = bandAge;
    } else {
      break;
    }
  }
  return result;
}

/**
 * Calculate an estimate range based on a base value and percentage variance
 */
export function estimateRange(value: number, pct: number): { low: number; high: number } {
  const variance = value * (pct / 100);
  return {
    low: Math.round(value - variance),
    high: Math.round(value + variance),
  };
}

/**
 * Get the range percentage based on product type and tobacco status
 */
export function getRangePercentage(
  productType: 'final_expense' | 'term_life' | 'whole_life',
  isTobacco: boolean,
  isTobaccoTableMissing: boolean = false
): number {
  if (productType === 'final_expense') {
    // If tobacco user but only non-tobacco table, widen range
    if (isTobacco && isTobaccoTableMissing) {
      return 20;
    }
    return 12;
  } else if (productType === 'whole_life') {
    // Whole life has wider variance due to cash value component
    if (isTobacco) {
      return 18;
    }
    return 12;
  } else {
    // Term life
    if (isTobacco) {
      return 15;
    }
    return 10;
  }
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format phone number with masking (XXX) XXX-XXXX
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (10 digits)
 */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10;
}
