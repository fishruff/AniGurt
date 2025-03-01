import React, { useState } from "react";
import { register } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";


const RegestrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUserName] = useState("");
  const navigate =useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !username) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
    try {
      if(password==confirmPassword){
        await register(email, password, username);
        alert('Регистрация успешна!');
        navigate('/me');
      } alert('Пароли не  совпадают');
      
    } catch (error) {
      alert("Ошибка: " + error);
    }
  };
    
  

  

  return (
    <div className="flex text-amber-50">
      <img className="w-4/6 object-cover h-screen blur-xs" src="./bg.jpg" alt="" />
      <div className="flex mx-auto flex-col gap-5 w-2/6 p-10">
        <h2 className="mb-5 text-3xl flex gap-2">
          Регистрация на <p className="font-bold">AniGurt</p>
        </h2>
        <input
          className="bg-gray-800 p-2 rounded-md outline-0"
          placeholder="name"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />
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
        <input
          className="bg-gray-800 p-2 rounded-md outline-0"
          placeholder="confirm password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleSubmit} className="bg-[#e82c4c] p-5 rounded-md">
          Зарегестрироваться
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
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-[#e82c4c] font-bold">
              Войти!
            </Link>
          </h2>
        </div>
      </div>
      
    </div>
  );
};

export default RegestrationPage;
