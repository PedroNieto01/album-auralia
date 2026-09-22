"use client";

import { motion } from "framer-motion";
import { Ornament } from "@/components/decorative/Ornament";
import { MedievalDivider } from "@/components/decorative/MedievalDivider";

interface AlbumLayoutProps {
  children: React.ReactNode;
  personName: string;
  /** Activa ornamentos medievales más marcados */
  cinematic?: boolean;
  className?: string;
}

export function AlbumLayout({
  children,
  personName,
  cinematic = false,
  className = "",
}: AlbumLayoutProps) {
  return (
    <div
      className={`min-h-screen auralia-texture ${className}`}
      style={{ background: "var(--auralia-ink)" }}
    >
      {/* Header del álbum */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative px-6 pt-10 pb-6 text-center"
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
          style={{ color: "var(--auralia-gold)", opacity: 0.6 }}
        >
          Auralia
        </p>

        <h1
          className={`font-display leading-tight ${
            cinematic ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
          }`}
          style={{ color: "var(--auralia-parchment)" }}
        >
          {personName}
        </h1>

        <MedievalDivider
          variant={cinematic ? "ornate" : "simple"}
          className="mt-5 max-w-[200px] mx-auto"
        />
      </motion.header>

      {/* Contenido principal */}
      <main className="px-4 md:px-6 pb-16 max-w-4xl mx-auto">
        {children}
      </main>

      {/* Footer mínimo */}
      <footer className="py-8 text-center">
        <MedievalDivider variant="simple" className="max-w-[120px] mx-auto mb-4" />
        <p
          className="font-display italic text-xs"
          style={{ color: "var(--auralia-stone-dark)", opacity: 0.5 }}
        >
          Auralia · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
