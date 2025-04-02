import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ANIME_BY_ID } from "../apolloClient";
import Spiner from "../Spiner";
import Player from "../Player";
import { useEffect } from "react";
import RelatedAnimeList from "../RelatedAnimeList";
import { Anime } from "../../types/Anime";
import {
  translateKind,
  translateRating,
  translateStatus,
} from "../utils/translateInfo";
import SimilarAnime from "../SimilarAnime";

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
  if (!anime) return <p>Аниме не найдено</p>;

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
        <div className="flex flex-col lg:flex-row">
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
                <p className="">{animeRating}</p>
                <p className="">{anime.airedOn?.year}</p>
                <p className="">{animeKind}</p>
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
              <div className="mt-4">
                <h3 className="text-xl">Жанры:</h3>
                <ul className="flex flex-col lg:flex-row gap-5">
                  {anime.genres.map((genre) => (
                    <li key={genre.id} className="bg-gray-800 p-1 rounded-md">
                      {genre.russian}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="">
            <h1>Оценки пользователей:</h1>
            <div className="flex flex-col ">
              {anime.scoresStats.slice(0, 5).map((score) => {
                const percentage = (score.count / maxScoreStat.count) * 100;
                return (
                  <div className="flex text-center items-baseline gap-2 justify-between">
                    <div
                      key={score.score}
                      className=" p-1 bg-blue-500 rounded transition-all my-1"
                      style={{ width: `${percentage}%` }} // ширина зависит от значения
                    >
                      {score.count}
                    </div>
                    {score.score}
                  </div>
                );
              })}
            </div>

            <h1 className="mt-10">В списках у пользователей:</h1>
            <div className="flex flex-col ">
              {anime.statusesStats.slice(0, 5).map((score) => {
                const percentage = (score.count / maxStatusStat.count) * 100;
                return (
                  <div className="flex text-center items-baseline gap-2 justify-between">
                    <div
                      key={score.status}
                      className=" p-1 bg-blue-500 rounded transition-all my-1"
                      style={{ width: `${percentage}%` }} // ширина зависит от значения
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
        <div className="">
          <RelatedAnimeList animeId={anime.id} />
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
      </div>
    </div>
  );
};

export default AnimePage;
