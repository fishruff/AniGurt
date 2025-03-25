import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, UserRecord } from "../services/auth";

function Header() {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    getCurrentUser().then((data) => {
      if (data) setUser(data);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed bottom-0 lg:top-0 left-0 inset-x-0 mx-auto
        w-4/5 lg:w-full
        h-16 lg:h-20
        z-50 text-amber-50
        rounded-4xl lg:rounded-none
        transition-all duration-300
      `}
    >
      <div
        className={`
          absolute inset-0
           backdrop-blur-xl
          rounded-4xl lg:rounded-none
          transition-all duration-300
          ${isScroll ? "opacity-100" : "opacity-0 lg:opacity-80"}
        `}
      />

      {/* Контент хедера */}
      <div className="container relative mx-auto flex flex-row justify-between items-center py-5">
        {/* Логотип */}
        <Link
          to="/"
          className="items-center font-bold text-md lg:text-2xl hover:text-[#e82c4c] transition-colors duration-300 flex z-10"
        >
          <h1 className="text-[#e82c4c]">Ani</h1>
          <h1>Gurt</h1>
        </Link>

        {/* Навигация */}
        <nav className="flex items-center gap-6 *:hover:text-[#e82c4c] *:transition-colors *:duration-300 z-10">
          <Link to="/animes">Аниме</Link>
          <Link to="/random">Рандом</Link>
        </nav>

        {/* Поиск и профиль */}
        <div className="flex items-center gap-6 z-10">
          <Link
            to="/search"
            className="hover:text-[#e82c4c] transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Link>

          {user ? (
            <Link
              to="/me"
              className="flex items-center gap-2 hover:text-[#e82c4c] transition-colors duration-300"
            >
              {user.avatar ? (
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={`https://anigurt-backend.onrender.com/api/files/_pb_users_auth_/${user.id}/${user.avatar}`}
                  alt={user.name}
                  loading="lazy"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 hover:text-[#d6253f] transition-colors duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
              <span className="font-semibold hidden lg:block">{user.name}</span>
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 hover:text-[#d6253f] transition-colors duration-300 lg:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <p className="bg-[#e82c4c] rounded-md text-white py-2 px-4 hidden text-center lg:flex">
                Войти
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
