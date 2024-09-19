"use client";
import HeaderDropdown from "@/components/header/HeaderDropdown";

interface HeaderAuthedUserSectionProps {
  children: React.ReactNode;
}

function HeaderAuthedUserSection({ children }: HeaderAuthedUserSectionProps) {
  return (
    <section className="hidden items-center Laptop:flex">
      <div className="mr-3 h-[30px] w-[30px] rounded-full bg-[#d9d9d9]" />
      <HeaderDropdown>{children}</HeaderDropdown>
    </section>
  );
}

export default HeaderAuthedUserSection;
