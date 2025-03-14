"use client";

import { useQuery } from "@apollo/client";
import { GET_TOP_ANIME, GET_FILTERED_ANIME } from "../apolloClient";
import { useEffect, useState } from "react";
import AnimeCard from "../AnimeCard";
import { Anime } from "../../types/Anime";
import AnimeFilter from "../AnimeFilter";
import Spiner from "../Spiner";

export default function TopAnimeList() {
  const [filters, setFilters] = useState<Record<string, string>>({
    season: "",
    genre: "",
    status: "",
  });

  const [animeList, setAnimeList] = useState<Anime[]>([]); // Состояние для хранения текущего списка аниме
  const [isLoading, setIsLoading] = useState(false); // Состояние для отслеживания загрузки

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

  // Обновление списка аниме после завершения загрузки
  useEffect(() => {
    if (topLoading || filteredLoading) {
      setIsLoading(true); // Показываем спиннер, если идет загрузка
    } else {
      const newAnimeList =
        filters.season || filters.genre || filters.status
          ? filteredData?.animes || []
          : topData?.animes || [];
      setAnimeList(newAnimeList); // Обновляем данные
      setIsLoading(false); // Скрываем спиннер
    }
  }, [topLoading, filteredLoading, topData, filteredData, filters]);

  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-20 p-10 mt-20">
      {/* Фильтрация */}
      <AnimeFilter onFilterChange={setFilters} />

      {/* Спиннер или список аниме */}
      {isLoading ? (
        <div className="flex justify-center items-start w-full ">
          <Spiner />
        </div>
      ) : (
        <ul className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {animeList.map((anime: Anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </ul>
      )}
    </div>
  );
}
