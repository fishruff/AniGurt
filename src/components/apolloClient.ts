import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Настройка HTTP-ссылки
const httpLink = new HttpLink({
  uri: "https://shikimori.one/api/graphql", // Укажите ваш GraphQL-эндпоинт
});

// Добавление заголовков
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "User-Agent": "AniGurt/1.0 (arsershoff@gmail.com)", // Укажите ваше приложение и email
    },
  };
});

// Создание Apollo Client
export const client = new ApolloClient({
  link: authLink.concat(httpLink), // Объединяем заголовки и ссылку
  cache: new InMemoryCache(),
});
export const GET_FILTERED_ANIME = gql`
  query GetFilteredAnime(
    $season: SeasonString
    $genre: String
    $status: AnimeStatusString
  ) {
    animes(season: $season, genre: $genre, limit: 50, status: $status) {
      id
      malId
      name
      russian
      licenseNameRu
      english
      japanese
      synonyms
      kind
      rating
      score
      status
      episodes
      episodesAired
      duration
      airedOn {
        year
        month
        day
        date
      }
      releasedOn {
        year
        month
        day
        date
      }
      url
      season

      poster {
        id
        originalUrl
        mainUrl
      }

      fansubbers
      fandubbers
      licensors
      createdAt
      updatedAt
      nextEpisodeAt
      isCensored

      genres {
        id
        name
        russian
        kind
      }
      studios {
        id
        name
        imageUrl
      }

      externalLinks {
        id
        kind
        url
        createdAt
        updatedAt
      }

      personRoles {
        id
        rolesRu
        rolesEn
        person {
          id
          name
          poster {
            id
          }
        }
      }
      characterRoles {
        id
        rolesRu
        rolesEn
        character {
          id
          name
          poster {
            id
          }
        }
      }

      related {
        id
        anime {
          id
          name
        }
        manga {
          id
          name
        }
        relationKind
        relationText
      }

      videos {
        id
        url
        name
        kind
        playerUrl
        imageUrl
      }
      screenshots {
        id
        originalUrl
        x166Url
        x332Url
      }

      scoresStats {
        score
        count
      }
      statusesStats {
        status
        count
      }

      description
      descriptionHtml
      descriptionSource
    }
  }
`;

export const GET_MOVIE_ANIME = gql`
  query {
    animes(kind: "movie", limit: 50) {
      id
      malId
      name
      russian
      licenseNameRu
      english
      japanese
      synonyms
      kind
      rating
      score
      status
      episodes
      episodesAired
      duration
      airedOn {
        year
        month
        day
        date
      }
      releasedOn {
        year
        month
        day
        date
      }
      url
      season

      poster {
        id
        originalUrl
        mainUrl
      }

      fansubbers
      fandubbers
      licensors
      createdAt
      updatedAt
      nextEpisodeAt
      isCensored

      genres {
        id
        name
        russian
        kind
      }
      studios {
        id
        name
        imageUrl
      }

      externalLinks {
        id
        kind
        url
        createdAt
        updatedAt
      }

      personRoles {
        id
        rolesRu
        rolesEn
        person {
          id
          name
          poster {
            id
          }
        }
      }
      characterRoles {
        id
        rolesRu
        rolesEn
        character {
          id
          name
          poster {
            id
          }
        }
      }

      related {
        id
        anime {
          id
          name
        }
        manga {
          id
          name
        }
        relationKind
        relationText
      }

      videos {
        id
        url
        name
        kind
        playerUrl
        imageUrl
      }
      screenshots {
        id
        originalUrl
        x166Url
        x332Url
      }

      scoresStats {
        score
        count
      }
      statusesStats {
        status
        count
      }

      description
      descriptionHtml
      descriptionSource
    }
  }
`;

