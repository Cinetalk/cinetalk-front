"use server";

import { cookies } from "next/headers";

import { tokenKey } from "@/constants/token";

export const setAccessToken = (token: string) => {
  cookies().set(tokenKey, token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 9 + 10,
  });
};

export const deleteAccessToken = () => {
  cookies().delete(tokenKey);
};
