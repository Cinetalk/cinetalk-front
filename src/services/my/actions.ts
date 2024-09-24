"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { tokenKey } from "@/constants/token";
import { CustomFetch } from "@/services/my/myAPIs";

export const logout = async () => {
  cookies().delete(tokenKey);
  redirect("/");
};
export const changeUserInfo = async (
  value: string,
  type: "gender" | "nickname" | "birthday",
): Promise<{ state: boolean }> => {
  const data = await new CustomFetch().authFetch(
    `/my/userInfoMerge/${type}?value=${value}`,
    "PATCH",
  );
  if (data.state) revalidatePath("/my");
  return data;
};
export const verifyNickname = async (nickname: string): Promise<boolean> => {
  const data = await new CustomFetch().authFetch(
    `/my/NicknameCheck?nickname=${nickname}`,
  );
  return data;
};
// export const addBookmark = async (movieId: string) => {
//   const data = await new CustomFetch().authFetch(
//     `/bookmark/${movieId}`,
//     "POST",
//   );
//   return data;
// };
export const deleteBookmark = async (list: number[]) => {
  const queryString = list.map((id) => `BookmarkList=${id}`).join("&");
  const data = (await new CustomFetch().authFetch(
    `/my/BookmarkDelete?${queryString}`,
    "DELETE",
  )) as { state: boolean };
  if (data.state) revalidatePath("/my");
  return data.state;
};
export const deleteAccount = async () => {
  const data = (await new CustomFetch().authFetch(
    `/my/UserDelete`,
    "DELETE",
  )) as { state: boolean };
  return data.state;
};
export const updateBadge = async (list: number[]) => {
  const queryString = list.map((id) => `BadgeList=${id}`).join("&");
  const data = (await new CustomFetch().authFetch(
    queryString
      ? `/my/BadgeUseUpdate?${queryString || ""}`
      : `/my/BadgeUseUpdate?BadgeList`,
    "PATCH",
  )) as { state: boolean };
  if (data.state) revalidateTag("badges");
  return data.state;
};
