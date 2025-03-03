import Avatar3d from "../Avatar3d";
import { useEffect, useState } from "react";
import { getCurrentUser, UserRecord, logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import Spiner from "../Spiner";

const ProfilePage = () => {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  

  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        if (!data) {
          navigate("/login");
        } else {
          setUser(data);
        }
      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      document.title = `Профиль | ${user.name}`;
    } else {
      document.title = "Профиль | AniGurt";
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    window.location.reload();
  };

  if (isLoading) return <Spiner/>;

  return user ? (
    <div className="relative w-full min-h-screen flex flex-col lg:flex-row text-white p-6 lg:p-10">
      {/* Фоновое изображение */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Левая часть с информацией */}
      <div className="z-10 w-full lg:w-1/2 flex flex-col justify-around p-5">
        {/* Никнейм */}
        <h1 className="text-3xl lg:text-4xl font-bold mb-6">{user.name}</h1>

        {/* Блок статистики */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-md mb-6">
          <h2 className="text-xl mb-3">Статистика</h2>
          <ul className="space-y-1">
            <li>
              📌 Запланировано: <span className="text-blue-400">12</span>
            </li>
            <li>
              ▶️ Смотрю: <span className="text-green-400">3</span>
            </li>
            <li>
              ✅ Просмотрено: <span className="text-yellow-400">45</span>
            </li>
            <li>
              ⏳ Отложено: <span className="text-purple-400">5</span>
            </li>
            <li>
              ❌ Брошено: <span className="text-red-400">2</span>
            </li>
          </ul>
        </div>

        {/* Меню */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-md mb-6">
          <h2 className="text-xl mb-3">Меню</h2>
          <ul className="space-y-1">
            <li>⭐ Избранное</li>
            <li>👥 Друзья</li>
            <li>
              ⏳ Время за аниме: <span className="text-blue-400">300 часов</span>
            </li>
          </ul>
        </div>

        {/* Кнопка выхода */}
        <button
          className="bg-red-500 p-3 lg:p-4 rounded mt-4 w-full lg:w-1/2 hover:bg-red-600 transition-colors duration-300"
          onClick={handleLogout}
        >
          Выйти
        </button>
      </div>

      {/* Правая часть с 3D-аватаром */}
      <div className="z-10 w-full lg:w-1/2 h-[400px] lg:h-full lg:absolute lg:bottom-0 lg:right-0">
        <Avatar3d />
      </div>
    </div>
  ) : null;
};

export default ProfilePage;