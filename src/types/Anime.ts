export interface Anime {
  id: number;
  malId: number;
  name: string;
  russian: string;
  licenseNameRu: string | null;
  english: string | null;
  japanese: string | null;
  synonyms: [string];
  kind?: string;
  rating?: string;
  score?: string;
  status?: string;
  episodes: number;
  episodesAired: number;
  duration: number;
  airedOn: { year: number; month: number; day: number; date: string };
  releasedOn: { year: number; month: number; day: number; date: string };
  url: string;
  season: string;
  poster: { id: string; originalUrl: string; mainUrl: string };
  fansubbers: [string];
  fandubbers: [string];
  createdAt: string;
  updatedAt: string;
  related: {
    id: string;
    anime: { id: string; name: string } | null;
    manga: { id: string; name: string } | null;
    relationKind: string;
    relationText: string;
  }[];
  videos: {
    id: string;
    name: string;
    url: string;
    kind: string;
    playerUrl: string;
    imageUrl: string;
  }[];
  screenshots: { id: number; originalUrl: string }[];
  scoresStats: { score: number; count: number }[];
  statusesStats: { status: string; count: number }[];
  description?: string;
  descriptionHtml?: string;
  descriptionSource?: string;

  genres: { id: number; name: string; russian: string; kind: string }[];
}
