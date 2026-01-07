import { HiShieldCheck } from "react-icons/hi";
import { FiPhone, FiCheckCircle, FiLock } from "react-icons/fi";

export default function TrustBar() {
  return (
    <section className="bg-white border-y border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="flex items-center justify-center gap-2 text-ba-navy">
            <HiShieldCheck size={24} color="var(--ba-blue)" />
            <span className="font-medium text-sm md:text-base">Licensed Agents</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-ba-navy">
            <FiPhone size={24} color="var(--ba-blue)" />
            <span className="font-medium text-sm md:text-base">Fast Phone Quotes</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-ba-navy">
            <FiCheckCircle size={24} color="var(--ba-blue)" />
            <span className="font-medium text-sm md:text-base">No Obligation</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-ba-navy">
            <FiLock size={24} color="var(--ba-blue)" />
            <span className="font-medium text-sm md:text-base">Privacy First</span>
          </div>
        </div>
      </div>
    </section>
  );
}
