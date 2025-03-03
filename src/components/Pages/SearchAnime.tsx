"use client";

import { useLazyQuery } from "@apollo/client";
import { GET_ANIME_SEARCH } from "../apolloClient";
import Spiner from "../Spiner";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function SearchAnime() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAnime, { data, loading, error }] =
    useLazyQuery(GET_ANIME_SEARCH);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      searchAnime({ variables: { query: searchTerm } });
    }
  };
    useEffect(() => {
      document.title = "Поиск Аниме | AniGurt";
    });

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

  console.log(data, searchTerm);
  return (
    <div className="flex flex-col">
      <div className="flex mt-20 justify-center">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" outline-0 border-1 rounded-2xl rounded-br-none rounded-tr-none   border-blue-800 p-5  text-amber-50 border-r-0 placeholder-amber-50"
          type="text"
          placeholder="Поиск Аниме..."
        />
        <button
          className="border-1 rounded-tl-none rounded-bl-none rounded-2xl  border-blue-800 p-5 cursor-pointer outline-0 text-amber-50 pl-5 "
          onClick={handleSearch}
        >
          поиск
        </button>
      </div>
      <ul className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-10 ">
      {data?.animes?.map((anime: Anime) => (
        <li
          key={anime.id}
          className="rounded-lg overflow-hidden duration-300  text-amber-50 hover:scale-102 hover:shadow-md hover:shadow-[#404349] hover:text-[#e82c4c] transition ease-in-out"
        >
          <Link to={`/anime/${anime.id}`} className="block">
            {/* Изображение */}
            <div className="relative">
              <img
                className="w-full h-80 object-cover"
                src={anime.poster.originalUrl}
                alt={anime.name}
                loading="lazy"
              />
              <div className="*:text-white *:rounded-full *:text-sm *:font-semibold *:text-center *:absolute *:px-3 *:py-1">
                {/* Оценка */}
                <p className="bg-green-800 top-2 left-2 ">{anime.score}</p>
                {/* Статус */}
                <p className="bg-gray-700 top-2 right-2 ">{anime.status}</p>
                {/* Эпизоды */}
                <p className="bg-blue-800  bottom-2 right-2 ">
                  {anime.episodesAired} / {anime.episodes}
                </p>
              </div>
            </div>

            {/* Название */}
            <p className="text-xl font-semibold truncate px-4 pt-3">
              {anime.russian || anime.name}
            </p>

            {/* Дополнительная информация */}
            <div className="flex justify-between items-center px-4 pb-4 mt-2 *:text-sm *:text-gray-400">
              <p className="">{anime.kind}</p>
              <p className="">{anime.airedOn.year}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default SearchAnime;
