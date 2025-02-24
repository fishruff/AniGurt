"use client";

import { useQuery } from "@apollo/client";
import { GET_TOP_MANGA } from "./apolloClient";
import { Link } from "react-router-dom";
import Spiner from "./Spiner";

export default function Manga() {
  const { loading, error, data } = useQuery(GET_TOP_MANGA);

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
  console.log(data);
  console.log("Manga data:", data);

  return (
    <ul className="grid grid-flow-row grid-cols-5 gap-s4 p-10 ">
      {data.mangas.map((manga: Manga) => (
        <li
          key={manga.id}
          className="rounded-md text-amber-50 w-50 relative mb-5"
        >
          <Link to={`/manga/${manga.id}`}>
            <img
              className="w-60 h-80 rounded-4xl"
              src={manga.poster.originalUrl}
              alt={manga.name}
            />
            <p className="text-2xl truncate max-w-full">
              {" "}
              {manga.russian || manga.name}
            </p>
            <p className="bg-green-800 rounded-xl text-center absolute top-2 left-2 p-1">
              {manga.score}
            </p>
            <p className="absolute top-2 right-2 bg-gray-800 rounded-xl text-center p-1">
              {manga.status}
            </p>
            <div className="flex justify-between">
              <p>{manga.kind}</p>
              <p>{manga.airedOn.year}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
