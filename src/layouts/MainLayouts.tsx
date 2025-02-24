import { ApolloProvider } from "@apollo/client";
import Header from "../components/Header";
import TopAnimes from "../components/TopAnimes";
import { client } from "../components/apolloClient";
import { Routes, Route } from "react-router-dom";
import AnimePage from "../components/AnimePage";
import SearchAnime from "../components/SearchAnime";
import Home from "../components/Home";
import MangaPage from "../components/MangaPage";
import Manga from "../components/Manga";
import { Analytics } from "@vercel/analytics/react";

function MainLayouts() {
  return (
    <div>
      <Header />

      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animes" element={<TopAnimes />} />
          <Route path="/anime/:id" element={<AnimePage />} />
          <Route path="/search" element={<SearchAnime />} />
          <Route path="/mangas" element={<Manga />} />
          <Route path="/manga/:id" element={<MangaPage />} />
        </Routes>
      </ApolloProvider>
      <Analytics />
    </div>
  );
}

export default MainLayouts;
