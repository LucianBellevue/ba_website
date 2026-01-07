export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  content: string;
}

export const guides: Guide[] = [
  {
    slug: "what-is-final-expense-insurance",
    title: "What Is Final Expense Insurance?",
    description: "A complete guide to understanding final expense insurance, how it works, and who it's designed for.",
    category: "Basics",
    date: "2024",
    content: `Final expense insurance is a type of whole life insurance specifically designed to cover end-of-life costs. Unlike traditional life insurance policies with large coverage amounts, final expense policies typically offer between $5,000 and $35,000 in coverage at affordable monthly premiums.

The death benefit from a final expense policy can be used for funeral and burial costs (averaging $7,000-$12,000), outstanding medical bills, credit card debt, or any other expenses your beneficiary chooses.

Final expense insurance is ideal for seniors ages 50-85 looking for affordable coverage, people who want to ensure their funeral costs are covered, those who may not qualify for traditional life insurance, and anyone who wants permanent coverage with fixed premiums.`
  },
  {
    slug: "burial-insurance-cost-by-age",
    title: "Burial Insurance Cost by Age",
    description: "See how age affects burial insurance premiums and what you can expect to pay at different ages.",
    category: "Costs",
    date: "2024",
    content: `Age is one of the most significant factors affecting burial insurance costs. Here's what you can typically expect to pay for $10,000 in burial insurance coverage:

Age 50-54: $25-$40/month | Age 55-59: $35-$50/month | Age 60-64: $45-$65/month | Age 65-69: $55-$80/month | Age 70-74: $70-$100/month | Age 75-79: $90-$130/month | Age 80-85: $120-$180/month

Insurance companies base premiums on risk. As we age, the statistical likelihood of death increases, which means higher premiums at older ages and fewer coverage options.

The best time to get burial insurance is now. Every year you wait, premiums increase.`
  },
  {
    slug: "final-expense-vs-term-life",
    title: "Final Expense vs. Term Life Insurance",
    description: "Compare final expense and term life insurance to understand which type of coverage may be right for you.",
    category: "Comparisons",
    date: "2024",
    content: `Final expense insurance offers $5,000-$35,000 in permanent coverage with no medical exam, designed for funeral costs. Term life offers $50,000-$1,000,000+ for a set period (10-30 years), usually requires an exam, and is designed for income replacement.

Choose final expense if you're primarily concerned about funeral costs, over 50 and want guaranteed coverage, have health conditions, or want permanent coverage.

Choose term life if you need to replace income for dependents, have a mortgage or large debts, are younger and healthy, or need high coverage at low cost.

Many people have both: term life for income replacement while working, plus final expense for guaranteed funeral coverage.`
  },
  {
    slug: "graded-benefit-vs-level-benefit",
    title: "Graded Benefit vs. Level Benefit Policies",
    description: "Learn the difference between graded and level benefit policies and when each type makes sense.",
    category: "Policy Types",
    date: "2024",
    content: `Level benefit policies provide full death benefit from day one. They require answering health questions but offer lower premiums. Best for people in reasonably good health.

Graded benefit policies have a 2-year waiting period. Year 1: return of premiums + interest. Year 2: partial benefit (30-50%). Year 3+: full benefit. Accidental death is covered in full from day one. Higher premiums but guaranteed acceptance.

Always try for level benefit first - our agents can help you understand if you qualify. If not, graded benefit ensures you still have coverage.`
  },
  {
    slug: "can-i-get-burial-insurance-with-diabetes",
    title: "Can I Get Burial Insurance With Diabetes?",
    description: "Coverage options for people with diabetes and tips for finding affordable rates.",
    category: "Health Conditions",
    date: "2024",
    content: `Yes, you can get burial insurance with diabetes. Many people with diabetes qualify for coverage.

Simplified Issue (Best Rates): If well-controlled, you may qualify with standard or slightly higher rates. Carriers ask about diabetes type, duration, medications (insulin vs. oral), A1C levels, and complications.

Guaranteed Issue: If you have complications or don't qualify for simplified issue, guaranteed issue accepts all applicants regardless of health. Higher premiums and 2-year graded benefit period.

Tips: Keep diabetes well-managed, know your recent A1C, work with an agent who knows diabetic-friendly carriers, and compare quotes from multiple companies.`
  },
  {
    slug: "how-much-final-expense-coverage-do-i-need",
    title: "How Much Final Expense Coverage Do I Need?",
    description: "Calculate how much coverage you need based on funeral costs and other expenses.",
    category: "Planning",
    date: "2024",
    content: `To determine coverage needs, consider: Funeral/burial costs ($7,000-$12,000 average), outstanding medical bills, credit card or personal debt, any other expenses you want covered.

Most people choose $10,000-$25,000 in coverage. This typically covers funeral costs with some extra for other expenses.

Simple calculation: Estimated funeral cost + outstanding debts + buffer for unexpected expenses = recommended coverage amount.

Example: $10,000 funeral + $3,000 medical bills + $2,000 buffer = $15,000 coverage.

Our agents can help you determine the right amount based on your specific situation and budget.`
  }
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
