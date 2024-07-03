import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { Dispatch, RefObject, SetStateAction, useState } from "react";

import ROUTES from "@/constants/routes";

import { SearchWhite } from "../../../../../public/icons";
import { SearchWhiter } from "../../../../../public/icons";
import { Search } from "../../../../../public/icons";
import HeaderSearchDropdown from "./HeaderSearchDropdown";
import RenderSearchInput from "./RenderSearchInput";

interface HeaderSearchInputProps {
  hasScrolledPast: boolean;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  isInputFocused: boolean;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement | null>;
}

export default function HeaderSearchInputSection({
  hasScrolledPast,
  inputValue,
  setInputValue,
  isInputFocused,
  setIsInputFocused,
  inputRef,
}: HeaderSearchInputProps) {
  const pathname = usePathname();

  return (
    <div className="relative w-fit Laptop:w-[360px]">
      <div className="hidden Laptop:block">
        <RenderSearchInput
          {...{
            hasScrolledPast,
            isInputFocused,
            inputValue,
            setIsInputFocused,
            setInputValue,
            inputRef,
          }}
        />

        <Image
          src={
            !isInputFocused
              ? pathname.includes(ROUTES.DETAIL)
                ? hasScrolledPast
                  ? Search
                  : SearchWhite
                : Search
              : SearchWhiter
          }
          alt="검색"
          className="absolute left-[24px] top-[50%] translate-y-[-50%]"
        />
      </div>

      {isInputFocused && (
        <HeaderSearchDropdown
          {...{
            inputValue,
            setInputValue,
          }}
        />
      )}
    </div>
  );
}