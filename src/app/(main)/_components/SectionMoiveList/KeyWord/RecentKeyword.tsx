"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { movieAPIs } from "@/services/movie/movieAPIs";

import RightKeyWords from "./RightKeyWords";
export default function RecentKeyword() {
  const [MentionKeywords, setMentionKewords] = useState<MentionKeword[]>([]);
  const [KeywordListNumber, setKeywordListNumber] = useState<number>(0);
  const HandleKeywords = (index: number) => {
    setKeywordListNumber(index);
  };
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // 실제 API 호출로 `movieAPIs.getHidingPiece`를 대체합니다.
        const response = await movieAPIs.getMentionKeword();
        setMentionKewords(Array.isArray(response) ? response : [response]);
      } catch (error) {
        console.error("영화를 가져오는 중 오류 발생:", error);
      }
    };

    fetchMovie();
  }, []);
  if (!MentionKeywords) {
    return null;
  }
  return (
    <div className="flex flex-col gap-[20px]">
      <h1 className="Text-l-Bold Laptop:Text-xxl-Bold Desktop:Text-xxl-Bold">
        지금 많이 언급되는 키워드
      </h1>
      <div className="flex flex-col items-start gap-[24px]  Laptop:flex-row">
        <div className="flex Laptop:hidden">
          <Swiper slidesPerView="auto" spaceBetween={1}>
            {Array.isArray(MentionKeywords) && MentionKeywords.length > 0
              ? MentionKeywords.map((mention, index) => {
                  return (
                    <SwiperSlide key={index} style={{ width: "90px" }}>
                      <div
                        className={`Text-S-Bold  ${KeywordListNumber == index ? "bg-D1_Gray" : ""} w-[90px]  rounded-xl px-5 py-2 text-center`}
                        onClick={() => HandleKeywords(index)}
                      >
                        {mention.keyword}
                      </div>
                    </SwiperSlide>
                  );
                })
              : ""}
          </Swiper>
        </div>
        <div className="Text-S-Bold  hidden gap-3 Laptop:flex Laptop:flex-col Laptop:gap-5 ">
          {Array.isArray(MentionKeywords) && MentionKeywords.length > 0
            ? MentionKeywords.map((mention, index) => {
                return (
                  <div
                    key={index}
                    className={`Text-S-Bold  ${KeywordListNumber == index ? "bg-D1_Gray" : ""}  rounded-xl px-5 py-2 text-center Laptop:w-[178px] Desktop:w-[240px]`}
                    onClick={() => HandleKeywords(index)}
                  >
                    {mention.keyword}
                  </div>
                );
              })
            : ""}
        </div>
        {MentionKeywords ? (
          <RightKeyWords keywordInfo={MentionKeywords[KeywordListNumber]} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
