"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

import { AccountFormLabel } from "@/app/my/_components/Labels";
import Button from "@/components/buttons/Button";
import useDevice from "@/hooks/useDevice";
import { changeNickname } from "@/services/my/actions";
import { nincknameRegex } from "@/utils/regex";

interface AccountProps {
  email: string;
  nickname: string;
}

const initialData = { message: "" };

export default function Account({ email, nickname }: AccountProps) {
  const [state, formAction] = useFormState(changeNickname, initialData);
  const [length, setLength] = useState(nickname);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const { isMobile } = useDevice();
  const [isEditing, setIsEditing] = useState(false);
  const handleNicknameSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEditing) return setIsEditing((prev) => !prev);
    if (state.message) {
      // setError(false);
      // return setNickname(nickname);
    }
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value, maxLength } = e.currentTarget;
    if (e.key === "Escape") {
      setIsEditing(false);
      // return setNickname(nickname);
    }

    // if (value.length > maxLength) setNickname(e..slice(0, maxLength));
  };

  // const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   const isValid = nincknameRegex.test(value);
  //   setNickname(value);
  //   setError(!isValid);
  // };

  useEffect(() => {
    if (isEditing) nicknameRef.current?.focus();
  }, [isEditing]);

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-D1_Gray px-4 py-2 Text-s-Medium Tablet:px-8 Tablet:py-4 Tablet:Text-m-Medium">
      <form
        className="flex"
        action={formAction}
        onSubmit={handleNicknameSubmit}
      >
        <div className="flex flex-1 gap-5 Tablet:gap-1">
          <AccountFormLabel>닉네임</AccountFormLabel>
          {isEditing ? (
            <div className="flex flex-col Tablet:flex-row Tablet:gap-2">
              <div className="relative flex h-10 items-center">
                <input
                  maxLength={10}
                  placeholder={nickname}
                  ref={nicknameRef}
                  // onChange={handleNicknameChange}
                  onKeyUp={handleKeyUp}
                  type="text"
                  className="w-[180px] rounded-lg bg-Black py-1 pl-3 pr-[50px] text-Silver outline-none Text-s-Medium placeholder:text-Gray Tablet:pl-4 Tablet:Text-m-Medium"
                />
                <span
                  className={`${state.message ? "text-Error" : "text-Gray"} absolute bottom-1/2 right-2 translate-y-1/2 Text-xs-Regular`}
                >
                  0/10
                  {/* {0}/10 */}
                </span>
              </div>
              {state.message && (
                <span className="flex text-Error Text-xs-Regular Tablet:items-center">
                  {state.message}
                </span>
              )}
              {nickname !== nickname && !state.message && (
                <span className="flex text-Success Text-xs-Regular Tablet:items-center">
                  멋진 닉네임이에요!
                </span>
              )}
            </div>
          ) : (
            <div className="flex h-10 items-center">
              <span className="">{nickname}</span>
            </div>
          )}
        </div>
        <Button
          type="submit"
          focus={!state.message && isEditing ? "1" : "none"}
          size={!isMobile && isEditing && !state.message ? "md" : "none"}
          variant={!isMobile && isEditing && !state.message ? "orange" : "text"}
        >
          {isEditing ? (state.message ? "취소" : "완료") : "변경"}
        </Button>
      </form>
      <div className="h-[1px] w-full bg-D2_Gray" />
      <div className="flex items-center">
        <div className="flex h-10 flex-1 items-center gap-5 Tablet:gap-1">
          <AccountFormLabel>이메일</AccountFormLabel>
          <span className="text-Gray">{email}</span>
        </div>
      </div>
    </div>
  );
}
