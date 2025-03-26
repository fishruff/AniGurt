const kindTranslations: Record<string, string> = {
  tv: "Сериал",
  tv_special: "Тв-спешл",
  ova: "OVA",
  ona: "ONA",
  music: "Клип",
  movie: "Фильм",
  special: "Спешл",
  cm: "Реклама",
  pv: "Промо ролик",
};

const ratingTranslations: Record<string, string> = {
  rx: "Хентай",
  g: "0+",
  pg: "13+",
  pg_13: "13+",
  r: "17+",
  r_plus: "17+",
};

const statusTranslations: Record<string, string> = {
  released: "Вышло",
  anons: "Анонс",
  ongoing: "Выходит",
};

export function translateKind(kind: string | undefined): string {
  return kind ? kindTranslations[kind] || kind : "Неизвестно";
}

export function translateRating(rating: string | undefined): string {
  return rating ? ratingTranslations[rating] || rating : "Неизвестно";
}

export function translateStatus(status: string | undefined): string {
  return status ? statusTranslations[status] || status : "Неизвестно";
}
