"use client";

import { useState } from "react";
import Link from "next/link";
import { US_STATES } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import DisclaimerBlock from "./DisclaimerBlock";
import { FiDollarSign } from "react-icons/fi";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  state: string;
  age: string;
  gender: string;
  productType: string;
  tobacco: string;
  notes: string;
  consent: boolean;
}

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", phone: "", state: "", age: "", gender: "", productType: "", tobacco: "", notes: "", consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[\d\s\-\(\)]+$/.test(formData.phone) || formData.phone.replace(/\D/g, "").length < 10)
      newErrors.phone = "Please enter a valid phone number";
    if (!formData.state) newErrors.state = "Please select your state";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    else { const ageNum = parseInt(formData.age); if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) newErrors.age = "Please enter a valid age (18-100)"; }
    if (!formData.consent) newErrors.consent = "You must agree to be contacted";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    trackEvent("form_submit", { source: "lead_form" });
    try {
      const response = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = await response.json();
      if (data.ok) { setIsSuccess(true); trackEvent("form_success", { source: "lead_form" }); }
      else throw new Error("Submission failed");
    } catch {
      trackEvent("form_error", { source: "lead_form" });
      setErrors({ form: "Something went wrong. Please try again or call us directly." });
    } finally { setIsSubmitting(false); }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-bold text-ba-navy mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">We&apos;ve received your information. A licensed agent will call you shortly.</p>
        <p className="text-sm text-gray-500">Questions? Call us at <a href="tel:+14702028817" className="text-ba-blue hover:underline">(470) 202-8817</a></p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h3 className="font-serif text-2xl font-bold text-ba-navy mb-6">Get Your Free Quote</h3>
      {errors.form && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{errors.form}</div>}
      
      {/* Calculator referral */}
      <div className="bg-ba-bg border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <FiDollarSign className="text-ba-blue shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm text-gray-700">
              <strong>Not sure how much coverage you need?</strong> Try our free quote calculator to see estimated premiums instantly.
            </p>
            <Link href="/quotes" className="text-ba-blue font-medium text-sm hover:underline mt-1 inline-block">
              Use the Quote Calculator →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent`} placeholder="John" />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent`} placeholder="Smith" />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent`} placeholder="(555) 123-4567" />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State *</label>
          <select id="state" name="state" value={formData.state} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.state ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent bg-white`}>
            <option value="">Select State</option>
            {US_STATES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} min="18" max="100" className={`w-full px-4 py-3 rounded-lg border ${errors.age ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent`} placeholder="65" />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ba-blue focus:border-transparent bg-white">
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div>
          <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1">Insurance Type</label>
          <select id="productType" name="productType" value={formData.productType} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ba-blue focus:border-transparent bg-white">
            <option value="">Not sure / Both</option>
            <option value="final_expense">Final Expense Insurance</option>
            <option value="term_life">Term Life Insurance</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="tobacco" className="block text-sm font-medium text-gray-700 mb-1">Tobacco Use</label>
        <select id="tobacco" name="tobacco" value={formData.tobacco} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ba-blue focus:border-transparent bg-white">
          <option value="">Prefer not to say</option>
          <option value="no">No tobacco use</option>
          <option value="yes">Yes, tobacco user</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
        <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ba-blue focus:border-transparent" placeholder="Any questions or specific coverage needs..." />
      </div>
      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="mt-1 w-5 h-5 text-ba-blue rounded border-gray-300 focus:ring-ba-blue" />
          <span className="text-sm text-gray-600">I agree to be contacted by phone, text, and/or email regarding insurance products. Message and data rates may apply. Consent is not a condition of purchase. *</span>
        </label>
        {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed">
        {isSubmitting ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Submitting...</span> : "Get My Free Quote"}
      </button>
      <div className="mt-6"><DisclaimerBlock variant="form" /></div>
    </form>
  );
}
