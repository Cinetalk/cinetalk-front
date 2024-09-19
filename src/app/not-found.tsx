import Image from "next/image";
import Link from "next/link";

import Button from "@/components/buttons/Button";
import ROUTES from "@/constants/routes";

export const movieLines = [
  {
    line: {
      eng: "“We’ll find a way, we always have”",
      kor: "우리는 방법을 찾을거에요, 지금껏 그래왔으니까요.",
    },
    movie: "인터스텔라 (2014)",
  },
  {
    line: {
      eng: "“I’ll be back.”",
      kor: "다시 돌아올게.",
    },
    movie: "터미네이터 (1984)",
  },
  {
    line: {
      eng: "“To infinity and beyond!”",
      kor: "무한한 공간 저 너머로!",
    },
    movie: "토이 스토리 (1995)",
  },
  {
    line: {
      eng: "“May the Force be with you.”",
      kor: "포스가 함께 하기를.",
    },
    movie: "스타워즈 (1977)",
  },
];

interface MovieLine {
  line: Line;
  movie: string;
}

interface Line {
  eng: string;
  kor: string;
}

export default async function NotFound() {
  const randomNumber = Math.floor(Math.random() * 4);

  const movieLinesMap: { [key: number]: MovieLine } = {
    0: movieLines[0],
    1: movieLines[1],
    2: movieLines[2],
    3: movieLines[3],
  };

  const movieLine = movieLinesMap[randomNumber];

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-BG">
      <div className="flex w-80 flex-col items-center gap-[64px] Tablet:w-[360px]">
        <Image
          src=""
          alt="로고"
          className="h-[40px] w-[150px] bg-[#d9d9d9] Tablet:h-[58px] Tablet:w-[218px]"
        />

        <section className="flex flex-col items-center gap-7">
          <p className="text-center text-Primary Text-l-Bold Tablet:Text-xxl-Bold Desktop:Text-xxxl-Bold">
            404 Error <br /> 어랏! 잘못된 접근이에요.
          </p>
          <p className="Text-s-Medium Tablet:Text-m-Medium Desktop:Text-l-Medium">
            존재하지 않는 페이지 입니다.
            <br /> 올바른 주소를 입력해주세요.
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
        </section>
        <section className="flex w-full flex-col gap-3 Tablet:gap-8">
          <Button
            href={ROUTES.MAIN}
            variant="orange"
            size="xl"
            className="w-full Text-s-Medium Tablet:Text-m-Medium Desktop:Text-l-Medium"
          >
            홈으로 돌아가기
          </Button>
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
