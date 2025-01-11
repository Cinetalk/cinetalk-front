import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

import Button from "@/components/buttons/Button";
import ROUTES from "@/constants/routes";
import { authAPIS } from "@/services/auth/authAPIs";
import { revalidateMyPage } from "@/services/my/actions";

import { FullLogo } from "../../../../../public/images";
import SignUpBirth from "./SignUpBirth";
import SignUpGender from "./SignUpGender";
import SignUpNickname from "./SignUpNickname";
import SignUpTitle from "./SignUpTitle";

interface SignUpProps {
  userInfo: UserInfo;
}

interface UserInfo {
  nickname: string;
  birthday: string;
  gender: string;
}

export default function SignUp({ userInfo }: SignUpProps) {
  const year = userInfo.birthday.split("").slice(0, 4).join("");
  const month = userInfo.birthday.split("").slice(5, 7).join("");
  const day = userInfo.birthday.split("").slice(8, 10).join("");
  const router = useRouter();
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [birthValues, setBirthValues] = useState({
    year: year,
    month: month,
    day: day,
  });
  const [gender, setGender] = useState(userInfo.gender);
  const [nickError, setNickError] = useState(false);
  const [birthError, setBirthError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { year, month, day } = birthValues;
      const birthday = `${year}-${month}-${day}`;
      const { res } = await authAPIS.signUp(nickname, gender, birthday);

      if (res.ok) {
        setTimeout(() => {
          router.push(`${ROUTES.SIGN_UP_COMPLETE}?nickname=${nickname}`);
        }, 500);
      }
      revalidateMyPage("user");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[99] min-h-[100vh] w-full overflow-y-auto bg-BG Tablet:flex Tablet:items-center">
      <form
        onSubmit={handleSubmit}
        className="mx-5 flex h-full flex-col Tablet:mx-auto Tablet:h-auto Tablet:w-[504px] Tablet:rounded-xl Tablet:bg-D1_Gray Tablet:px-[72px] Tablet:py-[64px] Laptop:w-[464px] Laptop:px-[52px] Laptop:py-10 Desktop:w-[504px] Desktop:px-[72px] Desktop:py-[64px]"
      >
        <Image
          unoptimized
          src={FullLogo}
          alt="logo"
          className="mx-auto hidden h-[34px] w-[204px] Tablet:block"
        />
        <div className="mt-11 Tablet:mt-10 Laptop:mt-6 Desktop:mt-10">
          <SignUpTitle />
          <SignUpNickname
            userInfo={userInfo}
            nickname={nickname}
            setNickname={setNickname}
            nickError={nickError}
            setNickError={setNickError}
          />
          <SignUpBirth
            birthValues={birthValues}
            setBirthValues={setBirthValues}
            birthError={birthError}
            setBirthError={setBirthError}
          />
          <SignUpGender gender={gender} setGender={setGender} />
          <p className="mt-2 text-[12px] font-normal leading-[140%] text-Gray">
            수집된 정보는 씨네톡 내 유저 통계 기반 영화 추천의 용도로 수집되며
            씨네톡 외 다른 곳에는 일절 사용되지 않습니다.{" "}
          </p>
        </div>

        <Button
          disabled={nickError || birthError}
          type="submit"
          size="lg"
          variant="orange"
          className="fixed bottom-0 left-0 mt-6 w-full Tablet:static Tablet:mt-10 Laptop:mt-6 Desktop:mt-10"
        >
          회원가입
        </Button>
      </form>
    </div>
  );
}
