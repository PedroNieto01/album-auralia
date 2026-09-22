"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export function useVideoAutoplay() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  /* Intenta reproducir en mudo al montar */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const tryPlay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        // Autoplay bloqueado — el usuario deberá interactuar
        setIsPlaying(false);
      }
    };

    tryPlay();
  }, []);

  const toggleMute = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!hasInteracted) setHasInteracted(true);

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
      // Si no estaba reproduciendo, intentar ahora
      if (!isPlaying) {
        try {
          await video.play();
          setIsPlaying(true);
        } catch {
          video.muted = true;
          setIsMuted(true);
        }
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, [isMuted, isPlaying, hasInteracted]);

  const play = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      // ignorar
    }
  }, []);

  return { videoRef, isMuted, isPlaying, hasInteracted, toggleMute, play };
}
