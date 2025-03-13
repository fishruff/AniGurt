"use client";

import { useQuery } from "@apollo/client";
import { GET_TOP_ANIME, GET_FILTERED_ANIME } from "../apolloClient";
import { useEffect, useState } from "react";
import AnimeCard from "../AnimeCard";
import { Anime } from "../../types/Anime";
import AnimeCardSkeleton from "../AnimeSkeletonCard";
import AnimeFilter from "../AnimeFilter";

export default function TopAnimeList() {
  const [filters, setFilters] = useState<Record<string, string>>({
    season: "",
    genre: "",
    status: "",
  });

  useEffect(() => {
    document.title = "Аниме | AniGurt";
  }, []);

  // Запрос всех топовых аниме (без фильтров)
  const { loading: topLoading, error, data: topData } = useQuery(GET_TOP_ANIME);

  // Запрос отфильтрованных аниме
  const { loading: filteredLoading, data: filteredData } = useQuery(
    GET_FILTERED_ANIME,
    {
      variables: {
        season: filters.season || undefined,
        genre: filters.genre || undefined,
        status: filters.status || undefined,
      },
      skip: !filters.season && !filters.genre && !filters.status, // Запрос не выполняется, если фильтры пустые
    },
  );

  if (error) return <p>Ошибка: {error.message}</p>;

  const animeList =
    filters.season || filters.genre || filters.status
      ? filteredData?.animes || []
      : topData?.animes || [];

  return (
    <div className="flex flex-row-reverse gap-20 p-10 mt-20">
      {/* Фильтрация */}
      <AnimeFilter onFilterChange={setFilters} />
      <ul className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {topLoading || filteredLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <AnimeCardSkeleton key={index} />
            ))
          : animeList.map((anime: Anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
      </ul>
    </div>
  );
}
