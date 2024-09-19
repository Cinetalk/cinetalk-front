"use client";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ThumbsUpFillSm } from "@/../public/icons";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";

import PostCard from "../../PostCard";
interface Mobile_BestMoiveProps {
  MovieData: Movie_TopTen | null;
}
export default function Mobile_BestMovie(MovieData: Mobile_BestMoiveProps) {
  if (MovieData == null) {
    return <LoadingSpinner size="sm" color="primary" />;
  }
  return (
    <div className="flex Tablet:hidden">
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        className="mySwiper"
        modules={[Pagination]}
      >
        {Array.isArray(MovieData.MovieData) && MovieData.MovieData.length > 0
          ? MovieData.MovieData.map((MovieDetailData, index) => {
              return (
                <SwiperSlide key={index} style={{ width: "238px" }}>
                  <div className="flex w-[238px] flex-col gap-4  rounded-xl bg-Black pb-4 ">
                    <PostCard
                      num={index + 1}
                      background={MovieDetailData.poster_path}
                    />
                    <div className="flex flex-col gap-2 px-4">
                      <div className="Text-xs-Re gular flex   justify-between">
                        <div className="flex items-center rounded bg-Primary px-1 text-White">
                          Best
                        </div>
                        <div className="flex items-center justify-center gap-1 text-L_Gray">
                          <Image
                            src={ThumbsUpFillSm}
                            alt="white_ start"
                            className="h-4 w-4"
                          />
                          <span>{MovieDetailData.reviewList[0].likeCount}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle cx="12" cy="12" r="12" fill="#D9D9D9" />
                        </svg>
                        <span className="line-clamp-1 Text-s-Regular">
                          {MovieDetailData.reviewList[0].content}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          : ""}
      </Swiper>
    </div>
  );
}
