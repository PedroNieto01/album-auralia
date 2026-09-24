"use client";

import { AnimatePresence, motion } from "framer-motion";
import { KeyEntry } from "@/components/ui/KeyEntry";
import { AlbumLayout } from "@/components/ui/AlbumLayout";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { MedievalDivider } from "@/components/decorative/MedievalDivider";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { useAlbumAccess } from "@/hooks/useAlbumAccess";
import { ALBUMS } from "@/config/albums";
import { MUSIC, PHOTOS } from "@/config/media";

export default function KevinPage() {
  const album = ALBUMS.kevin;
  const { state, checkKey } = useAlbumAccess("kevin");

  const handleKeySubmit = async (value: string) => {
    await checkKey(value, album.keyHash);
  };

  return (
    <AnimatePresence mode="wait">
      {state !== "granted" ? (
        <motion.div key="key" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
          <KeyEntry
            personName={album.name}
            prompt={album.keyPrompt}
            state={state}
            onSubmit={handleKeySubmit}
          />
        </motion.div>
      ) : (
        <motion.div
          key="album"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AlbumLayout personName={album.name}>
            <div className="flex items-center gap-4 mb-10 max-w-[260px] mx-auto">
  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--auralia-stone-dark)] to-transparent opacity-30" />

  <div className="w-[170px] flex items-center justify-center gap-3 flex-shrink-0">
    <div className="w-1 h-1 rounded-full bg-[var(--auralia-gold)] opacity-50 flex-shrink-0" />

    <span
      className="font-display text-[10px] tracking-[0.35em] uppercase whitespace-nowrap text-center"
      style={{
        color: "var(--auralia-gold)",
        opacity: 0.65,
      }}
    >
      Alquimista 🗡️🔮
    </span>

    <div className="w-1 h-1 rounded-full bg-[var(--auralia-gold)] opacity-50 flex-shrink-0" />
  </div>

  <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[var(--auralia-stone-dark)] to-transparent opacity-30" />
</div>
            {/* Galería */}
            <section>
              <PhotoGallery photos={PHOTOS.kevin} />
            </section>
          </AlbumLayout>

          {/* Música de fondo — arranca tras la interacción de la clave */}
          <MusicPlayer src={MUSIC.kevin} volume={0.4} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
