"use client";
import dayjs from "dayjs";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  BestTalkFire,
  ChatLineLg,
  ChevronLeftMd,
  ChevronRightMd,
  StarFillMd,
  TmdbSm,
} from "@/../public/icons";

import { NoImageSsikongi } from "../../../../../../public/images";
import PostCard from "../../PostCard";
import Tablet_BestTalkPost from "./Post/Tablet_BestTalkPost";
interface Tablet_BestMoiveProps {
  MovieData: Movie_TopTen | null;
}

export default function Tablet_BestMoive(MovieData: Tablet_BestMoiveProps) {
  return (
    <div className="hidden  h-[344px] Tablet:flex Laptop:hidden">
      <Swiper slidesPerView="auto" spaceBetween={20} className="relative">
        {Array.isArray(MovieData.MovieData) && MovieData.MovieData.length > 0
          ? MovieData.MovieData.map((MovieDetailData, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className=" flex w-full gap-5">
                    {MovieDetailData.poster_path ? (
                      <PostCard background={MovieDetailData.poster_path} />
                    ) : (
                      <div>
                        <Image
                          src={NoImageSsikongi}
                          alt="포스터"
                          className="h-[358px] w-[238px] cursor-pointer rounded-xl Tablet:h-[344px] Tablet:w-[260px] Laptop:h-[260px] Laptop:w-[174px]  Desktop:h-[360px] Desktop:w-[240px]"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-between gap-3">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-3 ">
                          <h1 className="Text-l-Bold">
                            {MovieDetailData.movienm}
                          </h1>
                          <div className="flex items-center gap-[10px] Text-xs-Regular">
                            <span>
                              {dayjs(MovieDetailData.release_date).format(
                                "YYYY",
                              )}
                            </span>
                            <div className="h-3 border-[1px] border-L_Gray"></div>
                            <span>{MovieDetailData.genres[0].name}</span>
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="flex gap-1 Text-m-Medium">
                            <Image
                              src={TmdbSm}
                              alt="white_ start"
                              className="h-6 w-6"
                            />
                            <span>{MovieDetailData.tmdbrate.toFixed(1)}</span>
                          </div>
                          <div className="flex gap-1 Text-m-Medium">
                            <Image
                              src={StarFillMd}
                              alt="Primary_Start"
                              className="h-6 w-6"
                            />
                            <span>{MovieDetailData.rate.toFixed(1)}</span>
                          </div>
                          <div className="flex gap-1 Text-m-Medium">
                            <Image
                              src={ChatLineLg}
                              alt="ChatBox"
                              className="h-6 w-6"
                            />
                            <span>{MovieDetailData.reviewCount}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-col gap-3">
                          <div className="flex gap-1">
                            <Image
                              src={BestTalkFire}
                              alt="베스트"
                              className="h-6 w-6"
                            />
                            <h2 className="Text-m-Bold">베스트 톡</h2>
                          </div>
                          <div className="flex gap-4">
                            {MovieDetailData.reviewList.map(
                              (reviewData: MovieReviewDTO, index: number) => {
                                return (
                                  <Tablet_BestTalkPost
                                    key={index}
                                    star={reviewData.star}
                                    content={reviewData.content}
                                    likeCount={reviewData.likeCount}
                                    profileImg={reviewData.profile}
                                  />
                                );
                              },
                            )}
                          </div>
                        </div>
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
