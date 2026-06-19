/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POCKETBASE_URL?: string;
  readonly VITE_SHIKIMORI_URL?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_KODIK_API_KEY?: string;
  readonly VITE_KODIK_PLAYER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
