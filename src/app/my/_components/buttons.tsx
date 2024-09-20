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
