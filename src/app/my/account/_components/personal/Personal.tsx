import React from "react";

import BirthdayForm from "@/app/my/account/_components/personal/BirthdayForm";
import GenderForm from "@/app/my/account/_components/personal/GenderForm";
import { myAPIs } from "@/services/my/myAPIs";

export default async function Personal() {
  const user = await myAPIs.getUser();
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-D1_Gray px-4 py-2 Text-s-Medium Tablet:px-8 Tablet:py-4 Tablet:Text-m-Medium">
      <BirthdayForm birthday={user.birthday} />
      <div className="h-[1px] w-full bg-D2_Gray" />
      <GenderForm gender={user.gender} />
    </div>
  );
}
