// fetch-catalog.mjs
// Качалка каталога аниме: тянет всё с Shikimori GraphQL, добавляет ссылку
// на постер с MAL и пишет результат в NDJSON-файл (по объекту на строку).
//
// Базы данных тут НЕ нужно — на выходе просто файл animes.ndjson.
// Запуск:  node scripts/fetch-catalog.mjs
// Нужен Node 18+ (в нём есть встроенный fetch).

import { appendFileSync, writeFileSync, readFileSync, existsSync } from "fs";


// ── Настройки ─────────────────────────────────────────────────
// Живой домен Shikimori — сейчас .io (.one редиректит, .me лежит).
// Можно переопределить: SHIKIMORI_URL=https://shikimori.io node ...
const SHIKIMORI =
  (process.env.SHIKIMORI_URL ?? "https://shikimori.io") + "/api/graphql";
const OUT_FILE = "animes.ndjson";       // куда пишем каталог
const PROGRESS_FILE = "progress.json";  // где запоминаем, до какой страницы дошли
const PAGE_SIZE = 50;                   // Shikimori отдаёт максимум 50 за раз
const DELAY_MS = 600;                   // пауза между запросами (бережём лимит)
const EST_TOTAL = 24000;                // примерная оценка размера каталога (для прогресс-бара)
// Email берём из .env через process.env (запусти: node --env-file=.env scripts/fetch-catalog.mjs).
// Если флаг не передан — подставится запасное значение.
const USER_AGENT = `AniGurt/1.0 (${process.env.VITE_CONTACT_EMAIL ?? "you@example.com"})`;
// Лимит страниц для теста: MAX_PAGES=2 node ...  (по умолчанию — без лимита)
const MAX_PAGES = process.env.MAX_PAGES ? Number(process.env.MAX_PAGES) : Infinity;
// Бесплатный дамп со ссылками на постеры MAL (один файл на все тайтлы).
// Файлы лежат в GitHub Releases; этот "latest"-URL всегда ведёт на свежий релиз.
const OFFLINE_DB =
  "https://github.com/manami-project/anime-offline-database/releases/latest/download/anime-offline-database-minified.json";

// ── GraphQL-запрос ────────────────────────────────────────────
// ПОЛНЫЙ набор полей — ровно те, что использует твоя страница аниме
// (GET_ANIME_BY_ID). Отличие от приложения: вместо ids/limit мы листаем
// постранично через page/limit и сортируем по id, чтобы пройти весь каталог.
const QUERY = `
  query ($page: Int!, $limit: Int!) {
    animes(page: $page, limit: $limit, order: id) {
      id
      malId
      name
      russian
      licenseNameRu
      english
      japanese
      synonyms
      kind
      rating
      score
      status
      episodes
      episodesAired
      duration
      airedOn { year month day date }
      releasedOn { year month day date }
      url
      season

      poster { id originalUrl mainUrl }

      fansubbers
      fandubbers
      licensors
      createdAt
      updatedAt
      nextEpisodeAt
      isCensored

      genres { id name russian kind }
      studios { id name imageUrl }

      externalLinks { id kind url createdAt updatedAt }

      personRoles {
        id rolesRu rolesEn
        person { id name poster { id } }
      }
      characterRoles {
        id rolesRu rolesEn
        character { id name poster { id } }
      }

      related {
        id
        anime { id name }
        manga { id name }
        relationKind
        relationText
      }

      videos { id url name kind playerUrl imageUrl }
      screenshots { id originalUrl x166Url x332Url }

      scoresStats { score count }
      statusesStats { status count }

      description
      descriptionHtml
      descriptionSource
    }
  }
`;

// ── Маленькие помощники ───────────────────────────────────────

// Пауза на ms миллисекунд (чтобы не долбить API без передышки)
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Рисуем прогресс-бар в одной строке (перезаписываем её через \r)
function drawProgress(fetched, page) {
  const ratio = Math.min(fetched / EST_TOTAL, 1);
  const width = 30;                       // длина бара в символах
  const filled = Math.round(ratio * width);
  const bar = "█".repeat(filled) + "░".repeat(width - filled);
  const pct = (ratio * 100).toFixed(1).padStart(5);
  // \r возвращает курсор в начало строки → следующий вывод её перезатирает
  process.stdout.write(`\r[${bar}] ${pct}%  ${fetched}/~${EST_TOTAL}  стр.${page}`);
}

