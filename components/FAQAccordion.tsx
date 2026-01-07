"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ faqs, className = "" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`space-y-4 ${className}`}>
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <button
            type="button"
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-ba-navy pr-4">{faq.question}</span>
            <svg
              className={`w-5 h-5 text-ba-blue shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-ba-text">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
