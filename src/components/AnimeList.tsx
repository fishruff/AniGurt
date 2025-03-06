import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Anime } from "../types/Anime";
import AnimeCard from "./AnimeCard";
import AnimeCardSkeleton from "./AnimeSkeletonCard";

interface AnimeListProps {
  animeList?: Anime[];
  loading?: boolean;
}

const AnimeList: React.FC<AnimeListProps> = ({ animeList = [], loading = false }) => {

  if (!Array.isArray(animeList) || animeList.length === 0) {
    return <p className="text-center text-gray-400">Нет данных</p>;
  }
  return (
    <div className="relative w-full">
      {/* Слайдер */}

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        navigation
        loop={true}
        className="px-8 [&_.swiper-button-prev]:bg-black/80 [&_.swiper-button-next]:bg-black/80 [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:w-12! [&_.swiper-button-next]:w-12! [&_.swiper-button-prev]:h-12! [&_.swiper-button-next]:h-12! [&_.swiper-button-prev]:flex [&_.swiper-button-next]:flex [&_.swiper-button-prev]:items-center [&_.swiper-button-next]:items-center [&_.swiper-button-prev]:justify-center [&_.swiper-button-next]:justify-center"
        style={
          {
            "--swiper-navigation-color": "#ffffff",
            "--swiper-navigation-size": "24px",
            "--swiper-navigation-sides-offset": "10px",
          } as React.CSSProperties
        }
      >
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide key={index}>
                <AnimeCardSkeleton />
              </SwiperSlide>
            ))
          : animeList.map((anime) => (
              <SwiperSlide key={anime.id}>
                <Link to={`/anime/${anime.id}`}>
                  <AnimeCard anime={anime} />
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default AnimeList;
