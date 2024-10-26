"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import SpeechBubble from "@/components/speechBubble/SpeechBubble";
import { getTmdbPosterUrl } from "@/utils/tmdb";

import { NoImageSsikongi } from "../../../../../../../public/images";
import PostRating from "../../../Rating/PostRating";
interface WatchMovieType {
  MovieWatchMovies: WatchMovie[];
}
export default function Tablet_Posts({ MovieWatchMovies }: WatchMovieType) {
  const [MovieNumber, setMovieNumber] = useState(0);
  const handleMovieList = () => {
    if (MovieWatchMovies.length == MovieNumber + 1) {
      return null;
    } else {
      setMovieNumber((prev) => prev + 1);
    }
  };
  return (
    <div>
      <div className="mx-auto  hidden  w-[537px]  items-center rounded-xl bg-D1_Gray Tablet:flex Laptop:hidden">
        <div className="flex   w-[537px] rounded-xl ">
          <Link href={`/detail/${MovieWatchMovies[MovieNumber].movieId}`}>
            <div className="flex justify-center">
              <Image
                height={280}
                width={200}
                className="rounded-xl"
                src={
                  MovieWatchMovies[MovieNumber].poster_path
                    ? getTmdbPosterUrl(
                        "original",
                        MovieWatchMovies[MovieNumber].poster_path,
                      )
                    : NoImageSsikongi
                }
                alt="영화 포스터"
              />
            </div>
          </Link>
          <div className=" flex w-[337px] flex-col items-center justify-center gap-8 px-5">
            <div className="flex flex-col items-center justify-center gap-2 ">
              <h1 className="Text-l-Medium">
                {MovieWatchMovies[MovieNumber].movienm}
              </h1>
              <div className="flex items-center gap-[10px] text-L_Gray Text-s-Regular">
                <span>{MovieWatchMovies[MovieNumber].release_date}</span>
                <div className="h-3 border-r-[1px] border-L_Gray" />
                <span>{MovieWatchMovies[MovieNumber].genres[0].name}</span>
              </div>
            </div>
            <div>
              <div className="flex " onClick={handleMovieList}>
                <PostRating
                  movienm={MovieWatchMovies[MovieNumber].movienm}
                  movieId={MovieWatchMovies[MovieNumber].movieId}
                  StarReview={true}
                />
              </div>
              <div className="mt-2">
                <SpeechBubble id={"WatchedMovie"} dir="top">
                  로그인 하고 별을 눌러 평가해보세요 :)
                </SpeechBubble>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden Tablet:flex Laptop:hidden">
        <button
          className="mx-auto mt-5 w-[392px] rounded-xl border-[1px] border-D2_Gray px-5 py-3 text-L_Gray Text-s-Regular  "
          onClick={handleMovieList}
        >
          아직 안봤어요
        </button>
      </div>
    </div>
  );
}
