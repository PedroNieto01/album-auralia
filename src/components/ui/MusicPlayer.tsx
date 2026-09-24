"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";

interface MusicPlayerProps {
  src: string;
  /** Si true, intenta iniciar la música automáticamente tras el primer gesto de página */
  autoStart?: boolean;
  /** Volumen 0-1. Default 0.4 */
  volume?: number;
}

/**
 * Reproductor de música de fondo minimalista.
 * Muestra un botón flotante discreto en la esquina inferior izquierda.
 * La música arranca en el primer render (requiere que el componente
 * se monte tras un gesto del usuario para respetar políticas de autoplay).
 */
export function MusicPlayer({ src, autoStart = true, volume = 0.4 }: MusicPlayerProps) {
  const { start, toggleMute, isPlaying, isMuted, hasStarted } = useBackgroundMusic({
    src,
    volume,
    fadeInMs: 2500,
  });

  /* Inicia automáticamente al montar (ya hubo interacción del usuario) */
  useEffect(() => {
    if (autoStart) {
      start();
    }
  }, [autoStart, start]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="fixed bottom-5 left-5 z-40"
    >
      <button
        onClick={hasStarted ? toggleMute : start}
        className="flex items-center gap-2 px-3 py-2 rounded-full
          bg-black/50 backdrop-blur-sm border border-white/10
          text-white/60 hover:text-white/90 hover:bg-black/70
          transition-all duration-300 touch-manipulation"
        aria-label={isMuted ? "Activar música" : isPlaying ? "Silenciar música" : "Reproducir música"}
      >
        {/* Ícono animado de ondas cuando suena */}
        {isPlaying && !isMuted ? <MusicOnIcon /> : <MusicOffIcon />}
        <span className="text-xs tracking-widest font-light hidden sm:inline">
          {isMuted ? "música" : isPlaying ? "música" : "música"}
        </span>
      </button>
    </motion.div>
  );
}

function MusicOnIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      {/* Nota musical con ondas animadas */}
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function MusicOffIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
      <line x1="2" y1="2" x2="22" y2="22" strokeOpacity="0.6" />
    </svg>
  );
}
