import { useQuery } from "@apollo/client";
import {
  GET_NEW_RANKED_ANIME,
  GET_EX_SEASON_ANIME,
  GET_ADMIN_ANIME,
  GET_EXEX_SEASON_ANIME,
  GET_MOVIE_ANIME,
} from "../apolloClient";
import { translateRating, translateStatus } from "../utils/translateInfo";
import Spiner from "../Spiner";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useEffect } from "react";
import { Anime } from "../../types/Anime";
import AnimeList from "../AnimeList";

function Home() {
  function getSeason(): string {
    const date = new Date();
    const month = date.getMonth() + 1; // getMonth() возвращает 0-11, поэтому добавляем 1
    let year = date.getFullYear();

    let season: string;

    if (month >= 4 && month <= 6) {
      season = "spring";
    } else if (month >= 7 && month <= 9) {
      season = "summer";
    } else if (month >= 10 && month <= 12) {
      season = "fall";
    } else {
      season = "winter";
      if (month === 12) {
        year += 1;
      }
    }

    return `${season}_${year}`;
  }

  const season: string = getSeason();

  const { loading, error, data } = useQuery(GET_NEW_RANKED_ANIME, {
    variables: { season },
  });

  const ex_season = useQuery(GET_EX_SEASON_ANIME);
  const exex_season = useQuery(GET_EXEX_SEASON_ANIME);

  const adminAnime = useQuery(GET_ADMIN_ANIME);
  const movieAnime = useQuery(GET_MOVIE_ANIME);
  useEffect(() => {
    document.title = "AniGurt";
  }, []);

  if (loading) return <Spiner />;
  if (error) return <p>Ошибка: {error.message}</p>;

  if (!data || !data.animes) return <p>Нет данных</p>;

  return (
    <div className="h-screen w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-[70%] w-full"
        style={
          {
            "--swiper-theme-color": "#e82c4c", // Изменение цвета слайдера
          } as React.CSSProperties
        }
      >
        {data.animes.slice(0, 6).map((anime: Anime) => {
          const animeRating = translateRating(anime.rating);
          const statusRu = translateStatus(anime.status);
          return (
            <SwiperSlide key={anime.id}>
              <div className="relative w-full h-full">
                {/* Затемнение */}
                <div className="absolute inset-0 bg-black/50"></div>
                <Link to={`/anime/${anime.id}`}>
                  <img
                    src={
                      anime.screenshots[0]?.originalUrl ||
                      anime.poster.originalUrl
                    }
                    alt={anime.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-10 left-5 sm:left-10 text-white ">
                    <h2 className="text-xl sm:text-2xl md:text-4xl font-bold duration-300  transition ease-in-out  hover:text-[#e82c4c]">
                      {anime.russian || anime.name}
                    </h2>
                    <div className="flex mt-5 gap-5 divide-x divide-gray-100 *:pr-5 text-white">
                      <p>⭐ {anime.score}</p>
                      <p>{anime.airedOn?.year}</p>
                      <p>{animeRating}</p>
                      <p>{statusRu}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="mt-5 p-5">
        <h2 className="text-2xl text-amber-50 mb-5">Аниме прошлого сезона</h2>
        <AnimeList
          animeList={ex_season.data?.animes || []}
          loading={ex_season.loading}
        />
      </div>
      <div className="mt-5 p-5">
        <h2 className="text-2xl text-amber-50 mb-5">
          Аниме позапрошлого сезона
        </h2>
        <AnimeList
          animeList={exex_season.data?.animes || []}
          loading={exex_season.loading}
        />
      </div>

      <div className="mt-5 p-5">
        <h2 className="text-2xl text-amber-50 mb-5">Рекомендация админа</h2>
        <AnimeList
          animeList={adminAnime.data?.animes || []}
          loading={adminAnime.loading}
        />
      </div>
      <div className="mt-5 p-5">
        <h2 className="text-2xl text-amber-50 mb-5">Лучшие аниме фильмы</h2>
        <AnimeList
          animeList={movieAnime.data?.animes || []}
          loading={movieAnime.loading}
        />
      </div>
    </div>
  );
}

export default Home;
