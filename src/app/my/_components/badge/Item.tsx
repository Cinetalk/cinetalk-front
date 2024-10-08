import Image from "next/image";

import { EMOJI_MAP } from "@/constants/emoji";
import { cn } from "@/utils/cn";
import getEmoji from "@/utils/getEmoji";

interface BadgeItemProps {
  badge: BadgeCount | undefined;
  isSelected: boolean;
  toggleMovie: (id: number) => void;
  isEditing: boolean;
  hasObtainedBefore: boolean;
}

export default function BadgeItem({
  badge,
  isSelected,
  isEditing,
  toggleMovie,
  hasObtainedBefore,
}: BadgeItemProps) {
  const badgeName = EMOJI_MAP.find((emoji) => emoji.id === badge?.id)?.name;
  const hasBadge = hasObtainedBefore || (badge?.count && badge.count >= 10);
  if (!badgeName || !badge) return null;

  return (
    <button
      onClick={() => {
        if (!hasBadge || !isEditing) return;
        toggleMovie(badge.id);
      }}
      className={cn(
        isEditing && hasBadge && "hover:bg-D2_Gray active:bg-D3_Gray",
        `${isSelected ? "badge-gradient" : "bg-Black"} ${isEditing && hasBadge ? "cursor-pointer" : "cursor-default"} flex flex-col items-center justify-center gap-3 rounded-xl py-3 Tablet:gap-4 Tablet:py-7`,
      )}
    >
      <div className="relative h-[60px] w-[60px]">
        {!hasBadge && (
          <div className="absolute z-[1] h-full w-full bg-[#1e1e1e]/80 backdrop-blur-sm" />
        )}
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative h-11 w-11 Tablet:h-12 Tablet:w-12">
            <Image
              fill
              alt={`${badgeName} 뱃지 이미지`}
              src={getEmoji(badgeName)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="Text-s-Bold">{hasBadge ? badgeName : "???"}</p>
        <div className="flex items-center gap-1">
          <span className="hidden text-Gray_Orange Text-xs-Regular Tablet:inline">
            {badge.name}
          </span>
          <span className="inline text-Gray_Orange Text-xs-Regular Tablet:hidden">
            {badge.name === "애니메이션" || badge.name === "다큐멘터리"
              ? badge.name.slice(0, 2)
              : badge.name}
          </span>
          <span
            className={cn(
              {
                "hidden text-Silver Text-xs-Bold Tablet:inline-block": hasBadge,
              },
              { "text-Gray_Orange Text-xs-Regular": !hasBadge },
              { "text-Primary Text-xs-Bold": isSelected },
            )}
          >
            {hasBadge
              ? isSelected
                ? "사용 중"
                : "보유 중"
              : `0${badge.count} / 10`}
          </span>
        </div>
      </div>
    </button>
  );
}
