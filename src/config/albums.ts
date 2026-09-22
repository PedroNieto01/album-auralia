/**
 * Configuración central de los álbumes de Auralia.
 * Las claves se almacenan como hashes SHA-256 (hex).
 * Para generar un hash: https://emn178.github.io/online-tools/sha256.html
 *
 * Claves actuales (placeholders — reemplazar con las reales):
 *   kimberly → "aurora"
 *   char     → "coventalia"
 *   kevin    → "recuerdo"
 */

export type AlbumId = "kimberly" | "char" | "kevin";

export interface AlbumConfig {
  id: AlbumId;
  name: string;
  /** Hash SHA-256 de la clave en minúsculas */
  keyHash: string;
  /** Texto de bienvenida personalizado */
  welcome: string;
  /** Subtítulo o frase de la pantalla de clave */
  keyPrompt: string;
  /** Activa la experiencia cinematográfica especial */
  cinematic: boolean;
  /** Color de acento para esta persona (clase Tailwind o CSS) */
  accentColor: string;
}

/** Genera el hash SHA-256 de una cadena en el navegador */
export async function hashKey(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Verifica si la clave ingresada coincide con el hash almacenado */
export async function verifyKey(input: string, hash: string): Promise<boolean> {
  const inputHash = await hashKey(input);
  return inputHash === hash;
}

export const ALBUMS: Record<AlbumId, AlbumConfig> = {
  kimberly: {
    id: "kimberly",
    name: "Kimberly",
    // SHA-256 de "aurora" (placeholder)
    keyHash:
      "aeiou12345678901234567890123456789012345678901234567890123456789",
    welcome: "Para ti, Kimberly",
    keyPrompt:
      "Hay recuerdos que solo se abren con las palabras correctas.",
    cinematic: true,
    accentColor: "#c9a84c",
  },
  char: {
    id: "char",
    name: "Char",
    // SHA-256 de "coventalia" (placeholder)
    keyHash:
      "aeiou12345678901234567890123456789012345678901234567890123456780",
    welcome: "Para ti, Char",
    keyPrompt:
      "Hay recuerdos que solo se abren con las palabras correctas.",
    cinematic: false,
    accentColor: "#c9a84c",
  },
  kevin: {
    id: "kevin",
    name: "Kevin",
    // SHA-256 de "recuerdo" (placeholder)
    keyHash:
      "aeiou12345678901234567890123456789012345678901234567890123456781",
    welcome: "Para ti, Kevin",
    keyPrompt:
      "Hay recuerdos que solo se abren con las palabras correctas.",
    cinematic: false,
    accentColor: "#c9a84c",
  },
};

export const ALBUM_IDS: AlbumId[] = ["kimberly", "char", "kevin"];
