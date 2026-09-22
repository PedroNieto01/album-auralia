"use client";

import { motion } from "framer-motion";
import { MedievalDivider } from "@/components/decorative/MedievalDivider";
import { Ornament } from "@/components/decorative/Ornament";
import { GoldAccent } from "@/components/decorative/GoldAccent";

export function KimberlyClosing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2 }}
      className="relative py-20 px-8 text-center"
    >
      {/* Ornamentos */}
      <Ornament position="top-left" size={48} opacity={0.35} className="top-4 left-4" />
      <Ornament position="top-right" size={48} opacity={0.35} className="top-4 right-4" />

      <MedievalDivider variant="ornate" className="mb-10 max-w-[200px] mx-auto" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <p
          className="font-display text-xs tracking-[0.5em] uppercase mb-6"
          style={{ color: "var(--auralia-gold)", opacity: 0.6 }}
        >
          Fin del álbum
        </p>

        <p
          className="font-display italic text-2xl md:text-3xl leading-relaxed mb-4"
          style={{ color: "var(--auralia-parchment)" }}
        >
          Gracias por estar ahí.
        </p>

        <p
          className="font-display italic text-base leading-relaxed max-w-xs mx-auto"
          style={{ color: "var(--auralia-stone)", opacity: 0.7 }}
        >
          Estos momentos siempre serán nuestros.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-10"
      >
        <GoldAccent variant="dot-row" className="justify-center" />
      </motion.div>

      <MedievalDivider variant="ornate" className="mt-10 max-w-[200px] mx-auto" />
    </motion.div>
  );
}
