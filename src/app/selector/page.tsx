"use client";

import { motion } from "framer-motion";

import { PersonSelector } from "@/components/ui/PersonSelector";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { MUSIC } from "@/config/media";

export default function SelectorPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--auralia-ink)" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <PersonSelector />

        <MusicPlayer
          src={MUSIC.selector}
          volume={0.35}
        />
      </motion.div>
    </div>
  );
}