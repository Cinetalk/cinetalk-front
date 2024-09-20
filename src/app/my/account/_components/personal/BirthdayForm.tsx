"use client";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FormEvent, useState } from "react";

import { AccountFormLabel } from "@/app/my/_components/Labels";
import Button from "@/components/buttons/Button";
import useDevice from "@/hooks/useDevice";
import { changeUserInfo } from "@/services/my/actions";

dayjs.extend(customParseFormat);

interface Birthday {
  year: string;
  month: string;
  day: string;
}

const today = dayjs();
const hundredYearsAgo = dayjs().subtract(100, "year");

interface BirthdayFormProps {
  birthday: string;
}

export default function BirthdayForm({ birthday }: BirthdayFormProps) {
  const [year, month, day] = birthday.split("-");
  const { isMobile } = useDevice();
  const [isEditing, setIsEditing] = useState(false);
  const [newBirthday, setNewBirthday] = useState<Birthday>({
    day,
    month,
    year,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleBirthdaySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ["month", "day"].forEach((field) =>
      handlePadBirthday(field as keyof Birthday),
    );
    const { year, month, day } = newBirthday;
    setLoading(true);
    const result = await changeUserInfo(`${year}-${month}-${day}`, "birthday");
    setLoading(false);
    if (result.state) return setIsEditing((prev) => !prev);
  };

  const handlePadBirthday = (field: keyof Birthday) => {
    if (!newBirthday[field].length) return;
    setNewBirthday((prev) => ({
      ...prev,
      [field]: newBirthday[field].padStart(2, "0"),
    }));
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError(false);
    const { name, value } = e.target;
    const newValue = value.replace(/[^0-9.]/g, "");
    setNewBirthday((prev) => ({ ...prev, [name]: newValue }));
    validateBirthday(name as keyof Birthday, newValue);
  };

  const validateBirthday = (name: keyof Birthday, value: string) => {
    const userBirthday = `${name === "year" ? value : newBirthday.year}/${name === "month" ? value : newBirthday.month}/${name === "day" ? value : newBirthday.day}`;
    if (
      (name === "year" && +value < hundredYearsAgo.year()) ||
      dayjs(userBirthday).isAfter(today) ||
      dayjs(userBirthday).isBefore(hundredYearsAgo) ||
      !dayjs(
        userBirthday,
        ["YYYY/MM/DD", "YYYY/MM/D", "YYYY/M/DD"],
        true,
      ).isValid()
    ) {
      setError(true);
    }
  };

  return (
    <form className="flex" onSubmit={handleBirthdaySubmit}>
      <div className="flex flex-1 gap-5 Tablet:gap-1">
        <AccountFormLabel>생년월일</AccountFormLabel>
        {isEditing ? (
          <div className="flex flex-col Tablet:flex-row Tablet:gap-2">
            <div className="flex h-10 items-center gap-1">
              <input
                placeholder="년도"
                type="string"
                maxLength={4}
                name="year"
                value={newBirthday.year}
                onChange={handleBirthdayChange}
                className="w-[57px] rounded-lg bg-Black px-3 py-1 text-center outline-none Text-s-Medium placeholder:text-Gray Tablet:w-[71px] Tablet:px-4 Tablet:Text-m-Medium"
              />
              <span className="mx-1 Text-s-Medium Tablet:Text-m-Medium">/</span>
              <input
                placeholder="월"
                type="string"
                maxLength={2}
                name="month"
                value={newBirthday.month}
                onChange={handleBirthdayChange}
                onBlur={() => handlePadBirthday("month")}
                className="w-[41px] rounded-lg bg-Black px-3 py-1 text-center outline-none Text-s-Medium placeholder:text-Gray Tablet:w-[52px] Tablet:px-4 Tablet:Text-m-Medium"
              />
              <span className="mx-1 Text-s-Medium Tablet:Text-m-Medium">/</span>
              <input
                placeholder="일"
                type="string"
                maxLength={2}
                name="day"
                value={newBirthday.day}
                onChange={handleBirthdayChange}
                onBlur={() => handlePadBirthday("day")}
                className="w-[41px] rounded-lg bg-Black px-3 py-1 text-center outline-none Text-s-Medium placeholder:text-Gray Tablet:w-[52px] Tablet:px-4 Tablet:Text-m-Medium"
              />
            </div>
            {error && (
              <span className="flex text-Error Text-xs-Regular Tablet:items-center">
                올바르게 입력해주세요.
              </span>
            )}
          </div>
        ) : (
          <span className="flex h-10 items-center">
            {newBirthday.year} / {newBirthday.month} / {newBirthday.day}
          </span>
        )}
      </div>
      <Button
        disabled={loading}
        type="submit"
        size={!isMobile && isEditing && !error ? "md" : "none"}
        focus={isEditing && !error ? "1" : "none"}
        variant={!isMobile && isEditing && !error ? "orange" : "text"}
      >
        {isEditing ? (error ? "취소" : "완료") : "변경"}
      </Button>
    </form>
  );
}
