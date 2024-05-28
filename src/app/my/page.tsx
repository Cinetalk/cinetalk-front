"use client";
import Image from "next/image";
import Link from "next/link";

import Badge from "@/app/my/_components/Badge";
import Nav from "@/app/my/_components/Nav";
import UserInfo from "@/app/my/_components/UserInfo";
import ROUTES from "@/constants/routes";

import { Archive, Bookmark, User } from "../../../public/icons";

export default function My() {
  return (
    <div className="">
      <UserInfo />
      <div className="h-3 rounded-[3px] bg-Black Tablet:hidden" />
      <Badge />
      <div className="border-b border-t border-D2_Gray Tablet:hidden">
        <div>
          <Link
            href={ROUTES.MY.default}
            className="flex w-full items-center gap-2 px-5 py-4"
          >
            <Image src={Archive} width={24} height={24} alt="내 활동" />
            <span className="Text-m-Medium">내 활동</span>
          </Link>
        </div>
        <div className="border-t border-D2_Gray">
          <Link
            href={ROUTES.MY.favorites()}
            className="flex w-full items-center gap-2 px-5 py-4"
          >
            <Image src={Bookmark} width={24} height={24} alt="찜한 작품" />
            <span className="Text-m-Medium">찜한 작품</span>
          </Link>
        </div>
        <div className="border-t border-D2_Gray">
          <Link
            href={ROUTES.MY.account()}
            className="flex w-full items-center gap-2 px-5 py-4"
          >
            <Image src={User} width={24} height={24} alt="개인 정보" />
            <span className="Text-m-Medium">개인 정보</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
