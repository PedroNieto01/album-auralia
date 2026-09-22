"use client";

import { useState, useEffect, useCallback } from "react";
import { verifyKey, type AlbumId } from "@/config/albums";

const SESSION_KEY_PREFIX = "auralia_access_";

export type AccessState = "idle" | "checking" | "granted" | "denied";

export function useAlbumAccess(albumId: AlbumId) {
  const sessionKey = `${SESSION_KEY_PREFIX}${albumId}`;

  const [state, setState] = useState<AccessState>("idle");

  /* Comprueba si ya hay acceso en esta sesión */
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(sessionKey);
      if (stored === "1") setState("granted");
    } catch {
      // sessionStorage no disponible (modo privado muy restrictivo)
    }
  }, [sessionKey]);

  const checkKey = useCallback(
    async (input: string, hash: string) => {
      setState("checking");
      const ok = await verifyKey(input, hash);
      if (ok) {
        try {
          sessionStorage.setItem(sessionKey, "1");
        } catch {
          // ignorar si no está disponible
        }
        setState("granted");
      } else {
        setState("denied");
        // Vuelve a idle después de un momento para permitir reintentar
        setTimeout(() => setState("idle"), 1500);
      }
      return ok;
    },
    [sessionKey]
  );

  const revoke = useCallback(() => {
    try {
      sessionStorage.removeItem(sessionKey);
    } catch {
      // ignorar
    }
    setState("idle");
  }, [sessionKey]);

  return { state, checkKey, revoke };
}
