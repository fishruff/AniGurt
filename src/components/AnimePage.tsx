
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ANIME_BY_ID } from "./apolloClient";
import Spiner from "./Spiner";

function AnimePage() {
  const { id } = useParams<{ id: string }>(); 

  // GraphQL-запрос по ID
  const { loading, error, data } = useQuery(GET_ANIME_BY_ID, {
    variables: { id: id?.toString() },
  });

  if (loading) return <Spiner/>;
  if (error) return <p>Ошибка: {error.message}</p>;

  
  

  interface Anime {
    id: number;
    descriptionHtml: string;
    description: string;
    name: string;
    russian: string;
    image: { original: string };
    score: string;
    url: string;
    poster: {originalUrl:string};
    status: string;
    episodes: number;
    airedOn:{year: number};
    genres:{ id:number, name: string, russian:string, kind:string }[]
   
  }
  const anime:Anime = data.animes[0];

console.log(anime);

let desc = anime.description; //рефакторни
const newDesc = desc == null ? desc="Описания пока нет :(" : anime.descriptionHtml;

    return ( 
        <div className="">
        <div className="p-10 flex  gap-20 text-[#f4f4f4]">
          
      <img src={anime.poster.originalUrl} alt={anime.name} className="w-64 h-128 rounded-lg" />
      <div className="p-10 pt-0">
      <p className="text-2xl font-bold">{anime.russian} / {anime.name} <a className="text-[#56a6f7] text-xs" href={anime.url} target="_blank">shikimori</a></p>            
      <p dangerouslySetInnerHTML={{__html: newDesc}} className="mt-2"></p>
      <div className="flex justify-between">

      <p className="mt-2 bg-blue-900  p-5 rounded-2xl">Оценка: {anime.score}</p>
      <p className="mt-2 bg-fuchsia-900 p-5 rounded-2xl">Эпизодов: {anime.episodes}</p>
      <p className="mt-2 bg-green-900 p-5 rounded-2xl">Статус: {anime.status}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl">Жанры:</h3>
        <ul className="flex gap-5">
          {anime.genres.map((genre: { name: string }) => (
              <li className="bg-gray-800 p-1 rounded-md" key={genre.name}>{genre.name}</li>
            ))}
        </ul>
        </div>
      </div>
      </div>
      {/* <iframe src="https://kodik.info/season/107157/bb9a12f33415497edc898a009c9efb4d/720p" width="607" height="360"  allow="autoplay *; fullscreen *"></iframe> */}
    
    </div>
     );
}

export default AnimePage;