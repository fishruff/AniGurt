import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, UserRecord } from "../services/auth";
// import { GET_RANDOM_ANIME } from "./apolloClient";
// import { useQuery } from "@apollo/client";

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
      className={`
        fixed bottom-0 lg:top-0 left-0 inset-x-0 mx-auto
        lg:hover:bg-[#171717da]
         w-4/5 object-center rounded-4xl lg:rounded-none
        lg:w-full
        h-16 bg-[#171717]
        lg:h-20 lg:bg-transparent
        z-50 text-amber-50 transition-colors duration-300
        lg:${isScroll ? "bg-[#171717]" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex flex-row justify-between items-center p-5 ">
        {/* Логотип */}
        <Link
          to="/"
          className="items-center font-bold text-md lg:text-2xl hover:text-[#e82c4c] transition-colors duration-300 flex"
        >
          <h1 className="text-[#e82c4c]">Ani</h1>
          <h1>Gurt</h1>
        </Link>

        {/* Навигация */}
        <nav className="flex items-center gap-6 *:hover:text-[#e82c4c] *:transition-colors *:duration-300">
          <Link to="/animes" className="">
            Аниме
          </Link>
          <Link to="/mangas" className="">
            Манга
          </Link>
          <Link to="/random">Рандом</Link>
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
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 hover:text-[#d6253f] transition-colors duration-300"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}

              <span className="font-semibold hidden lg:block">{user.name}</span>
            </Link>
          ) : (
            <Link to="/login" className=" ">
              {/* Войти */}
              <div className="flex items-center gap-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 hover:text-[#d6253f] transition-colors duration-300"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <p className="bg-[#e82c4c]  rounded-md  text-white py-2 px-4 hidden text-center lg:flex">
                  Войти
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
