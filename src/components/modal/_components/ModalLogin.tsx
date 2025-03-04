import Image from "next/image";

import { useModalContext } from "@/components/modal/ModalContext";
import SpeechBubble from "@/components/speechBubble/SpeechBubble";

import { CloseLg, Kakao, Naver } from "../../../../public/icons";
import { FullLogo } from "../../../../public/images";
interface ModalLoginProps {
  onKakaoLogin: () => void;
  onNaverLogin: () => void;
}

export default function ModalLogin({
  onKakaoLogin,
  onNaverLogin,
}: ModalLoginProps) {
  const lastSocialLogin = localStorage.getItem("lastSocialLogin");
  const { onClose } = useModalContext();

  return (
    <div className="flex flex-col gap-7 Tablet:relative">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-1 top-0 w-fit p-2 Tablet:-right-6 Tablet:-top-12"
      >
        <Image unoptimized src={CloseLg} alt="닫기" width={24} height={24} />
      </button>
      <div className="relative flex h-[34px] justify-center">
        <Image
          unoptimized
          src={FullLogo}
          alt="씨네톡 로고"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-9">
        <p>로그인하고 더 자유롭게 씨네톡을 사용하세요 :)</p>
        <div className="mt-[167px] flex flex-col gap-6 Tablet:mt-0">
          <div className="relative">
            <button
              type="button"
              onClick={onKakaoLogin}
              className="flex h-12 w-[320px] items-center  justify-center gap-4 rounded-xl bg-Kakako text-[#000000d9] Text-m-Medium Tablet:w-[360px]"
            >
              <Image
                unoptimized
                src={Kakao}
                alt="카카오"
                width={18}
                height={18}
              />
              카카오로 시작하기
            </button>
            {lastSocialLogin === "kakao" && (
              <div className="absolute bottom-[41px] z-10 flex w-full justify-center">
                <SpeechBubble id={null} dir="bottom">
                  마지막에 로그인 했어요!
                </SpeechBubble>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={onNaverLogin}
              className="flex h-12 w-[320px] items-center justify-center gap-4 rounded-xl bg-Naver text-White Text-m-Medium Tablet:w-[360px]"
            >
              <Image
                unoptimized
                src={Naver}
                alt="네이버"
                width={16}
                height={16}
              />
              네이버로 시작하기
            </button>
            {lastSocialLogin === "naver" && (
              <div className="absolute bottom-[41px] z-10 flex w-full justify-center">
                <SpeechBubble id={null} dir="bottom">
                  마지막에 로그인 했어요!
                </SpeechBubble>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
