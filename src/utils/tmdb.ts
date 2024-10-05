type PosterSizes =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";

export const getTmdbPosterUrl = (size: PosterSizes, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
