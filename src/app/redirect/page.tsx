"use client";

import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import useLogin from "@/hooks/useLogin";

export default function Redirect() {
  useLogin("with-nickname");

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoadingSpinner size="3xl" color="primary" />
    </div>
  );
}
