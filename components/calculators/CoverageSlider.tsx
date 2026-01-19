"use client";

import { useMemo } from "react";
import { formatCurrency } from "@/lib/rateMath";

interface CoverageSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  label?: string;
  showMarkers?: boolean;
}

export default function CoverageSlider({
  value,
  onChange,
  min,
  max,
  step,
  label = "Coverage Amount",
  showMarkers = true,
}: CoverageSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const markers = useMemo(() => {
    if (!showMarkers) return [];
    const count = Math.min(5, Math.floor((max - min) / step) + 1);
    const markerStep = (max - min) / (count - 1);
    return Array.from({ length: count }, (_, i) => min + markerStep * i);
  }, [min, max, step, showMarkers]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <span className="text-lg font-bold text-ba-navy">{formatCurrency(value)}</span>
      </div>
      
      <div className="relative pt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, #1e40af 0%, #1e40af ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
        />
        
        {showMarkers && markers.length > 0 && (
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {markers.map((m, i) => (
              <span key={i} className="text-center" style={{ width: i === 0 || i === markers.length - 1 ? 'auto' : '1px' }}>
                {i === 0 || i === markers.length - 1 ? formatCurrency(m) : ''}
              </span>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #1e40af;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #1e40af;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
