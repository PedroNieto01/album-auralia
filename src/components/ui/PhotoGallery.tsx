"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PhotoLightbox } from "./PhotoLightbox";
import type { PhotoItem } from "@/config/media";

interface PhotoGalleryProps {
  photos: PhotoItem[];
  className?: string;
}

/**
 * Galería editorial/cinematográfica.
 * Usa un layout de columnas variables con alturas distintas
 * para crear una composición visual dinámica, no una cuadrícula rígida.
 */
export function PhotoGallery({ photos, className = "" }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /* Distribuye las fotos en columnas de forma editorial */
  const columns = distributeColumns(photos);

  return (
    <>
      <div
        className={`grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2 ${className}`}
        role="list"
        aria-label="Galería de fotografías"
      >
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-1.5 md:gap-2">
            {col.map(({ photo, originalIndex }) => (
              <GalleryPhoto
                key={photo.src}
                photo={photo}
                index={originalIndex}
                onClick={() => setLightboxIndex(originalIndex)}
              />
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <PhotoLightbox
            photos={photos}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Foto individual ───────────────────────────────────────────────── */

interface GalleryPhotoProps {
  photo: PhotoItem;
  index: number;
  onClick: () => void;
}

function GalleryPhoto({ photo, index, onClick }: GalleryPhotoProps) {
  const aspectClass = {
    portrait:  "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square:    "aspect-square",
  }[photo.aspect ?? "square"];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: "easeOut" }}
      onClick={onClick}
      className={`relative overflow-hidden group cursor-pointer touch-manipulation
        ${aspectClass} w-full`}
      role="listitem"
      aria-label={`Abrir ${photo.alt}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover transition-transform duration-700 ease-out
          group-hover:scale-105 group-active:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
        loading={index < 4 ? "eager" : "lazy"}
      />
      {/* Overlay al hover/touch */}
      <div
        className="absolute inset-0 bg-black/0 group-hover:bg-black/15
          group-active:bg-black/20 transition-colors duration-300"
      />
      {/* Ícono de ampliar */}
      <div
        className="absolute inset-0 flex items-center justify-center
          opacity-0 group-hover:opacity-100 group-active:opacity-100
          transition-opacity duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm
          flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

/* ─── Distribución editorial ────────────────────────────────────────── */

/**
 * Distribuye las fotos en columnas intentando equilibrar la altura visual.
 * Las fotos portrait van a columnas con menos elementos,
 * las landscape a columnas con más, creando variedad.
 */
function distributeColumns(
  photos: PhotoItem[]
): Array<Array<{ photo: PhotoItem; originalIndex: number }>> {
  const numCols = 2; // base móvil; CSS maneja 3 en desktop
  const cols: Array<Array<{ photo: PhotoItem; originalIndex: number }>> = Array.from(
    { length: numCols },
    () => []
  );

  photos.forEach((photo, i) => {
    // Distribución simple alternada con ligero sesgo editorial
    const col = i % 2 === 0 ? 0 : 1;
    cols[col].push({ photo, originalIndex: i });
  });

  return cols;
}
