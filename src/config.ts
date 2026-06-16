// Централизованная конфигурация приложения.
// Все внешние адреса берутся из env (VITE_*), чтобы смена хостинга
// сводилась к правке .env, а не к поиску хардкода по коду.

const env = import.meta.env;

// URL бэкенда PocketBase (auth, файлы пользователей).
// Меняется при переезде на другой хостинг.
export const POCKETBASE_URL =
  env.VITE_POCKETBASE_URL ?? "https://anigurt-backend.onrender.com";

// Базовый URL Shikimori (GraphQL + REST).
export const SHIKIMORI_URL =
  env.VITE_SHIKIMORI_URL ?? "https://shikimori.one";

// Контактный email для заголовка User-Agent (требование Shikimori API).
export const CONTACT_EMAIL =
  env.VITE_CONTACT_EMAIL ?? "arsershoff@gmail.com";

export const SHIKIMORI_GRAPHQL_URL = `${SHIKIMORI_URL}/api/graphql`;
export const USER_AGENT = `AniGurt/1.0 (${CONTACT_EMAIL})`;

// Ссылка на файл пользователя в PocketBase (например, аватар).
export const pbFileUrl = (
  collectionId: string,
  recordId: string,
  filename: string,
) => `${POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${filename}`;
