"use client";

import { useLazyQuery } from "@apollo/client";
import { GET_ANIME_SEARCH } from "../apolloClient";
import Spiner from "../Spiner";
import { useState } from "react";
import { Link } from "react-router-dom";

function SearchAnime() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAnime, { data, loading, error }] =
    useLazyQuery(GET_ANIME_SEARCH);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      searchAnime({ variables: { query: searchTerm } });
    }
  };

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
      <ul className="grid grid-flow-row grid-cols-5 gap-s4 p-10 ">
        {data?.animes?.map((anime: Anime) => (
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
    </div>
  );
}

export default SearchAnime;
