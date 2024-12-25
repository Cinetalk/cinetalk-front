"use client";
import Image from "next/image";
import Link from "next/link";

import { movieLines } from "@/app/not-found";

import { FullLogo } from "../../public/images";

export default function Error() {
  const randomNumber = Math.floor(Math.random() * movieLines.length);
  const movieLine = movieLines[randomNumber];

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-BG">
      <div className="flex flex-col items-center gap-[64px]">
        <div className="relative h-8 w-48 Tablet:h-11 Tablet:w-[264px]">
          <Image
            unoptimized
            src={FullLogo}
            alt="cinetalk logo"
            className=""
            fill
          />
        </div>
        <div className="flex flex-col items-center gap-7">
          <p className="text-center text-Primary Text-l-Bold Tablet:Text-xxl-Bold Desktop:Text-xxxl-Bold">
            서버 에러가 발생했어요.
          </p>
          <p className="text-center Text-s-Medium Tablet:Text-m-Medium Desktop:Text-l-Medium">
            서버 내부 사정으로 인한 오류로 접속이 불가능합니다. <br />
            잠시 후, 다시 이용해 주세요.
          </p>
          <section className="flex flex-col gap-2">
            <p className="text-center text-L_Gray Text-xs-Regular">
              {movieLine.line.eng} <br />
              {movieLine.line.kor}
            </p>
            <p className="text-center text-L_Gray Text-xs-Regular">
              {movieLine.movie}
            </p>
          </section>
        </div>
        <section className="flex w-full flex-col gap-3 Tablet:gap-8">
          <section className="flex justify-center gap-3 Tablet:gap-4">
            <p className="text-Gray Text-s-Medium">문의</p>
            <Link
              target="_blank"
              href="http://pf.kakao.com/_xmWUxmG"
              className="text-Gray underline Text-s-Medium"
            >
              씨네톡 카카오톡 채널
            </Link>
          </section>
        </section>
      </div>
    </div>
  );
}
