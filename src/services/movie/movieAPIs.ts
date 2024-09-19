import { API_URL } from "@/constants/api_url";

import { tokenManager } from "../auth/tokenManager";
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
    const accessToken = tokenManager.getToken();
    let res = null;
    accessToken
      ? (res = await fetch(`${API_URL}/movie/HoxyWatching`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access: `${accessToken}`,
          },
        }))
      : (res = await fetch(`${API_URL}/movie/HoxyWatching`));

    const data: WatchMovie = await res.json();
    return data;
  },
  getPeopleReviewers: async () => {
    const accessToken = tokenManager.getToken();
    let res = null;
    accessToken
      ? (res = await fetch(`${API_URL}/movie/top-reviewers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access: `${accessToken}`,
          },
        }))
      : (res = await fetch(`${API_URL}/movie/top-reviewers`));
    const data: MovieReviewRecommed[] = await res.json();
    return data;
  },
  postFeedBack: async (content: string) => {
    const accessToken = tokenManager.getToken();
    const res = await fetch(`${API_URL}/feedback/save?content=${content}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access: `${accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  },
};
