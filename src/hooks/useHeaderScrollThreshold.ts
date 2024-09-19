import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import ROUTES from "@/constants/routes";
import useScrollStore from "@/stores/useScrollStore";

import useDevice from "./useDevice";

export default function useHeaderScrollThreshold() {
  const pathname = usePathname();
  const setHasScrolledPast = useScrollStore(
    (state) => state.setHasScrolledPast,
  );
  const { device } = useDevice();

  const breakPointsMap: { [key: string]: number } = {
    mobile: 209,
    tablet: 252,
    laptop: 282,
    desktop: 356,
  };

  const breakPoints = breakPointsMap[device];

  useEffect(() => {
    if (!pathname.includes(ROUTES.DETAIL)) return;
    const initialScrollPosition = window.scrollY;
    if (initialScrollPosition > breakPoints) {
      setHasScrolledPast(true);
    }

    const handleScroll = () => {
      const position = window.scrollY;
      if (position > breakPoints) {
        setHasScrolledPast(true);
      } else if (position < breakPoints) {
        setHasScrolledPast(false);
      }
    };

    addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, [breakPoints, pathname, setHasScrolledPast]);

  useEffect(() => {
    if (pathname.includes(ROUTES.DETAIL)) {
      setHasScrolledPast(false);
    }
  }, [pathname, setHasScrolledPast]);
}
