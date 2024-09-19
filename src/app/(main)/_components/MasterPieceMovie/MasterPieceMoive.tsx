"use client";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { HeartLineMd, StarFillMd } from "@/../public/icons";
import { movieAPIs } from "@/services/movie/movieAPIs";

import PostCard from "../PostCard";
export default function MasterPieceMoive() {
  const [MoviePiece, setMoviePiece] = useState<MovieHidingPiece | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await movieAPIs.getHidingPiece();
        setMoviePiece(response);
      } catch (error) {
        console.error("영화를 가져오는 중 오류 발생:", error);
      }
    };
    fetchMovie();
  }, []);
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-1">
        <h1 className="Desktop: Text-xxl-Bold Text-l-Bold Laptop:Text-xxl-Bold">
          씨네톡 속 숨겨진 명작
        </h1>
        <span className="text-L_Gray Text-m-Regular Laptop:hidden Desktop:hidden">
          리뷰수 대비 평점이 높은 작품들이에요
        </span>
      </div>

      <div className="flex  gap-2 Laptop:hidden ">
        <Swiper slidesPerView="auto" spaceBetween={20}>
          {Array.isArray(MoviePiece) && MoviePiece.length > 0
            ? MoviePiece.map((movie, index) => (
                <SwiperSlide key={index} style={{ width: "156px" }}>
                  <Link href={`detail/${movie.movieid}`}>
                    <div
                      className="flex h-[230px] w-[156px] items-end  justify-between rounded-xl  px-2 pb-2 Text-s-Bold Tablet:h-[240px] Tablet:w-[165px]"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.7) 70%), url('${movie?.movieposter ? movie?.movieposter : "/images/detail/detail-poster-example.png"}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <Image src={StarFillMd} alt="평점" />
                        <span>0.0</span>
                      </div>
                      <Image src={HeartLineMd} alt="빈 하트" />
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>

      <div className="hidden Laptop:flex">
        <Swiper
          slidesPerView="auto"
          spaceBetween={24}
          className="gap-5  Laptop:gap-5 Desktop:gap-6"
          modules={[Pagination]}
        >
          {Array.isArray(MoviePiece) && MoviePiece.length > 0
            ? MoviePiece.map((movie, index) => (
                <SwiperSlide key={index}>
                  <Link href={`detail/${movie.movieid}`}>
                    <div className="flex w-[174px] flex-col Desktop:w-[240px]">
                      <PostCard
                        StarPostType="StarPost"
                        StarRating={movie.star}
                        content={movie.content}
                        regDate={movie.regDate}
                        likeCount={movie?.likeCount}
                        reviewCount={movie?.rereviewCount}
                        background={movie?.movieposter}
                      />
                      <div className="mt-3  flex justify-between">
                        <div>
                          <span className="line-clamp-1">{movie.movienm}</span>
                        </div>
                        <div className="flex gap-1 Text-m-Medium">
                          <Image
                            src={StarFillMd}
                            alt="star"
                            className="h-6 w-6"
                          />
                          <span className="flex items-center justify-center">
                            {movie.StarAvg}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>
    </div>
  );
}
