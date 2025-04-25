import React, { useState } from "react";
import { login } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);

      navigate(`/`);
      window.location.reload();
    } catch (error) {
      alert("Ошибка: " + error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-amber-50">
      {/* Фоновое изображение */}
      <div className="lg:w-1/2 relative">
        <img
          className="w-full h-64 lg:h-screen object-cover blur-xs"
          src="./bg.jpg"
          alt=""
        />
      </div>

      {/* Форма входа */}
      <div className="lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-10">
        <div className="w-full max-w-md">
          <h2 className="mb-5 text-3xl font-semibold text-center">
            Вход на AniGurt
          </h2>

          {/* Поля ввода */}
          <input
            className="w-full bg-gray-800 p-3 rounded-md outline-none mb-4"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full bg-gray-800 p-3 rounded-md outline-none mb-6"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Кнопка входа */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#e82c4c] p-3 rounded-md hover:bg-[#d6253f] transition-colors duration-300"
          >
            Вход
          </button>

          {/* Социальные кнопки */}
          <div className="text-center mt-8">
            <h2 className="text-2xl mb-5">То же самое что и</h2>
            <div className="flex flex-col lg:flex-row gap-4 justify-center mb-5">
              <p className="bg-gray-600 p-3 rounded-2xl border-2 border-white hover:bg-gray-700 transition-colors duration-300">
                Google
              </p>
              <p className="bg-gray-600 p-3 rounded-2xl border-2 border-white hover:bg-gray-700 transition-colors duration-300">
                Discord
              </p>
              <p className="bg-gray-600 p-3 rounded-2xl border-2 border-white hover:bg-gray-700 transition-colors duration-300">
                Shikimori
              </p>
            </div>
          </div>

          {/* Ссылка на регистрацию */}
          <div className="text-center mt-6 mb-20">
            <h2>
              Еще нет аккаунта?{" "}
              <Link
                to="/register"
                className="text-[#e82c4c] font-bold hover:underline"
              >
                Зарегистрируйся!
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
