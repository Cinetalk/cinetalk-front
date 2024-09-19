"use client";
import "swiper/css";
import "swiper/css/pagination";

import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import PostCard from "../../PostCard";
import SlimilarMobilePost from "./SlimilarMobilePost";
import SlimilarUser from "./SlimilarUser";

interface ReviewUsersProps {
  ReviewUsers: MovieReviewRecommed[];
  setPickUserNumber: Dispatch<SetStateAction<number>>;
  PickUserNumber: number;
  ChangePickNumber: (index: number) => void;
}

export default function SlimilarPost({
  ReviewUsers,
  setPickUserNumber,
  ChangePickNumber,
  PickUserNumber,
}: ReviewUsersProps) {
  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex flex-col gap-5 rounded-2xl bg-Black px-5 py-5 Tablet:bg-D1_Gray Laptop:hidden ">
        <SlimilarMobilePost
          UserPost={ReviewUsers}
          PickUserNumber={PickUserNumber}
        />
      </div>
      <div className=" hidden justify-between Laptop:flex">
        <Swiper
          slidesPerView="auto"
          spaceBetween={40}
          className="flex  rounded-xl px-[12px]  py-[24px]"
        >
          {Array.isArray(ReviewUsers) && ReviewUsers.length > 0
            ? ReviewUsers.map((ReviewUser, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className="w-[368px] Desktop:w-[372px]  "
                  >
                    <SlimilarUser
                      name={ReviewUser.nickname}
                      evaluate={ReviewUser.rateCount}
                      heart={ReviewUser.reviewCount}
                      value={PickUserNumber}
                      Badge={ReviewUser.badges}
                      ClickIndex={index}
                      onClick={() => ChangePickNumber(index)}
                    />
                  </SwiperSlide>
                );
              })
            : ""}
        </Swiper>
      </div>

      <div className="hidden flex-col gap-[16px] rounded-xl bg-D1_Gray p-[24px] text-white Laptop:flex Desktop:flex">
        <h1 className="Text-xl-Bold">닉네임님의 최근 톡</h1>
        <div className="flex gap-[24px]">
          <Swiper
            slidesPerView="auto"
            spaceBetween={20}
            className="flex  rounded-xl px-[12px]  py-[24px]"
          >
            {Array.isArray(ReviewUsers) &&
            ReviewUsers.length > 0 &&
            Array.isArray(ReviewUsers[PickUserNumber]?.reviews)
              ? ReviewUsers[PickUserNumber].reviews.map(
                  (_: PostreviewDTO, index: number) => {
                    return (
                      <SwiperSlide key={index} className="h-[292px] w-[174px]">
                        <Link href={`detail/${_.movie_id}`}>
                          <div className="flex flex-col">
                            <PostCard
                              content={_.content}
                              background={_.poster_id}
                              StarPostType="StarPost"
                              StarRating={_.star}
                              reviewCount={_.rereviewCount}
                              likeCount={_.rateCount}
                            />
                            <span className="line-clamp-1">{_.movienm}</span>
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  },
                )
              : ""}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
