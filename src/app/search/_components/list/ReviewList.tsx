import clsx from "clsx";
import Image from "next/image";

import SearchListHeader from "@/app/search/_components/list/Header";
import SearchPlaceholder from "@/app/search/_components/placeholders/SearchPlaceholder";
import useDeviceLimits from "@/app/search/_hooks/useDeviceLimits";
import useQueryString from "@/app/search/_hooks/useQueryString";

import { StarFillSm } from "../../../../../public/icons";

interface SearchReviewListProps {
  reviews: ReviewResult[];
  relatedKeywords: string[];
}

export default function SearchReviewList({
  reviews,
  relatedKeywords,
}: SearchReviewListProps) {
  const { query, tab } = useQueryString();
  const sortedMovieList = useDeviceLimits<ReviewResult>({
    category: "talk",
    data: reviews,
  });
  const data = tab === "전체" ? sortedMovieList : reviews;

  const highlightedText = (text: string, query: string | null) => {
    if (!query) return text;
    if (text.includes(query)) {
      const parts = text.split(new RegExp(`(${query})`, "gi"));
      return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span className="Text-m-Bold" key={index}>
            {part}
          </span>
        ) : (
          part
        ),
      );
    }

    return text;
  };

  if (tab === "영화") return null;
  return (
    <div className="flex flex-col gap-3 Tablet:gap-2 Laptop:gap-5">
      <SearchListHeader category="톡" length={reviews?.length} />
      <div
        className={clsx(
          reviews?.length &&
            "flex flex-col gap-3 Tablet:grid Tablet:grid-cols-2 Tablet:gap-5 Laptop:grid-cols-3 Desktop:grid-cols-4",
        )}
      >
        {reviews?.length ? (
          data.map((talk) => (
            <div
              key={talk.reviewDTO.id}
              className="flex flex-col gap-2 rounded-xl bg-D1_Gray p-4 Tablet:gap-3 Tablet:px-7 Tablet:py-6"
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    alt={talk.userDTO.nickname}
                    width={24}
                    height={24}
                    src={"/images/detail/default_profile2.png"}
                  />
                  <span className="text-Silver Text-s-Medium">
                    {talk.userDTO.nickname}
                  </span>
                </div>
                <div className="flex items-center">
                  <Image
                    alt="profile_image"
                    width={16}
                    height={16}
                    src={StarFillSm}
                  />
                  <span className="Text-xs-Regular Tablet:Text-s-Bold">
                    {talk.reviewDTO.star}
                  </span>
                </div>
              </div>
              <div className="hidden h-[1px] w-full bg-D2_Gray Tablet:block" />
              <div className="line-clamp-4 break-words text-Gray_Orange Text-s-Regular Tablet:line-clamp-4 Tablet:Text-m-Regular">
                {highlightedText(talk.reviewDTO.content, query)}
              </div>
              <div className="text-L_Gray Text-s-Regular Tablet:Text-m-Medium">
                {talk.reviewDTO.movienm} · {talk.reviewDTO.createdAt}
              </div>
            </div>
          ))
        ) : (
          <SearchPlaceholder isAlone relatedKeywords={relatedKeywords} />
        )}
      </div>
    </div>
  );
}
