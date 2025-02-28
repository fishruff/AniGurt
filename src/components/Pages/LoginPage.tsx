import React, { useState } from "react";
import { login } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
        navigate('/me');
        window.location.reload();
    } catch (error) {
      alert("Ошибка: " + error);
    }
  };

  

  return (
    <div className="flex text-amber-50">
      <img className="w-4/6 object-cover h-screen blur-xs" src="./bg.jpg" alt="" />
      <div className="flex mx-auto flex-col gap-5 w-2/6 p-10">
        <h2 className="mb-5 text-3xl flex gap-2 font-semibold">
          Вход на AniGurt
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
        <button onClick={handleSubmit} className="bg-[#e82c4c] p-5 rounded-md">
          Вход
        </button>
        <div className="text-center">
          <h2 className="text-2xl mb-5">То же самое что и </h2>
          <div className="flex flex-row justify-between mb-5">
            <p className="bg-gray-600 p-3 rounded-2xl border-2 border-[#fff]">
              Google
            </p>
            <p className="bg-gray-600 p-3 rounded-2xl border-2 border-[#fff]">
              Discord
            </p>
            <p className="bg-gray-600 p-3 rounded-2xl border-2 border-[#fff]">
              Shikimori
            </p>
          </div>
        </div>
        <div className="text-center">
          <h2>
            Еще нет аккаунта?{" "}
            <Link to="/register" className="text-[#e82c4c] font-bold">
              Зарегистрируйся!
            </Link>
          </h2>
        </div>
      </div>
      
    </div>
  );
};

export default LoginPage;
