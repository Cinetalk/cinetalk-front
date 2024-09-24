import clsx from "clsx";
import Image from "next/image";

import useQueryString from "@/app/search/_hooks/useQueryString";
import Button from "@/components/buttons/Button";

import { ChevronRightGrayMd } from "../../../../../public/icons";

interface SearchTitleProps {
  category: "영화" | "톡";
  length?: number;
}

export default function SearchListHeader({
  category,
  length,
}: SearchTitleProps) {
  const { query, tab } = useQueryString();
  return (
    <div
      className={clsx(
        `flex items-center justify-between ${tab === category && "hidden"}`,
      )}
    >
      <div className="flex Mobile:h-[37px] Tablet:h-[40px]">
        <h2 className="flex gap-2 Text-l-Bold">
          <strong>{category}</strong>
          <span className="inline-block ">{length}</span>
        </h2>
      </div>
      {tab === "전체" && length ? (
        <div className="">
          <Button
            href={{ query: { tab: category, query } }}
            variant={"textIconR"}
            className="h-fit text-Gray_Orange Text-s-Medium"
          >
            전체보기{" "}
            <Image
              className="Mobile:h-4 Mobile:w-4 Tablet:h-6 Tablet:w-6"
              src={ChevronRightGrayMd}
              alt="ChevronRightMd"
              width={16}
              height={16}
            />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
