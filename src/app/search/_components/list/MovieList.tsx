import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import SearchListHeader from "@/app/search/_components/list/Header";
import SearchPlaceholder from "@/app/search/_components/placeholders/SearchPlaceholder";
import useDeviceLimits from "@/app/search/_hooks/useDeviceLimits";
import ROUTES from "@/constants/routes";
import useSearchTabStore from "@/stores/useTabStore";
import { getTmdbPosterUrl } from "@/utils/tmdb";

interface SearchMovieListProps {
  movies: MovieResult[];
  relatedKeywords: string[];
}

export default function SearchMovieList({
  movies,
  relatedKeywords,
}: SearchMovieListProps) {
  const { activeSearchTab } = useSearchTabStore();
  const sortedMovieList = useDeviceLimits<MovieResult>({
    category: "movie",
    data: movies,
  });
  const data = activeSearchTab === "전체" ? sortedMovieList : movies;
  if (activeSearchTab.includes("톡")) return null;
  return (
    <div className="flex flex-col gap-3 Tablet:gap-2 Laptop:gap-5">
      <SearchListHeader category="영화" length={movies?.length} />
      <div
        className={clsx(
          movies?.length &&
            "grid grid-cols-2 gap-2 Tablet:grid-cols-3 Tablet:gap-5 Laptop:grid-cols-6 Desktop:gap-6",
        )}
      >
        {movies.length ? (
          data.map((movie) => (
            <Link
              key={movie.id}
              href={`${ROUTES.DETAIL}/${movie.id}`}
              className="flex flex-col gap-1 Tablet:gap-2"
            >
              <div
                className={
                  "group relative h-[230px] overflow-hidden rounded-lg Tablet:h-[341px] Tablet:rounded-xl Laptop:h-[260px] Desktop:h-[360px]"
                }
              >
                <Image
                  className="object-cover group-hover:opacity-70 group-hover:blur-[3px]"
                  src={`${movie.poster_path ? getTmdbPosterUrl("w500", movie.poster_path) : "/images/ssikongi/PNG/NoImage.png"}`}
                  alt={`${movie.title} 포스터`}
                  fill
                />
                <div className="absolute z-[1] hidden px-5 py-7 text-Silver Text-m-Regular group-hover:flex Desktop:px-6 Desktop:py-8">
                  <p className="line-clamp-[7] break-all Tablet:line-clamp-[11] Laptop:line-clamp-[8] Desktop:line-clamp-[12]">
                    {movie.overview}
                  </p>
                </div>
              </div>
              <p className="line-clamp-1 text-Gray_Orange Text-s-Medium Tablet:Text-m-Medium">
                {movie.title}
              </p>
            </Link>
          ))
        ) : (
          <SearchPlaceholder isAlone relatedKeywords={relatedKeywords} />
        )}
      </div>
    </div>
  );
}
