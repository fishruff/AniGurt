import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, UserRecord } from "../services/auth";

function Header() {
  const [user, setUser] = useState<UserRecord | null>(null);

  useEffect(() => {
    getCurrentUser().then((data) => {
      if (data) setUser(data);
    });
  }, []);

  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 lg:top-0 left-0 inset-x-0 mx-auto
        bg-[#171717] w-4/5 object-center rounded-4xl
        lg:w-full h-15 z-50 text-amber-50 transition-colors duration-300 lg:${
        isScroll ? "bg-[#171717]" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex flex-row justify-between items-center p-4">
        {/* Логотип */}
        <Link
          to="/"
          className="items-center font-bold text-2xl hover:text-[#e82c4c] transition-colors duration-300 flex"
        >
          <h1 className="text-[#e82c4c]">Ani</h1>
          <h1>Gurt</h1>
        </Link>

        {/* Навигация */}
        <nav className="flex items-center gap-6">
          <Link
            to="/animes"
            className="hover:text-[#e82c4c] transition-colors duration-300"
          >
            Anime
          </Link>
          <Link
            to="/mangas"
            className="hover:text-[#e82c4c] transition-colors duration-300"
          >
            Manga
          </Link>
        </nav>

        {/* Поиск и профиль */}
        <div className="flex items-center gap-6">
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
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={`https://anigurt-backend.onrender.com/api/files/_pb_users_auth_/${user.id}/${user.avatar}`}
                alt={user.name}
                loading="lazy"
              />
              <span className="font-semibold hidden lg:block">{user.name}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-[#e82c4c] text-white px-4 py-2 rounded-md hover:bg-[#d6253f] transition-colors duration-300"
            >
              Войти
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
