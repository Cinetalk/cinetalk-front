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
    const data: MovieHidingPiece[] = await res.json();
    return data;
  },
  getMentionKeword: async () => {
    try {
      const res = await fetch(`${API_URL}/movie/MentionKeword`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(` ${res.status}`);
      }

      const data: { state: string } | MentionKeword[] = await res.json();
      return data;
    } catch (error) {
      console.error("Error :", error);
      return { state: "error" }; // 기본값이나 에러 상태 반환
    }
  },
  getMovieReviewComments: async () => {
    const res = await fetch(`${API_URL}/movie/TotalReviewCount`, {
      cache: "no-store",
    });
    const data: number = await res.json();
    return data;
  },
  getMovieMainBanner: async () => {
    const res = await fetch(`${API_URL}/movie/MainBanner`, {
      cache: "no-store",
    });
    const data: BannerDTO[] = await res.json();
    return data;
  },
  getMovieTopTen: async (genreId: number) => {
    const res = await fetch(`${API_URL}/movie/TopTenTalk?genreId=${genreId}`, {
      cache: "no-store",
    });
    const data: Movie_TopTen = await res.json();
    return data;
  },
  getWatchMovie: async (token: string | null) => {
    const res = await fetch(`${API_URL}/movie/HoxyWatching`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { access: `${token}` }),
      },
      cache: "no-store",
    });
    const data: WatchMovie[] = await res.json();
    return data;
  },
  getPeopleReviewers: async (token: string | null) => {
    const res = await fetch(`${API_URL}/movie/top-reviewers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { access: `${token}` }),
      },
      cache: "no-store",
    });
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
