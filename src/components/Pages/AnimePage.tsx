import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ANIME_BY_ID } from "../apolloClient";
import Spiner from "../Spiner";
import Player from "../Player";
import { useEffect } from "react";
import RelatedAnimeList from "../RelatedAnimeList";
import { Anime } from "../../types/Anime";

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
  let animeKind;
  if (anime.kind == "tv") animeKind = "Сериал";
  if (anime.kind == "tv_special") animeKind = "Тв-спешл";
  if (anime.kind == "ova") animeKind = "OVA";
  if (anime.kind == "ona") animeKind = "ONA";
  if (anime.kind == "music") animeKind = "Клип";
  if (anime.kind == "movie") animeKind = "Фильм";
  if (anime.kind == "special") animeKind = "Спешл";
  if (anime.kind == "cm") animeKind = "Реклама";
  if (anime.kind == "pv") animeKind = "Промо ролик";

  let animeRating;
  if (anime.rating == "rx") animeRating = "Хентай";
  if (anime.rating == "g") animeRating = "0+";
  if (anime.rating == "pg") animeRating = "13+";
  if (anime.rating == "pg_13") animeRating = "13+";
  if (anime.rating == "r") animeRating = "17+";
  if (anime.rating == "r_plus") animeRating = "17+";
  return (
    <div className="p-10   text-[#f4f4f4] relative w-full min-h-screen flex justify-center items-center">
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
                <p>{anime.status}</p>
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
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <RelatedAnimeList animeId={anime.id} />
        </div>
        <div className="">
          <Player urlPlayer={urlPlayer} />
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
