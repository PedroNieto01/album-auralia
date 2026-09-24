/**
 * Configuración de medios de Auralia.
 * Centraliza todas las rutas de fotos y videos.
 * Cuando se incorpore contenido real, solo hay que actualizar este archivo.
 */

import type { AlbumId } from "./albums";

export interface PhotoItem {
  src: string;
  alt: string;
  /** Relación de aspecto aproximada para el layout editorial */
  aspect?: "portrait" | "landscape" | "square";
}

/* ─── Video introductorio ─────────────────────────────────────────────── */

export interface VideoConfig {
  src: string;
  poster?: string;
}

export const INTRO_VIDEO: VideoConfig = {
  src: "/media/videos/intro.mp4",
  poster: "/media/videos/intro-poster.jpg",
};

/* ─── Música de fondo ─────────────────────────────────────────────────── */

/**
 * Tres pistas de audio:
 *   1. selector  → suena en la pantalla de selección de persona (página principal)
 *   2. kimberly  → suena dentro del álbum de Kimberly
 *   3. char      → suena dentro del álbum de Char
 *   4. kevin     → suena dentro del álbum de Kevin
 *
 * Coloca los archivos en:
 *   public/media/music/selector.mp3
 *   public/media/music/kimberly.mp3
 *   public/media/music/char.mp3
 *   public/media/music/kevin.mp3
 */
export const MUSIC = {
  selector:  "/media/music/selector.mp3",
  kimberly:  "/media/music/kimberly.mp3",
  char:    "/media/music/char.mp3",
  kevin:    "/media/music/kevin.mp3",
} as const;

/* ─── Helper para generar listas de fotos ────────────────────────────── */

function photos(
  folder: string,
  prefix: string,
  count: number,
  alt: string
): PhotoItem[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/media/${folder}/${prefix}-${String(i + 1).padStart(2, "0")}.jpeg`,
    alt,
  }));
}

/* ─── Fotos compartidas ───────────────────────────────────────────────── */

// Por ahora no hay carpeta shared separada — las fotos compartidas
// están incluidas dentro de cada carpeta individual.
export const SHARED_PHOTOS: PhotoItem[] = [];

/* ─── Fotos por persona ───────────────────────────────────────────────── */

export const PHOTOS: Record<AlbumId, PhotoItem[]> = {
  kimberly: photos("kimberly", "kimberly", 67, "Kimberly"),
  char:     photos("char",     "char",    109, "Char"),
  kevin:    photos("kevin",    "kevin",    55, "Kevin"),
};

/* ─── Fotos de portada para la selección de persona ──────────────────── */

export const COVER_PHOTOS: Record<AlbumId, string> = {
  kimberly: "/media/kimberly/kimberly-01.jpeg",
  char:     "/media/char/char-01.jpeg",
  kevin:    "/media/kevin/kevin-01.jpeg",
};
