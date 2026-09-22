"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MedievalDivider } from "@/components/decorative/MedievalDivider";
import { GoldAccent } from "@/components/decorative/GoldAccent";
import type { AccessState } from "@/hooks/useAlbumAccess";

interface KeyEntryProps {
  personName: string;
  prompt: string;
  state: AccessState;
  onSubmit: (value: string) => void;
  cinematic?: boolean;
}

export function KeyEntry({
  personName,
  prompt,
  state,
  onSubmit,
  cinematic = false,
}: KeyEntryProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Pequeño delay para que la animación de entrada termine
    const t = setTimeout(() => inputRef.current?.focus(), 800);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && state !== "checking") {
      onSubmit(value.trim());
    }
  };

  const isChecking = state === "checking";
  const isDenied = state === "denied";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 auralia-texture"
      style={{ background: "var(--auralia-ink)" }}
    >
      {/* Ornamento superior */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-8"
      >
        <GoldAccent variant="dot-row" />
      </motion.div>

      {/* Nombre de la persona */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-display text-sm tracking-[0.4em] uppercase mb-4"
        style={{ color: "var(--auralia-gold)", opacity: 0.7 }}
      >
        {personName}
      </motion.p>

      {/* Título principal */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className={`font-display text-center mb-6 leading-tight ${
          cinematic ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
        }`}
        style={{ color: "var(--auralia-parchment)" }}
      >
        Auralia
      </motion.h1>

      <MedievalDivider variant="ornate" className="w-48 mb-8" />

      {/* Prompt */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="font-display italic text-center text-lg md:text-xl max-w-xs mb-12 leading-relaxed"
        style={{ color: "var(--auralia-stone)" }}
      >
        {prompt}
      </motion.p>

      {/* Formulario de clave */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onSubmit={handleSubmit}
        className="w-full max-w-xs flex flex-col items-center gap-6"
        noValidate
      >
        {/* Campo de texto estilizado */}
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isChecking}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="···"
            className={`w-full bg-transparent border-b text-center font-display text-xl
              tracking-widest py-3 outline-none transition-all duration-500
              placeholder:text-white/20
              ${isDenied
                ? "border-red-400/50 text-red-300"
                : "border-[var(--auralia-stone-dark)] text-[var(--auralia-parchment)] focus:border-[var(--auralia-gold)]"
              }`}
            aria-label="Palabra clave para acceder al álbum"
          />
          {/* Línea dorada animada al enfocar */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-500"
            style={{
              width: value ? "100%" : "0%",
              background: isDenied
                ? "rgba(248,113,113,0.5)"
                : "var(--auralia-gold)",
              opacity: 0.6,
            }}
          />
        </div>

        {/* Mensaje de error */}
        <AnimatePresence>
          {isDenied && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs tracking-widest text-red-400/70 font-light"
            >
              Esa no es la palabra
            </motion.p>
          )}
        </AnimatePresence>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={!value.trim() || isChecking}
          className={`group relative px-8 py-3 font-display tracking-[0.3em] uppercase text-sm
            transition-all duration-500 touch-manipulation
            ${!value.trim() || isChecking
              ? "opacity-30 cursor-not-allowed"
              : "opacity-100 cursor-pointer hover:opacity-80"
            }`}
          style={{ color: "var(--auralia-gold)" }}
        >
          {isChecking ? (
            <span className="flex items-center gap-2">
              <SpinnerIcon />
              Abriendo...
            </span>
          ) : (
            "Abrir"
          )}
          {/* Borde decorativo */}
          <span
            className="absolute inset-0 border opacity-20 transition-opacity duration-300 group-hover:opacity-40"
            style={{ borderColor: "var(--auralia-gold)" }}
          />
        </button>
      </motion.form>

      {/* Ornamento inferior */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-16"
      >
        <GoldAccent variant="dot-row" />
      </motion.div>
    </motion.div>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
