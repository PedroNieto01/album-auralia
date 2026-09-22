interface GoldAccentProps {
  className?: string;
  /** Línea vertical decorativa a la izquierda de un bloque de texto */
  variant?: "line" | "dot-row";
}

export function GoldAccent({ className = "", variant = "line" }: GoldAccentProps) {
  if (variant === "dot-row") {
    return (
      <div className={`flex items-center gap-1.5 ${className}`} aria-hidden>
        {[0.3, 0.6, 1, 0.6, 0.3].map((op, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{
              backgroundColor: "var(--auralia-gold)",
              opacity: op,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`w-px self-stretch ${className}`}
      aria-hidden
      style={{
        background:
          "linear-gradient(to bottom, transparent, var(--auralia-gold-dim), transparent)",
        opacity: 0.5,
      }}
    />
  );
}
