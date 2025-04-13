import Avatar3d from "../Avatar3d";
import { useEffect, useState } from "react";
import { getCurrentUser, UserRecord, logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import Spiner from "../Spiner";
import StatLine from "../StatLine";

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

  if (isLoading) return <Spiner />;

  const stats: Record<string, number>[] = [
    { plane: 13 },
    { watch: 4 },
    { complete: 24 },
    { hold: 4 },
    { drope: 1 },
  ];

  console.log(user);

  return user ? (
    <div className="relative w-full min-h-screen flex flex-col lg:flex-row text-white p-6 lg:p-10">
      {/* Левая часть с информацией */}
      <div className="z-10 w-full lg:w-2/3 flex flex-col justify-around p-5">
        <div className="flex gap-5 items-center">
          <img
            className="w-40 h-40 rounded-xl  object-cover"
            src={`https://anigurt-backend.onrender.com/api/files/_pb_users_auth_/${user.id}/${user.avatar}`}
            alt={user.name}
            loading="lazy"
          />
          <div className="flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold">{user.name}</h1>
            <div className="flex-col lg:flex mt-5 gap-5 lg:divide-x divide-gray-100 *:pr-5 text-white ">
              <p>муж.</p>
              <p>21yo</p>
              <a
                href="https://t.me/fish_ruff"
                className="duration-300  transition ease-in-out  hover:text-[#e82c4c]"
              >
                fish_ruff
              </a>
              <p>{user.email}</p>
            </div>
            <button
              className="bg-red-500 p-3 lg:p-4 rounded mt-4 w-40 hover:bg-red-600 transition-colors duration-300"
              onClick={handleLogout}
            >
              Выйти
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-10 rounded-xl">
          <div className="">
            <h1 className="mb-5">Список аниме</h1>
            <StatLine stats={stats} />
          </div>
          <div className="flex justify-between gap-2 *:hover:text-[#e82c4c] mt-10">
            <a href="#">Запланировано </a>
            <a href="#">Смотрю </a>
            <a href="#">Просмотрено </a>
            <a href="#">Отложено </a>
            <a href="#">Брошено </a>
          </div>
        </div>
      </div>
      <div className="z-10 w-full lg:w-1/3 h-[400px] lg:h-full lg:absolute lg:bottom-0 lg:right-0">
        <Avatar3d />
      </div>
    </div>
  ) : null;
};

export default ProfilePage;
