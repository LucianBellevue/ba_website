"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiChevronDown, FiArrowRight } from "react-icons/fi";
import { NavDropdown as NavDropdownType } from "@/lib/navigation";

interface NavDropdownProps {
  dropdown: NavDropdownType;
  onClose?: () => void;
}

export default function NavDropdown({ dropdown, onClose }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    onClose?.();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-ba-text hover:text-ba-blue transition-colors font-medium text-base py-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {dropdown.label}
        <FiChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden min-w-[380px]">
            {/* Navigation Items */}
            <div className="p-2">
              {dropdown.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-ba-bg transition-colors group"
                    onClick={handleLinkClick}
                  >
                    {Icon && (
                      <div className="w-10 h-10 rounded-lg bg-ba-blue/10 flex items-center justify-center shrink-0 group-hover:bg-ba-blue/20 transition-colors">
                        <Icon size={20} className="text-ba-blue" />
                      </div>
                    )}
                    <div className="pt-0.5">
                      <div className="font-semibold text-ba-navy group-hover:text-ba-blue transition-colors">
                        {item.label}
                      </div>
                      {item.description && (
                        <div className="text-sm text-gray-500">{item.description}</div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Featured Section */}
            {dropdown.featured && (
              <div className="bg-ba-bg p-4 border-t border-gray-100">
                <div className="text-sm font-semibold text-ba-navy mb-1">
                  {dropdown.featured.title}
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  {dropdown.featured.description}
                </p>
                <Link
                  href={dropdown.featured.href}
                  className="inline-flex items-center gap-2 text-ba-blue font-semibold text-sm hover:underline"
                  onClick={handleLinkClick}
                >
                  {dropdown.featured.cta}
                  <FiArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
