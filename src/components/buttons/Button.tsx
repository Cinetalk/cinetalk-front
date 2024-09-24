"use client";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ButtonHTMLAttributes, LinkHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { UrlObject } from "url";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  children: React.ReactNode;
  href?: UrlObject | string;
}

const ButtonVariants = cva(`flex justify-center whitespace-nowrap`, {
  variants: {
    variant: {
      icon: "p-2 rounded-lg hover:bg-Opacity_W10 active:bg-Opacity_W15",
      grey: "bg-D2_Gray text-Gray hover:bg-D3_Gray hover:text-Gray_Orange active:bg-Gray active:text-Silver disabled:bg-D2_Gray disabled:text-Gray",
      orange:
        "text-Silver bg-Primary hover:bg-Shade_1 active:bg-Shade_3 disabled:bg-D2_Gray disabled:text-Gray",
      line: "inner-gray bg-transparent text-Gray_Orange hover:inner-silver hover:text-Silver active:bg-D1_Gray",
      text: "p-2 ",
      textIconR: "p-2 pr-1",
      textIconL: "p-2 pl-1",
      arrow1:
        "p-[10px] rounded-full bg-Opacity_W10 hover:bg-Opacity_W15 active:bg-Opacity_W20",
      arrow2:
        "p-[10px] rounded-full bg-Opacity_W10 hover:bg-Opacity_W15 active:bg-Opacity_W20",
    },
    size: {
      full: "py-3 px-5 rounded-xl",
      xl: "py-3 px-5 w-[360px] rounded-xl Text-m-Medium",
      lg: "py-3 px-5 w-[180px] rounded-xl Text-m-Medium",
      md: "py-2 px-4 rounded-lg w-fit Text-m-Medium",
      sm: "py-1 px-3 rounded-lg w-fit Text-s-Medium",
      xs: "py-1 px-2 rounded-lg w-fit Text-xs-Regular",
      none: "",
    },
    focus: {
      "1": "",
      "2": "",
      none: "",
    },
  },
  compoundVariants: [
    {
      variant: ["text", "textIconL", "textIconR"],
      className:
        "Text-s-Medium h-10 Tablet:h-auto items-center rounded-lg Tablet:Text-m-Medium hover:bg-Opacity_W10 hover:text-Silver active:bg-Opacity_W15 disabled:text-Gray",
    },
    {
      variant: ["text", "textIconL", "textIconR"],
      focus: "1",
      className: "text-Primary",
    },
    {
      variant: "text",
      focus: "2",
      className: "bg-Primary text-Silver",
    },
    {
      variant: ["textIconL", "textIconR"],
      className: "flex items-center gap-1",
    },
    {
      variant: "grey",
      focus: "1",
      className: "bg-Primary text-Silver",
    },
    {
      variant: "line",
      focus: "1",
      className: "bg-D2_Gray text-Silver inner-none",
    },
    {
      variant: "line",
      size: "md",
      className: "py-3 px-5 w-[112px]",
    },
    {
      variant: "line",
      size: "sm",
      className: "py-2 px-4 w-fit",
    },
  ],
});

export default function Button({
  children,
  type = "button",
  variant,
  size,
  focus,
  className,
  href,
  ...rest
}: ButtonProps) {
  return href ? (
    <Link
      className={twMerge(ButtonVariants({ size, variant, focus, className }))}
      href={href}
    >
      {children}
    </Link>
  ) : (
    <button
      {...rest}
      type={type}
      className={twMerge(ButtonVariants({ size, variant, focus, className }))}
    >
      {children}
    </button>
  );
}
