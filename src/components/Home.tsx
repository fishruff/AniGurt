import { useQuery } from "@apollo/client";
import { GET_TOP_ANIME } from "./apolloClient";
import Spiner from "./Spiner";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";




import "swiper/swiper-bundle.css";


interface Anime {
  id: number;
  name: string;
  russian: string;
  poster: { originalUrl: string };
  screenshots:{id: number; originalUrl: string}[]
}

function Home() {
  const { loading, error, data } = useQuery(GET_TOP_ANIME);

  if (loading) return <Spiner />;
  if (error) return <p>Ошибка: {error.message}</p>;

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
        className="h-[70%]"
        navigation
      >
        {data.animes.slice(0, 6).map((anime: Anime) => (
          <SwiperSlide className="" key={anime.id}>
            <div className="relative w-full h-full">
              {/* Затемнение */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Фоновое изображение */}
              <img
                src={anime.screenshots[0].originalUrl}
                alt={anime.name}
                className="w-[100%]  object-cover"
              />

              {/* Текст поверх */}
              <div className="absolute bottom-20 left-10 text-white">
              <Link to={`/anime/${anime.id}`}>
                <h2 className="text-4xl font-bold">
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
