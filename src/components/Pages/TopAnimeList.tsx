"use client";

import { useQuery } from "@apollo/client";
import { GET_TOP_ANIME, GET_FILTERED_ANIME } from "../apolloClient";
import { useEffect, useState, useRef, useCallback } from "react";
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

  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    document.title = "Аниме | AniGurt";
  }, []);

  const { loading, error, data } = useQuery(
    filters.season || filters.genre || filters.status
      ? GET_FILTERED_ANIME
      : GET_TOP_ANIME,
    {
      variables: {
        page,
        season: filters.season || undefined,
        genre: filters.genre || undefined,
        status: filters.status || undefined,
      },
    },
  );

  useEffect(() => {
    if (data?.animes) {
      setAnimeList((prev) => [...prev, ...data.animes]);
    }
  }, [data]);

  useEffect(() => {
    setAnimeList([]);
    setPage(1);
  }, [filters]);

  const lastAnimeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading],
  );

  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-20 p-10 mt-20">
      <AnimeFilter onFilterChange={setFilters} />

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

      {loading && page === 1 && (
        <div className="flex justify-center items-start w-full">
          <Spiner />
        </div>
      )}
    </div>
  );
}
