import { useState } from "react";

interface AnimeFilterProps {
  onFilterChange: (filters: Record<string, string>) => void;
}

const genres = [
  {
    id: 1,
    name: "Action",
    name_ru: "Экшен",
  },
  {
    id: 2,
    name: "Adventure",
    name_ru: "Приключения",
  },
  {
    id: 3,
    name: "Comedy",
    name_ru: "Комедия",
  },
  {
    id: 4,
    name: "Drama",
    name_ru: "Драма",
  },
  {
    id: 5,
    name: "Fantasy",
    name_ru: "Фэнтези",
  },
  {
    id: 6,
    name: "Horror",
    name_ru: "Ужасы",
  },
  {
    id: 7,
    name: "Mystery",
    name_ru: "Мистика",
  },
  {
    id: 8,
    name: "Romance",
    name_ru: "Романтика",
  },
  {
    id: 9,
    name: "Sci-Fi",
    name_ru: "Научная фантастика",
  },
  {
    id: 10,
    name: "Slice of Life",
    name_ru: "Повседневность",
  },
  {
    id: 11,
    name: "Sports",
    name_ru: "Спорт",
  },
  {
    id: 12,
    name: "Supernatural",
    name_ru: "Сверхъестественное",
  },
  {
    id: 13,
    name: "Ecchi",
    name_ru: "Этти",
  },
  {
    id: 14,
    name: "Harem",
    name_ru: "Гарем",
  },
  {
    id: 15,
    name: "Isekai",
    name_ru: "Исекай",
  },
  {
    id: 16,
    name: "Mecha",
    name_ru: "Меха",
  },
  {
    id: 17,
    name: "Psychological",
    name_ru: "Психологическое",
  },
  {
    id: 18,
    name: "Thriller",
    name_ru: "Триллер",
  },
  {
    id: 19,
    name: "Historical",
    name_ru: "Исторический",
  },
  {
    id: 20,
    name: "Military",
    name_ru: "Военное",
  },
];

// const seasons = ["winter_2020", "spring", "summer", "fall"];
const seasons = [
  {
    id: 1,
    name: "Лето 2025",
    value: "summer_2025",
  },
  {
    id: 2,
    name: "Весна 2025",
    value: "spring_2025",
  },
  {
    id: 3,
    name: "Зима 2025",
    value: "winter_2025",
  },
  {
    id: 4,
    name: "Осень 2024",
    value: "fall_2024",
  },
  {
    id: 5,
    name: "2025 год",
    value: "2025",
  },
  {
    id: 6,
    name: "2024 год",
    value: "2024",
  },
  {
    id: 7,
    name: "2022-2023",
    value: "2022_2023",
  },
  {
    id: 8,
    name: "2017-2021",
    value: "2017_2021",
  },
  {
    id: 9,
    name: "2010-2016",
    value: "2010_2016",
  },
  {
    id: 10,
    name: "2000-2010",
    value: "2000_2010",
  },
  {
    id: 11,
    name: "1990-е годы",
    value: "1990x",
  },
  {
    id: 12,
    name: "1980-е годы",
    value: "1980x",
  },
  {
    id: 13,
    name: "Более старые",
    value: "ancient",
  },
];
const AnimeFilter: React.FC<AnimeFilterProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({
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
          {seasons.map(({ id, name, value }) => (
            <option key={id} value={value}>
              {name}
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
          <option value="released">Вышло</option>
          <option value="ongoing">Выходит</option>
          <option value="anons">Анонс</option>
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
          {genres.map(({ id, name, name_ru }) => (
            <option key={id} value={`${id}-${name}`}>
              {name_ru}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AnimeFilter;
