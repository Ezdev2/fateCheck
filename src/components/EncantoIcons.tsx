export function ButterflyIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left upper wing */}
      <path
        d="M24 18 C20 8, 6 4, 4 10 C2 16, 10 22, 24 18Z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* Right upper wing */}
      <path
        d="M24 18 C28 8, 42 4, 44 10 C46 16, 38 22, 24 18Z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* Left lower wing */}
      <path
        d="M24 20 C18 26, 8 34, 10 38 C12 42, 18 34, 24 26Z"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Right lower wing */}
      <path
        d="M24 20 C30 26, 40 34, 38 38 C36 42, 30 34, 24 26Z"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Body */}
      <ellipse cx="24" cy="23" rx="2" ry="8" fill="currentColor" opacity="0.9" />
      {/* Antennae */}
      <path
        d="M24 15 C22 10, 18 7, 18 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M24 15 C26 10, 30 7, 30 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* Wing spots */}
      <circle cx="18" cy="14" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="30" cy="14" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="16" cy="28" r="1.8" fill="currentColor" opacity="0.4" />
      <circle cx="32" cy="28" r="1.8" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function CandleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Candle body */}
      <rect x="11" y="18" width="10" height="26" rx="2" fill="currentColor" opacity="0.8" />
      {/* Candle top ellipse */}
      <ellipse cx="16" cy="18" rx="5" ry="2" fill="currentColor" opacity="0.6" />
      {/* Wax drips */}
      <path d="M11 20 C11 24, 13 26, 13 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M21 22 C21 25, 19 27, 19 29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Flame outer */}
      <ellipse cx="16" cy="11" rx="5" ry="8" fill="currentColor" opacity="0.35" className="candle-flicker" />
      {/* Flame middle */}
      <ellipse cx="16" cy="11" rx="3" ry="5.5" fill="currentColor" opacity="0.6" className="candle-flicker" />
      {/* Flame inner */}
      <ellipse cx="16" cy="12" rx="1.5" ry="3" fill="#fff8e7" opacity="0.9" className="candle-flicker" />
      {/* Wick */}
      <line x1="16" y1="18" x2="16" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

export function FlowerIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={i}
          cx="20"
          cy="20"
          rx="4"
          ry="10"
          fill="currentColor"
          opacity={i % 2 === 0 ? 0.85 : 0.6}
          transform={`rotate(${angle} 20 20)`}
        />
      ))}
      {/* Center */}
      <circle cx="20" cy="20" r="4.5" fill="#fff8e7" opacity="0.9" />
      {/* Center dots */}
      <circle cx="19" cy="19" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="21" cy="21" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="19" cy="21" r="0.8" fill="currentColor" opacity="0.4" />
      <circle cx="21" cy="19" r="0.8" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function StarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 2 L19.5 11.5 L29.5 12 L21.5 19 L23.5 29 L16 24 L8.5 29 L10.5 19 L2.5 12 L12.5 11.5 Z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* Inner glow */}
      <path
        d="M16 6 L18.5 13 L25.5 13.5 L20 18 L21.5 25 L16 21.5 L10.5 25 L12 18 L6.5 13.5 L13.5 13 Z"
        fill="#fff8e7"
        opacity="0.3"
      />
    </svg>
  );
}

export function DoorIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Door frame */}
      <rect x="4" y="2" width="28" height="44" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.8" />
      {/* Door panels */}
      <rect x="10" y="8" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
      <rect x="10" y="26" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* Handle */}
      <circle cx="29" cy="24" r="2" fill="currentColor" opacity="0.8" />
      {/* Glow from beneath */}
      <ellipse cx="18" cy="46" rx="10" ry="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
