import { useState } from "react";

interface AnimeFilterProps {
  onFilterChange: (filters: Record<string, string>) => void;
}

const genres = {
  "7": "Mystery",
  "4": "Comedy",
  "8": "Drama",
  "1": "Action",
  "2": "Adventure",
  "9": "Fantasy",
};

const seasons = ["winter", "spring", "summer", "fall"];
const status = ["released", "anons", "ongoing"];

const AnimeFilter: React.FC<AnimeFilterProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    season: "",
    genre: "",
    status: "",
  });

  const handleChange = (category: string, value: string) => {
    const updatedFilters = { ...selectedFilters, [category]: value || "" };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg w-64 h-full">
      <h2 className="text-xl mb-4">Фильтры</h2>

      {/* СЕЗОН */}
      <div className="mb-4">
        <h3 className="font-bold mb-1">Сезон</h3>
        <select
          className="w-full p-2 bg-gray-700 rounded"
          value={selectedFilters.season}
          onChange={(e) => handleChange("season", e.target.value)}
        >
          <option value="">Все</option>
          {seasons.map((season) => (
            <option key={season} value={season}>
              {season.charAt(0).toUpperCase() + season.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* СТАТУС */}
      <div className="mb-4">
        <h3 className="font-bold mb-1">Статус</h3>
        <select
          className="w-full p-2 bg-gray-700 rounded"
          value={selectedFilters.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="">Все</option>
          {status.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* ЖАНР */}
      <div>
        <h3 className="font-bold mb-1">Жанр</h3>
        <select
          className="w-full p-2 bg-gray-700 rounded"
          value={selectedFilters.genre}
          onChange={(e) => handleChange("genre", e.target.value)}
        >
          <option value="">Все</option>
          {Object.entries(genres).map(([id, name]) => (
            <option key={id} value={`${id}-${name}`}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AnimeFilter;
