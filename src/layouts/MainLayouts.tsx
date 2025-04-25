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
import RandomAnime from "../components/RandomAnime";
import Footer from "../components/Footer";

function MainLayouts() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/animes" element={<TopAnimes />} />
            <Route path="/anime/:id" element={<AnimePage />} />
            <Route path="/search" element={<SearchAnime />} />
            <Route path="/mangas" element={<Manga />} />
            <Route path="/manga/:id" element={<MangaPage />} />
            <Route path="/user/:name" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegestrationPage />} />
            <Route path="/random" element={<RandomAnime />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ApolloProvider>
      </div>
      <Footer />
      <Analytics />
    </div>
  );
}

export default MainLayouts;
