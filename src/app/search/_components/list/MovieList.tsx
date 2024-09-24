import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import SearchListHeader from "@/app/search/_components/list/Header";
import SearchPlaceholder from "@/app/search/_components/placeholders/SearchPlaceholder";
import useDeviceLimits from "@/app/search/_hooks/useDeviceLimits";
import useQueryString from "@/app/search/_hooks/useQueryString";
import ROUTES from "@/constants/routes";

interface SearchMovieListProps {
  movies: MovieResult[];
  relatedKeywords: string[];
}

export default function SearchMovieList({
  movies,
  relatedKeywords,
}: SearchMovieListProps) {
  const { tab } = useQueryString();
  const sortedMovieList = useDeviceLimits<MovieResult>({
    category: "movie",
    data: movies,
  });
  const data = tab === "전체" ? sortedMovieList : movies;
  if (tab === "톡") return null;
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
            // {sortedMovieList?.length ? (
            //   sortedMovieList.map((movie) => (
            <Link
              key={movie.id}
              href={`${ROUTES.DETAIL}/${movie.id}`}
              className="flex flex-col gap-1 Tablet:gap-2"
            >
              <div
                className={clsx(
                  `relative h-[230px] overflow-hidden rounded-lg Tablet:h-[341px] Tablet:rounded-xl Laptop:h-[260px] Desktop:h-[360px] ${!movie.poster_path && "bg-[#D9D9D9]"}`,
                )}
              >
                {movie.poster_path && (
                  <Image
                    className="object-cover"
                    src={`${movie?.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "/images/detail/default_profile.png"}`}
                    alt={movie.title}
                    fill
                  />
                )}
              </div>
              <p className="text-Gray_Orange Text-s-Medium Tablet:Text-m-Medium">
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
