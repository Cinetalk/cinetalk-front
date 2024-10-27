import { API_URL } from "@/constants/api_url";

import { tokenManager } from "../auth/tokenManager";
export const movieAPIs = {
  getMovieDetail: async (movieId: number) => {
    const res = await fetch(`${API_URL}/movie/${movieId}`, {
      cache: "no-store",
    });
    const data: MovieDetailData = await res.json();
    return data;
  },
  getHidingPiece: async () => {
    const res = await fetch(`${API_URL}/movie/HidingPiece`, {
      cache: "no-store",
    });
    const data: MovieHidingPiece = await res.json();
    return data;
  },
  getMentionKeword: async () => {
    const res = await fetch(`${API_URL}/movie/MentionKeword`, {
      cache: "no-store",
    });
    const string = await res.text();
    const json =
      string === "" ? null : (JSON.parse(string) as StateTO | MentionKeword[]);
    return json;
  },
  getMovieReviewComments: async () => {
    const res = await fetch(`${API_URL}/movie/TotalReviewCount`, {
      cache: "no-store",
    });
    const data: number = await res.json();
    return data;
  },
  getMovieMainBanner: async () => {
    const res = await fetch(`${API_URL}/movie/MainBanner`);
    const data: BannerDTO[] = await res.json();
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
          cache: "no-store",
        }))
      : (res = await fetch(`${API_URL}/movie/HoxyWatching`));

    const data: WatchMovie[] = await res.json();
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
  bookmarkMovie: async (movieId: number) => {
    const accessToken = tokenManager.getToken();
    const res = await fetch(`${API_URL}/bookmark/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access: `${accessToken}`,
      },
    });

    const data = await res.json();
    return { data, res };
  },
  checkBookmark: async (movieId: number) => {
    const accessToken = tokenManager.getToken();
    if (!accessToken) return;
    const res = await fetch(`${API_URL}/bookmark/${movieId}/check`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access: `${accessToken}`,
      },
    });

    const data = await res.json();
    return { data, res };
  },
};
