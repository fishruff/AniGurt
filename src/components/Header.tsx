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

  return (
    <div className="text-white w-full flex flex-row justify-between shadow-[#ffffff12] shadow-2xs items-center p-5">
      <a href="/">
        <h1>AniGurt</h1>
      </a>
      <div className="flex justify-between gap-3">
        <Link to={`/animes`}>
          <p>anime</p>
        </Link>
        <Link to={`mangas`}>
          <p>manga</p>
        </Link>
      </div>
      <div className="flex justify-between items-center gap-24">
        <Link to={`/search`}>
          <p>Поиск</p>
        </Link>

        
        {user ? (
        <div className="flex items-center gap-4">
          <Link to={`/me`}>
          {/* <img className="w-10 h-10 rounded-full" src="https://anigurt-backend.onrender.com/api/files/_pb_users_auth_/{user.id}/{user?.avatar}" alt="" /> */}
          <span>{user.name}</span>
          </Link>
        </div>
      ) : (
        <Link to={`/login`} className="bg-[#e82c4c] p-2 rounded-md">
          Войти
        </Link>
      )}

      </div>
    </div>
  );
}

export default Header;
