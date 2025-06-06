"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import Button from "@/components/buttons/Button";
import { useToastActions } from "@/stores/useToast";
import { getTmdbPosterUrl } from "@/utils/image";

import {
  ChevronLeftMd,
  ChevronRightSilverMd,
} from "../../../../../../../public/icons";
import PostRating from "../../../Rating/PostRating";

interface WatchMovieType {
  MovieWatchMovies: WatchMovie[];
}

export default function Laptop_Posts({ MovieWatchMovies }: WatchMovieType) {
  const { add } = useToastActions();
  const [swiper, setSwiper] = useState<SwiperClass>();
  const handleToast = (text: string) => {
    add(text);
  };

  return (
    <>
      <div className="relative hidden w-full gap-[24px] rounded-xl Laptop:block">
        <Swiper
          breakpoints={{
            1280: { spaceBetween: 20 },
            1920: { spaceBetween: 24 },
          }}
          slidesPerView="auto"
          onSwiper={(e) => setSwiper(e)}
        >
          {MovieWatchMovies.map((movie) => {
            return (
              <SwiperSlide
                className=" flex flex-col gap-2 Laptop:w-[174px] Desktop:w-[240px]"
                key={movie.movieId}
              >
                <Link
                  className="group relative flex overflow-hidden rounded-xl Laptop:h-[260px] Laptop:w-[174px] Desktop:h-[360px] Desktop:w-[240px]"
                  href={`/detail/${movie.movieId}`}
                >
                  <div className="absolute z-10 hidden h-full flex-col bg-black/70 px-5 py-7  group-hover:flex Desktop:px-6 Desktop:py-8">
                    <p className="Laptop:line-clamp-[8] Desktop:line-clamp-[12]">
                      {movie.overview}
                    </p>
                  </div>
                  <Image
                    className="group-hover:blur-[3px]"
                    fill
                    sizes="240px"
                    alt={movie.movienm}
                    src={getTmdbPosterUrl("w780", movie.poster_path)}
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <p className="line-clamp-1 text-Gray_Orange Text-m-Medium">
                    {movie.movienm}
                  </p>
                  <div className="flex items-center justify-center">
                    <PostRating
                      movienm={movie.movienm}
                      movieId={movie.movieId}
                      StarReview={true}
                      handleMovieList={handleToast}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {!(swiper?.isBeginning && swiper?.isEnd) && (
        <div className="absolute right-0 top-0 hidden gap-1 Laptop:flex">
          <Button onClick={() => swiper?.slidePrev()} variant="arrow2">
            <Image src={ChevronLeftMd} alt="이전" />
          </Button>
          <Button onClick={() => swiper?.slideNext()} variant="arrow2">
            <Image src={ChevronRightSilverMd} alt="다음" />
          </Button>
        </div>
      )}
    </>
  );
}
