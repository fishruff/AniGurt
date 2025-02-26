import Avatar3D from "./Avatar3d";


function ProfilePage() {
    return (
        <div className="relative flex items-center justify-center w-full h-screen bg-cover bg-center" 
             style={{ backgroundImage: "url('../../public/bg.jpg')" }}>
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 flex gap-10 p-10 bg-gray-900/80 rounded-xl shadow-lg">
                {/* Левая часть - Информация */}
                <div className="text-white">
                    <h2 className="text-3xl font-bold">Твой Ник</h2>
                    <p className="text-lg">Просмотрено: 120</p>
                    <p className="text-lg">Запланировано: 30</p>
                    <p className="text-lg">Брошено: 5</p>
                </div>

                {/* Правая часть - 3D Аватар */}
                <div className="w-150 h-150 p-10">
                    <Avatar3D />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
