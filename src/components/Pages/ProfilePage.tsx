import Avatar3d from "../Avatar3d"; 
import { useEffect, useState } from "react";
import { getCurrentUser, UserRecord, logout } from "../../services/auth";

const ProfilePage = () => {
  const [user, setUser] = useState<UserRecord | null>(null);

  useEffect(() => {
    getCurrentUser().then((data) => {
      if (data) setUser(data);
    });
  }, []);


  return user?(

    

    <div className="relative w-full h-screen flex text-white p-10" >

{/* <div className="text-white p-10">
      <h1 className="text-3xl">Привет, {user?.name || "Гость"}!</h1>
      <button className="bg-red-500 px-4 py-2 rounded mt-4" onClick={logout}>
        Выйти
      </button>
    </div> */}

<div className="absolute inset-0 w-full h-screen bg-center bg-cover"  style={{ backgroundImage: "url('/bg.jpg')" }}></div>
<div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Левая часть с информацией */}
      <div className=" z-1 w-1/2 flex flex-col justify-around p-5">
        {/* Никнейм */}
        <h1 className="text-4xl font-bold">{user.name}</h1>

        {/* Блок статистики */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-md">
          <h2 className="text-xl mb-3">Статистика</h2>
          <ul className="space-y-1">
            <li>📌 Запланировано: <span className="text-blue-400">12</span></li>
            <li>▶️ Смотрю: <span className="text-green-400">3</span></li>
            <li>✅ Просмотрено: <span className="text-yellow-400">45</span></li>
            <li>⏳ Отложено: <span className="text-purple-400">5</span></li>
            <li>❌ Брошено: <span className="text-red-400">2</span></li>
          </ul>
        </div>

        {/* Меню */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-md">
          <h2 className="text-xl mb-3">Меню</h2>
          <ul className="space-y-1">
            <li>⭐ Избранное</li>
            <li>👥 Друзья</li>
            <li>⏳ Время за аниме: <span className="text-blue-400">300 часов</span></li>
          </ul>
        </div>
        <button className="bg-red-500 p-4 rounded mt-4  w-1/5" onClick={logout}>
        Выйти
      </button>
      </div>

      {/* Правая часть с 3D-аватаром */}
      <div className="absolute bottom-0 right-0 w-[40%] h-[100%]">
        <Avatar3d/>
      </div>
    </div>
  ):null
};

export default ProfilePage;