export const GET_RANDOM_ANIME = gql`
  query {
    animes(order: random, limit: 1) {
      id
      malId
      name
      russian
      licenseNameRu
      english
      japanese
      synonyms
      kind
      rating
      score
      status
      episodes
      episodesAired
      duration
      airedOn {
        year
        month
        day
        date
      }
      releasedOn {
        year
        month
        day
        date
      }
      url
      season

      poster {
        id
        originalUrl
        mainUrl
      }

      fansubbers
      fandubbers
      licensors
      createdAt
      updatedAt
      nextEpisodeAt
      isCensored

      genres {
        id
        name
        russian
        kind
      }
      studios {
        id
        name
        imageUrl
      }

      externalLinks {
        id
        kind
        url
        createdAt
        updatedAt
      }

      personRoles {
        id
        rolesRu
        rolesEn
        person {
          id
          name
          poster {
            id
          }
        }
      }
      characterRoles {
        id
        rolesRu
        rolesEn
        character {
          id
          name
          poster {
            id
          }
        }
      }

      related {
        id
        anime {
          id
          name
        }
        manga {
          id
          name
        }
        relationKind
        relationText
      }

      videos {
        id
        url
        name
        kind
        playerUrl
        imageUrl
      }
      screenshots {
        id
        originalUrl
        x166Url
        x332Url
      }

      scoresStats {
        score
        count
      }
      statusesStats {
        status
        count
      }

      description
      descriptionHtml
      descriptionSource
    }
  }
`;
export const GET_ADMIN_ANIME = gql`
  query {
    animes(
      ids: "48849, 1, 2, 269, 16498, 33, 2966, 31043, 1210, 42310, 37779, 889, 37521, 46102, 34599, 1535, 23283, 37965, 22319"
      limit: 50
    ) {
      id
      malId
      name
      russian
      licenseNameRu
      english
      japanese
      synonyms
      kind
      rating
      score
      status
      episodes
      episodesAired
      duration
      airedOn {
        year
        month
        day
        date
      }
      releasedOn {
        year
        month
        day
        date
      }
      url
      season

      poster {
        id
        originalUrl
        mainUrl
      }

      fansubbers
      fandubbers
      licensors
      createdAt
      updatedAt
      nextEpisodeAt
      isCensored

      genres {
        id
        name
        russian
        kind
      }
      studios {
        id
        name
        imageUrl
      }

      externalLinks {
        id
        kind
        url
        createdAt
        updatedAt
      }

      personRoles {
        id
        rolesRu
        rolesEn
        person {
          id
          name
          poster {
            id
          }
        }
      }
      characterRoles {
        id
        rolesRu
        rolesEn
        character {
          id
          name
          poster {
            id
          }
        }
      }

      related {
        id
        anime {
          id
          name
        }
        manga {
          id
          name
        }
        relationKind
        relationText
      }

      videos {
        id
        url
        name
        kind
        playerUrl
        imageUrl
      }
      screenshots {
        id
        originalUrl
        x166Url
        x332Url
      }

      scoresStats {
        score
        count
      }
      statusesStats {
        status
        count
      }

      description
      descriptionHtml
      descriptionSource
    }
  }
`;

export const GET_NEW_RANKED_ANIME = gql`
  query ($season: SeasonString!) {
    animes(season: $season, limit: 20, order: ranked) {
      id
      malId
      name
      russian
      licenseNameRu
      english
      japanese
      synonyms
      kind
      rating
      score
      status
      episodes
      episodesAired
      duration
      airedOn {
        year
        month
        day
        date
      }
      releasedOn {
        year
        month
        day
        date
      }
      url
      season

      poster {
        id
        originalUrl
        mainUrl
      }

      fansubbers
      fandubbers
      licensors
      createdAt
      updatedAt
      nextEpisodeAt
      isCensored

      genres {
        id
        name
        russian
        kind
      }
      studios {
        id
        name
        imageUrl
      }

      externalLinks {
        id
        kind
        url
        createdAt
        updatedAt
      }

      personRoles {
        id
        rolesRu
        rolesEn
        person {
          id
          name
          poster {
            id
          }
        }
      }
      characterRoles {
        id
        rolesRu
        rolesEn
        character {
          id
          name
          poster {
            id
          }
        }
      }

      related {
        id
        anime {
          id
          name
        }
        manga {
          id
          name
        }
        relationKind
        relationText
      }

      videos {
        id
        url
        name
        kind
        playerUrl
        imageUrl
      }
      screenshots {
        id
        originalUrl
        x166Url
        x332Url
      }

      scoresStats {
        score
        count
      }
      statusesStats {
        status
        count
      }

      description
      descriptionHtml
      descriptionSource
    }
  }
`;

