import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import HoverPostCard from "@/app/(main)/_components/HoverPostCard";
import Button from "@/components/buttons/Button";
import SmallBadge from "@/components/smallBadge/SmallBadge";
import ROUTES from "@/constants/routes";
import { getTmdbPosterUrl } from "@/utils/tmdb";

import {
  ChatFillGraySm,
  ChevronRightSilverMd,
  EditPencilLineFill,
  StarFillSm,
  ThumbsUpFillLGraySm,
  ThumbsUpFillSm,
} from "../../../../../../public/icons";
import { ChevronLeftMd } from "../../../../../../public/icons";
import { ProfileBlue } from "../../../../../../public/images";

interface ReviewUsersProps {
  selectedReviewer: MovieReviewRecommed;
}

export default function SlimilarPost({ selectedReviewer }: ReviewUsersProps) {
  const swiperRef = useRef<SwiperClass>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <div className="flex flex-col gap-5 rounded-[20px] bg-D1_Gray p-5 Laptop:gap-4 Laptop:p-6 Laptop:pb-7">
      <div className="hidden Text-xl-Bold Laptop:flex">
        {selectedReviewer.nickname}님의 최근 톡
      </div>
      <div className="flex flex-col gap-2 Laptop:hidden">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              className="rounded-full object-cover"
              fill
              alt="유저 프로필"
              src={
                selectedReviewer?.profile
                  ? `data:image/png;base64,${selectedReviewer.profile}`
                  : ProfileBlue
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="Text-s-Medium ">{selectedReviewer?.nickname}</p>
            <div className="flex items-center gap-2 text-Gray_Orange Text-s-Medium">
              <span className="flex items-center gap-1">
                <Image
                  width={16}
                  height={16}
                  src={EditPencilLineFill}
                  alt="글 쓰기"
                />
                {selectedReviewer?.reviewCount}
              </span>
              <div className="h-4 w-px bg-D2_Gray" />
              <span className="flex items-center gap-1">
                <Image src={ThumbsUpFillSm} alt="좋아요" className="h-4 w-4" />
                {selectedReviewer.rateCount ?? 0}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          {selectedReviewer?.badges.map((badge) => (
            <SmallBadge
              key={badge.badge_id}
              content={badge.badge_name}
              size="sm"
            />
          ))}
        </div>
      </div>
      <div className="group/swiper relative -mr-5 Laptop:mr-0">
        <Swiper
          onSlideChange={(swiper) => {
            setIsEnd(swiper.isEnd);
            setIsBeginning(swiper.isBeginning);
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsEnd(swiper.isEnd);
            setIsBeginning(swiper.isBeginning);
          }}
          slidesPerView="auto"
          breakpoints={{
            0: { spaceBetween: 8, slidesOffsetAfter: 20 },
            768: { spaceBetween: 16, slidesOffsetAfter: 20 },
            1280: { spaceBetween: 20, slidesOffsetAfter: 0 },
            1920: { spaceBetween: 24, slidesOffsetAfter: 0 },
          }}
        >
          {selectedReviewer.reviews.map((review) => {
            return (
              <SwiperSlide className="group w-fit" key={review.review_id}>
                <Link
                  href={`${ROUTES.DETAIL}/${review.movie_id}`}
                  className="flex w-[156px] flex-col gap-1 Tablet:w-[165px] Laptop:w-[174px] Laptop:gap-2 Desktop:w-[240px]"
                >
                  <div className="relative h-[230px] overflow-hidden rounded-xl Tablet:h-[240px] Laptop:h-[260px] Laptop:cursor-pointer Desktop:h-[360px]">
                    <Image
                      className="object-cover group-hover:Laptop:blur-[3px]"
                      fill
                      alt={review.movienm}
                      src={
                        review.poster_id
                          ? getTmdbPosterUrl("w780", review.poster_id)
                          : "/images/ssikongi/PNG/NoImage.png"
                      }
                    />
                    <div className="absolute h-full w-full bg-gradient-to-t from-[#1E1E1ECC] Laptop:hidden" />
                    <div className="absolute  flex h-full w-full flex-col justify-end gap-1 p-3 Laptop:hidden">
                      <div className="flex items-center justify-between gap-1 overflow-hidden text-Gray_Orange">
                        <p className="line-clamp-1 Text-xs-Regular Tablet:Text-m-Regular">
                          {review.movienm}
                        </p>
                        <div className="flex shrink-0 items-center justify-center gap-[2px] text-Silver Text-s-Bold">
                          <Image
                            src={StarFillSm}
                            alt="평점 별"
                            className="h-4 w-4"
                          />
                          <span className="Text-s-Bold ">{review.star}</span>
                        </div>
                      </div>
                      <div className="flex h-[42px] items-center">
                        <div className="line-clamp-2 Text-s-Regular Tablet:Text-m-Regular">
                          {review.content}
                        </div>
                      </div>
                    </div>
                    <HoverPostCard
                      movie={{
                        content: review.content,
                        likeCount: review.rateCount,
                        regDate: review.regDate,
                        rereviewCount: review.rereviewCount,
                        StarAvg: review.star,
                      }}
                    />
                  </div>
                  <div className="hidden Text-m-Medium Laptop:flex">
                    <p className="line-clamp-1">{review.movienm}</p>
                  </div>
                  <div className="flex justify-end gap-2 text-L_Gray Text-xs-Regular Laptop:hidden">
                    <div className="flex items-center gap-1">
                      <Image src={ThumbsUpFillLGraySm} alt="좋아요" />
                      <span>{review.rateCount}</span>
                    </div>
                    <div className="flex items-center gap-1 ">
                      <Image src={ChatFillGraySm} alt="톡" />
                      <span className="text-L_Gray">
                        {review.rereviewCount}
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {!isBeginning && (
          <Button
            className=" absolute -left-[24px] top-1/2 z-[9] hidden -translate-y-1/2 group-hover/swiper:Laptop:block"
            variant={"arrow1"}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <Image src={ChevronLeftMd} alt="왼쪽 네비게이션" />
          </Button>
        )}
        {!isEnd && (
          <Button
            className="absolute -right-[24px] top-1/2 z-[9] hidden -translate-y-1/2 group-hover/swiper:Laptop:block"
            variant={"arrow1"}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <Image src={ChevronRightSilverMd} alt="오른쪽 네비게이션" />
          </Button>
        )}
      </div>
    </div>
  );
}
