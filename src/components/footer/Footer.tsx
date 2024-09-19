"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import useInput from "@/hooks/useInput";
import { movieAPIs } from "@/services/movie/movieAPIs";

export default function Footer() {
  const [FeedbackPost, setFeedBackPost] = useInput("");
  const [Commnets, setCommnets] = useState(0);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // 실제 API 호출로 `movieAPIs.getHidingPiece`를 대체합니다.
        const response = await movieAPIs.getMovieReviewComments();
        setCommnets(response);
      } catch (error) {
        console.error("영화를 가져오는 중 오류 발생:", error);
      }
    };

    fetchMovie();
  }, []);
  const FeedBackSubmit = () => {
    movieAPIs.postFeedBack(FeedbackPost);
  };
  return (
    <div className="Desktop: flex flex-col gap-7 bg-Black px-7  py-11 text-white Tablet:gap-[52px] Desktop:gap-[52px] Desktop:px-[180px] Desktop:py-[90px]">
      <div className="flex flex-col items-center gap-[24px]">
        <h1 className="text-regular Text-m-Bold  Laptop:Text-xl-Bold">
          지금까지 총<span className="text-Primary"> {Commnets} </span> 개의
          톡이 쌓였어요!
        </h1>
        <div className="flex flex-1 justify-between gap-2 rounded-xl bg-D1_Gray py-2 pl-4 pr-3 Text-s-Regular Tablet:w-[512px] Desktop:w-[512px]">
          <input
            placeholder="개선할점이있나요? 피드백 해주세요 ;)"
            className="flex-1 bg-transparent   text-white placeholder:text-Gray "
            value={FeedbackPost}
            onChange={setFeedBackPost}
          />
          <button
            className="rounded bg-D2_Gray  px-3 py-1 text-Gray "
            onClick={FeedBackSubmit}
          >
            보내기
          </button>
        </div>
      </div>
      <hr className="" />
      <div className="flex flex-col gap-5 text-Gray">
        <div className="flex flex-col items-center gap-3 Laptop:flex-row Laptop:gap-8">
          <div className="flex items-center  gap-4 Text-xs-Regular">
            <span>문의</span>
            <a
              className="inline-block py-2 underline"
              href="http://pf.kakao.com/_xmWUxmG"
              target="_blank"
            >
              카카오톡 1:1 오픈 채팅방
            </a>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="Text-s-Bold">버터구이오징어</span>
          <div className="border-r-[1px] border-Gray" />
          <span className="Text-s-Bold">Front-End</span>
          <div className="flex gap-3 Text-s-Medium">
            <span>김범수</span>
            <span>이상원</span>
            <span>전병규</span>
          </div>
          <div className="border-r-[1px] border-Gray" />
          <span className="Text-s-Bold">Back-End</span>
          <div className="flex gap-3 Text-s-Medium">
            <span>깁태욱</span>
            <span>정동훈</span>
          </div>

          <div className="border-r-[1px] border-Gray" />
          <span className="Text-s-Bold">UXUI</span>
          <div className="flex gap-3 Text-s-Medium">
            <span>깁호산나</span>
          </div>
        </div>
        <span className="Text-s-Medium">
          Copyright ⓒ 2024 cinetalk. All rights reserved
        </span>
      </div>
    </div>
  );
}
