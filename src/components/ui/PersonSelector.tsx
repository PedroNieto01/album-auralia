"use client";

import { motion } from "framer-motion";
import { PersonCard } from "./PersonCard";
import { AdminCard } from "./AdminCard";
import { MedievalDivider } from "@/components/decorative/MedievalDivider";
import { GoldAccent } from "@/components/decorative/GoldAccent";
import { ALBUM_IDS, ALBUMS } from "@/config/albums";
import { COVER_PHOTOS } from "@/config/media";

export function PersonSelector() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 auralia-texture"
      style={{ background: "var(--auralia-ink)" }}
    >
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-4"
      >
        <GoldAccent variant="dot-row" className="justify-center mb-6" />
        <p
          className="font-display text-xs tracking-[0.5em] uppercase mb-4"
          style={{ color: "var(--auralia-gold)", opacity: 0.6 }}
        >
          Auralia
        </p>
        <h2
          className="font-display text-3xl md:text-4xl mb-2"
          style={{ color: "var(--auralia-parchment)" }}
        >
          ¿Para quién son estos recuerdos?
        </h2>
      </motion.div>

      <MedievalDivider variant="ornate" className="w-48 mb-12" />

      {/* Tarjetas de personas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl">
  {ALBUM_IDS.map((id, index) => (
    <PersonCard
      key={id}
      id={id}
      name={ALBUMS[id].name}
      coverPhoto={COVER_PHOTOS[id]}
      index={index}
    />
  ))}

  <AdminCard index={3} />
</div>

      {/* Nota al pie */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-12 font-display italic text-sm text-center"
        style={{ color: "var(--auralia-stone-dark)", opacity: 0.5 }}
      >
        Selecciona tu nombre para abrir tu álbum
      </motion.p>
    </motion.section>
  );
}
