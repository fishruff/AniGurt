import { useQuery } from "@apollo/client";
import { GET_RANDOM_ANIME } from "./apolloClient";
import Spiner from "./Spiner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RandomAnime() {
  const { loading, error, data } = useQuery(GET_RANDOM_ANIME, {
    fetchPolicy: "no-cache",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !error && data && data.animes) {
      const animeId = Array.isArray(data.animes)
        ? data.animes[0]?.id
        : data.animes.id;
      if (animeId) {
        navigate(`/anime/${animeId}`);
      }
    }
  }, [loading, error, data, navigate]);

  if (loading) return <Spiner />;
  if (error) return <p>Ошибка: {error.message}</p>;

  return <p>Перенаправление...</p>;
}

export default RandomAnime;
