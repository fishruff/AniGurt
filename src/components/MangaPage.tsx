"use client";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MANGA_BY_ID } from "./apolloClient";
import Spiner from "./Spiner";

interface Manga {
  id: number;
  name: string;
  russian: string;
  licenseNameRu: string;
  score: string;
  descriptionHtml: string;
  description: string;
  url: string;
  poster: { originalUrl: string };
  status: string;
  kind: string;
  airedOn: { year: number };
  releasedOn: { year: number };
  volumes: number;
  chapters: number;
  genres: { id: number; name: string; russian: string; kind: string }[];
}

function MangaPage() {
  const { id } = useParams();

  const { loading, error, data } = useQuery<{ mangas: Manga[] }>(
    GET_MANGA_BY_ID,
    {
      variables: { id },
    }
  );

  if (loading) return <Spiner />;
  if (error) return <p>Ошибка: {error.message}</p>;

  if (!data || !data.mangas || data.mangas.length === 0) {
    return <p>Данные не найдены.</p>;
  }

  const manga = data.mangas[0];

  const newDesc = manga.descriptionHtml || "Описания пока нет :(";

  return (
    <div className="p-10 flex gap-20 text-[#f4f4f4]">
      <img
        src={manga.poster.originalUrl}
        alt={manga.name}
        className="w-64 h-128 rounded-lg"
      />
      <div className="p-10 pt-0">
        <p className="text-2xl font-bold">
          {manga.russian} / {manga.name}{" "}
          <a
            className="text-[#56a6f7] text-xs"
            href={manga.url}
            target="_blank"
          >
            shikimori
          </a>
        </p>
        <p dangerouslySetInnerHTML={{ __html: newDesc }} className="mt-2"></p>
        <div className="flex justify-between">
          <p className="mt-2 bg-blue-900 p-5 rounded-2xl">
            Оценка: {manga.score}
          </p>
          <p className="mt-2 bg-green-900 p-5 rounded-2xl">
            Статус: {manga.status}
          </p>
        </div>
        <div className="mt-4">
          <h3 className="text-xl">Жанры:</h3>
          <ul className="flex gap-5">
            {manga.genres.map((genre) => (
              <li className="bg-gray-800 p-1 rounded-md" key={genre.id}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MangaPage;