export const GET_EX_SEASON_ANIME = gql`
  query {
    animes(season: "winter_2025", limit: 20, order: ranked) {
      id
      malId
      name
      russian
      licenseNameRu
      english
      japanese
      synonyms
      kind
      rating
      score
      status
      episodes
      episodesAired
      duration
      airedOn {
        year
        month
        day
        date
      }
      releasedOn {
        year
        month
        day
        date
      }
      url
      season

      poster {
        id
        originalUrl
        mainUrl
      }

      fansubbers
      fandubbers
      licensors
      createdAt
      updatedAt
      nextEpisodeAt
      isCensored

      genres {
        id
        name
        russian
        kind
      }
      studios {
        id
        name
        imageUrl
      }

      externalLinks {
        id
        kind
        url
        createdAt
        updatedAt
      }

      personRoles {
        id
        rolesRu
        rolesEn
        person {
          id
          name
          poster {
            id
          }
        }
      }
      characterRoles {
        id
        rolesRu
        rolesEn
        character {
          id
          name
          poster {
            id
          }
        }
      }

      related {
        id
        anime {
          id
          name
        }
        manga {
          id
          name
        }
        relationKind
        relationText
      }

      videos {
        id
        url
        name
        kind
        playerUrl
        imageUrl
      }
      screenshots {
        id
        originalUrl
        x166Url
        x332Url
      }

      scoresStats {
        score
        count
      }
      statusesStats {
        status
        count
      }

      description
      descriptionHtml
      descriptionSource
    }
  }
`;
export const GET_EXEX_SEASON_ANIME = gql`
  query {
    animes(season: "fall_2024", limit: 20, order: ranked) {
      id
      malId
      name
      russian
      licenseNameRu
      english
      japanese
      synonyms
      kind
      rating
      score
      status
      episodes
      episodesAired
      duration
      airedOn {
        year
        month
        day
        date
      }
      releasedOn {
        year
        month
        day
        date
      }
      url
      season

      poster {
        id
        originalUrl
        mainUrl
      }

      fansubbers
      fandubbers
      licensors
      createdAt
      updatedAt
      nextEpisodeAt
      isCensored

      genres {
        id
        name
        russian
        kind
      }
      studios {
        id
        name
        imageUrl
      }

      externalLinks {
        id
        kind
        url
        createdAt
        updatedAt
      }

      personRoles {
        id
        rolesRu
        rolesEn
        person {
          id
          name
          poster {
            id
          }
        }
      }
      characterRoles {
        id
        rolesRu
        rolesEn
        character {
          id
          name
          poster {
            id
          }
        }
      }

      related {
        id
        anime {
          id
          name
        }
        manga {
          id
          name
        }
        relationKind
        relationText
      }

      videos {
        id
        url
        name
        kind
        playerUrl
        imageUrl
      }
      screenshots {
        id
        originalUrl
        x166Url
        x332Url
      }

      scoresStats {
        score
        count
      }
      statusesStats {
        status
        count
      }

      description
      descriptionHtml
      descriptionSource
    }
  }
`;

export const GET_TOP_ANIME = gql`
  query ($page: PositiveInt) {
    animes(limit: 50, kind: "!special", page: $page) {
      id
      name
      russian
      score
      status
      episodes
      episodesAired
      url
      kind
      screenshots {
        id
        originalUrl
      }
      airedOn {
        year
      }
      poster {
        originalUrl
      }
    }
  }
`;

