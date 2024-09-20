"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

import { tokenKey } from "@/constants/token";
import { myAPIs } from "@/services/my/myAPIs";

export const logout = async () => {
  cookies().delete(tokenKey);
  redirect("/");
};

export const changeNickname = async (
  prevState: { message: string },
  formData: FormData,
) => {
  const nickname = formData.get("nickname");
  console.log(nickname);
  return { message: "sdfsfsf" };
};

export const changeGender = async (
  gender: MyInfo["gender"],
): Promise<{ state: boolean }> => {
  const accessToken = cookies().get(tokenKey)?.value;
  if (!accessToken) throw new Error("unauthorized error");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my/userInfoMerge/gender?value=${gender}`,
    {
      headers: {
        access: accessToken,
      },
      method: "PATCH",
    },
  );
  const data = await res.json();
  // if (data.state) revalidatePath("/my");

  return data;
};
