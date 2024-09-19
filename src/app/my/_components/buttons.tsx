"use client";
import Button from "@/components/buttons/Button";
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
