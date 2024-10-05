import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import ROUTES from "@/constants/routes";
import { getTmdbPosterUrl } from "@/utils/tmdb";

import { Check } from "../../../../public/icons";
import { NoImageSsikongi } from "../../../../public/images";

interface BookmarkItemProps {
  movie: Bookmark;
  isSelected: boolean;
  onAddBookmark: (movieId: number) => void;
}

export function BookMarkDefaultItem({
  movie,
}: Pick<BookmarkItemProps, "movie">) {
  return (
    <Link
      href={`${ROUTES.DETAIL}/${movie.movie_id}`}
      className="relative h-[230px] w-full overflow-hidden rounded-xl Tablet:h-[288px] Laptop:h-[331px]"
    >
      <Image
        fill
        src={
          movie.poster_path
            ? getTmdbPosterUrl("w500", movie.poster_path)
            : NoImageSsikongi
        }
        alt={`${movie.id}의 영화 포스터`}
        className={"object-cover"}
      />
    </Link>
  );
}

export function BookmarkEditItem({
  movie,
  isSelected,
  onAddBookmark,
}: BookmarkItemProps) {
  return (
    <button
      onClick={() => onAddBookmark(movie.id)}
      key={movie.id}
      type="button"
      className={clsx(
        isSelected && "outline outline-2 outline-Primary Tablet:outline-4",
        `relative h-[230px] w-full overflow-hidden rounded-xl Tablet:h-[288px] Laptop:h-[331px]`,
      )}
    >
      <Image
        fill
        src={
          movie.poster_path
            ? getTmdbPosterUrl("w500", movie.poster_path)
            : NoImageSsikongi
        }
        alt={`${movie.id}의 영화 포스터`}
        className={clsx(isSelected && "brightness-50", `object-cover`)}
      />
      {isSelected && (
        <div className="absolute right-2 top-2 rounded-lg bg-Primary">
          <Image src={Check} width={24} height={24} alt="선택 표시 아이콘" />
        </div>
      )}
    </button>
  );
}
