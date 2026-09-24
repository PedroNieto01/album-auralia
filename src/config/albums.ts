export type AlbumId = "kimberly" | "char" | "kevin";

export interface AlbumConfig {
  id: AlbumId;
  name: string;
  keyHash: string;
  welcome: string;
  keyPrompt: string;
  cinematic: boolean;
  accentColor: string;
}

// Genera el hash SHA-256 de una cadena
export async function hashKey(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input.trim().toLowerCase());

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Verifica si la clave ingresada coincide con el hash almacenado
export async function verifyKey(
  input: string,
  hash: string
): Promise<boolean> {
  const inputHash = await hashKey(input);

  return inputHash === hash;
}

export const ALBUMS: Record<AlbumId, AlbumConfig> = {
  kimberly: {
    id: "kimberly",
    name: "Kimberly",
    keyHash:
      "44d3938167a496e83da4b70b75d12e1822e17213d75f10bf32d227f6204a62eb",
    welcome: "Para ti, Kim",
    keyPrompt:
      "Hay recuerdos que solo se abren con las palabras correctas.",
    cinematic: true,
    accentColor: "#c9a84c",
  },

  char: {
    id: "char",
    name: "Char",
    keyHash:
      "a125aeb8828db664b3e22d63c56c5d8efc76495297918669eb5ba806efaa5341",
    welcome: "Para ti, Char",
    keyPrompt:
      "Hay recuerdos que solo se abren con las palabras correctas.",
    cinematic: false,
    accentColor: "#c9a84c",
  },

  kevin: {
    id: "kevin",
    name: "Kevin",
    keyHash:
      "339a39701293f1b87fa9f69469da636ae7634a6070fe44a1f0f2b03be77880f5",
    welcome: "Para ti, Kevin",
    keyPrompt:
      "Hay recuerdos que solo se abren con las palabras correctas.",
    cinematic: false,
    accentColor: "#c9a84c",
  },
};

export const ALBUM_IDS: AlbumId[] = [
  "kimberly",
  "char",
  "kevin",
];