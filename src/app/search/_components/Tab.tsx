"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";

import useQueryString from "@/app/search/_hooks/useQueryString";
import useDevice from "@/hooks/useDevice";

export default function Tab({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tabsRef = useRef<HTMLDivElement>(null);
  const { device } = useDevice();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");
  // const [widths, setWidths] = useState<(number | undefined)[]>([]);
  // const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // const { device } = useDevice();

  // useEffect(() => {
  //   const newWidths = buttonRefs.current.map((button) => button?.scrollWidth);
  //   setWidths(newWidths);
  // }, [tabs, device]);

  return (
    <div
      ref={tabsRef}
      className="relative max-h-[40px] w-fit select-none text-md"
    >
      {children}
      {/* <div
        style={
          activeTab === children.
            ? {
                transform: `translateX(${(widths[0] as number) / 2 - 10}px)`,
              }
            : activeTab === tabs[1]
              ? {
                  transform: `translateX(${(widths[1] as number) / 2 + (widths[0] as number) - 10}px)`,
                }
              : {
                  transform: `translateX(${(widths[2] as number) / 2 + (widths[0] as number) + (widths[1] as number) - 10}px)`,
                }
        }
        className="absolute bottom-[3px] h-0.5 w-5 bg-Primary transition-all duration-300 ease-out"
      /> */}
    </div>
  );
}

export function TabButton({
  children,
  isDefault = false,
}: {
  children: React.ReactNode;
  isDefault?: boolean;
}) {
  const { query, tab } = useQueryString();
  const tabName = children?.toString().split(" ")[0];
  const isActiveTab = !tab ? isDefault : tab === tabName;
  return (
    <Link
      className={`px-3 pb-2 pt-1 Text-m-Bold Laptop:Text-l-Bold ${isActiveTab ? "text-Silver" : "text-Gray"}`}
      href={{ query: { tab: tabName, query } }}
    >
      {children}
    </Link>
  );
}
