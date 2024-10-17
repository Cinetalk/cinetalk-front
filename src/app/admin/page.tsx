"use client";
import { useEffect, useState } from "react";

import { adminAPIs } from "@/services/admin/adminAPIs";

import { MyResponsiveLine } from "./_components/Chart";
import useAdminStorge from "./_hooks/useAdminStorge";

export default function AdminMain() {
  const { UserVisitors, ReviewCount, KeywordCount } = useAdminStorge() as {
    UserVisitors: Users[] | undefined;
    ReviewCount: Users[] | undefined;
    KeywordCount: Users[] | undefined;
  };
  return (
    <div className="flex min-h-screen w-full flex-col  gap-5 p-24">
      <div className="">
        <h1 className="text-gray-80 text-4xl font-extrabold">통계</h1>
      </div>
      <div>
        <MyResponsiveLine
          Visitor={UserVisitors}
          ReviewCount={ReviewCount}
          KeywordCount={KeywordCount}
        />
      </div>
    </div>
  );
}
