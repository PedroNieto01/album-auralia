"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { PhotoItem } from "@/config/media";

interface PhotoLightboxProps {
  photos: PhotoItem[];
  initialIndex: number;
  onClose: () => void;
}

export function PhotoLightbox({ photos, initialIndex, onClose }: PhotoLightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + photos.length) % photos.length);
    },
    [photos.length]
  );

  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);

  /* Teclado */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  /* Bloquear scroll del body */
  useEffect(() => {
    document.body.classList.add("lightbox-open");
    return () => document.body.classList.remove("lightbox-open");
  }, []);

  /* Swipe táctil */
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    setTouchStart(null);
  };

  const photo = photos[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal
      aria-label="Fotografía ampliada"
    >
      {/* Foto */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d * 60, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d * -60, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-full max-w-3xl max-h-[80vh]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
          rounded-full bg-white/10 hover:bg-white/20 transition-colors
          text-white/70 hover:text-white touch-manipulation"
        aria-label="Cerrar"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Navegación — solo si hay más de una foto */}
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
              rounded-full bg-white/10 hover:bg-white/20 transition-colors
              text-white/70 hover:text-white touch-manipulation"
            aria-label="Foto anterior"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
              rounded-full bg-white/10 hover:bg-white/20 transition-colors
              text-white/70 hover:text-white touch-manipulation"
            aria-label="Foto siguiente"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Contador */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <span className="text-white/40 text-xs tracking-widest font-light">
          {current + 1} / {photos.length}
        </span>
      </div>
    </motion.div>
  );
}
