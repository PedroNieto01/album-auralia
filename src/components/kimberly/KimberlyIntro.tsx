"use client";

import { motion } from "framer-motion";
import { MedievalDivider } from "@/components/decorative/MedievalDivider";
import { Ornament } from "@/components/decorative/Ornament";
import { GoldAccent } from "@/components/decorative/GoldAccent";

interface KimberlyIntroProps {
  onContinue: () => void;
}

export function KimberlyIntro({ onContinue }: KimberlyIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-16 relative auralia-texture"
      style={{ background: "var(--auralia-ink)" }}
    >
      {/* Ornamentos de esquina más marcados */}
      <Ornament position="top-left" size={64} opacity={0.45} className="top-6 left-6" />
      <Ornament position="top-right" size={64} opacity={0.45} className="top-6 right-6" />
      <Ornament position="bottom-left" size={48} opacity={0.3} className="bottom-6 left-6" />
      <Ornament position="bottom-right" size={48} opacity={0.3} className="bottom-6 right-6" />

      {/* Contenido */}
      <div className="max-w-sm text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <GoldAccent variant="dot-row" className="justify-center mb-8" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="font-display text-xs tracking-[0.5em] uppercase mb-6"
          style={{ color: "var(--auralia-gold)", opacity: 0.7 }}
        >
          Para Kimberly
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
          className="font-display text-5xl md:text-6xl italic mb-6 leading-tight"
          style={{ color: "var(--auralia-parchment)" }}
        >
          Auralia
        </motion.h1>

        <MedievalDivider variant="ornate" className="mb-8" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="font-display italic text-lg md:text-xl leading-relaxed mb-4"
          style={{ color: "var(--auralia-stone)" }}
        >
          Estos recuerdos son tuyos.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="font-display italic text-base leading-relaxed"
          style={{ color: "var(--auralia-stone-dark)", opacity: 0.7 }}
        >
          Guardados con cuidado, para que siempre puedas volver a ellos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="mt-14"
        >
          <button
            onClick={onContinue}
            className="group flex flex-col items-center gap-3 mx-auto touch-manipulation"
            aria-label="Ver el álbum"
          >
            <span
              className="font-display tracking-[0.4em] uppercase text-sm
                transition-colors duration-300"
              style={{ color: "var(--auralia-gold)", opacity: 0.8 }}
            >
              Ver el álbum
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--auralia-gold)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
