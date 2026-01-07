interface ShieldBackgroundProps {
  opacity?: number;
  patternId?: string;
}

export default function ShieldBackground({ opacity = 0.04, patternId = "shields" }: ShieldBackgroundProps) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none" 
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={patternId} x="0" y="0" width="80" height="100" patternUnits="userSpaceOnUse">
            <path 
              d="M40 8L20 16v16c0 12 8 22 20 26 12-4 20-14 20-26V16L40 8z" 
              fill="currentColor" 
              fillOpacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
