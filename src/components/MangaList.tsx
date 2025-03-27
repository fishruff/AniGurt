"use client";

import { useQuery } from "@apollo/client";
import { GET_TOP_MANGA } from "./apolloClient";
import { Link } from "react-router-dom";
import Spiner from "./Spiner";
import { useEffect } from "react";

export default function Manga() {
  const { loading, error, data } = useQuery(GET_TOP_MANGA);

  useEffect(() => {
    document.title = "Манга | AniGurt";
  });

  if (loading) return <Spiner />;
  if (error) return <p>Ошибка: {error.message}</p>;
  interface Manga {
    id: number;
    name: string;
    russian: string;
    licenseNameRu: string;
    score: string;
    url: string;
    poster: { originalUrl: string };
    status: string;
    kind: string;
    airedOn: { year: number };
    releasedOn: { year: number };
    volumes: number;
    chapters: number;
  }

  return (
    <ul className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-10 ">
      {data.mangas.map((manga: Manga) => (
        <li
          key={manga.id}
          className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-800 text-amber-50"
        >
          <Link to={`/manga/${manga.id}`} className="block">
            <div className="relative">
              <img
                className="w-full h-80 object-cover"
                src={manga.poster.originalUrl}
                alt={manga.name}
                loading="lazy"
              />

              <p className="bg-green-800 rounded-full text-sm font-semibold text-center absolute top-2 left-2 px-3 py-1">
                {manga.score}
              </p>
              <p className="bg-gray-800 rounded-full text-sm font-semibold text-center absolute top-2 right-2 px-3  py-1">
                {manga.status}
              </p>

              <p className="ttext-xl font-semibold truncate px-4 pt-3">
                {" "}
                {manga.russian || manga.name}
              </p>

              <div className="flex justify-between items-center px-4 pb-4 mt-2">
                <p className="text-sm text-gray-400">{manga.kind}</p>
                <p className="text-sm text-gray-400">{manga.airedOn.year}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
