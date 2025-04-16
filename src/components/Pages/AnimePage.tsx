import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ANIME_BY_ID } from "../apolloClient";
import Spiner from "../Spiner";
import Player from "../Player";
import { useEffect } from "react";
// import RelatedAnimeList from "../RelatedAnimeList";
import { Anime } from "../../types/Anime";
import {
  translateKind,
  translateRating,
  translateStatus,
} from "../utils/translateInfo";
import SimilarAnime from "../SimilarAnime";
import AnimeFranchise from "../AnimeFranchise";

const AnimePage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_ANIME_BY_ID, {
    variables: { id },
  });

  const anime: Anime | undefined = data?.animes?.[0];

  useEffect(() => {
    if (anime) {
      document.title = anime.russian || "Аниме | AniGurt";
    } else {
      document.title = "Аниме | AniGurt";
    }
  }, [anime]);

  if (loading) return <Spiner />;
  if (error) return <p className="text-red-500">Ошибка: {error.message}</p>;
  if (!anime)
    return (
      <div className="text-2xl text-amber-50 absolute top-[50%] inset-x-0 mx-auto text-center">
        <p className="text-xl text-white ">Аниме не найдено :( </p>
        <a href="/" className="text-blue-500">
          вернуться на главную
        </a>
      </div>
    );

  const newDesc =
    anime.description !== null ? anime.descriptionHtml : "Описания пока нет :(";
  const urlPlayer =
    "//kodik.cc/find-player?shikimoriID=" +
    anime.id +
    "&types=anime,anime-serial&episode=1";

  const animeKind = translateKind(anime.kind);
  const animeRating = translateRating(anime.rating);
  const statusRu = translateStatus(anime.status);

  const maxScoreStat = anime.scoresStats.reduce((acc, curr) =>
    acc.count > curr.count ? acc : curr,
  );
  const maxStatusStat = anime.statusesStats.reduce((acc, curr) =>
    acc.count > curr.count ? acc : curr,
  );

  return (
    <div className="p-10  text-[#f4f4f4] relative w-full min-h-screen flex justify-center items-center">
      <div
        className="absolute  inset-0 w-full h-[50%] bg-cover bg-center blur-xl"
        style={{ backgroundImage: `url(${anime.poster.originalUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="flex flex-col lg:mt-20 relative w-9/10 inset-0 justify-between mx-auto gap-20 z-10">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col lg:flex-row">
            {/* POSTER */}
            <img
              src={anime.poster.originalUrl}
              alt={anime.name}
              className=" w-90 h-120 rounded-lg inset-0 mx-auto lg:mx-0"
            />

            <div className="lg:p-10 lg:pt-0">
              <div className="mt-10 lg:mt-0">
                <p className="text-2xl text-white font-bold">{anime.russian}</p>
                <p className="text-amber-50 gap-5 flex items-center">
                  {anime.name}
                  <a
                    className="text-[#56a6f7] text-xs"
                    href={anime.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    shikimori
                  </a>
                </p>

                <div className="flex gap-10 mt-5 *:text-[#7e8597] *:p-1.5 *:border-1 *:border-amber-[#7e8597] *:rounded-2xl">
                  <p>{animeRating}</p>
                  <p>{anime.airedOn?.year}</p>
                  <p>{animeKind}</p>
                </div>

                <p className=" text-2xl mt-5">Информация</p>
                <div className="grid grid-cols-2 gap-2 *:mt-2">
                  <p className="">Оценка: </p>
                  <p>{anime.score}</p>
                  <p className="">Эпизодов: </p>
                  <p>{anime.episodes}</p>
                  <p className="">Статус: </p>
                  <p>{statusRu}</p>
                </div>
                <p className=" text-2xl mt-2 mb-2">Описание</p>
                <p
                  dangerouslySetInnerHTML={{ __html: newDesc || "" }}
                  className="mt-2"
                ></p>
                <div className="mt-4 flex overflow-hidden">
                  <h3 className="text-xl">Жанры:</h3>
                  <ul className="flex flex-col lg:flex-row gap-5">
                    {anime.genres.map((genre) => (
                      <li
                        key={genre.id}
                        className="bg-gray-800 p-2 rounded-md "
                      >
                        {genre.russian}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <details className="group">
                    <summary className="flex items-center gap-2 cursor-pointer list-none">
                      <h3 className="text-xl">Озвучка:</h3>
                      <div className="flex flex-wrap gap-2">
                        {/* Показываем первые 3 озвучки как чипсы */}
                        {anime.fandubbers.slice(0, 3).map((dub, index) => (
                          <span
                            key={index}
                            className="bg-gray-800 px-3 py-1 rounded-md text-sm"
                          >
                            {dub}
                          </span>
                        ))}
                        {/* Кнопка "+N" (если есть скрытые варианты) */}
                        {anime.fandubbers.length > 3 && (
                          <span className="bg-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-600">
                            +{anime.fandubbers.length - 3}
                          </span>
                        )}
                      </div>
                    </summary>
                    {/* Полный список в выпадающем меню */}
                    <ul className="mt-2 pl-6 space-y-2 max-h-60 overflow-y-auto">
                      {anime.fandubbers.map((dub, index) => (
                        <li
                          key={index}
                          className="bg-gray-800 p-2 rounded-md hover:bg-gray-700"
                        >
                          {dub}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="">
            <h1 className="bg-gray-800 p-2 rounded-md mt-10 lg:mt-0">
              Оценки пользователей:
            </h1>
            <div className="flex flex-col ">
              {anime.scoresStats.slice(0, 5).map((score) => {
                const percentage = (score.count / maxScoreStat.count) * 100;
                return (
                  <div className="flex text-center items-baseline gap-2 justify-between">
                    <div
                      key={score.score}
                      className=" p-1 bg-blue-500 rounded transition-all my-1"
                      style={{ width: `${percentage}%` }}
                    >
                      {score.count}
                    </div>
                    {score.score}
                  </div>
                );
              })}
            </div>

            <h1 className="mt-10 bg-gray-800 p-2 rounded-md w-60">
              В списках у пользователей:
            </h1>
            <div className="flex flex-col ">
              {anime.statusesStats.slice(0, 5).map((score) => {
                const percentage = (score.count / maxStatusStat.count) * 100;
                return (
                  <div className="flex text-center items-baseline gap-2 justify-between">
                    <div
                      key={score.status}
                      className=" p-1 bg-blue-500 rounded transition-all my-1"
                      style={{ width: `${percentage}%` }}
                    >
                      {score.count}
                    </div>
                    {score.status}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <div className="">
          <RelatedAnimeList animeId={anime.id} />
        </div> */}
        <div className="">
          <AnimeFranchise animeId={anime.id} />
        </div>
        <div className="">
          <h1 className="font-bold text-xl">
            Смотреть ~
            <span className="italic">{anime.russian || anime.name}</span>~
            онлайн
          </h1>
          <Player urlPlayer={urlPlayer} />
        </div>
        <div className="">
          <SimilarAnime animeId={anime.id} />
        </div>
        {/* music */}
        <div className="mt-10 border-t-2 border-gray-500">
          <h1 className="mt-10 text-2xl">Музыка из опенинга и эндинга</h1>
          {anime.videos && anime.videos.length > 0 ? (
            <div className="ml-5">
              {anime.videos.map((video) => {
                if (video.kind === "op" || video.kind === "ed") {
                  return (
                    <a
                      key={video.url} // Добавлен key для React
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer" // Добавлено для безопасности
                      className="flex gap-5 mt-3 items-center p-1 duration-300 ease-in-out hover:text-[#56a6f7]"
                    >
                      <div className="flex gap-1 bg-gray-950 rounded-md items-center p-1">
                        <svg
                          className="h-4"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12.4999V4.73683C6 4.41581 6 4.25529 6.0584 4.12511C6.10988 4.01035 6.19278 3.9125 6.29751 3.84285C6.41632 3.76384 6.57465 3.73745 6.89131 3.68468L12.758 2.7069C13.1853 2.63568 13.3989 2.60007 13.5655 2.66192C13.7116 2.71619 13.8341 2.81995 13.9116 2.95516C14 3.10924 14 3.32584 14 3.75905V11.1666M6 12.4999C6 13.6045 5.10457 14.4999 4 14.4999C2.89543 14.4999 2 13.6045 2 12.4999C2 11.3953 2.89543 10.4999 4 10.4999C5.10457 10.4999 6 11.3953 6 12.4999ZM14 11.1666C14 12.2711 13.1046 13.1666 12 13.1666C10.8954 13.1666 10 12.2711 10 11.1666C10 10.062 10.8954 9.16656 12 9.16656C13.1046 9.16656 14 10.062 14 11.1666Z"
                            stroke="white"
                            strokeWidth="2" // Исправлено на camelCase
                            strokeLinecap="round" // Исправлено на camelCase
                            strokeLinejoin="round" // Исправлено на camelCase
                          ></path>
                        </svg>
                        <p className="capitalize">{video.kind}</p>{" "}
                        {/* Добавлен capitalize */}
                      </div>
                      <p>{video.name}</p>
                    </a>
                  );
                }
                return null; // Явный возврат null для других типов видео
              })}
            </div>
          ) : (
            <p className="mt-3 ml-5 text-gray-400">
              Нет информации о музыкальных темах
            </p> // Улучшенное сообщение
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
