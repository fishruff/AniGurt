"use client";

import { useQuery } from "@apollo/client";
import { GET_TOP_ANIME } from "../apolloClient";
import { Link } from "react-router-dom";
import Spiner from "../Spiner";

export default function TopAnime() {
  const { loading, error, data } = useQuery(GET_TOP_ANIME);

  if (loading) return <Spiner />;
  if (error) return <p>Ошибка: {error.message}</p>;
  interface Anime {
    id: number;
    name: string;
    russian: string;
    image: { original: string };
    score: string;
    url: string;
    poster: { originalUrl: string };
    status: string;
    episodes: number;
    episodesAired: number;
    kind: string;
    airedOn: { year: number };
  }
  console.log(data);

  return (
    <ul className="grid grid-flow-row grid-cols-5 gap-s4 p-10 ">
      {data.animes.map((anime: Anime) => (
        <li
          key={anime.id}
          className="rounded-md text-amber-50 w-50 relative mb-5"
        >
          <Link to={`/anime/${anime.id}`}>
            <img
              className="w-60 h-80 rounded-4xl"
              src={anime.poster.originalUrl}
              alt={anime.name}
            />
            <p className="text-2xl truncate max-w-full">
              {" "}
              {anime.russian || anime.name}
            </p>
            <p className="bg-green-800 rounded-xl text-center absolute top-2 left-2 p-1">
              {anime.score}
            </p>
            <p className="absolute top-2 right-2 bg-gray-800 rounded-xl text-center p-1">
              {anime.status}
            </p>
            <p className="bg-blue-800 rounded-xl text-center absolute bottom-16 right-2 p-1">
              {anime.episodesAired} / {anime.episodes}
            </p>
            <div className="flex justify-between">
              <p>{anime.kind}</p>
              <p>{anime.airedOn.year}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
