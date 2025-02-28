import React, { useState } from "react";
import { login } from "../../services/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Вход выполнен!");
      window.location.reload();
    } catch (error) {
      alert("Ошибка: " + error);
    }
  };

  return (
    <div className="flex text-amber-50">
      <img className="w-4/6 object-cover h-screen blur-xs" src="./bg.jpg" alt="" />
      <div className="flex mx-auto flex-col gap-5 w-2/6 p-10">
        <h2 className="mb-5 text-3xl flex gap-2">
          Вход на <p className="font-bold">AniGurt</p>
        </h2>
        <input
          className="bg-gray-800 p-2 rounded-md outline-0"
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-gray-800 p-2 rounded-md outline-0"
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit} className="bg-[#56a6f7] p-5 rounded-md">
          Вход
        </button>
        <div className="text-center">
          <h2 className="text-2xl mb-5">То же самое что и </h2>
          <div className="flex flex-row justify-between mb-5">
            <p className="bg-gray-600 p-3 rounded-2xl border-2 border-[#56a6f7]">
              Google
            </p>
            <p className="bg-gray-600 p-3 rounded-2xl border-2 border-[#56a6f7]">
              Discord
            </p>
            <p className="bg-gray-600 p-3 rounded-2xl border-2 border-[#56a6f7]">
              Shikimori
            </p>
          </div>
        </div>
        <div className="text-center">
          <h2>
            Еще нет аккаунта?{" "}
            <a href="/reg" className="text-[#56a6f7] font-bold">
              Зарегестрируйся!
            </a>
          </h2>
        </div>
      </div>
      
    </div>
  );
};

export default LoginPage;
