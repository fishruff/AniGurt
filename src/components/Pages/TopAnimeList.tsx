"use client";

import { useQuery } from "@apollo/client";
import { GET_TOP_ANIME } from "../apolloClient";
// import { Link } from "react-router-dom";
import Spiner from "../Spiner";
import { useEffect } from "react";
import AnimeCard from "../AnimeCard";
import { Anime } from "../../types/Anime";



export default function TopAnime() {
  const { loading, error, data } = useQuery(GET_TOP_ANIME);
  useEffect(() => {
    document.title = "Аниме | AniGurt";
  });

  if (loading) return <Spiner />;
  if (error) return <p>Ошибка: {error.message}</p>;

  console.log(data);

  return (
    <ul className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-10 mt-20">
      {data.animes.map((anime: Anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </ul>
  );
}
