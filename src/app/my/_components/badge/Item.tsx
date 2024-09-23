import { EMOJI_MAP } from "@/constants/emoji";
import { cn } from "@/utils/cn";
import getEmoji from "@/utils/getEmoji";

interface BadgeItemProps {
  badge: BadgeCount | undefined;
  isSelected: boolean;
  toggleMovie: (id: number) => void;
  isEditing: boolean;
  isActive: boolean;
}

export default function BadgeItem({
  badge,
  isSelected,
  isEditing,
  toggleMovie,
  isActive,
}: BadgeItemProps) {
  const badgeName = EMOJI_MAP.find((emoji) => emoji.id === badge?.id)?.name;
  const hasEmoji = badge?.count && badge.count >= 10;
  if (!badgeName || !badge) return null;
  return (
    <button
      onClick={() => {
        if (!hasEmoji || !isEditing) return;
        toggleMovie(badge.id);
      }}
      className={`${isSelected ? "badge-gradient" : "bg-Black"} ${isEditing && hasEmoji ? "cursor-pointer" : "cursor-default"} flex h-[126px] flex-col items-center justify-center gap-3 rounded-xl Tablet:h-[162px] Tablet:gap-4`}
    >
      <div
        className={cn(
          { "bg-[#1E1E1E]/80 blur-[4px]": !hasEmoji },
          `Emoji-l Mobile:text-[32px] Tablet:text-5xl`,
        )}
      >
        {getEmoji(badgeName)}
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="Text-s-Bold">{hasEmoji ? badgeName : "???"}</p>
        <div className="flex items-center gap-1">
          <span className="Text-xs-Regular">{badge.name}</span>
          <span
            className={cn(
              {
                "hidden text-Silver Text-xs-Bold Tablet:inline-block": hasEmoji,
              },
              { "text-Gray_Orange Text-xs-Regular": !hasEmoji },
              { "text-Primary Text-xs-Bold": isSelected },
            )}
          >
            {hasEmoji
              ? isActive
                ? "사용 중"
                : "보유 중"
              : `0${badge.count} / 10`}
          </span>
        </div>
      </div>
    </button>
  );
}
