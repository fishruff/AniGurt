import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ANIME_BY_ID } from "./apolloClient";
import Spiner from "./Spiner";
import Player from "./Player";


interface Anime {
  id: number;
  descriptionHtml?: string;
  description?: string;
  name: string;
  russian: string;
  image: { original: string };
  score: string;
  url: string;
  poster: { originalUrl: string };
  status: string;
  episodes: number;
  airedOn?: { year: number };
  genres: { id: number; name: string; russian: string; kind: string }[];
}

const AnimePage= () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_ANIME_BY_ID, {
    variables: { id },
  });

  if (loading) return <Spiner />;
  if (error) return <p className="text-red-500">Ошибка: {error.message}</p>;
  if (!data || !data.animes || data.animes.length === 0) return <p>Аниме не найдено</p>;

  const anime: Anime = data.animes[0];
  const newDesc = anime.descriptionHtml || "Описания пока нет :(";
  
  const urlPlayer = '//kodik.cc/find-player?shikimoriID='+anime.id+'&types=anime,anime-serial&episode=1';

  return (
    <div className="p-10 text-[#f4f4f4]">
      <div className="flex gap-20">
        <img src={anime.poster.originalUrl} alt={anime.name} className="w-64 h-128 rounded-lg" />
        <div className="p-10 pt-0">
          <p className="text-2xl font-bold">
            {anime.russian} / {anime.name}{" "}
            <a className="text-[#56a6f7] text-xs" href={anime.url} target="_blank" rel="noopener noreferrer">
              shikimori
            </a>
          </p>
          <p dangerouslySetInnerHTML={{ __html: newDesc }} className="mt-2"></p>
          <div className="flex justify-between">
            <p className="mt-2 bg-blue-900 p-5 rounded-2xl">Оценка: {anime.score}</p>
            <p className="mt-2 bg-fuchsia-900 p-5 rounded-2xl">Эпизодов: {anime.episodes}</p>
            <p className="mt-2 bg-green-900 p-5 rounded-2xl">Статус: {anime.status}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-xl">Жанры:</h3>
            <ul className="flex gap-5">
              {anime.genres.map((genre) => (
                <li key={genre.id} className="bg-gray-800 p-1 rounded-md">
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="">
        <Player urlPlayer={urlPlayer}/>
      </div>
    </div>
  );
};

export default AnimePage;
