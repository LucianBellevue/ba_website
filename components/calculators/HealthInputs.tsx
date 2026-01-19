"use client";

interface HealthInputsProps {
  heightFeet: number;
  heightInches: number;
  weightLbs: number;
  onHeightFeetChange: (value: number) => void;
  onHeightInchesChange: (value: number) => void;
  onWeightChange: (value: number) => void;
  errors?: {
    heightFeet?: string;
    heightInches?: string;
    weightLbs?: string;
  };
}

export default function HealthInputs({
  heightFeet,
  heightInches,
  weightLbs,
  onHeightFeetChange,
  onHeightInchesChange,
  onWeightChange,
  errors = {},
}: HealthInputsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="relative">
              <input
                type="number"
                min={4}
                max={7}
                value={heightFeet}
                onChange={(e) => onHeightFeetChange(parseInt(e.target.value) || 5)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.heightFeet ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent pr-12`}
                placeholder="5"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">ft</span>
            </div>
            {errors.heightFeet && <p className="mt-1 text-sm text-red-500">{errors.heightFeet}</p>}
          </div>
          <div>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={11}
                value={heightInches}
                onChange={(e) => onHeightInchesChange(parseInt(e.target.value) || 0)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.heightInches ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent pr-12`}
                placeholder="8"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">in</span>
            </div>
            {errors.heightInches && <p className="mt-1 text-sm text-red-500">{errors.heightInches}</p>}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
        <div className="relative">
          <input
            type="number"
            min={80}
            max={500}
            value={weightLbs}
            onChange={(e) => onWeightChange(parseInt(e.target.value) || 150)}
            className={`w-full px-4 py-3 rounded-lg border ${errors.weightLbs ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-ba-blue focus:border-transparent pr-12`}
            placeholder="150"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">lbs</span>
        </div>
        {errors.weightLbs && <p className="mt-1 text-sm text-red-500">{errors.weightLbs}</p>}
      </div>
    </div>
  );
}
