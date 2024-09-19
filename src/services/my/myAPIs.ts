import { cookies } from "next/headers";

import { tokenKey } from "@/constants/token";

type ActivityCount = "rateCount" | "reviewCount" | "bookmarkCount";

export const myAPIs = {
  getUser: async (): Promise<MyInfo | null> => {
    const accessToken = cookies().get(tokenKey)?.value;
    if (!accessToken) return null;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my/userInfo`, {
      headers: {
        access: accessToken,
      },
    });
    const data = await res.json();
    return data;
  },

  getActivityCount: async (): Promise<Record<ActivityCount, number> | null> => {
    const accessToken = cookies().get(tokenKey)?.value;
    if (!accessToken) return null;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my/CountSumByUser`,
      {
        headers: {
          access: accessToken,
        },
      },
    );
    const data = await res.json();
    return data;
  },
};
