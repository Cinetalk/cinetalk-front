import { cookies } from "next/headers";

import { tokenKey } from "@/constants/token";

type ActivityCount = "rateCount" | "reviewCount" | "bookmarkCount";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export class CustomFetch {
  async fetch(
    url: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  ) {
    const accessToken = cookies().get(tokenKey)?.value;
    if (!accessToken) return null;
    try {
      const res = await fetch(`${baseUrl}${url}`, {
        headers: {
          access: accessToken,
        },
        method,
      });
      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async authFetch(
    url: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
    nextOptions?: NextFetchRequestConfig,
  ) {
    const accessToken = cookies().get(tokenKey)?.value;
    if (!accessToken) throw new Error("unauthorized error");
    try {
      const res = await fetch(`${baseUrl}${url}`, {
        headers: {
          access: accessToken,
        },
        method,
        ...nextOptions,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(`${url} api error`);
      return data;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }
}

export const myAPIs = {
  getUser: async (): Promise<MyInfo | null> => {
    return new CustomFetch().fetch("/my/userInfo");
  },

  getActivityCount: async (): Promise<Record<ActivityCount, number>> => {
    const data = await new CustomFetch().authFetch("/my/CountSumByUser");
    return data;
  },

  getBookmark: async (): Promise<Bookmark[]> => {
    const data = await new CustomFetch().authFetch("/my/BookmarkByUser");
    return data;
  },
  getBadges: async (): Promise<EarnedBadge[]> => {
    const data = await new CustomFetch().authFetch("/my/BadgeByUser", "GET", {
      tags: ["badges"],
    });
    return data;
  },
  getReviewCounts: async (): Promise<BadgeCount[]> => {
    const data = await new CustomFetch().authFetch("/my/ReviewByGenreFromUser");
    return data;
  },
};
