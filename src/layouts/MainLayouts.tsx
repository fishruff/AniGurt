import { ApolloProvider } from "@apollo/client";
import Header from "../components/Header";
import TopAnimes from "../components/Pages/TopAnimeList";
import { client } from "../components/apolloClient";
import { Routes, Route } from "react-router-dom";
import AnimePage from "../components/Pages/AnimePage";
import SearchAnime from "../components/Pages/SearchAnime";
import Home from "../components/Pages/Home";
import MangaPage from "../components/Pages/MangaPage";
import Manga from "../components/MangaList";
import { Analytics } from "@vercel/analytics/react";
import ProfilePage from "../components/Pages/ProfilePage";
import LoginPage from "../components/Pages/LoginPage";
import RegestrationPage from "../components/Pages/RegisterPage";
import NotFound from "../components/Pages/NotFound";

function MainLayouts() {
  return (
    <div>
      <Header />
    <div className="">

      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animes" element={<TopAnimes />} />
          <Route path="/anime/:id" element={<AnimePage />} />
          <Route path="/search" element={<SearchAnime />} />
          <Route path="/mangas" element={<Manga />} />
          <Route path="/manga/:id" element={<MangaPage />} />
          <Route path="/me" element={<ProfilePage/>}/>
          <Route  path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegestrationPage/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </ApolloProvider>
    </div>
      <Analytics />
    </div>
  );
}

export default MainLayouts;
