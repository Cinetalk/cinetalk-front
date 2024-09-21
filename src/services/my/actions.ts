"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { tokenKey } from "@/constants/token";
import { myAPIs } from "@/services/my/myAPIs";
import { nincknameRegex } from "@/utils/regex";

const nicknameSchema = z.object({
  nickname: z.string().regex(nincknameRegex),
});

export const logout = async () => {
  cookies().delete(tokenKey);
  redirect("/");
};

export const changeUserInfo = async (
  value: string,
  type: "gender" | "nickname" | "birthday",
): Promise<{ state: boolean }> => {
  const accessToken = cookies().get(tokenKey)?.value;
  if (!accessToken) throw new Error("unauthorized error");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my/userInfoMerge/${type}?value=${value}`,
    {
      headers: {
        access: accessToken,
      },
      method: "PATCH",
    },
  );
  const data = await res.json();
  if (data.state) revalidatePath("/my");

  return data;
};

export const verifyNickname = async (
  nickname: string,
): Promise<boolean | null> => {
  const accessToken = cookies().get(tokenKey)?.value;
  if (!accessToken) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my/NicknameCheck?nickname=${nickname}`,
    {
      headers: {
        access: accessToken,
      },
    },
  );
  const data = await res.json();
  return data;
};

export const addBookmark = async (movieId: string) => {
  const accessToken = cookies().get(tokenKey)?.value;
  if (!accessToken) throw new Error("unauthorized error");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bookmark/${movieId}`,
    {
      headers: {
        access: accessToken,
      },
      method: "POST",
    },
  );
  const data = await res.json();
  console.log({ data });
  return data;
};
