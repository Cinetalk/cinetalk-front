"use client";

import Image from "next/image";
import { ButtonHTMLAttributes, useState } from "react";

import Button from "@/components/buttons/Button";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import Modal from "@/components/modal/modal";
import useDevice from "@/hooks/useDevice";
import { deleteAccount, logout } from "@/services/my/actions";
import useLoggedInStore from "@/stores/useLoggedIn";

import { ByeSsikongi, SadSsikongi } from "../../../../public/images";

export function LogoutButton() {
  const handleLogout = useLoggedInStore((state) => state.logout);
  return (
    <Button
      variant={"text"}
      onClick={() => {
        logout();
        handleLogout();
      }}
    >
      로그아웃
    </Button>
  );
}

export function NicknameChangeButton({
  error,
  isEditing,
  children,
  ...props
}: {
  error: boolean;
  isEditing: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { isMobile } = useDevice();
  return (
    <Button
      {...props}
      focus={!error && isEditing ? "1" : "none"}
      size={!isMobile && isEditing && !error ? "md" : "none"}
      variant={!isMobile && isEditing && !error ? "orange" : "text"}
    >
      {children}
    </Button>
  );
}

export function BookmarkMobileButtons({
  selectedMovieIds,
  setSelectedMovieIds,
  onBookmarkDelete,
  loading,
}: {
  loading: boolean;
  selectedMovieIds: number[];
  onBookmarkDelete: () => Promise<void>;
  setSelectedMovieIds: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  return (
    <div className="fixed bottom-0 left-0 flex w-screen items-center border-t border-D2_Gray bg-D1_Gray py-[6px] pb-6 Text-m-Medium Tablet:hidden">
      <button
        type="button"
        disabled={!selectedMovieIds.length}
        className="flex-1 p-2 Text-m-Medium disabled:text-Gray"
        onClick={() => setSelectedMovieIds([])}
      >
        선택 해제
      </button>
      <button
        disabled={!selectedMovieIds.length || loading}
        type="button"
        onClick={onBookmarkDelete}
        className="flex-1 p-2 text-Error Text-m-Medium disabled:text-Gray"
      >
        삭제
      </button>
    </div>
  );
}

export function DeleteAccountButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const handleLogout = useLoggedInStore((state) => state.logout);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsConfirmModalOpen(true)}
        type="button"
        className="py-2 text-Gray_Orange hover:underline"
      >
        {children}
      </button>
      {isConfirmModalOpen && (
        <Modal
          isAlertModal={false}
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
        >
          <Modal.Img>
            <Image
              src={SadSsikongi}
              alt="SadSsikongi"
              width={168}
              height={150}
            />
          </Modal.Img>
          <Modal.TitleWrapper>
            <Modal.Title>정말 씨네톡을 탈퇴 하시겠어요?</Modal.Title>
            <Modal.Description>
              회원님의 톡과 평점은 남지만
              <br />
              씨네톡을 더이상 이용할 수 없어요.
            </Modal.Description>
          </Modal.TitleWrapper>
          <Modal.Checkbox>네, 전부 삭제하고 탈퇴할래요</Modal.Checkbox>
          <Modal.CancelButton>취소</Modal.CancelButton>
          <Modal.Button
            onClick={async () => {
              setIsConfirmModalOpen(false);
              setLoading(true);
              const result = await deleteAccount();
              setLoading(false);
              if (result) setIsCompleteModalOpen(true);
            }}
          >
            탈퇴하기
          </Modal.Button>
        </Modal>
      )}
      {isCompleteModalOpen && (
        <Modal
          isAlertModal={false}
          isOpen={isCompleteModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
        >
          <Modal.Img>
            <Image
              src={ByeSsikongi}
              alt="ByeSsikongi"
              width={139}
              height={150}
            />
          </Modal.Img>
          <Modal.TitleWrapper>
            <Modal.Title>탈퇴가 완료되었어요.</Modal.Title>
            <Modal.Description>
              다음에 기회가 되면 또 만나요 우리!
            </Modal.Description>
          </Modal.TitleWrapper>
          <Modal.Button
            onClick={() => {
              setIsCompleteModalOpen(false);
              handleLogout();
              logout();
            }}
          >
            홈으로 돌아가기
          </Modal.Button>
        </Modal>
      )}
      {loading && (
        <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-black/40 backdrop-blur-[3px]">
          <div className="fixed left-1/2 top-1/2 z-[51] -translate-x-1/2 -translate-y-1/2">
            <LoadingSpinner size="3xl" color="primary" />
          </div>
        </div>
      )}
    </>
  );
}
