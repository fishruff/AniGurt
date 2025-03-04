import { useQuery } from "@apollo/client";
import { GET_NEW_RANKED_ANIME } from "../apolloClient";
import Spiner from "../Spiner";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useEffect } from "react";
import "swiper/swiper-bundle.css";
// import AnimeCard from "../AnimeCard";
import { Anime } from "../../types/Anime";


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

  useEffect(() => {
    document.title = "AniGurt";
  }, []);

  if (loading) return <Spiner />;
  if (error) return <p>Ошибка: {error.message}</p>;

  if (!data || !data.animes) return <p>Нет данных</p>;

  console.log(data);

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
        {data.animes.slice(0, 6).map((anime: Anime) => (
          <SwiperSlide key={anime.id}>
            <div className="relative w-full h-full">
              {/* Затемнение */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Фоновое изображение */}
              <img
                src={
                  anime.screenshots[0]?.originalUrl || anime.poster.originalUrl
                }
                alt={anime.name}
                className="w-full h-full object-cover"
              />

              {/* Текст поверх */}
              <div className="absolute bottom-10 left-5 sm:left-10 text-white">
                <Link to={`/anime/${anime.id}`}>
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">
                    {anime.russian || anime.name}
                  </h2>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <div className="mt-5 p-10">
        <h2 className="text-2xl text-amber-50">Аниме зимнего сезона 2025</h2>

        <ul className="w-full gap-6 flex overflow-hidden">
        {data.animes.map((anime: Anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
        </ul>
      </div> */}
    </div>
  );
}

export default Home;
