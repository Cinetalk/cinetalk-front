"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { NicknameChangeButton } from "@/app/my/_components/buttons";
import { AccountFormLabel } from "@/app/my/_components/Labels";
import useDebounce from "@/hooks/useDebounce";
import { changeUserInfo, verifyNickname } from "@/services/my/actions";
import { nicknameRegex } from "@/utils/regex";

const nicknameSchema = z.object({
  nickname: z.string().regex(nicknameRegex, "닉네임이 올바르지 않아요."),
});

type Nickname = z.infer<typeof nicknameSchema>;
interface AccountFormProps {
  originNickname: string;
}

export default function AccountNicknameForm({
  originNickname,
}: AccountFormProps) {
  const {
    register,
    reset,
    watch,
    setFocus,
    formState: { errors, isDirty },
    setError,
  } = useForm<Nickname>({
    resolver: zodResolver(nicknameSchema),
    mode: "onChange",
    values: { nickname: originNickname },
  });
  const [isLoading, setIsLoading] = useState(false);
  const nickname = watch("nickname");
  const [isEditing, setIsEditing] = useState(false);
  const debouncedNickname = useDebounce(nickname, 500);

  const clearEditing = () => {
    reset();
    setIsEditing(false);
  };

  const handleEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") clearEditing();
  };

  const handleSubmit = async () => {
    if (errors.nickname) return clearEditing();
    setIsLoading(true);
    const result = await changeUserInfo(nickname, "nickname");
    setIsLoading(false);
    if (result.state) {
      setIsEditing(false);
    } else {
      setError("nickname", { message: "이미 사용 중인 닉네임이에요." });
    }
  };

  useEffect(() => {
    if (isEditing) setFocus("nickname");
  }, [isEditing, setFocus]);

  useEffect(() => {
    if (isDirty) {
      verifyNickname(debouncedNickname).then((invalid) => {
        if (invalid)
          setError("nickname", { message: "이미 사용 중인 닉네임이에요." });
      });
    }
  }, [debouncedNickname, isDirty, setError]);

  return (
    <div className="flex">
      <div className="flex flex-1 gap-5 Tablet:gap-1">
        <AccountFormLabel>닉네임</AccountFormLabel>
        {isEditing ? (
          <div className="flex flex-col Tablet:flex-row Tablet:gap-2">
            <div className="relative flex h-10 items-center">
              <input
                {...register("nickname")}
                maxLength={10}
                placeholder={originNickname}
                onKeyDown={handleEscape}
                type="text"
                className="w-[180px] rounded-lg bg-Black py-1 pl-3 pr-[50px] text-Silver outline-none Text-s-Medium placeholder:text-Gray Tablet:pl-4 Tablet:Text-m-Medium"
              />
              <span
                className={`${nickname.length > 10 ? "text-Error" : "text-Gray"} absolute bottom-1/2 right-2 translate-y-1/2 Text-xs-Regular`}
              >
                {nickname.length}/10
              </span>
            </div>
            {errors.nickname && (
              <span className="flex text-Error Text-xs-Regular Tablet:items-center">
                {errors.nickname.message}
              </span>
            )}
            {isDirty && !errors.nickname && (
              <span className="flex text-Success Text-xs-Regular Tablet:items-center">
                멋진 닉네임이에요!
              </span>
            )}
          </div>
        ) : (
          <div className="flex h-10 items-center">
            <span>{nickname}</span>
          </div>
        )}
      </div>
      {isEditing ? (
        <NicknameChangeButton
          disabled={isLoading}
          error={!!errors.nickname}
          isEditing={isEditing}
          onClick={handleSubmit}
        >
          {errors.nickname ? "취소" : "완료"}
        </NicknameChangeButton>
      ) : (
        <NicknameChangeButton
          type="button"
          error={!!errors.nickname}
          isEditing={isEditing}
          onClick={() => setIsEditing(true)}
        >
          변경
        </NicknameChangeButton>
      )}
    </div>
  );
}
