import { API_URL } from "@/constants/api_url";

export const movieAPIs = {
  getMovieDetail: async (movieId: number) => {
    const res = await fetch(`${API_URL}/movie/${movieId}`);
    const data: MovieDetailData = await res.json();
    return data;
  },
  getHidingPiece: async () => {
    const res = await fetch(`${API_URL}/movie/HidingPiece`);
    const data: MovieHidingPiece = await res.json();
    return data;
  },
  getMentionKeword: async () => {
    const res = await fetch(`${API_URL}/movie/MentionKeword`);
    const data: MentionKeword = await res.json();
    return data;
  },
  getMovieReviewComments: async () => {
    const res = await fetch(`${API_URL}/movie/TotalReviewCount`);
    const data: number = await res.json();
    return data;
  },
  getMovieMainBanner: async () => {
    const res = await fetch(`${API_URL}/movie/MainBanner`);
    const data: BannerDTO = await res.json();
    return data;
  },
  getMovieTopTen: async (genreId: number) => {
    const res = await fetch(`${API_URL}/movie/TopTenTalk?genreId=${genreId}`);
    const data: Movie_TopTen = await res.json();
    return data;
  },
  getWatchMovie: async () => {
    const res = await fetch(`${API_URL}/movie/HoxyWatching`);
    const data: WatchMovie = await res.json();
    return data;
  },
  getPeopleReviewers: async () => {
    const res = await fetch(`${API_URL}/movie/top-reviewers`);
    const data: MovieReviewRecommed[] = await res.json();
    return data;
  },
};
