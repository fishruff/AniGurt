"use client";

import { useLazyQuery } from "@apollo/client";
import { GET_ANIME_SEARCH } from "../apolloClient";
import Spiner from "../Spiner";
import { useState, useEffect, useCallback } from "react";
import { Anime } from "../../types/Anime";
import AnimeList from "../AnimeList";

function SearchAnime() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAnime, { data, loading, error }] =
    useLazyQuery(GET_ANIME_SEARCH);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Загрузка последних поисков из localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentAnimeSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    document.title = "Поиск Аниме | AniGurt";
  }, []);

  // Сохранение поисковых запросов
  const saveSearchTerm = useCallback((term: string) => {
    if (term.trim() === "") return;

    setRecentSearches((prev) => {
      const updated = [term, ...prev.filter((t) => t !== term)].slice(0, 5);
      localStorage.setItem("recentAnimeSearches", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleSearch = useCallback(() => {
    if (searchTerm.trim() !== "") {
      saveSearchTerm(searchTerm);
      searchAnime({ variables: { query: searchTerm } });
    }
  }, [searchTerm, searchAnime, saveSearchTerm]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch],
  );

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Поисковая строка */}
      <div className="sticky top-20 z-10 bg-[#171717] py-4 px-4 shadow-md">
        <div className="max-w-3xl mx-auto flex items-center relative">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full bg-[#2f2f2f] rounded-lg py-3 px-5 pr-10 text-amber-50
                      focus:outline-none focus:ring-2 focus:ring-[#e82c4c] transition-all"
            type="text"
            placeholder="Поиск аниме..."
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-24 text-2xl text-white hover:text-[#d6253f] transition-colors"
            >
              ×
            </button>
          )}

          <button
            onClick={handleSearch}
            className="ml-2 bg-[#e82c4c] hover:bg-[#d6253f] text-white rounded-lg
                      p-3 flex items-center justify-center transition-colors"
          >
            Поиск
          </button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-grow p-4 mt-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spiner />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">
            Ошибка: {error.message}
          </div>
        ) : data?.animes?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AnimeList animeList={data.animes} />
          </div>
        ) : searchTerm && !loading ? (
          <div className="text-center text-gray-400 p-8">
            Ничего не найдено по запросу "{searchTerm}"
          </div>
        ) : (
          <div className="max-w-3xl mx-auto mt-8">
            <h3 className="text-amber-50 text-lg mb-4">Недавние поиски:</h3>
            {recentSearches.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchTerm(term);
                      searchAnime({ variables: { query: term } });
                    }}
                    className="bg-[#2f2f2f] hover:bg-[#3f3f3f] text-amber-50
                              rounded-full px-4 py-2 text-sm transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">
                Здесь будут отображаться ваши последние поиски
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchAnime;
