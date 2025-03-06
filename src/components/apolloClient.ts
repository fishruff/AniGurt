import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://shikimori.one/api/graphql",
  cache: new InMemoryCache(),
});

// query GetSeason($season: String!){
//   animes(season: $season, limit:6, order: ranked) {

// GetSeason($season: String!)

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
    airedOn { year month day date }
    releasedOn { year month day date }
    url
    season

    poster { id originalUrl mainUrl }

    fansubbers
    fandubbers
    licensors
    createdAt,
    updatedAt,
    nextEpisodeAt,
    isCensored

    genres { id name russian kind }
    studios { id name imageUrl }

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
      person { id name poster { id } }
    }
    characterRoles {
      id
      rolesRu
      rolesEn
      character { id name poster { id } }
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

    videos { id url name kind playerUrl imageUrl }
    screenshots { id originalUrl x166Url x332Url }

    scoresStats { score count }
    statusesStats { status count }

    description
    descriptionHtml
    descriptionSource
  }
  }
`;

export const GET_EX_SEASON_ANIME = gql`
  query{
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
    airedOn { year month day date }
    releasedOn { year month day date }
    url
    season

    poster { id originalUrl mainUrl }

    fansubbers
    fandubbers
    licensors
    createdAt,
    updatedAt,
    nextEpisodeAt,
    isCensored

    genres { id name russian kind }
    studios { id name imageUrl }

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
      person { id name poster { id } }
    }
    characterRoles {
      id
      rolesRu
      rolesEn
      character { id name poster { id } }
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

    videos { id url name kind playerUrl imageUrl }
    screenshots { id originalUrl x166Url x332Url }

    scoresStats { score count }
    statusesStats { status count }

    description
    descriptionHtml
    descriptionSource
  }
  }
`;

export const GET_TOP_ANIME = gql`
  query {
    animes(limit: 50, kind: "!special") {
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
    animes(ids: $id) {
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
