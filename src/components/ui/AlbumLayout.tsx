"use client";

import { motion } from "framer-motion";

import { Ornament } from "@/components/decorative/Ornament";
import { MedievalDivider } from "@/components/decorative/MedievalDivider";

interface AlbumLayoutProps {
  children: React.ReactNode;
  personName: string;
  cinematic?: boolean;
  className?: string;
  backgroundImage?: string;
}

export function AlbumLayout({
  children,
  personName,
  cinematic = false,
  className = "",
  backgroundImage,
}: AlbumLayoutProps) {
  return (
    <div
      className={`relative min-h-screen overflow-hidden auralia-texture ${className}`}
      style={{ background: "var(--auralia-ink)" }}
    >
      {/* ─── Fondo fotográfico opcional ─────────────────────────────── */}
      {backgroundImage && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Fotografía */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: cinematic ? 0.13 : 0.09 }}
            transition={{
              duration: 2.4,
              delay: 0.4,
              ease: "easeOut",
            }}
            className="absolute inset-0"
          >
            <div
              className="
                absolute inset-[-20px]
                bg-cover
                bg-center
                bg-no-repeat
                scale-105
                blur-[2px]
              "
              style={{
                backgroundImage: `url(${backgroundImage})`,
                filter: "saturate(0.65) contrast(0.9)",
              }}
            />
          </motion.div>

          {/* Velo para integrar la fotografía con Auralia */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 10%, var(--auralia-ink) 100%)",
              opacity: 0.58,
            }}
          />

          {/* Oscurecimiento vertical */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, var(--auralia-ink) 0%, transparent 25%, transparent 70%, var(--auralia-ink) 100%)",
              opacity: 0.45,
            }}
          />
        </div>
      )}

      {/* ─── Header del álbum ───────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-6 pt-10 pb-6 text-center"
      >
        {/* Ornamentos de esquina — más marcados en modo cinematic */}
        <Ornament
          position="top-left"
          size={cinematic ? 56 : 40}
          opacity={cinematic ? 0.4 : 0.2}
          className="top-4 left-4"
        />

        <Ornament
          position="top-right"
          size={cinematic ? 56 : 40}
          opacity={cinematic ? 0.4 : 0.2}
          className="top-4 right-4"
        />

        <p
          className="font-display text-xs tracking-[0.5em] uppercase mb-3"
          style={{
            color: "var(--auralia-gold)",
            opacity: 0.6,
          }}
        >
          Auralia
        </p>

        <h1
          className={`font-display leading-tight ${
            cinematic
              ? "text-4xl md:text-5xl"
              : "text-3xl md:text-4xl"
          }`}
          style={{
            color: "var(--auralia-parchment)",
          }}
        >
          {personName}
        </h1>

        <MedievalDivider
          variant={cinematic ? "ornate" : "simple"}
          className="mt-5 max-w-[200px] mx-auto"
        />
      </motion.header>

      {/* ─── Contenido principal ────────────────────────────────────── */}
      <main className="relative z-10 px-4 md:px-6 pb-16 max-w-4xl mx-auto">
        {children}
      </main>

      {/* ─── Footer mínimo ──────────────────────────────────────────── */}
      <footer className="relative z-10 py-8 text-center">
        <MedievalDivider
          variant="simple"
          className="max-w-[120px] mx-auto mb-4"
        />

        <p
          className="font-display italic text-xs"
          style={{
            color: "var(--auralia-stone-dark)",
            opacity: 0.5,
          }}
        >
          Auralia · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}