// Запрос с повторами: сеть моргнула или прилетел 429/5xx — подождём и попробуем снова
async function fetchWithRetry(url, options, tries = 4) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      // 429 = "слишком часто", 5xx = сервер прилёг → ждём и пробуем ещё
      if (res.status === 429 || res.status >= 500) {
        const wait = DELAY_MS * attempt * 3;
        process.stdout.write(`\n  ↻ статус ${res.status}, жду ${wait}мс...\n`);
        await sleep(wait);
        continue;
      }
      throw new Error(`HTTP ${res.status}`); // прочие ошибки повтором не лечатся
    } catch (err) {
      if (attempt === tries) throw err;
      await sleep(DELAY_MS * attempt * 3);
    }
  }
}

// Скачиваем дамп MAL и строим карту: malId -> ссылка на постер
async function loadMalPosters() {
  console.log("Скачиваю дамп постеров MAL (один раз)...");
  const res = await fetchWithRetry(OFFLINE_DB, {});
  const dump = await res.json();

  const map = new Map();
  for (const item of dump.data) {
    // У каждого тайтла есть список ссылок-источников; ищем ссылку на MAL
    const malUrl = item.sources.find((s) => s.includes("myanimelist.net/anime/"));
    if (!malUrl) continue;
    const malId = Number(malUrl.split("/anime/")[1]); // вытаскиваем число из URL
    if (item.picture) map.set(malId, item.picture);   // picture = ссылка на MAL CDN
  }
  console.log(`Готово: ссылок на постеры — ${map.size}`);
  return map;
}

// Читаем, на какой странице остановились в прошлый раз (для возобновления)
function readStartPage() {
  if (!existsSync(PROGRESS_FILE)) return 1; // первый запуск — с начала
  const { lastPage } = JSON.parse(readFileSync(PROGRESS_FILE, "utf8"));
  return lastPage + 1; // продолжаем со следующей
}

// ── Основная работа ───────────────────────────────────────────
async function main() {
  const malPosters = await loadMalPosters();

  let page = readStartPage();
  if (page === 1) writeFileSync(OUT_FILE, ""); // чистый старт — пустой файл
  let fetched = (page - 1) * PAGE_SIZE;        // сколько уже скачано (для бара при возобновлении)
  console.log(`Начинаю со страницы ${page}\n`);

  while (page <= MAX_PAGES) {
    const res = await fetchWithRetry(SHIKIMORI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { page, limit: PAGE_SIZE },
      }),
    });

    const json = await res.json();
    const animes = json.data?.animes ?? [];

    if (animes.length === 0) {
      drawProgress(fetched, page);
      process.stdout.write("\n\nСтраницы закончились. Каталог скачан целиком.\n");
      break;
    }

    // Превращаем каждый тайтл в строку и дописываем в файл
    const lines = animes
      .map((anime) => {
        // добавляем постер MAL, если он есть для этого malId.
        // Shikimori отдаёт malId строкой ("1"), а ключи карты — числа,
        // поэтому приводим к числу перед поиском.
        const malPoster = malPosters.get(Number(anime.malId)) ?? null;
        const record = { ...anime, malPoster };
        return JSON.stringify(record); // одна запись = одна строка (NDJSON)
      })
      .join("\n");

    appendFileSync(OUT_FILE, lines + "\n");

    // Запоминаем прогресс — чтобы при обрыве продолжить, а не начинать заново
    writeFileSync(PROGRESS_FILE, JSON.stringify({ lastPage: page }));

    fetched += animes.length;
    drawProgress(fetched, page); // обновляем бар в той же строке

    page++;
    await sleep(DELAY_MS); // вежливая пауза перед следующим запросом
  }
}

main().catch((err) => {
  process.stdout.write("\n");
  console.error("Упало:", err.message);
  process.exit(1);
});
