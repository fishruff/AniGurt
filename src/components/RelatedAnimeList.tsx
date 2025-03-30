import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ANIME_BY_ID } from "./apolloClient";
import AnimeList from "./AnimeList";

interface RelatedAnime {
  relation_russian: string;
  anime: { id: number; name: string; russian: string };
  manga: { id: number; name: string; russian: string };
}

const RelatedAnimeList = ({ animeId }: { animeId: number }) => {
  const [relatedItems, setRelatedItems] = useState<RelatedAnime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://shikimori.one/api/animes/${animeId}/related`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRelatedItems(data);
        } else {
          setRelatedItems([]); // Если данные не в ожидаемом формате
        }
      })
      .catch((err) => {
        console.error("Ошибка загрузки связанных аниме:", err);
        setError("Не удалось загрузить связанные аниме");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [animeId]);

  const animeIds = relatedItems.map((anime) => anime.anime?.id).join(", ");
  const {
    loading: gqlLoading,
    error: gqlError,
    data,
  } = useQuery(GET_ANIME_BY_ID, {
    variables: { id: animeIds },
    skip: animeIds.length === 0,
  });

  if (loading) {
    return <p>Загрузка связанных аниме...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (relatedItems.length === 0) {
    return <p>Нет связанных аниме.</p>;
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
      <h3 className="text-xl font-bold mb-5">Связанные аниме:</h3>

      <AnimeList animeList={data?.animes} />
    </div>
  );
};

export default RelatedAnimeList;
