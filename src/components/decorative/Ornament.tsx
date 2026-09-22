interface OrnamentProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  opacity?: number;
  className?: string;
}

export function Ornament({
  position,
  size = 48,
  opacity = 0.25,
  className = "",
}: OrnamentProps) {
  const rotations: Record<OrnamentProps["position"], number> = {
    "top-left":     0,
    "top-right":    90,
    "bottom-right": 180,
    "bottom-left":  270,
  };

  const rotation = rotations[position];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={`absolute pointer-events-none ${className}`}
      style={{ opacity, transform: `rotate(${rotation}deg)` }}
    >
      {/* Esquina con ornamentación inspirada en manuscritos medievales */}
      <path
        d="M4 4 L4 20 M4 4 L20 4"
        stroke="var(--auralia-gold)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M4 4 L14 14"
        stroke="var(--auralia-gold)"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Pequeño detalle floral en la esquina */}
      <circle cx="4" cy="4" r="2" fill="none" stroke="var(--auralia-gold)" strokeWidth="0.8" />
      <circle cx="4" cy="4" r="0.8" fill="var(--auralia-gold)" />
      {/* Puntos decorativos */}
      <circle cx="10" cy="4" r="0.6" fill="var(--auralia-gold)" opacity="0.5" />
      <circle cx="4" cy="10" r="0.6" fill="var(--auralia-gold)" opacity="0.5" />
      <circle cx="16" cy="4" r="0.4" fill="var(--auralia-gold)" opacity="0.3" />
      <circle cx="4" cy="16" r="0.4" fill="var(--auralia-gold)" opacity="0.3" />
    </svg>
  );
}
