import { Link } from "react-router-dom";
import { Anime } from "../types/Anime";
import { translateStatus, translateKind } from "./utils/translateInfo";
function AnimeCard({ anime }: { anime: Anime }) {
  const animeKind = translateKind(anime.kind);
  const statusRu = translateStatus(anime.status);

  const getScoreColor = (score: string) => {
    const value = parseFloat(score);
    if (value >= 7.5) return "bg-gradient-to-r from-emerald-600 to-green-700"; // Отлично
    if (value >= 6.5) return "bg-gradient-to-r from-lime-600 to-lime-700"; // Очень хорошо
    if (value >= 5.5) return "bg-gradient-to-r from-yellow-600 to-yellow-700"; // Хорошо
    if (value >= 4.5) return "bg-gradient-to-r from-amber-600 to-orange-700"; // Средне
    if (value >= 3.5) return "bg-gradient-to-r from-orange-700 to-orange-800"; // Ниже среднего
    if (value >= 2.5) return "bg-gradient-to-r from-red-600 to-red-700"; // Плохо
    return "bg-gradient-to-r from-red-800 to-red-900"; // Ужасно
  };

  const scoreBg = anime.score ? getScoreColor(anime.score) : "bg-gray-400";
  return (
    <div className="">
      <li
        key={anime.id}
        className="rounded-lg overflow-hidden duration-300  text-amber-50 hover:scale-102 hover:shadow-md hover:shadow-[#404349] hover:text-[#e82c4c] transition ease-in-out"
      >
        <Link to={`/anime/${anime.id}`} className="block">
          {/* Изображение */}
          <div className="relative">
            <img
              className="w-full h-80 object-cover"
              src={anime.poster?.originalUrl ?? "/bg.jpg"}
              alt={anime.name}
              loading="lazy"
            />
            <div className="*:text-white *:rounded-full *:text-sm *:font-semibold *:text-center *:absolute *:px-3 *:py-1">
              {/* Оценка */}
              <p className={`${scoreBg} top-2 left-2`}>{anime.score}</p>
              {/* Статус */}
              <p className="bg-gradient-to-r from-cyan-700 to-blue-700 top-2 right-2 ">
                {statusRu}
              </p>
              {/* Эпизоды */}
              {/* <p className="bg-blue-800  bottom-2 right-2 ">
                  {anime.episodesAired} / {anime.episodes}
                </p> */}
            </div>
          </div>

          {/* Название */}
          <p className="text-xl font-semibold truncate px-4 pt-3">
            {anime.russian || anime.name}
          </p>

          {/* Дополнительная информация */}
          <div className="flex justify-between items-center px-4 pb-4 mt-2 *:text-sm *:text-gray-400">
            <p className="">{animeKind}</p>
            <p className="">{anime.airedOn?.year}</p>
          </div>
        </Link>
      </li>
    </div>
  );
}

export default AnimeCard;
