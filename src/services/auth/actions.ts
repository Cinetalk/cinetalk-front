"use server";

import { cookies } from "next/headers";

export const setAccessToken = async (token: string) => {
  cookies().set("accessToken", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 9 + 10,
  });
  const a = cookies().get("accessToken");
  console.log(a);
  console.log("refresh token wkrehd");
};
