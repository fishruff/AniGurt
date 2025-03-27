import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ANIME_BY_ID } from "./apolloClient";
import AnimeList from "./AnimeList";

interface SimilarAnime {
  id: number;
}

const SimilarAnime = ({ animeId }: { animeId: number }) => {
  const [similarItems, setSimilarItems] = useState<SimilarAnime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://shikimori.one/api/animes/${animeId}/similar`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setSimilarItems(data);
        } else {
          setSimilarItems([]);
        }
      })
      .catch((err) => {
        console.error("Ошибка загрузки похожих аниме:", err);
        setError("Не удалось загрузить похожих аниме");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [animeId]);

  const animeIds = similarItems.map((anime) => anime.id).join(", ");
  const {
    loading: gqlLoading,
    error: gqlError,
    data,
  } = useQuery(GET_ANIME_BY_ID, {
    variables: { id: animeIds },
    skip: animeIds.length === 0,
  });

  if (loading) {
    return <p>Загрузка похожих аниме...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (similarItems.length === 0) {
    return <p>Нет похожих аниме.</p>;
  }

  if (gqlLoading) {
    return <p>Загрузка данных о похожих аниме...</p>;
  }

  if (gqlError) {
    return (
      <p className="text-red-500">Ошибка загрузки данных: {gqlError.message}</p>
    );
  }
  return (
    <div className="mt-5">
      <h3 className="text-xl font-bold mb-5">Похожее:</h3>
      <AnimeList animeList={data.animes} />
    </div>
  );
};

export default SimilarAnime;
