import Image from "next/image";

import Button from "@/components/buttons/Button";
import { useModalContext } from "@/components/modal/ModalContext";

import { SquareCheckFillMd, SquareCheckMd } from "../../../../public/icons";

interface ModalButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export function ModalButton({ children, onClick, disabled }: ModalButtonProps) {
  const { isChecked, hasCheckbox } = useModalContext();
  return (
    <Button
      variant={"orange"}
      size={"full"}
      onClick={onClick}
      disabled={hasCheckbox ? !isChecked : disabled}
    >
      {children}
    </Button>
  );
}

export function ModalCancelButton({
  children,
  disabled,
}: Omit<ModalButtonProps, "onClick">) {
  const { onClose } = useModalContext();
  return (
    <Button
      size={"full"}
      variant={"line"}
      disabled={disabled}
      onClick={onClose}
    >
      {children}
    </Button>
  );
}

export function ModalCheckbox({ children }: { children: React.ReactNode }) {
  const { isChecked, toggleCheckbox } = useModalContext();

  return (
    <>
      <button type="button" id="checkbox" onClick={toggleCheckbox}>
        {isChecked ? (
          <Image
            src={SquareCheckFillMd}
            alt="active checkbox"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src={SquareCheckMd}
            alt="inactive checkbox"
            width={24}
            height={24}
          />
        )}
      </button>
      <label htmlFor="checkbox" className="cursor-pointer">
        {children}
      </label>
    </>
  );
}
