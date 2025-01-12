import { useState } from "react";

import { changeUserInfo } from "@/services/my/actions";

export default function useGenderForm(initialGender: MyInfo["gender"]) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGender, setCurrentGender] =
    useState<MyInfo["gender"]>(initialGender);

  const resetGender = () => {
    setCurrentGender(initialGender);
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const checkUnchanged = () => {
    return currentGender === initialGender;
  };

  const handleGenderSave = async () => {
    const unchanged = checkUnchanged();
    if (unchanged) return setIsEditing(false);
    setIsLoading(true);
    const success = await changeUserInfo(currentGender, "gender");
    if (!success) resetGender();
    setIsLoading(false);
    setIsEditing(false);
  };

  const changeCurrentGender = (gender: MyInfo["gender"]) => {
    setCurrentGender(gender);
  };

  return {
    isLoading,
    isEditing,
    handleGenderSave,
    currentGender,
    toggleEditMode,
    changeCurrentGender,
  };
}
