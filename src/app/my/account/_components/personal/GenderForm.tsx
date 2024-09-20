"use client";
import { useState } from "react";

import { AccountFormLabel } from "@/app/my/_components/Labels";
import Button from "@/components/buttons/Button";
import useDevice from "@/hooks/useDevice";
import { changeGender } from "@/services/my/actions";

type GenderKor = "남자" | "여자" | "기타";
type Gender = MyInfo["gender"];

const genderEng: Gender[] = ["M", "F", "E"];
const genderKor: GenderKor[] = ["남자", "여자", "기타"];

interface GenderFormProps {
  gender: Gender;
}

export default function GenderForm({ gender }: GenderFormProps) {
  const { isMobile } = useDevice();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGender, setSelectedGender] = useState(gender);
  const selectedGenderIndex = genderEng.findIndex((g) => g === selectedGender);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isEditing) return setIsEditing(true);
    setLoading(true);
    const result = await changeGender(selectedGender);
    if (!result) setSelectedGender(gender);
    setLoading(false);
    setIsEditing(false);
  };
  return (
    <div className="flex items-center">
      <div className="flex flex-1 items-center gap-5 Tablet:gap-1">
        <AccountFormLabel>성별</AccountFormLabel>
        {isEditing ? (
          <div className="flex gap-2 Tablet:gap-3">
            {genderKor.map((g, i) => (
              <Button
                onClick={() => setSelectedGender(genderEng[i])}
                className="px-3 py-[6px] Text-s-Medium Tablet:px-4 Tablet:py-2 Tablet:Text-m-Medium"
                focus={selectedGender === genderEng[i] ? "1" : "none"}
                key={g}
                variant={"line"}
                size={"sm"}
                type="button"
              >
                {g}
              </Button>
            ))}
          </div>
        ) : (
          <span>{genderKor[selectedGenderIndex]}</span>
        )}
      </div>
      <Button
        disabled={loading}
        size={!isMobile && isEditing ? "md" : "none"}
        focus={isMobile && isEditing ? "1" : "none"}
        variant={!isMobile && isEditing ? "orange" : "text"}
        onClick={handleSubmit}
      >
        {isEditing ? "완료" : "변경"}
      </Button>
    </div>
  );
}
