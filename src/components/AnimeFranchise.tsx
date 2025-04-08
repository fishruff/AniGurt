import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface FranchiseNode {
  id: number;
  name: string;
  date: number;
  image_url: string;
  url: string;
  year: number;
  kind: string;
  weight: number;
}

interface FranchiseLink {
  id: number;
  source_id: number;
  target_id: number;
  source: number;
  target: number;
  weight: number;
  relation: string;
}

interface FranchiseData {
  current_id: number;
  links: FranchiseLink[];
  nodes: FranchiseNode[];
}

const AnimeFranchise = ({ animeId }: { animeId: number }) => {
  const [franchise, setFranchise] = useState<FranchiseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFranchise = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://shikimori.one/api/animes/${animeId}/franchise`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: FranchiseData = await response.json();
        setFranchise(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchFranchise();
  }, [animeId]);

  if (loading)
    return <div className="text-center py-4">Загрузка данных франшизы...</div>;
  if (error)
    return <div className="text-red-500 text-center py-4">Ошибка: {error}</div>;
  if (!franchise || franchise.nodes.length === 0)
    return <div className="text-center py-4">Нет данных о франшизе</div>;

  const sortedItems = [...franchise.nodes].sort((a, b) => a.date - b.date);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">
        Франшиза (по хронологии)
      </h2>

      <div className="max-h-[600px] overflow-y-auto pr-2">
        <div className="space-y-3">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-[#2f2f2f] rounded-lg overflow-hidden hover:bg-[#3f3f3f] transition-colors"
            >
              <div className="w-20 h-24 flex-shrink-0">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://shikimori.one/assets/globals/missing_x96.jpg";
                  }}
                />
              </div>

              <Link to={`/anime/${item.id}`} className="flex-grow p-3">
                <div>
                  <h3 className="text-white font-medium">{item.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-400 text-sm capitalize">
                      {item.kind}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.id == animeId && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          Вы тут
                        </span>
                      )}
                      <span className="text-gray-300 text-sm">{item.year}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeFranchise;
