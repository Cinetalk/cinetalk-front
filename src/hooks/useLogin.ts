import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { authAPIS } from "@/services/auth/authAPIs";
import useLoggedInStore from "@/stores/useLoggedIn";
import tokenManager from "@/utils/tokenManager";

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
          if (accessToken) tokenManager.setToken(accessToken);
          setLoggedIn(true);

          if (type === "with-nickname") router.push(prevPage);
          else {
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
