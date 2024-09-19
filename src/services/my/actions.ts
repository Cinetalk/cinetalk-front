"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { tokenKey } from "@/constants/token";

export const logout = async () => {
  cookies().delete(tokenKey);
  redirect("/");
};
