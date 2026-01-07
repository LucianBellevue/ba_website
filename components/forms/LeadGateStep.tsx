"use client";

import { useState } from "react";
import { formatPhoneNumber, isValidEmail, isValidPhone } from "@/lib/rateMath";

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
}

interface LeadGateStepProps {
  onSubmit: (contact: ContactInfo) => Promise<void>;
  isSubmitting: boolean;
  error?: string;
}

export default function LeadGateStep({ onSubmit, isSubmitting, error }: LeadGateStepProps) {
  const [contact, setContact] = useState<ContactInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInfo, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactInfo, string>> = {};

    if (!contact.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!contact.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!contact.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(contact.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!contact.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhone(contact.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!contact.consent) {
      newErrors.consent = "You must agree to be contacted";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await onSubmit(contact);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setContact({ ...contact, phone: formatted });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="font-serif text-xl font-bold text-ba-navy mb-2">
          Almost there! Get your estimate
        </h3>
        <p className="text-gray-600 text-sm">
          Enter your contact information to view your personalized estimate.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={contact.firstName}
            onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent`}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={contact.lastName}
            onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent`}
            placeholder="Smith"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={contact.phone}
          onChange={handlePhoneChange}
          className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent`}
          placeholder="(555) 555-5555"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          checked={contact.consent}
          onChange={(e) => setContact({ ...contact, consent: e.target.checked })}
          className={`mt-1 w-5 h-5 text-ba-blue rounded border-gray-300 focus:ring-ba-blue ${errors.consent ? "border-red-500" : ""}`}
        />
        <label htmlFor="consent" className="text-sm text-gray-600">
          I agree to be contacted by phone, text, or email regarding my insurance quote. 
          Message and data rates may apply.
        </label>
      </div>
      {errors.consent && (
        <p className="text-sm text-red-500">{errors.consent}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "View My Estimate"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your information is secure and will never be sold to third parties.
      </p>
    </form>
  );
}
