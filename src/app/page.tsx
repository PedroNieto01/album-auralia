"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PersonSelector } from "@/components/ui/PersonSelector";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { MedievalDivider } from "@/components/decorative/MedievalDivider";
import { GoldAccent } from "@/components/decorative/GoldAccent";
import { Ornament } from "@/components/decorative/Ornament";
import { MUSIC, INTRO_VIDEO } from "@/config/media";

type Stage = "welcome" | "video" | "selector";

export default function Home() {
  const [stage, setStage] = useState<Stage>("welcome");

  return (
    <div className="min-h-screen" style={{ background: "var(--auralia-ink)" }}>
      <AnimatePresence mode="wait">
        {stage === "welcome" && (
          <WelcomeStage key="welcome" onContinue={() => setStage("video")} />
        )}
        {stage === "video" && (
          <VideoStage key="video" onContinue={() => setStage("selector")} />
        )}
        {stage === "selector" && (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <PersonSelector />
            {/* Música arranca tras la interacción del usuario en el video */}
            <MusicPlayer src={MUSIC.selector} volume={0.35} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Pantalla de bienvenida ────────────────────────────────────────── */

function WelcomeStage({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-16 relative auralia-texture"
    >
      {/* Ornamentos de esquina */}
      <Ornament position="top-left" size={56} opacity={0.35} className="top-6 left-6" />
      <Ornament position="top-right" size={56} opacity={0.35} className="top-6 right-6" />
      <Ornament position="bottom-left" size={40} opacity={0.2} className="bottom-6 left-6" />
      <Ornament position="bottom-right" size={40} opacity={0.2} className="bottom-6 right-6" />

      <div className="max-w-sm text-center">
        {/* Detalle dorado superior */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <GoldAccent variant="dot-row" className="justify-center mb-8" />
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="font-display text-xs tracking-[0.5em] uppercase mb-6"
          style={{ color: "var(--auralia-gold)", opacity: 0.65 }}
        >
          Coventalia · 2026
        </motion.p>

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
          className="font-display text-5xl md:text-6xl italic mb-4 leading-tight"
          style={{ color: "var(--auralia-parchment)" }}
        >
          Auralia
        </motion.h1>

        <MedievalDivider variant="ornate" className="my-7" />

        {/* Mensaje de bienvenida */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="font-display italic text-xl md:text-2xl leading-relaxed"
          style={{ color: "var(--auralia-stone)" }}
        >
          Bienvenido a nuestros recuerdos de Auralia
        </motion.p>

        {/* Botón de continuar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-14"
        >
          <button
            onClick={onContinue}
            className="group flex flex-col items-center gap-3 mx-auto touch-manipulation"
            aria-label="Comenzar la experiencia"
          >
            <span
              className="font-display tracking-[0.4em] uppercase text-sm
                transition-opacity duration-300 group-hover:opacity-100"
              style={{ color: "var(--auralia-gold)", opacity: 0.75 }}
            >
              Comenzar
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
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

        {/* Detalle dorado inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="mt-12"
        >
          <GoldAccent variant="dot-row" className="justify-center" />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Pantalla de video introductorio ──────────────────────────────── */

function VideoStage({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative"
    >
      <VideoPlayer
        video={INTRO_VIDEO}
        showControls
        onContinue={onContinue}
        continueLabel="Ver los álbumes"
        className="min-h-screen"
      />
    </motion.div>
  );
}
