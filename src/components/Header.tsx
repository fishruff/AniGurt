import { Link } from "react-router-dom";

function Header() {
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
        <p>me</p>
      </div>
    </div>
  );
}

export default Header;
