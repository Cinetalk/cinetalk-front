import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/buttons/Button";
import Dropdown from "@/components/dropdown/dropdown";
import Modal from "@/components/modal/modal";
import ROUTES from "@/constants/routes";
import { deleteReview } from "@/services/my/actions";

import {
  ChatLineGrayOrangeSm,
  MoreHorizontal,
  StarFillSm,
  ThumbsUpLineSm,
} from "../../../../public/icons";

interface ReviewItemProps {
  review: PostreviewDTO;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  reviewsLength: number;
}

export default function ReviewItem({
  review,
  setActiveTab,
  reviewsLength,
}: ReviewItemProps) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDeleteReview = async () => {
    setLoading(true);
    const result = await deleteReview(review.review_id);
    setLoading(false);
    if (result.state) setActiveTab(`톡 ${reviewsLength - 1}`);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col justify-between gap-2 rounded-xl bg-D1_Gray px-5 pb-4 pt-2 Laptop:gap-4 Laptop:px-7 Laptop:pb-6 Laptop:pt-4">
      <div className="">
        <div className="flex h-10 items-center justify-between gap-2 Laptop:mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center Text-s-Bold">
              <Image src={StarFillSm} alt="별점" />
              {Number.isInteger(review.star) ? `${review.star}.0` : review.star}
            </div>
            <span className="line-clamp-1 Text-m-Medium">{review.movienm}</span>
          </div>
          <div>
            <Dropdown>
              <Dropdown.Trigger>
                <Button variant={"icon"}>
                  <Image alt="더보기" src={MoreHorizontal} />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.List>
                <Dropdown.Item
                  onClick={() =>
                    router.push(`${ROUTES.DETAIL}/${review.movie_id}`)
                  }
                >
                  수정
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setIsModalOpen(true)}>
                  삭제
                </Dropdown.Item>
              </Dropdown.List>
            </Dropdown>
          </div>
        </div>
        <div className="line-clamp-3 min-h-[72px] text-Gray_Orange Text-m-Regular Laptop:line-clamp-4 Laptop:min-h-24">
          {review.content}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-D2_Gray pt-3">
        <div className="text-Gray Text-xs-Regular">{review.regDate} 작성</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Image alt="좋아요" src={ThumbsUpLineSm} />
            <span className="text-Gray_Orange Text-s-Medium">
              {review.rateCount}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Image alt="댓글" src={ChatLineGrayOrangeSm} />
            <span className="text-Gray_Orange Text-s-Medium">
              {review.rereviewCount}
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal isAlertModal onClose={() => setIsModalOpen(false)}>
          <Modal.TitleWrapper>
            <Modal.Title>
              {loading ? "삭제 중..." : "정말 삭제하시겠어요?"}
            </Modal.Title>
          </Modal.TitleWrapper>
          <Modal.CancelButton disabled={loading}>아니요</Modal.CancelButton>
          <Modal.Button disabled={loading} onClick={handleDeleteReview}>
            네
          </Modal.Button>
        </Modal>
      )}
    </div>
  );
}
