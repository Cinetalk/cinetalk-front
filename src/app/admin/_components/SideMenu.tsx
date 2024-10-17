"use client";
import Link from "next/link";
import { useState } from "react";

export default function SideMenu() {
  const [UserToggle, setUserToggle] = useState(false);
  const [MovieToggle, setMovieToggle] = useState(false);
  const HandleUserToggle = () => {
    setUserToggle((prev) => !prev);
  };
  const HandleMovieToggle = () => {
    setMovieToggle((prev) => !prev);
  };
  return (
    <nav className="fixed h-screen border-r border-D2_Gray">
      <ul className="flex flex-col gap-5 p-5 text-Black transition-all">
        <li>
          <Link href="/admin">홈</Link>
        </li>
        <li>
          <Link href="/admin/report">신고</Link>
        </li>
        <li>
          <Link href="/admin/feedback">피드백</Link>
        </li>
      </ul>
      {/* 
        <li>
          <button onClick={HandleUserToggle} className="text-lg">
            회원관리
          </button>
          <div
            className={`transition-max-height overflow-hidden duration-500 ease-in-out ${
              UserToggle ? "max-h-40" : "max-h-0"
            }`}
          >
            <ul className="pl-4 text-sm">
              <Link href="/main/users">
                <li>조회</li>
              </Link>
              <Link href="/main/users">
                <li>수정</li>
              </Link>
              <Link href="/main/users">
                <li>삭제</li>
              </Link>
            </ul>
          </div>
        </li>
        <li>
          <button onClick={HandleMovieToggle} className="text-lg">
            영화관리
          </button>
          <div
            className={`transition-max-height overflow-hidden duration-500 ease-in-out ${
              MovieToggle ? "max-h-40" : "max-h-0"
            }`}
          >
            <ul className="pl-4 text-sm">
              <Link href="/main/reviews">
                <li>조회</li>
              </Link>
              <Link href="/main/reviews">
                <li>수정</li>
              </Link>
              <Link href="/main/reviews">
                <li>삭제</li>
              </Link>
            </ul>
          </div>
        </li> */}
    </nav>
  );
}
