import { API_URL } from "@/constants/api_url";

import { tokenManager } from "./tokenManager";

export const authAPIS = {
  authBy: async (authToken: string) => {
    const res = await fetch(`${API_URL}/AuthBy?authToken=${authToken}`);
    const data = await res.json();
    return { data, res };
  },

  refresh: async () => {
    const res = await fetch(`${API_URL}/reissue`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = res.json();
    return { res, data };
  },

  signUp: async (nickname: string, gender: string, birthday: string) => {
    const accessToken = tokenManager.getToken();
    const res = await fetch(`${API_URL}/my/nickNameMerge`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        access: `${accessToken}`,
      },
      body: JSON.stringify({
        nickname: nickname,
        gender: gender,
        birthday: birthday,
      }),
    });

    const data = await res.text();
    return { data, res };
  },
};
