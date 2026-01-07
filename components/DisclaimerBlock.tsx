interface DisclaimerBlockProps {
  variant?: "default" | "footer" | "form";
  className?: string;
}

export default function DisclaimerBlock({ variant = "default", className = "" }: DisclaimerBlockProps) {
  const baseClasses = variant === "footer" ? "text-sm text-gray-400" : "text-sm text-gray-600 bg-gray-100 p-4 rounded-lg";

  return (
    <div className={`${baseClasses} ${className}`}>
      <div className="space-y-2">
        <p><strong>Important Disclosures:</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Availability varies by state. Not available in all states.</li>
          <li>Coverage amounts, premiums, and policy features vary by carrier and state.</li>
          <li>Not affiliated with the U.S. government, Medicare, or Social Security Administration.</li>
          {variant === "form" && (
            <li>
              By submitting this form, you authorize Bellevue Assurance and its partners to contact you
              by phone, text message, and/or email regarding insurance products. Message and data rates may apply.
              Consent is not a condition of purchase.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
