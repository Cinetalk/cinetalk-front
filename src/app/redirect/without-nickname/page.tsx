"use client";

import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import useLogin from "@/hooks/useLogin";

import SignUp from "./_components/SignUp";

export default function WithoutNickNameRedirect() {
  const { isLoading, userInfo } = useLogin("without-nickname");
  return (
    <div>
      {isLoading ? (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner size="3xl" color="primary" />
        </div>
      ) : (
        <SignUp userInfo={userInfo} />
      )}
    </div>
  );
}
