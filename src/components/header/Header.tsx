"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ROUTES from "@/constants/routes";
import useHeaderScrollThreshold from "@/hooks/useHeaderScrollThreshold";
import useRefresh from "@/hooks/useRefresh";
import getMyPageHeaderText from "@/utils/getMyPageHeaderText";

import { ChevronLeftMd } from "../../../public/icons";
import HeaderRightSection from "./headerRightSection/HeaderRightSection";
import Logo from "./Logo";

export default function Header() {
  const [clickSearchIcon, setClickSearchIcon] = useState(false);
  const pathname = usePathname();
  const { hasScrolledPast, setHasScrolledPast } = useHeaderScrollThreshold();
  const router = useRouter();
  useRefresh();

  useEffect(() => {
    if (pathname.includes(ROUTES.DETAIL)) {
      setHasScrolledPast(false);
    }
  }, [pathname, setHasScrolledPast]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setClickSearchIcon(false);
    };
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (clickSearchIcon) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [clickSearchIcon]);

  const { myPageHeaderText } = getMyPageHeaderText(pathname);

  return (
    <header
      className={`sticky top-0 z-10 h-[64px] Laptop:h-20 ${pathname.includes(ROUTES.DETAIL) ? (hasScrolledPast ? "bg-BG" : "bg-transparent") : "bg-BG"} ${pathname.includes(ROUTES.MY.default) && "border-b border-D2_Gray"} `}
    >
      <div className="relative mx-1 flex h-full items-center justify-between Tablet:mx-6 Laptop:mx-[52px]">
        {pathname !== ROUTES.MAIN && !clickSearchIcon && (
          <div className="flex items-center Tablet:hidden">
            <Image
              src={ChevronLeftMd}
              alt="뒤로 가기"
              onClick={() => router.back()}
              className="m-2 cursor-pointer"
            />
            <p className="text-[18px] font-Medium text-White">
              {myPageHeaderText}
            </p>
          </div>
        )}

        <Logo />

        <HeaderRightSection
          {...{ hasScrolledPast, clickSearchIcon, setClickSearchIcon }}
        />
      </div>
    </header>
  );
}
