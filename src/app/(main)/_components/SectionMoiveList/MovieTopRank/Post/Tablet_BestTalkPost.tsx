import Image from "next/image";

import { ThumbsUpLineSm } from "../../../../../../../public/icons";
import GetRating from "../../../Rating/GetRating";
interface ReviewType {
  star: number;
  content: string;
  likeCount: number;
  profileImg?: string;
}
export default function Tablet_BestTalkPost({
  star,
  content,
  likeCount,
  profileImg,
}: ReviewType) {
  return (
    <div className="flex h-[184px] w-[148px] flex-col items-center justify-center gap-2 rounded-3xl bg-D1_Gray px-4 pb-4 pt-5">
      <Image
        className="h-[30px] w-[30px] rounded-[60px]"
        src={`data:image/jpeg;base64,${profileImg}`}
        alt="Profile"
      />
      <GetRating StarRating={star} ratingsize="Sm" space={false} />
      <div className="flex flex-col gap-1">
        <div className="line-clamp-3 h-[63px] text-Gray_Orange Text-s-Regular">
          {content}
        </div>
        <div className="flex justify-end gap-1">
          <Image
            src={ThumbsUpLineSm}
            alt="업버튼"
            style={{ color: "#999490" }}
          />
          <span className="text-L_Gray Text-s-Medium">{likeCount}</span>
        </div>
      </div>
    </div>
  );
}
