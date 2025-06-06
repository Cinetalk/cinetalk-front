import clsx from "clsx";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

import Button from "@/components/buttons/Button";
import Modal from "@/components/modal/modal";
import useHandleClickAuthButton from "@/hooks/useHandleClickAuthButtons";
import useNeedLogin from "@/hooks/useNeedLogin";
import { useDislikeTalk, useLikeTalk } from "@/services/talk/talkMutations";

import {
  CaretDownGraySm,
  CaretDownSm,
  ThumbsDownFillMd,
  ThumbsDownFillSm,
  ThumbsDownLineMd,
  ThumbsDownLineSm,
  ThumbsUpFillMd,
  ThumbsUpFillSm,
  ThumbsUpLineMd,
  ThumbsUpLineSm,
} from "../../../../../../../public/icons";

interface TalkContentsFooterProps {
  talk: ReviewList;
  showSpoiler: boolean;
  showReplies: boolean;
  setShowReplies: Dispatch<SetStateAction<boolean>>;
  movieId: number;
}

export default function TalkContentsFooter({
  talk,
  showSpoiler,
  showReplies,
  setShowReplies,
  movieId,
}: TalkContentsFooterProps) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const { mutate: likeTalk } = useLikeTalk({ type: "talk", movieId: movieId });
  const { mutate: dislikeTalk } = useDislikeTalk({
    type: "talk",
    movieId: movieId,
  });
  const { handleNeedLogin, isOpen, setIsOpen } = useNeedLogin();
  const { handleClickAuthButton } = useHandleClickAuthButton();

  const handleClickLike = (talkId: number) => {
    if (handleNeedLogin()) return;
    likeTalk(talkId);
    setDislike(false);
    setLike(!like);
  };

  const handleClickDislike = async (talkId: number) => {
    if (handleNeedLogin()) return;
    dislikeTalk(talkId);
    setLike(false);
    setDislike(!dislike);
  };

  const handleClickReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <>
      <section className="flex items-center justify-end Tablet:mt-2">
        <Button onClick={() => handleClickLike(talk.id)} variant="textIconL">
          <Image
            unoptimized
            src={talk.likeCheck ? ThumbsUpFillSm : ThumbsUpLineSm}
            alt="좋아요"
            className="Tablet:hidden"
          />
          <Image
            unoptimized
            src={talk.likeCheck ? ThumbsUpFillMd : ThumbsUpLineMd}
            alt="좋아요"
            className="hidden Tablet:block"
          />
          <p className="select-none text-Gray_Orange Text-xs-Regular Tablet:Text-s-Medium">
            {talk.likeCount}
          </p>
        </Button>
        <Button onClick={() => handleClickDislike(talk.id)} variant="textIconL">
          <Image
            unoptimized
            src={talk.dislikeCheck ? ThumbsDownFillSm : ThumbsDownLineSm}
            alt="싫어요"
            className="Tablet:hidden"
          />
          <Image
            unoptimized
            src={talk.dislikeCheck ? ThumbsDownFillMd : ThumbsDownLineMd}
            alt="싫어요"
            className="hidden Tablet:block"
          />
          <p className="select-none text-Gray_Orange Text-xs-Regular Tablet:Text-s-Medium">
            {talk.dislikeCount}
          </p>
        </Button>

        <Button
          disabled={!showSpoiler}
          onClick={handleClickReplies}
          variant="textIconR"
        >
          <p
            className={clsx(
              "select-none Text-xs-Regular Tablet:Text-s-Medium",
              {
                "text-Gray_Orange": talk.spoiler ? showSpoiler : true,
                "text-Gray": talk.spoiler && !showSpoiler,
              },
            )}
          >
            답글
          </p>
          <p
            className={clsx("Text-xs-Regular Tablet:Text-s-Medium", {
              "text-Gray_Orange": talk.spoiler ? showSpoiler : true,
              "text-Gray": talk.spoiler && !showSpoiler,
            })}
          >
            {talk.commentCount}
          </p>
          <Image
            unoptimized
            src={
              talk.spoiler
                ? showSpoiler
                  ? CaretDownSm
                  : CaretDownGraySm
                : CaretDownSm
            }
            alt="더보기"
            className={`${showReplies && "rotate-180"} transition-all`}
          />
        </Button>
      </section>
      {isOpen && (
        <Modal isAlertModal={false} onClose={() => setIsOpen(false)}>
          <Modal.Login
            onKakaoLogin={() => handleClickAuthButton("kakao")}
            onNaverLogin={() => handleClickAuthButton("naver")}
          />
        </Modal>
      )}
    </>
  );
}
