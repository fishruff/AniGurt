import Avatar3d from "../Avatar3d"; // Импорт 3D-аватара

const ProfilePage = () => {
  return (
    <div className="relative w-full h-screen flex bg-gray-900 text-white p-10 " >

<div className="absolute inset-0 w-full h-screen bg-center bg-cover"  style={{ backgroundImage: "url('../../public/bg.jpg')" }}></div>
<div className="absolute inset-0 bg-black opacity-70"></div>
      {/* Левая часть с информацией */}
      <div className=" z-1 w-1/2 flex flex-col justify-around p-5">
        {/* Никнейм */}
        <h1 className="text-4xl font-bold">fish_ruff</h1>

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
      </div>

      {/* Правая часть с 3D-аватаром */}
      <div className="absolute bottom-0 right-0 w-[40%] h-[100%]">
        <Avatar3d/>
      </div>
    </div>
  );
};

export default ProfilePage;