export const GET_MANGA_BY_ID = gql`
  query GetMangaById($id: String!) {
    mangas(ids: $id) {
      id
      malId
      name
      russian
      licenseNameRu
      english
      japanese
      synonyms
      kind
      score
      status
      volumes
      chapters
      airedOn {
        year
        month
        day
        date
      }
      releasedOn {
        year
        month
        day
        date
      }
      url

      poster {
        id
        originalUrl
        mainUrl
      }

      licensors
      createdAt
      updatedAt
      isCensored

      genres {
        id
        name
        russian
        kind
      }
      publishers {
        id
        name
      }

      externalLinks {
        id
        kind
        url
        createdAt
        updatedAt
      }

      personRoles {
        id
        rolesRu
        rolesEn
        person {
          id
          name
          poster {
            id
          }
        }
      }
      characterRoles {
        id
        rolesRu
        rolesEn
        character {
          id
          name
          poster {
            id
          }
        }
      }

      related {
        id
        anime {
          id
          name
        }
        manga {
          id
          name
        }
        relationKind
        relationText
      }

      scoresStats {
        score
        count
      }
      statusesStats {
        status
        count
      }

      description
      descriptionHtml
      descriptionSource
    }
  }
`;

export const GET_TOP_MANGA = gql`
  query {
    mangas(limit: 50) {
      id
      malId
      name
      russian
      licenseNameRu
      english
      japanese
      synonyms
      kind
      score
      status
      volumes
      chapters
      airedOn {
        year
        month
        day
        date
      }
      releasedOn {
        year
        month
        day
        date
      }
      url

      poster {
        id
        originalUrl
        mainUrl
      }

      licensors
      createdAt
      updatedAt
      isCensored

      genres {
        id
        name
        russian
        kind
      }
      publishers {
        id
        name
      }

      externalLinks {
        id
        kind
        url
        createdAt
        updatedAt
      }

      personRoles {
        id
        rolesRu
        rolesEn
        person {
          id
          name
          poster {
            id
          }
        }
      }
      characterRoles {
        id
        rolesRu
        rolesEn
        character {
          id
          name
          poster {
            id
          }
        }
      }

      related {
        id
        anime {
          id
          name
        }
        manga {
          id
          name
        }
        relationKind
        relationText
      }

      scoresStats {
        score
        count
      }
      statusesStats {
        status
        count
      }

      description
      descriptionHtml
      descriptionSource
    }
  }
`;

export const GET_ANIME_SEARCH = gql`
  query SearchAnime($query: String!) {
    animes(search: $query, limit: 50) {
      id
      name
      russian
      score
      status
      episodes
      episodesAired
      url
      kind
      airedOn {
        year
      }
      poster {
        originalUrl
      }
    }
  }
`;

export const GET_ANIME_BY_ID = gql`
  query GetAnimeById($id: String!) {
    animes(ids: $id, limit: 20) {
      id
      malId
      name
      russian
      licenseNameRu
      english
      japanese
      synonyms
      kind
      rating
      score
      status
      episodes
      episodesAired
      duration
      airedOn {
        year
        month
        day
        date
      }
      releasedOn {
        year
        month
        day
        date
      }
      url
      season

      poster {
        id
        originalUrl
        mainUrl
      }

      fansubbers
      fandubbers
      licensors
      createdAt
      updatedAt
      nextEpisodeAt
      isCensored

      genres {
        id
        name
        russian
        kind
      }
      studios {
        id
        name
        imageUrl
      }

      externalLinks {
        id
        kind
        url
        createdAt
        updatedAt
      }

      personRoles {
        id
        rolesRu
        rolesEn
        person {
          id
          name
          poster {
            id
          }
        }
      }
      characterRoles {
        id
        rolesRu
        rolesEn
        character {
          id
          name
          poster {
            id
          }
        }
      }

      related {
        id
        anime {
          id
          name
        }
        manga {
          id
          name
        }
        relationKind
        relationText
      }

      videos {
        id
        url
        name
        kind
        playerUrl
        imageUrl
      }
      screenshots {
        id
        originalUrl
        x166Url
        x332Url
      }

      scoresStats {
        score
        count
      }
      statusesStats {
        status
        count
      }

      description
      descriptionHtml
      descriptionSource
    }
  }
`;
