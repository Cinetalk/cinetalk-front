"use client";
import HeaderDropdown from "@/components/header/HeaderDropdown";

interface HeaderAuthedUserSectionProps {
  children: React.ReactNode;
}

function HeaderAuthedUserSection({ children }: HeaderAuthedUserSectionProps) {
  return (
    <section className="hidden items-center Laptop:flex">
      <HeaderDropdown>{children}</HeaderDropdown>
    </section>
  );
}

export default HeaderAuthedUserSection;
