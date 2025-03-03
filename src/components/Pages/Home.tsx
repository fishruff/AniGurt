import { useQuery } from "@apollo/client";
import { GET_TOP_ANIME } from "../apolloClient";
import Spiner from "../Spiner";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useEffect } from "react";
import "swiper/swiper-bundle.css";

interface Anime {
  id: number;
  name: string;
  russian: string;
  poster: { originalUrl: string };
  screenshots: { id: number; originalUrl: string }[];
}

function Home() {
  const { loading, error, data } = useQuery(GET_TOP_ANIME);

  useEffect(() => {
    document.title = "AniGurt";
  }, []);

  if (loading) return <Spiner />;
  if (error) return <p>Ошибка: {error.message}</p>;

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
        style={{
          "--swiper-theme-color": "#e82c4c", // Изменение цвета слайдера
        } as React.CSSProperties}
      >
        {data.animes.slice(0, 6).map((anime: Anime) => (
          <SwiperSlide key={anime.id}>
            <div className="relative w-full h-full">
              {/* Затемнение */}
              <div className="absolute inset-0 bg-black/50"></div>
              
              {/* Фоновое изображение */}
              <img
                src={anime.screenshots[0]?.originalUrl || anime.poster.originalUrl}
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
    </div>
  );
}

export default Home;
