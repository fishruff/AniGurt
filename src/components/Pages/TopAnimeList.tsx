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
    year: "",
    genre: "",
  });
  useEffect(() => {
    console.log("Выбранные фильтры:", filters);
  }, [filters]);
  

  const { loading, error, data } = useQuery(GET_TOP_ANIME);
  const { loading: filteredLoading, data: filteredData } = useQuery(GET_FILTERED_ANIME, {
    variables: { 
      season: filters.season, 
      genre: filters.genre,
      status: filters.status,
    },
    skip: !filters.season && !filters.genre && !filters.status // Запрос не выполняется, если фильтры пустые
  });
  
  console.log("Запрос с фильтрами:", { ...filters });

  useEffect(() => {
    document.title = "Аниме | AniGurt";
  }, []);

  if (error) return <p>Ошибка: {error.message}</p>;

  const animeList = filters.season || filters.year || filters.genre || filters.status
    ? filteredData?.animes || []
    : data?.animes || [];
    

  return (
    <div className="flex gap-10 p-10 mt-20">
      <ul className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {loading || filteredLoading
          ? Array.from({ length: 50 }).map((_, index) => <AnimeCardSkeleton key={index} />)
          : animeList.map((anime: Anime) => <AnimeCard key={anime.id} anime={anime} />)}
      </ul>
      
      {/* Фильтрация */}
      <AnimeFilter onFilterChange={setFilters} />
    </div>
  );
}
