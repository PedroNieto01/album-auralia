"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Ornament } from "@/components/decorative/Ornament";
import type { AlbumId } from "@/config/albums";

interface PersonCardProps {
  id: AlbumId;
  name: string;
  coverPhoto: string;
  index: number;
}

export function PersonCard({ id, name, coverPhoto, index }: PersonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: "easeOut" }}
    >
      <Link
        href={`/${id}`}
        className="group relative block overflow-hidden touch-manipulation"
        aria-label={`Álbum de ${name}`}
      >
        {/* Contenedor de imagen */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Foto de portada */}
          <Image
            src={coverPhoto}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out
              group-hover:scale-105 group-active:scale-105"
            sizes="(max-width: 768px) 80vw, 30vw"
          />

          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Overlay de hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20
            group-active:bg-black/25 transition-colors duration-500" />

          {/* Ornamentos de esquina — sutiles */}
          <Ornament position="top-left" size={32} opacity={0.3} className="top-3 left-3" />
          <Ornament position="top-right" size={32} opacity={0.3} className="top-3 right-3" />

          {/* Nombre */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
            <p
              className="font-display text-xs tracking-[0.4em] uppercase mb-1"
              style={{ color: "var(--auralia-gold)", opacity: 0.8 }}
            >
              para
            </p>
            <h2
              className="font-display text-2xl md:text-3xl"
              style={{ color: "var(--auralia-parchment)" }}
            >
              {name}
            </h2>
          </div>
        </div>

        {/* Borde dorado sutil */}
        <div
          className="absolute inset-0 border opacity-0 group-hover:opacity-20
            group-active:opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{ borderColor: "var(--auralia-gold)" }}
        />
      </Link>
    </motion.div>
  );
}
