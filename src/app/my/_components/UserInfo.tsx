import Image from "next/image";

import SmallBadge from "@/components/smallBadge/SmallBadge";
import { myAPIs } from "@/services/my/myAPIs";

import { AddPlus, CameraMd, CameraSm } from "../../../../public/icons";

export default async function UserInfo() {
  const { getActivityCount, getUser, getBadges } = myAPIs;
  const [user, activityCount, badges] = await Promise.all([
    getUser(),
    getActivityCount(),
    getBadges(),
  ]);

  const activeBadges = badges.filter((badge) => badge.use);
  return (
    <section className="mb-9 flex w-full flex-col items-center gap-7 px-5 Tablet:mb-0 Tablet:gap-[52px] Tablet:px-0">
      <div className="flex flex-col items-center gap-4 px-6 Tablet:gap-3 Tablet:px-0 Laptop:gap-4">
        <div className="flex justify-center">
          <div className="relative h-16 w-16 rounded-full bg-[#D9D9D9]  Tablet:h-[100px] Tablet:w-[100px]">
            <Image
              alt="유저_프로필"
              src="/images/detail/default_profile2.png"
              fill
              className="overflow-hidden"
            />
            <button
              type="button"
              className="absolute -bottom-[2px] right-[2px] flex h-7 w-7 translate-x-1/2 items-center justify-center rounded-full bg-Gray Tablet:h-10 Tablet:w-10"
            >
              <div className="block Tablet:hidden">
                <Image src={CameraSm} alt="변경" />
              </div>
              <div className="hidden Tablet:block">
                <Image src={CameraMd} alt="변경" />
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 Tablet:gap-3 Laptop:gap-4">
          <p className="Text-m-Bold Tablet:Text-xxl-Bold">
            <strong className="text-Primary">{user?.nickname}</strong>님,
            안녕하세요!
          </p>
          <div className="flex items-center gap-1 Tablet:gap-4">
            {activeBadges.length ? (
              activeBadges.map((badge) => (
                <div key={badge.genre_id}>
                  <div className="hidden Tablet:block">
                    <SmallBadge content={badge.badge_name} size="md" />
                  </div>
                  <div className="block Tablet:hidden">
                    <SmallBadge content={badge.badge_name} size="sm" />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex cursor-default items-center gap-1 rounded-lg border border-dashed border-Gray px-2 py-1 text-Gray Tablet:px-3 Tablet:py-2">
                <Image src={AddPlus} alt="plus icon" width={16} height={16} />
                <span className="Text-s-Medium Tablet:Text-m-Medium">
                  뱃지 추가 하기
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center gap-6 rounded-xl bg-D1_Gray p-3 Tablet:justify-between Tablet:gap-[41px] Tablet:px-[88px] Tablet:py-3 Laptop:px-[100px]">
        <div className="relative flex w-[54px] flex-col items-center gap-0 py-0 Tablet:w-auto Tablet:gap-1 Tablet:px-3 Tablet:py-2">
          <span className="Text-m-Bold Tablet:Text-l-Bold">
            {activityCount.rateCount || "00"}
          </span>
          <span className="text-L_Gray Text-xs-Regular Tablet:Text-s-Regular Laptop:text-Silver Laptop:Text-m-Bold">
            받은 좋아요
          </span>
        </div>
        <div className="w-[1px] bg-D2_Gray"></div>
        <div className="relative flex w-[54px] flex-col items-center gap-0 py-0 Tablet:w-auto Tablet:gap-1 Tablet:px-3 Tablet:py-2">
          <span className="Text-m-Bold Tablet:Text-l-Bold">
            {activityCount.reviewCount || "00"}
          </span>
          <span className="text-L_Gray Text-xs-Regular Tablet:Text-s-Regular Laptop:text-Silver Laptop:Text-m-Bold">
            평가한 영화
          </span>
        </div>
        <div className="w-[1px] bg-D2_Gray"></div>
        <div className="relative flex w-[54px] flex-col items-center gap-0 py-0 Tablet:w-auto Tablet:gap-1 Tablet:px-3 Tablet:py-2">
          <span className="Text-m-Bold Tablet:Text-l-Bold">
            {activityCount.bookmarkCount || "00"}
          </span>
          <span className="text-L_Gray Text-xs-Regular Tablet:Text-s-Regular Laptop:text-Silver Laptop:Text-m-Bold">
            찜한 영화
          </span>
        </div>
      </div>
    </section>
  );
}
