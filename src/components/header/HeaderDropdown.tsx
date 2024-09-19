import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import Dropdown from "@/components/dropdown/dropdown";
import ROUTES from "@/constants/routes";
import { deleteAccessToken } from "@/services/auth/actions";
import useLoggedInStore from "@/stores/useLoggedIn";
import useScrollStore from "@/stores/useScrollStore";

import { CaretDownMd, LogOut, User } from "../../../public/icons";

export default function HeaderDropdown({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasScrolledPast = useScrollStore((state) => state.hasScrolledPast);
  const dropdownMenu = [
    { icon: User, content: "마이 페이지" },
    { icon: LogOut, content: "로그 아웃" },
  ];
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useLoggedInStore();

  const handleClickDropdown = (i: number) => {
    if (i === 0) router.push(ROUTES.MY.default);
    else if (i === 1) {
      logout();
      deleteAccessToken();
    }
  };

  return (
    <Dropdown type="icon">
      <Dropdown.Trigger>
        <div className="flex items-center">
          <div className="mr-3 h-[30px] w-[30px] rounded-full bg-[#d9d9d9]" />
          <p
            className={`mr-2 text-regular font-Medium ${pathname.includes(ROUTES.DETAIL) ? (hasScrolledPast ? "text-Silver" : "text-[rgba(255,255,255,0.6)]") : "text-Silver"}`}
          >
            {children}
          </p>
          <Image src={CaretDownMd} alt="더보기" className="cursor-pointer" />
        </div>
      </Dropdown.Trigger>
      <Dropdown.List>
        {dropdownMenu.map((m, i) => (
          <Dropdown.Item
            key={m.content}
            onClick={() => handleClickDropdown(i)}
            isFocused={m.content === "전체"}
          >
            <div className="flex items-center gap-2">
              <Image src={m.icon} alt={m.content} className="mr-2 h-6 w-6" />
              <p className="Text-m-Regular">{m.content}</p>
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
}
