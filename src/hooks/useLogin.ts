import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { revalidateUser, setAccessToken } from "@/services/auth/actions";
import { authAPIS } from "@/services/auth/authAPIs";
import { tokenManager } from "@/services/auth/tokenManager";
import useLoggedInStore from "@/stores/useLoggedIn";

export default function useLogin(type: "with-nickname" | "without-nickname") {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    birthday: "",
    gender: "",
  });
  const { setLoggedIn } = useLoggedInStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setAuthToken(searchParams.get("authToken"));
      setPrevPage(sessionStorage.getItem("prev-page"));
    }
  }, []);

  useEffect(() => {
    const fetchLogin = async () => {
      if (authToken) {
        const { data, res } = await authAPIS.authBy(authToken);
        if (res.ok && prevPage) {
          const accessToken = res.headers.get("access");
          if (accessToken) {
            setAccessToken(accessToken);
            revalidateUser();
            tokenManager.setToken(accessToken);
            localStorage.setItem("lastSocialLogin", data.provider);
          }
          setTimeout(() => {
            setLoggedIn(true);
          }, 250);

          if (type === "with-nickname") {
            setTimeout(() => {
              router.push(prevPage);
            }, 500);
          } else {
            setUserInfo({
              nickname: data.nickname,
              birthday: data.birthday,
              gender: data.gender,
            });
            setIsLoading(false);
          }
        }
      }
    };
    fetchLogin();
  }, [authToken, router, prevPage, type, setLoggedIn]);

  return { isLoading, userInfo };
}
