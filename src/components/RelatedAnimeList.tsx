import { useState, useEffect } from "react";

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
        console.log("Ответ от API:", data);

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

  if (loading) {
    return <p>Загрузка связанных аниме...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (relatedItems.length === 0) {
    return <p>Нет связанных аниме.</p>;
  }

  return (
    <div className="mt-5">
      <h3 className="text-xl font-bold">Связанные аниме и манга:</h3>
      <ul className="list-disc ml-5">
        {relatedItems.map((rel) => {
          const item = rel.anime || rel.manga;
          const type = rel.anime ? "anime" : "manga";

          if (!item) {
            return null; // Пропускаем, если нет ни аниме, ни манги
          }

          return (
            <li key={item.id}>
              <a
                href={`/${type}/${item.id}`}
                className="text-[#e82c4c] hover:underline"
              >
                {item.russian || item.name} ({rel.relation_russian})
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default RelatedAnimeList;
