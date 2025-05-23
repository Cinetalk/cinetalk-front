import clsx from "clsx";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

import useClickedEditMyTalk from "@/app/detail/_stores/useClickedEditMyTalk";
import Button from "@/components/buttons/Button";
import Dropdown from "@/components/dropdown/dropdown";
import SmallBadge from "@/components/smallBadge/SmallBadge";
import useSmoothScroll from "@/hooks/useSmoothScroll";
import { useRemoveTalk } from "@/services/talk/talkMutations";
import { cn } from "@/utils/cn";
import formatDate from "@/utils/formatDate";

import { MoreHorizontal } from "../../../../../../../../public/icons";
import DeleteTalkModal from "../../DeleteTalkModal";
import TalkContentsRatingStar from "./TalkContentsRatingStar";

interface TalkContentsHeaderProps {
  talk: ReviewList;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTalkId: Dispatch<SetStateAction<number | null>>;
  movieId: number;
}

export default function TalkContentsHeader({
  talk,
  setOpen,
  setTalkId,
  movieId,
}: TalkContentsHeaderProps) {
  const { smoothScroll } = useSmoothScroll();
  const { setClickedEditMyTalk } = useClickedEditMyTalk();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { mutate: removeTalk, isPending } = useRemoveTalk({
    setOpenDeleteModal: setOpenDeleteModal,
    movieId: movieId,
    type: "talk",
  });

  const submitRemoveTalk = () => {
    removeTalk({ talkId: talk.id });
  };

  return (
    <>
      <div
        className={cn(
          "itmes-center relative flex h-[66px] justify-between Tablet:h-[54px]",
          talk.badgeList.length === 0 ? "h-[41px] Tablet:h-10" : "h-[66px]",
        )}
      >
        <section className="flex gap-2">
          <div
            className={clsx(
              "mt-1 h-7 w-7 overflow-hidden rounded-full Tablet:mt-[7px] Tablet:h-10 Tablet:w-10",
              talk.badgeList.length === 0 && "!mt-0",
            )}
          >
            <Image
              unoptimized
              width={100}
              height={100}
              alt={talk.nickName}
              id="memberimage"
              src={`data:image/jpeg;base64,${talk.profileImage}`}
              className="h-full object-cover"
            />
          </div>
          <section className="mb-auto flex flex-col gap-1 Tablet:h-full Tablet:items-center Tablet:gap-2">
            <section
              className={cn(
                "mr-auto Tablet:flex Tablet:items-center Tablet:gap-2",
                talk.badgeList.length === 0 && "my-auto",
              )}
            >
              <div className="mb-1 flex Tablet:mb-0">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <TalkContentsRatingStar
                      key={i}
                      rating={talk.star}
                      index={i}
                    />
                  ))}
              </div>
              <section className="flex gap-2">
                <p className="text-Gray_Orange Text-xs-Regular Tablet:Text-s-Medium">
                  {talk.nickName}
                </p>
                <p className="text-Gray Text-xs-Regular Tablet:Text-s-Medium">
                  {formatDate(talk.createdAt)} {talk.edited && "(수정)"}
                </p>
              </section>
            </section>
            {talk.badgeList.length !== 0 && (
              <>
                <section className="absolute bottom-0 flex h-[25px] gap-1 Tablet:left-[56px] Tablet:mt-0 Tablet:hidden">
                  {talk.badgeList.map((el, i) => (
                    <SmallBadge key={i} content={el} size="xs" />
                  ))}
                </section>
                <section className="absolute bottom-0 ml-[-8px] hidden h-[25px] gap-1 Tablet:left-[56px] Tablet:mt-0 Tablet:flex">
                  {talk.badgeList.map((el, i) => (
                    <SmallBadge key={i} content={el} size="sm" />
                  ))}
                </section>
              </>
            )}
          </section>
        </section>

        {talk.mine ? (
          <Dropdown type="text">
            <Dropdown.Trigger>
              <Button variant="text" className="my-auto h-fit">
                <Image unoptimized src={MoreHorizontal} alt="메뉴" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.List>
              <Dropdown.Item
                onClick={() => {
                  setClickedEditMyTalk(true);
                  smoothScroll("my-talk");
                }}
              >
                수정
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setOpenDeleteModal(true);
                }}
              >
                삭제
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
        ) : (
          <Dropdown type="text">
            <Dropdown.Trigger>
              <Button variant="text" className="my-auto h-fit">
                <Image unoptimized src={MoreHorizontal} alt="메뉴" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.List>
              <Dropdown.Item
                onClick={() => {
                  setTalkId(talk.id);
                  setOpen(true);
                }}
              >
                신고
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
        )}
      </div>

      {openDeleteModal && (
        <DeleteTalkModal
          onClick={submitRemoveTalk}
          setOpenDeleteModal={setOpenDeleteModal}
          isPending={isPending}
        />
      )}
    </>
  );
}
