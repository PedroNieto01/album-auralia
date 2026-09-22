"use client";

import { AnimatePresence, motion } from "framer-motion";
import { KeyEntry } from "@/components/ui/KeyEntry";
import { AlbumLayout } from "@/components/ui/AlbumLayout";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { MedievalDivider } from "@/components/decorative/MedievalDivider";
import { useAlbumAccess } from "@/hooks/useAlbumAccess";
import { ALBUMS } from "@/config/albums";
import { VIDEOS, PHOTOS } from "@/config/media";

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
            {/* Video de Kevin */}
            <section className="mb-10 -mx-4 md:-mx-6">
              <VideoPlayer
                video={VIDEOS.kevin}
                showControls
                compact
                className="aspect-video md:aspect-[16/7] w-full"
              />
            </section>

            <MedievalDivider variant="simple" className="mb-10 max-w-[160px] mx-auto" />

            {/* Galería */}
            <section>
              <PhotoGallery photos={PHOTOS.kevin} />
            </section>
          </AlbumLayout>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
