interface MedievalDividerProps {
  className?: string;
  variant?: "simple" | "ornate";
}

export function MedievalDivider({
  className = "",
  variant = "simple",
}: MedievalDividerProps) {
  if (variant === "ornate") {
    return (
      <div className={`flex items-center gap-3 ${className}`} aria-hidden>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--auralia-gold-dim)] to-transparent opacity-40" />
        <svg
          width="24"
          height="16"
          viewBox="0 0 24 16"
          fill="none"
          className="opacity-60 flex-shrink-0"
        >
          {/* Rombo central con puntas */}
          <path
            d="M12 2 L15 8 L12 14 L9 8 Z"
            fill="none"
            stroke="var(--auralia-gold)"
            strokeWidth="0.8"
          />
          <circle cx="12" cy="8" r="1.2" fill="var(--auralia-gold)" />
          <path
            d="M2 8 L6 8 M18 8 L22 8"
            stroke="var(--auralia-gold)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <circle cx="2" cy="8" r="0.8" fill="var(--auralia-gold)" opacity="0.6" />
          <circle cx="22" cy="8" r="0.8" fill="var(--auralia-gold)" opacity="0.6" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[var(--auralia-gold-dim)] to-transparent opacity-40" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--auralia-stone-dark)] to-transparent opacity-30" />
      <div className="w-1 h-1 rounded-full bg-[var(--auralia-gold)] opacity-50" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[var(--auralia-stone-dark)] to-transparent opacity-30" />
    </div>
  );
}
