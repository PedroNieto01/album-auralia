"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface UseBackgroundMusicOptions {
  src: string;
  /** Volumen inicial 0-1. Default 0.4 */
  volume?: number;
  /** Fade in en ms. Default 2000 */
  fadeInMs?: number;
}

export function useBackgroundMusic({
  src,
  volume = 0.4,
  fadeInMs = 2000,
}: UseBackgroundMusicOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  /* Crea el elemento de audio una sola vez */
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      if (fadeRef.current) clearInterval(fadeRef.current);
    };
  }, [src]);

  /* Fade in suave */
  const fadeIn = useCallback(
    (targetVolume: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (fadeRef.current) clearInterval(fadeRef.current);

      const steps = 40;
      const interval = fadeInMs / steps;
      const step = targetVolume / steps;

      fadeRef.current = setInterval(() => {
        if (!audioRef.current) return;
        const next = Math.min(audioRef.current.volume + step, targetVolume);
        audioRef.current.volume = next;
        if (next >= targetVolume) {
          if (fadeRef.current) clearInterval(fadeRef.current);
        }
      }, interval);
    },
    [fadeInMs]
  );

  /* Fade out suave */
  const fadeOut = useCallback((onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) clearInterval(fadeRef.current);

    const steps = 30;
    const interval = 800 / steps;
    const step = audio.volume / steps;

    fadeRef.current = setInterval(() => {
      if (!audioRef.current) return;
      const next = Math.max(audioRef.current.volume - step, 0);
      audioRef.current.volume = next;
      if (next <= 0) {
        if (fadeRef.current) clearInterval(fadeRef.current);
        audioRef.current.pause();
        onDone?.();
      }
    }, interval);
  }, []);

  /* Inicia la música — debe llamarse desde un gesto del usuario */
  const start = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || hasStarted) return;
    try {
      audio.volume = 0;
      await audio.play();
      setIsPlaying(true);
      setHasStarted(true);
      fadeIn(volume);
    } catch {
      // Autoplay bloqueado — el usuario deberá interactuar
    }
  }, [hasStarted, fadeIn, volume]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  }, [isMuted]);

  const stop = useCallback(() => {
    fadeOut(() => setIsPlaying(false));
  }, [fadeOut]);

  return { start, stop, toggleMute, isPlaying, isMuted, hasStarted };
}
