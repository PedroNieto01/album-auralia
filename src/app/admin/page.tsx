"use client";

import { motion } from "framer-motion";
import { MedievalDivider } from "@/components/decorative/MedievalDivider";
import { GoldAccent } from "@/components/decorative/GoldAccent";

export default function AdminPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-16 auralia-texture"
      style={{ background: "var(--auralia-ink)" }}
    >
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-2xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <GoldAccent
            variant="dot-row"
            className="justify-center mb-6"
          />

          <p
            className="font-display text-xs tracking-[0.5em] uppercase mb-4"
            style={{
              color: "var(--auralia-gold)",
              opacity: 0.7,
            }}
          >
            El dominio de Auralia
          </p>

          <h1
            className="font-display text-4xl md:text-5xl mb-4"
            style={{
              color: "var(--auralia-parchment)",
            }}
          >
            Bienvenido, Pedro
          </h1>

          <MedievalDivider
            variant="ornate"
            className="w-48 mx-auto mb-8"
          />

          <p
            className="font-display italic text-lg md:text-xl leading-relaxed"
            style={{
              color: "var(--auralia-stone)",
            }}
          >
            El lugar donde los recuerdos pueden ser
            <br />
            ordenados a tu conveniencia.
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-12 font-display text-xs tracking-widest uppercase"
            style={{
              color: "var(--auralia-gold)",
            }}
          >
            Orden Perfecta
          </motion.p>
        </motion.div>
      </motion.section>
    </main>
  );
}