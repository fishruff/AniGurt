import { useQuery } from "@apollo/client";
import { GET_TOP_ANIME, GET_FILTERED_ANIME } from "../apolloClient";
import { useEffect, useState, useRef, useCallback } from "react";
import AnimeCard from "../AnimeCard";
import { Anime } from "../../types/Anime";
import AnimeFilter from "../AnimeFilter";
import Spiner from "../Spiner";
import { useNavigate, useLocation } from "react-router-dom";

// Тип фильтров для безопасности и автодополнения
type Filters = {
  season?: string;
  genre?: string;
  status?: string;
  kind?: string;
};

function useAnimeQuery(filters: Filters, page: number) {
  const hasFilters =
    filters.season || filters.genre || filters.status || filters.kind;
  return useQuery(hasFilters ? GET_FILTERED_ANIME : GET_TOP_ANIME, {
    variables: {
      page,
      season: filters.season || undefined,
      genre: filters.genre || undefined,
      status: filters.status || undefined,
      kind: filters.kind || undefined,
    },
  });
}

export default function TopAnimeList() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [filters, setFilters] = useState<Filters>({
    season: searchParams.get("season") || undefined,
    genre: searchParams.get("genre") || undefined,
    status: searchParams.get("status") || undefined,
    kind: searchParams.get("kind") || undefined,
  });

  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  const { loading, error, data } = useAnimeQuery(filters, page);

  useEffect(() => {
    document.title = "Аниме | AniGurt";
  }, []);

  // Сброс страницы и списка при изменении фильтров
  useEffect(() => {
    setAnimeList([]);
    setPage(1);
  }, [filters]);

  // Обновление списка аниме при получении новых данных
  useEffect(() => {
    if (!data?.animes) return;
    setAnimeList((prev) =>
      page === 1 ? data.animes : [...prev, ...data.animes],
    );
  }, [data, page]);

  // Обновление URL при изменении фильтров
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.season) params.set("season", filters.season);
    if (filters.genre) params.set("genre", filters.genre);
    if (filters.status) params.set("status", filters.status);
    if (filters.kind) params.set("kind", filters.kind);
    navigate(`/animes?${params.toString()}`, { replace: true });
  }, [filters, navigate]);

  const lastAnimeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prev) => prev + 1);
          }
        },
        {
          rootMargin: "200px",
          threshold: 0.1,
        },
      );

      if (node) observer.current.observe(node);
    },
    [loading],
  );

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  if (error) return <p className="text-red-500">Ошибка: {error.message}</p>;

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-20 p-10 mt-20">
      <aside className="w-full lg:w-[250px] shrink-0 self-start">
        <AnimeFilter
          onFilterChange={handleFilterChange}
          initialValues={filters}
        />
      </aside>

      <main className="flex-1">
        <ul className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {animeList.map((anime, index) => (
            <div
              key={anime.id}
              ref={index === animeList.length - 1 ? lastAnimeRef : null}
            >
              <AnimeCard anime={anime} />
            </div>
          ))}
        </ul>

        {loading && (
          <div className="flex justify-center items-center mt-10">
            <Spiner fullscreen={false} />
          </div>
        )}
      </main>
    </div>
  );
}
