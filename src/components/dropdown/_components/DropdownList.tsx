import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { Status } from "@/components/dropdown/_components/DropdownItem";
import {
  ButtonType,
  useDropdownContext,
} from "@/components/dropdown/DropdownContext";

interface DropdownListProps {
  children: React.ReactNode;
  className?: string;
}

const styles = cva<{
  type: { [K in ButtonType]: string };
  isMobile: { [K in Status]: string };
}>(
  "absolute z-50 whitespace-nowrap rounded-xl border border-D2_Gray bg-D1_Gray shadow-[0_4px_10px_0_rgba(0,0,0,0.3)]",
  {
    variants: {
      type: {
        genre: "grid grid-cols-2 p-2",
        icon: "",
        text: "",
      },
      isMobile: {
        inactive: "",
        active: "",
      },
    },
    compoundVariants: [
      {
        type: "genre",
        isMobile: "active",
        className: "min-w-[158px] gap-x-2 gap-y-1",
      },
      {
        type: "genre",
        isMobile: "inactive",
        className: "min-w-[198px] gap-x-5 gap-y-3",
      },
      {
        type: ["text", "icon"],
        className: "flex flex-col gap-[9px]",
      },
      {
        type: ["icon"],
        className: "min-w-[140px]",
      },
      {
        type: ["text", "icon"],
        isMobile: "active",
        className: "p-1",
      },
      {
        type: ["text", "icon"],
        isMobile: "inactive",
        className: "p-2",
      },
    ],
  },
);

export default function DropdownList({
  children,
  className,
}: DropdownListProps) {
  const { isOpen, type, isMobile, height } = useDropdownContext();
  if (!isOpen) return null;
  return (
    <div
      style={{ top: `${className ? "inherit" : height}px` }}
      className={twMerge(
        styles({ type, isMobile: isMobile ? "active" : "inactive" }),
        className ||
          "left-1/2 -translate-x-1/2 Tablet:left-auto Tablet:right-0 Tablet:transform-none",
      )}
    >
      {children}
    </div>
  );
}
