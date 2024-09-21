"use client";

import { ButtonHTMLAttributes } from "react";

import Button from "@/components/buttons/Button";
import useDevice from "@/hooks/useDevice";
import { logout } from "@/services/my/actions";
import useLoggedInStore from "@/stores/useLoggedIn";

export function LogoutButton() {
  const handleLogout = useLoggedInStore((state) => state.logout);
  return (
    <Button
      variant={"text"}
      onClick={() => {
        logout();
        handleLogout();
      }}
    >
      로그아웃
    </Button>
  );
}

export function NicknameChangeButton({
  error,
  isEditing,
  children,
  ...props
}: {
  error: boolean;
  isEditing: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { isMobile } = useDevice();
  return (
    <Button
      {...props}
      focus={!error && isEditing ? "1" : "none"}
      size={!isMobile && isEditing && !error ? "md" : "none"}
      variant={!isMobile && isEditing && !error ? "orange" : "text"}
    >
      {children}
    </Button>
  );
}

export function BookmarkMobileButtons({
  selectedMovieIds,
  setSelectedMovieIds,
  onBookmarkDelete,
  loading,
}: {
  loading: boolean;
  selectedMovieIds: number[];
  onBookmarkDelete: () => Promise<void>;
  setSelectedMovieIds: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  return (
    <div className="fixed bottom-0 left-0 flex w-screen items-center border-t border-D2_Gray bg-D1_Gray py-[6px] pb-6 Text-m-Medium Tablet:hidden">
      <button
        type="button"
        disabled={!selectedMovieIds.length}
        className="flex-1 p-2 Text-m-Medium disabled:text-Gray"
        onClick={() => setSelectedMovieIds([])}
      >
        선택 해제
      </button>
      <button
        disabled={!selectedMovieIds.length || loading}
        type="button"
        onClick={onBookmarkDelete}
        className="flex-1 p-2 text-Error Text-m-Medium disabled:text-Gray"
      >
        삭제
      </button>
    </div>
  );
}
