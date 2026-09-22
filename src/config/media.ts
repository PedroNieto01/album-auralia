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

export interface VideoConfig {
  src: string;
  poster?: string;
}

/* ─── Videos ──────────────────────────────────────────────────────────── */

export const VIDEOS: Record<"intro" | AlbumId, VideoConfig> = {
  intro: {
    src: "/media/videos/intro.mp4",
    poster: "/media/videos/intro-poster.jpg",
  },
  kimberly: {
    src: "/media/videos/kimberly.mp4",
    poster: "/media/videos/kimberly-poster.jpg",
  },
  char: {
    src: "/media/videos/char.mp4",
    poster: "/media/videos/char-poster.jpg",
  },
  kevin: {
    src: "/media/videos/kevin.mp4",
    poster: "/media/videos/kevin-poster.jpg",
  },
};

/* ─── Fotos compartidas ───────────────────────────────────────────────── */

export const SHARED_PHOTOS: PhotoItem[] = [
  { src: "/media/shared/shared-01.jpg", alt: "Recuerdo compartido", aspect: "landscape" },
  { src: "/media/shared/shared-02.jpg", alt: "Recuerdo compartido", aspect: "portrait" },
  { src: "/media/shared/shared-03.jpg", alt: "Recuerdo compartido", aspect: "square" },
];

/* ─── Fotos por persona ───────────────────────────────────────────────── */

export const PHOTOS: Record<AlbumId, PhotoItem[]> = {
  kimberly: [
    { src: "/media/kimberly/kim-01.jpg", alt: "Kimberly", aspect: "portrait" },
    { src: "/media/kimberly/kim-02.jpg", alt: "Kimberly", aspect: "landscape" },
    { src: "/media/kimberly/kim-03.jpg", alt: "Kimberly", aspect: "square" },
    ...SHARED_PHOTOS,
  ],
  char: [
    { src: "/media/char/char-01.jpg", alt: "Char", aspect: "landscape" },
    { src: "/media/char/char-02.jpg", alt: "Char", aspect: "portrait" },
    ...SHARED_PHOTOS,
  ],
  kevin: [
    { src: "/media/kevin/kevin-01.jpg", alt: "Kevin", aspect: "landscape" },
    { src: "/media/kevin/kevin-02.jpg", alt: "Kevin", aspect: "portrait" },
    ...SHARED_PHOTOS,
  ],
};

/* ─── Fotos de portada para la selección de persona ──────────────────── */

export const COVER_PHOTOS: Record<AlbumId, string> = {
  kimberly: "/media/kimberly/kim-01.jpg",
  char:     "/media/char/char-01.jpg",
  kevin:    "/media/kevin/kevin-01.jpg",
};
