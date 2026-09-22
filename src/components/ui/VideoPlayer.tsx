"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";
import type { VideoConfig } from "@/config/media";

interface VideoPlayerProps {
  video: VideoConfig;
  /** Si true, muestra controles de sonido y botón de continuar */
  showControls?: boolean;
  onContinue?: () => void;
  className?: string;
  /** Texto del botón de continuar */
  continueLabel?: string;
  /** Modo compacto para álbumes individuales */
  compact?: boolean;
}

export function VideoPlayer({
  video,
  showControls = true,
  onContinue,
  className = "",
  continueLabel = "Continuar",
  compact = false,
}: VideoPlayerProps) {
  const { videoRef, isMuted, isPlaying, toggleMute, play } = useVideoAutoplay();

  /* Si el video no arrancó automáticamente, intentar al hacer scroll visible */
  useEffect(() => {
    if (!videoRef.current || isPlaying) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
      },
      { threshold: 0.5 }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [isPlaying, play, videoRef]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video */}
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        aria-label="Video introductorio de Auralia"
      />

      {/* Overlay oscuro sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />

      {showControls && (
        <>
          {/* Botón de sonido */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={toggleMute}
            className={`absolute ${compact ? "top-3 right-3" : "top-4 right-4 md:top-6 md:right-6"} 
              flex items-center gap-2 px-3 py-2 rounded-full
              bg-black/40 backdrop-blur-sm border border-white/10
              text-white/80 hover:text-white hover:bg-black/60
              transition-all duration-300 text-xs font-light tracking-widest uppercase
              touch-manipulation`}
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? (
              <>
                <SoundOffIcon />
                <span className="hidden sm:inline">Sonido</span>
              </>
            ) : (
              <>
                <SoundOnIcon />
                <span className="hidden sm:inline">Silenciar</span>
              </>
            )}
          </motion.button>

          {/* Botón de continuar */}
          {onContinue && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="absolute bottom-8 left-0 right-0 flex justify-center"
            >
              <button
                onClick={onContinue}
                className="group flex flex-col items-center gap-3 touch-manipulation"
                aria-label={continueLabel}
              >
                <span
                  className="font-display text-sm tracking-[0.3em] uppercase text-white/70
                    group-hover:text-white transition-colors duration-300"
                >
                  {continueLabel}
                </span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <ChevronDownIcon />
                </motion.div>
              </button>
            </motion.div>
          )}

          {/* Indicador de video sin sonido */}
          <AnimatePresence>
            {isMuted && !compact && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
                className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none"
              >
                <span className="text-white/40 text-xs tracking-widest font-light">
                  toca el ícono para activar el sonido
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

/* ─── Íconos inline ─────────────────────────────────────────────────── */

function SoundOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function SoundOnIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
