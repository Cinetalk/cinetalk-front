"use client";

import { AccountFormLabel } from "@/app/my/_components/Labels";
import useGenderForm from "@/app/my/_hooks/useGenderForm";
import Button from "@/components/buttons/Button";
import useDevice from "@/hooks/useDevice";

type GenderLabel = "남자" | "여자" | "기타";

const genderMap: { [key in MyInfo["gender"]]: GenderLabel } = {
  M: "남자",
  F: "여자",
  E: "기타",
};

interface GenderFormProps {
  gender: MyInfo["gender"];
}

export default function GenderForm({ gender }: GenderFormProps) {
  const { isMobile } = useDevice();
  const {
    isEditing,
    isLoading,
    changeCurrentGender,
    currentGender,
    handleGenderSave,
    toggleEditMode,
  } = useGenderForm(gender);

  return (
    <div className="flex items-center">
      <div className="flex flex-1 items-center gap-5 Tablet:gap-1">
        <AccountFormLabel>성별</AccountFormLabel>
        {isEditing ? (
          <div className="flex gap-2 Tablet:gap-3">
            {Object.keys(genderMap).map((g) => (
              <Button
                onClick={() => changeCurrentGender(g as MyInfo["gender"])}
                className="px-3 py-[6px] Text-s-Medium Tablet:px-4 Tablet:py-2 Tablet:Text-m-Medium"
                focus={currentGender === g ? "1" : "none"}
                key={g}
                variant={"line"}
                size={"sm"}
                type="button"
              >
                {genderMap[g as MyInfo["gender"]]}
              </Button>
            ))}
          </div>
        ) : (
          <span>{genderMap[currentGender]}</span>
        )}
      </div>
      {isEditing ? (
        <Button
          disabled={isLoading}
          size={!isMobile && isEditing ? "md" : "none"}
          focus={isMobile && isEditing ? "1" : "none"}
          variant={!isMobile && isEditing ? "orange" : "text"}
          onClick={handleGenderSave}
        >
          완료
        </Button>
      ) : (
        <Button
          size="none"
          focus="none"
          variant="text"
          onClick={toggleEditMode}
        >
          변경
        </Button>
      )}
    </div>
  );
}
