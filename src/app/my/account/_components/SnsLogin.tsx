import Image from "next/image";

import { LogoutButton } from "@/app/my/_components/buttons";
import { myAPIs } from "@/services/my/myAPIs";

import { Kakao, Naver } from "../../../../../public/icons";

export default async function SnsLogin() {
  const user = await myAPIs.getUser();
  return (
    <div className="flex items-center gap-3 rounded-xl bg-D1_Gray px-4 py-2 Text-s-Medium Tablet:px-8 Tablet:py-4 Tablet:Text-m-Medium">
      <div className="flex flex-1 items-center gap-4">
        <div
          className={`my-1 flex h-8 w-8 items-center justify-center rounded-lg Tablet:my-0 Tablet:h-10 Tablet:w-10 ${user.provider === "kakao" ? "bg-Kakako" : "bg-Naver"}`}
        >
          <Image
            unoptimized
            alt={user.provider}
            src={user.provider === "kakao" ? Kakao : Naver}
          />
        </div>
        <span className="">
          {user.provider === "kakao" ? "카카오" : "네이버"} 계정 연동 중
        </span>
      </div>
      <LogoutButton />
    </div>
  );
}
