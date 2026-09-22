"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { KeyEntry } from "@/components/ui/KeyEntry";
import { AlbumLayout } from "@/components/ui/AlbumLayout";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { MedievalDivider } from "@/components/decorative/MedievalDivider";
import { KimberlyIntro } from "@/components/kimberly/KimberlyIntro";
import { KimberlyClosing } from "@/components/kimberly/KimberlyClosing";
import { useAlbumAccess } from "@/hooks/useAlbumAccess";
import { ALBUMS } from "@/config/albums";
import { VIDEOS, PHOTOS } from "@/config/media";

type AlbumStage = "key" | "intro" | "album";

export default function KimberlyPage() {
  const album = ALBUMS.kimberly;
  const { state, checkKey } = useAlbumAccess("kimberly");
  const [albumStage, setAlbumStage] = useState<AlbumStage>("key");

  const handleKeySubmit = async (value: string) => {
    const ok = await checkKey(value, album.keyHash);
    if (ok) setAlbumStage("intro");
  };

  /* Si ya tenía acceso en sesión, saltar directo al álbum */
  const effectiveStage: AlbumStage =
    state === "granted" && albumStage === "key" ? "intro" : albumStage;

  return (
    <AnimatePresence mode="wait">
      {effectiveStage === "key" && (
        <motion.div key="key" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
          <KeyEntry
            personName={album.name}
            prompt={album.keyPrompt}
            state={state}
            onSubmit={handleKeySubmit}
            cinematic
          />
        </motion.div>
      )}

      {effectiveStage === "intro" && (
        <motion.div key="intro" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
          <KimberlyIntro onContinue={() => setAlbumStage("album")} />
        </motion.div>
      )}

      {effectiveStage === "album" && (
        <motion.div
          key="album"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AlbumLayout personName={album.name} cinematic>
            {/* Video de Kimberly */}
            <section className="mb-10 -mx-4 md:-mx-6">
              <VideoPlayer
                video={VIDEOS.kimberly}
                showControls
                compact
                className="aspect-video md:aspect-[16/7] w-full"
              />
            </section>

            <MedievalDivider variant="ornate" className="mb-10 max-w-[200px] mx-auto" />

            {/* Galería */}
            <section>
              <PhotoGallery photos={PHOTOS.kimberly} />
            </section>

            {/* Cierre especial */}
            <KimberlyClosing />
          </AlbumLayout>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
