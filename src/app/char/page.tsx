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

export default function CharPage() {
  const album = ALBUMS.char;
  const { state, checkKey } = useAlbumAccess("char");

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
            <MedievalDivider variant="simple" className="mb-10 max-w-[160px] mx-auto" />

            {/* Galería */}
            <section>
              <PhotoGallery photos={PHOTOS.char} />
            </section>
          </AlbumLayout>

          {/* Música de fondo — arranca tras la interacción de la clave */}
          <MusicPlayer src={MUSIC.char} volume={0.4} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
